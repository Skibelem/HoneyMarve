import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ArrowLeft, MessageSquare } from 'lucide-react';
import { useRequestStore } from '../../store/useRequestStore';
import type { RequestStatus, RequestRecord } from '../../types/request';
import { BUSINESS_CONFIG } from '../../config/business';

const ALL_STATUSES: RequestStatus[] = ['New', 'Contacted', 'Confirmed', 'Preparing', 'Completed', 'Cancelled'];

const statusBadge = (status: string) => {
  switch (status) {
    case 'New': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Contacted': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Confirmed': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'Preparing': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const RequestDetail: React.FC<{ request: RequestRecord; onBack: () => void }> = ({ request, onBack }) => {
  const { updateRequestStatus } = useRequestStore();
  const [status, setStatus] = useState<RequestStatus>(request.status);

  const handleStatusChange = (newStatus: RequestStatus) => {
    setStatus(newStatus);
    updateRequestStatus(request.id, newStatus);
  };

  const buildWhatsAppUrl = () => {
    const msg = `Hello ${request.customerName}, this is HoneyMarve regarding your enquiry *${request.referenceNumber}*. We would like to follow up on your request. Thank you.`;
    return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <button onClick={onBack} className="flex items-center text-espresso-text/60 hover:text-primary-burgundy transition-colors group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium tracking-wide uppercase">Back to Requests</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-soft-cream">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-muted-honey-gold text-xs font-sans tracking-[0.2em] uppercase mb-1 block">Reference</span>
                <h2 className="text-3xl font-serif text-deep-wine">{request.referenceNumber}</h2>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${statusBadge(status)}`}>{status}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div><p className="text-xs uppercase tracking-wider text-espresso-text/50 mb-1">Customer Name</p><p className="font-medium text-espresso-text">{request.customerName}</p></div>
              <div><p className="text-xs uppercase tracking-wider text-espresso-text/50 mb-1">Phone Number</p><p className="font-medium text-espresso-text">{request.phoneNumber}</p></div>
              <div><p className="text-xs uppercase tracking-wider text-espresso-text/50 mb-1">Request Type</p><p className="font-medium text-espresso-text capitalize">{request.requestType}</p></div>
              <div><p className="text-xs uppercase tracking-wider text-espresso-text/50 mb-1">Preferred Contact</p><p className="font-medium text-espresso-text">{request.preferredContactMethod}</p></div>
              <div><p className="text-xs uppercase tracking-wider text-espresso-text/50 mb-1">Date Submitted</p><p className="font-medium text-espresso-text">{new Date(request.createdAt).toLocaleDateString('en-GB', { dateStyle: 'long' })}</p></div>
              <div><p className="text-xs uppercase tracking-wider text-espresso-text/50 mb-1">Last Updated</p><p className="font-medium text-espresso-text">{new Date(request.updatedAt).toLocaleDateString('en-GB', { dateStyle: 'long' })}</p></div>
            </div>

            {request.requestType === 'catering' && (
              <div className="pt-6 border-t border-soft-cream grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div><p className="text-xs uppercase tracking-wider text-espresso-text/50 mb-1">Occasion</p><p className="font-medium text-espresso-text">{request.occasionType || 'N/A'}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-espresso-text/50 mb-1">Proposed Date</p><p className="font-medium text-espresso-text">{request.proposedDate ? new Date(request.proposedDate).toLocaleDateString('en-GB') : 'N/A'}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-espresso-text/50 mb-1">Est. Guests</p><p className="font-medium text-espresso-text">{request.estimatedGuestCount || 'N/A'}</p></div>
              </div>
            )}

            {request.requestDetails && (
              <div className="pt-6 border-t border-soft-cream">
                <p className="text-xs uppercase tracking-wider text-espresso-text/50 mb-2">Request Details</p>
                <p className="text-espresso-text/80 leading-relaxed bg-soft-cream/40 p-4 rounded-xl">{request.requestDetails}</p>
              </div>
            )}
          </div>

          {/* Selected Items */}
          {request.selectedItems.length > 0 && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-soft-cream">
              <h3 className="text-xl font-serif text-deep-wine mb-6">Selected Items</h3>
              <div className="space-y-3">
                {request.selectedItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-soft-cream last:border-0">
                    <span className="font-medium text-espresso-text">{item.productName}</span>
                    <span className="text-sm text-espresso-text/60 bg-soft-cream px-3 py-1 rounded-full">× {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-soft-cream">
            <h3 className="text-lg font-serif text-deep-wine mb-4">Update Status</h3>
            <div className="grid grid-cols-2 gap-2">
              {ALL_STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={`py-2.5 px-3 text-xs font-medium rounded-xl border transition-all ${
                    status === s
                      ? 'bg-primary-burgundy text-white border-primary-burgundy shadow-sm'
                      : 'bg-white text-espresso-text/70 border-soft-cream hover:border-primary-burgundy/30 hover:text-primary-burgundy'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-soft-cream">
            <h3 className="text-lg font-serif text-deep-wine mb-4">Contact Customer</h3>
            {BUSINESS_CONFIG.whatsappNumber ? (
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors text-sm"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Continue on WhatsApp
              </a>
            ) : (
              <div className="p-4 bg-amber-50 text-amber-800 rounded-xl text-xs border border-amber-200">
                WhatsApp contact will be available once the official order line is confirmed in Settings.
              </div>
            )}
            <p className="text-xs text-espresso-text/50 mt-3 text-center">Customer's number: {request.phoneNumber}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AdminRequests: React.FC = () => {
  const { requests } = useRequestStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'All'>('All');
  const [selectedRequest, setSelectedRequest] = useState<RequestRecord | null>(null);

  const filtered = requests.filter((req) => {
    const matchesSearch =
      req.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (selectedRequest) {
    const live = requests.find(r => r.id === selectedRequest.id) || selectedRequest;
    return <RequestDetail request={live} onBack={() => setSelectedRequest(null)} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif text-deep-wine mb-2">Requests & Enquiries</h1>
        <p className="text-espresso-text/70">All customer selections and catering enquiries submitted through the website.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by name or reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-soft-cream bg-white focus:outline-none focus:border-primary-burgundy text-sm shadow-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso-text/40" />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as RequestStatus | 'All')}
            className="appearance-none pl-4 pr-10 py-3 rounded-xl border border-soft-cream bg-white focus:outline-none focus:border-primary-burgundy text-sm shadow-sm"
          >
            <option value="All">All Statuses</option>
            {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso-text/40 pointer-events-none" />
        </div>
      </div>

      {/* Table / Cards */}
      {filtered.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-soft-cream overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-soft-cream bg-soft-cream/40">
                  <th className="text-left py-4 px-6 font-semibold text-xs uppercase tracking-wider text-espresso-text/60">Reference</th>
                  <th className="text-left py-4 px-6 font-semibold text-xs uppercase tracking-wider text-espresso-text/60">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold text-xs uppercase tracking-wider text-espresso-text/60">Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-xs uppercase tracking-wider text-espresso-text/60">Items</th>
                  <th className="text-left py-4 px-6 font-semibold text-xs uppercase tracking-wider text-espresso-text/60">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-xs uppercase tracking-wider text-espresso-text/60">Status</th>
                  <th className="py-4 px-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soft-cream">
                <AnimatePresence>
                  {filtered.map((req) => (
                    <motion.tr
                      key={req.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-soft-cream/20 transition-colors"
                    >
                      <td className="py-4 px-6 font-bold text-deep-wine">{req.referenceNumber}</td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-espresso-text">{req.customerName}</div>
                        <div className="text-xs text-espresso-text/50">{req.phoneNumber}</div>
                      </td>
                      <td className="py-4 px-6 capitalize text-espresso-text/80">{req.requestType}</td>
                      <td className="py-4 px-6 text-espresso-text/70">
                        {req.selectedItems.length > 0 ? `${req.selectedItems.length} item(s)` : 'Catering only'}
                      </td>
                      <td className="py-4 px-6 text-espresso-text/60 text-xs">{new Date(req.createdAt).toLocaleDateString('en-GB')}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge(req.status)}`}>{req.status}</span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="text-primary-burgundy hover:text-deep-wine text-xs font-medium underline underline-offset-4 transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filtered.map((req) => (
              <div key={req.id} className="bg-white rounded-2xl p-6 shadow-sm border border-soft-cream">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="font-bold text-deep-wine">{req.referenceNumber}</span>
                    <p className="text-sm text-espresso-text/80 font-medium mt-0.5">{req.customerName}</p>
                    <p className="text-xs text-espresso-text/50">{req.phoneNumber}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge(req.status)}`}>{req.status}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-espresso-text/60 mb-4">
                  <span className="capitalize">{req.requestType}</span>
                  <span>{new Date(req.createdAt).toLocaleDateString('en-GB')}</span>
                </div>
                <button
                  onClick={() => setSelectedRequest(req)}
                  className="w-full py-2.5 text-sm font-medium text-primary-burgundy border border-primary-burgundy/20 rounded-xl hover:bg-soft-cream transition-colors"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-soft-cream flex flex-col items-center">
          <div className="w-16 h-16 bg-soft-cream rounded-full flex items-center justify-center text-primary-burgundy/30 mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-serif text-deep-wine mb-2">
            {requests.length === 0 ? 'No Requests Yet' : 'No Matches Found'}
          </h3>
          <p className="text-sm text-espresso-text/60 max-w-sm">
            {requests.length === 0
              ? 'Submitted customer selections and catering enquiries will appear here automatically.'
              : 'Try adjusting your search query or status filter.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminRequests;
