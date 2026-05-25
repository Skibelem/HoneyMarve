import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import type { Product } from '../data/products';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to detail page when clicking 'Add'
    addItem(product);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-transparent hover:border-muted-honey-gold/30 transition-all duration-300 h-full"
    >
      <Link to={`/product/${product.slug}`} className="block relative h-64 overflow-hidden">
        {!product.isAvailable && (
          <div className="absolute top-4 right-4 z-20 bg-espresso-text/90 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Sold Out
          </div>
        )}
        <div className="absolute inset-0 bg-espresso-text/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
      </Link>
      
      <div className="p-6 flex flex-col flex-grow relative">
        <span className="text-muted-honey-gold text-xs font-sans tracking-[0.2em] uppercase mb-2 block">
          {product.category}
        </span>
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-xl font-serif text-deep-wine mb-3 group-hover:text-primary-burgundy transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-espresso-text/70 text-sm leading-relaxed mb-6 flex-grow">
          {product.shortDescription}
        </p>
        
        <div className="pt-4 border-t border-soft-cream flex items-center justify-between mt-auto">
          <Link 
            to={`/product/${product.slug}`}
            className="text-sm font-medium tracking-wide text-espresso-text hover:text-muted-honey-gold transition-colors flex items-center"
          >
            View Details
          </Link>
          
          {product.enquiryOnly ? (
            <Link 
              to={`/product/${product.slug}`}
              className="w-10 h-10 rounded-full bg-soft-cream flex items-center justify-center text-primary-burgundy hover:bg-primary-burgundy hover:text-white transition-colors duration-300"
              title="Request This Service"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button 
              onClick={handleAdd}
              disabled={!product.isAvailable}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                product.isAvailable 
                  ? 'bg-soft-cream text-primary-burgundy hover:bg-primary-burgundy hover:text-white' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              title="Add to Selection"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
