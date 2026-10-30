import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Search } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DETAILS } from '../data/companyData';

export const QuoteCtaBand: React.FC = () => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  return (
    <section
      aria-label="Request a logistics quotation"
      className="py-16 sm:py-20 bg-[#0B192C] text-white border-t border-slate-800 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15">
          <ShieldCheck className="w-4 h-4 text-blue-300" />
          <span>Transparent Logistics & Duty Costings</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
          {isContactPage
            ? 'Need Immediate Assistance on Active Port Clearances?'
            : 'Ready to Clear Your Cargo at Apapa Port Without Delays?'}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          {isContactPage
            ? 'Our licensed clearing officers at 11A Pelewura Way, Apapa are ready to validate your Form M, PAAR documentation, and delivery orders.'
            : 'Get an itemized quotation covering statutory duty tariffs, terminal handling, and insured road haulage within 30 to 60 minutes.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {!isContactPage ? (
            <Link
              to="/contact"
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-100 text-[#0B192C] font-bold text-xs sm:text-sm rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-100 text-[#0B192C] font-bold text-xs sm:text-sm rounded-lg shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>Scroll to Quote Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <a
            href={COMPANY_DETAILS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Talk on WhatsApp</span>
          </a>

          <Link
            to="/track"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#112239] hover:bg-[#1a3355] text-slate-200 hover:text-white font-semibold text-xs sm:text-sm rounded-lg border border-white/10 flex items-center justify-center gap-2 transition-colors"
          >
            <Search className="w-4 h-4 text-blue-300" />
            <span>Track Consignment</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
