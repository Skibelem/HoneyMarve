import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { useProductStore } from '../store/useProductStore';
import ProductCard from '../components/ProductCard';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const products = useProductStore((state) => state.products);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="bg-warm-ivory min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="px-6 max-w-7xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary-burgundy text-sm font-sans tracking-[0.2em] uppercase mb-4 block">
            Our Offerings
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-deep-wine mb-6">
            The Premium Menu
          </h1>
          <p className="text-espresso-text/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Curate your selection from our meticulously crafted catalogue. Every item represents the pinnacle of culinary dedication and premium quality.
          </p>
        </motion.div>
      </section>

      {/* Controls: Search & Filter */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          {/* Category Pills */}
          <div className="flex overflow-x-auto pb-4 md:pb-0 hide-scrollbar w-full md:w-auto space-x-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-deep-wine text-warm-ivory shadow-md'
                    : 'bg-white text-espresso-text/80 border border-soft-cream hover:border-primary-burgundy/30 hover:text-primary-burgundy'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <input
              type="text"
              placeholder="Search our menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-soft-cream bg-white text-sm focus:outline-none focus:border-primary-burgundy focus:ring-1 focus:ring-primary-burgundy transition-colors shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-espresso-text/40" />
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 max-w-7xl mx-auto min-h-[50vh]">
        {filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-16 h-16 bg-soft-cream rounded-full flex items-center justify-center mb-6 text-primary-burgundy/50">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-deep-wine mb-3">No offerings found</h3>
            <p className="text-espresso-text/70 max-w-md">
              We couldn't find anything matching "{searchQuery}" in {activeCategory}. Try adjusting your search or browsing another category.
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-6 px-8 py-3 bg-white text-primary-burgundy rounded-full text-sm font-medium border border-primary-burgundy/20 hover:bg-soft-cream transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </section>

      {/* CTA Section */}
      <section className="mt-32 max-w-5xl mx-auto px-6 text-center">
        <div className="bg-soft-cream rounded-3xl p-12 md:p-16 border border-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-muted-honey-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif text-deep-wine mb-4">Planning a Large Gathering?</h2>
            <p className="text-espresso-text/80 text-lg mb-8 max-w-2xl mx-auto">
              For corporate events, weddings, and special celebrations, explore our bespoke catering services tailored to your exact requirements.
            </p>
            <a href="/catering" className="inline-block px-10 py-4 bg-primary-burgundy text-warm-ivory rounded-full font-medium tracking-wide hover:bg-rich-burgundy transition-all duration-300">
              Explore Catering Options
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
