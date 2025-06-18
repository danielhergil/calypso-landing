import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import VideoSection from './components/VideoSection';
import Screenshots from './components/Screenshots';
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
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Header />
      <Hero />
      <Features />
      <VideoSection />
      <Screenshots />
      <Download />
      <Footer />
    </div>
  );
}

export default App;