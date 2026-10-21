import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { PlayStoreButton } from './ui';

// Vídeos cortos de cada función, grabados en la app (calypso-rootencoder/docs/SHORTS_TUTORIALES.md).
// Los archivos están en public/tutorials: NN-nombre.mp4 (720×1280, sin sonido) y NN-nombre.webp (portada).
// ponytail: el pádel (#11) y el tenis (#12) enseñan los interruptores de la versión 48; se añaden aquí
// cuando la 48 esté en producción.

type Tutorial = { id: string; file: string; title: string; text: string; secs: number; pro?: boolean };
type Chapter = { id: string; title: string; text: string; items: Tutorial[] };

const CHAPTERS: Chapter[] = [
  {
    id: 'start',
    title: 'Get started',
    text: 'Connect your channel and go live for the first time.',
    items: [
      { id: 'first-stream', file: '01-first-stream', title: 'Your first live stream on YouTube', text: 'Paste the stream key from YouTube Studio and you are ready.', secs: 38 },
      { id: 'other-platforms', file: '03-other-platforms', title: 'Twitch and Facebook', text: 'Create a profile, tap Twitch and the server address fills in.', secs: 70 },
      { id: 'stream-profiles', file: '24-stream-profiles', title: 'Stream profiles', text: 'Weak signal at the ground? Lower the quality and load the profile.', secs: 55 },
    ],
  },
  {
    id: 'teams',
    title: 'Your teams',
    text: 'Badges, names and players, ready for every match.',
    items: [
      { id: 'create-team', file: '04-create-team', title: 'Create a team', text: 'Badge, name and a three-letter alias for the scoreboard.', secs: 52 },
      { id: 'lineup', file: '05-lineup', title: 'Players and lineup', text: 'Add the players with their numbers and show both lineups.', secs: 63 },
    ],
  },
  {
    id: 'scoreboard',
    title: 'A scoreboard for your sport',
    text: 'Pick the sport and the scoreboard counts the way it is played.',
    items: [
      { id: 'football', file: '06-football', title: 'Football', text: 'Goals, the match clock and the half.', secs: 66 },
      { id: 'futsal', file: '07-futsal', title: 'Futsal', text: 'Goals, accumulated fouls, half and clock.', secs: 67 },
      { id: 'basketball', file: '08-basketball', title: 'Basketball', text: '+1, +2 and +3, team fouls, quarters and a countdown.', secs: 76 },
      { id: 'handball', file: '09-handball', title: 'Handball', text: 'Goals, half and the match clock.', secs: 61 },
      { id: 'volleyball', file: '10-volleyball', title: 'Volleyball', text: 'Points and sets: tap SET and the team ahead wins it.', secs: 54 },
      { id: 'roller-hockey', file: '13-roller-hockey', title: 'Roller hockey', text: 'Goals, team fouls and the half.', secs: 60 },
      { id: 'other-sport', file: '14-other-sport', title: 'Any other sport', text: 'Teams, badges and the score, for everything else.', secs: 49 },
    ],
  },
  {
    id: 'graphics',
    title: 'Match graphics',
    text: 'Look like a TV broadcast before, during and after the match.',
    items: [
      { id: 'scoreboard-styles', file: '15-scoreboard-styles', title: 'Scoreboard styles', text: 'Grafito, Marino or Claro, and change it mid-match.', secs: 53, pro: true },
      { id: 'cover', file: '16-cover', title: 'Match cover', text: 'Both badges and the matchday, before kick-off.', secs: 30 },
      { id: 'lower-third', file: '17-lower-third', title: 'Lower third', text: 'Teams, score and your own label along the bottom.', secs: 29 },
    ],
  },
  {
    id: 'live',
    title: 'During the match',
    text: 'Replays, recordings and changes without stopping the stream.',
    items: [
      { id: 'replays', file: '20-replays', title: 'Live replays', text: 'Show the last 10 seconds again. Every replay is saved.', secs: 72, pro: true },
      { id: 'live-quality', file: '25-live-quality', title: 'Change the quality live', text: 'Lower the bitrate if the connection struggles. The stream never stops.', secs: 28 },
      { id: 'record-match', file: '26-record-match', title: 'Record the match', text: 'Keep the whole match on your phone, no internet needed.', secs: 37 },
      { id: 'video-in-stream', file: '29-video-in-stream', title: 'Play a video live', text: 'Put a sponsor or halftime video on the stream and come back.', secs: 40, pro: true },
    ],
  },
];

const ALL = CHAPTERS.flatMap((c) => c.items);
const HERO = ['20-replays', '08-basketball', '16-cover'];
const TOTAL_MIN = Math.round(ALL.reduce((s, t) => s + t.secs, 0) / 60);
const clock = (secs: number) => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;

const ProPill = () => (
  <span className="rounded-full bg-brand px-2 py-0.5 font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-white">
    Pro
  </span>
);

const Card = ({ t, onOpen }: { t: Tutorial; onOpen: () => void }) => (
  <li>
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full text-left focus-visible:outline-none"
      aria-label={`Play: ${t.title}`}
    >
      <div
        className="relative aspect-[9/16] overflow-hidden rounded-[1.6rem] bg-ink-700 ring-1 ring-white/10 transition duration-300
          group-hover:-translate-y-1 group-hover:ring-brand/60 group-focus-visible:ring-2 group-focus-visible:ring-brand"
      >
        <img
          src={`/tutorials/${t.file}.webp`}
          alt=""
          width={540}
          height={960}
          loading="lazy"
          className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
        <span
          className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full
            bg-brand/90 text-white shadow-[0_10px_30px_-8px_rgba(240,74,66,0.8)] transition duration-300 group-hover:scale-110"
        >
          <Play size={22} className="ml-0.5" fill="currentColor" />
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-ink-900/80 px-2.5 py-1 text-xs font-semibold tabular-nums text-fg">
          {clock(t.secs)}
        </span>
        {t.pro && (
          <span className="absolute right-3 top-3">
            <ProPill />
          </span>
        )}
      </div>
      <h3 className="mt-4 font-heading text-base font-bold leading-snug text-white">{t.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-fg-muted">{t.text}</p>
    </button>
  </li>
);

/** El reproductor: el vídeo vertical a pantalla completa, con anterior/siguiente y Esc para cerrar. */
const Player = ({ index, onClose, onGo }: { index: number; onClose: () => void; onGo: (i: number) => void }) => {
  const t = ALL[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const prev = index > 0 ? () => onGo(index - 1) : undefined;
  const next = index < ALL.length - 1 ? () => onGo(index + 1) : undefined;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev?.();
      if (e.key === 'ArrowRight') next?.();
    };
    window.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, prev, next]);

  const chapter = CHAPTERS.find((c) => c.items.includes(t));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="flex max-h-full w-full max-w-4xl flex-col items-center gap-6 md:flex-row md:items-center md:gap-10"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          key={t.file}
          src={`/tutorials/${t.file}.mp4`}
          poster={`/tutorials/${t.file}.webp`}
          className="max-h-[62dvh] w-auto max-w-full rounded-[1.6rem] bg-ink-800 ring-1 ring-white/10 md:max-h-[86dvh]"
          autoPlay
          muted
          loop
          playsInline
          controls
        />
        <div className="w-full max-w-sm text-center md:text-left">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-brand-light">{chapter?.title}</p>
          <h2 className="mt-2 flex items-center justify-center gap-2 font-heading text-2xl font-bold text-white md:justify-start">
            {t.title} {t.pro && <ProPill />}
          </h2>
          <p className="mt-2 leading-relaxed text-fg-muted md:mt-3">{t.text}</p>
          <p className="mt-3 text-sm text-fg-faint">
            {index + 1} of {ALL.length} · {clock(t.secs)}
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 md:mt-6 md:justify-start">
            <button
              type="button"
              onClick={prev}
              disabled={!prev}
              aria-label="Previous video"
              className="rounded-full border border-white/15 p-3 text-fg transition hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!next}
              aria-label="Next video"
              className="rounded-full border border-white/15 p-3 text-fg transition hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
      >
        <X size={20} />
      </button>
    </div>
  );
};

const Tutorials = () => {
  const [open, setOpen] = useState<number | null>(null);

  // Cada vídeo tiene su enlace (/tutorials#football) para poder mandárselo a alguien.
  useEffect(() => {
    const fromHash = () => {
      const i = ALL.findIndex((t) => `#${t.id}` === window.location.hash);
      setOpen(i >= 0 ? i : null);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const go = useCallback((i: number) => {
    history.replaceState(null, '', `#${ALL[i].id}`);
    setOpen(i);
  }, []);
  const close = useCallback(() => {
    history.replaceState(null, '', window.location.pathname);
    setOpen(null);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-ink-900 text-white">
      <div className="mx-auto max-w-page px-4 py-12 sm:px-6 lg:px-10 lg:py-20">
        <a
          href="/"
          className="mb-10 inline-flex items-center space-x-2 text-fg-muted transition-colors duration-200 hover:text-white"
        >
          <ArrowLeft size={18} />
          <span>Back to home</span>
        </a>

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
        <header className="max-w-3xl">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-brand-light">Video tutorials</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
            Learn Calypso, one minute at a time
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-fg-muted">
            Short videos recorded in the app, step by step: from your first stream to replays during the match. Pick
            the one you need, or watch them in order.
          </p>
          <p className="mt-6 text-sm text-fg-faint">
            {ALL.length} videos · about {TOTAL_MIN} minutes in total · no sound needed
          </p>
        </header>

        {/* Tres portadas en abanico: lo que hay dentro, antes de bajar. */}
        <div aria-hidden="true" className="relative mx-auto hidden h-[440px] w-[420px] lg:block">
          {HERO.map((file, i) => (
            <img
              key={file}
              src={`/tutorials/${file}.webp`}
              alt=""
              width={540}
              height={960}
              className="absolute top-0 h-[400px] w-auto rounded-[1.6rem] ring-1 ring-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
              style={{
                left: `${i * 105}px`,
                transform: `rotate(${(i - 1) * 7}deg) translateY(${i === 1 ? 0 : 24}px)`,
                zIndex: i === 1 ? 2 : 1,
              }}
            />
          ))}
        </div>
        </div>

        <nav
          aria-label="Chapters"
          className="sticky top-0 z-30 -mx-4 mt-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b border-white/[0.07] bg-ink-900/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10"
        >
          <ol className="flex w-max gap-2">
            {CHAPTERS.map((c, i) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 px-4 py-2 text-sm text-fg-muted transition hover:border-white/25 hover:text-fg"
                >
                  <span className="font-heading font-bold tabular-nums text-brand-light">{i + 1}</span>
                  {c.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {CHAPTERS.map((c, ci) => (
          <section key={c.id} id={c.id} className="scroll-mt-20 pt-16">
            <div className="flex items-baseline gap-4">
              <span className="font-heading text-5xl font-extrabold tabular-nums text-white/10 sm:text-6xl">
                {String(ci + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">{c.title}</h2>
                <p className="mt-1 text-fg-muted">{c.text}</p>
              </div>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {c.items.map((t) => (
                <Card key={t.id} t={t} onOpen={() => go(ALL.indexOf(t))} />
              ))}
            </ul>
          </section>
        ))}

        <section className="mt-24 rounded-card border border-white/[0.07] bg-ink-800 p-8 sm:p-12">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">Ready for your next match?</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-fg-muted">
            Calypso is free to install. Pro adds replays, scoreboard styles, videos on the stream and no watermark. For
            setting up a whole match, read the <a href="/guides" className="font-semibold text-brand-light underline-offset-4 hover:underline">guides</a>.
          </p>
          <div className="mt-8">
            <PlayStoreButton campaign="tutorials" />
          </div>
        </section>
      </div>

      {open !== null && <Player index={open} onClose={close} onGo={go} />}
    </div>
  );
};

export default Tutorials;
