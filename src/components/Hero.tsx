import React from 'react';
import { Play, Star, Users, Zap } from 'lucide-react';

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

  return (
    <section className="relative pt-20 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-red-900/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium">
                <Zap size={16} className="mr-2" />
                Professional sports streaming
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-white">Stream Smart</span>
                <br />
                <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  Make It Flow
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-300 max-w-2xl">
                The ultimate app for sports streaming from your mobile. 
                Create teams, manage scoreboards and stream live to 
                YouTube, Twitch and more platforms.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-center">
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-400" size={20} />
                <span className="text-white font-semibold">100% Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <Play className="text-red-400" size={20} />
                <span className="text-white font-semibold">HD Streaming</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToDownload}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-xl"
              >
                Download Free
              </button>
              <button
                onClick={scrollToVideo}
                className="border-2 border-gray-600 hover:border-red-500 text-white hover:text-red-400 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Play size={20} />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;