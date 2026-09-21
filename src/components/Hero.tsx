import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';
import { PlayStoreButton } from './ui';

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
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <>
      <section
        className="relative overflow-hidden pt-24 pb-16 lg:min-h-[100dvh] lg:pt-24 lg:pb-0"
        aria-label="Calypso, live sports streaming from your phone"
      >
        {/* Brand glow behind the device, tinted to the one accent colour. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10%] top-1/2 h-[720px] w-[720px] -translate-y-1/2 rounded-full bg-brand/20 blur-[140px]"
        />

        <div className="relative mx-auto grid max-w-page items-center gap-10 px-4 sm:px-6 lg:min-h-[calc(100dvh-6rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:px-10">
          <div className="max-w-xl">
            <motion.h1
              {...rise(0.05)}
              className="font-heading text-[2.75rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Your match.
              <br />
              <span className="text-brand">Your broadcast.</span>
            </motion.h1>

            <motion.p {...rise(0.15)} className="mt-6 max-w-[46ch] text-lg leading-relaxed text-fg-muted">
              Camera, scoreboard, replays and your YouTube stream. One phone, one hand, no laptop on the bench.
            </motion.p>

            <motion.div {...rise(0.25)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PlayStoreButton />
              <button
                onClick={scrollToVideo}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 px-7 py-4 text-base font-semibold text-fg transition-colors duration-200 hover:border-white/35 active:translate-y-[1px]"
              >
                <Play size={18} className="text-brand" />
                Watch demo
              </button>
            </motion.div>
          </div>

          {/* The app's own Play Store render. Contained, never cropped. */}
          <div className="relative -mx-4 mt-4 sm:-mx-6 lg:mx-0 lg:mt-0">
            <img
              src="/shots/hero-phone.webp"
              alt="Calypso home screen on an Android phone, ready to start a broadcast"
              fetchPriority="high"
              width={555}
              height={1672}
              className="mx-auto h-[400px] w-auto object-contain [mask-image:radial-gradient(102%_88%_at_50%_46%,#000_38%,transparent_94%)] sm:h-[480px] lg:ml-auto lg:mr-0 lg:h-[min(86dvh,820px)]"
            />
          </div>
        </div>
      </section>

      {/* Logo wall sits under the hero, never inside it. */}
      <section className="border-y border-white/[0.07] bg-ink-800/40" aria-label="Supported streaming platforms">
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
