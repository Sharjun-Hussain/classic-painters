import React, { useRef, useLayoutEffect } from 'react';
import { MessageSquare, Ruler, FileText, PaintRoller, PartyPopper, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Process: React.FC = () => {
  const comp = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Line animation for desktop
      gsap.from(".process-line-fill", {
        scrollTrigger: {
          trigger: ".process-container",
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1,
        },
        scaleX: 0,
        transformOrigin: "left center",
        ease: "none"
      });

      // Cards animation
      gsap.from(".process-card", {
        scrollTrigger: {
          trigger: ".process-container",
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        clearProps: "all"
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: MessageSquare,
      title: "Request Quote",
      desc: "Fill out our simple form or call us. We respond quickly to get things moving."
    },
    {
      icon: Ruler,
      title: "Site Check",
      desc: "We visit your property to measure up and assess your specific painting needs."
    },
    {
      icon: FileText,
      title: "Fixed Price",
      desc: "Receive a detailed, transparent proposal. No hidden costs or surprises."
    },
    {
      icon: PaintRoller,
      title: "We Paint",
      desc: "Our pro team arrives on time, preps carefully, and delivers a flawless finish."
    },
    {
      icon: PartyPopper,
      title: "Enjoy",
      desc: "Final walkthrough to ensure you're 100% happy with your transformed space."
    }
  ];

  return (
    <div ref={comp} className="bg-slate-900 text-white py-24 relative overflow-hidden" id="process">
        {/* Background blobs for modern feel */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-nz-accent/10 rounded-full blur-3xl -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2"></div>
        </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-sky-300 font-semibold tracking-wider uppercase text-xs mb-3 border border-white/5">Simple Process</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-6">How It Works</h2>
          <p className="text-slate-400 text-lg">From your first click to the final brushstroke, we make it easy.</p>
        </div>

        <div className="process-container relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-white/10">
             <div className="process-line-fill w-full h-full bg-gradient-to-r from-nz-accent to-purple-500 origin-left"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="process-card relative group">
                
                {/* Mobile Line Connector */}
                {index !== steps.length - 1 && (
                    <div className="lg:hidden absolute left-8 top-16 bottom-0 w-0.5 bg-white/10 h-full -mb-8 z-0"></div>
                )}

                <div className="relative z-10 flex flex-row lg:flex-col items-start lg:items-center gap-6 lg:gap-0 lg:text-center">
                  
                  {/* Icon Bubble */}
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:bg-nz-accent group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-xl shadow-black/20">
                      <step.icon size={28} strokeWidth={1.5} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-slate-900 rounded-full flex items-center justify-center text-xs font-bold border-2 border-slate-900">
                        {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-2 lg:pt-8 flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">{step.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action Mini */}
        <div className="mt-20 text-center">
             <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className="inline-flex items-center gap-2 text-sky-300 hover:text-white font-semibold transition-colors group">
                 Start your project today <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </button>
        </div>

      </div>
    </div>
  );
};