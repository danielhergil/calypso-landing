import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PlayStoreButton } from './ui';

// Guía para quien busca «PRISM scoreboard». Pasos de PRISM sacados de su guía oficial
// (guide.prismlive.com, «Using overlays.uno scoreboard»), consultada el 20-oct-2026.
const CHECKED = 'October 2026';

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-14 font-heading text-2xl font-bold text-white sm:text-3xl">{children}</h2>
);

const Steps = ({ items }: { items: React.ReactNode[] }) => (
  <ol className="mt-5 list-decimal space-y-3 pl-6 leading-relaxed text-fg-muted marker:font-semibold marker:text-brand">
    {items.map((item, i) => (
      <li key={i} className="pl-1">
        {item}
      </li>
    ))}
  </ol>
);

const B = ({ children }: { children: React.ReactNode }) => <strong className="font-semibold text-fg">{children}</strong>;

const PrismScoreboard = () => (
  <div className="min-h-[100dvh] bg-ink-900 text-white">
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <a
        href="/"
        className="mb-8 inline-flex items-center space-x-2 text-fg-muted transition-colors duration-200 hover:text-white"
      >
        <ArrowLeft size={18} />
        <span>Back to home</span>
      </a>

      <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
        How to add a live scoreboard to PRISM Live Studio
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-fg-muted">
        PRISM doesn&rsquo;t have a scoreboard of its own. On the phone app you add one through{' '}
        <B>overlays.uno</B>, a partner service, or through a web widget from another scoreboard site. Here is how
        to do it, step by step, and a simpler option if what you stream is a match.
      </p>

      <H2>Option 1: overlays.uno inside PRISM</H2>
      <p className="mt-4 leading-relaxed text-fg-muted">
        You need PRISM 5.3.0 or later on Android (3.12.0 on iOS) and an overlays.uno account.
      </p>
      <Steps
        items={[
          <>
            Create an account at <B>overlays.uno</B>.
          </>,
          <>
            In PRISM, open <B>My Studio</B>, go to the widget list and pick <B>Scoreboard via overlays.uno</B>.
          </>,
          'Connect your overlays.uno account when PRISM asks for it.',
          'Choose one of the scoreboard designs and add it as an overlay.',
          <>
            Tap <B>Controller</B> to change the teams and the score before or during the stream. You can also run
            it from a second phone by scanning the QR code or opening the shared link.
          </>,
        ]}
      />
      <p className="mt-5 leading-relaxed text-fg-muted">
        Keep in mind that the free plan of PRISM limits how many overlays you can have on screen at once (two or
        three, depending on the version) and adds a PRISM watermark, ads and an outro. PRISM Plus removes them for
        $9.99 a month or $79.99 a year.
      </p>

      <H2>Option 2: a web widget</H2>
      <Steps
        items={[
          'Create a scoreboard on a scoreboard website and copy its overlay link.',
          <>
            In PRISM, add a <B>web widget</B> and paste the link.
          </>,
          'Update the score on that website, from the same phone or from someone else’s.',
        ]}
      />
      <p className="mt-5 leading-relaxed text-fg-muted">
        It works with any site, but you are juggling two apps during the match, and if the website or the
        connection hiccups, the score on the stream freezes.
      </p>

      <H2>The simpler way for matches: Calypso</H2>
      <p className="mt-4 leading-relaxed text-fg-muted">
        Calypso is an Android app made only for streaming matches. The scoreboard is part of the app, so there is no
        second account, widget or link to set up, and it knows the rules of your sport.
      </p>
      <Steps
        items={[
          <>
            Install Calypso and tell it <B>where you stream</B> (YouTube, Facebook, Twitch or any RTMP server).
            Paste your stream key once; with Pro, YouTube connects with one tap and no key.
          </>,
          <>
            Add your <B>teams</B> with their badges and players.
          </>,
          <>
            In <B>Overlay settings</B>, choose the <B>Sport</B>: football, futsal, basketball, handball,
            volleyball, tennis, padel, roller hockey or any other sport. The scoreboard changes to fit it.
          </>,
          <>
            Pick the teams and a <B>style</B>, then go live. You score from buttons on the camera screen, without
            leaving the stream. In tennis and padel, Calypso counts 15-30-40, deuce, games and tie-breaks for you.
          </>,
        ]}
      />
      <p className="mt-5 leading-relaxed text-fg-muted">
        The free plan has no ads, only a small Calypso mark in a corner. Pro removes it, adds replays and one-tap
        YouTube, and costs 5,99 € a month or 49,99 € a year.
      </p>

      <H2>Which one to use</H2>
      <ul className="mt-5 list-disc space-y-3 pl-6 leading-relaxed text-fg-muted">
        <li>
          <B>PRISM</B> if you film with an iPhone, stream to several platforms at once, or stream games and IRL
          as well as matches.
        </li>
        <li>
          <B>Calypso</B> if you stream your club&rsquo;s matches from an Android phone and want the scoreboard,
          teams and replays in the same app.
        </li>
      </ul>
      <p className="mt-5 leading-relaxed text-fg-muted">
        Full side-by-side:{' '}
        <a href="/vs-prism" className="font-semibold text-brand-light underline-offset-4 hover:underline">
          Calypso vs PRISM Live Studio
        </a>
        .
      </p>

      <div className="mt-12 flex flex-col items-start gap-4">
        <PlayStoreButton campaign="guide-prism-scoreboard" />
        <p className="text-sm text-fg-faint">Free to install. Pro and Max are bought inside the app.</p>
      </div>

      <p className="mt-12 text-xs leading-relaxed text-fg-faint">
        PRISM steps and prices come from the official PRISM guide (guide.prismlive.com), checked in {CHECKED}. Menus
        and prices can change. PRISM Live Studio is a trademark of NAVER Corp. and overlays.uno of its owner; Calypso
        is not affiliated with either.
      </p>
    </article>
  </div>
);

export default PrismScoreboard;
