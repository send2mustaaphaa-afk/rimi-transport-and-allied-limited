import React, { useState } from 'react';
import { COMPANY_DETAILS } from '../data/companyData';
import { ArrowRight, ShieldCheck, Clock, MapPin, Search, PhoneCall, CheckCircle2 } from 'lucide-react';
import corporateTruckingImg from '../assets/images/corporate_trucking_fleet_1793361788515.jpg';

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
    <section className="relative bg-[#0B192C] text-white overflow-hidden">
      {/* Background Photography with Navy Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={corporateTruckingImg}
          alt="Professional Heavy Duty Container Haulage Trucks at Port Terminal - RIMI TRANSPORT AND ALLIED LIMITED"
          className="w-full h-full object-cover object-center opacity-30"
          referrerPolicy="no-referrer"
        />
        {/* Authoritative deep navy corporate scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/90 to-[#0B192C]/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Unboxed Clean Kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300 tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>11A Pelewura Way, Apapa</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-400">Direct Port Terminal Corridor</span>
            </div>

            {/* Headline in Inter */}
            <h1 className="hero-headline-fluid text-white font-display text-balance tracking-tight">
              Reliable Clearing & Forwarding Solutions for Your Business
            </h1>

            {/* Supporting Message */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              We provide efficient customs clearance, freight forwarding, transportation, and logistics solutions to move your cargo safely and on time.
            </p>

            {/* Clean Benefits Strip */}
            <div className="bg-[#0F233D]/90 border border-slate-700/60 rounded-lg p-3.5 sm:p-4 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="font-medium">Fast PAAR & Release</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="font-medium">Door-to-Door Delivery</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="font-medium">Transparent Tariffs</span>
                </div>
              </div>
            </div>

            {/* Primary & Secondary Action Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                onClick={onRequestQuote}
                className="btn-interactive px-7 py-3.5 bg-white text-[#0B192C] hover:bg-slate-100 font-semibold text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-200"
              >
                <span>Request a Quotation</span>
                <ArrowRight className="w-4 h-4 text-[#0B192C]" />
              </button>

              <button
                onClick={onExploreServices}
                className="btn-interactive px-6 py-3.5 bg-transparent hover:bg-white/10 text-slate-200 hover:text-white font-medium text-sm sm:text-base rounded-lg border border-slate-600 hover:border-slate-400 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Our Core Services</span>
              </button>

              <a
                href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                className="px-4 py-3 text-slate-300 hover:text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors self-center sm:self-auto"
              >
                <PhoneCall className="w-4 h-4 text-blue-400" />
                <span className="hidden sm:inline">Direct Desk:</span>
                <span>{COMPANY_DETAILS.phone}</span>
              </a>
            </div>

            {/* Trust Proof Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Nigeria Customs Service Authorized</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>24 - 72h Swift Port Discharge</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Apapa & Tin Can Terminal Gate Access</span>
            </div>
          </div>

          {/* Right Hero Column: Clean White Card with Soft Shadows */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-xl p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] border border-slate-100">
              <div className="border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#0B192C] font-display">
                    Consignment Tracking & Lookup
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Apapa Hub
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your consignment code or select a service to begin clearance.
                </p>
              </div>

              {/* Fast Track Form */}
              <form onSubmit={handleQuickTrack} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Consignment / Waybill Reference
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. RTL-APP-8921, RTL-AIR-1093..."
                      value={quickTrackingInput}
                      onChange={(e) => setQuickTrackingInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3.5 pr-12 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-[#0B192C] focus:bg-white focus:ring-1 focus:ring-[#0B192C] transition-all"
                    />
                    <button
                      type="submit"
                      className="absolute right-1 top-1 bottom-1 px-3.5 bg-[#0B192C] hover:bg-[#162E4E] text-white rounded-md transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                      aria-label="Track consignment"
                      title="Track consignment"
                    >
                      <Search className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Sample references: <button type="button" onClick={() => setQuickTrackingInput('RTL-APP-8921')} className="text-[#0B192C] font-medium underline hover:text-blue-700">RTL-APP-8921</button> or <button type="button" onClick={() => setQuickTrackingInput('RTL-AIR-1093')} className="text-[#0B192C] font-medium underline hover:text-blue-700">RTL-AIR-1093</button>
                  </p>
                </div>

                {/* Quick Service Categories */}
                <div className="pt-2 border-t border-slate-100 space-y-2.5">
                  <div className="text-xs font-semibold text-slate-600">
                    Select a service category:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={onRequestQuote}
                      className="p-2.5 text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-lg transition-all text-xs text-slate-700 cursor-pointer"
                    >
                      <span className="font-semibold text-[#0B192C] block">Customs Clearance</span>
                      <span className="text-[11px] text-slate-500">Apapa & Tin Can</span>
                    </button>
                    <button
                      type="button"
                      onClick={onRequestQuote}
                      className="p-2.5 text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-lg transition-all text-xs text-slate-700 cursor-pointer"
                    >
                      <span className="font-semibold text-[#0B192C] block">Ocean & Air Freight</span>
                      <span className="text-[11px] text-slate-500">FCL, LCL & Air Cargo</span>
                    </button>
                    <button
                      type="button"
                      onClick={onRequestQuote}
                      className="p-2.5 text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-lg transition-all text-xs text-slate-700 cursor-pointer"
                    >
                      <span className="font-semibold text-[#0B192C] block">Land Haulage</span>
                      <span className="text-[11px] text-slate-500">Nationwide Trucking</span>
                    </button>
                    <button
                      type="button"
                      onClick={onRequestQuote}
                      className="p-2.5 text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-lg transition-all text-xs text-slate-700 cursor-pointer"
                    >
                      <span className="font-semibold text-[#0B192C] block">Warehousing</span>
                      <span className="text-[11px] text-slate-500">Secure Port Storage</span>
                    </button>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={onRequestQuote}
                    className="btn-interactive w-full py-2.5 bg-[#0B192C] hover:bg-[#162E4E] text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
                  >
                    <span>Request Full Tariff Assessment</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
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
