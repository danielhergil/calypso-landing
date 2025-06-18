import React from 'react';
import { Heart, Mail, Globe, Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <img
                  src="/logo_calypso.png"
                  alt="Logo de Calypso"
                  className="w-10 h-10 rounded-full object-cover shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Calypso</h3>
                <p className="text-xs text-gray-400">Sports Streaming</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The ultimate professional sports streaming app from your mobile device. Completely free.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">HD Streaming</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">Team Management</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">Live Scores</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">RTMP Configuration</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">Local Recording</li>
            </ul>
          </div>

          {/* Platforms */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Platforms</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">YouTube Live</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">Twitch</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">Facebook Live</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">Custom RTMP Server</li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <div className="space-y-3">
              <a
                href="mailto:support@calypso.app"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                <Mail size={16} />
                <span>calypso.sport.stream@gmail.com</span>
              </a>
              <a
                href="https://danielhergil.github.io/calypso/privacy.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                <Shield size={16} />
                <span>Privacy Policy</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Calypso Sports Streaming. All rights reserved.
            </p>

            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart size={16} className="text-red-500" />
              <span>for sports streamers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
