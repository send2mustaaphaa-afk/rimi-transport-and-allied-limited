import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { PORT_CORRIDORS, COMPANY_DETAILS } from '../data/companyData';
import {
  Anchor,
  Ship,
  Plane,
  Truck,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Compass,
  Boxes,
  Navigation
} from 'lucide-react';

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

import { SeoHead } from '../components/SeoHead';

export const PortsPage: React.FC = () => {
  return (
    <div className="flex-1">
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
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="reveal-on-scroll max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-2">
              <span>NIGERIAN MARITIME CORRIDORS</span>
            </div>
            <span className="section-accent-line" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight text-balance mt-3">
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
                  className="reveal-on-scroll bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-subtle hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200 uppercase tracking-wider">
                        {port.category}
                      </span>
                    </div>

                    {/* Port Name */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-display">
                        {port.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{port.distanceFromHQ}</span>
                      </div>
                    </div>

                    {/* Terminals Handled */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Terminals & Operators:
                      </span>
                      <p className="font-medium text-slate-800">{port.terminals}</p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
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
                            className="text-[11px] font-medium bg-slate-200/70 text-slate-700 px-2.5 py-0.5 rounded-md"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Customs Command Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-1.5">
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
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.08),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
          
          <div className="reveal-on-scroll max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <span>INLAND HAULAGE ARTERIES</span>
            </div>
            <span className="section-accent-line" />
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance mt-3">
              Nationwide Delivery Corridors from Apapa Port Gates
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-[65ch]">
              Once customs release is completed, our bonded haulage fleet coordinates direct delivery across every commercial zone in Nigeria under Goods-in-Transit (GIT) insurance coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Corridor 1 */}
            <div className="reveal-on-scroll bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                <Truck className="w-5 h-5 text-amber-500" />
                <span>South-West Industrial Hubs</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct evacuation to Ikeja, Oshodi-Isolo, Agbara Industrial Estate, Sagamu Interchange, Epe Free Zone, and Ibadan manufacturing plants.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
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
            <div className="reveal-on-scroll bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                <Navigation className="w-5 h-5 text-amber-500" />
                <span>Northern Commercial Corridor</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Interstate heavy haulage connecting Lagos ports to Abuja, Kaduna, Kano, Jos, Sokoto, and Maiduguri commercial distribution networks.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
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
            <div className="reveal-on-scroll bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                <Compass className="w-5 h-5 text-amber-500" />
                <span>Eastern & Niger Delta Trade Centers</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reliable freight lines to Benin City, Asaba, Onitsha Main Market, Nnewi, Aba industrial cluster, and Port Harcourt commercial terminals.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
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
