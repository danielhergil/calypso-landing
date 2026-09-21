import React, { useEffect, useState } from 'react';
import { Play, X } from 'lucide-react';
import { Reveal } from './ui';

const YOUTUBE_ID = 'dgZtXBVLy1k';

const VideoSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <section id="video" className="py-20 lg:py-28" aria-labelledby="video-heading">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
        <Reveal>
          <h2
            id="video-heading"
            className="max-w-[18ch] font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl"
          >
            Three minutes, kickoff to stream.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-fg-muted">
            The full run-through: set up the teams, go live, and run the scoreboard from the camera.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Play the Calypso demo video"
            className="group relative block aspect-video w-full overflow-hidden rounded-card border border-white/[0.07]"
          >
            <img
              src="/shots/demo-poster.webp"
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-ink-900/35 transition-colors duration-300 group-hover:bg-ink-900/20" />
            <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-2xl transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
              <Play size={30} className="ml-1 fill-current" />
            </span>
          </button>
        </Reveal>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Calypso demo video"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/95 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close video"
              className="absolute -top-12 right-0 rounded-full border border-white/15 p-2 text-fg transition-colors hover:border-brand hover:text-brand-light"
            >
              <X size={20} />
            </button>
            <iframe
              title="Calypso demo"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
              className="aspect-video w-full rounded-card"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
