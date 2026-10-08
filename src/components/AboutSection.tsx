import React from 'react';
import { COMPANY_DETAILS, PORT_CORRIDORS } from '../data/companyData';
import { Target, Compass, Shield, Award, MapPin, CheckCircle } from 'lucide-react';
import warehouseHubImg from '../assets/images/lux_three_containers_arch_1791329814257.jpg';

interface AboutSectionProps {
  onRequestQuote: () => void;
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onRequestQuote,
  onContactClick
}) => {
  return (
    <section id="about" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
            About Our Company
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
            Your Trusted Clearing, Forwarding & Maritime Logistics Partner in Nigeria
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            {COMPANY_DETAILS.name} is a premier indigenous freight forwarding, customs clearance, and intermodal transport company headquarted at 11A Pelewura Way, Apapa, Lagos. We bridge international trade corridors with Nigerian commercial centers through precision logistics, rapid customs clearance, and dependable haulage.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Text Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                Company Background & Operations
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Founded to eliminate persistent supply chain bottlenecks in West African trade, {COMPANY_DETAILS.name} provides institutional importers, exporters, manufacturers, and trade merchants with swift, transparent, and compliant logistics services.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Operating directly within the heart of Apapa's maritime zone, our clearing specialists maintain direct operational relationships with the Nigeria Customs Service (NCS), Nigerian Ports Authority (NPA), standard shipping lines, terminal operators, and regulatory agencies including NAFDAC and SON.
              </p>

              <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Licensed NCS Agent</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Apapa Port Corridor Base</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dedicated Fleet Haulage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pre-Arrival PAAR Clearing</span>
                </div>
              </div>
            </div>

            {/* Strategic Location Card */}
            <div className="border-l-4 border-amber-500 pl-4 py-1">
              <h4 className="text-sm font-bold text-slate-900">
                Strategic Apapa Advantage
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Located at <strong>11A Pelewura Way, Apapa</strong>, our physical proximity to the Apapa Port and Tin Can Island gates allows our agents to conduct physical customs examinations, resolve query disputes, and inspect cargo minutes after vessel discharge.
              </p>
            </div>
          </div>

          {/* Right Image & Trust Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
              <img
                src={warehouseHubImg}
                alt="RIMI TRANSPORT AND ALLIED LIMITED Logistics and Warehousing Center"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Apapa Operational Headquarters
                </span>
                <p className="text-sm font-semibold">
                  11A Pelewura Way, Apapa, Lagos State, Nigeria
                </p>
                <p className="text-xs text-slate-300">
                  Direct corridor access to APMT, Tin Can, PTML, and bonded off-dock terminals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision & Commitment Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Mission */}
          <div className="bg-slate-900 text-white rounded-xl p-7 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              Our Mission
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              To deliver world-class clearing, forwarding, and cargo haulage solutions by combining deep regulatory expertise, fast processing turnaround, and transparent communication, ensuring our clients’ cargo arrives safely and on schedule.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-slate-900 text-white rounded-xl p-7 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              Our Vision
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              To be the premier clearing and forwarding logistics benchmark in Nigeria and the West African region, recognized for absolute integrity, rapid port clearance, and seamless multimodal cargo transit.
            </p>
          </div>

          {/* Commitment to Customers */}
          <div className="bg-slate-900 text-white rounded-xl p-7 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              Commitment to Customers
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We treat every consignment as mission-critical. We guarantee complete tariff honesty, zero avoidable demurrage costs, active 24/7 shipment milestone tracking, and round-the-clock logistics support from our Apapa desk.
            </p>
          </div>

        </div>

        {/* Port Corridors We Serve */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Key Maritime Ports & Air Cargo Corridors We Manage
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Our operations span all major commercial gateways across Lagos and Nigeria.
              </p>
            </div>
            <button
              onClick={onRequestQuote}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-100 hover:bg-amber-200 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
            >
              Inquire Port Clearance Rate →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORT_CORRIDORS.map((corridor, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{corridor.name}</span>
                </div>
                <div className="text-[11px] font-semibold text-amber-600">
                  {corridor.distance}
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  {corridor.description}
                </p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  {corridor.capabilities}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
