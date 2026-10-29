import React, { useState, useEffect } from 'react';
import { COMPANY_DETAILS, SERVICES_DATA } from '../data/companyData';
import { submitQuoteRequest } from '../data/adminStore';
import {
  Send,
  CheckCircle2,
  Calculator,
  Shield,
  HelpCircle,
  FileText,
  Clock,
  Loader2,
  Mail,
  AlertCircle,
  Check
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

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
  const [emailStatus, setEmailStatus] = useState<'sent' | 'failed' | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
  }>({});

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, shipmentType: initialService }));
    }
  }, [initialService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: { fullName?: string; email?: string; phone?: string } = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@company.com).';
    }

    const phoneClean = formData.phone.replace(/[\s\-+()]/g, '');
    if (!formData.phone.trim() || phoneClean.length < 7) {
      newErrors.phone = 'Please enter a valid phone number with country/area code (e.g. +234 803 000 0000).';
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions

    if (!validate()) {
      setSubmitError('Please complete all required fields with valid details before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const generatedRef = `RTL-QT-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // 1. Persist to Supabase Database & automatically trigger send-quote-email Edge Function
      const result = await submitQuoteRequest({
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

      if (!result.dbSaved) {
        setSubmitError(
          result.error || 'Failed to save quote to Supabase database. Please check your internet connection or contact us via WhatsApp.'
        );
        setIsSubmitting(false);
        return;
      }

      setSubmissionRef(result.id);
      setEmailStatus(result.emailSent ? 'sent' : 'failed');
      setIsSubmitting(false);
      setSubmitted(true);

      if (onQuoteSubmitted) {
        onQuoteSubmitted(result.id);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error('Unhandled quote submission error:', errorMsg);
      setSubmitError(`Submission interrupted: ${errorMsg}`);
      setIsSubmitting(false);
    }
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
    <section id="quote" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.12),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header with Amber Label & Accent Line */}
        <div className="reveal-on-scroll max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
            <span>GET A QUOTE</span>
          </div>
          <span className="section-accent-line" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance mt-3">
            Request a Free, Transparent Logistics Quotation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-[65ch]">
            Fill in your shipment parameters below. Our Apapa-based clearing and operations desk will calculate exact terminal, statutory duty, shipping, and haulage costings without hidden charges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Form Box */}
          <div className="reveal-on-scroll lg:col-span-8 bg-slate-950/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            {submitted ? (
              <div className="text-center py-10 space-y-6">
                <div className={`w-16 h-16 ${emailStatus === 'sent' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-amber-500/20 border-amber-500/40 text-amber-400'} border rounded-full flex items-center justify-center mx-auto`}>
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    {emailStatus === 'sent'
                      ? 'Quote Request Received & Operations Notified!'
                      : 'Quote Request Saved to Database!'}
                  </h3>

                  {/* Status Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <Check className="w-3.5 h-3.5" /> Request Logged & Saved
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <Mail className="w-3.5 h-3.5" /> Forwarded to Operations Desk
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-amber-400">{formData.fullName}</strong>. Your inquiry reference is <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded-sm">{submissionRef}</span>.
                  </p>
                  
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    All your shipment specifications have been received and forwarded to our operations desk at <span className="text-slate-300 font-mono">rimitransportandalliedlimited@gmail.com</span>. Our clearing officers at 11A Pelewura Way, Apapa are reviewing your parameters and will respond promptly via email ({formData.email}) or phone ({formData.phone}).
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
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Talk to Us on WhatsApp ({COMPANY_DETAILS.whatsappNumberDisplay})</span>
                  </a>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setEmailStatus(null);
                      setSubmitError(null);
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
                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-xs rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-red-300 font-semibold mb-0.5">Quote Submission Notice:</strong>
                      <span>{submitError}</span>
                    </div>
                  </div>
                )}
                
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
                        aria-invalid={!!formErrors.fullName}
                        className={`w-full bg-slate-900 border ${
                          formErrors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-amber-500 focus:ring-amber-500'
                        } rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:ring-1`}
                      />
                      {formErrors.fullName && (
                        <p className="mt-1 text-[11px] text-red-400">{formErrors.fullName}</p>
                      )}
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
                        aria-invalid={!!formErrors.email}
                        className={`w-full bg-slate-900 border ${
                          formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-amber-500 focus:ring-amber-500'
                        } rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:ring-1`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-[11px] text-red-400">{formErrors.email}</p>
                      )}
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
                        aria-invalid={!!formErrors.phone}
                        className={`w-full bg-slate-900 border ${
                          formErrors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-amber-500 focus:ring-amber-500'
                        } rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:ring-1`}
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-[11px] text-red-400">{formErrors.phone}</p>
                      )}
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
                    className="btn-interactive group px-7 py-3.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-extrabold text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Saving Quote & Notifying Operations...</span>
                      </>
                    ) : (
                      <>
                        <span>Request a Quote</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Pricing Guarantee & Advisory */}
          <div className="reveal-on-scroll lg:col-span-4 space-y-5">
            
            {/* Guarantee Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 premium-card-lift">
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
                <WhatsAppIcon className="w-4 h-4" />
                <span>Talk to Us on WhatsApp ({COMPANY_DETAILS.whatsappNumberDisplay})</span>
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
