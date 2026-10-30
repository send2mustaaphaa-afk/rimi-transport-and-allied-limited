import React, { useState } from 'react';
import {
  Car,
  ShieldCheck,
  Truck,
  Anchor,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  MapPin,
  Clock,
  Layers,
  X
} from 'lucide-react';
import luxuryCarsPortImg from '../assets/images/luxury_cars_port_1791890294373.jpg';
import carCarrierHaulageImg from '../assets/images/car_carrier_haulage_1791890309517.jpg';
import roroDischargeImg from '../assets/images/roro_black_officers_1791988253646.jpg';
import portContainersAutomobilesImg from '../assets/images/port_containers_automobiles_1793358335336.jpg';

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
      id: 'port-containers-autos',
      tag: 'Container & Automobile Terminal',
      category: 'roro',
      title: 'Container Stacking & Automobile Staging at Port Terminal',
      subtitle: 'Synchronized handling of high-cube containers and imported luxury automobiles at Lagos port quays.',
      image: portContainersAutomobilesImg,
      location: 'Lagos Ports Complex & PTML Ro-Ro Terminal',
      highlights: [
        'Simultaneous container offloading and Ro-Ro car ramp discharge',
        'State-of-the-art gantry crane and heavy forklift operations',
        'Secure bonded terminal storage with 24/7 armed CCTV surveillance',
        'Seamless customs examination and fast gate-out processing'
      ],
      turnaround: 'Express Terminal Clearance'
    },
    {
      id: 'luxury-port',
      tag: 'Portside Discharge & Tally',
      category: 'luxury',
      title: 'Luxury Fleet & Executive SUVs at Apapa Port Apron',
      subtitle: 'Brand new Mercedes-Benz, Range Rover, Land Cruiser & executive SUVs staged post-discharge.',
      image: luxuryCarsPortImg,
      location: 'Apapa Seaport Quay & PTML Berth',
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
    <section id="vehicles" className="py-20 sm:py-24 bg-white border-b border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-xs font-bold text-[#0B192C] uppercase tracking-widest flex items-center gap-2">
              <Car className="w-4 h-4 text-[#0B192C]" />
              <span>AUTOMOBILE & FLEET LOGISTICS</span>
            </div>
            <div className="w-12 h-0.5 bg-[#0B192C] mt-2 mb-3" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Premium Vehicle Importation, Port Clearing & Haulage
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[65ch]">
              We manage the end-to-end clearing and delivery of luxury automobiles, executive fleets, commercial vehicles, and heavy machinery arriving via Roll-on/Roll-off (Ro-Ro) vessels and containerized shipping at Lagos ports.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl self-start lg:self-auto overflow-x-auto max-w-full border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveGalleryTab('all')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeGalleryTab === 'all'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Vehicles ({vehicleShowcaseItems.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveGalleryTab('roro')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeGalleryTab === 'roro'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ro-Ro Vessel Discharge
            </button>
            <button
              type="button"
              onClick={() => setActiveGalleryTab('luxury')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeGalleryTab === 'luxury'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Luxury Fleet & SUVs
            </button>
            <button
              type="button"
              onClick={() => setActiveGalleryTab('carrier')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeGalleryTab === 'carrier'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Car Carrier Haulage
            </button>
          </div>
        </div>

        {/* Highlight Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 shadow-[0_2px_12px_-2px_rgba(11,25,44,0.04)]">
            <div className="flex items-center gap-2 text-[#0B192C] text-xs font-bold mb-1">
              <Anchor className="w-4 h-4 shrink-0 text-[#0B192C]" />
              <span>PTML & Tin Can</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#0B192C]">
              100% Ro-Ro Berth
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Direct presence at Grimaldi PTML terminal gate
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 shadow-[0_2px_12px_-2px_rgba(11,25,44,0.04)]">
            <div className="flex items-center gap-2 text-[#0B192C] text-xs font-bold mb-1">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#0B192C]" />
              <span>Customs VIN Valuation</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#0B192C]">
              Zero Demurrage
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Pre-arrival document verification & duty filing
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 shadow-[0_2px_12px_-2px_rgba(11,25,44,0.04)]">
            <div className="flex items-center gap-2 text-[#0B192C] text-xs font-bold mb-1">
              <Truck className="w-4 h-4 shrink-0 text-[#0B192C]" />
              <span>Multi-Car Carrier</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#0B192C]">
              Nationwide Delivery
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              GPS tracked enclosed and open hydraulic trucks
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 shadow-[0_2px_12px_-2px_rgba(11,25,44,0.04)]">
            <div className="flex items-center gap-2 text-[#0B192C] text-xs font-bold mb-1">
              <Clock className="w-4 h-4 shrink-0 text-[#0B192C]" />
              <span>Fast Terminal Exit</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#0B192C]">
              24 - 48 Hours
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Average release window from ship discharge
            </p>
          </div>
        </div>

        {/* Featured Visual Grid of Vehicles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(11,25,44,0.05)] hover:shadow-[0_12px_32px_-4px_rgba(11,25,44,0.1)] hover:border-[#0B192C]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Showcase Card */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setPreviewImage(item.image)}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-[#0B192C] bg-white px-3 py-1 rounded-full shadow-md">
                      {item.tag}
                    </span>
                    <span className="text-[11px] font-semibold text-white bg-[#0B192C]/80 px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
                      <Clock className="w-3 h-3 text-slate-300" />
                      <span>{item.turnaround}</span>
                    </span>
                  </div>

                  {/* Bottom Image Overlay Info */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-white">
                      <MapPin className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-7 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#0B192C]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    {item.highlights.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B192C] shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-7 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewImage(item.image)}
                    className="text-xs font-semibold text-slate-500 hover:text-[#0B192C] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View HD Photo</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#0B192C]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRequestQuoteWithService('Vehicle Clearing & Ro-Ro Logistics')}
                    className="px-4 py-2.5 bg-[#0B192C] hover:bg-[#152a45] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guidance Card */}
        <div className="bg-[#0B192C] text-white rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-300">
              <Layers className="w-4 h-4" />
              <span>Importing a Vehicle to Nigeria? Check What We Cover:</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Complete Documentation: VIN Valuation, Form M, Duty Payment & Terminal Gate Out
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Whether you are importing a single luxury SUV or shipping an entire corporate vehicle fleet from the USA, Europe, UAE, or Asia, our Apapa & PTML agents expedite customs paperwork and protect your vehicle from transit damage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              type="button"
              onClick={() => onRequestQuoteWithService('Vehicle Clearing & Ro-Ro Logistics')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-100 text-[#0B192C] font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
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
              className="absolute top-3 right-3 bg-slate-900/90 text-white hover:text-slate-300 p-2 rounded-full border border-slate-700 cursor-pointer"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
