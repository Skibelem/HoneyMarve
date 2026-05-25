import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', path: '/menu' },
    { name: 'Catering', path: '/catering' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled || isMobileMenuOpen
          ? 'bg-warm-ivory/95 backdrop-blur-md shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Wordmark */}
        <Link to="/" className="flex flex-col items-center justify-center z-50 group">
          <span className={`font-serif font-semibold text-2xl tracking-tight leading-none transition-colors duration-300 ${isScrolled || isMobileMenuOpen || location.pathname !== '/' ? 'text-deep-wine' : 'text-white'}`}>
            HoneyMarve
          </span>
          <span className={`text-[0.6rem] font-sans tracking-[0.2em] uppercase mt-1 transition-colors duration-300 ${isScrolled || isMobileMenuOpen || location.pathname !== '/' ? 'text-muted-honey-gold' : 'text-white/80'}`}>
            Snacks & More
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`font-medium text-sm tracking-wide transition-colors duration-300 hover:text-muted-honey-gold ${
                isScrolled || location.pathname !== '/' ? 'text-espresso-text' : 'text-white/90'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center space-x-4 ml-4">
            <Link 
              to="/cart" 
              className={`flex items-center transition-colors duration-300 hover:text-muted-honey-gold ${
                isScrolled || location.pathname !== '/' ? 'text-espresso-text' : 'text-white/90'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
            </Link>
            <Link 
              to="/menu"
              className="px-6 py-2.5 bg-primary-burgundy text-warm-ivory rounded-full text-sm font-medium tracking-wide hover:bg-rich-burgundy transition-all duration-300 transform hover:scale-105"
            >
              Order Now
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center z-50">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`transition-colors duration-300 ${isScrolled || isMobileMenuOpen || location.pathname !== '/' ? 'text-espresso-text' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-warm-ivory shadow-lg md:hidden border-t border-soft-cream"
          >
            <div className="flex flex-col px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl text-deep-wine"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-soft-cream flex flex-col space-y-4">
                <Link 
                  to="/cart" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-espresso-text"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="font-medium">Cart</span>
                </Link>
                <Link 
                  to="/menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-3 bg-primary-burgundy text-center text-warm-ivory rounded-full text-sm font-medium tracking-wide"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
