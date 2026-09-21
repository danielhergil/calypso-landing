import React from 'react';
import { Reveal } from './ui';

type Cell =
  | { kind: 'photo'; title: string; body: string; src: string; alt: string }
  | { kind: 'text'; title: string; body: string; stat: string; statLabel: string };

// Two photographs shot at 4:3 and shown at 4:3, two typographic tiles.
const CELLS: Cell[] = [
  {
    kind: 'photo',
    title: 'Teams with badges',
    body: 'Save crests, squads and lineups once. They are waiting the next time you go live.',
    src: '/shots/feat-badges.webp',
    alt: 'Football shirts hanging in a dark dressing room, crests catching the light',
  },
  {
    kind: 'text',
    title: 'Your quality, your call',
    body: 'Set the resolution, bitrate and frame rate the venue can actually carry.',
    stat: '1080p',
    statLabel: 'default, at 30fps',
  },
  {
    kind: 'text',
    title: 'Stream keys, organized',
    body: 'Create, rename and copy keys in the app. No hunting through a studio dashboard.',
    stat: 'RTMP',
    statLabel: 'any destination',
  },
  {
    kind: 'photo',
    title: 'Schedule from the bench',
    body: 'Title, time, privacy and thumbnail. The stream is waiting when the whistle goes.',
    src: '/shots/feat-bench.webp',
    alt: 'A coach on a bench beside a floodlit pitch at dusk, phone resting next to them',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-28" aria-labelledby="features-heading">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
        <Reveal>
          <h2
            id="features-heading"
            className="max-w-[18ch] font-heading text-4xl font-extrabold leading-[1.02] tracking-[-0.025em] sm:text-5xl lg:text-6xl"
          >
            Set up once. Go live all season.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:gap-5">
          {CELLS.map((cell, i) =>
            cell.kind === 'photo' ? (
              <Reveal
                key={cell.title}
                delay={i * 0.07}
                className="group relative aspect-[4/3] overflow-hidden rounded-card border border-white/[0.07]"
              >
                <img
                  src={cell.src}
                  alt={cell.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 scrim-bottom" />
                <div className="relative flex h-full flex-col justify-end p-7 lg:p-9">
                  <h3 className="font-heading text-2xl font-bold tracking-tight">{cell.title}</h3>
                  <p className="mt-2 max-w-[40ch] text-[15px] leading-relaxed text-fg-muted">{cell.body}</p>
                </div>
              </Reveal>
            ) : (
              <Reveal
                key={cell.title}
                delay={i * 0.07}
                className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-card border border-white/[0.07] bg-[radial-gradient(130%_120%_at_0%_0%,rgba(240,74,66,0.3)_0%,rgba(240,74,66,0.05)_42%,#121317_100%)] p-7 lg:p-9"
              >
                <p className="font-heading text-[3.5rem] font-extrabold leading-none tracking-[-0.04em] text-brand lg:text-[4.5rem]">
                  {cell.stat}
                  <span className="mt-2 block font-body text-sm font-normal tracking-normal text-fg-faint">
                    {cell.statLabel}
                  </span>
                </p>
                <div>
                  <h3 className="font-heading text-2xl font-bold tracking-tight">{cell.title}</h3>
                  <p className="mt-2 max-w-[40ch] text-[15px] leading-relaxed text-fg-muted">{cell.body}</p>
                </div>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Features;
