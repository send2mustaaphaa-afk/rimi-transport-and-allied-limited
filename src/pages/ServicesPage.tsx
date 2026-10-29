import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { ServicesSection } from '../components/ServicesSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { FAQSection } from '../components/FAQSection';
import { SeoHead } from '../components/SeoHead';
import { COMPANY_DETAILS } from '../data/companyData';
import { ArrowRight, Truck, MessageSquare, ShieldCheck } from 'lucide-react';

interface ServicesPageProps {
  onQuoteWithService: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onQuoteWithService }) => {
  const navigate = useNavigate();

  const handleSelectService = (serviceName?: string) => {
    if (serviceName) {
      onQuoteWithService(serviceName);
      navigate(`/contact?service=${encodeURIComponent(serviceName)}`);
    } else {
      navigate('/contact');
    }
  };

  return (
    <div className="flex-1">
      <SeoHead
        title="Our Services | Clearing, Forwarding & Haulage Solutions"
        description="Explore RIMI TRANSPORT AND ALLIED LIMITED's 10 core logistics services: customs clearance, ocean & air freight, land haulage, warehousing, and Ro-Ro vehicle clearing."
        path="/services"
      />

      {/* 1. Page Header */}
      <PageHeader
        badge="LOGISTICS SOLUTIONS"
        title="Comprehensive Clearing, Forwarding & Haulage Services"
        description="From expedited Nigeria Customs documentation to intermodal sea, air, and insured road freight across all Nigerian trade corridors."
        currentPage="Our Services"
      />

      {/* 2. Full Services Section with Modals and Filters */}
      <ServicesSection onRequestQuoteWithService={handleSelectService} />

      {/* 3. Link to Specialized Fleet Page */}
      <section className="py-10 bg-slate-900 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
              SPECIALIZED HANDLING
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
              Importing Automobiles, Machinery, or Heavy Project Plant?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Discover our specialized Ro-Ro port discharge, lowbed transport, and multi-vehicle carrier haulage fleet.
            </p>
          </div>
          <Link
            to="/fleet"
            className="btn-interactive px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-2 shrink-0"
          >
            <Truck className="w-4 h-4" />
            <span>Explore Automobiles & Fleet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 4. How It Works 4-Step Process */}
      <HowItWorksSection onRequestQuote={() => navigate('/contact')} />

      {/* 5. Frequently Asked Questions Accordion */}
      <FAQSection onRequestQuote={() => navigate('/contact')} />
    </div>
  );
};
