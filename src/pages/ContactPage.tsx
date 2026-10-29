import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { QuoteSection } from '../components/QuoteSection';
import { ContactSection } from '../components/ContactSection';
import { SeoHead } from '../components/SeoHead';
import { COMPANY_DETAILS } from '../data/companyData';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  FileText,
  Building,
  ShieldCheck,
  Send
} from 'lucide-react';

interface ContactPageProps {
  onQuoteSubmitted?: (ref: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onQuoteSubmitted }) => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service') || '';
  const [activeTab, setActiveTab] = useState<'quote' | 'office'>('quote');

  useEffect(() => {
    // If user clicked a direct service quote link, default to the quote tab
    if (serviceParam) {
      setActiveTab('quote');
    }
  }, [serviceParam]);

  return (
    <div className="flex-1">
      <SeoHead
        title="Contact Us & Request a Quote | Apapa Head Office"
        description="Contact RIMI TRANSPORT AND ALLIED LIMITED at 11A Pelewura Way, Apapa, Lagos. Request an itemized customs duty, shipping line, and road haulage quotation."
        path="/contact"
      />

      {/* 1. Page Header */}
      <PageHeader
        badge="HEAD OFFICE & QUOTATIONS"
        title="Contact Us & Request a Logistics Quotation"
        description="Reach out directly to our Apapa headquarters at 11A Pelewura Way, or request an itemized duty, terminal, and haulage quotation for your upcoming consignment."
        currentPage="Contact & Quote"
      />

      {/* 2. Mode Selector Bar (Quick Quote vs Office Details & Inquiries) */}
      <div className="bg-slate-900 border-b border-slate-800 py-3 sticky top-[68px] sm:top-[74px] z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('quote')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'quote'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>1. Request a Quotation</span>
            </button>

            <button
              onClick={() => setActiveTab('office')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'office'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>2. Apapa Office, Map & Direct Message</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs text-slate-300">
            <a
              href={`tel:${COMPANY_DETAILS.phoneRaw}`}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{COMPANY_DETAILS.phone}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={COMPANY_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp: {COMPANY_DETAILS.whatsappNumberDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Section Content based on selected view or full presentation */}
      {activeTab === 'quote' ? (
        <div>
          <QuoteSection
            initialService={serviceParam}
            onQuoteSubmitted={onQuoteSubmitted}
          />

          {/* Quick jump to office location */}
          <div className="py-8 bg-slate-950 border-t border-slate-800 text-center">
            <button
              onClick={() => setActiveTab('office')}
              className="text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Need our physical address, business hours, or interactive Google Map? Switch to Office Details →</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <ContactSection />

          {/* Quick jump to quote form */}
          <div className="py-8 bg-slate-50 border-t border-slate-200 text-center">
            <button
              onClick={() => setActiveTab('quote')}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Looking for a transparent customs duty or freight rate breakdown? Switch to Request a Quote →</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
