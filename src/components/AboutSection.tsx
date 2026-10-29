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
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header with Amber Label & Accent Line */}
        <div className="reveal-on-scroll max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-2">
            <span>ABOUT US</span>
          </div>
          <span className="section-accent-line" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight text-balance mt-3">
            Your Trusted Clearing, Forwarding & Maritime Logistics Partner in Nigeria
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-[65ch]">
            {COMPANY_DETAILS.name} is a premier indigenous freight forwarding, customs clearance, and intermodal transport company headquartered at 11A Pelewura Way, Apapa, Lagos. We bridge international trade corridors with Nigerian commercial centers through precision logistics, rapid customs clearance, and dependable haulage.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          
          {/* Left Text Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="reveal-on-scroll bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-4 shadow-subtle">
              <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                Company Background & Operations
              </h3>

              {/* Short Block 1 */}
              <p className="text-sm text-slate-600 leading-relaxed max-w-[65ch]">
                Founded to eliminate persistent supply chain bottlenecks in West African trade, {COMPANY_DETAILS.name} provides institutional importers, exporters, and manufacturers with swift, transparent, and compliant logistics services.
              </p>

              {/* Short Block 2 with Highlighted Key Terms */}
              <p className="text-sm text-slate-600 leading-relaxed max-w-[65ch]">
                Operating directly within the heart of Apapa's maritime zone, our clearing specialists maintain direct operational relationships with the <strong className="font-semibold text-slate-900 bg-amber-500/10 px-1.5 py-0.5 rounded text-slate-800">Nigeria Customs Service (NCS)</strong>, the <strong className="font-semibold text-slate-900 bg-amber-500/10 px-1.5 py-0.5 rounded text-slate-800">Nigerian Ports Authority (NPA)</strong>, and national regulatory bodies including <strong className="font-semibold text-slate-900 bg-amber-500/10 px-1.5 py-0.5 rounded text-slate-800">NAFDAC</strong> and <strong className="font-semibold text-slate-900 bg-amber-500/10 px-1.5 py-0.5 rounded text-slate-800">SON</strong>.
              </p>

              {/* Verified Credentials Strip */}
              <div className="pt-3 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-base font-extrabold text-slate-900 font-display block">NCS</span>
                  <span className="text-[10px] text-slate-500 font-medium">Licensed Agent</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-base font-extrabold text-slate-900 font-display block">NPA</span>
                  <span className="text-[10px] text-slate-500 font-medium">Terminal Corridors</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-base font-extrabold text-slate-900 font-display block">NAFDAC</span>
                  <span className="text-[10px] text-slate-500 font-medium">Reg. Compliance</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-base font-extrabold text-slate-900 font-display block">SON</span>
                  <span className="text-[10px] text-slate-500 font-medium">Standard Release</span>
                </div>
              </div>
            </div>

            {/* Strategic Location Card */}
            <div className="reveal-on-scroll border-l-4 border-amber-500 bg-amber-50/50 rounded-r-xl p-4 border border-y-slate-200/80 border-r-slate-200/80">
              <h4 className="text-sm font-bold text-slate-900">
                Strategic Apapa Advantage
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-[65ch]">
                Located at <strong>11A Pelewura Way, Apapa</strong>, our physical proximity to the Apapa Port and Tin Can Island gates allows our agents to conduct physical customs examinations, resolve query disputes, and inspect cargo minutes after vessel discharge.
              </p>
            </div>
          </div>

          {/* Right Image & Trust Badge */}
          <div className="lg:col-span-6 relative reveal-on-scroll">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-card bg-slate-100">
              <img
                src={warehouseHubImg}
                alt="RIMI TRANSPORT AND ALLIED LIMITED Logistics and Warehousing Center"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
              
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

        {/* Mission, Vision & Commitment Pillars (Equal Heights, 16px radius, hover lift, amber-tinted icon) */}
        <div className="reveal-group grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Mission */}
          <div className="reveal-on-scroll group bg-slate-900 text-white rounded-2xl p-7 border border-slate-800 flex flex-col justify-between premium-card-lift">
            <div className="space-y-4">
              <div className="card-icon-square w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Target className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-400 transition-colors">
                Our Mission
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-[65ch]">
                To deliver world-class clearing, forwarding, and cargo haulage solutions by combining deep regulatory expertise, fast processing turnaround, and transparent communication, ensuring our clients’ cargo arrives safely and on schedule.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="reveal-on-scroll group bg-slate-900 text-white rounded-2xl p-7 border border-slate-800 flex flex-col justify-between premium-card-lift">
            <div className="space-y-4">
              <div className="card-icon-square w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-400 transition-colors">
                Our Vision
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-[65ch]">
                To be the premier clearing and forwarding logistics benchmark in Nigeria and the West African region, recognized for absolute integrity, rapid port clearance, and seamless multimodal cargo transit.
              </p>
            </div>
          </div>

          {/* Commitment to Customers */}
          <div className="reveal-on-scroll group bg-slate-900 text-white rounded-2xl p-7 border border-slate-800 flex flex-col justify-between premium-card-lift">
            <div className="space-y-4">
              <div className="card-icon-square w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Shield className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-400 transition-colors">
                Commitment to Customers
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-[65ch]">
                We treat every consignment as mission-critical. We guarantee complete tariff honesty, zero avoidable demurrage costs, active 24/7 shipment milestone tracking, and round-the-clock logistics support from our Apapa desk.
              </p>
            </div>
          </div>

        </div>

        {/* Port Corridors We Serve (Equal Heights, 16px radius, hover lift, amber-tinted icon) */}
        <div className="reveal-on-scroll bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-card">
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
              className="btn-interactive group text-xs font-bold text-slate-950 hover:text-white bg-amber-500 hover:bg-slate-900 px-4 py-2 rounded-xl whitespace-nowrap self-start sm:self-auto cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              Request a Quote
            </button>
          </div>

          <div className="reveal-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORT_CORRIDORS.map((corridor, idx) => (
              <div
                key={idx}
                className="reveal-on-scroll group bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-amber-500/50 flex flex-col justify-between premium-card-lift"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="card-icon-square w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <span className="font-bold text-xs text-slate-900 group-hover:text-amber-600 transition-colors">{corridor.name}</span>
                  </div>
                  <div className="text-[11px] font-bold text-amber-600">
                    {corridor.distance}
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    {corridor.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
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
