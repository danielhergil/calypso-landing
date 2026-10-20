import React from 'react';
import Guide from './Guide';

// Índice de comparativas y guías: el pie solo enlaza aquí, para no alargarse con cada página.
const PAGES = [
  { href: '/stream-football-match', title: 'Stream a football match', text: 'Score and clock on screen from one Android phone.' },
  { href: '/stream-basketball-game', title: 'Stream a basketball game', text: 'Points, team fouls, quarters and a countdown clock.' },
  { href: '/stream-padel-match', title: 'Stream a padel match', text: 'Points, games and sets counted for you.' },
  { href: '/prism-scoreboard', title: 'Add a scoreboard to PRISM Live Studio', text: 'With overlays.uno or a web widget, and a simpler way.' },
  { href: '/vs-prism', title: 'Calypso vs PRISM Live Studio', text: 'Side by side for streaming sports from a phone.' },
  { href: '/vs-camerafi', title: 'Calypso vs CameraFi Live', text: 'Prices, ads, watermark and sports compared.' },
];

const Guides = () => (
  <Guide
    title="Guides"
    intro="How to stream your matches from a phone, and how Calypso compares with other streaming apps."
    campaign="guides"
  >
    <ul className="mt-10 divide-y divide-white/[0.07] rounded-card border border-white/[0.07]">
      {PAGES.map((page) => (
        <li key={page.href}>
          <a href={page.href} className="block p-5 transition-colors hover:bg-ink-800">
            <span className="font-heading text-lg font-bold text-white">{page.title}</span>
            <span className="mt-1 block text-fg-muted">{page.text}</span>
          </a>
        </li>
      ))}
    </ul>
  </Guide>
);

export default Guides;
