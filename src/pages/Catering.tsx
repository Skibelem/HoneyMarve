import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Utensils, Users, Calendar } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { useCartStore } from '../store/useCartStore';
import { useRequestStore } from '../store/useRequestStore';

interface FormData {
  fullName: string;
  phone: string;
  eventType: string;
  date: string;
  guests: string;
  description: string;
  contactMethod: string;
}

const Catering: React.FC = () => {
  const { items, getTotalItems, clearCart } = useCartStore();
  const { addRequest } = useRequestStore();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    eventType: 'Corporate Event',
    date: '',
    guests: '',
    description: '',
    contactMethod: 'WhatsApp'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reference, setReference] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save request locally
    const newRequest = addRequest({
      customerName: formData.fullName,
      phoneNumber: formData.phone,
      requestType: 'catering',
      occasionType: formData.eventType,
      proposedDate: formData.date,
      estimatedGuestCount: parseInt(formData.guests, 10),
      requestDetails: formData.description,
      preferredContactMethod: formData.contactMethod,
      selectedItems: items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity
      }))
    });

    setReference(newRequest.referenceNumber);

    // Build the selection list if there are items in the cart
    let selectionText = '';
    if (items.length > 0) {
      selectionText = '\n\n*My Current Selection:*\n' + items.map(item => `- ${item.quantity}x ${item.product.name}`).join('\n');
    }

    // Generate structured WhatsApp message
    const message = `Hello ${BUSINESS_CONFIG.brandName}, I submitted a new enquiry through your website.

*Reference:* ${newRequest.referenceNumber}
*Name:* ${formData.fullName}
*Phone:* ${formData.phone}
*Occasion:* ${formData.eventType}
*Proposed Date:* ${formData.date}
*Estimated Guests:* ${formData.guests}
*Preferred Contact Method:* ${formData.contactMethod}

*Request Details:*
${formData.description}${selectionText}

I would like to discuss the available options. Thank you.`;

    const encodedMessage = encodeURIComponent(message);
    const targetNumber = BUSINESS_CONFIG.whatsappNumber;

    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
      clearCart(); // Clear cart after attaching selection to catering request
      
      if (targetNumber) {
        window.open(`https://wa.me/${targetNumber}?text=${encodedMessage}`, '_blank');
      }
    }, 1500);
  };

  return (
    <div className="bg-warm-ivory min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative px-6 max-w-7xl mx-auto mb-20">
        <div className="bg-deep-wine rounded-[2.5rem] overflow-hidden relative min-h-[500px] flex items-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-deep-wine via-deep-wine/90 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1555243896-c709bfa0b564?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Premium catering spread" 
              className="w-full h-full object-cover object-right"
            />
          </div>
          
          <div className="relative z-20 p-10 md:p-20 lg:w-3/5 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-muted-honey-gold text-sm font-sans tracking-[0.3em] uppercase mb-6 block">
                Bespoke Experiences
              </span>
              <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                Catering & <br /> <span className="italic text-soft-cream">Celebrations</span>
              </h1>
              <p className="text-white/80 text-lg max-w-xl leading-relaxed mb-8">
                Elevate your next event with our premium handcrafted delicacies. From intimate gatherings to grand corporate events, we provide an unforgettable culinary journey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Information & Process Column */}
          <div className="lg:col-span-5 space-y-16">
            <div>
              <h2 className="text-3xl font-serif text-deep-wine mb-8">Our Services</h2>
              <ul className="space-y-6">
                {[
                  { icon: <Users className="w-5 h-5" />, title: 'Celebrations & Gatherings', desc: 'Weddings, birthdays, and private parties.' },
                  { icon: <Utensils className="w-5 h-5" />, title: 'Event Trays & Platters', desc: 'Beautifully arranged assortments ready to serve.' },
                  { icon: <Calendar className="w-5 h-5" />, title: 'Corporate Events', desc: 'Professional catering for meetings and seminars.' },
                ].map((service, idx) => (
                  <li key={idx} className="flex">
                    <div className="w-12 h-12 rounded-full bg-soft-cream flex-shrink-0 flex items-center justify-center text-primary-burgundy mr-4 mt-1">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-serif text-deep-wine mb-1">{service.title}</h3>
                      <p className="text-espresso-text/70 text-sm">{service.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-soft-cream rounded-3xl p-8 border border-white">
              <h3 className="text-xl font-serif text-deep-wine mb-4">How Custom Orders Work</h3>
              <ol className="space-y-4">
                <li className="flex text-sm text-espresso-text/80">
                  <span className="font-bold text-muted-honey-gold mr-3">1.</span>
                  Submit your details via the enquiry form.
                </li>
                <li className="flex text-sm text-espresso-text/80">
                  <span className="font-bold text-muted-honey-gold mr-3">2.</span>
                  Our team will connect with you to discuss options and pricing.
                </li>
                <li className="flex text-sm text-espresso-text/80">
                  <span className="font-bold text-muted-honey-gold mr-3">3.</span>
                  Confirm your tailored menu and secure your date.
                </li>
              </ol>
            </div>
          </div>

          {/* Enquiry Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-soft-cream relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-muted-honey-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0" />
              
              <div className="relative z-10">
                <h2 className="text-3xl font-serif text-deep-wine mb-2">Make an Enquiry</h2>
                <p className="text-espresso-text/70 mb-8">
                  Fill out the details below and we will prepare a personalized quote.
                  {!BUSINESS_CONFIG.whatsappNumber && (
                    <span className="block mt-2 text-primary-burgundy text-xs bg-primary-burgundy/10 p-2 rounded">
                      Note: The official WhatsApp line is pending confirmation. Your enquiry will currently route to a placeholder number.
                    </span>
                  )}
                </p>

                {showConfirmation ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-soft-cream/50 rounded-2xl p-8 text-center"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 shadow-sm">
                      <Send className="w-8 h-8" />
                    </div>
                    <span className="text-muted-honey-gold text-sm font-sans tracking-[0.2em] uppercase mb-4 block">Request Saved</span>
                    <h3 className="text-2xl font-serif text-deep-wine mb-4">Your enquiry has been prepared.</h3>
                    <div className="bg-white py-3 px-6 rounded-xl inline-block mb-6 border border-soft-cream shadow-sm">
                      <span className="text-xs text-espresso-text/60 uppercase tracking-wider block mb-1">Reference Number</span>
                      <span className="text-lg font-medium tracking-wide text-primary-burgundy">{reference}</span>
                    </div>
                    
                    <div className="max-w-md mx-auto">
                      {!BUSINESS_CONFIG.whatsappNumber ? (
                        <div className="bg-amber-50 text-amber-800 p-4 rounded-xl text-sm mb-6 border border-amber-200">
                          WhatsApp ordering will be activated once the official order line is confirmed. Your request has been recorded.
                        </div>
                      ) : (
                        <p className="text-espresso-text/80 mb-6 text-sm">
                          A WhatsApp window has been opened with your structured request. Please hit 'Send' in WhatsApp to connect directly with the HoneyMarve team.
                        </p>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => setShowConfirmation(false)}
                      className="text-sm font-medium text-primary-burgundy hover:text-deep-wine transition-colors underline underline-offset-4"
                    >
                      Submit another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold tracking-wider text-espresso-text/60 uppercase">Occasion *</label>
                        <select 
                          name="eventType"
                          required
                          value={formData.eventType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-soft-cream focus:border-primary-burgundy focus:ring-1 focus:ring-primary-burgundy outline-none transition-all bg-warm-ivory/30"
                        >
                          <option value="Corporate Event">Corporate Event</option>
                          <option value="Wedding">Wedding</option>
                          <option value="Birthday Party">Birthday Party</option>
                          <option value="Private Gathering">Private Gathering</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold tracking-wider text-espresso-text/60 uppercase">Proposed Date *</label>
                        <input 
                          type="date" 
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-soft-cream focus:border-primary-burgundy focus:ring-1 focus:ring-primary-burgundy outline-none transition-all bg-warm-ivory/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold tracking-wider text-espresso-text/60 uppercase">Est. Guests *</label>
                        <input 
                          type="number" 
                          name="guests"
                          required
                          min="1"
                          value={formData.guests}
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
                          <option value="Email">Email</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wider text-espresso-text/60 uppercase">Request Details *</label>
                      <textarea 
                        name="description"
                        required
                        rows={4}
                        placeholder="Tell us about your event and what items you are interested in..."
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-soft-cream focus:border-primary-burgundy focus:ring-1 focus:ring-primary-burgundy outline-none transition-all bg-warm-ivory/30 resize-none"
                      />
                    </div>
                    
                    {getTotalItems() > 0 && (
                      <div className="bg-soft-cream/50 p-4 rounded-xl border border-soft-cream">
                        <p className="text-sm text-espresso-text/80">
                          <span className="font-semibold">Note:</span> Your current selection of {getTotalItems()} item(s) will automatically be attached to this enquiry.
                        </p>
                      </div>
                    )}

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center px-8 py-4 bg-primary-burgundy text-warm-ivory rounded-xl text-base font-medium tracking-wide hover:bg-rich-burgundy transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">Preparing Enquiry...</span>
                      ) : (
                        <>
                          Save & Continue to WhatsApp
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catering;
