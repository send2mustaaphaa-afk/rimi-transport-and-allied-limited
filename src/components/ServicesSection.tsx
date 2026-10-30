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
  CheckCircle
} from 'lucide-react';
import corporateFleetImg from '../assets/images/corporate_trucking_fleet_1793361788515.jpg';
import terminalHubImg from '../assets/images/trucking_terminal_hub_1793361802966.jpg';

interface ServicesSectionProps {
  onRequestQuoteWithService: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onRequestQuoteWithService
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getServiceIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-[#0B192C] group-hover:text-white transition-colors" };
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
    <section id="services" className="py-20 sm:py-24 bg-white border-b border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-xs font-bold text-[#0B192C] uppercase tracking-widest flex items-center gap-2">
              <span>OUR SERVICES</span>
            </div>
            <div className="w-12 h-0.5 bg-[#0B192C] mt-2 mb-3" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              End-to-End Clearing, Forwarding & Haulage Services
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[65ch]">
              From vessel berthing and customs documentation to multimodal transport and secured storage, we manage your complete supply chain requirements with precision.
            </p>
          </div>

          {/* Filter segment tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start md:self-auto overflow-x-auto max-w-full border border-slate-200">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All 10 Services
            </button>
            <button
              onClick={() => setActiveFilter('customs')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'customs'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Customs & Trade
            </button>
            <button
              onClick={() => setActiveFilter('freight')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'freight'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sea & Air Freight
            </button>
            <button
              onClick={() => setActiveFilter('haulage')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'haulage'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Haulage & Storage
            </button>
          </div>
        </div>

        {/* Featured Visual Callout Banners with Real Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          
          <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_4px_20px_-2px_rgba(11,25,44,0.06)] group bg-slate-950">
            <img
              src={corporateFleetImg}
              alt="Heavy Duty Container Truck Fleet Operating on Corridor"
              className="w-full h-64 object-cover group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/50 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider block mb-1">
                International Sea & Air Logistics
              </span>
              <h3 className="text-xl font-bold">
                Connecting Nigeria to Global Shipping Lanes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2 max-w-[65ch]">
                Containerized FCL, grouped LCL, and scheduled air freight from Asia, Europe, the Americas, and the Middle East.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_4px_20px_-2px_rgba(11,25,44,0.06)] group bg-slate-950">
            <img
              src={terminalHubImg}
              alt="Heavy Duty Land Haulage and Container Trucking Terminal Hub"
              className="w-full h-64 object-cover group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/50 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider block mb-1">
                Inland Haulage & Distribution
              </span>
              <h3 className="text-xl font-bold">
                Heavy Duty Container & Project Haulage Fleet
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2 max-w-[65ch]">
                Direct container dispatch from Apapa & Tin Can gates to factory destinations nationwide with GPS monitoring.
              </p>
            </div>
          </div>

        </div>

        {/* 10 Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(11,25,44,0.05)] hover:shadow-[0_12px_32px_-4px_rgba(11,25,44,0.1)] hover:border-[#0B192C]/30 flex flex-col justify-between group transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Top card header */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#0B192C]/5 border border-[#0B192C]/10 flex items-center justify-center group-hover:bg-[#0B192C] group-hover:text-white transition-colors duration-200">
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
                    className="text-lg font-bold text-slate-900 group-hover:text-[#0B192C] transition-colors block"
                  >
                    {service.title}
                  </Link>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Key Bullet Features */}
                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  {service.features.slice(0, 2).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action Footers */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  to={`/services/${service.id}`}
                  className="text-xs font-bold text-slate-700 hover:text-[#0B192C] flex items-center gap-1 transition-colors"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3 h-3 text-[#0B192C]" />
                </Link>

                <button
                  type="button"
                  onClick={() => onRequestQuoteWithService(service.title)}
                  className="text-xs font-bold text-[#0B192C] bg-slate-100 hover:bg-[#0B192C] hover:text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for Custom Inquiries */}
        <div className="mt-14 bg-[#0B192C] text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Need a Custom Multimodal Logistics Solution?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Speak directly with our Apapa port logistics coordinators for tailored container clearing & haulage rates.
            </p>
          </div>
          <button
            onClick={() => onRequestQuoteWithService()}
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-100 text-[#0B192C] font-bold text-xs sm:text-sm rounded-lg whitespace-nowrap shrink-0 shadow-sm cursor-pointer transition-colors"
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
