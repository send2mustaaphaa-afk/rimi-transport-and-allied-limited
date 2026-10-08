import React from 'react';
import { WHY_CHOOSE_US_POINTS, COMPANY_DETAILS } from '../data/companyData';
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
      case 'Award': return <Award className="w-5 h-5 text-amber-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'TrendingDown': return <TrendingDown className="w-5 h-5 text-amber-500" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-amber-500" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-amber-500" />;
      default: return <Award className="w-5 h-5 text-amber-500" />;
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
    <section id="why-us" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
            Why Partner With Us
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
            Delivering Strategic Value & Operational Peace of Mind
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            International supply chains in Nigeria require deep regulatory knowledge, on-the-ground port agility, and unyielding reliability. Here is why leading enterprises trust {COMPANY_DETAILS.name}.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WHY_CHOOSE_US_POINTS.map((point, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 border transition-all duration-200 shadow-2xs hover:shadow-md ${
                index === 0
                  ? 'bg-slate-900 text-white border-slate-800 lg:col-span-1'
                  : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-amber-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  index === 0 ? 'bg-amber-500/20' : 'bg-slate-900'
                }`}>
                  {getPillarIcon(point.icon)}
                </div>
                <div className="text-right">
                  <span className={`text-lg font-extrabold font-mono tabular-nums ${
                    index === 0 ? 'text-amber-400' : 'text-slate-900'
                  }`}>
                    {point.stat}
                  </span>
                  <span className={`text-[10px] block font-medium ${
                    index === 0 ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {point.statLabel}
                  </span>
                </div>
              </div>

              <h3 className={`text-base font-bold font-display ${
                index === 0 ? 'text-white' : 'text-slate-900'
              }`}>
                {point.title}
              </h3>
              
              <p className={`mt-2 text-xs leading-relaxed ${
                index === 0 ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {point.description}
              </p>
            </div>
          ))}

          {/* 6th Card: Direct Hotline */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 rounded-2xl p-6 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Immediate Engagement</span>
              </div>
              <h3 className="text-lg font-extrabold font-display leading-snug">
                Have a Container Vessel Arriving at Apapa Port?
              </h3>
              <p className="text-xs text-slate-900/90 mt-2 font-medium">
                Send your Bill of Lading & Packing List to our Apapa team for immediate document pre-assessment.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-950/15">
              <button
                onClick={onRequestQuote}
                className="w-full py-2.5 bg-slate-950 text-white hover:bg-slate-900 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Initiate Pre-Assessment</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Comparison Table */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-6 sm:p-7 border-b border-slate-200 bg-white">
            <h3 className="text-lg font-bold text-slate-900 font-display">
              The RIMI Advantage: Solving Nigeria Port Clearance Bottlenecks
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Compare our proactive operational workflow against standard industry delays.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Operational Factor</th>
                  <th className="py-3.5 px-6 text-slate-500">Traditional Clearing Bottlenecks</th>
                  <th className="py-3.5 px-6 text-amber-900 bg-amber-50/70">
                    <span className="flex items-center gap-1.5 font-bold">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      RIMI Standard Workflow
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 whitespace-nowrap">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-slate-600 max-w-xs">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-900 font-medium bg-amber-50/30 max-w-sm">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{row.rimi}</span>
                      </div>
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
