import React from 'react';
import { ServiceItem, COMPANY_DETAILS } from '../data/companyData';
import {
  X,
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
  CheckCircle2,
  Clock,
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestQuoteForService: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onRequestQuoteForService
}) => {
  if (!service) return null;

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-white" />;
      case 'Globe': return <Globe className="w-6 h-6 text-white" />;
      case 'ArrowLeftRight': return <ArrowLeftRight className="w-6 h-6 text-white" />;
      case 'Ship': return <Ship className="w-6 h-6 text-white" />;
      case 'Plane': return <Plane className="w-6 h-6 text-white" />;
      case 'Truck': return <Truck className="w-6 h-6 text-white" />;
      case 'Boxes': return <Boxes className="w-6 h-6 text-white" />;
      case 'Warehouse': return <Warehouse className="w-6 h-6 text-white" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-white" />;
      case 'Car': return <Car className="w-6 h-6 text-white" />;
      default: return <ShieldCheck className="w-6 h-6 text-white" />;
    }
  };

  const whatsappMessage = `Hello RIMI Transport, I would like to inquire about your ${service.title} services.`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-8">
        
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-7 sm:p-8 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
              {getServiceIcon(service.iconName)}
            </div>
            <div>
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block">
                Logistics Capability
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                {service.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-7 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Detailed Narrative */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Service Overview & Execution
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Operational Highlights */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Key Operational Deliverables & Features
            </h4>
            <ul className="space-y-2.5">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-normal">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Turnaround & Best Suited For */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B192C]">
                <Clock className="w-4 h-4 text-[#0B192C]" />
                <span>Standard Turnaround</span>
              </div>
              <p className="text-xs text-slate-600">
                {service.turnaroundTime}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B192C]">
                <Briefcase className="w-4 h-4 text-[#0B192C]" />
                <span>Target Beneficiaries</span>
              </div>
              <p className="text-xs text-slate-600">
                {service.suitableFor}
              </p>
            </div>
          </div>

          {/* Deliverables tags */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Official Documentation & Output
            </h4>
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-700">
              {service.deliverables.map((del, i) => (
                <span key={i} className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-md">
                  {del}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={COMPANY_DETAILS.whatsappMessageUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Inquire on WhatsApp</span>
          </a>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => onRequestQuoteForService(service.title)}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#0B192C] hover:bg-[#152a45] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
