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
    <div className="flex-1 font-sans">
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
      <section className="py-20 sm:py-24 bg-[#0B192C] text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <span>DEMURRAGE & COST CONTROL PROTOCOL</span>
            </div>
            <div className="w-12 h-0.5 bg-blue-400 mt-2 mb-3" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              How We Prevent Demurrage & Unexpected Port Storage Charges
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-[65ch]">
              In Nigerian maritime trade, container detention and terminal storage can rapidly multiply costs. Here is our 4-point risk prevention protocol:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#112239] border border-white/10 p-7 rounded-2xl space-y-3 shadow-md hover:border-white/20 transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-white">
                Pre-Berth Documentation Scrutiny
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We audit Bill of Lading, Form M, commercial invoices, and packing lists before the vessel touches Lagos waters, ensuring PAAR is ready in advance.
              </p>
            </div>

            <div className="bg-[#112239] border border-white/10 p-7 rounded-2xl space-y-3 shadow-md hover:border-white/20 transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-white">
                Immediate Terminal Positioning
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Operating directly from 11A Pelewura Way, our agents book terminal positioning at APMT/Tin Can the minute containers are discharged from vessel holds.
              </p>
            </div>

            <div className="bg-[#112239] border border-white/10 p-7 rounded-2xl space-y-3 shadow-md hover:border-white/20 transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-white">
                Joint Customs Examination
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We physically represent your consignments alongside NCS officers, NDLEA, NAFDAC, and SON officials to resolve query discrepancies on the spot.
              </p>
            </div>

            <div className="bg-[#112239] border border-white/10 p-7 rounded-2xl space-y-3 shadow-md hover:border-white/20 transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-white">
                Pre-Staged Haulage Trucks
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our heavy flatbeds and container skeleton trucks are pre-cleared for terminal entry, ready to gate out the moment delivery orders are issued.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Client Testimonials */}
      <TestimonialsSection onRequestQuote={() => navigate('/contact')} />

      {/* 5. Operational Stats */}
      <StatsSection onRequestQuote={() => navigate('/contact')} />
    </div>
  );
};
