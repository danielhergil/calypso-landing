// Después de `vite build`: escribe /privacy, /terms, /vs-camerafi, /vs-prism y las guías como HTML ya renderizado.
// Los revisores de Google (YouTube API Services) y cualquier crawler sin JavaScript
// veían solo el <div id="root"> vacío de la SPA. El texto sale de los mismos
// componentes, así que no hay una segunda copia que mantener.
import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const pages = [
  { file: 'privacy.html', component: '/src/components/PrivacyPolicy.tsx', title: 'Privacy Policy', path: '/privacy', mustContain: 'YouTube' },
  { file: 'terms.html', component: '/src/components/TermsOfService.tsx', title: 'Terms of Service', path: '/terms', mustContain: 'YouTube' },
  { file: 'vs-camerafi.html', component: '/src/components/VsCameraFi.tsx', title: 'Calypso vs CameraFi Live', path: '/vs-camerafi', mustContain: 'CameraFi' },
  { file: 'vs-prism.html', component: '/src/components/VsPrism.tsx', title: 'Calypso vs PRISM Live Studio', path: '/vs-prism', mustContain: 'PRISM',
    description: 'Calypso vs PRISM Live Studio for streaming sports from a phone: built-in scoreboard per sport, prices, ads and watermark compared.' },
  { file: 'prism-scoreboard.html', component: '/src/components/PrismScoreboard.tsx', title: 'How to add a live scoreboard to PRISM Live Studio', path: '/prism-scoreboard', mustContain: 'overlays.uno',
    description: 'Step by step: add a live scoreboard to PRISM Live Studio with overlays.uno or a web widget, and a simpler way to stream matches with the score built in.' },
  { file: 'stream-football-match.html', component: '/src/components/FootballGuide.tsx', title: 'How to live stream a football match from your phone, with a scoreboard', path: '/stream-football-match', mustContain: 'Football',
    description: 'Stream a football match to YouTube, Facebook or Twitch from one Android phone, with the score and the clock on screen: what you need, where to put the phone and how to run the scoreboard.' },
  { file: 'stream-padel-match.html', component: '/src/components/PadelGuide.tsx', title: 'How to live stream a padel match from your phone, with a scoreboard', path: '/stream-padel-match', mustContain: 'Padel',
    description: 'Stream a padel match to YouTube, Facebook or Twitch from one Android phone, with points, games and sets counted for you: what you need, where to put the phone and how to score.' },
  { file: 'stream-basketball-game.html', component: '/src/components/BasketballGuide.tsx', title: 'How to live stream a basketball game from your phone, with a scoreboard', path: '/stream-basketball-game', mustContain: 'Basketball',
    description: 'Stream a basketball game to YouTube, Facebook or Twitch from one Android phone, with score, quarter, team fouls and a countdown clock on screen: what you need and how to run it.' },
];

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
try {
  const shell = await readFile('dist/index.html', 'utf8');
  const { default: Footer } = await vite.ssrLoadModule('/src/components/Footer.tsx');
  for (const page of pages) {
    const { default: Page } = await vite.ssrLoadModule(page.component);
    const body = renderToStaticMarkup(
      createElement('div', { className: 'min-h-[100dvh] bg-ink-900 text-fg' }, createElement(Page), createElement(Footer))
    );
    const html = shell
      .replace(/<title>[^<]*<\/title>/, `<title>${page.title} | Calypso</title>`)
      .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="https://www.calypso-app.es${page.path}"`)
      .replace(/<meta name="description" content="[^"]*"/, (m) => (page.description ? `<meta name="description" content="${page.description}"` : m))
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    if (!body.includes(page.mustContain)) throw new Error(`${page.file}: el render no contiene «${page.mustContain}»`);
    await writeFile(`dist/${page.file}`, html);
    console.log(`prerender: dist/${page.file}`);
  }
} finally {
  await vite.close();
}
