import React from 'react';
import { PlayStoreButton, Reveal } from './ui';

const Download = () => {
  return (
    <section id="download" className="relative overflow-hidden" aria-labelledby="download-heading">
      <img
        src="/shots/cta-floodlights.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[center_38%]"
      />
      <div className="absolute inset-0 bg-ink-900/42" />
      {/* Keeps the headline above AA contrast where the floodlight is brightest. */}
      <div className="absolute inset-0 bg-[radial-gradient(58%_52%_at_50%_54%,rgba(10,10,12,0.9)_0%,rgba(10,10,12,0.5)_60%,transparent_100%)]" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink-900 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ink-900 to-transparent" />

      <div className="relative mx-auto max-w-page px-4 py-28 text-center sm:px-6 lg:px-10 lg:py-40">
        <Reveal>
          <h2
            id="download-heading"
            className="mx-auto max-w-[14ch] font-heading text-4xl font-extrabold leading-[1.0] tracking-[-0.03em] sm:text-6xl lg:text-[5.25rem]"
          >
            Your next match, live.
          </h2>
          <p className="mx-auto mt-6 max-w-[44ch] text-lg leading-relaxed text-fg-muted">
            Free on Android, no card. Upgrade only when your season needs more streams.
          </p>
          <div className="mt-9 flex justify-center">
            <PlayStoreButton />
          </div>
          <p className="mt-6 text-sm text-fg-faint">
            Android 6.0 and up. By installing Calypso you accept the{' '}
            <a href="/terms" className="underline underline-offset-4 transition-colors hover:text-fg">
              terms
            </a>{' '}
            and{' '}
            <a href="/privacy" className="underline underline-offset-4 transition-colors hover:text-fg">
              privacy policy
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Download;
