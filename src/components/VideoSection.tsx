import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const VideoSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  // Placeholder for YouTube video - replace with your actual video ID
  const youtubeVideoId = 'dQw4w9WgXcQ'; // Replace with your actual YouTube video ID

  const openVideo = () => {
    setVideoUrl(`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`);
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    setVideoUrl('');
  };

  return (
    <section id="video" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
      
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            See Calypso in
            <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how Calypso transforms your sports streaming experience 
            with professional tools at your fingertips.
          </p>
        </div>

        {/* Video Preview */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl group cursor-pointer" onClick={openVideo}>
            {/* Thumbnail - Replace with your video thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-gray-900 flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center mx-auto transition-all duration-300 transform group-hover:scale-110 shadow-xl">
                  <Play size={32} className="text-white ml-1" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">Calypso Demo</h3>
                  <p className="text-gray-300">See how the app works</p>
                </div>
              </div>
            </div>

            {/* Mock interface elements */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center opacity-60 group-hover:opacity-80 transition-opacity duration-300">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">CP</span>
                </div>
                <span className="text-white text-sm font-medium">Calypso Live</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm">LIVE</span>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 opacity-60 group-hover:opacity-80 transition-opacity duration-300">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                <div className="flex justify-between items-center text-white text-sm">
                  <span>Real Madrid vs Barcelona</span>
                  <span className="font-bold">2 - 1</span>
                </div>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Features around video */}
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse hidden lg:block"></div>
          <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-green-500/20 rounded-full blur-xl animate-pulse delay-1000 hidden lg:block"></div>
        </div>

        {/* Additional info */}
        <div className="grid sm:grid-cols-3 gap-8 mt-16 lg:mt-24 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <div className="text-2xl lg:text-3xl font-bold text-red-400">HD</div>
            <p className="text-gray-400">High Definition Streaming</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl lg:text-3xl font-bold text-blue-400">RTMP</div>
            <p className="text-gray-400">Universal Compatibility</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl lg:text-3xl font-bold text-green-400">$0</div>
            <p className="text-gray-400">Completely Free</p>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors duration-200"
            >
              <X size={32} />
            </button>
            <iframe
              src={videoUrl}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;