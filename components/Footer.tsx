import React from 'react';
import { Paintbrush, Facebook, Instagram, Linkedin, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const SocialIcon = ({ name, url }: { name: string, url: string }) => {
  const icons: any = { Facebook, Instagram, Linkedin, Twitter, Youtube };
  const Icon = icons[name] || Facebook;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform duration-200">
      <Icon size={20} />
    </a>
  );
};

export const Footer: React.FC = () => {
  const { settings, services } = useContent();
  const topServices = services.slice(0, 5);

  // Parse JSON strings if necessary (API might return them as strings)
  // Note: In a real app, this parsing should ideally happen in the context or API layer
  const parsedSettings = { ...settings };
  if (typeof parsedSettings.socialLinks === 'string') {
    try { parsedSettings.socialLinks = JSON.parse(parsedSettings.socialLinks); } catch (e) { }
  }
  if (typeof parsedSettings.quickLinks === 'string') {
    try { parsedSettings.quickLinks = JSON.parse(parsedSettings.quickLinks); } catch (e) { }
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-24 md:pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              {(parsedSettings.footerLogo || parsedSettings.logo) ? (
                <img
                  src={parsedSettings.footerLogo || parsedSettings.logo}
                  alt="Classic Painters"
                  className="object-contain"
                  style={{
                    width: parsedSettings.footerLogoWidth || 'auto',
                    height: parsedSettings.footerLogoHeight || '32px'
                  }}
                />
              ) : (
                <Paintbrush className="text-nz-accent" size={24} />
              )}
              <span className="text-xl font-bold text-white">Classic Painters</span>
            </div>
            <p className="mb-6 leading-relaxed">
              {parsedSettings.footerText || "Professional residential and commercial painting services across New Zealand. Delivering quality, reliability, and excellence since 2013."}
            </p>
            <div className="flex gap-4">
              {parsedSettings.socialLinks && Object.entries(parsedSettings.socialLinks).map(([name, url]) => (
                <SocialIcon key={name} name={name} url={url as string} />
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {topServices.length > 0 ? (
                topServices.map(service => (
                  <li key={service.id}>
                    <a href="#services" className="hover:text-nz-accent transition-colors hover:pl-2">
                      {service.title}
                    </a>
                  </li>
                ))
              ) : (
                <>
                  <li><a href="#services" className="hover:text-nz-accent transition-colors hover:pl-2">Residential Painting</a></li>
                  <li><a href="#services" className="hover:text-nz-accent transition-colors hover:pl-2">Commercial Painting</a></li>
                </>
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {parsedSettings.quickLinks && Array.isArray(parsedSettings.quickLinks) ? (
                parsedSettings.quickLinks.map((link: any, index: number) => (
                  <li key={index}>
                    <a href={link.url} className="hover:text-nz-accent transition-colors hover:pl-2">{link.label}</a>
                  </li>
                ))
              ) : (
                <>
                  <li><a href="#why-us" className="hover:text-nz-accent transition-colors hover:pl-2">About Us</a></li>
                  <li><a href="#process" className="hover:text-nz-accent transition-colors hover:pl-2">Our Process</a></li>
                  <li><a href="#contact" className="hover:text-nz-accent transition-colors hover:pl-2">Get a Quote</a></li>
                </>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              {parsedSettings.contactPhone && (
                <li className="flex items-start gap-3">
                  <Phone size={18} className="mt-1 text-nz-accent shrink-0" />
                  <div>
                    <span className="block text-slate-500 text-xs uppercase tracking-wider mb-1">Phone</span>
                    <a href={`tel:${parsedSettings.contactPhone}`} className="text-white hover:text-nz-accent transition-colors">{parsedSettings.contactPhone}</a>
                  </div>
                </li>
              )}
              {parsedSettings.contactEmail && (
                <li className="flex items-start gap-3">
                  <Mail size={18} className="mt-1 text-nz-accent shrink-0" />
                  <div>
                    <span className="block text-slate-500 text-xs uppercase tracking-wider mb-1">Email</span>
                    <a href={`mailto:${parsedSettings.contactEmail}`} className="text-white hover:text-nz-accent transition-colors">{parsedSettings.contactEmail}</a>
                  </div>
                </li>
              )}
              {parsedSettings.contactAddress && (
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 text-nz-accent shrink-0" />
                  <div>
                    <span className="block text-slate-500 text-xs uppercase tracking-wider mb-1">Head Office</span>
                    <span className="text-white">{parsedSettings.contactAddress}</span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center text-sm">
          <p>&copy; {currentYear} Classic Painters. All rights reserved.</p>
          <a href="https://inzeedo.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-nz-accent transition-colors flex items-center gap-1">
            Solution by <span className="font-semibold text-slate-400 hover:text-white transition-colors">inzeedo.com</span>
          </a>
        </div>
      </div>
    </footer>
  );
};