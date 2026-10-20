import React from 'react';
import Guide, { B, Bullets, H2, P, Steps } from './Guide';

// Guía para «emitir un partido de fútbol con marcador desde el móvil». Los pasos de Calypso siguen
// docs/FASE4_DEPORTE_PRIMERO.md (marcador de fútbol, crono y partes) en calypso-rootencoder.
// Requisitos de YouTube: ayuda de YouTube y guías públicas, consultadas el 20-oct-2026.

const FootballGuide = () => (
  <Guide
    title="How to live stream a football match from your phone, with a scoreboard"
    intro={
      <>
        One Android phone is enough to put your team&rsquo;s match on YouTube, Facebook or Twitch with the score and
        the clock on screen, the way TV does it. This guide covers what you need, where to put the phone and how to
        run the scoreboard during the match with Calypso.
      </>
    }
    campaign="guide-football"
  >
    <H2>What you need</H2>
    <Bullets
      items={[
        <>
          <B>An Android phone</B> with a good camera. It doesn&rsquo;t have to be new: what matters more is a steady
          shot and a stable connection.
        </>,
        <>
          <B>A tripod or a clamp</B> to hold it still and as high as you can. A football pitch is wide, and a high
          angle shows the shape of the game.
        </>,
        <>
          <B>A power bank.</B> Streaming a full match drains the battery fast, and the phone also heats up.
        </>,
        <>
          <B>A good upload connection</B> at the pitch, from mobile data or Wi-Fi. Run a speed test where you will
          film, not at home: upload is what counts, not download.
        </>,
        <>
          <B>A channel to stream to.</B> On YouTube, live streaming has to be switched on once and can take up to 24
          hours to activate, so do it a day before. Streaming from a phone with YouTube&rsquo;s own app needs 50
          subscribers; streaming with a stream key, as Calypso does, does not.
        </>,
      ]}
    />

    <H2>Where to put the phone</H2>
    <Bullets
      items={[
        'At the halfway line, as high as possible: a stand, a balcony, or a tall tripod behind the fence.',
        'In landscape, framing about half of the pitch, and follow the ball by panning rather than zooming in and out.',
        'With the sun behind you, not in front of the lens, especially in afternoon matches.',
        'Away from the crowd if you can: people standing up in front of the phone are the most common problem.',
      ]}
    />

    <H2>Set up the stream in Calypso</H2>
    <Steps
      items={[
        <>
          Install Calypso and tell it <B>where you stream</B>: YouTube, Facebook, Twitch or any RTMP server. Paste
          the stream key from your platform once and Calypso keeps it. With Pro, YouTube connects with one tap and
          no key.
        </>,
        <>
          Add the two <B>teams</B> with their badges and players. You only do it once per team, and it is what fills
          the scoreboard and the lineup.
        </>,
        <>
          Open <B>Overlay settings</B> and choose <B>Football</B> as the sport. For indoor five-a-side, choose{' '}
          <B>Futsal</B>, which also counts the accumulated fouls.
        </>,
        <>
          Pick the home and away teams and a <B>style</B> for the scoreboard. You can show the starting lineup
          before kick-off.
        </>,
        <>
          Go live a few minutes before kick-off, so you can check on another phone that the stream looks and sounds
          right.
        </>,
      ]}
    />

    <H2>During the match</H2>
    <Bullets
      items={[
        <>
          <B>Goals:</B> one button per team on the camera screen. The scoreboard updates on the stream at once,
          without leaving the camera.
        </>,
        <>
          <B>The clock:</B> it runs inside the scoreboard. A tap starts or pauses it, and <B>↺</B> sets it back to
          zero. A long press lets you set a countdown instead, for tournaments with shorter halves.
        </>,
        <>
          <B>Halves:</B> switch to the second half with its button; the clock goes back to zero, ready for the restart.
        </>,
        <>
          <B>Replays (Pro):</B> save a goal or a good play and show it again on the stream.
        </>,
      ]}
    />

    <H2>Before every match</H2>
    <Bullets
      items={[
        'Do a short test stream the day before, with the same phone and connection type.',
        'Charge the phone and the power bank, and turn on Do Not Disturb so calls don’t interrupt the stream.',
        'Check that both teams are set up, with their badges, and that you picked Football.',
        'If the upload at the pitch is weak, lower the quality of your stream profile to 720p: a smooth stream is better than a sharp one that stutters.',
      ]}
    />

    <H2>What it costs</H2>
    <P>
      Calypso is free to install and streaming is free, with no ads. Free streams carry a small Calypso mark in a
      corner. Pro removes it and adds replays and one-tap YouTube for 5,99 € a month or 49,99 € a year.
    </P>
  </Guide>
);

export default FootballGuide;
