import React from 'react';
import { ArrowRight, FileText, CheckCircle2, ShieldCheck, Truck, Clock } from 'lucide-react';

interface HowItWorksSectionProps {
  onRequestQuote: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onRequestQuote }) => {
  const steps = [
    {
      step: '01',
      title: 'Request a Quote',
      timeframe: 'Instant – 30 Mins',
      description: 'Submit your shipment specifications, HS code, or Bill of Lading. Our Apapa desk calculates an itemized statutory duty, shipping, and haulage breakdown with zero hidden fees.',
      icon: FileText
    },
    {
      step: '02',
      title: 'Documentation & PAAR',
      timeframe: 'Pre-Berthing',
      description: 'We audit your Form M, packing lists, and commercial invoices, filing for fast Pre-Arrival Assessment Report (PAAR) and NAFDAC/SONCAP clearances prior to ship arrival.',
      icon: Clock
    },
    {
      step: '03',
      title: 'Customs Release',
      timeframe: '24 – 72 Hours',
      description: 'Our licensed customs agents represent you during physical examination at Apapa or Tin Can terminals, settling duties and securing terminal exit gate passes rapidly.',
      icon: ShieldCheck
    },
    {
      step: '04',
      title: 'Door-to-Door Delivery',
      timeframe: 'Direct Dispatch',
      description: 'Your cargo is loaded onto our GPS-tracked articulated trucks or multi-car carriers and delivered directly to your warehouse, factory gate, or showroom nationwide.',
      icon: Truck
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header with Amber Label & Accent Line */}
        <div className="reveal-on-scroll max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
            <span>HOW IT WORKS</span>
          </div>
          <span className="section-accent-line" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance mt-3">
            Streamlined Customs Clearance in 4 Simple Steps
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-[65ch]">
            From pre-arrival document verification to final warehouse offloading, our proactive Apapa workflow prevents compounding demurrage and ensures fast cargo release.
          </p>
        </div>

        {/* 4 Steps Container with Connecting Line */}
        <div className="relative mb-14">
          
          {/* Desktop Connecting Line */}
          <div
            className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-amber-500/20 via-amber-500/60 to-amber-500/20 -translate-y-12 z-0"
            aria-hidden="true"
          />

          <div className="reveal-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="reveal-on-scroll bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 flex flex-col justify-between group premium-card-lift transition-all duration-200"
                >
                  <div>
                    {/* Step Number & Icon Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="card-icon-square w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-display font-extrabold text-base shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-mono text-xs font-black text-amber-400 tracking-wider">
                          STEP {item.step}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {item.timeframe}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white font-display group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Indicator bullet */}
                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-amber-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>NCS & Port Compliant</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Action Callout Bar */}
        <div className="reveal-on-scroll bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white font-display">
              Have a Consignment Berthing Soon at Apapa or Tin Can?
            </h4>
            <p className="text-xs text-slate-300">
              Submit your Bill of Lading today so our clearing desk can begin Pre-Arrival PAAR processing immediately.
            </p>
          </div>

          <button
            onClick={onRequestQuote}
            className="btn-interactive group px-6 py-3 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1.5 transition-transform duration-200" />
          </button>
        </div>

      </div>
    </section>
  );
};
