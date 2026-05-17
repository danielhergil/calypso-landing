import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import type { BillingMe } from '../lib/billingApi';
import { fetchBillingMe } from '../lib/billingApi';
import { getClientAuthContext } from '../lib/authContext';
import { writeBillingSnapshot } from '../lib/subscriptionLedger';
import { navigateTo } from '../lib/navigation';

type BillingResultProps = {
  mode: 'success' | 'cancel';
};

const BillingResult = ({ mode }: BillingResultProps) => {
  const [message, setMessage] = useState('Checking subscription status...');
  const [billing, setBilling] = useState<BillingMe | null>(null);

  useEffect(() => {
    if (mode === 'cancel') {
      const unsub = onAuthStateChanged(auth, (user) => {
        navigateTo(user ? '/account' : '/');
      });
      return () => unsub();
    }
  }, [mode]);

  useEffect(() => {
    const run = async () => {
      const auth = getClientAuthContext();
      if (!auth) {
        setMessage('No active app session found. Return to Calypso app and try again.');
        return;
      }

      try {
        const startedAt = Date.now();
        let latest: BillingMe | null = null;

        // Stripe webhook -> Firestore sync can take a few seconds.
        while (Date.now() - startedAt < 45000) {
          latest = await fetchBillingMe(auth);
          if (mode === 'cancel') {
            break;
          }
          if (latest.accountType !== 'basic' || latest.subscriptionStatus === 'active' || latest.subscriptionStatus === 'trialing') {
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 2500));
        }

        if (!latest) {
          throw new Error('Billing state unavailable');
        }

        setBilling(latest);
        await writeBillingSnapshot(auth.uid, latest, mode === 'success' ? 'checkout_success' : 'checkout_cancel');
        setMessage(mode === 'success' ? 'Subscription sync completed.' : 'Checkout cancelled. Your previous plan is unchanged.');
      } catch (error) {
        console.error(error);
        setMessage('Could not refresh billing status. You can retry from the pricing section.');
      }
    };

    run();
  }, [mode]);

  const Icon = mode === 'success' ? CheckCircle2 : XCircle;
  const color = mode === 'success' ? 'text-green-400' : 'text-amber-400';

  return (
    <section className="min-h-[65vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center"
      >
        <Icon className={`${color} mx-auto mb-4`} size={52} />
        <h1 className="text-3xl font-bold text-white mb-3">
          {mode === 'success' ? 'Payment Completed' : 'Checkout Cancelled'}
        </h1>
        <p className="text-gray-300 mb-6">{message}</p>
        {billing && (
          <p className="text-sm text-gray-400">
            Current plan: <strong className="text-white uppercase">{billing.accountType}</strong>
            {billing.subscriptionStatus ? ` (${billing.subscriptionStatus})` : ''}
          </p>
        )}
        <a
          href="/"
          className="inline-block mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Back to Pricing
        </a>
      </motion.div>
    </section>
  );
};

export default BillingResult;
