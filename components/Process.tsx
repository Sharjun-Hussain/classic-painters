import React, { useRef, useLayoutEffect, useMemo } from 'react';
import { MessageSquare, Ruler, FileText, PaintRoller, PartyPopper, ChevronRight, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Process: React.FC = () => {
  const comp = useRef<HTMLDivElement>(null);

  // Memoize steps to prevent unnecessary re-renders
  const steps = useMemo(() => [
    {
      id: "01",
      icon: MessageSquare,
      title: "Request Quote",
      desc: "Fill out our form or call. We respond fast.",
      color: "text-blue-400"
    },
    {
      id: "02",
      icon: Ruler,
      title: "Site Check",
      desc: "We measure up and assess your specific needs.",
      color: "text-indigo-400"
    },
    {
      id: "03",
      icon: FileText,
      title: "Fixed Price",
      desc: "Detailed proposal. No hidden costs or surprises.",
      color: "text-purple-400"
    },
    {
      id: "04",
      icon: PaintRoller,
      title: "We Paint",
      desc: "Our pro team preps carefully and delivers a flawless finish.",
      color: "text-pink-400"
    },
    {
      id: "05",
      icon: PartyPopper,
      title: "Enjoy",
      desc: "Final walkthrough to ensure you're 100% happy.",
      color: "text-emerald-400" // Green for completion
    }
  ], []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".process-header", {
        scrollTrigger: {
          trigger: comp.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // Cards Stagger Animation
      gsap.from(".process-card", {
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1, // Faster stagger for snappier feel
        ease: "back.out(1.5)", // Bouncy gaming feel
        clearProps: "all"
      });

      // Connectors Animation
      gsap.from(".process-connector", {
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 75%",
        },
        scaleX: 0,
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
        stagger: 0.1,
        transformOrigin: "left center",
        ease: "power2.out"
      });

    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp} className="bg-slate-950 text-white py-24 relative overflow-hidden" id="process">

      {/* 1. Optimization: Static Background Texture (reduces paint load vs animating heavy blurs) */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}></div>

      {/* 2. Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">

        {/* Header */}
        <div className="process-header text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sky-400 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            Workflow
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-400 text-lg md:text-xl">
            From your first click to the final brushstroke, we make it effortless.
          </p>
        </div>

        {/* Process Grid */}
        <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">

          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Card */}
              <div className="process-card group relative h-full">
                <div className="
                  h-full relative overflow-hidden rounded-2xl p-6 
                  bg-slate-900/50 border border-white/5 
                  backdrop-blur-md transition-all duration-300
                  hover:bg-slate-800/50 hover:border-sky-500/30 hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-1
                ">

                  {/* Big Background Number (Depth Layer) */}
                  <span className="absolute -right-2 -bottom-6 text-9xl font-black text-white/[0.03] select-none group-hover:text-white/[0.07] transition-colors duration-500 font-sans">
                    {step.id}
                  </span>

                  {/* Icon */}
                  <div className={`
                    w-12 h-12 rounded-xl bg-slate-800 border border-white/10 
                    flex items-center justify-center mb-6 relative z-10
                    shadow-lg group-hover:scale-110 transition-transform duration-300
                  `}>
                    <step.icon size={24} className={step.color} strokeWidth={2} />
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Progress Line (Visual indicator at bottom of card) */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Desktop Connector Arrows (Don't render after last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex process-connector absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none text-slate-700/50"
                  style={{ left: `calc(${((index + 1) / 5) * 100}% - 12px)` }}>
                  <ChevronRight size={24} strokeWidth={3} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="
                  group relative inline-flex items-center gap-3 px-8 py-4 
                  bg-white text-slate-950 rounded-xl font-bold text-lg 
                  overflow-hidden transition-all duration-300 
                  hover:bg-sky-400 hover:text-white hover:shadow-[0_0_40px_-10px_rgba(56,189,248,0.5)]
                "
          >
            <span className="relative z-10">Start Project</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />

            {/* Button Hover Sheen Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
          </button>
        </div>

      </div>
    </div>
  );
};