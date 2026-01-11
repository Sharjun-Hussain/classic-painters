import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Section } from './ui/Section';
import { MoveHorizontal, ArrowLeftRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".comparison-container", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
      
      gsap.from(".comparison-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    let clientX;

    if ('touches' in event) {
      clientX = event.touches[0].clientX;
    } else {
      clientX = (event as React.MouseEvent).clientX;
    }

    // Calculate position relative to container
    const x = Math.max(0, Math.min(clientX - containerRect.left, containerRect.width));
    const percentage = (x / containerRect.width) * 100;

    setSliderPosition(percentage);
  };

  return (
    <div ref={sectionRef}>
      <Section id="transformations" className="bg-white">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Text Content */}
          <div className="w-full md:w-1/3 comparison-text">
            <span className="text-nz-accent font-semibold tracking-wider uppercase text-sm mb-2 block">Real Results</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">See the <br/><span className="text-nz-accent">Difference</span></h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              A fresh coat of paint does more than just look good—it protects your home and adds significant value. Slide to see the transformation power of professional preparation and premium materials.
            </p>
            
            <div className="flex items-center gap-4 text-sm font-medium text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <ArrowLeftRight className="text-nz-accent" />
              <span>Drag the slider or hover to compare before and after.</span>
            </div>
          </div>

          {/* Comparison Slider */}
          <div className="w-full md:w-2/3 comparison-container">
            <div 
              ref={containerRef}
              className="relative w-full aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-2xl ring-1 ring-black/5"
              onMouseMove={handleMove}
              onTouchMove={handleMove}
            >
              {/* AFTER Image (Background) */}
              <img 
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop" 
                alt="After Painting" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-nz-accent shadow-sm z-10">
                AFTER
              </div>

              {/* BEFORE Image (Clipped Overlay) */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop" 
                  alt="Before Painting" 
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ 
                    width: containerRef.current ? containerRef.current.offsetWidth : '100%',
                    filter: 'grayscale(100%) sepia(20%) brightness(85%) contrast(90%) blur(0.5px)' 
                  }} 
                />
                 <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm z-10">
                  BEFORE
                </div>
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-nz-accent">
                  <MoveHorizontal size={24} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </Section>
    </div>
  );
};