import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart, ChefHat } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const MotionLink = motion.create ? motion.create(Link) : motion(Link);

const Home: React.FC = () => {
  return (
    <div className="bg-warm-ivory min-h-screen">
      {/* 1. Cinematic Luxury Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-deep-wine/80 via-deep-wine/60 to-espresso-text/90 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury dining experience" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-muted-honey-gold text-sm md:text-base font-sans tracking-[0.3em] uppercase mb-6 block">
              Experience the Extraordinary
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight">
              A Taste of <br /> <span className="italic text-soft-cream">Pure Luxury</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Elevating your events and daily cravings with premium, handcrafted delicacies. Discover the art of refined snacking.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                to="/menu" 
                className="px-8 py-4 bg-primary-burgundy text-warm-ivory rounded-full text-sm md:text-base font-medium tracking-wide hover:bg-rich-burgundy transition-all duration-300 w-full sm:w-auto text-center border border-primary-burgundy"
              >
                Explore the Menu
              </Link>
              <Link 
                to="/catering" 
                className="px-8 py-4 bg-transparent text-white rounded-full text-sm md:text-base font-medium tracking-wide border border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 w-full sm:w-auto text-center"
              >
                Catering & Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Collections */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="text-primary-burgundy text-sm font-sans tracking-[0.2em] uppercase mb-4 block">Our Offerings</span>
          <h2 className="text-4xl md:text-5xl font-serif text-deep-wine">The Collections</h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            { title: "Signature Drinks", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Freshly Baked Pastries", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Artisan Treats", image: "https://images.unsplash.com/photo-1481391319762-47dff7295406?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Small Chops & Platters", image: "https://images.unsplash.com/photo-1555244406-9b50ae33f7cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Weekend Kitchen Specials", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Catering & Celebrations", image: "https://images.unsplash.com/photo-1555243896-c709bfa0b564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
          ].map((collection, index) => (
            <MotionLink 
              to="/menu" 
              key={index}
              variants={fadeInUp}
              className="group relative h-80 overflow-hidden rounded-xl shadow-md block"
            >
              <div className="absolute inset-0 bg-espresso-text/40 group-hover:bg-espresso-text/20 transition-all duration-500 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-wine/90 via-deep-wine/20 to-transparent opacity-80 z-10" />
              <img 
                src={collection.image} 
                alt={collection.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-serif text-white mb-2">{collection.title}</h3>
                <div className="flex items-center text-muted-honey-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </MotionLink>
          ))}
        </motion.div>
      </section>

      {/* 3. Signature Selection */}
      <section className="py-24 bg-soft-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-end mb-16"
          >
            <div className="max-w-2xl">
              <span className="text-primary-burgundy text-sm font-sans tracking-[0.2em] uppercase mb-4 block">The Masterpieces</span>
              <h2 className="text-4xl md:text-5xl font-serif text-deep-wine mb-6">Signature Selection</h2>
              <p className="text-espresso-text/70 text-lg leading-relaxed">
                Curated with absolute precision and the finest ingredients, our signature items represent the pinnacle of the HoneyMarve experience.
              </p>
            </div>
            <Link to="/menu" className="hidden md:flex items-center text-primary-burgundy hover:text-deep-wine font-medium mt-6 md:mt-0 transition-colors pb-2 border-b border-primary-burgundy/30 hover:border-deep-wine">
              View Full Menu <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                name: "The Royal Platter",
                desc: "An opulent assortment of our finest handcrafted small chops, perfectly seasoned and presented for the ultimate hosting experience. Designed to impress the most discerning guests.",
                img: "https://images.unsplash.com/photo-1541529086526-db283c563270?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              },
              {
                name: "Velvet Ambrosia Drink",
                desc: "Our signature blend of exotic fruits and premium infusions, chilled to perfection. A refreshing, complex flavor profile that dances on the palate with every sip.",
                img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="md:w-2/5 overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-64 md:h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="md:w-3/5 p-8 lg:p-10 flex flex-col justify-center">
                  <Star className="w-5 h-5 text-muted-honey-gold mb-4" />
                  <h3 className="text-2xl font-serif text-deep-wine mb-3">{item.name}</h3>
                  <p className="text-espresso-text/70 leading-relaxed text-sm mb-6 flex-grow">
                    {item.desc}
                  </p>
                  <button className="self-start text-sm font-medium tracking-wide text-primary-burgundy uppercase hover:text-muted-honey-gold transition-colors">
                    Discover More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How Ordering Works */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <span className="text-primary-burgundy text-sm font-sans tracking-[0.2em] uppercase mb-4 block">Seamless Experience</span>
          <h2 className="text-4xl md:text-5xl font-serif text-deep-wine">How It Works</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-primary-burgundy/30 to-transparent" />

          {[
            { icon: <Star className="w-6 h-6" />, title: "Curate", desc: "Browse our premium collections and select the perfect assortments for your occasion or craving." },
            { icon: <ChefHat className="w-6 h-6" />, title: "Craft", desc: "Our culinary artisans prepare your order with meticulous attention to detail and the finest ingredients." },
            { icon: <Heart className="w-6 h-6" />, title: "Enjoy", desc: "Experience the luxury of HoneyMarve, delivered seamlessly to elevate your moments." }
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative text-center z-10"
            >
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm border border-soft-cream text-primary-burgundy mb-8 relative">
                <div className="absolute inset-2 border border-muted-honey-gold/30 rounded-full" />
                {step.icon}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-muted-honey-gold text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-2xl font-serif text-deep-wine mb-4">{step.title}</h3>
              <p className="text-espresso-text/70 leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Catering & Events */}
      <section className="py-24 bg-white border-y border-soft-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-soft-cream rounded-2xl transform -rotate-3 -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1533143708019-ea5cfa80213e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Elegant event catering" 
                className="w-full h-[500px] object-cover rounded-xl shadow-lg"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <span className="text-primary-burgundy text-sm font-sans tracking-[0.2em] uppercase mb-4 block">Bespoke Services</span>
            <h2 className="text-4xl md:text-5xl font-serif text-deep-wine mb-6 leading-tight">Elevate Your Next Celebration</h2>
            <p className="text-espresso-text/80 text-lg mb-8 leading-relaxed">
              From intimate gatherings to grand corporate events, HoneyMarve provides a catering experience that transcends the ordinary. Our team works closely with you to design a tailored menu that perfectly complements your vision, ensuring your guests are treated to an unforgettable culinary journey.
            </p>
            <ul className="space-y-4 mb-10 text-espresso-text/90">
              {['Customized Menus', 'Premium Presentation', 'Professional Service Staff', 'Corporate & Private Events'].map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-muted-honey-gold rounded-full mr-4" />
                  <span className="font-medium tracking-wide">{feature}</span>
                </li>
              ))}
            </ul>
            <Link 
              to="/catering" 
              className="inline-flex items-center px-8 py-4 bg-deep-wine text-warm-ivory rounded-full text-sm font-medium tracking-wide hover:bg-primary-burgundy transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Inquire About Catering
              <ArrowRight className="w-4 h-4 ml-3" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 6. Premium CTA Banner */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-deep-wine/90 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="CTA Background" 
            className="w-full h-full object-cover grayscale opacity-50"
          />
        </div>
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="w-12 h-12 text-muted-honey-gold mx-auto mb-8 opacity-80" />
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
              Ready to indulge in <br className="hidden md:block" /> the HoneyMarve experience?
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
              Treat yourself or someone special to our exquisite range of handcrafted snacks, drinks, and pastries.
            </p>
            <Link 
              to="/menu" 
              className="inline-block px-10 py-5 bg-muted-honey-gold text-deep-wine rounded-full text-base font-semibold tracking-wide hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(197,155,88,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transform hover:-translate-y-1"
            >
              Begin Your Order
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
