import { useEffect } from 'react';

export function useScrollReveal(dependencyKey?: unknown) {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const elements = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');

    if (prefersReducedMotion) {
      elements.forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    // Vanilla JS IntersectionObserver for one-time smooth scroll reveal
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Animate once only
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    elements.forEach((el) => {
      // If already revealed, do not re-observe
      if (!el.classList.contains('is-revealed')) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [dependencyKey]);
}
