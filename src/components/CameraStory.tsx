import React from 'react';
import { PhoneFrame, Reveal } from './ui';

const LINES = [
  {
    title: 'Score and fouls, on the overlay',
    body: 'Tap the counters and the graphic updates live. You never leave the viewfinder.',
  },
  {
    title: 'Replays without stopping',
    body: 'Fire a replay mid-match while the broadcast keeps rolling.',
  },
  {
    title: 'Zoom, audio and camera in reach',
    body: 'Every control sits where a thumb lands, so one person can run the whole match.',
  },
];

const CameraStory = () => {
  return (
    <section className="py-20 lg:py-32" aria-labelledby="camera-heading">
      <div className="mx-auto grid max-w-page items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:gap-24 lg:px-10">
        <Reveal className="relative mx-auto w-[240px] sm:w-[280px] lg:w-full lg:max-w-[310px]">
          <div aria-hidden="true" className="absolute -inset-16 -z-10 rounded-full bg-brand/15 blur-[120px]" />
          <PhoneFrame src="/shots/app-camera.webp" alt="The Calypso camera screen filming a match, with live controls on top" />
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            id="camera-heading"
            className="max-w-[15ch] font-heading text-4xl font-extrabold leading-[1.02] tracking-[-0.025em] sm:text-5xl lg:text-6xl"
          >
            The whole match, on one screen.
          </h2>
          <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-fg-muted">
            No capture card, no second operator, no cables taped to a table.
          </p>

          <dl className="mt-10 divide-y divide-white/[0.07] border-t border-white/[0.07]">
            {LINES.map((line) => (
              <div key={line.title} className="py-5">
                <dt className="font-heading text-lg font-bold tracking-tight">{line.title}</dt>
                <dd className="mt-1.5 max-w-[52ch] text-[15px] leading-relaxed text-fg-muted">{line.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
};

export default CameraStory;
