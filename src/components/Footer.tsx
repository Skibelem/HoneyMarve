import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-wine text-warm-ivory pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col group inline-block">
              <span className="font-serif font-semibold text-3xl tracking-tight leading-none text-white">
                HoneyMarve
              </span>
              <span className="text-[0.7rem] font-sans tracking-[0.2em] uppercase mt-1 text-muted-honey-gold">
                Snacks & More
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Elevating your events and daily cravings with premium, handcrafted delicacies. A taste of luxury in every bite.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-muted-honey-gold hover:text-deep-wine transition-all duration-300 font-serif italic text-sm">
                Ig
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-muted-honey-gold hover:text-deep-wine transition-all duration-300 font-serif italic text-sm">
                Fb
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-muted-honey-gold hover:text-deep-wine transition-all duration-300 font-serif italic text-sm">
                X
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl mb-6 text-white">Explore</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li><Link to="/menu" className="hover:text-muted-honey-gold transition-colors duration-300">Our Menu</Link></li>
              <li><Link to="/catering" className="hover:text-muted-honey-gold transition-colors duration-300">Catering & Events</Link></li>
              <li><Link to="/about" className="hover:text-muted-honey-gold transition-colors duration-300">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-muted-honey-gold transition-colors duration-300">Contact Us</Link></li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-serif text-xl mb-6 text-white">Collections</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li><Link to="/menu" className="hover:text-muted-honey-gold transition-colors duration-300">Signature Drinks</Link></li>
              <li><Link to="/menu" className="hover:text-muted-honey-gold transition-colors duration-300">Freshly Baked Pastries</Link></li>
              <li><Link to="/menu" className="hover:text-muted-honey-gold transition-colors duration-300">Artisan Treats</Link></li>
              <li><Link to="/menu" className="hover:text-muted-honey-gold transition-colors duration-300">Small Chops & Platters</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-xl mb-6 text-white">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-muted-honey-gold flex-shrink-0 mt-0.5" />
                <span>123 Premium Lane, Luxury District, City</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-muted-honey-gold flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-muted-honey-gold flex-shrink-0" />
                <span>hello@honeymarve.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} HoneyMarve Snacks & More. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
