import React from 'react';
import Guide, { B, Bullets, H2, P, Steps } from './Guide';

// Guía para «emitir un partido de pádel con marcador desde el móvil». El tanteo sigue
// docs/FASE4_DEPORTE_PRIMERO.md §16 en calypso-rootencoder: ventajas, set a 6, tie-break a 7,
// sin punto de oro ni super tie-break (si se añaden, cambiar la sección «Golden point…»).

const PadelGuide = () => (
  <Guide
    title="How to live stream a padel match from your phone, with a scoreboard"
    intro={
      <>
        One Android phone is enough to stream a padel match to YouTube, Facebook or Twitch with the score on screen:
        points, games and sets, like on TV. With Calypso you don&rsquo;t count 15-30-40 yourself: you tap who won the
        point and the scoreboard does the rest.
      </>
    }
    campaign="guide-padel"
  >
    <H2>What you need</H2>
    <Bullets
      items={[
        <>
          <B>An Android phone</B> and <B>a tripod or a clamp</B> for the fence or the glass.
        </>,
        <>
          <B>A power bank</B> if you stream several matches in a row.
        </>,
        <>
          <B>A good upload connection</B> at the court. Club Wi-Fi is often busy: run a speed test from the spot
          where you will film, and use mobile data if it is better.
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
        'Behind one of the back walls, centred and as high as you can: it is the TV angle and it shows both pairs and the whole court.',
        'Outside the glass if possible, or with the lens pressed close to it, so reflections and marks don’t get in the shot.',
        'In landscape, framing the whole court. Once it is set, don’t touch it: in padel a fixed shot works better than following the ball.',
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
          Add each pair as a <B>team</B>, named after its two players (for example, &ldquo;García / López&rdquo;),
          with a club badge if you have one.
        </>,
        <>
          Open <B>Overlay settings</B> and choose <B>Padel</B> as the sport.
        </>,
        <>
          Pick the two pairs and a <B>style</B> for the scoreboard. It shows the points in the centre, the games
          below and the sets won on the right.
        </>,
        'Go live a few minutes before the first serve and check on another phone that the stream looks and sounds right.',
      ]}
    />

    <H2>During the match</H2>
    <Bullets
      items={[
        <>
          <B>Points:</B> tap <B>+</B> for the pair that won the point. Calypso counts 15, 30, 40, deuce and
          advantage, and closes the game and the set by itself.
        </>,
        <>
          <B>Sets:</B> a set goes to 6 games with a two-game lead. At 6-6 a tie-break to 7 starts on its own, with
          the points shown as numbers.
        </>,
        <>
          <B>Mistakes:</B> <B>−</B> takes away a point from the current game, and the game buttons (<B>J1</B> and{' '}
          <B>J2</B>, with + and −) add or remove whole games, for example if you join a match already started.
        </>,
        <>
          <B>Replays (Pro):</B> save a great point and show it again on the stream.
        </>,
      ]}
    />

    <H2>Golden point and super tie-break</H2>
    <P>
      Calypso plays deuce with advantages. If your league uses the <B>golden point</B>, at 40-40 give the game
      straight to the winning pair with its <B>J+</B> button. The <B>super tie-break</B> instead of a third set
      isn&rsquo;t built in yet.
    </P>

    <H2>Before every match</H2>
    <Bullets
      items={[
        'Do a short test stream from the club, with the same phone and connection.',
        'Charge the phone and the power bank, and turn on Do Not Disturb so calls don’t interrupt the stream.',
        'Check that both pairs are set up and that you picked Padel, not Tennis.',
        'If the upload at the club is weak, lower the quality of your stream profile to 720p: a smooth stream is better than a sharp one that stutters.',
      ]}
    />

    <H2>What it costs</H2>
    <P>
      Calypso is free to install and streaming is free, with no ads. Free streams carry a small Calypso mark in a
      corner. Pro removes it and adds replays and one-tap YouTube for 5,99 € a month or 49,99 € a year.
    </P>
  </Guide>
);

export default PadelGuide;
