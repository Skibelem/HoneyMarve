import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import { useCartStore } from '../store/useCartStore';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const getProductBySlug = useProductStore((state) => state.getProductBySlug);

  const product = slug ? getProductBySlug(slug) : undefined;
  const isInCart = product ? items.some(item => item.product.id === product.id) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <AlertCircle className="w-16 h-16 text-primary-burgundy/50 mb-6" />
        <h1 className="text-4xl font-serif text-deep-wine mb-4">Product Not Found</h1>
        <p className="text-lg text-espresso-text/80 mb-8 max-w-md">
          The offering you're looking for doesn't exist or has been removed from our current menu.
        </p>
        <Link 
          to="/menu" 
          className="px-8 py-3 bg-primary-burgundy text-warm-ivory rounded-full font-medium tracking-wide hover:bg-rich-burgundy transition-colors duration-300"
        >
          Return to Menu
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    if (product.isAvailable) {
      addItem(product);
    }
  };

  return (
    <div className="bg-warm-ivory min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => navigate('/menu')}
          className="flex items-center text-espresso-text/60 hover:text-primary-burgundy transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium tracking-wide uppercase">Back to Menu</span>
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col lg:flex-row min-h-[600px]">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 relative bg-soft-cream"
          >
            <div className="absolute inset-0 bg-espresso-text/5 z-10" />
            {!product.isAvailable && (
              <div className="absolute top-6 left-6 z-20 bg-espresso-text text-white text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                Currently Unavailable
              </div>
            )}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover min-h-[400px]"
            />
          </motion.div>

          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center"
          >
            <span className="text-muted-honey-gold text-sm font-sans tracking-[0.2em] uppercase mb-4 block">
              {product.category}
            </span>
            <h1 className="text-4xl lg:text-5xl font-serif text-deep-wine mb-6 leading-tight">
              {product.name}
            </h1>
            
            <div className="prose prose-lg prose-p:text-espresso-text/80 mb-10">
              <p className="font-light leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            <div className="mt-auto pt-8 border-t border-soft-cream">
              {product.enquiryOnly ? (
                <div className="space-y-4">
                  <p className="text-sm text-espresso-text/60 italic mb-4">
                    This is a bespoke service requiring personalized consultation.
                  </p>
                  <Link 
                    to="/catering"
                    className="flex items-center justify-center w-full px-8 py-4 bg-deep-wine text-warm-ivory rounded-full text-base font-medium tracking-wide hover:bg-primary-burgundy transition-all duration-300"
                  >
                    Request This Service
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <button 
                    onClick={handleAdd}
                    disabled={!product.isAvailable || isInCart}
                    className={`flex items-center justify-center w-full sm:w-auto px-10 py-4 rounded-full text-base font-medium tracking-wide transition-all duration-300 flex-grow ${
                      !product.isAvailable
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : isInCart
                        ? 'bg-soft-cream text-deep-wine cursor-default'
                        : 'bg-primary-burgundy text-warm-ivory hover:bg-rich-burgundy shadow-md hover:shadow-lg'
                    }`}
                  >
                    {isInCart ? (
                      <>
                        <Check className="w-5 h-5 mr-2 text-muted-honey-gold" />
                        In Your Selection
                      </>
                    ) : !product.isAvailable ? (
                      'Sold Out'
                    ) : (
                      'Add to Selection'
                    )}
                  </button>
                  
                  {isInCart && (
                    <Link 
                      to="/cart"
                      className="text-sm font-medium text-primary-burgundy hover:text-deep-wine transition-colors underline underline-offset-4"
                    >
                      View Selection
                    </Link>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
