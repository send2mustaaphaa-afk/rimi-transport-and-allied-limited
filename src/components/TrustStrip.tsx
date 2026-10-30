import React from 'react';
import { ShieldCheck, MapPin, Clock, Anchor, Truck } from 'lucide-react';

interface TrustStripProps {
  onRequestQuote: () => void;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ onRequestQuote }) => {
  const credentials = [
    {
      icon: ShieldCheck,
      title: 'Licensed NCS Agency',
      description: 'Authorized Nigeria Customs clearing & brokerage'
    },
    {
      icon: MapPin,
      title: '11A Pelewura Way, Apapa',
      description: 'Minutes to Lagos Port Complex & Tin Can Island'
    },
    {
      icon: Clock,
      title: '24/7 Consignment Tracking',
      description: 'Transparent milestone reporting via Web & WhatsApp'
    },
    {
      icon: Anchor,
      title: 'NPA Terminal Corridors',
      description: 'Direct access to APMT, TICT, PTML & Bonded yards'
    },
    {
      icon: Truck,
      title: 'Insured Freight Fleet',
      description: 'Goods-in-Transit covered nationwide road haulage'
    }
  ];

  return (
    <section className="bg-slate-50/80 border-b border-slate-200/90 py-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between shadow-[0_2px_12px_-2px_rgba(11,25,44,0.04)] hover:shadow-[0_8px_24px_-4px_rgba(11,25,44,0.08)] hover:border-[#0B192C]/30 transition-all duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0B192C]/5 border border-[#0B192C]/10 text-[#0B192C] flex items-center justify-center shrink-0 group-hover:bg-[#0B192C] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B192C] group-hover:text-[#0B192C] transition-colors leading-tight">
                      {cred.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
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
