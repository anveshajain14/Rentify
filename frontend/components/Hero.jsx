'use client';

import { motion } from 'framer-motion';
import { Search, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-emerald-50/50 rounded-l-[100px] hidden lg:block" />
      <div className="absolute top-1/4 left-1/4 -z-10 w-64 h-64 bg-emerald-200/20 blur-3xl rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/50 text-emerald-700 rounded-full text-sm font-bold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Over 1,000+ Premium Listings
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter text-black mb-6">
              Experience the <span className="text-emerald-600 italic">Premium</span> Lifestyle.
            </h1>
            
            <p className="text-xl text-gray-500 mb-10 max-w-xl leading-relaxed">
              Access high-end electronics, designer furniture, and professional gear without the commitment of ownership.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="What are you looking for?" 
                  className="w-full sm:w-80 pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-black/5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
              <Link 
                href="/products"
                className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-black/10 group"
              >
                Browse Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Joined by <span className="text-black font-bold">10k+</span> happy renters this month
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl shadow-emerald-900/20 transform rotate-3">
              <img 
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&h=1000&fit=crop" 
                alt="Premium Interior" 
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-sm font-medium mb-1">Featured Collection</p>
                <h3 className="text-2xl font-bold">Designer Workspaces</h3>
              </div>
            </div>
            
            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-12 z-20 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Play fill="currentColor" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-black">New: Apple Pro Display</h4>
                  <p className="text-xs text-gray-500">Available from $45/day</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

