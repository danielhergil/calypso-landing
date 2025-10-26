import React from 'react';
import { Star, Shield, Zap } from 'lucide-react';

const Download = () => {
  return (
    <section id="download" className="py-20 lg:py-32 relative overflow-hidden" aria-labelledby="download-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-gray-900 to-black"></div>
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12 lg:space-y-16">
          {/* Header */}
          <div className="space-y-6">
            <div className="inline-flex items-center bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
              <Shield size={16} className="mr-2" />
              100% Free and Secure
            </div>
            
            <h2 id="download-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Download
              <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Calypso Now
              </span>
            </h2>
            
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of streamers who are already broadcasting sports 
              like professionals from their mobile devices.
            </p>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            {/* Google Play Button */}
            <a
              href="https://play.google.com/store/apps/details?id=com.danihg.calypso"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-4 bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-200 transform hover:scale-105 shadow-xl border border-gray-700 hover:border-red-500/50 w-full sm:w-auto justify-center"
            >
              <img
                src="/google_play_logo.png"
                alt="Download Calypso on Google Play Store"
                className="w-10 h-10 rounded-full object-cover shadow-lg"
              />
              <div className="text-left">
                <div className="text-sm text-gray-400">Download on</div>
                <div className="font-bold">Google Play</div>
              </div>
            </a>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto mt-16 lg:mt-20">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <Shield size={32} className="text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white">100% Free</h3>
              <p className="text-gray-400">
                No hidden costs, no subscriptions. All features available for free.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <Star size={32} className="text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Premium Quality</h3>
              <p className="text-gray-400">
                Professional streaming tools in the palm of your hand.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <Zap size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Easy to Use</h3>
              <p className="text-gray-400">
                Intuitive interface that lets you start streaming in minutes.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-3xl mx-auto pt-12 lg:pt-16 border-t border-gray-800">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-red-400 mb-2">5★</div>
              <p className="text-gray-400 text-sm">Average rating</p>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-blue-400 mb-2">10K+</div>
              <p className="text-gray-400 text-sm">Downloads</p>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-green-400 mb-2">24/7</div>
              <p className="text-gray-400 text-sm">Available</p>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-2">$0</div>
              <p className="text-gray-400 text-sm">Total cost</p>
            </div>
          </div>

          {/* Legal Note */}
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            By downloading Calypso, you accept our terms of service and privacy policy. 
            The app is compatible with Android 6.0 or higher.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Download;