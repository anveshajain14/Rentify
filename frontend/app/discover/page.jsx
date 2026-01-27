'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Zap, Sparkles, Clock } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = ['Electronics', 'Furniture', 'Photography', 'Outdoor'];

export default function DiscoverPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products?approved=true');
        setProducts(res.data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredBySearch = search.trim()
    ? products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    : products;
  const featured = products.slice(0, 8);
  const recentlyAdded = [...products].sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  ).slice(0, 8);
  const byCategory = (cat) =>
    cat === 'All' ? products : products.filter((p) => p.category === cat);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter text-black mb-2">Discover Rentals</h1>
          <p className="text-gray-500 mb-8">Find what you need. Search and browse by category.</p>

          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
          </div>
        </header>

        {search.trim() ? (
          <section className="mb-16">
            <h2 className="text-xl font-black mb-6">Search results</h2>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-[420px] bg-gray-200 rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : filteredBySearch.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredBySearch.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center rounded-3xl bg-white border border-dashed border-gray-200">
                <p className="text-gray-500 font-medium">No products match your search.</p>
                <button onClick={() => setSearch('')} className="mt-4 text-emerald-600 font-bold">Clear search</button>
              </div>
            )}
          </section>
        ) : (
          <>
            <section className="mb-16">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-xl font-black flex items-center gap-2"><Sparkles size={22} className="text-amber-500" /> Featured</h2>
                <Link href="/products" className="text-sm font-bold text-emerald-600 hover:underline flex items-center gap-1">View all <ArrowRight size={14} /></Link>
              </div>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-[420px] bg-gray-200 rounded-3xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featured.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>
              )}
            </section>

            <section className="mb-16">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-xl font-black flex items-center gap-2"><Clock size={22} className="text-blue-500" /> Recently Added</h2>
                <Link href="/products" className="text-sm font-bold text-emerald-600 hover:underline flex items-center gap-1">View all <ArrowRight size={14} /></Link>
              </div>
              {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recentlyAdded.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>
              )}
            </section>

            {CATEGORIES.map((cat) => {
              const list = byCategory(cat);
              if (list.length === 0) return null;
              return (
                <section key={cat} className="mb-16">
                  <div className="flex justify-between items-end mb-6">
                    <h2 className="text-xl font-black">{cat}</h2>
                    <Link href={`/products?category=${cat}`} className="text-sm font-bold text-emerald-600 hover:underline flex items-center gap-1">View all <ArrowRight size={14} /></Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {list.slice(0, 4).map((p) => (
                      <ProductCard key={p._id} product={p} />
                    ))}
                  </div>
                </section>
              );
            })}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
