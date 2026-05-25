import React from 'react';
import { Link } from 'react-router-dom';

interface PlaceholderProps {
  title: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ title }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-serif text-deep-wine mb-4">{title}</h1>
      <p className="text-lg text-espresso-text/80 mb-8 max-w-md">
        This page is currently being crafted with care. Please check back later for our premium experience.
      </p>
      <Link 
        to="/" 
        className="px-8 py-3 bg-primary-burgundy text-warm-ivory rounded-full font-medium tracking-wide hover:bg-rich-burgundy transition-colors duration-300"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default Placeholder;
