import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';

const Screenshots = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const screenshots = [
    {
      title: 'Main Screen',
      description: 'Main interface with quick access to camera and team management',
      features: ['Calypso Logo', 'Camera Access', 'Team Management']
    },
    {
      title: 'Sign In',
      description: 'Free registration and Google access for greater convenience',
      features: ['Free Registration', 'Google Login', 'Clean Interface']
    },
    {
      title: 'Team Management',
      description: 'Manage your teams with custom logos and detailed information',
      features: ['Custom Teams', 'Unique Logos', 'Complete Management']
    },
    {
      title: 'Live Streaming',
      description: 'Streaming interface with professional controls and RTMP configuration',
      features: ['HD Controls', 'RTMP Configuration', 'Professional Streaming']
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <section id="screenshots" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-gray-800"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16 lg:mb-24">
          <div className="inline-flex items-center bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium">
            <Smartphone size={16} className="mr-2" />
            Screenshots
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Intuitive and
            <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Professional Interface
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Explore every screen of Calypso and discover how easy it is to create 
            professional quality sports broadcasts.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Phone Mockup */}
          <div className="relative flex-shrink-0">
            <div className="w-80 h-[640px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                {/* Mock screenshot content based on current index */}
                {currentIndex === 1 && (
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center space-y-8 p-8">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                      <img
                        src="/logo_calypso.png"
                        alt="Logo de Calypso"
                        className="w-20 h-20 rounded-full object-cover shadow-lg"
                      />
                    </div>
                    <div className="space-y-6 w-full">
                      <div className="bg-gray-800 rounded-xl p-4 flex items-center space-x-4">
                        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                          <img
                            src="/ic_camara.png"
                            alt="Camera icon"
                            className="w-5 h-5 object-contain filter invert"
                          />
                        </div>
                        <span className="text-white font-medium">Camera</span>
                      </div>
                      <div className="bg-gray-800 rounded-xl p-4 flex items-center space-x-4">
                        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-lg">+</span>
                        </div>
                        <span className="text-white font-medium">Add Team</span>
                      </div>
                    </div>
                  </div>
                )}

                {currentIndex === 0 && (
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center space-y-8 p-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                      <img
                        src="/logo_calypso.png"
                        alt="Logo de Calypso"
                        className="w-16 h-16 rounded-full object-cover shadow-lg"
                      />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-white text-2xl font-bold">Calypso</h3>
                      <p className="text-gray-400">Sports Streaming</p>
                    </div>
                    <div className="space-y-4 w-full">
                      <div className="bg-red-500 py-3 px-6 rounded-xl text-center text-white font-medium">
                        Sign up free
                      </div>
                      <div className="border border-gray-600 py-3 px-6 rounded-xl text-center text-white font-medium flex items-center justify-center space-x-2">
                        <img
                          src="/google_logo.png"
                          alt="Logo de Google"
                          className="w-4 h-4 object-contain"
                        />
                        <span>Continue with Google</span>
                      </div>
                      <div className="text-center">
                        <span className="text-gray-400">Log In</span>
                      </div>
                    </div>
                  </div>
                )}

                {currentIndex === 2 && (
                  <div className="absolute inset-0 bg-gray-900 p-4 space-y-4">
                    {['Alcorcon', 'Lubians', 'Fuenlabrada', 'Mostoles'].map((team, idx) => (
                      <div key={idx} className="bg-gray-800 rounded-xl p-4 flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg"></div>
                        <span className="text-white font-medium">{team}</span>
                        <div className="ml-auto text-gray-400">›</div>
                      </div>
                    ))}
                    <div className="fixed bottom-8 right-8">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">+</span>
                      </div>
                    </div>
                  </div>
                )}

                {currentIndex === 3 && (
                  <div className="absolute inset-0 p-4">
                    <img
                      src="/camera_screenshot.jpeg"
                      alt="Live streaming interface"
                      className="w-full max-h-[800px] object-cover rounded-xl shadow-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                {screenshots[currentIndex].title}
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                {screenshots[currentIndex].description}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-red-400">Featured highlights:</h4>
              <ul className="space-y-2">
                {screenshots[currentIndex].features.map((feature, idx) => (
                  <li key={idx} className="flex items-center justify-center lg:justify-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center lg:justify-start space-x-2 pt-4">
              {screenshots.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    idx === currentIndex ? 'bg-red-500' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Screenshots;