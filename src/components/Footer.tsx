import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS, SERVICES_DATA } from '../data/companyData';
import { Phone, Mail, MapPin, Clock, Shield, ArrowUp, Lock } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import logoImg from '../assets/logo.png';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
  onRequestQuote?: () => void;
  onSelectService?: (serviceTitle: string) => void;
  onNavigateToAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B192C] text-slate-300 text-xs border-t border-slate-800 font-sans">
      
      {/* Upper Footer Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Company Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={logoImg}
                alt="RIMI TRANSPORT AND ALLIED LIMITED Logo"
                className="h-[48px] w-auto object-contain shrink-0 drop-shadow-md"
              />
              <div>
                <span className="text-base font-extrabold text-white block leading-tight">
                  RIMI TRANSPORT
                </span>
                <span className="text-[10px] font-semibold text-slate-400 tracking-wider block uppercase">
                  AND ALLIED LIMITED
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Premier Clearing & Forwarding and Intermodal Logistics solutions in Nigeria. Providing reliable customs brokerage, international ocean and air freight, port haulage, and bonded warehousing from our Apapa headquarters.
            </p>

            <div className="pt-2 flex items-center gap-2 text-slate-300">
              <Shield className="w-4 h-4 text-blue-300 shrink-0" />
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
                <Link to="/" className="hover:text-white transition-colors text-left block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors text-left block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors text-left block">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/ports" className="hover:text-white transition-colors text-left block">
                  Ports & Coverage
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-white transition-colors text-left block">
                  Fleet & Automobiles
                </Link>
              </li>
              <li>
                <Link to="/why-choose-us" className="hover:text-white transition-colors text-left block">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-white transition-colors text-left block">
                  Track Consignment
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-blue-200 font-semibold transition-colors text-left block">
                  Contact & Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Key Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Our Core Services
            </h4>
            <ul className="space-y-2">
              {SERVICES_DATA.slice(0, 7).map((srv) => (
                <li key={srv.id}>
                  <Link
                    to={`/services/${srv.id}`}
                    className="hover:text-white transition-colors text-left truncate block max-w-full text-slate-400"
                    title={srv.title}
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Operations (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Apapa Operations Office
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{COMPANY_DETAILS.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-300 shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="hover:text-white transition-colors font-medium text-white">
                  {COMPANY_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-300 shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-white transition-colors truncate" title={COMPANY_DETAILS.email}>
                  {COMPANY_DETAILS.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={COMPANY_DETAILS.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors text-emerald-400 font-semibold">
                  WhatsApp: {COMPANY_DETAILS.whatsappNumberDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 pt-2 border-t border-white/10">
                <Clock className="w-4 h-4 text-blue-300 shrink-0" />
                <span className="leading-relaxed">{COMPANY_DETAILS.businessHours}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#07101c] py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} {COMPANY_DETAILS.name}. All rights reserved. Registered customs clearing and freight forwarding agency in Apapa, Lagos.
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400 hidden sm:inline">Apapa Port · Tin Can Island · MMIA Airport</span>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
            <Link
              to="/admin"
              className="text-[11px] text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer hover:underline underline-offset-2"
              title="Staff Login"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Staff Login</span>
            </Link>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#0B192C] hover:bg-[#152a45] text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer border border-white/10"
              aria-label="Scroll back to top of page"
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
