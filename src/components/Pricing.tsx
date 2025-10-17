import React from 'react';
import { Check, Sparkles, Zap, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const scrollToDownload = () => {
    const element = document.getElementById('download');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="text-purple-400" size={16} />
            <span className="text-purple-300 text-sm font-medium">Limited Time Beta Access</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Start streaming for <strong className="text-white">free forever</strong> during beta.
            Upgrade later for unlimited features.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan - Currently Active */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-75 blur"></div>
            <div className="relative bg-gray-900 rounded-2xl p-8 border border-purple-500/50 h-full">
              {/* Beta Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                  <Zap size={16} className="animate-pulse" />
                  <span>BETA - AVAILABLE NOW</span>
                </div>
              </div>

              <div className="text-center mb-8 mt-6">
                <h3 className="text-2xl font-bold text-white mb-2">Free Forever</h3>
                <p className="text-gray-400 mb-4">While in beta</p>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-5xl font-bold text-white">$0</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-purple-400 font-semibold mt-2">All features unlocked during beta</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Unlimited HD streaming to YouTube & Twitch</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">All overlay styles & graphics</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Unlimited team management</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Live score tracking & overlays</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Multi-camera support</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Instant replay features</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Local recording</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">No sponsor banners</span>
                </div>
              </div>

              <button
                onClick={scrollToDownload}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Download Free Now
              </button>

              <p className="text-center text-sm text-gray-400 mt-4">
                No credit card required • Instant access
              </p>
            </div>
          </motion.div>

          {/* Pro Plan - Coming After Beta */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gray-800/50 rounded-2xl p-8 border border-gray-700 h-full backdrop-blur-sm">
              {/* Coming Soon Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gray-700 text-gray-300 px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                  <Lock size={16} />
                  <span>AFTER BETA</span>
                </div>
              </div>

              <div className="text-center mb-8 mt-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>
                <p className="text-gray-400 mb-4">Available after beta ends</p>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-5xl font-bold text-white">$4.99</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">Everything you need to stream like a pro</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300"><strong className="text-white">Everything in Free</strong>, plus:</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">No sponsor banners in streams</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Unlimited overlay styles & customization</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Unlimited team creation & management</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Advanced instant replay controls</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Priority customer support</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Early access to new features</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Custom branding options</span>
                </div>
              </div>

              <button
                disabled
                className="w-full bg-gray-700 text-gray-400 font-bold py-4 rounded-xl cursor-not-allowed opacity-60"
              >
                Available After Beta
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Beta users get early bird discounts
              </p>
            </div>
          </motion.div>
        </div>

        {/* Feature Comparison Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-2xl p-8 max-w-3xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Why Join the Beta?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                  <Sparkles className="text-purple-400" size={24} />
                </div>
                <h4 className="font-semibold text-white mb-2">Free Forever Access</h4>
                <p className="text-gray-400 text-sm">
                  All beta testers get the Pro features completely free while helping us improve the app.
                </p>
              </div>
              <div>
                <div className="bg-pink-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                  <Zap className="text-pink-400" size={24} />
                </div>
                <h4 className="font-semibold text-white mb-2">Early Bird Pricing</h4>
                <p className="text-gray-400 text-sm">
                  Beta users receive exclusive discounts on Pro plans when beta ends.
                </p>
              </div>
              <div>
                <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                  <Check className="text-blue-400" size={24} />
                </div>
                <h4 className="font-semibold text-white mb-2">Shape the Future</h4>
                <p className="text-gray-400 text-sm">
                  Your feedback directly influences new features and improvements.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Free Plan Details After Beta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6 max-w-3xl mx-auto">
            <h4 className="text-lg font-semibold text-white mb-3">Free Plan After Beta</h4>
            <p className="text-gray-400 text-sm mb-4">
              Even after beta ends, you can continue using Calypso for free with these features:
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-300">
              <div className="flex items-center justify-center space-x-2">
                <Check className="text-green-400" size={16} />
                <span>HD streaming to all platforms</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="text-green-400" size={16} />
                <span>Basic overlay styles (limited)</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="text-green-400" size={16} />
                <span>Up to 3 teams</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="text-green-400" size={16} />
                <span>Occasional sponsor banners</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
