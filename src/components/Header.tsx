import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Download } from 'lucide-react';
import logoCalypso from '/logo_calypso.png';

const navItems = [
  { label: 'Features', href: 'features' },
  { label: 'Demo', href: 'video' },
  { label: 'Screenshots', href: 'screenshots' },
  { label: 'Wishlist', href: 'wishlist', isHighlighted: true },
  { label: 'SEO Insights', href: 'seo-insights' }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  }, []);

  const handleBrandClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={handleBrandClick}
            className="flex items-center space-x-3 focus:outline-none"
            aria-label="Scroll to top"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
              <img
                src={logoCalypso}
                alt="Calypso sports streaming logo"
                loading="lazy"
                decoding="async"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
            </span>
            <span className="text-left">
              <span className="block text-xl font-bold text-white lg:text-2xl">Calypso</span>
              <span className="hidden text-xs text-gray-400 sm:block">Sports Streaming App</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`text-sm font-medium transition-colors duration-200 ${
                  item.isHighlighted
                    ? 'text-gray-300 hover:text-purple-300 relative'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {item.isHighlighted && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                )}
              </a>
            ))}
            <a
              href="#download"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('download');
              }}
              className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:from-purple-600 hover:to-pink-600 hover:scale-105"
            >
              <Download size={16} aria-hidden="true" />
              <span>Download</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-lg bg-gray-800 p-2 text-white transition-colors duration-200 hover:bg-gray-700 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-full z-50 border-t border-gray-800 bg-gray-900/95 backdrop-blur-md md:hidden">
            <div className="space-y-4 px-4 py-6" style={{ maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={`#${item.href}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`block w-full rounded-lg px-2 py-2 text-left text-gray-300 transition-colors duration-200 hover:text-white ${
                    item.isHighlighted ? 'relative hover:text-purple-300' : ''
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {item.label}
                    {item.isHighlighted && (
                      <span className="ml-2 h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                    )}
                  </span>
                </a>
              ))}
              <a
                href="#download"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection('download');
                }}
                className="mt-4 flex w-full items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-purple-600 hover:to-pink-600"
              >
                <Download size={16} aria-hidden="true" />
                <span>Download Free</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;