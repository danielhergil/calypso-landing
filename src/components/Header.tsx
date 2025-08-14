import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
              <img
                src="/logo_calypso.png"
                alt="Logo de Calypso"
                className="w-10 h-10 rounded-full object-cover shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-white">Calypso</h1>
              <p className="text-xs text-gray-400 hidden sm:block">Sports Streaming</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('video')}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Demo
            </button>
            <button
              onClick={() => scrollToSection('screenshots')}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Screenshots
            </button>
            <button
              onClick={() => scrollToSection('wishlist')}
              className="text-gray-300 hover:text-purple-400 transition-colors duration-200 relative"
            >
              Wishlist
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
            </button>
            <button
              onClick={() => scrollToSection('download')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Download</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
        <div className="md:hidden absolute top-full inset-x-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 z-50">
          <div
            className="px-4 py-6 space-y-4 overflow-y-auto"
            style={{ maxHeight: 'calc(100vh - 4rem)' }}
          >
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left text-gray-300 hover:text-white py-2 transition-colors duration-200"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('video')}
              className="block w-full text-left text-gray-300 hover:text-white py-2 transition-colors duration-200"
            >
              Demo
            </button>
            <button
              onClick={() => scrollToSection('screenshots')}
              className="block w-full text-left text-gray-300 hover:text-white py-2 transition-colors duration-200"
            >
              Screenshots
            </button>
            <button
              onClick={() => scrollToSection('wishlist')}
              className="block w-full text-left text-gray-300 hover:text-purple-400 py-2 transition-colors duration-200 relative"
            >
              <span className="flex items-center">
                Wishlist
                <div className="ml-2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              </span>
            </button>
            <button
              onClick={() => scrollToSection('download')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center justify-center space-x-2 mt-4"
            >
              <Download size={16} />
              <span>Download Free</span>
            </button>
          </div>
        </div>
      )}

      </div>
    </header>
  );
};

export default Header;