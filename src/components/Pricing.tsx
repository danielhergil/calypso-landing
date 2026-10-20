import React from 'react';
import { Check, Minus } from 'lucide-react';
import { playUrl, Reveal } from './ui';

type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period?: string;
  secondary: string;
  /** Lo mismo que enseña la pantalla de planes de la app (PlanesActivity) y sus límites. */
  rows: { label: string; included: boolean }[];
  cta: string;
  campaign: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Go live today, no card',
    price: '0 €',
    secondary: 'Free forever, no ads',
    rows: [
      { label: 'Stream over RTMP/RTMPS to YouTube, Facebook, Twitch and more', included: true },
      { label: 'Live scoreboard and built-in overlays', included: true },
      { label: 'Local recording', included: true },
      { label: '2 teams and 1 stream profile', included: true },
      { label: 'No Calypso watermark', included: false },
    ],
    cta: 'Get it on Google Play',
    campaign: 'pricing-free',
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For a match most weekends',
    price: '5,99 €',
    period: '/month',
    secondary: 'or 49,99 € a year, saving 30%',
    rows: [
      { label: 'Everything in Free', included: true },
      { label: 'No Calypso watermark', included: true },
      { label: 'Replays and clips', included: true },
      { label: 'YouTube Live from the app, no stream keys', included: true },
      { label: 'USB camera and video file as a source', included: true },
      { label: '1440p and H265', included: true },
      { label: 'Arena and HUD overlay styles', included: true },
      { label: '5 teams and 5 stream profiles', included: true },
    ],
    cta: 'Get Pro in the app',
    campaign: 'pricing-pro',
    featured: true,
  },
  {
    id: 'max',
    name: 'Max',
    tagline: 'For clubs and full competitions',
    price: '12,99 €',
    period: '/month',
    secondary: 'or 109,99 € a year, saving 29%',
    rows: [
      { label: 'Everything in Pro', included: true },
      { label: 'Remote camera: a second phone as another angle', included: true },
      { label: 'Unlimited teams and stream profiles', included: true },
    ],
    cta: 'Get Max in the app',
    campaign: 'pricing-max',
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 lg:py-28" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
        <Reveal>
          <h2
            id="pricing-heading"
            className="max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Free to go live. Pro when it&rsquo;s your club on screen.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-fg-muted">
            Free streams anywhere with no ads. Pro removes the Calypso watermark and adds replays, YouTube Live and
            more. Paid plans are bought inside the Android app.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3 lg:items-center">
          {PLANS.map((plan, i) => (
            <Reveal
              key={plan.id}
              delay={i * 0.08}
              className={`relative flex flex-col rounded-card border p-7 lg:p-8 ${
                plan.featured
                  ? 'border-brand/50 bg-gradient-to-b from-brand/15 to-ink-800 lg:-my-6 lg:py-14'
                  : 'border-white/[0.07] bg-ink-800'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Recommended
                </span>
              )}

              <h3 className="font-heading text-2xl font-bold tracking-tight">{plan.name}</h3>
              <p className="mt-1 text-sm text-fg-muted">{plan.tagline}</p>

              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="font-heading text-5xl font-extrabold tracking-tight">{plan.price}</span>
                {plan.period && <span className="text-sm text-fg-muted">{plan.period}</span>}
              </p>
              <p className="mt-2 text-sm text-fg-faint">{plan.secondary}</p>

              <ul className="mt-7 space-y-3 border-t border-white/[0.07] pt-7">
                {plan.rows.map((row) => (
                  <li key={row.label} className="flex items-start gap-3 text-sm">
                    {row.included ? (
                      <Check size={18} className="mt-0.5 shrink-0 text-brand" strokeWidth={2.5} />
                    ) : (
                      <Minus size={18} className="mt-0.5 shrink-0 text-fg-faint" strokeWidth={2.5} />
                    )}
                    <span className={row.included ? 'text-fg' : 'text-fg-faint'}>{row.label}</span>
                  </li>
                ))}
              </ul>

              <a
                href={playUrl(plan.campaign)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 block rounded-full px-6 py-3.5 text-center text-sm font-semibold transition-colors duration-200 active:translate-y-[1px] ${
                  plan.featured
                    ? 'bg-brand text-white hover:bg-brand-light'
                    : 'border border-white/15 text-fg hover:border-white/35'
                }`}
              >
                {plan.cta}
              </a>
            </Reveal>
          ))}
        </div>

        {/* Las suscripciones se cobran por Google Play, así que se compran, se
            gestionan y se cancelan allí. La web no vende ni pide login. */}
        <div className="mt-10 text-center">
          <a
            href="https://play.google.com/store/account/subscriptions"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-fg-muted underline underline-offset-4 transition-colors hover:text-fg"
          >
            Manage subscription on Google Play
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
