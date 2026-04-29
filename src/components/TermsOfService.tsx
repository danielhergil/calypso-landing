import React from 'react';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
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

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-400 mb-12">Last updated: {lastUpdated}</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By creating an account or using the Calypso app or website, you agree to these Terms
              of Service. If you do not agree, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. The Service</h2>
            <p>
              Calypso is an Android application that lets users broadcast sports events to
              third-party platforms (YouTube, Twitch and custom RTMP servers) and manage related
              content such as team logos and live scores. The service is currently offered free of
              charge during open beta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. Accounts</h2>
            <p>
              You need an account to use most of the features. You are responsible for keeping your
              login credentials safe and for any activity that happens under your account. You must
              provide accurate information and be at least 13 years old to register.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. User Content</h2>
            <p>
              You retain ownership of the content you upload (team logos, names, streams). By
              uploading content you grant Calypso a limited license to host, display and transmit
              it solely to provide the service. You are responsible for ensuring you have the
              necessary rights to upload and broadcast that content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Acceptable Use</h2>
            <p>You agree not to use Calypso to:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Broadcast content you do not have the rights to stream.</li>
              <li>Upload illegal, hateful, harassing or sexually explicit material.</li>
              <li>Attempt to break, reverse-engineer or disrupt the service or its security.</li>
              <li>Use the service to violate the terms of YouTube, Twitch or any other platform.</li>
            </ul>
            <p className="mt-3">
              We may suspend or terminate accounts that breach these rules.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Third-Party Platforms</h2>
            <p>
              Calypso integrates with external streaming services. Their availability, quality and
              terms are out of our control. You are responsible for complying with the terms of any
              third-party platform you connect to.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Disclaimer</h2>
            <p>
              The service is provided "as is" and "as available" during the open beta. We do not
              guarantee that streams will be uninterrupted, error-free or always available. To the
              fullest extent permitted by law, we disclaim all warranties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">8. Limitation of Liability</h2>
            <p>
              Calypso will not be liable for any indirect, incidental or consequential damages
              arising from your use of the service, including loss of streams, data or revenue.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">9. Termination</h2>
            <p>
              You can stop using the service and delete your account at any time. We may suspend or
              terminate your access if you violate these terms or if we discontinue the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">10. Changes</h2>
            <p>
              We may update these Terms from time to time. The "Last updated" date will reflect any
              changes. Continued use after changes means you accept the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">11. Contact</h2>
            <p>
              Questions about these Terms? Email{' '}
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

export default TermsOfService;
