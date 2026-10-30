import React from 'react';
import { Package, Calendar, Anchor, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface StatsSectionProps {
  onRequestQuote: () => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ onRequestQuote }) => {
  const stats = [
    {
      id: 'containers',
      value: '2,500+ TEUs',
      label: 'Containers Cleared',
      icon: Package,
      note: 'FCL & LCL TEUs processed at Lagos port terminals'
    },
    {
      id: 'years',
      value: '15+ Years',
      label: 'Maritime Experience',
      icon: Calendar,
      note: 'Licensed clearing & forwarding in the Apapa corridor'
    },
    {
      id: 'ports',
      value: '4 Commercial Ports',
      label: 'Terminals Served',
      icon: Anchor,
      note: 'Apapa Port, Tin Can Island, PTML & MMIA Airport'
    },
    {
      id: 'ontime',
      value: '99.4%',
      label: 'On-Time Port Release Rate',
      icon: ShieldCheck,
      note: 'Within standard 24 – 72 hour post-discharge window'
    }
  ];

  return (
    <section id="stats" className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Sleek corporate verification badge */}
        <div className="mb-12 p-4 bg-white border border-slate-200/80 rounded-xl shadow-[0_2px_12px_-2px_rgba(11,25,44,0.04)] flex items-center justify-between flex-wrap gap-3 text-xs text-slate-700">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#0B192C] shrink-0" />
            <span>
              <strong>Verified Operations Track Record:</strong> Licensed Nigeria Customs Service clearing agency operating under institutional compliance standards.
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#0B192C] bg-[#0B192C]/5 px-2.5 py-1 rounded border border-[#0B192C]/10 uppercase tracking-wider">
            Apapa Maritime Hub
          </span>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl p-7 flex flex-col justify-between shadow-[0_4px_20px_-2px_rgba(11,25,44,0.05)] hover:shadow-[0_12px_32px_-4px_rgba(11,25,44,0.1)] hover:border-[#0B192C]/30 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0B192C]/5 border border-[#0B192C]/10 text-[#0B192C] flex items-center justify-center group-hover:bg-[#0B192C] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                      Metric 0{idx + 1}
                    </span>
                  </div>

                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0B192C]">
                    {stat.value}
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 mt-1.5">
                    {stat.label}
                  </h3>
                </div>

                <p className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 leading-normal">
                  {stat.note}
                </p>
              </div>
            );
          })}
        </div>

        {/* Corporate CTA Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 p-7 bg-[#0B192C] text-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <p className="text-sm text-slate-200 text-center sm:text-left max-w-xl">
            Need an accurate assessment of statutory customs duties, terminal fees, and road haulage for your upcoming shipment?
          </p>
          <button
            onClick={onRequestQuote}
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 text-[#0B192C] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-sm"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
