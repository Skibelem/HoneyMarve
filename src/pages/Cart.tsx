import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, Send, AlertTriangle } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useProductStore } from '../store/useProductStore';
import { useRequestStore } from '../store/useRequestStore';
import { BUSINESS_CONFIG } from '../config/business';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotalItems } = useCartStore();
  const { products } = useProductStore();
  const { addRequest } = useRequestStore();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    contactMethod: 'WhatsApp',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reference, setReference] = useState('');

  // Map cart items against current product store to check availability
  const enrichedItems = useMemo(() => {
    return items.map(item => {
      const currentProduct = products.find(p => p.id === item.product.id);
      return {
        ...item,
        isAvailable: currentProduct ? currentProduct.isAvailable : false
      };
    });
  }, [items, products]);

  const hasUnavailableItems = enrichedItems.some(item => !item.isAvailable);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasUnavailableItems) return;
    
    setIsSubmitting(true);

    // Save locally
    const newRequest = addRequest({
      customerName: formData.fullName,
      phoneNumber: formData.phone,
      requestType: 'selection',
      selectedItems: enrichedItems.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity
      })),
      requestDetails: formData.message || 'Standard selection request.',
      preferredContactMethod: formData.contactMethod
    });

    setReference(newRequest.referenceNumber);

    // Format WhatsApp message
    const selectionText = enrichedItems.map(item => `- ${item.quantity}x ${item.product.name}`).join('\n');
    
    const whatsappMsg = `Hello ${BUSINESS_CONFIG.brandName}, I submitted a new enquiry through your website.

*Reference:* ${newRequest.referenceNumber}
*Name:* ${formData.fullName}
*Phone:* ${formData.phone}
*Request Type:* Selection Request
*Preferred Contact Method:* ${formData.contactMethod}

*Selected Items:*
${selectionText}

*Message:*
${formData.message || 'N/A'}

I would like to confirm pricing and availability. Thank you.`;

    const encodedMessage = encodeURIComponent(whatsappMsg);
    const targetNumber = BUSINESS_CONFIG.whatsappNumber;

    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
      clearCart();
      
      if (targetNumber) {
        window.open(`https://wa.me/${targetNumber}?text=${encodedMessage}`, '_blank');
      }
    }, 1500);
  };

  if (items.length === 0 && !showConfirmation) {
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
      <div className="max-w-6xl mx-auto">
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

        {showConfirmation ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-12 text-center shadow-sm border border-soft-cream max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <Send className="w-10 h-10" />
            </div>
            <span className="text-muted-honey-gold text-sm font-sans tracking-[0.2em] uppercase mb-4 block">Request Saved</span>
            <h2 className="text-3xl md:text-4xl font-serif text-deep-wine mb-4">Your enquiry has been prepared.</h2>
            <div className="bg-soft-cream/50 py-4 px-8 rounded-xl inline-block mb-8 border border-soft-cream">
              <span className="text-sm text-espresso-text/60 uppercase tracking-wider block mb-1">Reference Number</span>
              <span className="text-xl font-medium tracking-wide text-primary-burgundy">{reference}</span>
            </div>
            
            <div className="max-w-md mx-auto">
              {!BUSINESS_CONFIG.whatsappNumber ? (
                <div className="bg-amber-50 text-amber-800 p-4 rounded-xl text-sm mb-8 border border-amber-200">
                  WhatsApp ordering will be activated once the official order line is confirmed. Your request has been recorded.
                </div>
              ) : (
                <p className="text-espresso-text/80 mb-8">
                  A WhatsApp window has been opened with your structured request. Please hit 'Send' in WhatsApp to complete your enquiry.
                </p>
              )}
            </div>
            
            <Link 
              to="/menu"
              className="inline-flex items-center justify-center px-10 py-4 bg-primary-burgundy text-warm-ivory rounded-full text-base font-medium tracking-wide hover:bg-rich-burgundy transition-all duration-300 shadow-md"
            >
              Return to Menu
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Items List */}
            <div className="lg:col-span-7 space-y-6">
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

              <div className="space-y-6">
                <AnimatePresence>
                  {enrichedItems.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={item.product.id}
                      className={`bg-white rounded-2xl p-4 flex flex-col sm:flex-row shadow-sm border transition-colors ${
                        !item.isAvailable ? 'border-red-200 bg-red-50/30' : 'border-transparent hover:border-soft-cream'
                      }`}
                    >
                      <div className="flex items-center flex-grow">
                        <Link to={`/product/${item.product.slug}`} className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-soft-cream relative">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className={`w-full h-full object-cover ${!item.isAvailable ? 'grayscale opacity-70' : ''}`}
                          />
                        </Link>
                        
                        <div className="ml-6 flex-grow">
                          <span className="text-[0.65rem] font-sans tracking-[0.2em] uppercase text-muted-honey-gold mb-1 block">
                            {item.product.category}
                          </span>
                          <Link to={`/product/${item.product.slug}`}>
                            <h3 className={`text-lg font-serif hover:text-primary-burgundy transition-colors ${!item.isAvailable ? 'text-espresso-text/60 line-through' : 'text-deep-wine'}`}>
                              {item.product.name}
                            </h3>
                          </Link>
                          
                          {/* Unavailable Warning */}
                          {!item.isAvailable && (
                            <div className="flex items-start mt-2 text-red-600 text-xs">
                              <AlertTriangle className="w-3.5 h-3.5 mr-1 flex-shrink-0 mt-0.5" />
                              <span>This item is currently unavailable and should be removed before submitting your request.</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:ml-6 flex items-center justify-between sm:justify-end sm:space-x-6 pl-24 sm:pl-0 border-t sm:border-t-0 border-soft-cream pt-4 sm:pt-0">
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
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Request Form Panel */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-soft-cream sticky top-32">
                <h2 className="text-2xl font-serif text-deep-wine mb-2">Request Selected Items</h2>
                <p className="text-sm text-espresso-text/70 mb-8">
                  Provide your details below to submit this selection to our team.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wider text-espresso-text/60 uppercase">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-soft-cream focus:border-primary-burgundy focus:ring-1 focus:ring-primary-burgundy outline-none transition-all bg-warm-ivory/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wider text-espresso-text/60 uppercase">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-soft-cream focus:border-primary-burgundy focus:ring-1 focus:ring-primary-burgundy outline-none transition-all bg-warm-ivory/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wider text-espresso-text/60 uppercase">Preferred Contact *</label>
                    <select 
                      name="contactMethod"
                      required
                      value={formData.contactMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-soft-cream focus:border-primary-burgundy focus:ring-1 focus:ring-primary-burgundy outline-none transition-all bg-warm-ivory/30"
                    >
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Phone Call">Phone Call</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wider text-espresso-text/60 uppercase">Message (Optional)</label>
                    <textarea 
                      name="message"
                      rows={3}
                      placeholder="Any specific delivery instructions or notes?"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-soft-cream focus:border-primary-burgundy focus:ring-1 focus:ring-primary-burgundy outline-none transition-all bg-warm-ivory/30 resize-none"
                    />
                  </div>

                  {hasUnavailableItems && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-start border border-red-100">
                      <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
                      <p>You cannot submit this request while unavailable items remain in your selection. Please remove them to continue.</p>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmitting || hasUnavailableItems}
                    className="w-full flex items-center justify-center px-8 py-4 bg-primary-burgundy text-warm-ivory rounded-xl text-sm font-medium tracking-wide hover:bg-rich-burgundy transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                  >
                    {isSubmitting ? 'Preparing Request...' : 'Submit Request'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
