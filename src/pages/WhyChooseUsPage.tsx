import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { StatsSection } from '../components/StatsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { SeoHead } from '../components/SeoHead';

export const WhyChooseUsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1">
      <SeoHead
        title="Why Choose Us | Licensed NCS Brokerage & Logistics"
        description="Discover why commercial importers choose RIMI TRANSPORT AND ALLIED LIMITED. Zero demurrage protocols, 100% transparent tariffs, 48-72h terminal release, and Apapa hub proximity."
        path="/why-choose-us"
      />

      {/* 1. Page Header */}
      <PageHeader
        badge="THE RIMI ADVANTAGE"
        title="Why Commercial Shippers & Importers Rely on RIMI TRANSPORT"
        description="Discover how our authorized customs agency status, proximity to Apapa Port, transparent costings, and bonded haulage protect your cargo from demurrage and delays."
        currentPage="Why Choose Us"
      />

      {/* 2. Full Core Why Choose Us Component */}
      <WhyChooseUs onRequestQuote={() => navigate('/contact')} />

      {/* 3. Deep Dive into Demurrage Risk Mitigation */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.1),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
          
          <div className="reveal-on-scroll max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <span>DEMURRAGE & COST CONTROL PROTOCOL</span>
            </div>
            <span className="section-accent-line" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance mt-3">
              How We Prevent Demurrage & Unexpected Port Storage Charges
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-[65ch]">
              In Nigerian maritime trade, container detention and terminal storage can rapidly multiply costs. Here is our 4-point risk prevention protocol:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                01
              </div>
              <h3 className="text-sm font-bold text-white font-display">
                Pre-Berth Documentation Scrutiny
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We audit Bill of Lading, Form M, commercial invoices, and packing lists before the vessel touches Lagos waters, ensuring PAAR is ready in advance.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                02
              </div>
              <h3 className="text-sm font-bold text-white font-display">
                Immediate Terminal Positioning
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Operating directly from 11A Pelewura Way, our agents book terminal positioning at APMT/Tin Can the minute containers are discharged from vessel holds.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                03
              </div>
              <h3 className="text-sm font-bold text-white font-display">
                Joint Customs Joint Examination
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We physically represent your consignments alongside NCS officers, NDLEA, NAFDAC, and SON officials to resolve query discrepancies on the spot.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                04
              </div>
              <h3 className="text-sm font-bold text-white font-display">
                Pre-Staged Haulage Trucks
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our heavy flatbeds and container skeleton trucks are pre-cleared for terminal entry, ready to gate out the moment delivery orders are issued.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Verified Operational Statistics */}
      <StatsSection onRequestQuote={() => navigate('/contact')} />

      {/* 5. Client Testimonials & Corporate References */}
      <TestimonialsSection onRequestQuote={() => navigate('/contact')} />
    </div>
  );
};
