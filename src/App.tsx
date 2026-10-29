import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuoteCtaBand } from './components/QuoteCtaBand';
import { ScrollToTop } from './components/ScrollToTop';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { MobileQuickActionBar } from './components/MobileQuickActionBar';
import { AdminPage } from './components/AdminPage';

// Multi-Page Views
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PortsPage } from './pages/PortsPage';
import { FleetPage } from './pages/FleetPage';
import { WhyChooseUsPage } from './pages/WhyChooseUsPage';
import { TrackingPage } from './pages/TrackingPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { DEMO_TRACKING_SHIPMENTS, TrackingShipment } from './data/companyData';
import { fetchRemoteShipments, syncShipmentToSupabase } from './data/adminStore';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedQuoteService, setSelectedQuoteService] = useState<string>('');
  const [activeTrackingId, setActiveTrackingId] = useState<string>('');
  const [shipments, setShipments] = useState<TrackingShipment[]>(DEMO_TRACKING_SHIPMENTS);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize IntersectionObserver scroll reveals whenever route changes
  useScrollReveal(location.pathname);

  // Redirect legacy anchor hashes (e.g. #services, #about, #quote, #tracking, #why-us, #admin) to clean routes
  useEffect(() => {
    const hash = (location.hash || '').toLowerCase();
    if (!hash) return;

    const legacyHashMap: Record<string, string> = {
      '#admin': '/admin',
      '#about': '/about',
      '#services': '/services',
      '#service': '/services',
      '#ports': '/ports',
      '#fleet': '/fleet',
      '#vehicles': '/fleet',
      '#automobiles': '/fleet',
      '#why-us': '/why-choose-us',
      '#whyus': '/why-choose-us',
      '#why-choose-us': '/why-choose-us',
      '#tracking': '/track',
      '#track': '/track',
      '#quote': '/contact',
      '#contact': '/contact',
      '#faq': '/contact',
      '#faqs': '/contact'
    };

    if (legacyHashMap[hash]) {
      navigate(legacyHashMap[hash], { replace: true });
    }
  }, [location.hash, navigate]);

  // Sync shipments with Supabase backend on load
  useEffect(() => {
    fetchRemoteShipments(DEMO_TRACKING_SHIPMENTS).then(remote => {
      if (remote && remote.length > 0) {
        setShipments(remote);
      }
    });
  }, []);

  // Track scroll progress percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(Math.max(currentProgress, 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuoteSubmitted = (trackingRef: string) => {
    setActiveTrackingId(trackingRef);
  };

  const handleUpdateShipment = (updated: TrackingShipment) => {
    setShipments(prev => prev.map(s => s.trackingId === updated.trackingId ? updated : s));
    syncShipmentToSupabase(updated);
  };

  const handleAddShipment = (newShipment: TrackingShipment) => {
    setShipments(prev => [newShipment, ...prev]);
    setActiveTrackingId(newShipment.trackingId);
    syncShipmentToSupabase(newShipment);
  };

  // --- STAFF PORTAL ROUTE (/admin) ---
  if (location.pathname === '/admin') {
    return (
      <AdminPage
        onReturnHome={() => navigate('/')}
        shipments={shipments}
        onUpdateShipment={handleUpdateShipment}
        onAddShipment={handleAddShipment}
      />
    );
  }

  // --- PUBLIC MULTI-PAGE APPLICATION ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      {/* Resets window scroll position upon route change */}
      <ScrollToTop />

      {/* Top Amber Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-50 pointer-events-none scroll-progress-bar"
        aria-hidden="true"
      >
        <div
          className="h-full bg-amber-500 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(245,158,11,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Global Header */}
      <Header
        onRequestQuote={() => navigate('/contact')}
        onNavigateToAdmin={() => navigate('/admin')}
      />

      {/* Multi-Page Routes */}
      <main className="flex-1 pb-16 sm:pb-0">
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* About */}
          <Route path="/about" element={<AboutPage />} />

          {/* Services Overview & Sub-pages */}
          <Route
            path="/services"
            element={
              <ServicesPage
                onQuoteWithService={(serviceName) => setSelectedQuoteService(serviceName || '')}
              />
            }
          />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />

          {/* Ports & Coverage */}
          <Route path="/ports" element={<PortsPage />} />

          {/* Automobiles & Fleet */}
          <Route
            path="/fleet"
            element={
              <FleetPage
                onQuoteWithService={(serviceName) => setSelectedQuoteService(serviceName || '')}
              />
            }
          />

          {/* Why Choose Us */}
          <Route path="/why-choose-us" element={<WhyChooseUsPage />} />

          {/* Track Consignment */}
          <Route
            path="/track"
            element={
              <TrackingPage
                shipments={shipments}
                activeTrackingId={activeTrackingId}
              />
            }
          />
          {/* Alias /tracking -> /track */}
          <Route path="/tracking" element={<Navigate to="/track" replace />} />

          {/* Contact & Quote */}
          <Route
            path="/contact"
            element={<ContactPage onQuoteSubmitted={handleQuoteSubmitted} />}
          />
          {/* Alias /quote -> /contact */}
          <Route path="/quote" element={<Navigate to="/contact" replace />} />

          {/* Custom 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Shared Short Call-To-Action Band at the end of every page */}
      <QuoteCtaBand />

      {/* Global Footer */}
      <Footer
        onRequestQuote={() => navigate('/contact')}
        onNavigateToAdmin={() => navigate('/admin')}
      />

      {/* Sticky Bottom Bar on Mobile (Call, WhatsApp, Get Quote) */}
      <MobileQuickActionBar
        onRequestQuote={() => navigate('/contact')}
      />

      {/* Floating WhatsApp Quick Connect */}
      <WhatsAppFloatingButton />
    </div>
  );
}
