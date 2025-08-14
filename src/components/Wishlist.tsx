import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Wishlist = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    try {
      // Use email as document ID to prevent duplicates
      await setDoc(doc(db, 'wishlist', email), {
        email: email,
        timestamp: new Date(),
        source: 'landing_page'
      });
      
      setStatus('success');
      setMessage("You're on the wishlist! We'll notify you when Calypso launches.");
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      console.error('Error adding email to wishlist:', error);
    }
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-pink-900/20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header */}
          <div className="space-y-6 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-6 py-3 rounded-full text-sm font-medium border border-purple-500/30"
            >
              <Sparkles size={16} className="mr-2" />
              Coming Soon
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            >
              Be the first to know when{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Calypso launches
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Join thousands of streamers already on our wishlist and get exclusive early access 
              to the most advanced mobile streaming platform.
            </motion.p>
          </div>

          {/* Email Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center space-y-4"
              >
                <CheckCircle size={48} className="text-green-400 mx-auto" />
                <p className="text-green-400 font-medium">{message}</p>
                <div className="text-sm text-gray-400">
                  Follow us on social media for updates!
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    disabled={status === 'loading'}
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: status === 'loading' ? 1 : 1.05 }}
                  whileTap={{ scale: status === 'loading' ? 1 : 0.95 }}
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-2xl relative overflow-hidden"
                >
                  <span className="relative z-10">
                    {status === 'loading' ? 'Joining Wishlist...' : 'Join the Wishlist'}
                  </span>
                  {status === 'loading' && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-20"
                    />
                  )}
                </motion.button>
                
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center space-x-2 text-red-400"
                  >
                    <AlertCircle size={16} />
                    <span className="text-sm">{message}</span>
                  </motion.div>
                )}
              </form>
            )}
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-16 grid sm:grid-cols-3 gap-6 lg:gap-8"
          >
            {[
              { title: 'Early Access', desc: 'Be among the first to use Calypso' },
              { title: 'Exclusive Updates', desc: 'Get insider news and development updates' },
              { title: 'Special Launch Price', desc: 'Unlock premium features at launch' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 text-center space-y-3"
              >
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-500">
              🔒 We respect your privacy. Unsubscribe anytime.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Wishlist;