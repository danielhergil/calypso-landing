import React from 'react';
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
    <section id="features" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16 lg:mb-24">
          <div className="inline-flex items-center bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium">
            <Zap size={16} className="mr-2" />
            Key features
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Everything you need to
            <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              stream like a professional
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Calypso combines all professional sports streaming tools 
            in a single mobile app, completely free.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 lg:p-8 hover:bg-gray-700/50 hover:border-red-500/30 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 lg:mt-24">
          <p className="text-gray-400 mb-6">Ready to start streaming?</p>
          <button 
            onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-xl"
          >
            Download Calypso Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;