import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Production from './components/Production';
import VideoSection from './components/VideoSection';
import Screenshots from './components/Screenshots';
import Pricing from './components/Pricing';
import Wishlist from './components/Wishlist';
import Download from './components/Download';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

function App() {
  const [path, setPath] = useState(typeof window !== 'undefined' ? window.location.pathname : '/');

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname);
    window.addEventListener('popstate', syncPath);
    return () => window.removeEventListener('popstate', syncPath);
  }, []);

  if (path === '/privacy' || path === '/privacy/') {
    return (
      <div className="min-h-[100dvh] bg-ink-900 text-fg">
        <PrivacyPolicy />
        <Footer />
      </div>
    );
  }

  if (path === '/terms' || path === '/terms/') {
    return (
      <div className="min-h-[100dvh] bg-ink-900 text-fg">
        <TermsOfService />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-ink-900 text-fg">
      <Header />
      <main id="main-content">
        <Hero />
        <Features />
        <Production />
        <VideoSection />
        <Screenshots />
        <Pricing />
        <Wishlist />
        <Download />
      </main>
      <Footer />
    </div>
  );
}

export default App;
