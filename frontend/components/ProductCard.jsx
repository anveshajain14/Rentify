'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Star, MapPin, Clock, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const inWishlist = useSelector((s) => s.wishlist.productIds.includes(product._id));
  const sellerId = product.seller?._id ?? product.seller;
  const sellerName = typeof product.seller === 'object' && product.seller?.name;
  const sellerAvatar = typeof product.seller === 'object' && product.seller?.avatar;
  const sellerLocation = typeof product.seller === 'object' && product.seller?.location;

  const cartProduct = {
    _id: product._id,
    title: product.title,
    images: product.images || [],
    pricePerDay: product.pricePerDay,
    pricePerWeek: product.pricePerWeek,
    pricePerMonth: product.pricePerMonth,
    category: product.category,
    seller: product.seller && (typeof product.seller === 'object' ? { _id: product.seller._id, name: product.seller.name, avatar: product.seller.avatar } : undefined),
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 1);
    dispatch(addToCart({
      productId: product._id,
      product: cartProduct,
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
      duration: 'day',
    }));
    toast.success('Added to cart. Set dates in Cart.');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product._id));
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
    >
      <Link href={`/products/${product._id}`}>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-black shadow-sm">
              {product.category}
            </span>
          </div>
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-sm hover:bg-white"
          >
            <Heart size={18} className={inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
          </button>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/products/${product._id}`}>
            <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
              {product.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-bold text-gray-700">4.9</span>
          </div>
        </div>

        {sellerId && (
          <Link
            href={`/seller/${sellerId}`}
            className="flex items-center gap-2 text-gray-500 text-sm mb-4 hover:text-emerald-600 transition-colors group/seller"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
              <Image
                src={sellerAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'}
                alt={sellerName || 'Seller'}
                width={24}
                height={24}
                className="object-cover group-hover/seller:ring-2 group-hover/seller:ring-emerald-500 rounded-full"
              />
            </div>
            <span className="font-medium text-gray-700 group-hover/seller:text-emerald-600 truncate">{sellerName || 'Seller'}</span>
            {sellerLocation && (
              <>
                <span className="text-gray-300">·</span>
                <span className="flex items-center gap-0.5"><MapPin size={12} /> {sellerLocation}</span>
              </>
            )}
          </Link>
        )}
        {!sellerId && (
          <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{product.seller?.location || '—'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>Verified</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-50 gap-2">
          <div>
            <span className="text-2xl font-black text-black">${product.pricePerDay}</span>
            <span className="text-gray-400 text-sm"> / day</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50"
              title="Add to cart"
            >
              <ShoppingCart size={18} className="text-gray-600" />
            </button>
            <Link
              href={`/products/${product._id}`}
              className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-bold hover:bg-emerald-600 hover:text-white transition-all"
            >
              Rent Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
