import React, { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Sparkles } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import PhoneModel, { TextureDebugPanel } from './PhoneModel';
import * as THREE from 'three';

const Hero = () => {
  // Texture adjustment state (only for dev mode)
  const [rotation, setRotation] = useState(-Math.PI / 2); // -90 degrees
  const [repeatX, setRepeatX] = useState(5.00);
  const [repeatY, setRepeatY] = useState(4.50);
  const [offsetX, setOffsetX] = useState(-0.60);
  const [offsetY, setOffsetY] = useState(-0.04);
  const [flipY, setFlipY] = useState(true);

  // Lighting state
  const [ambientIntensity, setAmbientIntensity] = useState(0.4);
  const [spotIntensity, setSpotIntensity] = useState(0);
  const [pointIntensity, setPointIntensity] = useState(0);
  const [envIntensity, setEnvIntensity] = useState(0.65);
  const [toneMappingExposure, setToneMappingExposure] = useState(1.2);

  // Material state
  const [roughness, setRoughness] = useState(0);
  const [metalness, setMetalness] = useState(0);
  const [envMapIntensity, setEnvMapIntensity] = useState(0.2);

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
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-2xl relative overflow-hidden"
              >
                <span className="relative z-10">🎉 Join Beta - Get Pro Free</span>
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

          {/* 3D Phone Model */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full h-[500px] lg:h-[600px]">
              <Canvas
                camera={{ position: [0, 0, 10], fov: 35 }}
                style={{ background: 'transparent' }}
                gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure }}
              >
                <Suspense fallback={null}>
                  {/* Lighting - adjustable via debug panel */}
                  <ambientLight intensity={ambientIntensity} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={spotIntensity} />
                  <pointLight position={[-10, -10, -10]} intensity={pointIntensity} />

                  {/* Phone Model */}
                  <PhoneModel
                    modelPath="/models/samsung_s24_ultra.glb"
                    rotation={rotation}
                    repeatX={repeatX}
                    repeatY={repeatY}
                    offsetX={offsetX}
                    offsetY={offsetY}
                    flipY={flipY}
                    roughness={roughness}
                    metalness={metalness}
                    envMapIntensity={envMapIntensity}
                  />

                  {/* Environment for reflections */}
                  <Environment preset="city" environmentIntensity={envIntensity} />

                  {/* Controls for rotation */}
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.5}
                    autoRotate
                    autoRotateSpeed={1}
                  />
                </Suspense>
              </Canvas>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500/20 rounded-full blur-xl animate-pulse pointer-events-none"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000 pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Debug Panel - Outside Canvas, only in dev */}
      {import.meta.env.DEV && (
        <TextureDebugPanel
          rotation={rotation}
          setRotation={setRotation}
          repeatX={repeatX}
          setRepeatX={setRepeatX}
          repeatY={repeatY}
          setRepeatY={setRepeatY}
          offsetX={offsetX}
          setOffsetX={setOffsetX}
          offsetY={offsetY}
          setOffsetY={setOffsetY}
          flipY={flipY}
          setFlipY={setFlipY}
          ambientIntensity={ambientIntensity}
          setAmbientIntensity={setAmbientIntensity}
          spotIntensity={spotIntensity}
          setSpotIntensity={setSpotIntensity}
          pointIntensity={pointIntensity}
          setPointIntensity={setPointIntensity}
          envIntensity={envIntensity}
          setEnvIntensity={setEnvIntensity}
          toneMappingExposure={toneMappingExposure}
          setToneMappingExposure={setToneMappingExposure}
          roughness={roughness}
          setRoughness={setRoughness}
          metalness={metalness}
          setMetalness={setMetalness}
          envMapIntensity={envMapIntensity}
          setEnvMapIntensity={setEnvMapIntensity}
        />
      )}
    </section>
  );
};

export default Hero;