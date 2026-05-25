import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, RotateCcw, Trash2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';
import { useRequestStore } from '../../store/useRequestStore';
import { useProductStore } from '../../store/useProductStore';

const FieldRow: React.FC<{ label: string; value: string; confirmed: boolean }> = ({ label, value, confirmed }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-soft-cream last:border-0 gap-2">
    <span className="text-sm font-medium text-espresso-text/60 uppercase tracking-wider">{label}</span>
    <div className="flex items-center gap-2">
      {confirmed ? (
        <>
          <span className="font-medium text-espresso-text">{value}</span>
          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
        </>
      ) : (
        <>
          <span className="text-sm text-espresso-text/40 italic">To be confirmed</span>
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
        </>
      )}
    </div>
  </div>
);

const AdminSettings: React.FC = () => {
  const { resetRequests, requests } = useRequestStore();
  const { resetProductsToSeed, products } = useProductStore();
  const [showResetRequests, setShowResetRequests] = useState(false);
  const [showResetProducts, setShowResetProducts] = useState(false);

  const handleResetRequests = () => {
    resetRequests();
    setShowResetRequests(false);
  };
  const handleResetProducts = () => {
    resetProductsToSeed();
    setShowResetProducts(false);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-serif text-deep-wine mb-1">Settings</h1>
        <p className="text-espresso-text/70">Brand configuration and prototype management controls. Values are read from <code className="bg-soft-cream text-primary-burgundy px-1 py-0.5 rounded text-xs">src/config/business.ts</code>.</p>
      </div>

      {/* Brand Configuration */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-soft-cream overflow-hidden">
        <div className="px-8 py-5 border-b border-soft-cream bg-soft-cream/30">
          <h2 className="text-xl font-serif text-deep-wine">Brand Details</h2>
        </div>
        <div className="px-8 py-2">
          <FieldRow label="Brand Name" value={BUSINESS_CONFIG.brandName} confirmed={!!BUSINESS_CONFIG.brandName} />
          <FieldRow label="Primary Phone" value={BUSINESS_CONFIG.primaryPhone} confirmed={!!BUSINESS_CONFIG.primaryPhone} />
          <FieldRow label="Secondary Phone" value={BUSINESS_CONFIG.secondaryPhone} confirmed={!!BUSINESS_CONFIG.secondaryPhone} />
        </div>
      </motion.div>

      {/* WhatsApp Configuration */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm border border-soft-cream overflow-hidden">
        <div className="px-8 py-5 border-b border-soft-cream bg-soft-cream/30 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-serif text-deep-wine">WhatsApp Order Line</h2>
            <p className="text-sm text-espresso-text/60 mt-1">This number controls all customer WhatsApp continuations across the site.</p>
          </div>
          {!BUSINESS_CONFIG.whatsappNumber && (
            <span className="px-3 py-1 bg-amber-100 text-amber-700 border border-amber-200 rounded-full text-xs font-medium">Not Configured</span>
          )}
        </div>
        <div className="px-8 py-2">
          <FieldRow label="WhatsApp Number" value={BUSINESS_CONFIG.whatsappNumber} confirmed={!!BUSINESS_CONFIG.whatsappNumber} />
        </div>
        {!BUSINESS_CONFIG.whatsappNumber && (
          <div className="px-8 pb-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <p className="font-semibold mb-1">Action Required</p>
              <p>Once the official WhatsApp order number is confirmed, update <code className="bg-amber-100 px-1 rounded">src/config/business.ts</code> → <code className="bg-amber-100 px-1 rounded">whatsappNumber</code>. All customer enquiry flows will activate automatically.</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Social Handles */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl shadow-sm border border-soft-cream overflow-hidden">
        <div className="px-8 py-5 border-b border-soft-cream bg-soft-cream/30">
          <h2 className="text-xl font-serif text-deep-wine">Social Media Handles</h2>
        </div>
        <div className="px-8 py-2">
          <FieldRow label="Instagram" value={BUSINESS_CONFIG.socialHandles.instagram} confirmed={!!BUSINESS_CONFIG.socialHandles.instagram} />
          <FieldRow label="Facebook" value={BUSINESS_CONFIG.socialHandles.facebook} confirmed={!!BUSINESS_CONFIG.socialHandles.facebook} />
          <FieldRow label="Twitter / X" value={BUSINESS_CONFIG.socialHandles.twitter} confirmed={!!BUSINESS_CONFIG.socialHandles.twitter} />
        </div>
      </motion.div>

      {/* Prototype Controls */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-sm border border-soft-cream overflow-hidden">
        <div className="px-8 py-5 border-b border-soft-cream bg-soft-cream/30">
          <h2 className="text-xl font-serif text-deep-wine">Prototype Data Controls</h2>
          <p className="text-sm text-espresso-text/60 mt-1">These controls exist for demonstration purposes only. They affect locally stored prototype data.</p>
        </div>
        <div className="px-8 py-6 space-y-4">
          {/* Reset Requests */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-soft-cream/40 rounded-xl border border-soft-cream">
            <div>
              <p className="font-medium text-espresso-text">Clear All Recorded Requests</p>
              <p className="text-xs text-espresso-text/60 mt-0.5">{requests.length} request{requests.length !== 1 ? 's' : ''} currently stored in browser localStorage.</p>
            </div>
            <button onClick={() => setShowResetRequests(true)} className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors shrink-0">
              <Trash2 className="w-4 h-4 mr-2" /> Clear Requests
            </button>
          </div>

          {showResetRequests && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 border border-red-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-sm text-red-700"><span className="font-semibold">Confirm:</span> This will permanently delete all {requests.length} recorded request(s) from this prototype session.</p>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setShowResetRequests(false)} className="px-3 py-1.5 text-sm bg-white border border-red-200 text-red-700 rounded-lg hover:bg-red-50">Cancel</button>
                <button onClick={handleResetRequests} className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">Delete All</button>
              </div>
            </motion.div>
          )}

          {/* Reset Products */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-soft-cream/40 rounded-xl border border-soft-cream">
            <div>
              <p className="font-medium text-espresso-text">Reset Product Availability</p>
              <p className="text-xs text-espresso-text/60 mt-0.5">Restore all {products.length} products to their original seed availability settings.</p>
            </div>
            <button onClick={() => setShowResetProducts(true)} className="flex items-center px-4 py-2 text-sm font-medium text-espresso-text/70 bg-white border border-soft-cream rounded-xl hover:text-primary-burgundy hover:border-primary-burgundy/30 transition-colors shrink-0">
              <RotateCcw className="w-4 h-4 mr-2" /> Reset Availability
            </button>
          </div>

          {showResetProducts && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-sm text-amber-700"><span className="font-semibold">Confirm:</span> This will restore all products to available. Any admin availability changes will be lost.</p>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setShowResetProducts(false)} className="px-3 py-1.5 text-sm bg-white border border-amber-200 text-amber-700 rounded-lg hover:bg-amber-50">Cancel</button>
                <button onClick={handleResetProducts} className="px-3 py-1.5 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700">Confirm Reset</button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSettings;
