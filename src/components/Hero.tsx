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
      {/* Background Graphic & Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroPortImg}
          alt="Modern Cargo Containers at Apapa Seaport Terminal - RIMI TRANSPORT AND ALLIED LIMITED"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transform motion-safe:transition-transform motion-safe:duration-10000 hover:scale-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.2),transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-7">
            {/* Trust Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>11A Pelewura Way, Apapa — Direct Port Terminal Corridor</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.12] text-balance">
              Reliable Clearing & Forwarding Solutions for Your Business
            </h1>

            {/* Supporting Message */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              We provide efficient customs clearance, freight forwarding, transportation, and logistics solutions to move your cargo safely and on time.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Fast PAAR & Customs Release</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Door-to-Door Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Transparent Tariffs</span>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onRequestQuote}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-sm sm:text-base rounded-lg transition-all duration-200 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreServices}
                className="px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm sm:text-base rounded-lg border border-slate-700 hover:border-slate-600 transition-colors flex items-center justify-center gap-2"
              >
                <span>Explore 9 Key Services</span>
              </button>

              <a
                href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                className="px-4 py-3.5 text-slate-300 hover:text-amber-400 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Call:</span>
                <span>{COMPANY_DETAILS.phone}</span>
              </a>
            </div>

            {/* Metadata separator proof */}
            <div className="pt-4 border-t border-slate-800 flex items-center flex-wrap gap-4 text-xs text-slate-400">
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

          {/* Right Hero Column: Quick Logistics Action Card */}
          <div className="lg:col-span-5">
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
                      className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-md transition-colors flex items-center justify-center cursor-pointer"
                      title="Search Tracking ID"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Try demo codes: <button type="button" onClick={() => setQuickTrackingInput('RTL-APP-8921')} className="text-amber-400 underline hover:text-amber-300">RTL-APP-8921</button> or <button type="button" onClick={() => setQuickTrackingInput('RTL-AIR-1093')} className="text-amber-400 underline hover:text-amber-300">RTL-AIR-1093</button>
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
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 font-bold text-xs rounded-lg transition-colors border border-amber-500/20 flex items-center justify-center gap-2"
                  >
                    <span>Instant Online Quote Estimator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
