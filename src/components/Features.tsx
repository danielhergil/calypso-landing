import React from 'react';
import { Reveal } from './ui';

type Cell = {
  title: string;
  body: string;
  image?: { src: string; alt: string; position?: string };
  className: string;
};

const CELLS: Cell[] = [
  {
    title: 'Live scoreboard',
    body: 'Goals, fouls and periods update on the overlay while you keep filming.',
    image: {
      src: '/shots/scoreboard-crop.webp',
      alt: 'Calypso camera view with the live scoreboard overlay during a futsal match',
      position: 'object-[center_62%]',
    },
    className: 'lg:col-span-4 lg:row-span-2',
  },
  {
    title: 'Teams with badges',
    body: 'Squads, crests and lineups saved before kickoff.',
    image: {
      src: '/shots/teams-crop.webp',
      alt: 'Team list in Calypso showing club badges and squads',
      position: 'object-[70%_center]',
    },
    className: 'lg:col-span-2 lg:row-span-2',
  },
  {
    title: 'Your quality, your call',
    body: 'Pick the resolution, bitrate and frame rate the venue can actually carry. Defaults to 1080p at 30fps.',
    className: 'lg:col-span-2',
  },
  {
    title: 'Schedule from the bench',
    body: 'Title, time, privacy and thumbnail. The stream is waiting when you are.',
    image: {
      src: '/shots/schedule-crop.webp',
      alt: 'New broadcast form in Calypso with title, date, privacy and stream key',
      position: 'object-[center_28%]',
    },
    className: 'lg:col-span-2',
  },
  {
    title: 'Stream keys, organized',
    body: 'Create, rename and copy keys without leaving the app.',
    image: {
      src: '/shots/keys-crop.webp',
      alt: 'Stream keys screen in Calypso with copy and rename actions',
      position: 'object-[60%_center]',
    },
    className: 'lg:col-span-2',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-28" aria-labelledby="features-heading">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
        <Reveal>
          <h2
            id="features-heading"
            className="max-w-[16ch] font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            A whole production truck, in your pocket.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-fg-muted">
            Everything a match needs is on one screen. No capture card, no second operator, no cables.
          </p>
        </Reveal>

        <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-6">
          {CELLS.map((cell, i) => (
            <Reveal
              key={cell.title}
              delay={i * 0.06}
              className={`group relative overflow-hidden rounded-card border border-white/[0.07] ${
                cell.image ? 'bg-ink-800' : 'bg-[radial-gradient(120%_120%_at_0%_0%,rgba(240,74,66,0.32)_0%,rgba(240,74,66,0.06)_45%,#16181D_100%)]'
              } ${cell.className}`}
            >
              {cell.image && (
                <>
                  <img
                    src={cell.image.src}
                    alt={cell.image.alt}
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full object-cover ${cell.image.position ?? ''} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
                  />
                  <div className="absolute inset-0 scrim-bottom" />
                </>
              )}

              <div className="relative flex h-full flex-col justify-end p-6">
                <h3 className="font-heading text-xl font-bold tracking-tight lg:text-2xl">{cell.title}</h3>
                <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-fg-muted">{cell.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
