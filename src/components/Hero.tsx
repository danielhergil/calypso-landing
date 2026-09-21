import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';
import { PhoneFrame, PlayStoreButton } from './ui';

const PLATFORMS = [
  { name: 'YouTube', slug: 'youtube' },
  { name: 'Twitch', slug: 'twitch' },
  { name: 'Facebook Live', slug: 'facebook' },
];

const Hero = () => {
  const reduced = useReducedMotion();

  const scrollToVideo = () => {
    document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' });
  };

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <>
      <section
        className="relative isolate overflow-hidden pt-24 lg:min-h-[100dvh]"
        aria-label="Calypso, live sports streaming from your phone"
      >
        {/* Each viewport gets the photograph shot for its shape: 3:4 on phones,
            3:2 on desktop. Nothing is squeezed into the wrong frame. */}
        <picture>
          <source media="(min-width: 768px)" srcSet="/shots/hero-wide.webp" />
          <img
            src="/shots/hero-tall.webp"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0A0A0C_8%,rgba(10,10,12,0.92)_38%,rgba(10,10,12,0.45)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-ink-900 to-transparent" />

        <div className="mx-auto grid max-w-page items-center gap-12 px-4 pb-16 sm:px-6 lg:min-h-[calc(100dvh-6rem)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-10 lg:pb-0">
          <div className="max-w-2xl">
            <motion.h1
              {...rise(0.05)}
              className="font-heading text-[2.9rem] font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-[5.25rem]"
            >
              Your match.
              <br />
              <span className="text-brand">Your broadcast.</span>
            </motion.h1>

            <motion.p {...rise(0.16)} className="mt-7 max-w-[44ch] text-lg leading-relaxed text-fg-muted lg:text-xl">
              Camera, scoreboard and live stream in one app. One phone on the touchline, no laptop, no crew.
            </motion.p>

            <motion.div {...rise(0.28)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PlayStoreButton />
              <button
                onClick={scrollToVideo}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 px-7 py-4 text-base font-semibold text-fg backdrop-blur-sm transition-colors duration-200 hover:border-white/40 active:translate-y-[1px]"
              >
                <Play size={17} className="fill-brand text-brand" />
                Watch demo
              </button>
            </motion.div>
          </div>

          <motion.div
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, y: 40 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const },
                })}
            className="relative mx-auto w-[240px] sm:w-[272px] lg:flex lg:h-[min(74dvh,660px)] lg:w-full lg:justify-end"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-14 -z-10 rounded-full bg-brand/20 blur-[110px]"
            />
            <PhoneFrame
              src="/shots/app-home.webp"
              alt="The Calypso home screen, ready to start a broadcast"
              priority
              className="w-full lg:h-full lg:w-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Logo wall sits under the hero, never inside it. */}
      <section className="border-y border-white/[0.07] bg-ink-800/50" aria-label="Supported streaming platforms">
        <div className="mx-auto flex max-w-page flex-col items-center gap-5 px-4 py-7 sm:flex-row sm:justify-center sm:gap-12 sm:px-6 lg:px-10">
          <p className="text-sm text-fg-faint">Goes live on</p>
          <ul className="flex items-center gap-10">
            {PLATFORMS.map((platform) => (
              <li key={platform.slug}>
                <img
                  src={`https://cdn.simpleicons.org/${platform.slug}/6B6B75`}
                  alt={platform.name}
                  loading="lazy"
                  className="h-6 w-6 opacity-80 sm:h-7 sm:w-7"
                />
              </li>
            ))}
          </ul>
          <p className="text-sm text-fg-faint">and any RTMP server</p>
        </div>
      </section>
    </>
  );
};

export default Hero;
