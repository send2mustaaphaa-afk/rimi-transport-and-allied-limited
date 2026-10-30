import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { AboutSection } from '../components/AboutSection';
import { StatsSection } from '../components/StatsSection';
import { SeoHead } from '../components/SeoHead';
import {
  ShieldCheck,
  Award,
  MapPin,
  FileCheck
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 font-sans">
      <SeoHead
        title="About Us | Customs Clearance & Logistics Partner in Nigeria"
        description="Learn about RIMI TRANSPORT AND ALLIED LIMITED, an authorized Nigeria Customs Service clearing agency located at 11A Pelewura Way, Apapa, Lagos. Our mission, vision, and team."
        path="/about"
      />

      {/* 1. Page Header */}
      <PageHeader
        badge="CORPORATE BACKGROUND & CREDENTIALS"
        title="About RIMI TRANSPORT AND ALLIED LIMITED"
        description="Headquartered at 11A Pelewura Way, Apapa, Lagos, we provide Nigeria’s importers, exporters, and industrial manufacturers with authorized customs clearance, intermodal freight forwarding, and insured nationwide haulage."
        currentPage="About Us"
      />

      {/* 2. Main About Section (Background, Mission, Vision, Commitment, Credentials) */}
      <AboutSection
        onRequestQuote={() => navigate('/contact')}
        onContactClick={() => navigate('/contact')}
      />

      {/* 3. Credentials & Regulatory Compliance Strip */}
      <section className="py-20 sm:py-24 bg-[#0B192C] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <span>STATUTORY LICENSES & ACCREDITATIONS</span>
            </div>
            <div className="w-12 h-0.5 bg-blue-400 mt-2 mb-3" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Institutional Compliance & Regulatory Standing
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Our operations adhere to the highest standards mandated by Nigerian maritime, customs, and fiscal authorities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#112239] border border-white/10 p-6 rounded-2xl space-y-3 shadow-md hover:border-white/20 transition-all duration-200">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Nigeria Customs Service (NCS)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Licensed customs clearing agency with direct NICIS II electronic clearance and PAAR filing access across all commands.
              </p>
            </div>

            <div className="bg-[#112239] border border-white/10 p-6 rounded-2xl space-y-3 shadow-md hover:border-white/20 transition-all duration-200">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">NAFDAC & SON Compliance</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Certified facilitation for food, chemical, pharmaceutical, and manufactured imports requiring statutory permits and laboratory tally release.
              </p>
            </div>

            <div className="bg-[#112239] border border-white/10 p-6 rounded-2xl space-y-3 shadow-md hover:border-white/20 transition-all duration-200">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">NPA Port Gateway Access</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unrestricted terminal access across APMT Apapa, Tin Can Island, PTML Ro-Ro, and Kirikiri Lighter Terminals.
              </p>
            </div>

            <div className="bg-[#112239] border border-white/10 p-6 rounded-2xl space-y-3 shadow-md hover:border-white/20 transition-all duration-200">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Goods-in-Transit (GIT) Cover</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Full marine insurance and nationwide transit cover protecting containerized and loose cargo against loss or damage.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Operational Stats */}
      <StatsSection onRequestQuote={() => navigate('/contact')} />
    </div>
  );
};
