import React from 'react';
import { COMPANY_DETAILS, SERVICES_DATA } from '../data/companyData';
import { Phone, Mail, MapPin, Clock, MessageSquare, Shield, ArrowUp, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onRequestQuote: () => void;
  onSelectService: (serviceTitle: string) => void;
  onNavigateToAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onRequestQuote,
  onSelectService,
  onNavigateToAdmin
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Upper Footer Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Company Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-amber-500/40 text-amber-500 flex items-center justify-center font-bold text-base font-display">
                R
              </div>
              <div>
                <span className="text-base font-extrabold text-white font-display block leading-tight">
                  RIMI TRANSPORT
                </span>
                <span className="text-[10px] font-semibold text-slate-500 tracking-wider block uppercase">
                  AND ALLIED LIMITED
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Premier Clearing & Forwarding and Intermodal Logistics solutions in Nigeria. Providing reliable customs brokerage, international ocean and air freight, port haulage, and bonded warehousing from our Apapa headquarters.
            </p>

            <div className="pt-2 flex items-center gap-2 text-slate-300">
              <Shield className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-xs font-semibold">
                Nigeria Customs Service Authorized Clearing Agency
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('why-us')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tracking')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Track Consignment
                </button>
              </li>
              <li>
                <button
                  onClick={onRequestQuote}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors text-left"
                >
                  Request a Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Key Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Our Core Services
            </h4>
            <ul className="space-y-1.5">
              {SERVICES_DATA.slice(0, 7).map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => {
                      onNavigate('services');
                      onSelectService(srv.title);
                    }}
                    className="hover:text-amber-400 transition-colors text-left truncate block max-w-full"
                    title={srv.title}
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Operations (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Apapa Operations Office
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{COMPANY_DETAILS.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="hover:text-amber-400 transition-colors font-medium text-white">
                  {COMPANY_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-amber-400 transition-colors truncate" title={COMPANY_DETAILS.email}>
                  {COMPANY_DETAILS.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={COMPANY_DETAILS.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors text-emerald-400 font-semibold">
                  WhatsApp: {COMPANY_DETAILS.whatsappNumber}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400 pt-1">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{COMPANY_DETAILS.businessHours}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} {COMPANY_DETAILS.name}. All rights reserved. Registered Clearing & Forwarding Agency, Apapa Lagos.
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-500 hidden sm:inline">Apapa Port · Tin Can Island · MMIA Airport</span>
            <span className="text-slate-700 hidden sm:inline">·</span>
            <a
              href="#admin"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = 'admin';
                if (onNavigateToAdmin) {
                  onNavigateToAdmin();
                }
              }}
              className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-1.5 cursor-pointer hover:underline underline-offset-2"
              title="Staff Login"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Staff Login</span>
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
