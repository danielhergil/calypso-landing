import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.danihg.calypso';

/**
 * Scroll reveal used across every section. Collapses to a plain div when the
 * visitor asks for reduced motion, so the page never animates against them.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** The single download CTA. One label, one intent, used everywhere on the page. */
export function PlayStoreButton({
  className = '',
  size = 'lg',
}: {
  className?: string;
  size?: 'md' | 'lg';
}) {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-3 rounded-full bg-brand text-white font-semibold
        hover:bg-brand-light active:translate-y-[1px] transition-colors duration-200
        ${size === 'lg' ? 'px-7 py-4 text-base' : 'px-5 py-3 text-sm'} ${className}`}
    >
      <img src="/google_play_logo.png" alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
      <span className="whitespace-nowrap">Get it on Google Play</span>
    </a>
  );
}
