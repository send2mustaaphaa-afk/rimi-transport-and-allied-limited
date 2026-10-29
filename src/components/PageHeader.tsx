import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface PageHeaderProps {
  badge?: string;
  title: string;
  description: string;
  currentPage: string;
  parentPage?: { label: string; path: string };
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  description,
  currentPage,
  parentPage
}) => {
  return (
    <section className="relative bg-slate-950 text-white py-8 sm:py-12 border-b border-slate-800 overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.1),transparent_50%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb: Home / Parent / Current */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 mb-3 flex-wrap">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-amber-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
          {parentPage && (
            <>
              <Link
                to={parentPage.path}
                className="hover:text-amber-400 transition-colors"
              >
                {parentPage.label}
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
            </>
          )}
          <span className="text-amber-400 font-semibold">{currentPage}</span>
        </nav>

        {/* Slim Banner Heading & Subtitle */}
        <div className="space-y-1.5 max-w-4xl">
          {badge && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="tracking-widest uppercase">{badge}</span>
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-[65ch]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};
