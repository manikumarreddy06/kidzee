import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: Props) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-orange-400 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-16 h-16 text-yellow-500 animate-pulse" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-2 animate-bounce">
          KidzSpark
        </h1>
      </div>
    </div>
  );
}