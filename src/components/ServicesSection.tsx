import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ServiceItem, SERVICES_DATA } from '../data/companyData';
import { ServiceDetailModal } from './ServiceDetailModal';
import {
  ShieldCheck,
  Globe,
  ArrowLeftRight,
  Ship,
  Plane,
  Truck,
  Boxes,
  Warehouse,
  FileCheck,
  Car,
  ArrowRight,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import seaAirFreightImg from '../assets/images/sea_air_freight_cargo_1791329104912.jpg';
import landTruckingImg from '../assets/images/lux_containers_freight_sunset_1791329824177.jpg';

interface ServicesSectionProps {
  onRequestQuoteWithService: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onRequestQuoteWithService
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getServiceIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-amber-500" };
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'ArrowLeftRight': return <ArrowLeftRight {...props} />;
      case 'Ship': return <Ship {...props} />;
      case 'Plane': return <Plane {...props} />;
      case 'Truck': return <Truck {...props} />;
      case 'Boxes': return <Boxes {...props} />;
      case 'Warehouse': return <Warehouse {...props} />;
      case 'FileCheck': return <FileCheck {...props} />;
      case 'Car': return <Car {...props} />;
      default: return <ShieldCheck {...props} />;
    }
  };

  const filteredServices = SERVICES_DATA.filter(service => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'customs' && (service.id.includes('customs') || service.id.includes('compliance') || service.id.includes('import') || service.id.includes('vehicle'))) return true;
    if (activeFilter === 'freight' && (service.id.includes('freight') || service.id.includes('sea') || service.id.includes('air') || service.id.includes('roro'))) return true;
    if (activeFilter === 'haulage' && (service.id.includes('land') || service.id.includes('cargo') || service.id.includes('warehousing') || service.id.includes('vehicle'))) return true;
    return true;
  });

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header with Amber Label & Accent Line */}
        <div className="reveal-on-scroll flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-2">
              <span>OUR SERVICES</span>
            </div>
            <span className="section-accent-line" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight text-balance mt-3">
              End-to-End Clearing, Forwarding & Haulage Services
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[65ch]">
              From vessel berthing and customs documentation to multimodal transport and secured storage, we manage your complete supply chain requirements with precision.
            </p>
          </div>

          {/* Filter segment tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/90 rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All 10 Services
            </button>
            <button
              onClick={() => setActiveFilter('customs')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'customs'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Customs & Trade
            </button>
            <button
              onClick={() => setActiveFilter('freight')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'freight'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sea & Air Freight
            </button>
            <button
              onClick={() => setActiveFilter('haulage')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'haulage'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Haulage & Storage
            </button>
          </div>
        </div>

        {/* Featured Visual Callout Banners */}
        <div className="reveal-group grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          <div className="reveal-on-scroll relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-card group">
            <img
              src={seaAirFreightImg}
              alt="Global Freight Forwarding and Sea Air Operations"
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                International Sea & Air Logistics
              </span>
              <h3 className="text-lg font-bold font-display">
                Connecting Nigeria to Global Shipping Lanes
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2 max-w-[65ch]">
                Containerized FCL, grouped LCL, and scheduled air freight from Asia, Europe, the Americas, and the Middle East.
              </p>
            </div>
          </div>

          <div className="reveal-on-scroll relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-card group">
            <img
              src={landTruckingImg}
              alt="Heavy Duty Land Haulage and Container Trucking"
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Inland Haulage & Distribution
              </span>
              <h3 className="text-lg font-bold font-display">
                Heavy Duty Container & Project Haulage Fleet
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2 max-w-[65ch]">
                Direct container dispatch from Apapa & Tin Can gates to factory destinations nationwide with GPS monitoring.
              </p>
            </div>
          </div>

        </div>

        {/* 10 Services Bento Grid (Equal heights, 16px radius, hover lift, amber-tinted icon square) */}
        <div className="reveal-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="reveal-on-scroll bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card hover:border-amber-500/50 flex flex-col justify-between group premium-card-lift"
            >
              <div className="space-y-4">
                {/* Top card header */}
                <div className="flex items-center justify-between">
                  <div className="card-icon-square w-12 h-12 rounded-xl bg-amber-500/12 border border-amber-500/25 flex items-center justify-center shadow-2xs group-hover:bg-amber-500/20 transition-colors">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-bold">
                    0{index + 1}.
                  </span>
                </div>

                {/* Title & Short Description */}
                <div>
                  <Link
                    to={`/services/${service.id}`}
                    className="text-lg font-bold text-slate-900 font-display group-hover:text-amber-600 transition-colors block"
                  >
                    {service.title}
                  </Link>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Key Bullet Features */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  {service.features.slice(0, 2).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-[11px] text-slate-600">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action Footers */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  to={`/services/${service.id}`}
                  className="text-xs font-bold text-slate-800 hover:text-amber-600 flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                </Link>

                <button
                  type="button"
                  onClick={() => onRequestQuoteWithService(service.title)}
                  className="btn-interactive group text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for Custom Inquiries */}
        <div className="reveal-on-scroll mt-12 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
              Need a Custom Multimodal Logistics Solution?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak directly with our Apapa port logistics coordinators for tailored container clearing & haulage rates.
            </p>
          </div>
          <button
            onClick={() => onRequestQuoteWithService()}
            className="btn-interactive px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg whitespace-nowrap shrink-0 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Request a Quote
          </button>
        </div>

      </div>

      {/* Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onRequestQuoteForService={(title) => {
          setSelectedService(null);
          onRequestQuoteWithService(title);
        }}
      />
    </section>
  );
};
