import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { QuoteSection } from '../components/QuoteSection';
import { FAQSection } from '../components/FAQSection';
import { COMPANY_DETAILS } from '../data/companyData';
import { Phone, Mail, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

interface QuotePageProps {
  selectedService: string;
  onQuoteSubmitted: (trackingRef: string) => void;
}

export const QuotePage: React.FC<QuotePageProps> = ({
  selectedService,
  onQuoteSubmitted
}) => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service') || selectedService || '';

  return (
    <div className="flex-1">
      {/* 1. Page Header */}
      <PageHeader
        badge="TRANSPARENT QUOTATION"
        title="Request a Free, Transparent Logistics Quotation"
        description="Our Apapa clearing desk calculates exact statutory customs duty, shipping line terminal handling, delivery orders, and insured haulage with zero hidden fees."
        currentPage="Request a Quote"
      />

      {/* 2. Full Quote Form & Guarantee Box */}
      <QuoteSection
        initialService={serviceParam}
        onQuoteSubmitted={onQuoteSubmitted}
      />

      {/* 3. Common Questions Accordion */}
      <FAQSection onRequestQuote={() => {
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }} />

      {/* 4. Direct Assistance Contact Strip */}
      <section className="py-12 bg-slate-900 border-t border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                DIRECT CLEARING DESK
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                Prefer to discuss your shipment specifications directly?
              </h3>
              <p className="text-xs text-slate-300">
                Call our Apapa operations team or chat with a senior customs documentation officer.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <a
                href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                className="btn-interactive w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg border border-slate-700 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call {COMPANY_DETAILS.phone}</span>
              </a>
              <a
                href={COMPANY_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-interactive w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp ({COMPANY_DETAILS.whatsappNumberDisplay})</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
