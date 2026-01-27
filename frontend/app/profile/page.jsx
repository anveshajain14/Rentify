'use client';

import { useSelector } from 'react-redux';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, CreditCard } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 pt-32 pb-20 text-center">
          <p className="text-gray-600">Please log in to view your profile.</p>
          <Link href="/login" className="inline-block mt-4 text-emerald-600 font-bold">Go to Login</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <h1 className="text-3xl font-black tracking-tighter text-black mb-8">Profile & Payments</h1>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-2xl">
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-black text-black">{user.name}</h2>
              <p className="text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail size={20} />
              <span>{user.email}</span>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-100">
            <h3 className="font-bold text-black mb-3 flex items-center gap-2"><CreditCard size={18} /> Payment methods</h3>
            <p className="text-gray-500 text-sm">Saved payment methods are managed at checkout. We use Stripe for secure payments.</p>
          </div>
          <div className="pt-4 flex flex-wrap gap-3">
            <Link href="/dashboard" className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200">
              My Rentals
            </Link>
            <Link href="/cart" className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-500">
              Cart
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
