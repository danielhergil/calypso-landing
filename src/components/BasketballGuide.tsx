import React from 'react';
import Guide, { B, Bullets, H2, P, Steps } from './Guide';

// Guía para «emitir un partido de baloncesto con marcador desde el móvil». Los pasos de Calypso siguen
// docs/FASE4_DEPORTE_PRIMERO.md §11-13 en calypso-rootencoder: +1/+2/+3, faltas de equipo por cuarto,
// 1Q-4Q y crono en cuenta atrás desde 10:00 (configurable con pulsación larga; ↺ vuelve al inicio).

const BasketballGuide = () => (
  <Guide
    title="How to live stream a basketball game from your phone, with a scoreboard"
    intro={
      <>
        One Android phone is enough to put your team&rsquo;s game on YouTube, Facebook or Twitch with the score, the
        quarter, the team fouls and the game clock on screen. This guide covers what you need, where to put the
        phone and how to keep the scoreboard up to date with Calypso while the game is on.
      </>
    }
    campaign="guide-basketball"
  >
    <H2>What you need</H2>
    <Bullets
      items={[
        <>
          <B>An Android phone</B> and <B>a tripod or a clamp</B> for the stand railing.
        </>,
        <>
          <B>A power bank.</B> Four quarters plus breaks is a long time to stream on one battery.
        </>,
        <>
          <B>A good upload connection</B> in the gym. Sports halls are often bad for mobile signal: run a speed test
          from the spot where you will film, and ask the club for the Wi-Fi if it is better.
        </>,
        <>
          <B>A channel to stream to.</B> On YouTube, live streaming has to be switched on once and can take up to 24
          hours to activate, so do it a day before. Streaming with a stream key, as Calypso does, doesn&rsquo;t need
          the 50 subscribers that YouTube&rsquo;s own app asks for.
        </>,
      ]}
    />

    <H2>Where to put the phone</H2>
    <Bullets
      items={[
        'At the halfway line and as high as you can, from the stands or a balcony, on the side opposite the benches so players don’t block the view.',
        'In landscape, framing about two thirds of the court, and follow the play from basket to basket by panning.',
        'Don’t zoom in much: gyms are darker than they look, and digital zoom makes the picture noisy.',
      ]}
    />

    <H2>Set up the stream in Calypso</H2>
    <Steps
      items={[
        <>
          Install Calypso and tell it <B>where you stream</B>: YouTube, Facebook, Twitch or any RTMP server. Paste
          the stream key once and Calypso keeps it. With Pro, YouTube connects with one tap and no key.
        </>,
        <>
          Add the two <B>teams</B> with their badges and players. You only do it once per team.
        </>,
        <>
          Open <B>Overlay settings</B> and choose <B>Basketball</B> as the sport. The scoreboard gets room for
          three-digit scores, the quarter and the team fouls.
        </>,
        <>
          Pick the home and away teams and a <B>style</B> for the scoreboard. You can show the starting five before
          the tip-off.
        </>,
        <>
          Set the <B>game clock</B>: it counts down from 10:00 by default (FIBA quarters). For 8-minute quarters or
          any other length, press and hold the clock and set the time.
        </>,
        'Go live a few minutes before the tip-off and check on another phone that the stream looks and sounds right.',
      ]}
    />

    <H2>During the game</H2>
    <Bullets
      items={[
        <>
          <B>Points:</B> each team has <B>+</B>, <B>+2</B> and <B>+3</B> for free throws, baskets and
          three-pointers, and <B>−</B> to fix a mistake.
        </>,
        <>
          <B>Team fouls:</B> <B>F1</B> and <B>F2</B>, with + and −. They show on the scoreboard and go back to zero
          every quarter.
        </>,
        <>
          <B>The clock:</B> a tap starts or stops it, so you can follow the referee&rsquo;s whistle. It stops by
          itself at 00:00, and <B>↺</B> puts it back to the start of the quarter.
        </>,
        <>
          <B>Quarters:</B> the quarter button goes 1Q, 2Q, 3Q, 4Q. Each change resets the clock and the team fouls.
        </>,
        <>
          <B>Replays (Pro):</B> save a great play and show it again during a time-out.
        </>,
      ]}
    />
    <P>
      The scoreboard doesn&rsquo;t include a shot clock or the time-outs left. Keep it simple: score, fouls,
      quarter and game clock are what viewers look for.
    </P>

    <H2>Before every game</H2>
    <Bullets
      items={[
        'Do a short test stream from the gym, with the same phone and connection.',
        'Charge the phone and the power bank, and turn on Do Not Disturb so calls don’t interrupt the stream.',
        'Check that both teams are set up, that you picked Basketball and that the clock starts at the right time.',
        'If the upload in the gym is weak, lower the quality of your stream profile to 720p: a smooth stream is better than a sharp one that stutters.',
      ]}
    />

    <H2>What it costs</H2>
    <P>
      Calypso is free to install and streaming is free, with no ads. Free streams carry a small Calypso mark in a
      corner. Pro removes it and adds replays and one-tap YouTube for 5,99 € a month or 49,99 € a year.
    </P>
  </Guide>
);

export default BasketballGuide;
