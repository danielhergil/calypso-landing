import React from 'react';
import Guide, { A, B, Bullets, H2, P, Steps } from './Guide';

// Guía para quien busca «PRISM scoreboard». Pasos de PRISM sacados de su guía oficial
// (guide.prismlive.com, «Using overlays.uno scoreboard»), consultada el 20-oct-2026.
const CHECKED = 'October 2026';

const PrismScoreboard = () => (
  <Guide
    title="How to add a live scoreboard to PRISM Live Studio"
    intro={
      <>
        PRISM doesn&rsquo;t have a scoreboard of its own. On the phone app you add one through <B>overlays.uno</B>,
        a partner service, or through a web widget from another scoreboard site. Here is how to do it, step by step,
        and a simpler option if what you stream is a match.
      </>
    }
    campaign="guide-prism-scoreboard"
    footnote={`PRISM steps and prices come from the official PRISM guide (guide.prismlive.com), checked in ${CHECKED}. Menus and prices can change. PRISM Live Studio is a trademark of NAVER Corp. and overlays.uno of its owner; Calypso is not affiliated with either.`}
  >
    <H2>Option 1: overlays.uno inside PRISM</H2>
    <P>You need PRISM 5.3.0 or later on Android (3.12.0 on iOS) and an overlays.uno account.</P>
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
          Tap <B>Controller</B> to change the teams and the score before or during the stream. You can also run it
          from a second phone by scanning the QR code or opening the shared link.
        </>,
      ]}
    />
    <P>
      Keep in mind that the free plan of PRISM limits how many overlays you can have on screen at once (two or
      three, depending on the version) and adds a PRISM watermark, ads and an outro. PRISM Plus removes them for
      $9.99 a month or $79.99 a year.
    </P>

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
    <P>
      It works with any site, but you are juggling two apps during the match, and if the website or the connection
      hiccups, the score on the stream freezes.
    </P>

    <H2>The simpler way for matches: Calypso</H2>
    <P>
      Calypso is an Android app made only for streaming matches. The scoreboard is part of the app, so there is no
      second account, widget or link to set up, and it knows the rules of your sport.
    </P>
    <Steps
      items={[
        <>
          Install Calypso and tell it <B>where you stream</B> (YouTube, Facebook, Twitch or any RTMP server). Paste
          your stream key once; with Pro, YouTube connects with one tap and no key.
        </>,
        <>
          Add your <B>teams</B> with their badges and players.
        </>,
        <>
          In <B>Overlay settings</B>, choose the <B>Sport</B>: football, futsal, basketball, handball, volleyball,
          tennis, padel, roller hockey or any other sport. The scoreboard changes to fit it.
        </>,
        <>
          Pick the teams and a <B>style</B>, then go live. You score from buttons on the camera screen, without
          leaving the stream. In tennis and padel, Calypso counts 15-30-40, deuce, games and tie-breaks for you.
        </>,
      ]}
    />
    <P>
      The free plan has no ads, only a small Calypso mark in a corner. Pro removes it, adds replays and one-tap
      YouTube, and costs 5,99 € a month or 49,99 € a year.
    </P>

    <H2>Which one to use</H2>
    <Bullets
      items={[
        <>
          <B>PRISM</B> if you film with an iPhone, stream to several platforms at once, or stream games and IRL as
          well as matches.
        </>,
        <>
          <B>Calypso</B> if you stream your club&rsquo;s matches from an Android phone and want the scoreboard, teams
          and replays in the same app.
        </>,
      ]}
    />
    <P>
      Full side-by-side: <A href="/vs-prism">Calypso vs PRISM Live Studio</A>.
    </P>
  </Guide>
);

export default PrismScoreboard;
