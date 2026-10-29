import React from 'react';
import { ShieldCheck, MapPin, Clock, Anchor, Truck } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';

interface TrustStripProps {
  onRequestQuote: () => void;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ onRequestQuote }) => {
  const credentials = [
    {
      icon: ShieldCheck,
      title: 'Licensed NCS Clearing Agency',
      description: 'Authorized Nigeria Customs broker'
    },
    {
      icon: MapPin,
      title: '11A Pelewura Way, Apapa',
      description: '5 mins to Lagos Port Complex & Tin Can'
    },
    {
      icon: Clock,
      title: '24/7 Milestone Tracking',
      description: 'Real-time updates via Web & WhatsApp'
    },
    {
      icon: Anchor,
      title: 'NPA Terminal Access',
      description: 'APMT, Tin Can Island, PTML & Bonded Yards'
    },
    {
      icon: Truck,
      title: 'GIT Insured Haulage',
      description: 'Goods-in-Transit protected nationwide fleet'
    }
  ];

  return (
    <section className="bg-slate-900 border-b border-slate-800 py-6 sm:py-8 text-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="reveal-group grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className="reveal-on-scroll bg-slate-950/80 hover:bg-slate-950 border border-slate-800/90 hover:border-amber-500/40 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-200 group premium-card-lift"
              >
                <div className="flex items-start gap-3">
                  <div className="card-icon-square w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors leading-tight">
                      {cred.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {cred.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
