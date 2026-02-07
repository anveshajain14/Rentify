import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '../../../../lib/mongodb.js';
import User from '../../../../models/User.js';
import AuditLog from '../../../../models/AuditLog.js';
import { signToken, setAuthCookie } from '../../../../lib/auth.js';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

async function getClientInfo(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  return { ip, userAgent };
}

function redirectToLogin(error) {
  const url = new URL('/login', BASE_URL);
  if (error) url.searchParams.set('error', error);
  const res = NextResponse.redirect(url);
  res.cookies.delete('google_oauth_state', { path: '/' });
  return res;
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      if (error === 'access_denied') {
        return redirectToLogin('google_cancelled');
      }
      return redirectToLogin('google_failed');
    }

    if (!code || !state) {
      return redirectToLogin('invalid_callback');
    }

    const cookieStore = await cookies();
    const savedState = cookieStore.get('google_oauth_state')?.value;
    if (!savedState || savedState !== state) {
      return redirectToLogin('invalid_state');
    }

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      return redirectToLogin('oauth_not_configured');
    }

    const redirectUri = `${BASE_URL}/api/auth/google/callback`;
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      const errData = await tokenRes.text();
      console.error('Google token error:', errData);
      return redirectToLogin('token_exchange_failed');
    }

    const tokens = await tokenRes.json();
    const accessToken = tokens.access_token;

    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userInfoRes.ok) {
      return redirectToLogin('userinfo_failed');
    }

    const profile = await userInfoRes.json();
    const { id: googleId, email, name, picture } = profile;

    if (!email) {
      return redirectToLogin('no_email');
    }

    const { ip, userAgent } = await getClientInfo(req);
    await dbConnect();

    let user = await User.findOne({ googleId });
    if (user) {
      if (user.isBlocked) {
        return redirectToLogin('account_blocked');
      }
    } else {
      user = await User.findOne({ email });
      if (user) {
        if (user.isBlocked) {
          return redirectToLogin('account_blocked');
        }
        user.googleId = googleId;
        user.isVerified = true;
        if (picture && !user.avatar) user.avatar = picture;
        await user.save();
      } else {
        user = await User.create({
          name: name || email.split('@')[0],
          email,
          googleId,
          avatar: picture || '',
          authProvider: 'google',
          isVerified: true,
          role: 'renter',
        });
      }
    }

    const token = await signToken({
      id: user._id,
      role: user.role,
      sessionVersion: user.sessionVersion ?? 0,
    });
    await setAuthCookie(token);

    await AuditLog.create({
      action: 'login',
      userId: user._id,
      email: user.email,
      ip,
      userAgent,
      metadata: { provider: 'google' },
    });

    const redirectUrl = user.role === 'renter' ? '/discover' : '/dashboard';
    const res = NextResponse.redirect(new URL(redirectUrl, BASE_URL));
    res.cookies.delete('google_oauth_state', { path: '/' });
    return res;
  } catch (err) {
    console.error('Google OAuth callback error:', err);
    return redirectToLogin('server_error');
  }
}
