import React from 'react';
import { ArrowLeft, Check, Minus } from 'lucide-react';
import { PlayStoreButton } from './ui';

// Plantilla común de las páginas «Calypso vs …». Cada página solo pone sus datos.
export type Cell = { text: string; good?: boolean };
export type Row = { label: string; calypso: Cell; rival: Cell };

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

const Versus = ({
  rival,
  intro,
  rows,
  whyCalypso,
  whenRival,
  campaign,
  footnote,
}: {
  rival: string;
  intro: string;
  rows: Row[];
  whyCalypso: string[];
  whenRival: string[];
  campaign: string;
  footnote: string;
}) => (
  <div className="min-h-[100dvh] bg-ink-900 text-white">
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <a
        href="/"
        className="mb-8 inline-flex items-center space-x-2 text-fg-muted transition-colors duration-200 hover:text-white"
      >
        <ArrowLeft size={18} />
        <span>Back to home</span>
      </a>

      <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">Calypso vs {rival}</h1>
      <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-fg-muted">{intro}</p>

      <div className="mt-10 overflow-x-auto rounded-card border border-white/[0.07]">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-ink-800 text-fg">
            <tr>
              <th scope="col" className="p-4 font-semibold">
                <span className="sr-only">Feature</span>
              </th>
              <th scope="col" className="p-4 font-semibold">Calypso</th>
              <th scope="col" className="p-4 font-semibold">{rival}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.07] text-fg-muted">
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="p-4 align-top font-medium text-fg">
                  {row.label}
                </th>
                <td className="p-4 align-top">
                  <Value cell={row.calypso} />
                </td>
                <td className="p-4 align-top">
                  <Value cell={row.rival} />
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
            {whyCalypso.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-heading text-2xl font-bold">When {rival} fits better</h2>
          <ul className="mt-4 space-y-3 leading-relaxed text-fg-muted">
            {whenRival.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-12 flex flex-col items-start gap-4">
        <PlayStoreButton campaign={campaign} />
        <p className="text-sm text-fg-faint">Free to install. Pro and Max are bought inside the app.</p>
      </div>

      <p className="mt-12 text-xs leading-relaxed text-fg-faint">{footnote}</p>
    </div>
  </div>
);

export default Versus;
