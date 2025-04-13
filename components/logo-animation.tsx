'use client';

import { useEffect, useState } from 'react';

export default function LogoAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
      <div className="w-32 h-32 relative">
        <img 
          src="/favicon.svg" 
          alt="Logo" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}