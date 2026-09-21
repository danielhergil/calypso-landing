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
      <div className="relative min-h-[520px] overflow-hidden lg:min-h-[640px]">
        <img
          src="/shots/one-hand.webp"
          alt="A phone held in both hands running Calypso, filming a futsal match"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-[center_68%]"
        />
        <div className="absolute inset-0 bg-ink-900/30" />
        <div className="absolute inset-0 scrim-bottom" />

        <div className="relative mx-auto flex min-h-[520px] max-w-page flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:min-h-[640px] lg:px-10 lg:pb-20">
          <Reveal>
            <h2
              id="production-heading"
              className="max-w-[14ch] font-heading text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-5xl lg:text-7xl"
            >
              One hand. The whole production.
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
        <ul className="grid gap-px overflow-hidden rounded-card border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
          {POINTS.map((point, i) => {
            const Icon = point.icon;
            return (
              <Reveal key={point.title} as="li" delay={i * 0.08} className="bg-ink-900 p-6 lg:p-8">
                <Icon size={22} className="text-brand" strokeWidth={2} />
                <h3 className="mt-4 font-heading text-lg font-bold tracking-tight">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{point.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Production;
