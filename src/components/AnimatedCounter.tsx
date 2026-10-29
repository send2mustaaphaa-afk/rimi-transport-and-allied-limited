import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  className = '',
  duration = 1200
}) => {
  const [displayValue, setDisplayValue] = useState<string>(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Parse the value to identify numbers, prefixes, and suffixes
    // Examples: "100%", "48-72h", "99.8%", "0", "24/7", "100% Ro-Ro Berth"
    const match = value.match(/^([^0-9.]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1];
    const targetNumber = parseFloat(match[2]);
    const suffix = match[3];
    const isDecimal = match[2].includes('.');
    const decimalPlaces = isDecimal ? match[2].split('.')[1].length : 0;

    // Setup IntersectionObserver to trigger counting once visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            observer.unobserve(entry.target);

            const startTime = performance.now();

            const updateCount = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic: 1 - pow(1 - progress, 3)
              const easeOutProgress = 1 - Math.pow(1 - progress, 3);
              const currentNum = targetNumber * easeOutProgress;

              const formattedNum = isDecimal
                ? currentNum.toFixed(decimalPlaces)
                : Math.floor(currentNum).toString();

              setDisplayValue(`${prefix}${formattedNum}${suffix}`);

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                setDisplayValue(value); // Ensure exact final string
              }
            };

            requestAnimationFrame(updateCount);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [value, duration, hasAnimated]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  );
};
