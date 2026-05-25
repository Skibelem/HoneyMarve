import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, RotateCcw } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { CATEGORIES } from '../../data/products';

const AdminProducts: React.FC = () => {
  const { products, toggleAvailability, resetProductsToSeed } = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, activeCategory]);

  const handleReset = () => {
    resetProductsToSeed();
    setShowResetConfirm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-deep-wine mb-1">Product Availability</h1>
          <p className="text-espresso-text/70">Toggle availability to control what customers can view and select.</p>
        </div>
        <button
          onClick={() => setShowResetConfirm(true)}
          className="flex items-center px-4 py-2.5 text-sm font-medium text-espresso-text/70 border border-soft-cream bg-white rounded-xl hover:text-primary-burgundy hover:border-primary-burgundy/30 transition-colors shadow-sm"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset to Seed Data
        </button>
      </div>

      {/* Reset Confirmation */}
      {showResetConfirm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <p className="font-semibold text-amber-800 mb-1">Reset all availability settings?</p>
            <p className="text-sm text-amber-700">This will restore all products to their original seed availability. This action affects local prototype data only.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button onClick={() => setShowResetConfirm(false)} className="px-4 py-2 text-sm font-medium bg-white border border-amber-200 text-amber-800 rounded-xl hover:bg-amber-50 transition-colors">Cancel</button>
            <button onClick={handleReset} className="px-4 py-2 text-sm font-medium bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors">Confirm Reset</button>
          </div>
        </motion.div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow max-w-sm">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-soft-cream bg-white focus:outline-none focus:border-primary-burgundy text-sm shadow-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso-text/40" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all border ${
                activeCategory === cat
                  ? 'bg-deep-wine text-warm-ivory border-deep-wine'
                  : 'bg-white text-espresso-text/70 border-soft-cream hover:border-primary-burgundy/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all ${
              !product.isAvailable ? 'border-red-200 opacity-80' : 'border-soft-cream'
            }`}
          >
            <div className="relative h-40 overflow-hidden bg-soft-cream">
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-cover transition-all duration-500 ${!product.isAvailable ? 'grayscale opacity-60' : ''}`}
              />
              {product.isFeatured && (
                <div className="absolute top-3 left-3 bg-muted-honey-gold text-white text-[0.65rem] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                  <Star className="w-3 h-3" />
                  Featured
                </div>
              )}
              {!product.isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-espresso-text/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    Unavailable
                  </span>
                </div>
              )}
            </div>

            <div className="p-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="text-muted-honey-gold text-[0.65rem] font-sans tracking-[0.15em] uppercase block mb-1">
                  {product.category}
                </span>
                <h3 className={`font-serif text-lg leading-snug ${!product.isAvailable ? 'text-espresso-text/50 line-through' : 'text-deep-wine'}`}>
                  {product.name}
                </h3>
                <p className="text-xs text-espresso-text/60 mt-1 line-clamp-2 leading-relaxed">{product.shortDescription}</p>
              </div>

              {/* Toggle */}
              <button
                onClick={() => toggleAvailability(product.id)}
                title={product.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                className={`relative shrink-0 inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                  product.isAvailable ? 'bg-primary-burgundy' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-300 ${
                    product.isAvailable ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className={`px-5 pb-4 text-xs font-medium ${product.isAvailable ? 'text-green-600' : 'text-red-500'}`}>
              {product.isAvailable ? '● Available on menu' : '● Hidden from menu'}
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-soft-cream">
          <p className="text-xl font-serif text-deep-wine mb-2">No products found</p>
          <p className="text-sm text-espresso-text/60">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
