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
import BillingResult from './components/BillingResult';
import AccountPage from './components/AccountPage';

function App() {
  const [path, setPath] = useState(typeof window !== 'undefined' ? window.location.pathname : '/');

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname);
    window.addEventListener('popstate', syncPath);
    window.addEventListener('app:navigate', syncPath);
    return () => {
      window.removeEventListener('popstate', syncPath);
      window.removeEventListener('app:navigate', syncPath);
    };
  }, []);

  const page = (content: React.ReactNode) => (
    <div className="min-h-[100dvh] bg-ink-900 text-fg">
      {content}
      <Footer />
    </div>
  );

  if (path === '/privacy' || path === '/privacy/') {
    return page(<PrivacyPolicy />);
  }

  if (path === '/terms' || path === '/terms/') {
    return page(<TermsOfService />);
  }

  if (path === '/billing/success' || path === '/billing/success/') {
    return page(<BillingResult mode="success" />);
  }

  if (path === '/billing/cancel' || path === '/billing/cancel/') {
    return page(<BillingResult mode="cancel" />);
  }

  if (path === '/account' || path === '/account/') {
    return <AccountPage />;
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
