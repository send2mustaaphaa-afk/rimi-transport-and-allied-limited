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
    <section className="relative bg-[#0B192C] text-white py-10 sm:py-14 border-b border-slate-800 font-sans">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb: Home / Parent / Current */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 flex-wrap">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
          {parentPage && (
            <>
              <Link
                to={parentPage.path}
                className="hover:text-white transition-colors"
              >
                {parentPage.label}
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
            </>
          )}
          <span className="text-white font-semibold">{currentPage}</span>
        </nav>

        {/* Corporate Heading & Subtitle */}
        <div className="space-y-2 max-w-4xl">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-[11px] font-bold bg-white/10 text-white border border-white/15 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
              <span className="tracking-widest uppercase">{badge}</span>
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
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
