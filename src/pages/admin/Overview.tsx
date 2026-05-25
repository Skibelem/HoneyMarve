import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Inbox, CheckCircle, Clock, Calendar, ArrowRight, Package } from 'lucide-react';
import { useRequestStore } from '../../store/useRequestStore';
import { useProductStore } from '../../store/useProductStore';

const Overview: React.FC = () => {
  const { requests, getRequestsByStatus } = useRequestStore();
  const { products } = useProductStore();

  const newRequests = getRequestsByStatus('New').length;
  const confirmedRequests = getRequestsByStatus('Confirmed').length;
  const completedRequests = getRequestsByStatus('Completed').length;
  const cateringRequests = requests.filter(r => r.requestType === 'catering').length;
  
  const recentRequests = requests.slice(0, 5);
  const activeProducts = products.filter(p => p.isAvailable).length;

  const statCards = [
    { title: 'Total Requests', value: requests.length, icon: Inbox, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'New (Unread)', value: newRequests, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Confirmed', value: confirmedRequests, icon: CheckCircle, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Completed', value: completedRequests, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Catering Enquiries', value: cateringRequests, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'New': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Contacted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Confirmed': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Preparing': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-deep-wine mb-2">Dashboard Overview</h1>
        <p className="text-espresso-text/70">Welcome back. Here is the current status of your requests and catalogue.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-soft-cream flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-sm text-espresso-text/60 font-medium tracking-wide uppercase mb-1">{stat.title}</p>
              <h3 className="text-3xl font-serif text-deep-wine">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Requests */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-soft-cream overflow-hidden">
          <div className="p-6 border-b border-soft-cream flex justify-between items-center">
            <h2 className="text-xl font-serif text-deep-wine">Recent Requests</h2>
            <Link to="/admin/orders" className="text-sm text-primary-burgundy font-medium flex items-center hover:text-deep-wine">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {recentRequests.length > 0 ? (
            <div className="divide-y divide-soft-cream">
              {recentRequests.map((req) => (
                <div key={req.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-soft-cream/30 transition-colors">
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="text-sm font-bold text-deep-wine">{req.referenceNumber}</span>
                      <span className="text-xs text-espresso-text/50">•</span>
                      <span className="text-sm text-espresso-text/80 font-medium">{req.customerName}</span>
                    </div>
                    <div className="flex items-center text-xs text-espresso-text/60 space-x-3">
                      <span className="capitalize">{req.requestType}</span>
                      <span>•</span>
                      <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(req.status)}`}>
                      {req.status}
                    </span>
                    <Link to="/admin/orders" className="p-2 text-espresso-text/40 hover:text-primary-burgundy transition-colors bg-soft-cream rounded-lg">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-soft-cream rounded-full flex items-center justify-center text-primary-burgundy/30 mb-4">
                <Inbox className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif text-deep-wine mb-2">No Requests Yet</h3>
              <p className="text-sm text-espresso-text/60 max-w-sm mx-auto">
                Customer selections and catering enquiries submitted through the public website will appear here.
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions & Status */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-soft-cream p-6">
            <h2 className="text-xl font-serif text-deep-wine mb-6">Catalogue Status</h2>
            <div className="flex items-center justify-between p-4 bg-soft-cream/50 rounded-2xl mb-6">
              <div className="flex items-center">
                <div className="p-3 bg-white rounded-xl text-primary-burgundy mr-4 shadow-sm">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-espresso-text/60 font-medium uppercase tracking-wider mb-1">Available Items</p>
                  <p className="text-2xl font-serif text-deep-wine">{activeProducts} <span className="text-sm font-sans text-espresso-text/50">/ {products.length}</span></p>
                </div>
              </div>
            </div>
            <Link to="/admin/products" className="w-full flex justify-center items-center py-3 border border-soft-cream text-espresso-text/80 rounded-xl hover:bg-soft-cream hover:text-primary-burgundy transition-colors text-sm font-medium">
              Manage Availability
            </Link>
          </div>

          <div className="bg-deep-wine rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h3 className="text-xl font-serif mb-2">Prototype Mode</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                This dashboard demonstrates digital request recording. Data is saved locally in your browser.
              </p>
              <Link to="/admin/settings" className="inline-flex text-sm font-medium text-muted-honey-gold hover:text-white transition-colors">
                View Settings <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
