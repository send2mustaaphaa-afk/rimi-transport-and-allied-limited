import React from 'react';
import { PageHeader } from '../components/PageHeader';
import {
  Anchor,
  Ship,
  Plane,
  Truck,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Boxes,
  Navigation
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';

const EXTENDED_PORTS_DATA = [
  {
    id: 'apapa-port',
    name: 'Lagos Port Complex (Apapa Quays)',
    category: 'Maritime Seaport',
    icon: Anchor,
    distanceFromHQ: '1.2 km from Apapa Office (5 Mins)',
    terminals: 'APM Terminals (APMT), ENL Consortium, Greenview Development (GDNL)',
    description: 'Nigeria’s premier and busiest seaport. Handling over 50% of the nation’s containerized imports. Our office at 11A Pelewura Way sits directly at the port gates for immediate container positioning, customs examination, and gate pass processing.',
    capabilities: ['FCL & LCL Containerized Cargo', 'Bulk Raw Materials & Agrochemicals', 'Project Plant Machinery', 'Export Consolidation'],
    customsCommand: 'Nigeria Customs Service, Apapa Area 1 Command'
  },
  {
    id: 'tin-can-port',
    name: 'Tin Can Island Port Complex',
    category: 'Maritime Seaport & Ro-Ro',
    icon: Ship,
    distanceFromHQ: '3.5 km via Liverpool / Port Access Road',
    terminals: 'TICT, Ports & Cargo Handling (SIFAX), Five Star Logistics, PTML Terminal',
    description: 'The second largest maritime gateway in Nigeria and the primary hub for specialized Roll-on/Roll-off (Ro-Ro) automobile discharge, industrial raw materials, and breakbulk machinery.',
    capabilities: ['Ro-Ro Automobiles & Trucks', 'Heavy Earthmoving Equipment', 'Dry Container Cargo', 'Bonded Barge Transfers'],
    customsCommand: 'Nigeria Customs Service, Tin Can Island Command & PTML Command'
  },
  {
    id: 'mmia-air-cargo',
    name: 'Murtala Muhammed Airport Cargo Terminal (MMIA)',
    category: 'Air Freight Cargo',
    icon: Plane,
    distanceFromHQ: '22 km via Apapa-Oshodi Expressway',
    terminals: 'SAHCO Bonded Cargo Shed, NAHCO Aviance Export & Import Sheds',
    description: 'Dedicated air freight logistics wing managing time-critical spare parts, temperature-controlled pharmaceutical shipments, high-value electronics, and rapid document clearing.',
    capabilities: ['Same-Day / 24h Customs Air Release', 'Temperature-Sensitive Cold Chain', 'Valuable & Courier Freight', 'IATA Regulated Cargo'],
    customsCommand: 'Nigeria Customs Service, MMIA Cargo Area Command'
  },
  {
    id: 'lekki-deep-sea',
    name: 'Lekki Deep Sea Port',
    category: 'Deep Sea Transshipment',
    icon: Compass,
    distanceFromHQ: 'Direct Corridor via Lekki-Epe Expressway',
    terminals: 'Lekki Freeport Automated Container Terminal (CMA CGM / Lekki Port)',
    description: 'Nigeria’s newest automated deep-sea maritime facility capable of berthing post-panamax vessels up to 18,000 TEUs. Providing ultra-modern automated clearance and bonded barge links to Lagos and the hinterland.',
    capabilities: ['Ultra-Large Container Vessels', 'Automated Quayside Cranes', 'Intermodal Barge Evacuation', 'Bonded FTZ Clearances'],
    customsCommand: 'Nigeria Customs Service, Lekki Free Trade Zone Command'
  },
  {
    id: 'onne-port',
    name: 'Onne Port & Eastern Maritime Hub',
    category: 'Eastern Maritime Gateway',
    icon: Anchor,
    distanceFromHQ: 'Dedicated Eastern Operations Desk',
    terminals: 'Federal Ocean Terminal (FOT) & Federal Lighter Terminal (FLT), Rivers State',
    description: 'Strategic maritime terminal for the South-South and South-East commercial regions, specialized in oil and gas logistics, heavy industrial project components, and regional distribution.',
    capabilities: ['Heavy Offshore Project Freight', 'Oilfield Pipe & Tubular Equipment', 'South-East Commercial Containers', 'Direct Haulage to Aba/Onitsha'],
    customsCommand: 'Nigeria Customs Service, Area II Command, Onne Port'
  },
  {
    id: 'bonded-icds',
    name: 'Bonded Inland Container Depots (ICDs) & Off-Docks',
    category: 'Dry Port & Satellite Terminals',
    icon: Boxes,
    distanceFromHQ: 'Direct Network Integration',
    terminals: 'Lilypond Container Depot, Kirikiri Lighter Terminals (KLT), Lilypond Export Hub',
    description: 'Network of bonded satellite off-dock yards designed to decongest main port quays. Cargo is transferred under customs bond via barge or escorted convoy for expedited deconsolidation.',
    capabilities: ['Bonded Barge Off-Loading', 'De-stuffing & Cross-Docking', 'Export Terminal Processing', 'Safe Buffer Storage'],
    customsCommand: 'NCS Kirikiri / Lilypond Customs Commands'
  }
];

export const PortsPage: React.FC = () => {
  return (
    <div className="flex-1 font-sans">
      <SeoHead
        title="Key Maritime Ports & Air Cargo Corridors We Manage"
        description="Daily on-site operations at Lagos Port Complex Apapa, Tin Can Island, PTML Ro-Ro Terminal, Lekki Deep Sea Port, Onne, and MMIA Air Cargo. Fast release & haulage."
        path="/ports"
      />

      {/* 1. Page Header */}
      <PageHeader
        badge="STRATEGIC MARITIME ACCESS"
        title="Key Maritime Ports & Air Cargo Corridors We Manage"
        description="With our operational headquarters situated at 11A Pelewura Way, Apapa, we maintain direct daily presence across all major Nigerian seaports, air cargo terminals, and bonded container corridors."
        currentPage="Ports & Coverage"
      />

      {/* 2. Key Ports & Terminals Grid */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-bold text-[#0B192C] uppercase tracking-widest flex items-center gap-2">
              <span>NIGERIAN MARITIME CORRIDORS</span>
            </div>
            <div className="w-12 h-0.5 bg-[#0B192C] mt-2 mb-3" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Direct On-Site Operations at Every Major Gateway
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[65ch]">
              We eliminate intermediaries. Our licensed customs officers and terminal tally clerks are physically present inside port aprons, examination bays, and customs commands daily.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {EXTENDED_PORTS_DATA.map((port) => {
              const IconComponent = port.icon;
              return (
                <div
                  key={port.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-7 shadow-[0_4px_20px_-2px_rgba(11,25,44,0.05)] hover:shadow-[0_12px_32px_-4px_rgba(11,25,44,0.1)] hover:border-[#0B192C]/30 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#0B192C]/5 border border-[#0B192C]/10 flex items-center justify-center text-[#0B192C] shrink-0 group-hover:bg-[#0B192C] group-hover:text-white transition-colors duration-200">
                        <IconComponent className="w-6 h-6 stroke-[2]" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {port.category}
                      </span>
                    </div>

                    {/* Port Name */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0B192C] transition-colors">
                        {port.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#0B192C] font-semibold mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{port.distanceFromHQ}</span>
                      </div>
                    </div>

                    {/* Terminals Handled */}
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Terminals & Operators:
                      </span>
                      <p className="font-medium text-slate-800">{port.terminals}</p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {port.description}
                    </p>

                    {/* Capabilities Tags */}
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Core Cargo Capabilities:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {port.capabilities.map((cap, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Customs Command Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{port.customsCommand}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Nationwide Transit Corridors & Haulage Map */}
      <section className="py-20 sm:py-24 bg-[#0B192C] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <span>INLAND HAULAGE ARTERIES</span>
            </div>
            <div className="w-12 h-0.5 bg-blue-400 mt-2 mb-3" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Nationwide Delivery Corridors from Apapa Port Gates
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-[65ch]">
              Once customs release is completed, our bonded haulage fleet coordinates direct delivery across every commercial zone in Nigeria under Goods-in-Transit (GIT) insurance coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Corridor 1 */}
            <div className="bg-[#112239] border border-white/10 rounded-2xl p-7 space-y-4 shadow-md hover:border-white/20 transition-all duration-200">
              <div className="flex items-center gap-2.5 text-white font-bold text-base">
                <Truck className="w-5 h-5 text-blue-300" />
                <span>South-West Industrial Hubs</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct evacuation to Ikeja, Oshodi-Isolo, Agbara Industrial Estate, Sagamu Interchange, Epe Free Zone, and Ibadan manufacturing plants.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Transit Time: Same Day – 24 Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Flatbed trailers & enclosed container trucks</span>
                </div>
              </div>
            </div>

            {/* Corridor 2 */}
            <div className="bg-[#112239] border border-white/10 rounded-2xl p-7 space-y-4 shadow-md hover:border-white/20 transition-all duration-200">
              <div className="flex items-center gap-2.5 text-white font-bold text-base">
                <Navigation className="w-5 h-5 text-blue-300" />
                <span>Northern Commercial Corridor</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Interstate heavy haulage connecting Lagos ports to Abuja, Kaduna, Kano, Jos, Sokoto, and Maiduguri commercial distribution networks.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Transit Time: 48 – 72 Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Full telematics GPS tracking & convoy escort</span>
                </div>
              </div>
            </div>

            {/* Corridor 3 */}
            <div className="bg-[#112239] border border-white/10 rounded-2xl p-7 space-y-4 shadow-md hover:border-white/20 transition-all duration-200">
              <div className="flex items-center gap-2.5 text-white font-bold text-base">
                <Compass className="w-5 h-5 text-blue-300" />
                <span>Eastern & Niger Delta Trade Centers</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reliable freight lines to Benin City, Asaba, Onitsha Main Market, Nnewi, Aba industrial cluster, and Port Harcourt commercial terminals.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Transit Time: 36 – 48 Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Heavy project haulage & 40-ton skeleton chassis</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
