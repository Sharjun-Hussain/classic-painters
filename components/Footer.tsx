import React from 'react';
import { Paintbrush, Facebook, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-24 md:pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Paintbrush className="text-nz-accent" size={24} />
              <span className="text-xl font-bold text-white">NZ Painters</span>
            </div>
            <p className="mb-6 leading-relaxed">
              Professional residential and commercial painting services across New Zealand. Delivering quality, reliability, and excellence since 2013.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="hover:text-nz-accent transition-colors hover:pl-2">Residential Painting</a></li>
              <li><a href="#services" className="hover:text-nz-accent transition-colors hover:pl-2">Commercial Painting</a></li>
              <li><a href="#services" className="hover:text-nz-accent transition-colors hover:pl-2">Interior Painting</a></li>
              <li><a href="#services" className="hover:text-nz-accent transition-colors hover:pl-2">Exterior Painting</a></li>
              <li><a href="#services" className="hover:text-nz-accent transition-colors hover:pl-2">Roof Painting</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="#why-us" className="hover:text-nz-accent transition-colors hover:pl-2">About Us</a></li>
              <li><a href="#process" className="hover:text-nz-accent transition-colors hover:pl-2">Our Process</a></li>
              <li><a href="#testimonials" className="hover:text-nz-accent transition-colors hover:pl-2">Reviews</a></li>
              <li><a href="#contact" className="hover:text-nz-accent transition-colors hover:pl-2">Get a Quote</a></li>
              <li><a href="#" className="hover:text-nz-accent transition-colors hover:pl-2">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-3">
              <li><span className="block text-slate-500 text-sm">Phone:</span> <a href="tel:0800PAINTER" className="text-white hover:text-nz-accent transition-colors">0800 PAINTER</a></li>
              <li><span className="block text-slate-500 text-sm">Email:</span> <a href="mailto:info@nzpainters.co.nz" className="text-white hover:text-nz-accent transition-colors">info@nzpainters.co.nz</a></li>
              <li><span className="block text-slate-500 text-sm">Head Office:</span> <span className="text-white">123 Queen Street, Auckland CBD</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} NZ Painters. All rights reserved.</p>
          <a href="https://inzeedo.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-nz-accent transition-colors flex items-center gap-1">
            Developed by <span className="font-semibold text-slate-400 hover:text-white transition-colors">inzeedo.com</span>
          </a>
        </div>
      </div>
    </footer>
  );
};