import React from 'react';
import Versus, { Row } from './Versus';

// Datos de CameraFi: ficha de Google Play y web oficial, consultadas en octubre de 2026
// (docs/CONVERSION_VS_CAMERAFI.md en calypso-rootencoder). Revisar antes de cambiar precios.
const CHECKED = 'October 2026';

const ROWS: Row[] = [
  {
    label: 'Price to remove the watermark',
    calypso: { text: '5,99 €/month or 49,99 €/year (Pro)', good: true },
    rival: { text: '$10.99/month on Android' },
  },
  {
    label: 'Ads in the free plan',
    calypso: { text: 'None', good: true },
    rival: { text: 'Yes' },
  },
  {
    label: 'Watermark in the free plan',
    calypso: { text: 'Small Calypso mark' },
    rival: { text: 'CameraFi mark' },
  },
  {
    label: 'Where you can stream',
    calypso: { text: 'Any RTMP/RTMPS server: YouTube, Facebook, Twitch and more', good: true },
    rival: { text: 'RTMP, SRT, YouTube, Facebook, Twitch', good: true },
  },
  {
    label: 'YouTube Live without copying stream keys',
    calypso: { text: 'Yes, in Pro', good: true },
    rival: { text: 'Yes', good: true },
  },
  {
    label: 'Replays during the live stream',
    calypso: { text: 'Yes, in Pro', good: true },
    rival: { text: 'Yes', good: true },
  },
  {
    label: 'Sport-specific scoreboards',
    calypso: {
      text: 'Football, futsal, basketball, handball, volleyball, tennis, padel, roller hockey and a universal score',
      good: true,
    },
    rival: { text: '30+ sports', good: true },
  },
  {
    label: 'Phones',
    calypso: { text: 'Android' },
    rival: { text: 'Android and iOS', good: true },
  },
];

const VsCameraFi = () => (
  <Versus
    rival="CameraFi Live"
    intro="Both apps turn an Android phone into a sports broadcast with a live scoreboard. The difference is what you pay to make it look like your club’s stream, and what you put up with on the free plan."
    rows={ROWS}
    whyCalypso={[
      'No ads on the free plan, ever.',
      'Removing the watermark costs about half as much.',
      'TV-style lineup, cover and lower third (Arena and HUD) with your team badges.',
      'Create the YouTube broadcast and go live from the app with one tap.',
    ]}
    whenRival={['You film with an iPhone.', 'You need SRT.', 'Your sport isn’t one of the eight Calypso covers yet.']}
    campaign="vs-camerafi"
    footnote={`CameraFi information comes from its public Google Play listing and website, checked in ${CHECKED}. Prices can change and vary by country. CameraFi and CameraFi Live are trademarks of their owner; Calypso is not affiliated with them.`}
  />
);

export default VsCameraFi;
