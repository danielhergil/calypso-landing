import React from 'react';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = 'September 29, 2026';

  return (
    <div className="min-h-[100dvh] bg-ink-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 max-w-4xl">
        <a
          href="/"
          className="inline-flex items-center space-x-2 text-fg-muted hover:text-white transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={18} />
          <span>Back to home</span>
        </a>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-fg-muted mb-12">Last updated: {lastUpdated}</p>

        <div className="space-y-8 text-fg-muted leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              Calypso ("we", "our", "us") is a sports streaming application for Android. This
              Privacy Policy explains what information we collect, how we use it, and the rights you
              have over your data when you use the Calypso app and website.
            </p>
            <p className="mt-3">
              <strong className="text-white">Calypso uses YouTube API Services.</strong> When you
              connect a YouTube channel, the app uses the YouTube API Services to manage your live
              broadcasts. By using that feature you agree to be bound by the{' '}
              <a href="https://www.youtube.com/t/terms" className="text-brand hover:text-brand-light underline">
                YouTube Terms of Service
              </a>
              . The data Google collects and processes through YouTube is governed by the{' '}
              <a href="http://www.google.com/policies/privacy" className="text-brand hover:text-brand-light underline">
                Google Privacy Policy
              </a>{' '}
              (http://www.google.com/policies/privacy). Section 4 explains exactly what Calypso
              accesses through YouTube and how you can revoke it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong className="text-white">Account information:</strong> when you sign up, we
                collect your email address, display name and authentication identifier through
                Firebase Authentication.
              </li>
              <li>
                <strong className="text-white">Team content:</strong> team names, logos and any
                images you upload are stored in Firebase Storage and Firestore so they can be used
                during your streams.
              </li>
              <li>
                <strong className="text-white">Streaming configuration:</strong> RTMP keys and
                destinations (YouTube, Twitch, custom servers) you configure in the app. Stream
                keys are stored only to enable broadcasting.
              </li>
              <li>
                <strong className="text-white">Usage data:</strong> basic technical information such
                as device model, OS version and crash reports for stability and improvements.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. How We Use Your Data</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide authentication and protect your account.</li>
              <li>To store and serve the team logos and content you upload.</li>
              <li>To deliver your live streams to the platforms you choose.</li>
              <li>To improve app stability, fix bugs and develop new features.</li>
            </ul>
            <p className="mt-3">We do not sell your personal information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Google User Data and YouTube</h2>
            <p>
              Calypso uses the YouTube API Services. If you connect a YouTube channel, the app uses
              them to manage your live broadcasts from inside the app. By doing so you agree to be
              bound by the{' '}
              <a href="https://www.youtube.com/t/terms" className="text-brand hover:text-brand-light underline">
                YouTube Terms of Service
              </a>
              , and the data Google processes on its side is governed by the{' '}
              <a href="http://www.google.com/policies/privacy" className="text-brand hover:text-brand-light underline">
                Google Privacy Policy
              </a>
              .
            </p>
            <p className="mt-3">
              <strong className="text-white">What we ask for.</strong> A single scope,
              <code className="mx-1">youtube.force-ssl</code>, which is the narrowest one that allows
              creating and ending a broadcast. With it the app can:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>read your scheduled broadcasts and the ingestion details the encoder needs;</li>
              <li>create a new broadcast and bind it to a stream key;</li>
              <li>create, rename and delete your own stream keys;</li>
              <li>end the broadcast when the match is over;</li>
              <li>set the broadcast thumbnail, if you choose one.</li>
            </ul>
            <p className="mt-3">
              <strong className="text-white">What we do not do.</strong> We do not read or store
              comments, viewer data, channel analytics or information about your subscribers. We
              never post
              anything to your channel that you did not request from within the app. We do not use
              this data for advertising, and we do not sell it or share it with third parties.
            </p>
            <p className="mt-3">
              <strong className="text-white">What we store, and where.</strong> For each channel you
              connect we store its identifier, name, profile picture URL and public subscriber count,
              so the app can list your channels and let you switch between them. The refresh token issued by Google is kept on our backend (Google Cloud Functions
              and Firestore, hosted in the European Union) and is not accessible from the app or from
              your device. It is used only to obtain a short-lived access token when you perform an
              action.
            </p>
            <p className="mt-3">
              <strong className="text-white">How long we keep it.</strong> The channel name, picture
              and subscriber count are refreshed from YouTube every time you use the YouTube
              features of the app. If a channel goes 30 days without being used, we revoke our
              access and delete its token and data automatically; you can reconnect it at any time.
            </p>
            <p className="mt-3">
              <strong className="text-white">How to revoke access.</strong> You can revoke
              Calypso&apos;s access to your YouTube data at any time from the Google security
              settings page:{' '}
              <a href="https://myaccount.google.com/connections?filters=3,4&hl=en" className="text-brand hover:text-brand-light underline">
                https://myaccount.google.com/connections?filters=3,4&amp;hl=en
              </a>
              . Once revoked, our token stops working immediately, and the next time the app tries
              to use it we delete the token and the channel data we hold.
            </p>
            <p className="mt-3">
              <strong className="text-white">How to delete your data.</strong> In the app, open{' '}
              <em>Settings → Delete account</em>. This deletes your Calypso account and, within
              minutes, revokes every YouTube token and deletes all channel data we hold. You can also
              ask us to delete your data by email (see Contact); we do so within 7 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. How We Protect Your Data</h2>
            <p className="text-fg-muted leading-relaxed">
              We apply the following measures to every piece of Google user data the app handles,
              including the YouTube data described above:
            </p>
            <ul className="list-disc list-inside text-fg-muted space-y-2 mt-3">
              <li>
                <strong className="text-white">Encryption in transit.</strong> All communication between the app,
                our backend and Google&apos;s APIs travels over TLS (HTTPS). The app makes no
                plain-text connection to our services.
              </li>
              <li>
                <strong className="text-white">Encryption at rest.</strong> Data is stored in Google Cloud
                and encrypted at rest by Google Cloud using AES-256 with Google-managed keys. Your
                account data and any Google token are held in Firestore and Cloud Functions located
                in the European Union. Images you upload, such as team badges, are stored in a
                Cloud Storage bucket located in the United States; that transfer is covered by
                Google Cloud&apos;s standard contractual clauses.
              </li>
              <li>
                <strong className="text-white">Tokens never reach the device.</strong> The Google refresh token
                is held only on our backend. It is never sent to the app, never written to a log and
                never included in analytics or crash reports.
              </li>
              <li>
                <strong className="text-white">Only genuine installations can reach our backend.</strong> The app
                is protected with Firebase App Check and Google Play Integrity, so requests from
                modified or forged clients are rejected.
              </li>
              <li>
                <strong className="text-white">Least-privilege access.</strong> Our backend runs with service
                accounts scoped to the minimum permissions they need. Administrative access to the
                Google Cloud and Firebase projects is limited to the developer account, which is
                protected with two-step verification.
              </li>
              <li>
                <strong className="text-white">Deletion.</strong> Revoking access from your Google Account, or
                deleting your Calypso account, deletes the stored token and channel data. Nothing
                is retained after that for the purpose of accessing your YouTube channel.
              </li>
            </ul>
            <p className="text-fg-muted leading-relaxed">
              If we ever become aware of a security incident affecting your data, we will notify
              affected users and the competent supervisory authority as required by the GDPR.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Limited Use of Google User Data</h2>
            <p className="text-fg-muted leading-relaxed">
              Calypso&apos;s use and transfer of information received from Google APIs adheres to
              the{' '}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                className="text-brand hover:text-brand-light underline"
                target="_blank"
                rel="noreferrer"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements. We do not use this data to serve
              advertising, we do not sell it, and we do not allow humans to read it except with your
              explicit consent, to resolve a support request you have raised, for security purposes,
              or where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Information Stored on Your Device</h2>
            <p>
              The Calypso app stores and accesses information directly on your device, and allows
              the third-party SDKs listed below to do so:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong className="text-white">Session:</strong> Firebase Authentication keeps your
                sign-in session on the device so you stay logged in.
              </li>
              <li>
                <strong className="text-white">App settings:</strong> your stream, camera, language
                and overlay preferences, stored in the app&apos;s private storage.
              </li>
              <li>
                <strong className="text-white">Cached content:</strong> team badges and images used
                in overlays, and any recording you choose to save.
              </li>
              <li>
                <strong className="text-white">Identifiers set by SDKs:</strong> Firebase
                (installation ID, App Check and Crashlytics), Google Play Integrity and RevenueCat
                (an anonymous purchase identifier) store identifiers on the device to protect the
                service, report crashes and restore purchases.
              </li>
            </ul>
            <p className="mt-3">
              No YouTube token is ever stored on your device. This website does not use cookies for
              advertising or tracking; it uses Vercel Analytics, which is cookieless, and the
              Firebase SDK only when you submit the waitlist form. Uninstalling the app removes
              everything it stored on the device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">8. Third-Party Services</h2>
            <p>Calypso relies on the following providers:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong className="text-white">Google Firebase</strong> (Authentication, Firestore,
                Storage, Cloud Functions, Crashlytics, App Check), see the{' '}
                <a href="http://www.google.com/policies/privacy" className="text-brand hover:text-brand-light underline">
                  Google Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong className="text-white">YouTube API Services</strong>, when you connect a
                YouTube channel (see section 4).
              </li>
              <li>
                <strong className="text-white">RevenueCat</strong>, to process and restore
                subscriptions purchased through Google Play.
              </li>
              <li>
                <strong className="text-white">YouTube, Twitch and other RTMP destinations</strong>{' '}
                only when you connect them; their own terms and privacy policies apply.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">9. Data Retention and Deletion</h2>
            <p>
              Account data and uploaded content are kept while your account is active. You can
              delete your team content at any time from within the app. To delete your account and
              all related data, use <em>Settings → Delete account</em> in the app, or write to us at
              the email below; we complete deletion within 7 days. YouTube data follows the
              retention rules in section 4.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">10. Your Rights</h2>
            <p>
              You have the right to access, correct, export or delete your personal data, and to
              withdraw consent at any time. To exercise these rights, email us at the address
              below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">11. Children's Privacy</h2>
            <p>
              Calypso is not directed to children under 13. We do not knowingly collect personal
              data from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The date at the top of this page
              indicates when it was last revised. Continued use of the app after changes means you
              accept the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">13. Contact</h2>
            <p>
              For any privacy-related question, write to{' '}
              <a
                href="mailto:calypso.sport.stream@gmail.com"
                className="text-brand hover:text-brand-light underline"
              >
                calypso.sport.stream@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
