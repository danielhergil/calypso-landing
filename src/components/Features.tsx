import React from 'react';
import { motion } from 'framer-motion';
import { Video, Users, Settings, Podcast as Broadcast, Trophy, Smartphone, Zap, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Video,
      title: 'HD Streaming',
      description: 'Stream in high definition with customizable resolution, bitrate and FPS settings.',
      color: 'text-red-400 bg-red-400/10'
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Create and manage your teams with players, custom logos and lineups.',
      color: 'text-blue-400 bg-blue-400/10'
    },
    {
      icon: Trophy,
      title: 'Live Scoreboards',
      description: 'Display real-time scores and statistics during your broadcasts.',
      color: 'text-green-400 bg-green-400/10'
    },
    {
      icon: Broadcast,
      title: 'Multiple Platforms',
      description: 'Connect to YouTube, Twitch and other platforms using RTMP configuration.',
      color: 'text-purple-400 bg-purple-400/10'
    },
    {
      icon: Smartphone,
      title: 'From Your Mobile',
      description: 'Everything you need is in your phone. No complicated additional equipment.',
      color: 'text-yellow-400 bg-yellow-400/10'
    },
    {
      icon: Settings,
      title: 'Advanced Settings',
      description: 'Control every aspect of your stream with professional options.',
      color: 'text-indigo-400 bg-indigo-400/10'
    },
    {
      icon: Zap,
      title: 'Local Recording',
      description: 'Record your matches locally while streaming or as backup.',
      color: 'text-orange-400 bg-orange-400/10'
    },
    {
      icon: Shield,
      title: '100% Free',
      description: 'All features are available at no cost. No hidden subscriptions.',
      color: 'text-emerald-400 bg-emerald-400/10'
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32 relative overflow-hidden" aria-labelledby="features-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900"></div>
      
      {/* Animated background elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-l from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
      />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-16 lg:mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-6 py-3 rounded-full text-sm font-medium border border-purple-500/30"
          >
            <Zap size={16} className="mr-2" />
            Key features
          </motion.div>
          
          <motion.h2
            id="features-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            Everything you need to
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              stream like a professional
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Discover why thousands of content creators choose Calypso for their 
            sports streaming needs. Professional-grade features that were once 
            exclusive to expensive desktop software, now in your pocket.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.05,
                  rotateZ: 2,
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 lg:p-8 hover:bg-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 lg:mt-24"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 mb-6"
          >
            Ready to start streaming?
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-2xl"
          >
            Download Calypso Free
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;