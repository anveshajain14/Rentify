module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/backend/lib/mongodb.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/backend/node_modules/mongoose)");
;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose = {
        conn: null,
        promise: null
    };
}
async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
const __TURBOPACK__default__export__ = dbConnect;
}),
"[project]/backend/models/User.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/backend/node_modules/mongoose)");
;
const UserSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["Schema"]({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    // Google OAuth
    googleId: {
        type: String,
        sparse: true,
        unique: true
    },
    authProvider: {
        type: String,
        enum: [
            'local',
            'google'
        ],
        default: 'local'
    },
    role: {
        type: String,
        enum: [
            'renter',
            'seller',
            'admin'
        ],
        default: 'renter'
    },
    avatar: {
        type: String,
        default: ''
    },
    shopBanner: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    policies: {
        type: String,
        default: ''
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    joinedAt: {
        type: Date,
        default: Date.now
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    // Email verification
    isVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationOTP: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    otpResendCount: {
        type: Number,
        default: 0
    },
    otpResendWindow: {
        type: Date,
        default: null
    },
    // Password reset
    passwordResetToken: {
        type: String,
        default: null
    },
    passwordResetExpiry: {
        type: Date,
        default: null
    },
    // Login 2FA (optional)
    loginOTP: {
        type: String,
        default: null
    },
    loginOTPExpiry: {
        type: Date,
        default: null
    },
    // Account lock after failed attempts
    failedLoginAttempts: {
        type: Number,
        default: 0
    },
    lockedUntil: {
        type: Date,
        default: null
    },
    // Invalidate all sessions on password reset
    sessionVersion: {
        type: Number,
        default: 0
    },
    // Saved addresses for checkout (per user)
    addresses: [
        {
            name: {
                type: String
            },
            phone: {
                type: String
            },
            street: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            pincode: {
                type: String
            },
            isDefault: {
                type: Boolean,
                default: false
            }
        }
    ]
}, {
    timestamps: true
});
// Must have at least one auth method
UserSchema.pre('save', async function() {
    if (!this.password && !this.googleId) {
        throw new Error('User must have either password or googleId');
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["default"].model('User', UserSchema);
}),
"[project]/backend/lib/otp.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateOTP",
    ()=>generateOTP,
    "getOTPExpiry",
    ()=>getOTPExpiry,
    "hashOTP",
    ()=>hashOTP,
    "verifyOTP",
    ()=>verifyOTP
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 7;
function generateOTP() {
    const digits = '0123456789';
    let otp = '';
    for(let i = 0; i < OTP_LENGTH; i++){
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}
function getOTPExpiry() {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + OTP_EXPIRY_MINUTES);
    return expiry;
}
async function hashOTP(otp) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(otp, 10);
}
async function verifyOTP(plainOtp, hashedOtp) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(plainOtp, hashedOtp);
}
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/backend/lib/email.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendLoginOTPEmail",
    ()=>sendLoginOTPEmail,
    "sendPasswordResetEmail",
    ()=>sendPasswordResetEmail,
    "sendVerificationEmail",
    ()=>sendVerificationEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/node_modules/nodemailer/lib/nodemailer.js [app-route] (ecmascript)");
;
const transporter = __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const APP_NAME = process.env.APP_NAME || 'Rentify';
const BASE_URL = ("TURBOPACK compile-time value", "http://localhost:3000") || process.env.BASE_URL || 'http://localhost:3000';
function getEmailTemplate(type, data) {
    const styles = `
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .card { background: #fff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .logo { font-size: 24px; font-weight: 800; color: #000; margin-bottom: 24px; }
    .logo span { color: #059669; }
    .otp { font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #059669; background: #ecfdf5; padding: 16px 24px; border-radius: 12px; display: inline-block; margin: 24px 0; }
    .expiry { color: #6b7280; font-size: 14px; margin-top: 8px; }
    .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px 16px; margin: 24px 0; border-radius: 0 8px 8px 0; font-size: 13px; color: #92400e; }
    .btn { display: inline-block; background: #000; color: #fff; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; margin-top: 16px; }
    .footer { color: #9ca3af; font-size: 12px; margin-top: 32px; }
  `;
    switch(type){
        case 'verification':
            return `
        <!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${styles}</style></head>
        <body><div class="container"><div class="card">
          <div class="logo">${APP_NAME}</div>
          <h1 style="margin:0 0 8px; font-size:22px;">Verify your email</h1>
          <p style="color:#6b7280; margin:0;">Enter this code to complete your registration:</p>
          <div class="otp">${data.otp}</div>
          <p class="expiry">Expires in ${data.expiryMinutes || 7} minutes</p>
          <div class="warning">Never share this code with anyone. ${APP_NAME} will never ask for it.</div>
          <p class="footer">If you didn't create an account, you can safely ignore this email.</p>
        </div></div></body></html>
      `;
        case 'login-otp':
            return `
        <!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${styles}</style></head>
        <body><div class="container"><div class="card">
          <div class="logo">${APP_NAME}</div>
          <h1 style="margin:0 0 8px; font-size:22px;">Your login code</h1>
          <p style="color:#6b7280; margin:0;">Use this code to sign in:</p>
          <div class="otp">${data.otp}</div>
          <p class="expiry">Expires in 5 minutes</p>
          <div class="warning">If you didn't request this code, secure your account immediately.</div>
          <p class="footer">If you didn't try to log in, change your password right away.</p>
        </div></div></body></html>
      `;
        case 'reset-password':
            return `
        <!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${styles}</style></head>
        <body><div class="container"><div class="card">
          <div class="logo">${APP_NAME}</div>
          <h1 style="margin:0 0 8px; font-size:22px;">Reset your password</h1>
          <p style="color:#6b7280; margin:0;">Click the button below to set a new password:</p>
          <a href="${data.resetUrl}" class="btn">Reset Password</a>
          <p class="expiry" style="margin-top:16px;">This link expires in 10 minutes.</p>
          <div class="warning">If you didn't request a password reset, ignore this email. Your password will remain unchanged.</div>
          <p class="footer">If the button doesn't work, copy and paste: ${data.resetUrl}</p>
        </div></div></body></html>
      `;
        default:
            return '';
    }
}
async function sendVerificationEmail(email, otp, expiryMinutes = 7) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('Email not configured. OTP:', otp);
        return;
    }
    await transporter.sendMail({
        from: `"${APP_NAME}" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Verify your email - ${APP_NAME}`,
        html: getEmailTemplate('verification', {
            otp,
            expiryMinutes
        })
    });
}
async function sendLoginOTPEmail(email, otp) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('Email not configured. OTP:', otp);
        return;
    }
    await transporter.sendMail({
        from: `"${APP_NAME}" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Your login code - ${APP_NAME}`,
        html: getEmailTemplate('login-otp', {
            otp
        })
    });
}
async function sendPasswordResetEmail(email, token) {
    const resetUrl = `${BASE_URL}/reset-password?token=${token}`;
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('Email not configured. Reset URL:', resetUrl);
        return;
    }
    await transporter.sendMail({
        from: `"${APP_NAME}" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Reset your password - ${APP_NAME}`,
        html: getEmailTemplate('reset-password', {
            resetUrl
        })
    });
}
}),
"[project]/backend/api/auth/register/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/lib/mongodb.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/models/User.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$otp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/lib/otp.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$email$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/lib/email.js [app-route] (ecmascript)");
;
;
;
;
;
;
/* ---------------- PASSWORD VALIDATION (MINIMAL ADDITION) ---------------- */ function isStrongPassword(password) {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
}
async function POST(req) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const { name, email, password, role } = await req.json();
        /* ---------------- BASIC VALIDATION ---------------- */ if (!name || !email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Missing required fields'
            }, {
                status: 400
            });
        }
        /* ---------------- STRONG PASSWORD CHECK ---------------- */ if (!isStrongPassword(password)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
            }, {
                status: 400
            });
        }
        /* ---------------------------------------------------- */ const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            email
        });
        if (existingUser) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'User already exists'
            }, {
                status: 400
            });
        }
        const hashedPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(password, 10);
        const otp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$otp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateOTP"])();
        const hashedOtp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$otp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hashOTP"])(otp);
        const otpExpiry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$otp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOTPExpiry"])();
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
            name,
            email,
            password: hashedPassword,
            role: role || 'renter',
            isVerified: false,
            emailVerificationOTP: hashedOtp,
            otpExpiry,
            otpResendCount: 0,
            otpResendWindow: new Date()
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$email$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendVerificationEmail"])(user.email, otp, 7);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Account created. Please verify your email.',
            redirect: '/verify-email',
            email: user.email,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: false
            }
        }, {
            status: 201
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: error.message || 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
"[project]/frontend/app/api/auth/register/route.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$auth$2f$register$2f$route$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/api/auth/register/route.js [app-route] (ecmascript)");
;
}),
"[project]/frontend/app/api/auth/register/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$auth$2f$register$2f$route$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["POST"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$api$2f$auth$2f$register$2f$route$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/app/api/auth/register/route.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$auth$2f$register$2f$route$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/api/auth/register/route.js [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7d20f60e._.js.map