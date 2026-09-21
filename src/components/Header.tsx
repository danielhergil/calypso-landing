import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { navigateTo } from '../lib/navigation';

const NAV = [
  { id: 'features', label: 'Features' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'video', label: 'Demo' },
  { id: 'download', label: 'Download' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setIsScrolled(y > 24));

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const goToAccount = () => {
    navigateTo('/account');
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        isScrolled ? 'bg-ink-900/85 backdrop-blur-xl border-b border-white/[0.07]' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-10">
        <a href="/" className="flex items-center gap-2.5">
          <img src="/shots/logo.png" alt="Calypso" className="h-9 w-9 object-contain" />
          <span className="font-heading text-lg font-bold tracking-tight text-fg">Calypso</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={goToAccount}
            className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-fg transition-colors duration-200 hover:border-brand hover:text-brand-light"
          >
            Account
          </button>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          className="rounded-full border border-white/15 p-2 text-fg md:hidden"
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-white/[0.07] bg-ink-900/95 backdrop-blur-xl md:hidden"
        >
          <div className="space-y-1 px-4 py-4">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full rounded-card px-3 py-3 text-left text-base text-fg-muted hover:bg-white/5 hover:text-fg"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={goToAccount}
              className="mt-2 block w-full rounded-full border border-white/15 px-3 py-3 text-base font-medium text-fg"
            >
              Account
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
