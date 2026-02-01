'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/authSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setUnverifiedEmail(null);
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data.requiresOtp) {
        toast.success(res.data.message || 'Check your email for the login code');
        router.push(`/verify-login-otp?email=${encodeURIComponent(res.data.email || email)}`);
        return;
      }
      dispatch(setUser(res.data.user));
      toast.success('Welcome back!');
      if (res.data.user?.role === 'renter') {
        router.push('/discover');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      const data = err.response?.data;
      if (data?.requiresVerification) {
        setUnverifiedEmail(data?.email || email);
        toast.error(data?.message || 'Please verify your email');
        return;
      }
      toast.error(data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!unverifiedEmail) return;
    setResendLoading(true);
    try {
      await axios.post('/api/auth/resend-verification-otp', { email: unverifiedEmail });
      toast.success('Verification code sent! Check your email.');
      router.push(`/verify-email?email=${encodeURIComponent(unverifiedEmail)}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Resend failed');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-[40px] shadow-2xl shadow-black/5 p-10 border border-gray-100"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black tracking-tighter text-black mb-2">Welcome Back</h1>
            <p className="text-gray-500">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 transition-all outline-none"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                <Link href="/forgot-password" className="text-sm text-emerald-600 font-medium hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-black/10 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>

            {unverifiedEmail && (
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">Please verify your email to sign in.</p>
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={resendLoading}
                  className="w-full py-3 bg-amber-600 text-white rounded-xl font-bold text-sm hover:bg-amber-700 disabled:opacity-50"
                >
                  {resendLoading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Resend Verification Code'}
                </button>
              </div>
            )}
          </form>

          <div className="mt-10 text-center text-sm">
            <p className="text-gray-500">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-emerald-600 font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
