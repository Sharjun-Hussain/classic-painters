import React from 'react';
import { Button } from './ui/Button';

export const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Don't Settle for Less Than Perfect</h2>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Your home or business deserves a premium finish that lasts. Let our team of experts handle the hard work while you enjoy the results.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
                Get Your Free Quote
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.location.href = 'tel:0800PAINTER'}>
                Call 0800 PAINTER
            </Button>
        </div>
      </div>
    </section>
  );
};
