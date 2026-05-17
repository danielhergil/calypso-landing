import React, { useEffect, useState } from 'react';
import { Check, Sparkles, Zap, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { createPortalSession, fetchBillingMe, type BillingMe, type BillingPlan } from '../lib/billingApi';
import { getClientAuthContext } from '../lib/authContext';
import { writeBillingSnapshot } from '../lib/subscriptionLedger';
import { navigateTo } from '../lib/navigation';

const Pricing = () => {
  const [isLoadingPlan, setIsLoadingPlan] = useState<null | BillingPlan | 'portal'>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [billing, setBilling] = useState<BillingMe | null>(null);
  const [auth, setAuth] = useState(() => getClientAuthContext());

  useEffect(() => {
    const syncAuth = () => setAuth(getClientAuthContext());
    window.addEventListener('focus', syncAuth);
    window.addEventListener('app:navigate', syncAuth);
    return () => {
      window.removeEventListener('focus', syncAuth);
      window.removeEventListener('app:navigate', syncAuth);
    };
  }, []);

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsub = onSnapshot(doc(db, 'users', auth.uid), (snap) => {
      const data = snap.data();
      if (!data) {
        return;
      }

      setBilling({
        accountType: (data.accountType ?? 'basic') as BillingMe['accountType'],
        subscriptionStatus: (data.subscriptionStatus ?? null) as string | null,
        subscriptionCurrentPeriodEnd: (data.subscriptionCurrentPeriodEnd ?? null) as string | null,
        cancelAtPeriodEnd: (data.cancelAtPeriodEnd ?? null) as boolean | null
      });
    });

    return () => unsub();
  }, [auth?.uid]);

  useEffect(() => {
    const syncBilling = async () => {
      if (!auth) {
        return;
      }

      try {
        const me = await fetchBillingMe(auth);
        setBilling(me);
        await writeBillingSnapshot(auth.uid, me, 'pricing_load');
      } catch (error) {
        console.error('Unable to refresh billing state:', error);
      }
    };

    syncBilling();
  }, [auth?.uid, auth?.idToken]);

  const scrollToDownload = () => {
    const element = document.getElementById('download');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToAccountForCheckout = (plan: BillingPlan) => {
    setStatusMessage(`Continue in Account to choose ${plan === 'pro' ? 'Pro' : 'Max'} after login.`);
    navigateTo('/account');
  };

  const openPortal = async () => {
    if (!auth) {
      setStatusMessage('Sign in from the Calypso app first to manage your subscription.');
      return;
    }

    try {
      setIsLoadingPlan('portal');
      setStatusMessage('');
      const { url } = await createPortalSession(auth);
      window.location.href = url;
    } catch (error) {
      console.error(error);
      setStatusMessage('Unable to open billing portal for this account.');
    } finally {
      setIsLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="text-purple-400" size={16} />
            <span className="text-purple-300 text-sm font-medium">Plans Built for Streaming Volume</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent font-heading">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Start free, then scale with higher monthly stream capacity and YouTube API operations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative bg-gray-900 rounded-2xl p-8 border border-gray-700 h-full">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gray-700 text-gray-300 px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                  <Zap size={16} />
                  <span>BASIC</span>
                </div>
              </div>

              <div className="text-center mb-8 mt-6">
                <h3 className="text-2xl font-bold text-white mb-2">Basic</h3>
                <p className="text-gray-400 mb-4">For testing and occasional use</p>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-5xl font-bold text-white">$0.00</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Total streams: 2</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Streams per month: 2</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">YouTube API ops/month: 12</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Lock className="text-gray-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">External broadcast sync: No</span>
                </div>
              </div>

              <button
                onClick={scrollToDownload}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-xl transition-colors duration-200 shadow-lg cursor-pointer"
              >
                Start Free
              </button>

              <p className="text-center text-sm text-gray-400 mt-4">No credit card required</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-75 blur"></div>
            <div className="relative bg-gray-900 rounded-2xl p-8 border border-purple-500/50 h-full">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                  <Sparkles size={16} />
                  <span>MOST POPULAR</span>
                </div>
              </div>

              <div className="text-center mb-8 mt-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <p className="text-gray-400 mb-4">For active weekly creators</p>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-5xl font-bold text-white">$2.99</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Total streams: Unlimited</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Streams per month: 20</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">YouTube API ops/month: 240</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">External broadcast sync: Yes</span>
                </div>
              </div>

              <button
                onClick={() => goToAccountForCheckout('pro')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-xl transition-colors duration-200 shadow-lg cursor-pointer"
              >
                Choose Pro
              </button>

              <p className="text-center text-sm text-gray-400 mt-4">Upgrade takes effect immediately</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-gray-800/50 rounded-2xl p-8 border border-gray-700 h-full backdrop-blur-sm">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gray-700 text-gray-300 px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                  <Lock size={16} />
                  <span>HIGH VOLUME</span>
                </div>
              </div>

              <div className="text-center mb-8 mt-6">
                <h3 className="text-2xl font-bold text-white mb-2">Max</h3>
                <p className="text-gray-400 mb-4">For intensive operations</p>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-5xl font-bold text-white">$9.99</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Total streams: Unlimited</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">Streams per month: 50</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">YouTube API ops/month: 1000</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">External broadcast sync: Yes</span>
                </div>
              </div>

              <button
                onClick={() => goToAccountForCheckout('max')}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                Choose Max
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">Built for teams and frequent events</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-2xl p-8 max-w-5xl w-full">
            <h3 className="text-2xl font-bold text-white mb-6 font-heading">Plan Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 text-gray-300 font-semibold">Feature</th>
                    <th className="py-3 text-gray-300 font-semibold">Basic</th>
                    <th className="py-3 text-gray-300 font-semibold">Pro</th>
                    <th className="py-3 text-gray-300 font-semibold">Max</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800">
                    <td className="py-3">Price</td>
                    <td className="py-3">$0.00</td>
                    <td className="py-3">$2.99</td>
                    <td className="py-3">$9.99</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3">Total streams</td>
                    <td className="py-3">2</td>
                    <td className="py-3">Unlimited</td>
                    <td className="py-3">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3">Streams per month</td>
                    <td className="py-3">2</td>
                    <td className="py-3">20</td>
                    <td className="py-3">50</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3">YouTube API ops/month</td>
                    <td className="py-3">12</td>
                    <td className="py-3">240</td>
                    <td className="py-3">1000</td>
                  </tr>
                  <tr>
                    <td className="py-3">External broadcast sync</td>
                    <td className="py-3">No</td>
                    <td className="py-3">Yes</td>
                    <td className="py-3">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center space-y-3">
          {billing?.accountType && (
            <p className="text-sm text-gray-300">
              Current plan: <strong className="text-white uppercase">{billing.accountType}</strong>
              {billing.subscriptionStatus ? ` (${billing.subscriptionStatus})` : ''}
            </p>
          )}
          <button
            onClick={openPortal}
            disabled={isLoadingPlan !== null || !auth}
            className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg text-sm transition-colors duration-200 cursor-pointer"
          >
            {isLoadingPlan === 'portal' ? 'Opening portal...' : 'Manage Subscription'}
          </button>
          {statusMessage && <p className="text-sm text-amber-300">{statusMessage}</p>}
          {!auth && (
            <p className="text-xs text-gray-500">
              Billing actions require a Firebase session (uid and idToken) from the app.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
