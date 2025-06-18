// src/hooks/useScrollAnimation.ts

import { useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  fadeOnScrollUp?: boolean; // New option for scroll up effects
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const elementRef = useRef<any>(null);
  
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    fadeOnScrollUp = false // Default to false for backward compatibility
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is entering the viewport
            entry.target.classList.add('is-visible');
            entry.target.classList.remove('is-hidden');
            
            if (triggerOnce && !fadeOnScrollUp) {
              observer.unobserve(entry.target);
            }
          } else {
            // Element is leaving the viewport
            if (fadeOnScrollUp && !triggerOnce) {
              entry.target.classList.remove('is-visible');
              entry.target.classList.add('is-hidden');
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, fadeOnScrollUp]);

  return elementRef;
};