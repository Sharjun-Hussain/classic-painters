import React, { useState, useRef, useLayoutEffect } from 'react';
import { Section } from './ui/Section';
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const { settings } = useContent();
  const parsedSettings = { ...settings };
  // Basic parsing if needed, though usually settings come as JSON objects from the API if handled correctly there.
  // But based on Footer implementation, we might need to be careful.

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Residential',
    message: ''
  });

  const comp = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Animate Info Column
      gsap.from(".contact-info", {
        scrollTrigger: {
          trigger: comp.current,
          start: "top 75%",
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // Animate Form Column
      gsap.from(".contact-form", {
        scrollTrigger: {
          trigger: comp.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out"
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your quote request has been sent. We will contact you shortly.');
    setFormData({ name: '', phone: '', email: '', service: 'Residential', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div ref={comp}>
      <Section id="contact" className="relative bg-slate-50 overflow-hidden">

        {/* Decorative Background Elements (Light Mode) */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-100 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 opacity-60 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">

          {/* --- Left Column: Contact Info --- */}
          <div className="contact-info w-full lg:w-5/12 pt-4">
            <span className="inline-block py-1 px-3 rounded-full bg-white border border-slate-200 text-nz-accent font-semibold tracking-wider uppercase text-xs mb-4 shadow-sm">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-6 tracking-tight">
              Ready to Transform Your Space?
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              Get in touch today for a free, no-obligation quote. Our team is ready to answer your questions and schedule a site visit.
            </p>

            <div className="space-y-8">
              {/* Phone Item */}
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-nz-accent shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 mb-1">Call Us</h4>
                  <a href={`tel:${parsedSettings.contactPhone || '0800PAINTER'}`} className="text-2xl font-bold text-slate-700 group-hover:text-nz-accent transition-colors block">
                    {parsedSettings.contactPhone || '0800 PAINTER'}
                  </a>
                  <p className="text-sm text-slate-400 mt-1 font-medium">Available 7am - 6pm</p>
                </div>
              </div>

              {/* Email Item */}
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-nz-accent shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 mb-1">Email Us</h4>
                  <a href={`mailto:${parsedSettings.contactEmail || 'info@classic-painters.com'}`} className="text-lg text-slate-600 group-hover:text-nz-accent transition-colors">
                    {parsedSettings.contactEmail || 'info@classic-painters.com'}
                  </a>
                </div>
              </div>

              {/* Location Item */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-nz-accent shadow-sm">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 mb-1">Service Areas</h4>
                  <p className="text-slate-600">{parsedSettings.contactAddress || 'Auckland, Wellington, Christchurch'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- Right Column: Form --- */}
          <div className="contact-form w-full lg:w-7/12">
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">

              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                Request a Free Quote
                <span className="hidden md:inline-flex px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full border border-green-100 items-center gap-1">
                  <CheckCircle2 size={12} /> Fast Response
                </span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nz-accent/20 focus:border-nz-accent text-slate-900 transition-all outline-none placeholder:text-slate-400"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nz-accent/20 focus:border-nz-accent text-slate-900 transition-all outline-none placeholder:text-slate-400"
                      placeholder="021 123 4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nz-accent/20 focus:border-nz-accent text-slate-900 transition-all outline-none placeholder:text-slate-400"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-semibold text-slate-700 ml-1">Service Required</label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nz-accent/20 focus:border-nz-accent text-slate-900 transition-all outline-none appearance-none cursor-pointer"
                      >
                        <option value="Residential">Residential Painting</option>
                        <option value="Commercial">Commercial Painting</option>
                        <option value="Interior">Interior Painting</option>
                        <option value="Exterior">Exterior Painting</option>
                        <option value="Roof">Roof Painting</option>
                        <option value="Other">Other / Not Sure</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <ArrowRight size={16} className="rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-700 ml-1">Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nz-accent/20 focus:border-nz-accent text-slate-900 transition-all outline-none resize-none placeholder:text-slate-400"
                    placeholder="Tell us a bit about what you need painted..."
                  ></textarea>
                </div>

                {/* --- Animated Submit Button (Same as CTA) --- */}
                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-xl bg-slate-900 px-8 py-4 text-white shadow-xl shadow-slate-900/20 transition-all hover:scale-[1.01] hover:shadow-2xl hover:shadow-slate-900/30 mt-2"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2 font-bold text-lg">
                    Send Request
                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </div>
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                </button>

                <p className="text-xs text-center text-slate-400 mt-4">
                  Your privacy is important to us. We never share your details.
                </p>
              </form>
            </div>
          </div>

        </div>
      </Section>
    </div>
  );
};