import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PlayStoreButton } from './ui';

// Piezas comunes de las guías (/prism-scoreboard, /stream-football-match…). Cada guía solo pone su texto.
type Children = { children: React.ReactNode };

export const H2 = ({ children }: Children) => (
  <h2 className="mt-14 font-heading text-2xl font-bold text-white sm:text-3xl">{children}</h2>
);

export const P = ({ children }: Children) => <p className="mt-5 leading-relaxed text-fg-muted">{children}</p>;

export const B = ({ children }: Children) => <strong className="font-semibold text-fg">{children}</strong>;

export const A = ({ href, children }: Children & { href: string }) => (
  <a href={href} className="font-semibold text-brand-light underline-offset-4 hover:underline">
    {children}
  </a>
);

export const Steps = ({ items }: { items: React.ReactNode[] }) => (
  <ol className="mt-5 list-decimal space-y-3 pl-6 leading-relaxed text-fg-muted marker:font-semibold marker:text-brand">
    {items.map((item, i) => (
      <li key={i} className="pl-1">
        {item}
      </li>
    ))}
  </ol>
);

export const Bullets = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="mt-5 list-disc space-y-3 pl-6 leading-relaxed text-fg-muted">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

const Guide = ({
  title,
  intro,
  campaign,
  footnote,
  children,
}: Children & { title: string; intro: React.ReactNode; campaign: string; footnote?: string }) => (
  <div className="min-h-[100dvh] bg-ink-900 text-white">
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <a
        href="/"
        className="mb-8 inline-flex items-center space-x-2 text-fg-muted transition-colors duration-200 hover:text-white"
      >
        <ArrowLeft size={18} />
        <span>Back to home</span>
      </a>

      <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-fg-muted">{intro}</p>

      {children}

      <div className="mt-12 flex flex-col items-start gap-4">
        <PlayStoreButton campaign={campaign} />
        <p className="text-sm text-fg-faint">Free to install. Pro and Max are bought inside the app.</p>
      </div>

      {footnote && <p className="mt-12 text-xs leading-relaxed text-fg-faint">{footnote}</p>}
    </article>
  </div>
);

export default Guide;
