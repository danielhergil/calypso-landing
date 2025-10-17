import React from 'react';
import { Heart, Mail, Shield, MapPin, Clock } from 'lucide-react';
import logoCalypso from '/logo_calypso.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
                <img
                  src={logoCalypso}
                  alt="Calypso mobile streaming logo"
                  loading="lazy"
                  decoding="async"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white">Calypso</h3>
                <p className="text-xs text-gray-400">Sports Streaming Platform</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Calypso turns any Android phone into a professional live broadcasting studio for clubs, leagues, and content creators. Stream in HD, manage teams, and share live scores at zero cost.
            </p>
            <div className="flex items-start space-x-2 text-sm text-gray-400">
              <MapPin size={16} aria-hidden="true" className="mt-1" />
              <span>Global remote team empowering grassroots sports.</span>
            </div>
            <div className="flex items-start space-x-2 text-sm text-gray-400">
              <Clock size={16} aria-hidden="true" className="mt-1" />
              <span>Support available within 24 hours for early access members.</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Product</h4>
            <nav aria-label="Product navigation">
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a className="transition-colors duration-200 hover:text-white" href="#features">
                    HD streaming controls
                  </a>
                </li>
                <li>
                  <a className="transition-colors duration-200 hover:text-white" href="#features">
                    Team &amp; roster management
                  </a>
                </li>
                <li>
                  <a className="transition-colors duration-200 hover:text-white" href="#video">
                    Live scoreboard overlays
                  </a>
                </li>
                <li>
                  <a className="transition-colors duration-200 hover:text-white" href="#screenshots">
                    Mobile-first production tools
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* SEO & Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <nav aria-label="Resource navigation">
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a className="transition-colors duration-200 hover:text-white" href="#seo-insights">
                    SEO insights &amp; FAQs
                  </a>
                </li>
                <li>
                  <a className="transition-colors duration-200 hover:text-white" href="#wishlist">
                    Join the early access list
                  </a>
                </li>
                <li>
                  <a className="transition-colors duration-200 hover:text-white" href="#download">
                    Download Calypso APK
                  </a>
                </li>
                <li>
                  <a
                    className="transition-colors duration-200 hover:text-white"
                    href="https://danielhergil.github.io/calypso/privacy.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy policy
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <a
                href="mailto:calypso.sport.stream@gmail.com"
                className="flex items-center space-x-2 transition-colors duration-200 hover:text-white"
              >
                <Mail size={16} aria-hidden="true" />
                <span>calypso.sport.stream@gmail.com</span>
              </a>
              <a
                href="https://danielhergil.github.io/calypso/privacy.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 transition-colors duration-200 hover:text-white"
              >
                <Shield size={16} aria-hidden="true" />
                <span>Privacy &amp; data policy</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <p className="text-center md:text-left">
              © {currentYear} Calypso Sports Streaming. Crafted for federations, clubs, and creators.
            </p>

            <div className="flex items-center space-x-2">
              <span>Made with</span>
              <Heart size={16} aria-hidden="true" className="text-red-500" />
              <span>for live sports storytellers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
