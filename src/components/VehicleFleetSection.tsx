import React, { useState } from 'react';
import {
  Car,
  ShieldCheck,
  Truck,
  Anchor,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Sparkles,
  MapPin,
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';
import luxuryCarsPortImg from '../assets/images/luxury_cars_port_1791890294373.jpg';
import carCarrierHaulageImg from '../assets/images/car_carrier_haulage_1791890309517.jpg';
import roroDischargeImg from '../assets/images/roro_black_officers_1791988253646.jpg';
import { AnimatedCounter } from './AnimatedCounter';

interface VehicleFleetSectionProps {
  onRequestQuoteWithService: (serviceName?: string) => void;
}

export const VehicleFleetSection: React.FC<VehicleFleetSectionProps> = ({
  onRequestQuoteWithService
}) => {
  const [activeGalleryTab, setActiveGalleryTab] = useState<'all' | 'roro' | 'luxury' | 'carrier'>('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const vehicleShowcaseItems = [
    {
      id: 'luxury-port',
      tag: 'Portside Discharge & Tally',
      category: 'luxury',
      title: 'Luxury Fleet & Executive SUVs at Apapa Port Apron',
      subtitle: 'Brand new Mercedes-Benz, Range Rover, Land Cruiser & executive SUVs staged post-discharge.',
      image: luxuryCarsPortImg,
      location: 'Apapa Seaport Quay & PTML Berth',
      badge: 'Premium Automobile Handling',
      highlights: [
        'VIN valuation verification with Nigeria Customs Service',
        'Physical port apron inspection and tally verification',
        'Direct release from PTML & Tin Can Island berths',
        'Zero-scratch handling with certified dock logistics handlers'
      ],
      turnaround: '24 - 48 Hours Port Release'
    },
    {
      id: 'carrier-transit',
      tag: 'Intermodal Trucking & Delivery',
      category: 'carrier',
      title: 'Specialized Multi-Tier Car Carrier Haulage Fleet',
      subtitle: 'Modern hydraulic multi-deck car transporters delivering securely from Lagos ports to nationwide showrooms.',
      image: carCarrierHaulageImg,
      location: 'Lagos-Ibadan Expressway Corridor to Nationwide Hubs',
      badge: 'Enclosed & Flatbed Carrier Logistics',
      highlights: [
        'Dedicated hydraulic tie-down strapping on modern double-deckers',
        'GPS live telemetry tracking from port gate to destination',
        'Comprehensive Goods-in-Transit (GIT) marine and inland insurance',
        'Direct delivery to car dealerships, corporate fleets & private villas'
      ],
      turnaround: 'Same-day Dispatch Post-Release'
    },
    {
      id: 'roro-vessel',
      tag: 'Ro-Ro Vessel Unloading & Customs Gate',
      category: 'roro',
      title: 'Roll-on / Roll-off (Ro-Ro) Vessel Ramp Offloading',
      subtitle: 'Seamless roll-off discharging directly from ocean car carriers with on-site customs clearance.',
      image: roroDischargeImg,
      location: 'PTML Terminal (Grimaldi) & Tin Can Off-Dock',
      badge: 'Certified NCS Customs Brokerage',
      highlights: [
        'Fast-track Roll-on/Roll-off ocean carrier discharge processing',
        'Nigeria Customs VIN assessment and automated duty payment',
        'Discharge tally sheets, physical checks, and exit gate passes',
        'Immediate clearance without demurrage or port penalty delays'
      ],
      turnaround: 'Rapid Duty Assessment'
    }
  ];

  const filteredItems = vehicleShowcaseItems.filter(item => {
    if (activeGalleryTab === 'all') return true;
    return item.category === activeGalleryTab;
  });

  return (
    <section id="vehicles" className="py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header with Amber Label & Accent Line */}
        <div className="reveal-on-scroll flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              <span>AUTOMOBILE & FLEET LOGISTICS</span>
            </div>
            <span className="section-accent-line" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance mt-3">
              Premium Vehicle Importation, Port Clearing & Haulage
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-[65ch]">
              We manage the end-to-end clearing and delivery of luxury automobiles, executive fleets, commercial vehicles, and heavy machinery arriving via Roll-on/Roll-off (Ro-Ro) vessels and containerized shipping at Lagos ports.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-950/80 border border-slate-800 rounded-xl self-start lg:self-auto overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setActiveGalleryTab('all')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeGalleryTab === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Vehicles ({vehicleShowcaseItems.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveGalleryTab('roro')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeGalleryTab === 'roro'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ro-Ro Vessel Discharge
            </button>
            <button
              type="button"
              onClick={() => setActiveGalleryTab('luxury')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeGalleryTab === 'luxury'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Luxury Fleet & SUVs
            </button>
            <button
              type="button"
              onClick={() => setActiveGalleryTab('carrier')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeGalleryTab === 'carrier'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Car Carrier Haulage
            </button>
          </div>
        </div>

        {/* Highlight Stats Strip with Animated Counters */}
        <div className="reveal-group grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="reveal-on-scroll bg-slate-950/70 border border-slate-800 rounded-xl p-4.5 premium-card-lift">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
              <Anchor className="w-4 h-4 shrink-0" />
              <span>PTML & Tin Can Direct</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-display">
              <AnimatedCounter value="100%" /> Ro-Ro Berth
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Direct presence at Grimaldi PTML terminal gate
            </p>
          </div>

          <div className="reveal-on-scroll bg-slate-950/70 border border-slate-800 rounded-xl p-4.5 premium-card-lift">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Customs VIN Valuation</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-display">
              Zero Demurrage
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Pre-arrival document verification & duty filing
            </p>
          </div>

          <div className="reveal-on-scroll bg-slate-950/70 border border-slate-800 rounded-xl p-4.5 premium-card-lift">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
              <Truck className="w-4 h-4 shrink-0" />
              <span>Multi-Car Carrier</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-display">
              Nationwide Delivery
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              GPS tracked enclosed and open hydraulic trucks
            </p>
          </div>

          <div className="reveal-on-scroll bg-slate-950/70 border border-slate-800 rounded-xl p-4.5 premium-card-lift">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
              <Clock className="w-4 h-4 shrink-0" />
              <span>Fast Terminal Exit</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-display">
              <AnimatedCounter value="24 - 48 Hours" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Average release window from ship discharge
            </p>
          </div>
        </div>

        {/* Featured Visual Grid of Vehicles */}
        <div className="reveal-group grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="reveal-on-scroll bg-slate-950/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group premium-card-lift"
            >
              <div>
                {/* Image Showcase Card */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setPreviewImage(item.image)}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-slate-950 bg-amber-400 px-3 py-1 rounded-full shadow-md">
                      {item.tag}
                    </span>
                    <span className="text-[11px] font-semibold text-white bg-slate-900/80 backdrop-blur-xs border border-white/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{item.turnaround}</span>
                    </span>
                  </div>

                  {/* Bottom Image Overlay Info */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    {item.highlights.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewImage(item.image)}
                    className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
                  >
                    <span>View HD Photo</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRequestQuoteWithService('Vehicle Clearing & Ro-Ro Logistics')}
                    className="btn-interactive group px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Specialized Automobile Import Guidance Card */}
        <div className="reveal-on-scroll bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400">
              <Layers className="w-4 h-4" />
              <span>Importing a Vehicle to Nigeria? Check What We Cover:</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
              Complete Documentation: VIN Valuation, Form M, Duty Payment & Terminal Gate Out
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Whether you are importing a single luxury SUV or shipping an entire corporate vehicle fleet from the USA, Europe, UAE, or Asia, our Apapa & PTML agents expedite customs paperwork and protect your vehicle from transit damage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              type="button"
              onClick={() => onRequestQuoteWithService('Vehicle Clearing & Ro-Ro Logistics')}
              className="btn-interactive w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Car className="w-4 h-4" />
              <span>Request a Quote</span>
            </button>
          </div>
        </div>

      </div>

      {/* Fullscreen Photo Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={previewImage}
              alt="High resolution showcase - RIMI TRANSPORT AND ALLIED LIMITED"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl border border-slate-700"
            />
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 bg-slate-900/90 text-white hover:text-amber-400 p-2 rounded-full border border-slate-700 cursor-pointer"
              aria-label="Close image preview"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
