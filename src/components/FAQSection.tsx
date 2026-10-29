import React, { useState } from 'react';
import { ChevronDown, HelpCircle, FileText, Clock, ShieldAlert, BadgePercent, ArrowRight, MessageSquare } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'docs-needed',
    question: 'What mandatory shipping documents are required to clear containerized cargo into Nigeria?',
    answer:
      'To initiate statutory clearance through the Nigeria Customs Service (NCS) and Nigeria Integrated Customs Information System (NICIS II), you must provide: (1) Final Invoices and Packing List, (2) Clean Bill of Lading (B/L) or Sea Waybill, (3) Form M (opened via authorized dealer bank with Central Bank of Nigeria e-Form M portal), (4) Pre-Arrival Assessment Report (PAAR) issued by NCS headquarters, (5) Combined Certificate of Value and Origin (CCVO), and (6) Regulatory permits (NAFDAC import permit, SONCAP/e-Product Certificate, or quarantine certificates where applicable). Rimi Transport assists in auditing and validating all documents prior to vessel berthing to prevent documentation delays.',
    icon: <FileText className="w-5 h-5 text-amber-400" />,
    category: 'Documentation & PAAR'
  },
  {
    id: 'clearance-time',
    question: 'How long does customs clearance take once a vessel berths at Apapa or Tin Can Island Port?',
    answer:
      'Standard sea cargo clearance typically takes between 3 to 7 working days once the vessel discharges containers onto the terminal quayside and the PAAR is active. The timeline includes terminal positioning, physical customs joint inspection or non-intrusive container scanning, assessment verification, duty payment confirmation, and terminal delivery order (DO) release. With pre-berth documentation prepared by our Apapa team, clearance cycles are streamlined to avoid shipping line demurrage.',
    icon: <Clock className="w-5 h-5 text-amber-400" />,
    category: 'Clearance Timelines'
  },
  {
    id: 'demurrage-prevention',
    question: 'How does Rimi Transport prevent shipping line demurrage and terminal storage penalties?',
    answer:
      'Demurrage occurs when container detention exceeds the shipping line rent-free period (usually 5 to 7 days in Nigerian ports). Rimi Transport prevents demurrage by initiating the customs declaration and duty payment before vessel arrival, tracking vessel manifest transmission daily, maintaining direct presence at Apapa/Tin Can terminals for immediate cargo positioning, and arranging pre-booked haulage trucks ready to evacuate containers the moment final customs exit gate passes are released.',
    icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
    category: 'Demurrage & Cost Control'
  },
  {
    id: 'tariffs-duty',
    question: 'How are customs import duties, CET tariffs, and statutory surcharges calculated?',
    answer:
      'Customs duty is computed on the CIF value (Cost, Insurance, and Freight) converted to Nigerian Naira using the prevailing Central Bank of Nigeria customs exchange rate. Charges include: (1) Basic Customs Import Duty (0%–35% depending on Common External Tariff [CET] Harmonized System code), (2) Import Surcharges (7% of duty amount), (3) Comprehensive Import Supervision Scheme (CISS - 1% of FOB), (4) ECOWAS Trade Liberalization Scheme (ETLS - 0.5% of CIF), and (5) Value Added Tax (VAT - 7.5% of CIF + Duty + Surcharges + CISS + ETLS). Rimi Transport provides an itemized tariff breakdown in your free quotation before clearance commences.',
    icon: <BadgePercent className="w-5 h-5 text-amber-400" />,
    category: 'Tariffs & Customs Duty'
  },
  {
    id: 'roro-vehicles',
    question: 'Can you handle Roll-on/Roll-off (Ro-Ro) vehicles and heavy construction machinery clearance?',
    answer:
      'Yes. We operate directly within the specialized Ro-Ro terminals including PTML (Port & Terminal Multi-Services Ltd) at Tin Can and Kirikiri Lighter Terminals. We handle customs VIN assessments, valuation reconciliations, terminal gate pass releases, and secure lowbed transport for construction plant machinery, excavators, tippers, and passenger fleets across Nigeria.',
    icon: <HelpCircle className="w-5 h-5 text-amber-400" />,
    category: 'Vehicle & Project Cargo'
  },
  {
    id: 'inland-haulage',
    question: 'Do you provide inland door-to-door delivery with transit insurance across Nigeria?',
    answer:
      'Yes. Our bonded fleet of 40-ton articulated flatbed trailers, 20ft skeleton container carriers, and heavy lowbeds delivers cleared cargo straight from Lagos maritime terminals to client factories, warehouses, and industrial parks nationwide. All transit haulage carries Goods-in-Transit (GIT) marine transit insurance cover and active GPS telematics monitoring from gate exit to final offloading destination.',
    icon: <HelpCircle className="w-5 h-5 text-amber-400" />,
    category: 'Haulage & Distribution'
  }
];

interface FAQSectionProps {
  onRequestQuote: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onRequestQuote }) => {
  const [openId, setOpenId] = useState<string | null>('docs-needed');

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(217,119,6,0.06),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
        {/* Section Header */}
        <div className="reveal-on-scroll max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <span className="section-accent-line" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance mt-3">
            Clear Answers to Your Customs Clearing & Forwarding Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-[65ch]">
            Understand statutory procedures, documentation requirements, duty computations, and terminal operations in Nigerian maritime logistics.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="reveal-on-scroll bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-850 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-amber-400 tracking-wider uppercase block mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white font-display">
                        {item.question}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-amber-500/20 text-amber-400' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated Answer Box */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section CTA */}
        <div className="reveal-on-scroll mt-12 p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white font-display">
              Have specific shipment questions or unique HS code inquiries?
            </h4>
            <p className="text-xs text-slate-400">
              Speak directly with our senior customs licensed agents stationed in Apapa.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={onRequestQuote}
              className="btn-interactive w-full sm:w-auto px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={COMPANY_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-interactive w-full sm:w-auto px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
