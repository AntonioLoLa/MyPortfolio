'use client';

import { useEffect } from 'react';

/**
 * One observer for the whole page: marks every [data-animate] element with [data-inview]
 * the first time it is substantially visible. All motion is CSS keyed off that attribute,
 * so without JavaScript (or with reduced motion) every figure is simply drawn in place.
 */
export default function InViewObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-animate]');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-inview', ''));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-inview', '');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.35 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
