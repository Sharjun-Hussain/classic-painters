import React, { useRef, useLayoutEffect } from 'react';
import { Button } from './ui/Button';
import { CheckCircle2, Phone, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  const comp = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Animate background
      tl.from("#hero-bg", { 
        scale: 1.15, 
        duration: 2.5, 
        ease: "power2.out" 
      }, 0);

      // Animate Content
      tl.from(".hero-anim", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      }, 0.5);

    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          id="hero-bg"
          src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2670&auto=format&fit=crop" 
          alt="Professional Painter in New Zealand" 
          className="w-full h-full object-cover object-center transform scale-100"
        />
        {/* Enhanced Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-slate-900/50"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10 text-white">
        <div className="max-w-3xl">
          <div className="hero-anim inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium text-sky-200 mb-6 border border-white/20 shadow-lg ring-1 ring-white/10">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
            Available for Booking in NZ
          </div>
          
          <h1 className="hero-anim text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight drop-shadow-sm">
            Professional Painting Services <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-sky-500">Across New Zealand</span>
          </h1>
          
          <p className="hero-anim text-lg md:text-xl text-slate-200 mb-10 leading-relaxed max-w-2xl drop-shadow-md">
            Residential and commercial painters you can trust. We deliver premium finishes, on time and within budget. Experience the difference with NZ Painters.
          </p>
          
          <div className="hero-anim flex flex-col sm:flex-row gap-5 mb-12">
            <Button 
              size="lg" 
              className="rounded-full text-lg px-8 py-4 shadow-2xl shadow-sky-500/20 bg-gradient-to-r from-nz-accent to-sky-500 border border-sky-400/20 hover:scale-105 transition-all duration-300 group"
              onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
            >
              Get a Free Quote
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full border-white/30 text-white bg-white/5 backdrop-blur-md hover:bg-white/15 hover:border-white/50 px-8 py-4 transition-all duration-300 hover:shadow-lg shadow-black/10"
              onClick={() => window.location.href = 'tel:0800PAINTER'}
            >
              <Phone className="mr-2 h-5 w-5 fill-current" />
              Call Now
            </Button>
          </div>

          <div className="hero-anim flex flex-wrap gap-6 text-sm font-medium text-slate-300">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-500/20 rounded-full border border-green-500/30">
                <CheckCircle2 className="text-green-400 h-4 w-4" />
              </div>
              <span className="drop-shadow-sm">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-500/20 rounded-full border border-green-500/30">
                <CheckCircle2 className="text-green-400 h-4 w-4" />
              </div>
              <span className="drop-shadow-sm">5-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-500/20 rounded-full border border-green-500/30">
                <CheckCircle2 className="text-green-400 h-4 w-4" />
              </div>
              <span className="drop-shadow-sm">Local NZ Business</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};