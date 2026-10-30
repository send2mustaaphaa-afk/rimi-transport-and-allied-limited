import React from 'react';
import { COMPANY_DETAILS, PORT_CORRIDORS } from '../data/companyData';
import { Target, Compass, Shield, MapPin } from 'lucide-react';
import terminalHubImg from '../assets/images/trucking_terminal_hub_1793361802966.jpg';

interface AboutSectionProps {
  onRequestQuote: () => void;
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onRequestQuote
}) => {
  return (
    <section id="about" className="py-20 sm:py-24 bg-white border-b border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="text-xs font-bold text-[#0B192C] uppercase tracking-widest flex items-center gap-2">
            <span>ABOUT US</span>
          </div>
          <div className="w-12 h-0.5 bg-[#0B192C] mt-2 mb-3" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
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
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-7 sm:p-8 space-y-4 shadow-[0_4px_20px_-2px_rgba(11,25,44,0.04)]">
              <h3 className="text-lg font-bold text-[#0B192C] flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0B192C]"></span>
                Company Background & Operations
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed max-w-[65ch]">
                Founded to eliminate persistent supply chain bottlenecks in West African trade, {COMPANY_DETAILS.name} provides institutional importers, exporters, and manufacturers with swift, transparent, and compliant logistics services.
              </p>

              <p className="text-sm text-slate-600 leading-relaxed max-w-[65ch]">
                Operating directly within the heart of Apapa's maritime zone, our clearing specialists maintain direct operational relationships with the <strong className="font-semibold text-slate-900 bg-slate-200/60 px-1.5 py-0.5 rounded">Nigeria Customs Service (NCS)</strong>, the <strong className="font-semibold text-slate-900 bg-slate-200/60 px-1.5 py-0.5 rounded">Nigerian Ports Authority (NPA)</strong>, and national regulatory bodies including <strong className="font-semibold text-slate-900 bg-slate-200/60 px-1.5 py-0.5 rounded">NAFDAC</strong> and <strong className="font-semibold text-slate-900 bg-slate-200/60 px-1.5 py-0.5 rounded">SON</strong>.
              </p>

              {/* Verified Credentials Strip */}
              <div className="pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-base font-extrabold text-[#0B192C] block">NCS</span>
                  <span className="text-[10px] text-slate-500 font-medium">Licensed Agent</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-base font-extrabold text-[#0B192C] block">NPA</span>
                  <span className="text-[10px] text-slate-500 font-medium">Terminal Corridors</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-base font-extrabold text-[#0B192C] block">NAFDAC</span>
                  <span className="text-[10px] text-slate-500 font-medium">Reg. Compliance</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-base font-extrabold text-[#0B192C] block">SON</span>
                  <span className="text-[10px] text-slate-500 font-medium">Standard Release</span>
                </div>
              </div>
            </div>

            {/* Strategic Location Card */}
            <div className="border-l-4 border-[#0B192C] bg-slate-50 rounded-r-xl p-5 border border-y-slate-200/80 border-r-slate-200/80 shadow-xs">
              <h4 className="text-sm font-bold text-[#0B192C]">
                Strategic Apapa Advantage
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-[65ch] leading-relaxed">
                Located at <strong>11A Pelewura Way, Apapa</strong>, our physical proximity to the Apapa Port and Tin Can Island gates allows our agents to conduct physical customs examinations, resolve query disputes, and inspect cargo minutes after vessel discharge.
              </p>
            </div>
          </div>

          {/* Right Image & Trust Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-slate-900">
              <img
                src={terminalHubImg}
                alt="RIMI TRANSPORT Modern Corporate Trucking & Container Logistics Terminal"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
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
          <div className="bg-[#0B192C] text-white rounded-2xl p-8 shadow-[0_4px_20px_-2px_rgba(11,25,44,0.08)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <Target className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Our Mission
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-[65ch]">
                To deliver world-class clearing, forwarding, and cargo haulage solutions by combining deep regulatory expertise, fast processing turnaround, and transparent communication, ensuring our clients’ cargo arrives safely and on schedule.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-[#0B192C] text-white rounded-2xl p-8 shadow-[0_4px_20px_-2px_rgba(11,25,44,0.08)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <Compass className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Our Vision
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-[65ch]">
                To be the premier clearing and forwarding logistics benchmark in Nigeria and the West African region, recognized for absolute integrity, rapid port clearance, and seamless multimodal cargo transit.
              </p>
            </div>
          </div>

          {/* Commitment to Customers */}
          <div className="bg-[#0B192C] text-white rounded-2xl p-8 shadow-[0_4px_20px_-2px_rgba(11,25,44,0.08)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <Shield className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Commitment to Customers
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-[65ch]">
                We treat every consignment as mission-critical. We guarantee complete tariff honesty, zero avoidable demurrage costs, active 24/7 shipment milestone tracking, and round-the-clock logistics support from our Apapa desk.
              </p>
            </div>
          </div>

        </div>

        {/* Port Corridors We Serve */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-7 sm:p-9 shadow-[0_4px_20px_-2px_rgba(11,25,44,0.04)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Key Maritime Ports & Air Cargo Corridors We Manage
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Our operations span all major commercial gateways across Lagos and Nigeria.
              </p>
            </div>
            <button
              onClick={onRequestQuote}
              className="text-xs font-bold text-white bg-[#0B192C] hover:bg-[#152a45] px-5 py-2.5 rounded-lg whitespace-nowrap self-start sm:self-auto cursor-pointer shadow-sm transition-colors"
            >
              Request a Quote
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORT_CORRIDORS.map((corridor, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_2px_12px_-2px_rgba(11,25,44,0.04)] hover:shadow-[0_8px_24px_-4px_rgba(11,25,44,0.08)] hover:border-[#0B192C]/30 flex flex-col justify-between transition-all duration-200 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0B192C]/5 border border-[#0B192C]/10 text-[#0B192C] flex items-center justify-center shrink-0 group-hover:bg-[#0B192C] group-hover:text-white transition-colors">
                      <MapPin className="w-4 h-4 stroke-[2]" />
                    </div>
                    <span className="font-bold text-xs text-slate-900 group-hover:text-[#0B192C] transition-colors">{corridor.name}</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#0B192C]">
                    {corridor.distance}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
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
