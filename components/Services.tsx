import React, { useRef, useLayoutEffect } from 'react';
import { Section } from './ui/Section';
import { Home, Building2, PaintBucket, Layers, Ruler, Brush, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Services: React.FC = () => {
  const comp = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".bento-item", {
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all"
      });
      
      gsap.from(".service-header", {
        scrollTrigger: {
          trigger: comp.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "all"
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  const services = [
    {
      id: "residential",
      icon: Home,
      title: "Residential Painting",
      description: "Transform your home with our premium interior and exterior painting services. We handle everything from single rooms to full home renovations with care and precision.",
      className: "md:col-span-2 md:row-span-1 bg-slate-50 min-h-[250px]",
      iconClass: "bg-white text-nz-accent"
    },
    {
      id: "commercial",
      icon: Building2,
      title: "Commercial",
      description: "Scalable painting solutions for offices, retail, and warehouses. We work around your schedule to minimize disruption.",
      className: "md:col-span-1 md:row-span-2 bg-slate-900 text-white min-h-[400px]",
      iconClass: "bg-white/10 text-sky-400"
    },
    {
      id: "interior",
      icon: PaintBucket,
      title: "Interior",
      description: "Flawless walls, ceilings, and trims. Expert colour consultation included.",
      className: "md:col-span-1 md:row-span-1 bg-white border border-slate-100 min-h-[250px]",
      iconClass: "bg-sky-50 text-nz-accent"
    },
    {
      id: "exterior",
      icon: Layers,
      title: "Exterior",
      description: "Weather-resistant coatings designed for New Zealand's harsh conditions.",
      className: "md:col-span-1 md:row-span-1 bg-white border border-slate-100 min-h-[250px]",
      iconClass: "bg-sky-50 text-nz-accent"
    },
    {
      id: "roof",
      icon: Ruler,
      title: "Roof Painting",
      description: "Extend your roof's lifespan with cleaning, sealing, and coating.",
      className: "md:col-span-1 md:row-span-1 bg-white border border-slate-100 min-h-[250px]",
      iconClass: "bg-sky-50 text-nz-accent"
    },
    {
      id: "plaster",
      icon: Brush,
      title: "Plastering",
      description: "Surface prep, gib stopping, and repairs for a perfect canvas.",
      className: "md:col-span-1 md:row-span-1 bg-white border border-slate-100 min-h-[250px]",
      iconClass: "bg-sky-50 text-nz-accent"
    }
  ];

  return (
    <div ref={comp}>
      <Section id="services" className="relative overflow-hidden bg-white">
        <div className="service-header text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-sky-100 text-nz-accent font-semibold tracking-wider uppercase text-xs mb-3">Our Expertise</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2 mb-4 tracking-tight">Complete Painting Solutions</h2>
          <p className="text-slate-600 text-lg">Detailed care for every surface. Choose the experts for your next project.</p>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`bento-item rounded-3xl p-8 flex flex-col justify-between group hover:shadow-xl transition-all duration-300 ${service.className}`}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${service.iconClass}`}>
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className={`text-sm leading-relaxed ${service.id === 'commercial' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {service.description}
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <div className={`p-2 rounded-full transition-colors ${service.id === 'commercial' ? 'bg-white/10 group-hover:bg-white/20' : 'bg-slate-100 group-hover:bg-nz-accent group-hover:text-white'}`}>
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          ))}
          
          {/* CTA Card to fill the grid */}
          <div className="bento-item md:col-span-1 md:row-span-1 min-h-[250px] rounded-3xl p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-nz-accent to-sky-600 text-white group cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
            <h3 className="text-2xl font-bold mb-2">Need a Quote?</h3>
            <p className="text-sky-100 text-sm mb-6">Get a fast, free estimate for your project today.</p>
            <span className="bg-white text-nz-accent px-6 py-2 rounded-full font-bold text-sm group-hover:bg-sky-50 transition-colors">Contact Us</span>
          </div>
        </div>
      </Section>
    </div>
  );
};