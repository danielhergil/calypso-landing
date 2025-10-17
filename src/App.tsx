import React from 'react';
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

function App() {

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