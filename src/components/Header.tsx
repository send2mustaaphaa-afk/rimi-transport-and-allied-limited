import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY_DETAILS, SERVICES_DATA } from '../data/companyData';
import { Menu, X, ArrowRight, ChevronDown, ShieldCheck, Ship, Plane, Truck, Boxes, Warehouse, FileCheck, Car, ArrowLeftRight } from 'lucide-react';
import logoImg from '../assets/logo.png';

const SERVICE_DROPDOWN_ICONS: Record<string, React.ReactNode> = {
  'customs-clearance': <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />,
  'freight-forwarding': <Ship className="w-4 h-4 text-amber-500 shrink-0" />,
  'import-export-services': <ArrowLeftRight className="w-4 h-4 text-amber-500 shrink-0" />,
  'sea-freight': <Ship className="w-4 h-4 text-amber-500 shrink-0" />,
  'air-freight': <Plane className="w-4 h-4 text-amber-500 shrink-0" />,
  'land-transportation': <Truck className="w-4 h-4 text-amber-500 shrink-0" />,
  'cargo-handling': <Boxes className="w-4 h-4 text-amber-500 shrink-0" />,
  'warehousing-storage': <Warehouse className="w-4 h-4 text-amber-500 shrink-0" />,
  'documentation-compliance': <FileCheck className="w-4 h-4 text-amber-500 shrink-0" />,
  'vehicle-clearing-roro': <Car className="w-4 h-4 text-amber-500 shrink-0" />
};

interface HeaderProps {
  onRequestQuote?: () => void;
  onNavigateToAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onRequestQuote,
  onNavigateToAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Close menus whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services', hasDropdown: true },
    { label: 'Ports', path: '/ports' },
    { label: 'Fleet', path: '/fleet' },
    { label: 'Why Us', path: '/why-choose-us' },
    { label: 'Track', path: '/track' }
  ];

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleMouseEnterServices = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeaveServices = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white/95 border-slate-200/90 shadow-[0_8px_24px_-6px_rgba(15,23,42,0.09)]'
          : 'bg-white/98 border-slate-200 shadow-xs'
      }`}
    >
      {/* Main Navigation Bar */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between transition-all duration-300 ease-in-out ${
          isScrolled ? 'py-2 sm:py-2.5' : 'py-3 sm:py-3.5'
        }`}
      >
        {/* Zone 1: Official Logo + Brand Wordmark */}
        <Link
          to="/"
          className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="RIMI TRANSPORT AND ALLIED LIMITED Logo"
              className={`w-auto object-contain shrink-0 group-hover:scale-105 transition-all duration-300 ease-in-out drop-shadow-xs ${
                isScrolled ? 'h-[44px]' : 'h-[50px]'
              }`}
            />
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 font-display block leading-tight group-hover:text-amber-600 transition-colors">
                RIMI TRANSPORT
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider block uppercase">
                AND ALLIED LIMITED
              </span>
            </div>
          </div>
        </Link>

        {/* Zone 2: Desktop Navigation Links with Services Dropdown */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-slate-700">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);

            if (link.hasDropdown) {
              return (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={handleMouseEnterServices}
                  onMouseLeave={handleMouseLeaveServices}
                >
                  <Link
                    to={link.path}
                    aria-current={active ? 'page' : undefined}
                    aria-haspopup="true"
                    aria-expanded={servicesDropdownOpen}
                    className={`transition-colors relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm whitespace-nowrap inline-flex items-center gap-1 ${
                      active
                        ? 'text-amber-600 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-amber-600' : 'text-slate-400'}`} />
                  </Link>

                  {/* Desktop Dropdown Flyout Panel */}
                  <div
                    className={`absolute top-full -left-20 w-[540px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 transition-all duration-200 origin-top z-50 ${
                      servicesDropdownOpen
                        ? 'opacity-100 scale-100 pointer-events-auto translate-y-1'
                        : 'opacity-0 scale-95 pointer-events-none -translate-y-2'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block font-display">Our 10 Core Services</span>
                        <span className="text-[11px] text-slate-500">Customs clearance, global freight & insured inland transit</span>
                      </div>
                      <Link
                        to="/services"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="text-[11px] font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
                      >
                        <span>View Overview</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {SERVICES_DATA.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services/${service.id}`}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-50/70 transition-colors group text-left"
                        >
                          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors mt-0.5">
                            {SERVICE_DROPDOWN_ICONS[service.id] || <ShieldCheck className="w-4 h-4 text-amber-500" />}
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors block truncate">
                              {service.title}
                            </span>
                            <span className="text-[10px] text-slate-500 line-clamp-1">
                              {service.turnaroundTime}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={active ? 'page' : undefined}
                className={`transition-colors relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm whitespace-nowrap ${
                  active
                    ? 'text-amber-600 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Primary Quote Action Button linking to /contact */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/contact"
            className="btn-interactive group px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-lg shadow-sm hover:shadow-md flex items-center gap-2 border border-slate-900 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
          >
            <span>Quote</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
          </Link>
        </div>

        {/* Mobile Quote & Hamburger Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/contact"
            className="btn-interactive px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded-lg whitespace-nowrap shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            Quote
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-950 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with smooth slide/fade */}
      <div
        className={`lg:hidden bg-white border-b border-slate-200 px-4 space-y-3 shadow-lg overflow-hidden transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? 'max-h-[600px] opacity-100 pt-2 pb-6 translate-y-0'
            : 'max-h-0 opacity-0 py-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-1">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);

            if (link.hasDropdown) {
              return (
                <div key={link.path} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <Link
                      to={link.path}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex-1 text-left px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                        active
                          ? 'bg-amber-50 text-amber-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{link.label}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="p-2.5 text-slate-500 hover:text-slate-900"
                      aria-label="Expand services submenu"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Submenu for services */}
                  {mobileServicesOpen && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-lg mb-1">
                      {SERVICES_DATA.map((srv) => (
                        <Link
                          key={srv.id}
                          to={`/services/${srv.id}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-2.5 py-1.5 text-xs text-slate-600 hover:text-amber-700 hover:bg-amber-100/50 rounded-md transition-colors"
                        >
                          {srv.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={active ? 'page' : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left px-3 py-2.5 rounded-md text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  active
                    ? 'bg-amber-50 text-amber-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-interactive group w-full py-2.5 px-4 text-sm font-bold text-center text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
          >
            <span>Quote</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </header>
  );
};
