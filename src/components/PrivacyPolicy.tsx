import React from 'react';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = 'April 29, 2026';

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 max-w-4xl">
        <a
          href="/"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={18} />
          <span>Back to home</span>
        </a>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-400 mb-12">Last updated: {lastUpdated}</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              Calypso ("we", "our", "us") is a sports streaming application for Android. This
              Privacy Policy explains what information we collect, how we use it, and the rights you
              have over your data when you use the Calypso app and website.
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
            <h2 className="text-2xl font-semibold text-white mb-3">4. Third-Party Services</h2>
            <p>Calypso relies on the following providers:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong className="text-white">Google Firebase</strong> (Authentication, Firestore,
                Storage) — see Google's privacy policy.
              </li>
              <li>
                <strong className="text-white">YouTube, Twitch and other RTMP destinations</strong>{' '}
                — only when you connect them; their own terms and privacy policies apply.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Data Retention</h2>
            <p>
              Account data and uploaded content are kept while your account is active. You can
              delete your team content at any time from within the app. To delete your account and
              all related data, contact us at the email below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Your Rights</h2>
            <p>
              You have the right to access, correct, export or delete your personal data, and to
              withdraw consent at any time. To exercise these rights, email us at the address
              below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Children's Privacy</h2>
            <p>
              Calypso is not directed to children under 13. We do not knowingly collect personal
              data from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The date at the top of this page
              indicates when it was last revised. Continued use of the app after changes means you
              accept the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">9. Contact</h2>
            <p>
              For any privacy-related question, write to{' '}
              <a
                href="mailto:calypso.sport.stream@gmail.com"
                className="text-purple-400 hover:text-purple-300 underline"
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
