import React, { useRef, useLayoutEffect } from 'react';
import { Section } from './ui/Section';
import { Star } from 'lucide-react';
import gsap from 'gsap';

export const Testimonials: React.FC = () => {
  const comp = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".review-card", {
        scrollTrigger: {
          trigger: ".reviews-grid",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  const reviews = [
    {
      name: "Sarah Thompson",
      location: "Auckland",
      text: "NZ Painters transformed our villa completely. The team was respectful, tidy, and the finish is flawless. Highly recommend!",
      stars: 5
    },
    {
      name: "James Henare",
      location: "Wellington",
      text: "Great communication from start to finish. They painted our commercial office over the weekend so we didn't lose any work time.",
      stars: 5
    },
    {
      name: "Michelle Lee",
      location: "Christchurch",
      text: "Fair pricing and excellent workmanship. They even fixed up some old plaster cracks I hadn't noticed. Very happy.",
      stars: 5
    }
  ];

  return (
    <div ref={comp}>
      <Section id="testimonials" dark>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-nz-accent font-semibold tracking-wider uppercase text-sm">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">What Our Clients Say</h2>
        </div>

        <div className="reviews-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="review-card bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-gradient-to-br from-sky-100 to-transparent rounded-bl-3xl opacity-50"></div>
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-slate-600 mb-6 flex-grow italic relative z-10">"{review.text}"</p>
              <div className="mt-auto border-t border-slate-100 pt-4">
                <p className="font-bold text-slate-900">{review.name}</p>
                <p className="text-sm text-slate-500">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center review-card">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-slate-100 hover:scale-105 transition-transform duration-300">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6" />
            <span className="font-semibold text-slate-700">4.9/5 Rating based on 150+ reviews</span>
          </div>
        </div>
      </Section>
    </div>
  );
};