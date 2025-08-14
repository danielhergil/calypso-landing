import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Users, Zap, Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollToDownload = () => {
    const element = document.getElementById('download');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToVideo = () => {
    const element = document.getElementById('video');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWishlist = () => {
    const element = document.getElementById('wishlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-20 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-pink-900/20"></div>
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"
      />
      <motion.div
        animate={{ 
          x: [0, 100, -100, 0],
          y: [0, -50, 50, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-green-500/10 rounded-full blur-2xl"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center bg-gradient-to-r from-red-500/20 to-pink-500/20 text-transparent bg-clip-text px-4 py-2 rounded-full text-sm font-medium border border-red-500/30"
              >
                <Sparkles size={16} className="mr-2 text-red-400" />
                <span className="text-red-400">Professional sports streaming</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              >
                <span className="text-white">Stream Smart</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                  Make It Flow
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed"
              >
                Transform your phone into a professional broadcasting studio. 
                Create stunning sports streams with HD quality, real-time scoreboards, 
                and seamless integration with YouTube, Twitch, and all major platforms.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 text-center"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/30"
              >
                <Star className="text-yellow-400" size={20} />
                <span className="text-white font-semibold">100% Free</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/30"
              >
                <Play className="text-red-400" size={20} />
                <span className="text-white font-semibold">HD Streaming</span>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToWishlist}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-2xl relative overflow-hidden"
              >
                <span className="relative z-10">🚀 Join Wishlist</span>
                <motion.div
                  animate={{ x: [0, 100, -100, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToVideo}
                className="border-2 border-gray-600 hover:border-purple-500 text-white hover:text-purple-400 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 backdrop-blur-sm"
              >
                <Play size={20} />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 1, 0, -1, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* Phone Frame */}
              <div className="w-80 h-[640px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                  {/* Screen Content */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-8 space-y-8">
                    {/* Logo */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-xl">
                      <img
                        src="/logo_calypso.png"
                        alt="Logo de Calypso"
                        className="w-24 h-24 rounded-full object-cover shadow-lg"
                      />
                    </div>
                    
                    <div className="text-center space-y-4">
                      <h2 className="text-white text-3xl font-bold">Calypso</h2>
                      <p className="text-gray-400 text-lg">Sports Streaming</p>
                    </div>

                    {/* Mock Buttons */}
                    <div className="space-y-4 w-full">
                      <div className="bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-2xl text-center font-semibold transition-colors duration-200">
                        Sign up free
                      </div>
                      <div className="border-2 border-gray-600 text-white py-4 px-6 rounded-2xl text-center font-semibold flex items-center justify-center space-x-2">
                        <img
                          src="/google_logo.png"
                          alt="Logo de Google"
                          className="w-5 h-5 object-contain"
                        />
                        <span>Continue with Google</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;