import React from 'react';
import Versus, { Row } from './Versus';

// Datos de PRISM: guía oficial (guide.prismlive.com, «PRISM Plus» y «Using overlays.uno scoreboard»)
// y fichas de las tiendas, consultadas el 20-oct-2026. Revisar antes de cambiar precios.
const CHECKED = 'October 2026';

const ROWS: Row[] = [
  {
    label: 'Made for',
    calypso: { text: 'Streaming sports matches from the sideline', good: true },
    rival: { text: 'Camera, games, screencast, IRL and VTubing', good: true },
  },
  {
    label: 'Scoreboard',
    calypso: {
      text: 'Built in, one per sport: football, futsal, basketball, handball, volleyball, tennis, padel, roller hockey and a universal score',
      good: true,
    },
    rival: { text: '130+ designs through overlays.uno, a partner service with its own account' },
  },
  {
    label: 'Price to remove the watermark',
    calypso: { text: '5,99 €/month or 49,99 €/year (Pro)', good: true },
    rival: { text: '$9.99/month or $79.99/year (Plus)' },
  },
  {
    label: 'Ads in the free plan',
    calypso: { text: 'None', good: true },
    rival: { text: 'Yes' },
  },
  {
    label: 'Watermark in the free plan',
    calypso: { text: 'Small Calypso mark' },
    rival: { text: 'PRISM watermark and outro' },
  },
  {
    label: 'YouTube Live without copying stream keys',
    calypso: { text: 'Yes, in Pro', good: true },
    rival: { text: 'Yes, free', good: true },
  },
  {
    label: 'Several platforms at once',
    calypso: { text: 'One destination per stream' },
    rival: { text: 'Up to 6 channels with Plus', good: true },
  },
  {
    label: 'Phones',
    calypso: { text: 'Android' },
    rival: { text: 'Android and iOS', good: true },
  },
];

const VsPrism = () => (
  <Versus
    rival="PRISM Live Studio"
    intro="PRISM is an all-round streaming app for games, IRL and VTubing. Calypso does one thing: stream your match from a phone with your sport’s scoreboard already inside, so there is no second account or web widget to set up."
    rows={ROWS}
    whyCalypso={[
      'The scoreboard is part of the app and knows your sport: tennis and padel count 15-30-40 and tie-breaks by themselves.',
      'Teams with badges, lineups, cover and lower third, ready before kick-off.',
      'Replays of the last play during the live stream (Pro).',
      'No ads on the free plan, and Pro costs less than PRISM Plus.',
    ]}
    whenRival={[
      'You film with an iPhone.',
      'You stream to several platforms at the same time.',
      'You stream games, IRL or as a VTuber, not matches.',
      'You want YouTube without stream keys on a free plan.',
    ]}
    campaign="vs-prism"
    footnote={`PRISM information comes from its official guide (guide.prismlive.com) and store listings, checked in ${CHECKED}. Prices are in US dollars, can change and vary by country. PRISM Live Studio is a trademark of NAVER Corp.; Calypso is not affiliated with it. overlays.uno is a trademark of its owner.`}
  />
);

export default VsPrism;
