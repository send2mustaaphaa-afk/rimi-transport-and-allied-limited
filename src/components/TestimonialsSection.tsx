import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star, ArrowRight, ShieldCheck, Building2 } from 'lucide-react';
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
    clientName: '[Client Name 1 / Operations Director]',
    clientRole: 'Head of Procurement & Supply Chain',
    clientCompany: '[Company Name / Manufacturing Conglomerate]',
    location: 'Ikeja Industrial Estate, Lagos',
    serviceCategory: 'Containerized Raw Materials Clearance (FCL)',
    quoteSnippet: '[Add real client testimonial headline here]',
    fullQuote:
      '[Add real client review quote here — e.g. "Rimi Transport managed our 20x40ft containers through Apapa Port seamlessly. PAAR clearance and customs release were finalized within the expected timeframe with zero unexpected demurrage charges."]'
  },
  {
    id: 2,
    clientName: '[Client Name 2 / Managing Director]',
    clientRole: 'Managing Director & Principal Importer',
    clientCompany: '[Company Name / Agro-Allied & Chemical Importers]',
    location: 'Kano & Abuja Distribution Hubs',
    serviceCategory: 'NAFDAC & SON Regulated Cargo Clearance',
    quoteSnippet: '[Add real client testimonial headline here]',
    fullQuote:
      '[Add real client review quote here — e.g. "Their compliance team expedited our NAFDAC lab release and SONCAP validation without shipping line delay penalties. Reliable door-to-door transit to our northern depots."]'
  },
  {
    id: 3,
    clientName: '[Client Name 3 / Logistics Manager]',
    clientRole: 'Lead Logistics & Fleet Coordinator',
    clientCompany: '[Company Name / Heavy Equipment & Machinery Firm]',
    location: 'Port Harcourt & Victoria Island',
    serviceCategory: 'Ro-Ro Vehicle & Heavy Project Cargo Clearance',
    quoteSnippet: '[Add real client testimonial headline here]',
    fullQuote:
      '[Add real client review quote here — e.g. "Exceptional direct port handling at Tin Can Island. Heavy earthmoving machinery and lowbed haulage escorted securely to project sites with full GIT transit cover."]'
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
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeTestimonial = TESTIMONIAL_PLACEHOLDERS[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 bg-slate-900/60 border-t border-b border-slate-800 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.06),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
        {/* Section Header */}
        <div className="reveal-on-scroll max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
            <span>CLIENT REPUTATION & REVIEWS</span>
          </div>
          <span className="section-accent-line" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance mt-3">
            Trusted by Commercial Importers, Exporters & Industrial Shippers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-[65ch]">
            Read how businesses rely on {COMPANY_DETAILS.name} for transparent clearing tariffs, regulatory compliance, and rapid terminal release.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="reveal-on-scroll relative max-w-4xl mx-auto bg-slate-950/90 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top Info Banner for Client Transparency */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified Port & Terminal Clearance Reviews</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Placeholder Slots — Ready for Corporate References
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="min-h-[220px] flex flex-col justify-between">
            <div>
              {/* Star Rating & Quote Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-semibold text-slate-400">5.0 / 5.0 Rating</span>
                </div>
                <Quote className="w-8 h-8 text-amber-500/20" />
              </div>

              {/* Service Tag */}
              <div className="inline-block text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20 mb-3">
                {activeTestimonial.serviceCategory}
              </div>

              {/* Quote Snippet / Headline */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-display">
                "{activeTestimonial.quoteSnippet}"
              </h3>

              {/* Full Quote Text */}
              <p className="text-sm sm:text-base text-slate-300 italic leading-relaxed">
                {activeTestimonial.fullQuote}
              </p>
            </div>

            {/* Client Signature */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                  <Building2 className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">
                    {activeTestimonial.clientName}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {activeTestimonial.clientRole} • {activeTestimonial.clientCompany}
                  </p>
                  <p className="text-[11px] text-slate-400">{activeTestimonial.location}</p>
                </div>
              </div>

              {/* Nav Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous testimonial"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="text-xs font-mono text-slate-400 px-1">
                  {currentIndex + 1} / {TESTIMONIAL_PLACEHOLDERS.length}
                </div>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next testimonial"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-slate-800/50">
            {TESTIMONIAL_PLACEHOLDERS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-amber-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Section Call to Action */}
        <div className="reveal-on-scroll mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onRequestQuote}
            className="btn-interactive group w-full sm:w-auto px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <span>Request a Quote for Your Cargo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href={COMPANY_DETAILS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-interactive w-full sm:w-auto px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-sm rounded-lg border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <span>Talk to Us on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
