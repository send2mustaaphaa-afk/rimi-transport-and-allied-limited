import React, { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  path?: string;
  ogType?: 'website' | 'article' | 'business';
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  path = '',
  ogType = 'website',
  schema
}) => {
  useEffect(() => {
    // 1. Page Title
    const fullTitle = title.includes('RIMI TRANSPORT')
      ? title
      : `${title} | RIMI TRANSPORT AND ALLIED LIMITED`;
    document.title = fullTitle;

    // Helper to create or update meta tags
    const updateMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Description
    updateMetaTag('name', 'description', description);

    // 3. Open Graph Tags
    updateMetaTag('property', 'og:title', fullTitle);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:type', ogType);

    // 4. Canonical & OG URL
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${window.location.origin}${cleanPath === '/' ? '' : cleanPath}`;
    updateMetaTag('property', 'og:url', canonicalUrl);

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 5. Twitter Card Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', fullTitle);
    updateMetaTag('name', 'twitter:description', description);

    // 6. JSON-LD Structured Data
    if (schema) {
      let scriptTag = document.getElementById('page-jsonld-schema') as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'page-jsonld-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schema);
    }
  }, [title, description, path, ogType, schema]);

  return null;
};
