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

export const APP_STORE_URL = 'https://apps.apple.com/app/id6826789436';

/** Mismo botón que Play pero hacia la ficha de la App Store; `ct` es la campaña de App Analytics. */
export function AppStoreButton({
  campaign,
  className = '',
  size = 'lg',
}: {
  campaign: string;
  className?: string;
  size?: 'md' | 'lg';
}) {
  return (
    <a
      href={`${APP_STORE_URL}?ct=${encodeURIComponent(campaign)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 rounded-full border border-white/15 font-semibold text-fg
        transition-colors duration-200 hover:border-white/40 active:translate-y-[1px]
        ${size === 'lg' ? 'px-7 py-4 text-base' : 'px-5 py-3 text-sm'} ${className}`}
    >
      <svg viewBox="0 0 384 512" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
      </svg>
      <span className="whitespace-nowrap">Download on the App Store</span>
    </a>
  );
}

/** Los dos botones de descarga juntos, con la misma campaña. */
export function StoreButtons({
  campaign,
  className = '',
  size = 'lg',
}: {
  campaign: string;
  className?: string;
  size?: 'md' | 'lg';
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <PlayStoreButton campaign={campaign} size={size} />
      <AppStoreButton campaign={campaign} size={size} />
    </div>
  );
}
