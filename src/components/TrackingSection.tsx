import React, { useState, useEffect } from 'react';
import { DEMO_TRACKING_SHIPMENTS, TrackingShipment, COMPANY_DETAILS } from '../data/companyData';
import {
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Ship,
  Plane,
  Truck,
  FileCheck,
  AlertCircle,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

interface TrackingSectionProps {
  initialTrackingId?: string;
  onRequestQuote: () => void;
  shipmentsList?: TrackingShipment[];
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({
  initialTrackingId = '',
  onRequestQuote,
  shipmentsList = DEMO_TRACKING_SHIPMENTS
}) => {
  const [searchQuery, setSearchQuery] = useState(initialTrackingId || 'RTL-APP-8921');
  const [currentShipment, setCurrentShipment] = useState<TrackingShipment | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (initialTrackingId) {
      setSearchQuery(initialTrackingId);
      performSearch(initialTrackingId);
    } else {
      // Default to first demo consignment
      performSearch('RTL-APP-8921');
    }
  }, [initialTrackingId, shipmentsList]);

  const performSearch = (query: string) => {
    setIsSearching(true);
    setHasSearched(true);

    setTimeout(() => {
      const cleaned = query.trim().toUpperCase();
      const found = shipmentsList.find(
        s => s.trackingId.toUpperCase() === cleaned || s.containerNumber?.toUpperCase().includes(cleaned)
      );

      if (found) {
        setCurrentShipment(found);
      } else if (cleaned.startsWith('RTL-QT-') || cleaned.startsWith('RTL-')) {
        // Dynamic simulated quote or active consignment
        setCurrentShipment({
          trackingId: cleaned,
          consignee: "Valued Consignee / Merchant",
          origin: "International Origin Port",
          destination: "Apapa Port, Lagos, Nigeria",
          serviceType: "Full Customs Clearance & Freight Forwarding",
          status: "Documentation",
          eta: "Under Review by Operations Desk",
          vesselOrFlight: "Pending Vessel Assignment",
          milestones: [
            { stage: "Quote & Document Pre-Assessment", location: "11A Pelewura Way, Apapa", timestamp: "Today, Just Now", completed: true, current: true, notes: "Logistics coordinator assigned to inspect documents" },
            { stage: "Customs Duty Assessment & PAAR", location: "NCS Portal", timestamp: "Pending Verification", completed: false, current: false },
            { stage: "Port Terminal Berthing & Discharge", location: "Apapa / Tin Can Port", timestamp: "Pending Vessel ETA", completed: false, current: false },
            { stage: "Customs Physical Examination", location: "Port Enforcement Gate", timestamp: "Scheduled upon discharge", completed: false, current: false },
            { stage: "Final Inland Delivery", location: "Destination Warehouse", timestamp: "Pending", completed: false, current: false }
          ]
        });
      } else {
        setCurrentShipment(null);
      }
      setIsSearching(false);
    }, 350);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const getStatusColor = (status: TrackingShipment['status']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-300';
      case 'Terminal Cleared':
        return 'bg-blue-50 text-blue-700 border-blue-300';
      case 'Customs Examination':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'In Transit':
        return 'bg-indigo-50 text-indigo-700 border-indigo-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <section id="tracking" className="py-20 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
            Cargo & Customs Milestone Tracker
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
            Track Consignment Status & Port Clearance Progress
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Monitor real-time updates for shipments clearing through Apapa Port, Tin Can Island, and Murtala Muhammed Airport.
          </p>
        </div>

        {/* Search Bar Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Consignment No (e.g., RTL-APP-8921, RTL-AIR-1093, RTL-TIN-4402)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSearching ? 'Searching...' : 'Track Cargo'}
            </button>
          </form>

          {/* Quick Demo Filter Buttons */}
          <div className="flex items-center gap-2 mt-4 text-xs text-slate-500 flex-wrap">
            <span className="font-semibold text-slate-700">Quick live demo consignments:</span>
            {DEMO_TRACKING_SHIPMENTS.map((s) => (
              <button
                key={s.trackingId}
                type="button"
                onClick={() => {
                  setSearchQuery(s.trackingId);
                  performSearch(s.trackingId);
                }}
                className={`px-2.5 py-1 rounded-md border text-xs font-mono transition-colors cursor-pointer ${
                  searchQuery === s.trackingId
                    ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {s.trackingId} ({s.status})
              </button>
            ))}
          </div>
        </div>

        {/* Tracking Results Area */}
        {currentShipment ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
            
            {/* Result Top Summary Banner */}
            <div className="bg-slate-900 text-white p-6 sm:p-7">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-xl sm:text-2xl font-black text-amber-400">
                      {currentShipment.trackingId}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(currentShipment.status)}`}>
                      {currentShipment.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    {currentShipment.serviceType} · Consignee: <strong className="text-white">{currentShipment.consignee}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-6 text-xs text-slate-300 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Vessel / Flight</span>
                    <span className="font-semibold text-white">{currentShipment.vesselOrFlight}</span>
                  </div>
                  {currentShipment.containerNumber && (
                    <div>
                      <span className="text-slate-400 block text-[11px]">Container / AWB</span>
                      <span className="font-mono font-semibold text-amber-400">{currentShipment.containerNumber}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-400 block text-[11px]">Estimated Arrival</span>
                    <span className="font-semibold text-emerald-400">{currentShipment.eta}</span>
                  </div>
                </div>
              </div>

              {/* Origin to Destination Route */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Origin Port</span>
                    <span className="font-semibold text-white">{currentShipment.origin}</span>
                  </div>
                </div>

                <div className="flex-1 max-w-xs border-b border-dashed border-slate-700 hidden sm:block relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 text-[10px] text-amber-400 font-mono">
                    APAPA CORRIDOR
                  </div>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Destination</span>
                    <span className="font-semibold text-white">{currentShipment.destination}</span>
                  </div>
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
              </div>
            </div>

            {/* Milestones Flow */}
            <div className="p-6 sm:p-8">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">
                Customs Clearance & Transit Lifecycle
              </h4>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {currentShipment.milestones.map((milestone, idx) => (
                  <div key={idx} className="relative">
                    {/* Node indicator */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center ${
                        milestone.completed
                          ? 'bg-emerald-600 text-white'
                          : milestone.current
                          ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {milestone.completed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span className="text-[11px] font-bold">{idx + 1}</span>
                      )}
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-slate-900">
                            {milestone.stage}
                          </h5>
                          {milestone.current && (
                            <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-sm">
                              Active Stage
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-slate-500 tabular-nums">
                          {milestone.timestamp}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{milestone.location}</span>
                      </div>

                      {milestone.notes && (
                        <p className="mt-2 text-xs bg-white border border-slate-200 rounded-lg p-2.5 text-slate-700 leading-normal">
                          <strong>Update:</strong> {milestone.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action row */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Need expedited assistance with this consignment? Our Apapa clearing desk is on standby.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={COMPANY_DETAILS.whatsappMessageUrl(
                      `Hello RIMI Transport, I would like to inquire regarding tracking ID: ${currentShipment.trackingId}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                  <button
                    onClick={onRequestQuote}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Book New Cargo
                  </button>
                </div>
              </div>
            </div>

          </div>
        ) : hasSearched ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Consignment Reference "{searchQuery}" Not Found
            </h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Please check your tracking number or contact our Apapa operations desk at <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="text-amber-600 font-bold underline">{COMPANY_DETAILS.phone}</a> or <a href={COMPANY_DETAILS.whatsappUrl} className="text-emerald-600 font-bold underline">WhatsApp ({COMPANY_DETAILS.whatsappNumber})</a> for immediate verification.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('RTL-APP-8921');
                  performSearch('RTL-APP-8921');
                }}
                className="text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors"
              >
                Load Sample Tracking ID (RTL-APP-8921)
              </button>
            </div>
          </div>
        ) : null}

      </div>
    </section>
  );
};
