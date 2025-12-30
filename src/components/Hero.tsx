import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Sparkles, Radio, Video, Zap } from 'lucide-react';

const Hero = () => {

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
    <section className="relative pt-20 lg:pt-32 pb-16 lg:pb-24 overflow-hidden" aria-label="Hero section">
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
                className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30"
              >
                <Sparkles size={16} className="mr-2 text-purple-400" />
                <span className="text-purple-300">BETA • Free Forever While in Beta</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight font-heading"
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
                <strong className="text-white"> Join our beta and get all Pro features completely free</strong> while
                helping us build the future of mobile sports streaming.
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
                className="flex items-center space-x-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/30"
              >
                <Star className="text-green-400" size={20} />
                <span className="text-white font-semibold">Beta - Free Forever</span>
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
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-2xl relative overflow-hidden cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles size={20} className="relative z-10" />
                <span className="relative z-10">Join Beta - Get Pro Free</span>
                <motion.div
                  animate={{ x: [0, 100, -100, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 motion-safe:animate-none"
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToVideo}
                className="border-2 border-gray-600 hover:border-purple-500 text-white hover:text-purple-400 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 backdrop-blur-sm cursor-pointer"
              >
                <Play size={20} />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Delightful 2D Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
              {/* Floating animated phone */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotateY: [0, 5, 0, -5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
                style={{ perspective: '1000px' }}
              >
                {/* Phone Container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-[280px] h-[560px] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[3rem] p-3 shadow-2xl border-4 border-gray-700"
                >
                  {/* Screen Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-red-500/30 rounded-[2.7rem] blur-2xl"></div>

                  {/* Phone Screen */}
                  <div className="relative w-full h-full bg-[#252525] rounded-[2.5rem] overflow-hidden">
                    {/* Screen Content - Calypso Home Screen */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8">
                      {/* Logo with animated glow */}
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="relative mb-12 mt-8"
                      >
                        {/* Animated glow effect */}
                        <motion.div
                          animate={{
                            opacity: [0.2, 0.4, 0.2],
                            scale: [1, 1.15, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-red-500/30 rounded-full blur-xl"
                        ></motion.div>

                        {/* Actual logo image */}
                        <img
                          src="/logo_calypso_transparent.png"
                          alt="Calypso Logo"
                          className="relative w-28 h-28 object-contain"
                        />
                      </motion.div>

                      {/* App Title */}
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-white text-[32px] font-semibold tracking-tight mb-1"
                      >
                        Calypso
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-400 text-base mb-20"
                      >
                        Sports Streaming
                      </motion.p>

                      {/* Buttons */}
                      <div className="w-full space-y-3 px-2 mb-8">
                        {/* Sign up free button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-[#d94b4b] hover:bg-[#e05555] text-white text-[15px] font-medium py-2.5 rounded-full shadow-lg transition-colors"
                        >
                          Sign up free
                        </motion.button>

                        {/* Continue with Google button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-transparent border border-gray-600 text-white text-[14px] font-normal py-2 rounded-full flex items-center justify-center gap-2 hover:border-gray-500 transition-colors"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          <span className="whitespace-nowrap">Continue with Google</span>
                        </motion.button>

                        {/* Log In button */}
                        <div className="flex justify-center">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-1/2 bg-transparent border border-gray-700 text-white text-[15px] font-normal py-2 rounded-full hover:border-gray-600 transition-colors"
                          >
                            Log In
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10"></div>
                  </div>

                  {/* Volume Buttons */}
                  <div className="absolute left-0 top-24 w-1 h-12 bg-gray-700 rounded-r-lg -translate-x-full"></div>
                  <div className="absolute left-0 top-40 w-1 h-8 bg-gray-700 rounded-r-lg -translate-x-full"></div>

                  {/* Power Button */}
                  <div className="absolute right-0 top-32 w-1 h-16 bg-gray-700 rounded-l-lg translate-x-full"></div>
                </motion.div>
              </motion.div>

              {/* Floating Elements Around Phone - Sports/Streaming Theme */}

              {/* Signal Wave Rings */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-2 border-red-500/30 rounded-full pointer-events-none"
              />

              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-2 border-red-500/30 rounded-full pointer-events-none"
              />

              {/* Minimal Floating Icons */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-16 right-16"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full"></div>
                  <Radio className="text-red-400 relative" size={28} />
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-24 left-16"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full"></div>
                  <Video className="text-red-400 relative" size={28} />
                </div>
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/3 right-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full"></div>
                  <Zap className="text-red-400 relative" size={24} />
                </div>
              </motion.div>

              {/* Subtle Glow Effects */}
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;