import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { VehicleFleetSection } from '../components/VehicleFleetSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { SeoHead } from '../components/SeoHead';
import { COMPANY_DETAILS } from '../data/companyData';
import { ArrowRight, ShieldCheck, Car, MessageSquare } from 'lucide-react';

interface FleetPageProps {
  onQuoteWithService: (serviceName?: string) => void;
}

export const FleetPage: React.FC<FleetPageProps> = ({ onQuoteWithService }) => {
  const navigate = useNavigate();

  const handleSelectService = (serviceName?: string) => {
    const srv = serviceName || 'Automobile & Ro-Ro Clearance';
    onQuoteWithService(srv);
    navigate(`/contact?service=${encodeURIComponent(srv)}`);
  };

  return (
    <div className="flex-1">
      <SeoHead
        title="Automobiles & Fleet | Ro-Ro Clearance & Heavy Haulage"
        description="Specialized automobile clearance at PTML and Tin Can Island ports. Multi-vehicle carrier haulage, heavy plant machinery, and bonded escorts by RIMI TRANSPORT."
        path="/fleet"
      />

      {/* 1. Page Header */}
      <PageHeader
        badge="AUTOMOBILES & LOGISTICS FLEET"
        title="Specialized Automobile Clearance, Ro-Ro Discharge & Heavy Haulage"
        description="Direct operations at PTML Berth, Tin Can Island, and Kirikiri Lighter Terminals for luxury executive vehicles, construction plant machinery, and dedicated car carrier transit."
        currentPage="Automobiles & Fleet"
      />

      {/* 2. Full Vehicle Fleet Showcase Component */}
      <VehicleFleetSection onRequestQuoteWithService={handleSelectService} />

      {/* 3. Clearance Workflow */}
      <HowItWorksSection onRequestQuote={() => handleSelectService('Automobile & Ro-Ro Clearance')} />
    </div>
  );
};
