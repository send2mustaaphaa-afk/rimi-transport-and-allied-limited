import React, { useState } from 'react';
import { COMPANY_DETAILS } from '../data/companyData';
import { MessageSquare, X, Send, Phone } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const text = customMsg.trim() || 'Hello RIMI Transport, I would like to make an inquiry regarding your clearing and forwarding services.';
    window.open(COMPANY_DETAILS.whatsappMessageUrl(text), '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Quick Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">
                  RIMI Transport & Allied
                </h4>
                <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Apapa Port Clearing Desk
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 shadow-2xs">
              <p className="font-semibold text-slate-900 mb-1">
                Hello! How can we assist your cargo today?
              </p>
              <p className="text-[11px] text-slate-500">
                Contact our Apapa dispatch office for fast PAAR processing, ocean/air freight rates, or haulage.
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => {
                  window.open(
                    COMPANY_DETAILS.whatsappMessageUrl(
                      'Hello RIMI Transport, I would like an urgent customs clearance quotation for my cargo at Apapa Port.'
                    ),
                    '_blank'
                  );
                }}
                className="w-full text-left text-[11px] font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 p-2 rounded-lg transition-colors"
              >
                🚢 Inquire about Apapa Port Clearance
              </button>
              <button
                type="button"
                onClick={() => {
                  window.open(
                    COMPANY_DETAILS.whatsappMessageUrl(
                      'Hello RIMI Transport, I would like a quote for sea/air freight and container haulage.'
                    ),
                    '_blank'
                  );
                }}
                className="w-full text-left text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg transition-colors"
              >
                📦 Get Freight & Haulage Rates
              </button>
            </div>

            {/* Direct Input */}
            <form onSubmit={handleSendCustom} className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Type your message..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="flex-1 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-amber-500" />
                {COMPANY_DETAILS.phone}
              </span>
              <span>WhatsApp: {COMPANY_DETAILS.whatsappNumber}</span>
            </div>
          </div>

        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-emerald-500/20"
        aria-label="Open WhatsApp live inquiry"
        title={`Chat on WhatsApp: ${COMPANY_DETAILS.whatsappNumber}`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-slate-950 animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-slate-950"></span>
          </div>
        )}
      </button>
    </div>
  );
};
