import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import VideoSection from './components/VideoSection';
import Screenshots from './components/Screenshots';
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

  if (path === '/privacy' || path === '/privacy/') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-900 text-white"
      >
        <PrivacyPolicy />
        <Footer />
      </motion.div>
    );
  }

  if (path === '/terms' || path === '/terms/') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-900 text-white"
      >
        <TermsOfService />
        <Footer />
      </motion.div>
    );
  }

  if (path === '/billing/success' || path === '/billing/success/') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-900 text-white"
      >
        <BillingResult mode="success" />
        <Footer />
      </motion.div>
    );
  }

  if (path === '/billing/cancel' || path === '/billing/cancel/') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-900 text-white"
      >
        <BillingResult mode="cancel" />
        <Footer />
      </motion.div>
    );
  }

  if (path === '/account' || path === '/account/') {
    return <AccountPage />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-white overflow-x-hidden"
    >
      {/* Enhanced animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900/40 to-pink-900/40 -z-10" />
      <motion.div
        animate={{ 
          background: [
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)"
          ]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed inset-0 -z-10"
      />

      <Header />
      <main id="main-content">
        <Hero />
        <Features />
        <Pricing />
        <VideoSection />
        <Screenshots />
        <Wishlist />
        <Download />
      </main>
      <Footer />
    </motion.div>
  );
}

export default App;
