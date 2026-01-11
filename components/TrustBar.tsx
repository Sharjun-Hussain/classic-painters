import React, { useRef, useLayoutEffect } from 'react';
import { Award, ShieldCheck, MapPin, ThumbsUp } from 'lucide-react';
import gsap from 'gsap';

export const TrustBar: React.FC = () => {
  const comp = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".trust-item", {
        scrollTrigger: {
          trigger: comp.current,
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  const items = [
    { icon: Award, label: "10+ Years Experience", sub: "Serving Kiwi Homes" },
    { icon: ShieldCheck, label: "Fully Insured", sub: "Public Liability Cover" },
    { icon: MapPin, label: "Local Painters", sub: "NZ Owned & Operated" },
    { icon: ThumbsUp, label: "Satisfaction Guarantee", sub: "Quality Workmanship" },
  ];

  return (
    <div ref={comp} className="relative z-20 -mt-10 mx-4 md:mx-6 lg:mx-auto max-w-7xl">
      <div className="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 p-6 md:p-10 backdrop-blur-sm bg-white/95">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, index) => (
            <div key={index} className="trust-item flex flex-col items-center text-center group">
              <div className="bg-sky-50 p-4 rounded-2xl text-nz-accent mb-4 group-hover:scale-110 group-hover:bg-nz-accent group-hover:text-white transition-all duration-300 shadow-sm">
                <item.icon size={28} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm md:text-base mb-1">{item.label}</h3>
              <p className="text-xs md:text-sm text-slate-500">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};