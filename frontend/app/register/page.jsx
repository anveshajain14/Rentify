'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('renter');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/register', { name, email, password, role });
      toast.success(res.data.message || 'Check your email to verify your account');
      router.push(`/verify-email?email=${encodeURIComponent(res.data.email || email)}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen pt-24 px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-card rounded-[40px] shadow-xl dark:shadow-black/40 p-10 border border-border"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black tracking-tighter text-foreground mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join the premium rental community today</p>
          </div>

          <div className="flex p-1 bg-muted rounded-2xl mb-8">
            <button
              onClick={() => setRole('renter')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${role === 'renter' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Renter
            </button>
            <button
              onClick={() => setRole('seller')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${role === 'seller' ? 'bg-card text-emerald-600 dark:text-cyan-400 shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Seller
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-input border border-border rounded-2xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all outline-none text-foreground placeholder:text-muted-foreground"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-input border border-border rounded-2xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all outline-none text-foreground placeholder:text-muted-foreground"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-input border border-border rounded-2xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all outline-none text-foreground placeholder:text-muted-foreground"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-emerald-600 dark:text-cyan-400 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
