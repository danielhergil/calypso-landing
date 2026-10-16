import React from 'react';
import { ArrowLeft, Check, Minus } from 'lucide-react';
import { PlayStoreButton } from './ui';

// Datos de CameraFi: ficha de Google Play y web oficial, consultadas en octubre de 2026
// (docs/CONVERSION_VS_CAMERAFI.md en calypso-rootencoder). Revisar antes de cambiar precios.
const CHECKED = 'October 2026';

type Cell = { text: string; good?: boolean };
const ROWS: { label: string; calypso: Cell; camerafi: Cell }[] = [
  {
    label: 'Price to remove the watermark',
    calypso: { text: '5,99 €/month or 49,99 €/year (Pro)', good: true },
    camerafi: { text: '$10.99/month on Android' },
  },
  {
    label: 'Ads in the free plan',
    calypso: { text: 'None', good: true },
    camerafi: { text: 'Yes' },
  },
  {
    label: 'Watermark in the free plan',
    calypso: { text: 'Small Calypso mark' },
    camerafi: { text: 'CameraFi mark' },
  },
  {
    label: 'Where you can stream',
    calypso: { text: 'Any RTMP/RTMPS server: YouTube, Facebook, Twitch and more', good: true },
    camerafi: { text: 'RTMP, SRT, YouTube, Facebook, Twitch', good: true },
  },
  {
    label: 'YouTube Live without copying stream keys',
    calypso: { text: 'Yes, in Pro', good: true },
    camerafi: { text: 'Yes', good: true },
  },
  {
    label: 'Replays during the live stream',
    calypso: { text: 'Yes, in Pro', good: true },
    camerafi: { text: 'Yes', good: true },
  },
  {
    label: 'Sport-specific scoreboards',
    calypso: { text: 'Roller hockey and a universal score' },
    camerafi: { text: '30+ sports', good: true },
  },
  {
    label: 'Phones',
    calypso: { text: 'Android' },
    camerafi: { text: 'Android and iOS', good: true },
  },
];

function Value({ cell }: { cell: Cell }) {
  return (
    <span className="flex items-start gap-2">
      {cell.good ? (
        <Check size={16} className="mt-0.5 shrink-0 text-brand" strokeWidth={2.5} aria-hidden="true" />
      ) : (
        <Minus size={16} className="mt-0.5 shrink-0 text-fg-faint" strokeWidth={2.5} aria-hidden="true" />
      )}
      <span>{cell.text}</span>
    </span>
  );
}

const VsCameraFi = () => (
  <div className="min-h-[100dvh] bg-ink-900 text-white">
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <a
        href="/"
        className="mb-8 inline-flex items-center space-x-2 text-fg-muted transition-colors duration-200 hover:text-white"
      >
        <ArrowLeft size={18} />
        <span>Back to home</span>
      </a>

      <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">Calypso vs CameraFi Live</h1>
      <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-fg-muted">
        Both apps turn an Android phone into a sports broadcast with a live scoreboard. The difference is what you
        pay to make it look like your club&rsquo;s stream, and what you put up with on the free plan.
      </p>

      <div className="mt-10 overflow-x-auto rounded-card border border-white/[0.07]">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-ink-800 text-fg">
            <tr>
              <th scope="col" className="p-4 font-semibold">
                <span className="sr-only">Feature</span>
              </th>
              <th scope="col" className="p-4 font-semibold">Calypso</th>
              <th scope="col" className="p-4 font-semibold">CameraFi Live</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.07] text-fg-muted">
            {ROWS.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="p-4 align-top font-medium text-fg">
                  {row.label}
                </th>
                <td className="p-4 align-top">
                  <Value cell={row.calypso} />
                </td>
                <td className="p-4 align-top">
                  <Value cell={row.camerafi} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <section>
          <h2 className="font-heading text-2xl font-bold">Why clubs pick Calypso</h2>
          <ul className="mt-4 space-y-3 leading-relaxed text-fg-muted">
            <li>No ads on the free plan, ever.</li>
            <li>Removing the watermark costs about half as much.</li>
            <li>TV-style lineup, cover and lower third (Arena and HUD) with your team badges.</li>
            <li>Create the YouTube broadcast and go live from the app with one tap.</li>
          </ul>
        </section>
        <section>
          <h2 className="font-heading text-2xl font-bold">When CameraFi fits better</h2>
          <ul className="mt-4 space-y-3 leading-relaxed text-fg-muted">
            <li>You film with an iPhone.</li>
            <li>You need SRT.</li>
            <li>Your sport needs its own scoreboard and it isn&rsquo;t hockey yet in Calypso.</li>
          </ul>
        </section>
      </div>

      <div className="mt-12 flex flex-col items-start gap-4">
        <PlayStoreButton campaign="vs-camerafi" />
        <p className="text-sm text-fg-faint">Free to install. Pro and Max are bought inside the app.</p>
      </div>

      <p className="mt-12 text-xs leading-relaxed text-fg-faint">
        CameraFi information comes from its public Google Play listing and website, checked in {CHECKED}. Prices
        can change and vary by country. CameraFi and CameraFi Live are trademarks of their owner; Calypso is not
        affiliated with them.
      </p>
    </div>
  </div>
);

export default VsCameraFi;
