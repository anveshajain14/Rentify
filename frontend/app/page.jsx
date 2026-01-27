'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products?approved=true');
        setFeaturedProducts(res.data.products.slice(0, 4));
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tighter text-black mb-4">Browse by Category</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Explore our curated collections of premium items available for rent.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Electronics', icon: <Zap />, count: '420+ Items', color: 'bg-blue-500' },
              { name: 'Furniture', icon: <Shield />, count: '150+ Items', color: 'bg-emerald-500' },
              { name: 'Photography', icon: <Sparkles />, count: '80+ Items', color: 'bg-purple-500' },
              { name: 'Outdoor', icon: <Zap />, count: '120+ Items', color: 'bg-orange-500' },
            ].map((cat, i) => (
              <motion.div
                key={cat.name}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all text-center group cursor-pointer"
              >
                <div className={`w-16 h-16 ${cat.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-xl mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-400">{cat.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-black tracking-tighter text-black mb-4">Featured Rentals</h2>
              <p className="text-gray-500">The most popular items rented by our community this week.</p>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all">
              View All Listings <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-[400px] bg-gray-100 animate-pulse rounded-3xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl">
                  <p className="text-gray-500 font-medium italic">No featured products found. Please seed the database.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto bg-black rounded-[48px] p-12 md:p-24 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 blur-[120px] rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full -ml-48 -mb-48" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-tight">
              Ready to Share Your <br className="hidden md:block" /> Premium Collection?
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Join thousands of verified sellers and start earning by renting out your high-end equipment today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?role=seller" className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/20">
                Become a Seller
              </Link>
              <Link href="/products" className="px-10 py-5 bg-white/10 text-white backdrop-blur-md border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
