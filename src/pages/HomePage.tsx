import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/TrustStrip';
import { SERVICES_DATA, WHY_CHOOSE_US_POINTS, COMPANY_DETAILS } from '../data/companyData';
import { StatsSection } from '../components/StatsSection';
import { SeoHead } from '../components/SeoHead';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award,
  Zap,
  TrendingDown,
  Headphones,
  MapPin,
  ExternalLink,
  Truck,
  Ship,
  Plane,
  Boxes
} from 'lucide-react';

const TOP_SERVICE_ICONS: Record<string, React.ReactNode> = {
  'customs-clearance': <ShieldCheck className="w-5 h-5 text-amber-500" />,
  'freight-forwarding': <Ship className="w-5 h-5 text-amber-500" />,
  'land-transportation': <Truck className="w-5 h-5 text-amber-500" />,
  'air-freight': <Plane className="w-5 h-5 text-amber-500" />,
  'vehicle-clearing-roro': <Truck className="w-5 h-5 text-amber-500" />,
  'warehousing-storage': <Boxes className="w-5 h-5 text-amber-500" />
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Pick top 6 services for a clean, concise overview
  const featuredServices = SERVICES_DATA.slice(0, 6);

  return (
    <div className="flex-1">
      <SeoHead
        title="RIMI TRANSPORT AND ALLIED LIMITED | Reliable Clearing & Forwarding Solutions"
        description="Licensed Nigeria Customs Service clearing agency in Apapa, Lagos. Specializing in fast-track customs brokerage, ocean and air freight forwarding, and insured inland haulage."
        path="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "LogisticsService",
          "name": COMPANY_DETAILS.name,
          "alternateName": COMPANY_DETAILS.shortName,
          "telephone": COMPANY_DETAILS.phoneRaw,
          "email": COMPANY_DETAILS.email,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "11A Pelewura Way",
            "addressLocality": "Apapa",
            "addressRegion": "Lagos State",
            "addressCountry": "NG"
          },
          "description": COMPANY_DETAILS.subHeadline
        }}
      />

      {/* 1. Hero Section */}
      <Hero
        onRequestQuote={() => navigate('/contact')}
        onTrackShipment={(id) => navigate(id ? `/track?id=${encodeURIComponent(id)}` : '/track')}
        onExploreServices={() => navigate('/services')}
      />

      {/* 2. Verified Trust & Credentials Strip */}
      <TrustStrip onRequestQuote={() => navigate('/contact')} />

      {/* 3. Short Services Overview */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-2">
                <span>CORE CAPABILITIES</span>
              </div>
              <span className="section-accent-line" />
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mt-3">
                Our Key Clearing & Forwarding Services
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-[65ch]">
                End-to-end customs brokerage, maritime freight, and heavy haulage coordinated directly from our Apapa headquarters.
              </p>
            </div>

            <Link
              to="/services"
              className="btn-interactive inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors self-start md:self-auto shrink-0 shadow-sm"
            >
              <span>Explore All 10 Services</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>

          {/* Featured Services Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service, idx) => (
              <div
                key={service.id}
                className="reveal-on-scroll bg-slate-50 border border-slate-200/90 rounded-2xl p-6 shadow-subtle hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/12 border border-amber-500/25 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                      {TOP_SERVICE_ICONS[service.id] || <ShieldCheck className="w-5 h-5 text-amber-500" />}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <Link
                      to={`/services/${service.id}`}
                      className="text-lg font-bold text-slate-900 font-display group-hover:text-amber-600 transition-colors block"
                    >
                      {service.title}
                    </Link>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Release: {service.turnaroundTime}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <Link
                    to={`/services/${service.id}`}
                    className="text-xs font-bold text-slate-800 hover:text-amber-600 flex items-center gap-1 transition-colors"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3 h-3 text-amber-500" />
                  </Link>

                  <Link
                    to={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-800 bg-amber-100/70 hover:bg-amber-100 px-2.5 py-1 rounded-md transition-colors"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us Highlights */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.08),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <span>WHY PARTNER WITH US</span>
              </div>
              <span className="section-accent-line" />
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-3">
                Built on Integrity, Speed & Regulatory Precision
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-[65ch]">
                Eliminating port demurrage, streamlining PAAR declarations, and guaranteeing safe cargo handover.
              </p>
            </div>

            <Link
              to="/why-choose-us"
              className="btn-interactive inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg border border-slate-700 transition-colors self-start md:self-auto shrink-0"
            >
              <span>Full Why Choose Us Page</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-xl font-bold font-display text-white">100%</div>
              <h3 className="text-sm font-bold text-amber-400">Licensed NCS Agency</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fully authorized customs brokerage operating across Apapa, Tin Can, PTML, and airport commands.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-xl font-bold font-display text-white">48 – 72h</div>
              <h3 className="text-sm font-bold text-amber-400">Rapid Terminal Release</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pre-berthing documentation audits that prevent costly shipping line container demurrage.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div className="text-xl font-bold font-display text-white">Zero</div>
              <h3 className="text-sm font-bold text-amber-400">Hidden Fees Guarantee</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Transparent itemized quotations detailing statutory customs duties, terminal fees, and haulage.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Headphones className="w-5 h-5" />
              </div>
              <div className="text-xl font-bold font-display text-white">24/7</div>
              <h3 className="text-sm font-bold text-amber-400">Dedicated Client Support</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct phone and WhatsApp access to your assigned clearance officer in Apapa at all times.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Key Operational Stats Row */}
      <StatsSection onRequestQuote={() => navigate('/contact')} />

    </div>
  );
};
