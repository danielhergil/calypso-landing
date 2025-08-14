import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import VideoSection from './components/VideoSection';
import Screenshots from './components/Screenshots';
import Wishlist from './components/Wishlist';
import Download from './components/Download';
import Footer from './components/Footer';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-white overflow-x-hidden"
    >
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/30 -z-10" />
      
      <Header />
      <Hero />
      <Features />
      <VideoSection />
      <Screenshots />
      <Wishlist />
      <Download />
      <Footer />
    </motion.div>
  );
}

export default App;