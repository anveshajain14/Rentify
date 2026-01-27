import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tighter text-black">LUXE<span className="text-emerald-600">RENT</span></span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Premium rental marketplace for the modern world. Rent verified high-end products with ease.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Facebook size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/products" className="hover:text-black">Browse All</Link></li>
              <li><Link href="/products?category=Electronics" className="hover:text-black">Electronics</Link></li>
              <li><Link href="/products?category=Furniture" className="hover:text-black">Furniture</Link></li>
              <li><Link href="/products?category=Photography" className="hover:text-black">Photography</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-black">Help Center</Link></li>
              <li><Link href="#" className="hover:text-black">Rental Policies</Link></li>
              <li><Link href="#" className="hover:text-black">Safety Guidelines</Link></li>
              <li><Link href="#" className="hover:text-black">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-4">Subscribe to get updates on new premium listings.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">Join</button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2026 LuxeRent Marketplace. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
