import React from 'react';
import { Radio, Rewind, Save } from 'lucide-react';
import { Reveal } from './ui';

const POINTS = [
  {
    icon: Radio,
    title: 'One tap to YouTube',
    body: 'The broadcast starts on its own as soon as Calypso sends video, and survives a dropped connection.',
  },
  {
    icon: Rewind,
    title: 'Instant replays',
    body: 'Fire a replay from the camera screen while the match keeps running.',
  },
  {
    icon: Save,
    title: 'Local recording',
    body: 'Keep a copy on the phone while you stream, or as a backup when the venue wifi gives up.',
  },
];

const Production = () => {
  return (
    <section className="relative" aria-labelledby="production-heading">
      {/* Photographed at 16:9 and shown at 16:9 on every breakpoint. */}
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/9]">
        <img
          src="/shots/band-onehand.webp"
          alt="Two hands holding a phone in landscape, filming a floodlit futsal match"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink-900/25" />
        <div className="absolute inset-x-0 bottom-0 h-3/5 scrim-bottom" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink-900 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-page px-4 pb-10 sm:px-6 lg:px-10 lg:pb-16">
            <Reveal>
              <h2
                id="production-heading"
                className="max-w-[13ch] font-heading text-4xl font-extrabold leading-[1.0] tracking-[-0.03em] sm:text-6xl lg:text-[5rem]"
              >
                One hand. The whole production.
              </h2>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
        <ul className="grid gap-px overflow-hidden rounded-card border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
          {POINTS.map((point, i) => {
            const Icon = point.icon;
            return (
              <Reveal key={point.title} as="li" delay={i * 0.08} className="bg-ink-900 p-7 lg:p-9">
                <Icon size={22} className="text-brand" strokeWidth={2} />
                <h3 className="mt-5 font-heading text-lg font-bold tracking-tight">{point.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{point.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Production;
