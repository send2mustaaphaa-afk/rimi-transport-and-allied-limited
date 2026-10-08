import React, { useState } from 'react';
import { COMPANY_DETAILS } from '../data/companyData';
import { Menu, X, Phone, MessageSquare, ArrowRight, Shield } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onRequestQuote: () => void;
  onNavigateToAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onRequestQuote,
  onNavigateToAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Our Services' },
    { id: 'why-us', label: 'Why Choose Us' },
    { id: 'tracking', label: 'Track Cargo' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span>Licensed Clearing & Forwarding Agent — Apapa, Lagos</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-300">Mon - Fri: 8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${COMPANY_DETAILS.phoneRaw}`}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 font-medium text-white"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{COMPANY_DETAILS.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={COMPANY_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium text-emerald-400"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp: {COMPANY_DETAILS.whatsappNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Zone 1: Single text element Brand wordmark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-left focus:outline-hidden group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-lg font-display tracking-tight shadow-xs group-hover:bg-slate-800 transition-colors border border-amber-500/30">
              R
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 font-display block leading-tight group-hover:text-amber-600 transition-colors">
                RIMI TRANSPORT
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider block uppercase">
                AND ALLIED LIMITED
              </span>
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-semibold text-slate-700">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`transition-colors relative py-1 focus:outline-hidden cursor-pointer whitespace-nowrap ${
                activeSection === link.id
                  ? 'text-amber-600 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{link.label}</span>
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary action button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onRequestQuote}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-lg transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2 border border-slate-900 whitespace-nowrap cursor-pointer"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Mobile Hamburger Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onRequestQuote}
            className="px-3 py-1.5 text-xs font-bold text-white bg-slate-900 rounded-md whitespace-nowrap sm:hidden cursor-pointer"
          >
            Quote
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-950 rounded-md focus:outline-hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in fade-in duration-150">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-md text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                  activeSection === link.id
                    ? 'bg-amber-50 text-amber-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onRequestQuote();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 text-sm font-bold text-center text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
            <a
              href={COMPANY_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 text-sm font-bold text-center text-slate-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Direct (08169183582)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
