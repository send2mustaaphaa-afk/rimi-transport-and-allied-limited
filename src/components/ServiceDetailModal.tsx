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
  CheckCircle2,
  Clock,
  Briefcase,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

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
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-amber-500" />;
      case 'Globe': return <Globe className="w-6 h-6 text-amber-500" />;
      case 'ArrowLeftRight': return <ArrowLeftRight className="w-6 h-6 text-amber-500" />;
      case 'Ship': return <Ship className="w-6 h-6 text-amber-500" />;
      case 'Plane': return <Plane className="w-6 h-6 text-amber-500" />;
      case 'Truck': return <Truck className="w-6 h-6 text-amber-500" />;
      case 'Boxes': return <Boxes className="w-6 h-6 text-amber-500" />;
      case 'Warehouse': return <Warehouse className="w-6 h-6 text-amber-500" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-amber-500" />;
      default: return <ShieldCheck className="w-6 h-6 text-amber-500" />;
    }
  };

  const whatsappMessage = `Hello RIMI Transport, I would like to inquire about your ${service.title} services.`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-7 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
              {getServiceIcon(service.iconName)}
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Logistics Capability
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
                {service.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Detailed Narrative */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Service Overview & Execution
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Operational Highlights */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Key Operational Deliverables & Features
            </h4>
            <ul className="space-y-2.5">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-normal">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Turnaround & Best Suited For */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Standard Turnaround</span>
              </div>
              <p className="text-xs text-slate-700">
                {service.turnaroundTime}
              </p>
            </div>

            <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Briefcase className="w-4 h-4 text-slate-700" />
                <span>Target Beneficiaries</span>
              </div>
              <p className="text-xs text-slate-700">
                {service.suitableFor}
              </p>
            </div>
          </div>

          {/* Deliverables tags */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Official Documentation & Output
            </h4>
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600">
              {service.deliverables.map((del, i) => (
                <span key={i} className="bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">
                  {del}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <a
            href={COMPANY_DETAILS.whatsappMessageUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Chat on WhatsApp</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/70 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onRequestQuoteForService(service.title);
                onClose();
              }}
              className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Request Quote for This Service</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
