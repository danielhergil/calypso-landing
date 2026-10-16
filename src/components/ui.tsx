import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.danihg.calypso';

/**
 * Enlace a Play con la procedencia en `referrer`: Play Console la reparte por utm_source y
 * utm_campaign en Adquisición de usuarios, así se sabe qué sección de la web trae instalaciones.
 */
export function playUrl(campaign: string) {
  const referrer = `utm_source=calypso-app.es&utm_medium=landing&utm_campaign=${campaign}`;
  return `${PLAY_STORE_URL}&referrer=${encodeURIComponent(referrer)}`;
}

/**
 * Scroll reveal used across every section. Collapses to a plain element when
 * the visitor asks for reduced motion, so the page never animates against them.
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
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * Real app screenshots shown at their native 945x2048 ratio inside a CSS
 * device shell. Nothing is cropped and nothing about the UI is faked.
 */
export function PhoneFrame({
  src,
  alt,
  priority = false,
  className = '',
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[945/2048] rounded-[2.2rem] bg-gradient-to-b from-[#3a3d45] via-[#15171c] to-[#2b2e35] p-[3px]
        shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.05rem] bg-ink-900">
        <img
          src={src}
          alt={alt}
          width={945}
          height={2048}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          className="h-full w-full object-cover"
        />
      </div>
      {/* Glass edge: a single inner highlight, no neon glow. */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_0_0_1px_rgba(255,255,255,0.07)]" />
    </div>
  );
}

/** The single download CTA. One label, one intent, used everywhere on the page. */
export function PlayStoreButton({
  campaign,
  className = '',
  size = 'lg',
}: {
  /** De dónde sale el clic (header, hero, download…), para `playUrl`. */
  campaign: string;
  className?: string;
  size?: 'md' | 'lg';
}) {
  return (
    <a
      href={playUrl(campaign)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 rounded-full bg-brand font-semibold text-white
        transition-colors duration-200 hover:bg-brand-light active:translate-y-[1px]
        ${size === 'lg' ? 'px-7 py-4 text-base' : 'px-5 py-3 text-sm'} ${className}`}
    >
      <img src="/google_play_logo.png" alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
      <span className="whitespace-nowrap">Get it on Google Play</span>
    </a>
  );
}
