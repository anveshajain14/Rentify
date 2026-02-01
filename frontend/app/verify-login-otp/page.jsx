'use client';

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/authSlice';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Mail, Loader2, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function VerifyLoginOTPPage() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';
  const [email, setEmail] = useState(emailParam);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const next = [...otp];
    pasted.split('').forEach((c, i) => { next[i] = c; });
    setOtp(next);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    const code = otp.join('');
    if (code.length !== 6) {
      toast.error('Please enter the 6-digit code');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/verify-login-otp', { email, otp: code });
      toast.success(res.data.message || 'Signed in!');
      dispatch(setUser(res.data.user));
      if (res.data.user?.role === 'renter') {
        router.push('/discover');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen pt-24 px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white dark:bg-gray-800 rounded-[40px] shadow-2xl shadow-black/5 p-10 border border-gray-100 dark:border-gray-700"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black tracking-tighter text-black dark:text-white mb-2">Enter login code</h1>
            <p className="text-gray-500 dark:text-gray-400">We sent a 6-digit code to your email</p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-transparent rounded-2xl focus:bg-white dark:focus:bg-gray-600 focus:border-emerald-500 transition-all outline-none dark:text-white"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Login Code</label>
              <div
                className="flex gap-2 justify-center"
                onPaste={handlePaste}
              >
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => inputRefs.current[i] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-12 h-14 text-center text-xl font-bold bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-xl shadow-black/10 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Verify & Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-gray-500 dark:text-gray-400">
              <Link href="/login" className="text-emerald-600 font-bold hover:underline">
                Back to Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
