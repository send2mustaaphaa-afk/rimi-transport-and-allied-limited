import React, { useState, useEffect } from 'react';
import { COMPANY_DETAILS, SERVICES_DATA } from '../data/companyData';
import { appendQuoteRequest } from '../data/adminStore';
import {
  Send,
  CheckCircle2,
  Calculator,
  MessageSquare,
  Shield,
  HelpCircle,
  FileText,
  Clock
} from 'lucide-react';

interface QuoteSectionProps {
  initialService?: string;
  onQuoteSubmitted?: (trackingRef: string) => void;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  initialService = '',
  onQuoteSubmitted
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    shipmentType: initialService || 'Customs Clearance',
    origin: '',
    destination: 'Apapa Port, Lagos',
    cargoDescription: '',
    containerSize: '20ft Container (FCL)',
    estimatedWeight: '',
    urgency: 'Standard',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, shipmentType: initialService }));
    }
  }, [initialService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `RTL-QT-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Save to admin repository
      appendQuoteRequest({
        id: generatedRef,
        fullName: formData.fullName,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        shipmentType: formData.shipmentType,
        origin: formData.origin,
        destination: formData.destination,
        cargoDescription: formData.cargoDescription || formData.containerSize,
        containerSize: formData.containerSize,
        estimatedWeight: formData.estimatedWeight,
        message: formData.message
      });

      setSubmissionRef(generatedRef);
      setIsSubmitting(false);
      setSubmitted(true);
      if (onQuoteSubmitted) {
        onQuoteSubmitted(generatedRef);
      }
    }, 600);
  };

  const generateWhatsAppMessage = () => {
    const text = `*NEW QUOTE REQUEST - ${COMPANY_DETAILS.name}*
*Ref:* ${submissionRef || 'PENDING'}
*Name:* ${formData.fullName}
*Company:* ${formData.companyName || 'N/A'}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Service:* ${formData.shipmentType}
*Origin:* ${formData.origin || 'Not specified'}
*Destination:* ${formData.destination}
*Cargo/Container:* ${formData.containerSize} (${formData.cargoDescription || 'General Cargo'})
*Message:* ${formData.message || 'Please provide quotation'}`;

    return COMPANY_DETAILS.whatsappMessageUrl(text);
  };

  return (
    <section id="quote" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.1),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
            Instant Logistics Quotation
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance">
            Request a Free, Transparent Logistics Quotation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Fill in your shipment parameters below. Our Apapa-based clearing and operations desk will calculate exact terminal, statutory duty, shipping, and haulage costings without hidden charges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Form Box */}
          <div className="lg:col-span-8 bg-slate-950/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            {submitted ? (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    Quote Request Received Successfully!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-amber-400">{formData.fullName}</strong>. Your inquiry reference is <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded-sm">{submissionRef}</span>.
                  </p>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Our clearing officers at 11A Pelewura Way, Apapa are reviewing your details. We will respond via email ({formData.email}) or phone ({formData.phone}) promptly during business hours (Mon-Fri 8:00 AM - 6:00 PM).
                  </p>
                </div>

                {/* WhatsApp Fast Track Action */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-md mx-auto space-y-3">
                  <div className="text-xs font-semibold text-slate-300">
                    Want immediate clearance assessment on WhatsApp?
                  </div>
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Quote Directly to WhatsApp (08169183582)</span>
                  </a>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        companyName: '',
                        email: '',
                        phone: '',
                        shipmentType: 'Customs Clearance',
                        origin: '',
                        destination: 'Apapa Port, Lagos',
                        cargoDescription: '',
                        containerSize: '20ft Container (FCL)',
                        estimatedWeight: '',
                        urgency: 'Standard',
                        message: ''
                      });
                    }}
                    className="text-xs font-semibold text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Submit another quote request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Contact Information */}
                <div>
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    1. Contact & Business Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Alhaji Mustapha Ibrahim"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Company Name <span className="text-slate-400">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="e.g. Nigerian Manufacturing Ltd"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Address <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. procurement@company.com"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone / WhatsApp Number <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +234 803 000 0000"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Shipment Specifications */}
                <div className="pt-2 border-t border-slate-800/80">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    2. Shipment & Logistics Parameters
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Shipment Service Type <span className="text-amber-400">*</span>
                      </label>
                      <select
                        name="shipmentType"
                        value={formData.shipmentType}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      >
                        {SERVICES_DATA.map((srv) => (
                          <option key={srv.id} value={srv.title}>
                            {srv.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Container / Cargo Classification
                      </label>
                      <select
                        name="containerSize"
                        value={formData.containerSize}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="20ft Container (FCL)">20ft Standard Dry Container (FCL)</option>
                        <option value="40ft Container (FCL)">40ft Standard Dry Container (FCL)</option>
                        <option value="40ft High Cube (HQ)">40ft High Cube Container (HQ)</option>
                        <option value="Less Container Load (LCL Groupage)">Less than Container Load (LCL Groupage)</option>
                        <option value="Air Cargo Package">Air Cargo Package / Pallet</option>
                        <option value="Ro-Ro Vehicle / Heavy Equipment">Ro-Ro Vehicle / Heavy Equipment</option>
                        <option value="Breakbulk / Project Cargo">Breakbulk / Project Cargo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Origin (Port / City / Country)
                      </label>
                      <input
                        type="text"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        placeholder="e.g. Ningbo China, Antwerp, Hamburg, Dubai"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Destination in Nigeria
                      </label>
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="e.g. Apapa Port, Ikeja Lagos, Ibadan, Kano, Abuja"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Details & Message */}
                <div className="pt-2 border-t border-slate-800/80">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Cargo Details, HS Codes or Special Instructions
                  </label>
                  <textarea
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details such as cargo item description, estimated gross weight (kg/tons), Form M status, Bill of Lading readiness, or preferred delivery timeline..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* Submit button & actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zero obligation. Free comprehensive quote breakdown.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-3.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-extrabold text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Calculating Quotation...</span>
                    ) : (
                      <>
                        <span>Submit Quote Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Pricing Guarantee & Advisory */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Guarantee Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                <Calculator className="w-5 h-5 text-amber-500" />
                <span>Our Transparent Quote Guarantee</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When you request a quotation from {COMPANY_DETAILS.name}, you receive an exhaustive, transparent cost breakdown:
              </p>
              
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Nigeria Customs statutory duty & VAT assessments</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Shipping line terminal handling & delivery order charges</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>NPA port handling & gate pass clearances</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Dedicated inland truck haulage with transit insurance</span>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Contact Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Need Fast Clearance Assistance?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Chat directly with our principal clearing officer in Apapa right now:
              </p>
              <a
                href={COMPANY_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: {COMPANY_DETAILS.whatsappNumber}</span>
              </a>
            </div>

            {/* Turnaround reminder */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Quotes typically generated within 30–60 minutes during active office hours.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
