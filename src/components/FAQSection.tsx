import React, { useState } from 'react';
import { ChevronDown, FileText, Clock, ShieldAlert, BadgePercent, HelpCircle, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
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
    icon: <FileText className="w-5 h-5 text-[#0B192C]" />,
    category: 'Documentation & PAAR'
  },
  {
    id: 'clearance-time',
    question: 'How long does customs clearance take once a vessel berths at Apapa or Tin Can Island Port?',
    answer:
      'Standard sea cargo clearance typically takes between 3 to 7 working days once the vessel discharges containers onto the terminal quayside and the PAAR is active. The timeline includes terminal positioning, physical customs joint inspection or non-intrusive container scanning, assessment verification, duty payment confirmation, and terminal delivery order (DO) release. With pre-berth documentation prepared by our Apapa team, clearance cycles are streamlined to avoid shipping line demurrage.',
    icon: <Clock className="w-5 h-5 text-[#0B192C]" />,
    category: 'Clearance Timelines'
  },
  {
    id: 'demurrage-prevention',
    question: 'How does Rimi Transport prevent shipping line demurrage and terminal storage penalties?',
    answer:
      'Demurrage occurs when container detention exceeds the shipping line rent-free period (usually 5 to 7 days in Nigerian ports). Rimi Transport prevents demurrage by initiating the customs declaration and duty payment before vessel arrival, tracking vessel manifest transmission daily, maintaining direct presence at Apapa/Tin Can terminals for immediate cargo positioning, and arranging pre-booked haulage trucks ready to evacuate containers the moment final customs exit gate passes are released.',
    icon: <ShieldAlert className="w-5 h-5 text-[#0B192C]" />,
    category: 'Demurrage & Cost Control'
  },
  {
    id: 'tariffs-duty',
    question: 'How are customs import duties, CET tariffs, and statutory surcharges calculated?',
    answer:
      'Customs duty is computed on the CIF value (Cost, Insurance, and Freight) converted to Nigerian Naira using the prevailing Central Bank of Nigeria customs exchange rate. Charges include: (1) Basic Customs Import Duty (0%–35% depending on Common External Tariff [CET] Harmonized System code), (2) Import Surcharges (7% of duty amount), (3) Comprehensive Import Supervision Scheme (CISS - 1% of FOB), (4) ECOWAS Trade Liberalization Scheme (ETLS - 0.5% of CIF), and (5) Value Added Tax (VAT - 7.5% of CIF + Duty + Surcharges + CISS + ETLS). Rimi Transport provides an itemized tariff breakdown in your free quotation before clearance commences.',
    icon: <BadgePercent className="w-5 h-5 text-[#0B192C]" />,
    category: 'Tariffs & Customs Duty'
  },
  {
    id: 'roro-vehicles',
    question: 'Can you handle Roll-on/Roll-off (Ro-Ro) vehicles and heavy construction machinery clearance?',
    answer:
      'Yes. We operate directly within the specialized Ro-Ro terminals including PTML (Port & Terminal Multi-Services Ltd) at Tin Can and Kirikiri Lighter Terminals. We handle customs VIN assessments, valuation reconciliations, terminal gate pass releases, and secure lowbed transport for construction plant machinery, excavators, tippers, and passenger fleets across Nigeria.',
    icon: <HelpCircle className="w-5 h-5 text-[#0B192C]" />,
    category: 'Vehicle & Project Cargo'
  },
  {
    id: 'inland-haulage',
    question: 'Do you provide inland door-to-door delivery with transit insurance across Nigeria?',
    answer:
      'Yes. Our bonded fleet of 40-ton articulated flatbed trailers, 20ft skeleton container carriers, and heavy lowbeds delivers cleared cargo straight from Lagos maritime terminals to client factories, warehouses, and industrial parks nationwide. All transit haulage carries Goods-in-Transit (GIT) marine transit insurance cover and active GPS telematics monitoring from gate exit to final offloading destination.',
    icon: <HelpCircle className="w-5 h-5 text-[#0B192C]" />,
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
    <section id="faq" className="py-20 sm:py-24 bg-white border-b border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-[#0B192C] uppercase tracking-widest flex items-center gap-2">
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <div className="w-12 h-0.5 bg-[#0B192C] mt-2 mb-3" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Clear Answers to Your Customs Clearing & Forwarding Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[65ch]">
            Understand statutory procedures, documentation requirements, duty computations, and terminal operations in Nigerian maritime logistics.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4 mb-14">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_2px_12px_-2px_rgba(11,25,44,0.04)] transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#0B192C]/5 border border-[#0B192C]/10 flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-[#0B192C] tracking-wider uppercase block mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">
                        {item.question}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#0B192C] text-white' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Answer Box */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Section CTA */}
        <div className="p-8 sm:p-10 bg-[#0B192C] text-white rounded-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">
              Have specific shipment questions or unique HS code inquiries?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak directly with our senior customs licensed agents stationed in Apapa.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={onRequestQuote}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 text-[#0B192C] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={COMPANY_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
