'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Users, Package, ShoppingBag, DollarSign, Check, X, Loader2, BarChart3 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('analytics');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, usersRes, prodRes] = await Promise.all([
          axios.get('/api/admin/stats'),
          axios.get('/api/admin/users'),
          axios.get('/api/products?approved=false')
        ]);
        setStats(statsRes.data.stats);
        setUsers(usersRes.data.users);
        setProducts(prodRes.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApproval = async (type, id, isApproved) => {
    try {
      await axios.put('/api/admin/approvals', { type, id, isApproved });
      toast.success(`${type} status updated`);
      // Refresh data
      const [statsRes, usersRes, prodRes] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/admin/users'),
        axios.get('/api/products?approved=false')
      ]);
      setStats(statsRes.data.stats);
      setUsers(usersRes.data.users);
      setProducts(prodRes.data.products);
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  // Chart data: empty until backend provides time-series / category aggregates
  const chartData = [];
  const categoryData = [];

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-emerald-600" size={48} /></div>;

  return (
    <main className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter text-black mb-2">Platform Control</h1>
          <p className="text-gray-500">Monitor activity, approve sellers, and manage marketplace listings.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Users', value: stats.totalUsers, icon: <Users className="text-blue-500" />, color: 'bg-blue-50' },
            { label: 'Total Sellers', value: stats.totalSellers, icon: <ShoppingBag className="text-emerald-500" />, color: 'bg-emerald-50' },
            { label: 'Rentals', value: stats.totalRentals, icon: <Package className="text-purple-500" />, color: 'bg-purple-50' },
            { label: 'Revenue', value: `$${stats.totalEarnings}`, icon: <DollarSign className="text-amber-500" />, color: 'bg-amber-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-black">{stat.value}</p>
              </div>
              <div className={`p-4 ${stat.color} rounded-2xl`}>{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {['analytics', 'approvals', 'users'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold capitalize transition-all ${tab === t ? 'bg-black text-white shadow-xl' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Analytics Content */}
        {tab === 'analytics' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold mb-8">Weekly Rental Activity</h3>
              <div className="h-80 flex items-center justify-center">
                {chartData.length === 0 ? (
                  <p className="text-gray-400 text-sm">No activity data yet. Charts will show real data when available.</p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                      <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={4} dot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold mb-8">Category Performance</h3>
              <div className="h-80 flex items-center justify-center">
                {categoryData.length === 0 ? (
                  <p className="text-gray-400 text-sm">No category data yet. Charts will show real data when available.</p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="value" fill="#000" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Approvals Content */}
        {tab === 'approvals' && (
          <div className="space-y-8">
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-xl font-black">Pending Products ({products.filter((p) => !p.isApproved).length})</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {products.filter((p) => !p.isApproved).map((product) => (
                  <div key={product._id} className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={product.images[0]} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                      <div>
                        <h3 className="font-bold">{product.title}</h3>
                        <p className="text-xs text-gray-400">Seller: {product.seller?.name} • ${product.pricePerDay}/day</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => handleApproval('product', product._id, true)} className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"><Check size={20} /></button>
                      <button onClick={() => handleApproval('product', product._id, false)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><X size={20} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-xl font-black">Pending Sellers ({users.filter((u) => u.role === 'seller' && !u.isApproved).length})</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {users.filter((u) => u.role === 'seller' && !u.isApproved).map((seller) => (
                  <div key={seller._id} className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center font-black text-gray-400 text-2xl">
                        {seller.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold">{seller.name}</h3>
                        <p className="text-xs text-gray-400">{seller.email} • {seller.location || 'Location Not Set'}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => handleApproval('seller', seller._id, true)} className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"><Check size={20} /></button>
                      <button onClick={() => handleApproval('seller', seller._id, false)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><X size={20} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Content */}
        {tab === 'users' && (
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50">
              <h2 className="text-xl font-black">Platform Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <th className="px-8 py-4">User</th>
                    <th className="px-8 py-4">Role</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Joined</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <p className="font-bold text-black">{u.name}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </td>
                      <td className="px-8 py-6 capitalize font-medium">{u.role}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${u.isApproved ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                          {u.isApproved ? 'Approved' : 'Standard'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-400 font-medium">{new Date(u.joinedAt).toLocaleDateString()}</td>
                      <td className="px-8 py-6 text-right">
                        <button className="text-sm font-bold text-red-600 hover:underline">Block User</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
