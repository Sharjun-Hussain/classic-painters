import React, { useState, useRef, useLayoutEffect } from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Phone, Mail, MapPin } from 'lucide-react';
import gsap from 'gsap';

export const ContactSection: React.FC = () => {
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
      gsap.from(".contact-info", {
        scrollTrigger: {
          trigger: comp.current,
          start: "top 70%",
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.from(".contact-form", {
        scrollTrigger: {
          trigger: comp.current,
          start: "top 70%",
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
    // Simulate form submission
    alert('Thank you! Your quote request has been sent. We will contact you shortly.');
    setFormData({ name: '', phone: '', email: '', service: 'Residential', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div ref={comp}>
      <Section id="contact" className="bg-nz-blue text-white overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Contact Info */}
          <div className="contact-info w-full lg:w-5/12">
            <span className="text-sky-400 font-semibold tracking-wider uppercase text-sm">Contact Us</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-6">Ready to Transform Your Space?</h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Get in touch today for a free, no-obligation quote. Our team is ready to answer your questions and schedule a site visit.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                  <Phone className="text-sky-400 h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Call Us</h4>
                  <a href="tel:0800PAINTER" className="text-2xl font-bold text-white hover:text-sky-400 transition-colors block">0800 PAINTER</a>
                  <p className="text-sm text-slate-400 mt-1">Mon - Sat: 7am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                  <Mail className="text-sky-400 h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email Us</h4>
                  <a href="mailto:info@nzpainters.co.nz" className="text-lg text-slate-300 hover:text-white transition-colors">info@nzpainters.co.nz</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                  <MapPin className="text-sky-400 h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Service Areas</h4>
                  <p className="text-slate-300">Auckland, Wellington, Christchurch, Hamilton, Tauranga</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form w-full lg:w-7/12">
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-white/10">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Request a Free Quote</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nz-accent focus:border-nz-accent text-slate-900 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nz-accent focus:border-nz-accent text-slate-900 transition-colors"
                      placeholder="021 123 4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nz-accent focus:border-nz-accent text-slate-900 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">Service Required</label>
                    <select 
                      id="service" 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nz-accent focus:border-nz-accent text-slate-900 transition-colors"
                    >
                      <option value="Residential">Residential Painting</option>
                      <option value="Commercial">Commercial Painting</option>
                      <option value="Interior">Interior Painting</option>
                      <option value="Exterior">Exterior Painting</option>
                      <option value="Roof">Roof Painting</option>
                      <option value="Other">Other / Not Sure</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Project Details (Optional)</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nz-accent focus:border-nz-accent text-slate-900 transition-colors"
                    placeholder="Tell us a bit about what you need painted..."
                  ></textarea>
                </div>

                <Button type="submit" fullWidth size="lg" className="py-4 text-lg shadow-xl shadow-sky-900/10">Request Free Quote</Button>
                <p className="text-xs text-center text-slate-400 mt-4">By submitting this form, you agree to our privacy policy. We respect your data.</p>
              </form>
            </div>
          </div>

        </div>
      </Section>
    </div>
  );
};