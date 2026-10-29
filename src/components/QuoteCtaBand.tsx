import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, MessageSquare, ShieldCheck, Search } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';

export const QuoteCtaBand: React.FC = () => {
  const location = useLocation();

  // If already on the contact page where the form is open, show a focused fast-track summary
  const isContactPage = location.pathname === '/contact';

  return (
    <section
      aria-label="Request a logistics quotation"
      className="py-12 sm:py-16 bg-slate-950 text-white border-t border-slate-800 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.12),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transparent Logistics & Duty Costings</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight max-w-2xl mx-auto">
          {isContactPage
            ? 'Need Immediate Assistance on Active Port Clearances?'
            : 'Ready to Clear Your Cargo at Apapa Port Without Delays?'}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          {isContactPage
            ? 'Our licensed clearing officers at 11A Pelewura Way, Apapa are ready to validate your Form M, PAAR documentation, and delivery orders.'
            : 'Get an itemized quotation covering statutory duty tariffs, terminal handling, and insured road haulage within 30 to 60 minutes.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          {!isContactPage ? (
            <Link
              to="/contact"
              className="btn-interactive w-full sm:w-auto px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-lg shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
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
              className="btn-interactive w-full sm:w-auto px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-lg shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Scroll to Quote Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <a
            href={COMPANY_DETAILS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-interactive w-full sm:w-auto px-6 py-3.5 bg-emerald-700/80 hover:bg-emerald-600 text-white font-semibold text-sm rounded-lg border border-emerald-600/30 flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Talk on WhatsApp</span>
          </a>

          <Link
            to="/track"
            className="btn-interactive w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-sm rounded-lg border border-slate-700/80 flex items-center justify-center gap-2 transition-colors"
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span>Track Consignment</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
