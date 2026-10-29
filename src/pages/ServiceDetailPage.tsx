import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SERVICES_DATA, ServiceItem, COMPANY_DETAILS } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';
import { SeoHead } from '../components/SeoHead';
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
  Clock,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  ChevronRight,
  Phone
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

const ICON_MAP: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-amber-500" />,
  Globe: <Globe className="w-6 h-6 text-amber-500" />,
  ArrowLeftRight: <ArrowLeftRight className="w-6 h-6 text-amber-500" />,
  Ship: <Ship className="w-6 h-6 text-amber-500" />,
  Plane: <Plane className="w-6 h-6 text-amber-500" />,
  Truck: <Truck className="w-6 h-6 text-amber-500" />,
  Boxes: <Boxes className="w-6 h-6 text-amber-500" />,
  Warehouse: <Warehouse className="w-6 h-6 text-amber-500" />,
  FileCheck: <FileCheck className="w-6 h-6 text-amber-500" />,
  Car: <Car className="w-6 h-6 text-amber-500" />
};

export const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  // Normalize slug matching (e.g. import-export vs import-export-services)
  const service = SERVICES_DATA.find(s => {
    if (!serviceId) return false;
    const cleanParam = serviceId.toLowerCase().trim();
    if (s.id === cleanParam) return true;
    if (cleanParam === 'import-export' && s.id === 'import-export-services') return true;
    if (cleanParam === 'customs' && s.id === 'customs-clearance') return true;
    if (cleanParam === 'freight' && s.id === 'freight-forwarding') return true;
    if (cleanParam === 'vehicles' && s.id === 'vehicle-clearing-roro') return true;
    return false;
  });

  if (!service) {
    return (
      <div className="flex-1 bg-slate-950 text-white py-24 px-4 text-center">
        <h2 className="text-2xl font-bold font-display mb-3">Service Not Found</h2>
        <p className="text-slate-400 mb-6 text-sm">The logistics service you requested is not listed in our catalogue.</p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs"
        >
          <span>View All 10 Core Services</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const otherServices = SERVICES_DATA.filter(s => s.id !== service.id).slice(0, 4);

  return (
    <div className="flex-1">
      <SeoHead
        title={`${service.title} | Apapa Port Logistics`}
        description={`${service.shortDescription} Release turnaround: ${service.turnaroundTime}. Fast PAAR, clearance, and insured delivery by RIMI TRANSPORT.`}
        path={`/services/${service.id}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": service.title,
          "serviceType": "Freight and Customs Logistics",
          "provider": {
            "@type": "Organization",
            "name": COMPANY_DETAILS.name,
            "telephone": COMPANY_DETAILS.phoneRaw,
            "address": COMPANY_DETAILS.officeAddress
          },
          "description": service.shortDescription
        }}
      />

      {/* 1. Page Header */}
      <PageHeader
        badge="LOGISTICS SERVICE PROFILE"
        title={service.title}
        description={service.shortDescription}
        currentPage={service.title}
        parentPage={{ label: 'Services', path: '/services' }}
      />

      {/* 2. Main In-Depth Service Specification */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Full Scope, Features, Deliverables */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Detailed Narrative */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    {ICON_MAP[service.iconName] || <ShieldCheck className="w-6 h-6 text-amber-500" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
                      OPERATIONAL OVERVIEW
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                      {service.title}
                    </h2>
                  </div>
                </div>

                <p className="text-base text-slate-700 leading-relaxed pt-2">
                  {service.fullDescription}
                </p>
              </div>

              {/* Scope of Features */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-subtle">
                <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  Key Operational Features & Standards
                </h3>
                <p className="text-xs text-slate-500">
                  Every step is executed in accordance with Nigeria Customs Service (NCS) and Nigerian Ports Authority (NPA) regulatory frameworks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Turnaround Time & Target Client Fit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2 shadow-2xs">
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                    <Clock className="w-4 h-4" />
                    <span>Standard Turnaround Window</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 font-display">
                    {service.turnaroundTime}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Measured from vessel/flight discharge or document validation at Lagos port terminals.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2 shadow-2xs">
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                    <Boxes className="w-4 h-4" />
                    <span>Ideal For</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 font-display">
                    Commercial & Industrial Shippers
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.suitableFor}
                  </p>
                </div>
              </div>

              {/* Client Deliverables & Documentation */}
              <div className="border border-slate-200 rounded-2xl p-6 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wider text-slate-800">
                  Documentation & Release Deliverables Provided to Client:
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {service.deliverables.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Instant Action Sidebar & Apapa Desk */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              
              {/* Quote CTA Card */}
              <div className="bg-slate-950 text-white border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  FAST QUOTATION
                </div>
                <h3 className="text-xl font-bold font-display text-white">
                  Request a Quote for {service.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Provide your container parameters, HS codes, or cargo specs. Our Apapa desk calculates all statutory duties, terminal handling, and haulage without hidden charges.
                </p>

                <div className="pt-2 space-y-3">
                  <Link
                    to={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="btn-interactive w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-lg flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
                  >
                    <span>Request Quotation for This Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={COMPANY_DETAILS.whatsappMessageUrl(
                      `Hello RIMI Transport, I would like to inquire about your ${service.title} services at Apapa Port.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-interactive w-full py-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-bold text-xs rounded-lg flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Apapa Operations Desk Contacts */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Apapa Operations Desk
                </h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <p><strong>Office:</strong> {COMPANY_DETAILS.officeAddress}</p>
                  <p><strong>Phone:</strong> {COMPANY_DETAILS.phone}</p>
                  <p><strong>Hours:</strong> {COMPANY_DETAILS.businessHours}</p>
                </div>
              </div>

              {/* Other Services Navigation */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Other Logistics Services
                </h4>
                <div className="space-y-1.5">
                  {otherServices.map(s => (
                    <Link
                      key={s.id}
                      to={`/services/${s.id}`}
                      className="group flex items-center justify-between text-xs text-slate-700 hover:text-amber-600 py-1.5 border-b border-slate-100 last:border-0 transition-colors"
                    >
                      <span className="truncate">{s.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                  <div className="pt-2">
                    <Link
                      to="/services"
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
                    >
                      <span>View all 10 services</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
