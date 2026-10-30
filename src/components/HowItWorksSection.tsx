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
    <section id="how-it-works" className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-[#0B192C] uppercase tracking-widest flex items-center gap-2">
            <span>HOW IT WORKS</span>
          </div>
          <div className="w-12 h-0.5 bg-[#0B192C] mt-2 mb-3" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Streamlined Customs Clearance in 4 Simple Steps
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[65ch]">
            From pre-arrival document verification to final warehouse offloading, our proactive Apapa workflow prevents compounding demurrage and ensures fast cargo release.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200/80 rounded-2xl p-7 flex flex-col justify-between shadow-[0_4px_20px_-2px_rgba(11,25,44,0.05)] hover:shadow-[0_12px_32px_-4px_rgba(11,25,44,0.1)] hover:border-[#0B192C]/30 transition-all duration-300 group"
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0B192C]/5 border border-[#0B192C]/10 text-[#0B192C] flex items-center justify-center font-extrabold text-base group-hover:bg-[#0B192C] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-mono text-xs font-black text-[#0B192C] tracking-wider">
                        STEP {item.step}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        {item.timeframe}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0B192C] transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Indicator bullet */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-[#0B192C] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>NCS & Port Compliant</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout Bar */}
        <div className="bg-[#0B192C] text-white rounded-2xl p-8 sm:p-9 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">
              Have a Consignment Berthing Soon at Apapa or Tin Can?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Submit your Bill of Lading today so our clearing desk can begin Pre-Arrival PAAR processing immediately.
            </p>
          </div>

          <button
            onClick={onRequestQuote}
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-100 text-[#0B192C] font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
