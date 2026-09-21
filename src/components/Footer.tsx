import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.07] bg-ink-900">
      <div className="mx-auto max-w-page px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="/" className="inline-flex items-center gap-2.5">
              <img src="/shots/logo.png" alt="Calypso" className="h-9 w-9 object-contain" />
              <span className="font-heading text-lg font-bold tracking-tight">Calypso</span>
            </a>
            <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-fg-muted">
              Live sports streaming from your phone. Camera, scoreboard and broadcast in one app.
            </p>
          </div>

          <nav aria-label="Product">
            <h2 className="text-sm font-semibold text-fg">Product</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#features" className="text-fg-muted transition-colors hover:text-fg">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-fg-muted transition-colors hover:text-fg">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#video" className="text-fg-muted transition-colors hover:text-fg">
                  Demo
                </a>
              </li>
              <li>
                <a href="#download" className="text-fg-muted transition-colors hover:text-fg">
                  Download
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Support and legal">
            <h2 className="text-sm font-semibold text-fg">Support</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:calypso.sport.stream@gmail.com"
                  className="text-fg-muted transition-colors hover:text-fg"
                >
                  calypso.sport.stream@gmail.com
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-fg-muted transition-colors hover:text-fg">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-fg-muted transition-colors hover:text-fg">
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/account/subscriptions"
                  target="_blank"
                  rel="noreferrer"
                  className="text-fg-muted transition-colors hover:text-fg"
                >
                  Manage subscription
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-14 border-t border-white/[0.07] pt-8 text-sm text-fg-faint">
          © {currentYear} Calypso Sports Streaming. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
