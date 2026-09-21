import React from 'react';
import { PlayStoreButton, Reveal } from './ui';

const Download = () => {
  return (
    <section id="download" className="relative overflow-hidden" aria-labelledby="download-heading">
      <img
        src="/shots/logo.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.11] lg:h-[680px] lg:w-[680px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[130px]"
      />

      <div className="relative mx-auto max-w-page px-4 py-24 text-center sm:px-6 lg:px-10 lg:py-32">
        <Reveal>
          <h2
            id="download-heading"
            className="mx-auto max-w-[14ch] font-heading text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl"
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
