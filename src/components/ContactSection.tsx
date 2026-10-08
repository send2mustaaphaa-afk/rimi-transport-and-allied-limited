import React, { useState } from 'react';
import { COMPANY_DETAILS } from '../data/companyData';
import { appendContactMessage } from '../data/adminStore';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  Navigation,
  Compass,
  Building,
  ShieldCheck
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    appendContactMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject || 'General Logistics Inquiry',
      message: formData.message
    });

    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
    }, 500);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('11A Pelewura Way, Apapa, Lagos, Nigeria')}`;

  return (
    <section id="contact" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
            Get In Touch
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
            Contact Our Apapa Maritime & Logistics Office
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Reach out to our logistics consultants for urgent consignment clearances, ocean freight booking, inland haulage arrangements, or custom brokerage inquiries.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          
          {/* Phone Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-amber-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Official Phone
            </div>
            <a
              href={`tel:${COMPANY_DETAILS.phoneRaw}`}
              className="text-sm sm:text-base font-bold text-slate-900 hover:text-amber-600 mt-1 block transition-colors"
            >
              {COMPANY_DETAILS.phone}
            </a>
            <p className="text-[11px] text-slate-500 mt-1">
              Direct hotline to clearing coordinators
            </p>
          </div>

          {/* Email Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-amber-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Email Address
            </div>
            <a
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="text-xs sm:text-sm font-bold text-slate-900 hover:text-amber-600 mt-1 block truncate transition-colors"
              title={COMPANY_DETAILS.email}
            >
              {COMPANY_DETAILS.email}
            </a>
            <p className="text-[11px] text-slate-500 mt-1">
              Invoices, bills of lading & manifests
            </p>
          </div>

          {/* Office Address Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-amber-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Head Office Address
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
              {COMPANY_DETAILS.officeAddress}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Apapa Maritime Hub, Lagos State
            </p>
          </div>

          {/* WhatsApp / Hours Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Instant Response
                </span>
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                WhatsApp Desk
              </div>
              <div className="text-sm font-bold text-white mt-1">
                {COMPANY_DETAILS.whatsappNumber}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{COMPANY_DETAILS.businessHours}</span>
              </div>
            </div>

            <a
              href={COMPANY_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Open WhatsApp Chat</span>
            </a>
          </div>

        </div>

        {/* 2-Column: Direct Inquiry Form & Interactive Embedded Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Message Form */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 font-display mb-1">
              Send Us a Message
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Our support team answers all email and web queries within 1 business day.
            </p>

            {submitted ? (
              <div className="text-center py-8 space-y-3 bg-white border border-slate-200 rounded-xl p-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-slate-600">
                  Thank you for reaching out to {COMPANY_DETAILS.name}. One of our logistics representatives will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-amber-600 underline mt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234..."
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="">Select inquiry topic</option>
                      <option value="Customs Clearance Inquiry">Customs Clearance Inquiry</option>
                      <option value="Freight Rates Request">Freight Rates Request</option>
                      <option value="Haulage & Trucking">Haulage & Trucking</option>
                      <option value="Warehousing Space">Warehousing Space</option>
                      <option value="General Logistics Question">General Logistics Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your inquiry, cargo details, or port logistics questions..."
                    className="w-full bg-white border border-slate-200 rounded-lg p-3 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {isSending ? 'Sending...' : 'Send Message to Apapa Office'}
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Embedded Map & Strategic Proximity Viewer */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-lg text-white">
              
              {/* Map Bar Header */}
              <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      11A Pelewura Way, Apapa Lagos
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      Lagos Maritime & Port Complex Corridor
                    </span>
                  </div>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
              </div>

              {/* Interactive Visual Map Embed (OpenStreetMap / Apapa Maritime Zone) */}
              <div className="relative h-72 sm:h-80 w-full bg-slate-900">
                <iframe
                  title="RIMI TRANSPORT AND ALLIED LIMITED Office Location - 11A Pelewura Way Apapa"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=3.3500%2C6.4350%2C3.3850%2C6.4650&amp;layer=mapnik&amp;marker=6.4468%2C3.3639"
                  className="w-full h-full border-0 filter contrast-105"
                  loading="lazy"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-xs border border-slate-700 p-2.5 rounded-lg shadow-md max-w-xs text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400">
                    <Building className="w-3.5 h-3.5" />
                    <span>RIMI TRANSPORT & ALLIED</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    11A Pelewura Way, Apapa, Lagos State.
                  </p>
                </div>
              </div>

              {/* Location Highlights Footer */}
              <div className="p-4 bg-slate-950 grid grid-cols-2 gap-3 text-xs border-t border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Port Proximity</span>
                  <p className="font-semibold text-slate-200">5 Mins to Apapa Port Gate</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Tin Can Island</span>
                  <p className="font-semibold text-slate-200">10 Mins via Liverpool Rd</p>
                </div>
              </div>

            </div>

            {/* Quick WhatsApp Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">
                    Prefer WhatsApp Messaging?
                  </h4>
                  <p className="text-[11px] text-emerald-800">
                    Send consignments, documents or questions to <strong>08169183582</strong>
                  </p>
                </div>
              </div>
              <a
                href={COMPANY_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors whitespace-nowrap shadow-xs"
              >
                Chat Now
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
