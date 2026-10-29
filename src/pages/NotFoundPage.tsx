import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, ArrowRight, AlertTriangle, Compass, Phone } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { COMPANY_DETAILS } from '../data/companyData';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex-1 min-h-[70vh] bg-slate-950 text-white flex items-center justify-center py-20 px-4 sm:px-8 relative overflow-hidden">
      <SeoHead
        title="404 Page Not Found"
        description="The page you requested could not be found. Return to RIMI TRANSPORT AND ALLIED LIMITED homepage or contact our Apapa office."
        path="/404"
      />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-xl mx-auto text-center space-y-6">
        {/* Amber Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>404 · PAGE NOT FOUND</span>
        </div>

        {/* Big Code & Title */}
        <div className="space-y-2">
          <h1 className="text-6xl sm:text-8xl font-black font-display text-white tracking-tight">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Looking for a Port or Consignment?
          </h2>
        </div>

        {/* Message */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md mx-auto">
          The page or logistics document you requested cannot be located. It may have moved or been renamed. Return to the homepage or contact our Apapa operations desk.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            to="/"
            className="btn-interactive w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-lg shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/contact"
            className="btn-interactive w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-lg border border-slate-700 flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Contact & Quote</span>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-400 space-y-2">
          <p className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
            Frequently Accessed Portals:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-amber-400">
            <Link to="/services" className="hover:underline">Our Services</Link>
            <span className="text-slate-700">·</span>
            <Link to="/ports" className="hover:underline">Ports & Coverage</Link>
            <span className="text-slate-700">·</span>
            <Link to="/fleet" className="hover:underline">Automobiles & Fleet</Link>
            <span className="text-slate-700">·</span>
            <Link to="/track" className="hover:underline">Track Consignment</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
