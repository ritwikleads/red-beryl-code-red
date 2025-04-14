'use client';

import { useEffect, useState } from 'react';

export default function LogoAnimation() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        className={`w-32 h-32 relative transition-transform duration-500 ${isVisible ? 'scale-100' : 'scale-50'}`}
      >
        <img 
          src="/favicon.svg" 
          alt="Logo" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}