import React from 'react';
import { WHY_CHOOSE_US_POINTS, COMPANY_DETAILS } from '../data/companyData';
import { AnimatedCounter } from './AnimatedCounter';
import {
  Award,
  Zap,
  TrendingDown,
  ShieldAlert,
  Headphones,
  Check,
  X,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface WhyChooseUsProps {
  onRequestQuote: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onRequestQuote }) => {
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-5 h-5 text-[#0B192C]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#0B192C]" />;
      case 'TrendingDown': return <TrendingDown className="w-5 h-5 text-[#0B192C]" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-[#0B192C]" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-[#0B192C]" />;
      default: return <Award className="w-5 h-5 text-[#0B192C]" />;
    }
  };

  const comparisonRows = [
    {
      feature: "Customs Clearance Turnaround",
      traditional: "5 - 14 Days with frequent queries & bottlenecks",
      rimi: "24 - 72 Hours via fast-track PAAR & pre-arrival processing"
    },
    {
      feature: "Demurrage & Storage Surcharges",
      traditional: "High risk of compounding shipping line demurrage",
      rimi: "Proactive pre-clearance protocol minimizing penalty risks"
    },
    {
      feature: "Port Proximity & Physical Presence",
      traditional: "Remote brokers relying on third-party proxy handlers",
      rimi: "Direct Apapa corridor office (11A Pelewura Way) with on-site agents"
    },
    {
      feature: "Quotation & Tariff Transparency",
      traditional: "Vague lump-sums with unexpected port gate surprises",
      rimi: "Clear, itemized statutory duty, shipping & terminal invoices"
    },
    {
      feature: "Real-time Shipment Updates",
      traditional: "Sporadic or delayed feedback when queried",
      rimi: "Dedicated coordinator + online status milestones & WhatsApp tracking"
    }
  ];

  return (
    <section id="why-us" className="py-20 sm:py-24 bg-white border-b border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="text-xs font-bold text-[#0B192C] uppercase tracking-widest inline-flex items-center gap-2">
            <span>WHY CHOOSE US</span>
          </div>
          <div className="w-12 h-0.5 bg-[#0B192C] mx-auto mt-2 mb-3" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Delivering Strategic Value & Operational Peace of Mind
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[65ch] mx-auto">
            International supply chains in Nigeria require deep regulatory knowledge, on-the-ground port agility, and unyielding reliability. Here is why leading enterprises trust {COMPANY_DETAILS.name}.
          </p>
        </div>

        {/* 5 Core Pillars Grid + CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WHY_CHOOSE_US_POINTS.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(11,25,44,0.05)] hover:shadow-[0_12px_32px_-4px_rgba(11,25,44,0.1)] hover:border-[#0B192C]/30 flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B192C]/5 border border-[#0B192C]/10 flex items-center justify-center group-hover:bg-[#0B192C] group-hover:text-white transition-colors duration-200">
                    {getPillarIcon(point.icon)}
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold font-mono tabular-nums text-[#0B192C]">
                      <AnimatedCounter value={point.stat} />
                    </span>
                    <span className="text-[11px] block font-medium text-slate-500">
                      {point.statLabel}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0B192C] transition-colors">
                  {point.title}
                </h3>
                
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}

          {/* 6th Card: Direct Corporate Engagement */}
          <div className="bg-[#0B192C] text-white rounded-2xl p-7 flex flex-col justify-between shadow-[0_4px_20px_-2px_rgba(11,25,44,0.12)]">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Immediate Engagement</span>
              </div>
              <h3 className="text-xl font-extrabold text-white leading-snug">
                Have a Container Vessel Arriving at Apapa Port?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Send your Bill of Lading & Packing List to our Apapa team for immediate document pre-assessment.
              </p>
            </div>

            <button
              onClick={onRequestQuote}
              className="mt-6 w-full py-3 bg-white hover:bg-slate-100 text-[#0B192C] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Get Immediate Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-7 sm:p-10 shadow-[0_4px_20px_-2px_rgba(11,25,44,0.04)]">
          <div className="max-w-2xl mb-8">
            <h3 className="text-xl font-extrabold text-slate-900">
              The RIMI Standard vs. Traditional Port Clearing
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              How our structured processes protect shippers from unforeseen demurrage, lost documentation, and customs queries.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4">Performance Metric</th>
                  <th className="py-3 px-4 text-slate-500">Traditional Brokers</th>
                  <th className="py-3 px-4 text-[#0B192C] font-bold bg-[#0B192C]/5 rounded-t-lg">RIMI TRANSPORT Service</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80">
                {comparisonRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{row.traditional}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#0B192C] bg-[#0B192C]/5 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{row.rimi}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
