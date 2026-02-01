'use client';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { clearCart } from '@/store/slices/cartSlice';
import { ShoppingCart, LogOut, Menu, X, Calendar, Heart, CreditCard } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart.items.length);
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    setProfileOpen(false);
  };

  const profileLinks = [
    { href: '/dashboard', label: 'My Rentals', icon: <Calendar size={18} /> },
    { href: '/dashboard', label: 'Order History', icon: <Calendar size={18} /> },
    { href: '/wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
    { href: '/cart', label: 'Cart', icon: <ShoppingCart size={18} /> },
    { href: '/profile', label: 'Profile & Payments', icon: <CreditCard size={18} /> },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter text-black dark:text-white">
              LUXE<span className="text-emerald-600">RENT</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-colors">Browse</Link>
            {user?.role === 'renter' && <Link href="/discover" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-colors">Discover</Link>}
            {user?.role === 'seller' && <Link href="/seller/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-colors">Seller Panel</Link>}
            {user?.role === 'admin' && <Link href="/admin" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-colors">Admin</Link>}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <>
                <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <ShoppingCart size={22} className="text-gray-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>
                <div className="relative" ref={profileRef}>
                  <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-gray-100 transition-all">
                    {user?.avatar || user?.image ? (
                      <div className="relative w-9 h-9 rounded-full overflow-hidden">
                        <Image src={user.avatar || user.image} alt={user.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <span className="font-medium text-sm text-gray-700 max-w-[100px] truncate">{user.name}</span>
                  </button>
                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }} className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-gray-100 shadow-xl py-2 overflow-hidden">
                        {profileLinks.map((link) => (
                          <Link key={link.label} href={link.href} onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium text-sm">
                            {link.icon}
                            {link.label}
                          </Link>
                        ))}
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 font-medium text-sm">
                          <LogOut size={18} /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="px-5 py-2 text-gray-600 dark:text-gray-300 font-medium hover:text-black dark:hover:text-white transition-colors">Login</Link>
                <Link href="/register" className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-black/20">Sign Up</Link>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Link href="/cart" className="relative p-2">
              <ShoppingCart size={22} className="text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden bg-white border-t p-4 space-y-2 shadow-xl">
            <Link href="/products" className="block py-3 font-medium text-gray-600" onClick={() => setIsOpen(false)}>Browse Rentals</Link>
            <Link href="/discover" className="block py-3 font-medium text-gray-600" onClick={() => setIsOpen(false)}>Discover</Link>
            <Link href="/cart" className="block py-3 font-medium text-gray-600" onClick={() => setIsOpen(false)}>Cart {cartCount > 0 && `(${cartCount})`}</Link>
            {user && (
              <>
                <Link href="/dashboard" className="block py-3 font-medium text-gray-600" onClick={() => setIsOpen(false)}>My Rentals</Link>
                <Link href="/wishlist" className="block py-3 font-medium text-gray-600" onClick={() => setIsOpen(false)}>Wishlist</Link>
                <Link href="/profile" className="block py-3 font-medium text-gray-600" onClick={() => setIsOpen(false)}>Profile</Link>
                {user.role === 'seller' && <Link href="/seller/dashboard" className="block py-3 font-medium text-gray-600" onClick={() => setIsOpen(false)}>Seller Panel</Link>}
              </>
            )}
            <div className="pt-4 border-t">
              {user ? (
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-xl font-bold">
                  <LogOut size={20} /> Logout
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/login" className="py-3 text-center bg-gray-100 rounded-xl font-bold" onClick={() => setIsOpen(false)}>Login</Link>
                  <Link href="/register" className="py-3 text-center bg-black text-white rounded-xl font-bold" onClick={() => setIsOpen(false)}>Sign Up</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
