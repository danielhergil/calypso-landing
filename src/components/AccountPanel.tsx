import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { auth } from '../firebase';
import { createCheckoutSession, createPortalSession, fetchBillingMe, type BillingMe, type BillingPlan } from '../lib/billingApi';
import { clearClientAuthContext, getFreshClientAuthContext, setClientAuthContext } from '../lib/authContext';
import { writeBillingSnapshot, writeCheckoutAttempt, writeCheckoutError } from '../lib/subscriptionLedger';

const AccountPanel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [billing, setBilling] = useState<BillingMe | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const refreshBilling = async () => {
    const ctx = await getFreshClientAuthContext();
    if (!ctx) {
      setBilling(null);
      return;
    }

    const me = await fetchBillingMe(ctx);
    setBilling(me);
    await writeBillingSnapshot(ctx.uid, me, 'account_panel_refresh');
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      if (!nextUser) {
        clearClientAuthContext();
        setBilling(null);
        return;
      }

      const idToken = await nextUser.getIdToken();
      setClientAuthContext({ uid: nextUser.uid, idToken });
      try {
        await refreshBilling();
      } catch (error) {
        console.error(error);
      }
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const onFocus = async () => {
      if (!auth.currentUser) {
        return;
      }
      try {
        await refreshBilling();
      } catch (error) {
        console.error(error);
      }
    };

    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onFocus);

    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onFocus);
    };
  }, [user]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();
      setClientAuthContext({ uid: credential.user.uid, idToken });
      await refreshBilling();
      setPassword('');
      setMessage('Logged in successfully.');
    } catch (error) {
      console.error(error);
      setMessage('Login failed. Check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setMessage('');
    try {
      await signOut(auth);
      clearClientAuthContext();
      setMessage('Session closed.');
    } catch (error) {
      console.error(error);
      setMessage('Could not sign out.');
    } finally {
      setLoading(false);
    }
  };

  const startCheckout = async (plan: BillingPlan) => {
    setLoading(true);
    setMessage('');
    try {
      const ctx = await getFreshClientAuthContext();
      if (!ctx) {
        setMessage('Sign in first.');
        return;
      }
      await writeCheckoutAttempt(ctx.uid, plan);
      const { url } = await createCheckoutSession(ctx, plan);
      window.location.href = url;
    } catch (error) {
      console.error(error);
      const ctx = await getFreshClientAuthContext();
      if (ctx) {
        await writeCheckoutError(ctx.uid, plan, error instanceof Error ? error.message : 'checkout_failed');
      }
      setMessage('Could not open checkout.');
    } finally {
      setLoading(false);
    }
  };

  const openPortal = async () => {
    setLoading(true);
    setMessage('');
    try {
      const ctx = await getFreshClientAuthContext();
      if (!ctx) {
        setMessage('Sign in first.');
        return;
      }
      const { url } = await createPortalSession(ctx);
      window.location.href = url;
    } catch (error) {
      console.error(error);
      setMessage('Could not open billing portal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="account" className="py-16 relative overflow-hidden border-t border-gray-800/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-gray-900/80 border border-gray-700 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Account & Billing</h2>

          {!user && (
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 disabled:opacity-60 text-white font-semibold py-3 rounded-lg"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          )}

          {user && (
            <div className="space-y-5">
              <div className="text-sm text-gray-300 space-y-1">
                <p><strong className="text-white">User:</strong> {user.uid}</p>
                <p><strong className="text-white">Email:</strong> {user.email ?? 'No email'}</p>
                <p><strong className="text-white">Account type:</strong> {billing?.accountType ?? 'basic'}</p>
                <p><strong className="text-white">Plan status:</strong> {billing?.subscriptionStatus ?? 'none'}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  onClick={() => startCheckout('pro')}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg"
                >
                  Change to Pro
                </button>
                <button
                  onClick={() => startCheckout('max')}
                  disabled={loading}
                  className="bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg"
                >
                  Change to Max
                </button>
                <button
                  onClick={openPortal}
                  disabled={loading}
                  className="bg-gray-700 hover:bg-gray-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg"
                >
                  Manage / Cancel Plan
                </button>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="bg-gray-800 hover:bg-gray-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg"
                >
                  Sign Out
                </button>
              </div>

              <p className="text-xs text-gray-500">
                To return to Basic, use "Manage / Cancel Plan" and cancel the active subscription. Webhooks will sync your account to Basic automatically.
              </p>
            </div>
          )}

          {message && <p className="mt-4 text-sm text-amber-300">{message}</p>}
        </motion.div>
      </div>
    </section>
  );
};

export default AccountPanel;
