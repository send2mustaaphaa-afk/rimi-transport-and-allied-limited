import React from 'react';
import { Package, Calendar, Anchor, ShieldCheck, ArrowRight, Info } from 'lucide-react';

interface StatsSectionProps {
  onRequestQuote: () => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ onRequestQuote }) => {
  const stats = [
    {
      id: 'containers',
      placeholderValue: '[Add real number]',
      label: 'Containers Cleared',
      icon: Package,
      note: 'FCL & LCL TEUs processed at Lagos port terminals'
    },
    {
      id: 'years',
      placeholderValue: '[Add real number]',
      label: 'Years in Maritime Operations',
      icon: Calendar,
      note: 'Licensed clearing & forwarding in the Apapa corridor'
    },
    {
      id: 'ports',
      placeholderValue: '4+ Commercial Gateways',
      secondaryPlaceholder: '[Add ports/terminals]',
      label: 'Ports & Terminals Served',
      icon: Anchor,
      note: 'Apapa Port, Tin Can Island, PTML & MMIA Airport'
    },
    {
      id: 'ontime',
      placeholderValue: '[Add real number]%',
      label: 'On-Time Port Release Rate',
      icon: ShieldCheck,
      note: 'Within standard 24 – 72 hour post-discharge window'
    }
  ];

  return (
    <section id="stats" className="py-14 sm:py-18 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Placeholder disclaimer strip for user transparency */}
        <div className="reveal-on-scroll mb-8 p-3.5 bg-amber-50 border border-amber-200/90 rounded-xl flex items-center justify-between flex-wrap gap-3 text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Verified Operations Data:</strong> The statistics below use placeholders <code className="bg-amber-100 px-1.5 py-0.5 rounded text-[11px] font-mono">[Add real number]</code> ready to be updated with your verified company metrics.
            </span>
          </div>
          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
            Official Data Ready
          </span>
        </div>

        {/* 4 Stats Cards */}
        <div className="reveal-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="reveal-on-scroll bg-slate-50 border border-slate-200/90 hover:border-amber-500/50 rounded-2xl p-6 flex flex-col justify-between premium-card-lift group transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="card-icon-square w-12 h-12 rounded-xl bg-amber-500/12 border border-amber-500/25 text-amber-600 flex items-center justify-center">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                      Metric 0{idx + 1}
                    </span>
                  </div>

                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-display group-hover:text-amber-600 transition-colors">
                    {stat.placeholderValue}
                  </div>
                  {stat.secondaryPlaceholder && (
                    <div className="text-[11px] text-amber-700 font-mono font-medium mt-0.5">
                      {stat.secondaryPlaceholder}
                    </div>
                  )}

                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                    {stat.label}
                  </h3>
                </div>

                <p className="mt-3 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 leading-normal">
                  {stat.note}
                </p>
              </div>
            );
          })}
        </div>

        {/* High-converting CTA Button Strip */}
        <div className="reveal-on-scroll flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-900 text-white rounded-xl border border-slate-800">
          <p className="text-xs text-slate-300 text-center sm:text-left">
            Need an accurate assessment of statutory customs duties and terminal logistics for your upcoming shipment?
          </p>
          <button
            onClick={onRequestQuote}
            className="btn-interactive group px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
