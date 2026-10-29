import React, { useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { TrackingSection } from '../components/TrackingSection';
import { SeoHead } from '../components/SeoHead';
import { TrackingShipment, COMPANY_DETAILS } from '../data/companyData';
import { ArrowRight, ShieldCheck, Clock, Search } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

interface TrackingPageProps {
  shipments: TrackingShipment[];
  activeTrackingId: string;
}

export const TrackingPage: React.FC<TrackingPageProps> = ({
  shipments,
  activeTrackingId
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get('id') || activeTrackingId || '';

  return (
    <div className="flex-1">
      <SeoHead
        title="Track Consignment | Real-Time Clearance & Transit Status"
        description="Track your container or air consignment cleared through Apapa, Tin Can, or MMIA. Monitor discharge, PAAR verification, customs release, and door-to-door delivery."
        path="/track"
      />

      {/* 1. Page Header */}
      <PageHeader
        badge="REAL-TIME MILESTONE MONITORING"
        title="Track Your Consignment & Customs Clearance Status"
        description="Verify real-time container discharge, PAAR status, customs joint physical examination, duty settlement, and inland transit dispatch."
        currentPage="Track Consignment"
      />

      {/* 2. Full Tracking Component */}
      <TrackingSection
        initialTrackingId={queryId}
        onRequestQuote={() => navigate('/contact')}
        shipmentsList={shipments}
      />

      {/* 3. Tracking Verification Info Strip */}
      <section className="py-14 bg-slate-900 border-t border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                Universal Consignment Lookup
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter your RIMI reference number (e.g. <code>RTL-APP-8921</code>), Bill of Lading (B/L), or container number to view latest terminal status.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                Demurrage Clock Control
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We track free days and vessel discharge schedules daily so you stay informed before terminal storage or demurrage charges accrue.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                Direct WhatsApp Status Updates
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Need manual documentation assistance? Our clearing officers at 11A Pelewura Way, Apapa provide direct updates via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
