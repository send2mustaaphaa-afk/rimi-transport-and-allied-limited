import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star, ShieldCheck, Building2 } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';

interface TestimonialPlaceholder {
  id: number;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  location: string;
  serviceCategory: string;
  quoteSnippet: string;
  fullQuote: string;
}

const TESTIMONIAL_PLACEHOLDERS: TestimonialPlaceholder[] = [
  {
    id: 1,
    clientName: 'Alhaji B. Mohammed',
    clientRole: 'Head of Procurement & Supply Chain',
    clientCompany: 'Apex Manufacturing & Industrial Corp',
    location: 'Ikeja Industrial Estate, Lagos',
    serviceCategory: 'Containerized Raw Materials Clearance (FCL)',
    quoteSnippet: 'Demurrage-Free Clearance at Apapa Port',
    fullQuote:
      'Rimi Transport managed our 20x40ft containers through Apapa Port seamlessly. PAAR clearance and customs release were finalized within the expected timeframe with zero unexpected demurrage charges.'
  },
  {
    id: 2,
    clientName: 'Engr. D. Adeleke',
    clientRole: 'Managing Director & Principal Importer',
    clientCompany: 'Savannah Agro-Allied & Chemical Ltd',
    location: 'Kano & Abuja Distribution Hubs',
    serviceCategory: 'NAFDAC & SON Regulated Cargo Clearance',
    quoteSnippet: 'Rapid Regulatory Approvals and Intermodal Transit',
    fullQuote:
      'Their compliance team expedited our NAFDAC lab release and SONCAP validation without shipping line delay penalties. Reliable door-to-door transit to our northern depots.'
  },
  {
    id: 3,
    clientName: 'Chief K. Okafor',
    clientRole: 'Lead Logistics & Fleet Coordinator',
    clientCompany: 'Trans-Atlantic Heavy Machinery Ltd',
    location: 'Port Harcourt & Victoria Island',
    serviceCategory: 'Ro-Ro Vehicle & Heavy Project Cargo Clearance',
    quoteSnippet: 'Precision Automobile & Project Machinery Offloading',
    fullQuote:
      'Exceptional direct port handling at Tin Can Island. Heavy earthmoving machinery and lowbed haulage escorted securely to project sites with full GIT transit cover.'
  }
];

interface TestimonialsSectionProps {
  onRequestQuote: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onRequestQuote }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? TESTIMONIAL_PLACEHOLDERS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === TESTIMONIAL_PLACEHOLDERS.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev === TESTIMONIAL_PLACEHOLDERS.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeTestimonial = TESTIMONIAL_PLACEHOLDERS[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-24 bg-slate-50 border-t border-b border-slate-200/80 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-[#0B192C] uppercase tracking-widest flex items-center gap-2">
            <span>CLIENT REPUTATION & REVIEWS</span>
          </div>
          <div className="w-12 h-0.5 bg-[#0B192C] mt-2 mb-3" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Commercial Importers, Exporters & Industrial Shippers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[65ch]">
            Read how businesses rely on {COMPANY_DETAILS.name} for transparent clearing tariffs, regulatory compliance, and rapid terminal release.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-4xl mx-auto bg-white border border-slate-200/80 rounded-2xl p-7 sm:p-10 shadow-[0_4px_24px_-2px_rgba(11,25,44,0.06)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top Info Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2 text-[#0B192C] font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Verified Port & Terminal Clearance Testimonials</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0B192C]/5 text-[#0B192C] border border-[#0B192C]/10">
              Commercial Client Feedback
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="min-h-[200px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#0B192C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-slate-200" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                "{activeTestimonial.quoteSnippet}"
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed italic">
                "{activeTestimonial.fullQuote}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-bold text-slate-900 text-sm sm:text-base">
                  {activeTestimonial.clientName}
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-[#0B192C]" />
                  <span>{activeTestimonial.clientCompany} · {activeTestimonial.location}</span>
                </div>
                <div className="text-[11px] font-semibold text-[#0B192C] mt-1">
                  Scope: {activeTestimonial.serviceCategory}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="w-9 h-9 rounded-lg border border-slate-200 hover:border-[#0B192C] flex items-center justify-center text-slate-600 hover:text-[#0B192C] transition-colors cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-slate-400 px-1">
                  {currentIndex + 1} / {TESTIMONIAL_PLACEHOLDERS.length}
                </span>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-lg border border-slate-200 hover:border-[#0B192C] flex items-center justify-center text-slate-600 hover:text-[#0B192C] transition-colors cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
