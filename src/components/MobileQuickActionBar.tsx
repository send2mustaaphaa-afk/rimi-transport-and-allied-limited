import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Send } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DETAILS } from '../data/companyData';

interface MobileQuickActionBarProps {
  onRequestQuote?: () => void;
}

export const MobileQuickActionBar: React.FC<MobileQuickActionBarProps> = ({ onRequestQuote }) => {
  return (
    <div
      aria-label="Mobile quick actions"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/90 px-3 py-2 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl transition-transform"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Call Button */}
        <a
          href={`tel:${COMPANY_DETAILS.phoneRaw}`}
          aria-label={`Call ${COMPANY_DETAILS.name}`}
          className="flex-1 py-2.5 px-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white border border-slate-700/80 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Phone className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={COMPANY_DETAILS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex-1 py-2.5 px-2 bg-emerald-700/90 hover:bg-emerald-600 active:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4 shrink-0" />
          <span>WhatsApp</span>
        </a>

        {/* Quote CTA Button */}
        <Link
          to="/contact"
          onClick={() => {
            if (onRequestQuote) onRequestQuote();
          }}
          aria-label="Request a logistics quote"
          className="flex-[1.4] py-2.5 px-3 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
        >
          <Send className="w-3.5 h-3.5 shrink-0" />
          <span>Get Quote</span>
        </Link>
      </div>
    </div>
  );
};
