import React from 'react';
import { Phone, CalendarCheck } from 'lucide-react';
import { Button } from './ui/Button';

export const StickyMobileCTA: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden z-40 flex gap-3">
      <Button 
        variant="secondary" 
        className="flex-1 flex items-center justify-center gap-2"
        onClick={() => window.location.href = 'tel:0800PAINTER'}
      >
        <Phone size={18} />
        Call Now
      </Button>
      <Button 
        variant="primary" 
        className="flex-1 flex items-center justify-center gap-2"
        onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
      >
        <CalendarCheck size={18} />
        Get Quote
      </Button>
    </div>
  );
};