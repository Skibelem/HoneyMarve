import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotalItems } = useCartStore();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="bg-warm-ivory min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-12 md:p-20 shadow-sm border border-soft-cream flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-soft-cream rounded-full flex items-center justify-center mb-8 text-primary-burgundy/30">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-deep-wine mb-4">Your Selection is Empty</h1>
            <p className="text-espresso-text/70 text-lg mb-10 max-w-md">
              You haven't added any of our premium offerings to your selection yet. Explore our menu to begin curating your order.
            </p>
            <Link 
              to="/menu"
              className="px-10 py-4 bg-primary-burgundy text-warm-ivory rounded-full text-base font-medium tracking-wide hover:bg-rich-burgundy transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Browse The Menu
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-warm-ivory min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-deep-wine mb-4">Your Selection</h1>
          <p className="text-espresso-text/70 text-lg max-w-2xl">
            Review your curated items below. Pricing and fulfilment details will be confirmed when you submit your request to our team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-soft-cream">
              <span className="text-sm font-medium text-espresso-text/60 uppercase tracking-wider">
                {getTotalItems()} Item{getTotalItems() !== 1 ? 's' : ''}
              </span>
              <button 
                onClick={clearCart}
                className="text-sm font-medium text-primary-burgundy hover:text-deep-wine transition-colors underline underline-offset-4"
              >
                Clear All
              </button>
            </div>

            <motion.div layout className="space-y-6">
              {items.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={item.product.id}
                  className="bg-white rounded-2xl p-4 flex items-center shadow-sm border border-transparent hover:border-soft-cream transition-colors"
                >
                  <Link to={`/product/${item.product.slug}`} className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-soft-cream">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  
                  <div className="ml-6 flex-grow flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="mb-4 sm:mb-0">
                      <span className="text-[0.65rem] font-sans tracking-[0.2em] uppercase text-muted-honey-gold mb-1 block">
                        {item.product.category}
                      </span>
                      <Link to={`/product/${item.product.slug}`}>
                        <h3 className="text-lg font-serif text-deep-wine hover:text-primary-burgundy transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center bg-soft-cream rounded-full px-3 py-1">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-6 h-6 flex items-center justify-center text-espresso-text/60 hover:text-primary-burgundy disabled:opacity-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-espresso-text">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-espresso-text/60 hover:text-primary-burgundy transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.product.id)}
                        className="text-espresso-text/40 hover:text-red-500 transition-colors p-2"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Action Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-soft-cream sticky top-32">
              <h2 className="text-2xl font-serif text-deep-wine mb-6">Next Steps</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-soft-cream flex flex-shrink-0 items-center justify-center text-muted-honey-gold text-sm font-bold">1</div>
                  <p className="text-sm text-espresso-text/80 leading-relaxed pt-1">
                    Review your curated selection. Ensure you have the right quantities.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-soft-cream flex flex-shrink-0 items-center justify-center text-muted-honey-gold text-sm font-bold">2</div>
                  <p className="text-sm text-espresso-text/80 leading-relaxed pt-1">
                    Submit your selection via our premium enquiry form.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-soft-cream flex flex-shrink-0 items-center justify-center text-muted-honey-gold text-sm font-bold">3</div>
                  <p className="text-sm text-espresso-text/80 leading-relaxed pt-1">
                    Our team will contact you to confirm pricing, availability, and delivery details.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-soft-cream">
                <button 
                  onClick={() => navigate('/catering')}
                  className="w-full flex items-center justify-center px-8 py-4 bg-primary-burgundy text-warm-ivory rounded-full text-sm font-medium tracking-wide hover:bg-rich-burgundy transition-all duration-300 shadow-md"
                >
                  Submit Enquiry
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button 
                  onClick={() => navigate('/menu')}
                  className="w-full flex items-center justify-center px-8 py-4 bg-white text-primary-burgundy border border-primary-burgundy/20 rounded-full text-sm font-medium tracking-wide hover:bg-soft-cream transition-all duration-300"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
