'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Clock, CheckCircle, Star, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function RenterDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewModal, setReviewModal] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const res = await axios.get('/api/rentals');
        setRentals(res.data.rentals);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRentals();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-emerald-600 bg-emerald-50';
      case 'pending': return 'text-amber-600 bg-amber-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-black mb-2">My Dashboard</h1>
            <p className="text-gray-500">Welcome back, {user?.name}. Manage your active rentals and history.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { label: 'Active Rentals', value: rentals.filter((r) => r.rentalStatus === 'active').length, icon: <Clock className="text-emerald-500" /> },
            { label: 'Total Spent', value: `$${rentals.reduce((acc, r) => acc + (r.paymentStatus === 'paid' ? r.totalAmount : 0), 0)}`, icon: <ShoppingBag className="text-blue-500" /> },
            { label: 'Completed', value: rentals.filter((r) => r.rentalStatus === 'completed').length, icon: <CheckCircle className="text-purple-500" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-black">{stat.value}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">{stat.icon}</div>
            </div>
          ))}
        </div>

        <section className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-black">My Rental History</h2>
            <button className="text-sm font-bold text-emerald-600">Download Report</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-xs font-black text-gray-400 uppercase tracking-widest">
                  <th className="px-8 py-4">Product</th>
                  <th className="px-8 py-4">Dates</th>
                  <th className="px-8 py-4">Total</th>
                  <th className="px-8 py-4">Payment</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rentals.length > 0 ? (
                  rentals.map((rental) => (
                    <tr key={rental._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img src={rental.product?.images[0]} className="w-12 h-12 rounded-xl object-cover" alt="" />
                          <span className="font-bold text-black">{rental.product?.title}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-500 font-medium">
                        {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-6 font-black text-black">${rental.totalAmount}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(rental.paymentStatus)}`}>
                          {rental.paymentStatus}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-600`}>
                          {rental.rentalStatus}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        {rental.rentalStatus === 'completed' ? (
                          <button onClick={() => setReviewModal({ rental })} className="text-emerald-600 font-bold text-sm hover:underline">Rate Product</button>
                        ) : (
                          <Link href={`/products/${rental.product?._id}`} className="text-black font-bold text-sm hover:underline">View Details</Link>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center text-gray-400 italic font-medium">
                      {loading ? 'Loading your rentals...' : 'No rentals found. Start browsing products!'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {reviewModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setReviewModal(null)} className="fixed inset-0 bg-black/60 z-50" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 p-8"
            >
              <h3 className="text-xl font-black mb-2">Rate this rental</h3>
              <p className="text-gray-500 text-sm mb-6">{reviewModal.rental.product?.title}</p>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} onClick={() => setReviewRating(r)} className="p-1">
                    <Star size={32} className={r <= reviewRating ? 'text-amber-500 fill-amber-500' : 'text-gray-200'} />
                  </button>
                ))}
              </div>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Your review..."
                className="w-full h-24 px-4 py-3 rounded-2xl border border-gray-200 resize-none focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <div className="flex gap-3 mt-6">
                <button onClick={() => setReviewModal(null)} className="flex-1 py-3 rounded-2xl border border-gray-200 font-bold">Cancel</button>
                <button onClick={handleSubmitReview} disabled={reviewSubmitting || !reviewComment.trim()} className="flex-1 py-3 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50">
                  {reviewSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Submit'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
