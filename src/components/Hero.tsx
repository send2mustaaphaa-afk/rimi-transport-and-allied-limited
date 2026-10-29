import React, { useState } from 'react';
import { COMPANY_DETAILS } from '../data/companyData';
import { ArrowRight, ShieldCheck, Clock, MapPin, Search, PhoneCall, CheckCircle2 } from 'lucide-react';
import heroPortImg from '../assets/images/hero_lux_containers_sunset_1791329802841.jpg';

interface HeroProps {
  onRequestQuote: () => void;
  onTrackShipment: (trackingId?: string) => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onRequestQuote,
  onTrackShipment,
  onExploreServices
}) => {
  const [quickTrackingInput, setQuickTrackingInput] = useState('');

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackingInput.trim()) {
      onTrackShipment(quickTrackingInput.trim());
    } else {
      onTrackShipment();
    }
  };

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden">
      {/* Background Graphic & Scrim with Ken Burns subtle zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={heroPortImg}
          alt="Modern Cargo Containers at Apapa Seaport Terminal - RIMI TRANSPORT AND ALLIED LIMITED"
          className="w-full h-full object-cover object-center opacity-40 animate-ken-burns"
          referrerPolicy="no-referrer"
        />
        {/* Layered high-contrast dark scrim ensuring pristine readability across all displays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/98 via-slate-950/90 to-slate-950/70" />
        <div className="absolute inset-0 bg-slate-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.18),transparent_65%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Hero Column with Page Load Stagger */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Trust Kicker (Stagger 1) */}
            <div className="hero-stagger-1 inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>11A Pelewura Way, Apapa — Direct Port Terminal Corridor</span>
            </div>

            {/* Headline with fluid clamp size & tightened line-height (Stagger 2) */}
            <h1 className="hero-stagger-2 hero-headline-fluid text-white font-display text-balance">
              Reliable Clearing & Forwarding Solutions for Your Business
            </h1>

            {/* Supporting Message (Stagger 3) */}
            <p className="hero-stagger-3 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              We provide efficient customs clearance, freight forwarding, transportation, and logistics solutions to move your cargo safely and on time.
            </p>

            {/* Neatly Grouped Checkmark Benefits Card (Stagger 4) */}
            <div className="hero-stagger-4 bg-slate-900/80 border border-slate-800/90 rounded-xl p-3.5 sm:p-4 backdrop-blur-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="font-medium">Fast PAAR & Release</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="font-medium">Door-to-Door Delivery</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="font-medium">Transparent Tariffs</span>
                </div>
              </div>
            </div>

            {/* Primary & Secondary CTAs with Interactive states (Stagger 5) */}
            <div className="hero-stagger-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={onRequestQuote}
                className="btn-interactive px-7 py-3.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-sm sm:text-base rounded-xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 flex items-center justify-center gap-2.5 group cursor-pointer ring-2 ring-amber-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200 ease-out" />
              </button>

              <button
                onClick={onExploreServices}
                className="btn-interactive px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm sm:text-base rounded-xl border border-slate-700/80 hover:border-slate-600 transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <span>Explore 10 Key Services</span>
              </button>

              <a
                href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                className="btn-interactive px-4 py-3 text-slate-300 hover:text-amber-400 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 rounded-xl transition-colors self-center sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Call:</span>
                <span>{COMPANY_DETAILS.phone}</span>
              </a>
            </div>

            {/* Metadata separator proof (Stagger 6) */}
            <div className="hero-stagger-6 pt-4 border-t border-slate-800 flex items-center flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Nigeria Customs Service Authorized</span>
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>24 - 72h Swift Port Discharge</span>
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span>Apapa & Tin Can Terminal Access</span>
            </div>
          </div>

          {/* Right Hero Column: Quick Logistics Action Card (Stagger Right) */}
          <div className="lg:col-span-5 hero-stagger-right">
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-md">
              <div className="border-b border-slate-800 pb-4 mb-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white font-display">
                    Quick Cargo Lookup & Dispatch
                  </h3>
                  <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                    Apapa Hub
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Track an existing shipment or begin clearing a new consignment.
                </p>
              </div>

              {/* Fast Track Form */}
              <form onSubmit={handleQuickTrack} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Consignment / Tracking Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. RTL-APP-8921, RTL-AIR-1093..."
                      value={quickTrackingInput}
                      onChange={(e) => setQuickTrackingInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-3.5 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      type="submit"
                      className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 rounded-md transition-colors flex items-center justify-center cursor-pointer"
                      aria-label="Track consignment"
                      title="Track consignment"
                    >
                      <Search className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1.5">
                    Demo consignment codes: <button type="button" onClick={() => setQuickTrackingInput('RTL-APP-8921')} className="text-amber-400 font-medium underline hover:text-amber-300">RTL-APP-8921</button> or <button type="button" onClick={() => setQuickTrackingInput('RTL-AIR-1093')} className="text-amber-400 font-medium underline hover:text-amber-300">RTL-AIR-1093</button>
                  </p>
                </div>

                {/* Quick Service Category Selector */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
                  <div className="text-xs font-semibold text-slate-300">
                    What service do you require today?
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={onRequestQuote}
                      className="p-2.5 text-left bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-lg transition-all text-xs text-slate-200"
                    >
                      <span className="font-semibold text-amber-400 block">Customs Clearance</span>
                      <span className="text-[11px] text-slate-400">Apapa & Tin Can Ports</span>
                    </button>
                    <button
                      type="button"
                      onClick={onRequestQuote}
                      className="p-2.5 text-left bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-lg transition-all text-xs text-slate-200"
                    >
                      <span className="font-semibold text-amber-400 block">Ocean & Air Freight</span>
                      <span className="text-[11px] text-slate-400">FCL, LCL & Air Cargo</span>
                    </button>
                    <button
                      type="button"
                      onClick={onRequestQuote}
                      className="p-2.5 text-left bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-lg transition-all text-xs text-slate-200"
                    >
                      <span className="font-semibold text-amber-400 block">Land Haulage</span>
                      <span className="text-[11px] text-slate-400">Nationwide Trucking</span>
                    </button>
                    <button
                      type="button"
                      onClick={onRequestQuote}
                      className="p-2.5 text-left bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-lg transition-all text-xs text-slate-200"
                    >
                      <span className="font-semibold text-amber-400 block">Warehousing</span>
                      <span className="text-[11px] text-slate-400">Secure Port Storage</span>
                    </button>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={onRequestQuote}
                    className="btn-interactive group w-full py-2.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-amber-400 hover:text-amber-300 font-semibold text-xs rounded-lg border border-amber-500/25 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
