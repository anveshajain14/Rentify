'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import AnimatedCounter from '@/components/AnimatedCounter';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, MapPin, Calendar, CheckCircle, Loader2, Package, FileText } from 'lucide-react';
import Image from 'next/image';

const DEFAULT_BANNER = 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1600';
const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop';
const DEFAULT_RENTER_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100">
      <div className="aspect-[4/5] bg-gray-200 animate-pulse" />
      <div className="p-6 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse" />
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse mt-4" />
      </div>
    </div>
  );
}

export default function SellerShopPage() {
  const params = useParams();
  const id = params?.id;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  const fetchSeller = useCallback(async (page = 1) => {
    try {
      if (page === 1) setLoading(true);
      else setReviewsLoading(true);
      const res = await axios.get(`/api/seller/${id}`, {
        params: page > 1 ? { reviewPage: page, reviewLimit: 10 } : undefined,
      });
          setData((prev) => {
            const next = res.data;
            if (page === 1) return next;
            if (!prev) return next;
            return {
              ...prev,
              reviews: [...prev.reviews, ...(next.reviews || [])],
              reviewPage: next.reviewPage,
            };
          });
    } catch {
      if (page === 1) setData(null);
    } finally {
      setLoading(false);
      setReviewsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSeller(1);
  }, [fetchSeller]);

  const loadMoreReviews = () => {
    const next = (data?.reviewPage ?? 1) + 1;
    fetchSeller(next);
  };

  const hasMoreReviews = data && data.totalReviews > data.reviews.length;

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="relative h-[400px] bg-gray-200 animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-20">
          <div className="bg-white rounded-[40px] p-8 shadow-2xl border border-gray-100 animate-pulse h-64 mb-12" />
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="space-y-8">
              <div className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Navbar />
        <div className="text-center px-4">
          <h1 className="text-2xl font-black text-black mb-2">Seller not found</h1>
          <p className="text-gray-500">This shop may be private or the link may be incorrect.</p>
        </div>
        <Footer />
      </main>
    );
  }

  const { seller, products, reviews, stats, ratingDistribution } = data;
  const bannerSrc = seller.shopBanner || DEFAULT_BANNER;
  const avatarSrc = seller.avatar || DEFAULT_AVATAR;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero / Parallax Banner */}
      <div className="relative h-[420px] overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-0">
          <Image src={bannerSrc} alt="" fill className="object-cover" sizes="100vw" unoptimized={bannerSrc.startsWith('http')} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Seller header card */}
        <div className="relative -mt-28 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/95 backdrop-blur rounded-[40px] p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-[32px] overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
              <Image src={avatarSrc} alt={seller.name} fill className="object-cover" sizes="160px" unoptimized={avatarSrc.startsWith('http')} />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-black">{seller.name}</h1>
                {seller.isApproved && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                    <CheckCircle size={14} /> Verified Seller
                  </span>
                )}
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-gray-500 font-medium text-sm">
                {seller.location && (
                  <span className="flex items-center gap-1"><MapPin size={16} /> {seller.location}</span>
                )}
                <span className="flex items-center gap-1"><Calendar size={16} /> Joined {new Date(seller.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                <span className="flex items-center gap-1"><Star size={16} className="text-amber-500" fill="currentColor" /> <AnimatedCounter value={stats.averageRating} decimalPlaces={1} /> ({stats.totalRentalsCompleted} rentals)</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 pb-20">
          {/* Sidebar: About, Policies, Stats, Rating distribution */}
          <div className="lg:col-span-1 space-y-10">
            <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full" /> About
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {seller.bio || "This seller hasn't added a bio yet. They're a verified partner on LuxeRent."}
              </p>
            </motion.section>

            {seller.policies && (
              <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-emerald-600" /> Policies
                </h3>
                <div className="p-6 bg-gray-50/80 rounded-2xl border border-gray-100">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{seller.policies}</pre>
                </div>
              </motion.section>
            )}

            <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full" /> Stats
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Avg. rating', value: stats.averageRating, suffix: '/5', color: 'bg-amber-50' },
                  { label: 'Rentals done', value: stats.totalRentalsCompleted, suffix: '', color: 'bg-blue-50' },
                  { label: 'Active listings', value: stats.activeListings, suffix: '', color: 'bg-emerald-50' },
                  { label: 'Response rate', value: stats.responseRate, suffix: '%', color: 'bg-purple-50' },
                ].map((item, i) => (
                  <div key={i} className={`${item.color} p-5 rounded-2xl`}>
                    <p className="text-[10px] font-black uppercase text-gray-400 mb-0.5">{item.label}</p>
                    <p className="text-xl font-black text-black">
                      <AnimatedCounter value={item.value} decimalPlaces={item.value % 1 !== 0 ? 1 : 0} suffix={item.suffix} />
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {stats.totalReviews > 0 && (
              <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                <h3 className="text-lg font-black mb-4">Rating distribution</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((r) => {
                    const count = ratingDistribution[r] ?? 0;
                    const pct = stats.totalReviews ? (count / stats.totalReviews) * 100 : 0;
                    return (
                      <div key={r} className="flex items-center gap-3">
                        <span className="text-sm font-bold w-8">{r} <Star size={12} className="inline text-amber-500" fill="currentColor" /></span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6, delay: 0.2 + r * 0.05 }}
                            className="h-full bg-amber-400 rounded-full"
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-8">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.section>
            )}
          </div>

          {/* Main: Listings + Reviews */}
          <div className="lg:col-span-2 space-y-14">
            <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Package size={20} className="text-emerald-600" /> Listings ({products.length})
              </h3>
              {products.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={{ ...product, seller: { _id: seller._id, name: seller.name, avatar: seller.avatar, location: seller.location } }} />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/50">
                  <Package className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500 font-medium">No active listings yet.</p>
                </div>
              )}
            </motion.section>

            <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h3 className="text-xl font-black mb-6">Reviews ({data.totalReviews})</h3>
              {reviews.length > 0 ? (
                <>
                  <div className="space-y-5">
                    {reviews.map((review) => (
                      <div key={review._id} className="p-6 bg-gray-50/80 rounded-2xl border border-gray-100">
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                              <Image
                                src={review.renter?.avatar || DEFAULT_RENTER_AVATAR}
                                alt=""
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div>
                              <p className="font-bold text-black">{review.renter?.name ?? 'Renter'}</p>
                              <div className="flex items-center gap-1 text-amber-500">
                                {[1, 2, 3, 4, 5].map((r) => (
                                  <Star key={r} size={14} fill={r <= review.rating ? 'currentColor' : 'none'} />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400 flex-shrink-0">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                  {hasMoreReviews && (
                    <div className="mt-6 text-center">
                      <button
                        onClick={loadMoreReviews}
                        disabled={reviewsLoading}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50 flex items-center gap-2 mx-auto"
                      >
                        {reviewsLoading ? <Loader2 className="animate-spin" size={18} /> : 'Load more reviews'}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-16 text-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/50">
                  <Star className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500 font-medium">No reviews yet.</p>
                </div>
              )}
            </motion.section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
