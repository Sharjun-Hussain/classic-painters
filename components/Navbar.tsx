import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Paintbrush, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import gsap from 'gsap';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Optimized Scroll Handler with RequestAnimationFrame
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldBeScrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== shouldBeScrolled ? shouldBeScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optimized GSAP Animation for Mobile Menu
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
        
        const tl = gsap.timeline();
        tl.set(menuRef.current, { display: 'flex' })
          .to(menuRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power3.out"
          })
          .fromTo(".mobile-nav-item", 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" },
            "-=0.2"
          );
      } else {
        document.body.style.overflow = '';
        gsap.to(menuRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            if (menuRef.current) gsap.set(menuRef.current, { display: 'none' });
          }
        });
      }
    }, menuRef);

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Process', href: '#process' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#testimonials' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-sm py-3 shadow-sm border-b border-slate-100' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group relative z-50">
            <div className={`p-2.5 rounded-xl transition-all duration-300 shadow-lg ${
              isScrolled ? 'bg-nz-accent text-white' : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
            }`}>
              <Paintbrush size={22} className="transform group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight leading-none transition-colors duration-300 ${
                isScrolled ? 'text-slate-900' : 'text-white drop-shadow-sm'
              }`}>
                NZ Painters
              </span>
              <span className={`text-[10px] uppercase tracking-widest font-medium transition-colors duration-300 ${
                isScrolled ? 'text-slate-500' : 'text-slate-300 drop-shadow-sm'
              }`}>
                Professional
              </span>
            </div>
          </a>

          {/* Desktop Nav - Reduced complexity */}
          <nav className={`hidden lg:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-500 ${
            isScrolled 
              ? 'bg-slate-100/80 border-slate-200' 
              : 'bg-white/10 backdrop-blur-md border-white/10'
          }`}>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  isScrolled
                    ? 'text-slate-600 hover:bg-white hover:text-nz-accent hover:shadow-sm'
                    : 'text-slate-100 hover:bg-white/20 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:0800PAINTER" className={`flex items-center gap-2 font-bold transition-colors group ${
              isScrolled ? 'text-slate-700 hover:text-nz-accent' : 'text-white hover:text-sky-300'
            }`}>
              <div className={`p-1.5 rounded-full transition-colors ${isScrolled ? 'bg-slate-100 group-hover:bg-sky-50' : 'bg-white/10 group-hover:bg-white/20'}`}>
                <Phone size={16} className={isScrolled ? "text-nz-accent" : "text-sky-300"} />
              </div>
              <span>0800 PAINTER</span>
            </a>
            <Button 
              variant="primary"
              size="sm" 
              className={`rounded-full px-6 transition-all duration-300 ${
                !isScrolled && "bg-white text-nz-accent hover:bg-sky-50 shadow-none border-0"
              }`}
              onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden relative z-50 p-1 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
              isMobileMenuOpen 
                ? 'bg-slate-100 text-slate-900 shadow-none' 
                : isScrolled 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
            }`}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay - Optimized */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-40 bg-white hidden flex-col justify-center px-6 will-change-[opacity,transform]"
        style={{ opacity: 0 }}
      >
        {/* Background Shapes - Simplified for performance */}
        <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-sky-50 rounded-bl-full opacity-60 -z-10 blur-3xl translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[50vh] h-[50vh] bg-slate-50 rounded-tr-full opacity-60 -z-10 blur-3xl -translate-x-1/4 translate-y-1/4"></div>

        <div className="w-full max-w-lg mx-auto flex flex-col gap-2">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="mobile-nav-item text-4xl md:text-5xl font-bold text-slate-900 hover:text-nz-accent transition-colors flex items-center justify-between group py-3 border-b border-slate-100 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
              <ArrowRight className="text-nz-accent opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" size={32} />
            </a>
          ))}
          
          <div className="mobile-nav-item mt-10 flex flex-col gap-4">
            <a href="tel:0800PAINTER" className="flex items-center gap-4 text-xl font-bold text-slate-600 hover:text-nz-accent transition-colors p-5 bg-slate-50 rounded-2xl group border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-nz-accent shadow-sm group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              0800 PAINTER
            </a>
            
            <Button 
              fullWidth 
              size="lg" 
              className="text-lg py-5 rounded-2xl shadow-xl shadow-sky-900/20" 
              onClick={() => {
                setIsMobileMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
              }}
            >
              Get Your Free Quote
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};