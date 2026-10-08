import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { QuoteSection } from './components/QuoteSection';
import { TrackingSection } from './components/TrackingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { AdminPage } from './components/AdminPage';
import { DEMO_TRACKING_SHIPMENTS, TrackingShipment } from './data/companyData';
import { fetchRemoteShipments, syncShipmentToSupabase } from './data/adminStore';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
        return '/admin';
      }
    }
    return '/';
  });

  const [activeSection, setActiveSection] = useState('home');
  const [selectedQuoteService, setSelectedQuoteService] = useState<string>('');
  const [activeTrackingId, setActiveTrackingId] = useState<string>('');
  const [shipments, setShipments] = useState<TrackingShipment[]>(DEMO_TRACKING_SHIPMENTS);

  // Sync shipments with Supabase backend on load
  useEffect(() => {
    fetchRemoteShipments(DEMO_TRACKING_SHIPMENTS).then(remote => {
      if (remote && remote.length > 0) {
        setShipments(remote);
      }
    });
  }, []);

  // Sync route with URL changes / popstate / hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
        setCurrentPath('/admin');
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Track scroll position to update active navbar link on public homepage
  useEffect(() => {
    if (currentPath === '/admin') return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'why-us', 'quote', 'tracking', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const navigateToAdmin = () => {
    try {
      window.history.pushState(null, '', '/admin');
    } catch (e) {
      window.location.hash = 'admin';
    }
    setCurrentPath('/admin');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const navigateToHome = () => {
    try {
      window.history.pushState(null, '', '/');
    } catch (e) {
      window.location.hash = '';
    }
    setCurrentPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (currentPath !== '/') {
      navigateToHome();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestQuote = (serviceName?: string) => {
    if (serviceName) {
      setSelectedQuoteService(serviceName);
    }
    scrollToSection('quote');
  };

  const handleTrackShipment = (trackingId?: string) => {
    if (trackingId) {
      setActiveTrackingId(trackingId);
    }
    scrollToSection('tracking');
  };

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

  // --- ADMIN ROUTE VIEW (/admin) ---
  if (currentPath === '/admin') {
    return (
      <AdminPage
        onReturnHome={navigateToHome}
        shipments={shipments}
        onUpdateShipment={handleUpdateShipment}
        onAddShipment={handleAddShipment}
      />
    );
  }

  // --- PUBLIC HOMEPAGE (ZERO ADMIN OVERLAY) ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      {/* Main Navigation with Admin Dashboard on menu */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onRequestQuote={() => handleRequestQuote()}
        onNavigateToAdmin={navigateToAdmin}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <div id="home">
          <Hero
            onRequestQuote={() => handleRequestQuote()}
            onTrackShipment={handleTrackShipment}
            onExploreServices={() => scrollToSection('services')}
          />
        </div>

        {/* 2. About Us Section */}
        <AboutSection
          onRequestQuote={() => handleRequestQuote()}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* 3. Our Services Section */}
        <ServicesSection
          onRequestQuoteWithService={handleRequestQuote}
        />

        {/* 4. Why Choose Us Section */}
        <WhyChooseUs
          onRequestQuote={() => handleRequestQuote()}
        />

        {/* 5. Request a Quote Section */}
        <QuoteSection
          initialService={selectedQuoteService}
          onQuoteSubmitted={handleQuoteSubmitted}
        />

        {/* 6. Cargo & Customs Milestone Tracking */}
        <TrackingSection
          initialTrackingId={activeTrackingId}
          onRequestQuote={() => handleRequestQuote()}
          shipmentsList={shipments}
        />

        {/* 7. Contact Us & Embedded Map Section */}
        <ContactSection />
      </main>

      {/* Corporate Footer with hidden discreet admin dot */}
      <Footer
        onNavigate={scrollToSection}
        onRequestQuote={() => handleRequestQuote()}
        onSelectService={(serviceTitle) => handleRequestQuote(serviceTitle)}
        onNavigateToAdmin={navigateToAdmin}
      />

      {/* Floating WhatsApp Quick Connect */}
      <WhatsAppFloatingButton />
    </div>
  );
}
