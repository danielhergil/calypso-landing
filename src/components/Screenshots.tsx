import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Reveal } from './ui';

const SHOTS = [
  { src: '/shots/signup.webp', caption: 'Sign up free, or continue with Google.' },
  { src: '/shots/scoreboard.webp', caption: 'Score, fouls and periods from the camera screen.' },
  { src: '/shots/teams.webp', caption: 'Badges, players and lineups per team.' },
  { src: '/shots/schedule.webp', caption: 'Schedule the broadcast before kickoff.' },
  { src: '/shots/youtube.webp', caption: 'The YouTube stream starts when the video arrives.' },
  { src: '/shots/keys.webp', caption: 'Stream keys created and copied in-app.' },
];

const Screenshots = () => {
  const railRef = useRef<HTMLUListElement>(null);

  const scrollRail = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * (rail.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section id="screenshots" className="overflow-hidden py-20 lg:py-28" aria-labelledby="screenshots-heading">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
        <Reveal className="flex items-end justify-between gap-6">
          <h2
            id="screenshots-heading"
            className="max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl"
          >
            Every screen, on the touchline.
          </h2>

          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              onClick={() => scrollRail(-1)}
              aria-label="Previous screens"
              className="rounded-full border border-white/15 p-3 text-fg transition-colors hover:border-brand hover:text-brand-light active:translate-y-[1px]"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scrollRail(1)}
              aria-label="More screens"
              className="rounded-full border border-white/15 p-3 text-fg transition-colors hover:border-brand hover:text-brand-light active:translate-y-[1px]"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <ul
          ref={railRef}
          className="rail mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:mt-14 lg:px-10"
        >
          {SHOTS.map((shot) => (
            <li key={shot.src} className="w-[260px] shrink-0 snap-start sm:w-[300px]">
              <img
                src={shot.src}
                alt={shot.caption}
                loading="lazy"
                className="aspect-[9/16] w-full rounded-card border border-white/[0.07] object-cover"
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
};

export default Screenshots;
