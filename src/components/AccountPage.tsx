import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebase';
import { db } from '../firebase';
import { createCheckoutSession, createPortalSession, fetchBillingMe, type BillingMe, type BillingPlan } from '../lib/billingApi';
import { clearClientAuthContext, getFreshClientAuthContext, setClientAuthContext } from '../lib/authContext';
import { writeBillingSnapshot, writeCheckoutAttempt, writeCheckoutError } from '../lib/subscriptionLedger';
import { navigateTo } from '../lib/navigation';

const AccountPage = () => {
  const [activeSection, setActiveSection] = useState<'account'>('account');
  const [user, setUser] = useState<User | null>(null);
  const [billing, setBilling] = useState<BillingMe | null>(null);
  const [userDocData, setUserDocData] = useState<Record<string, unknown> | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro' | 'max' | null>(null);

  const refreshBilling = async () => {
    const ctx = await getFreshClientAuthContext();
    if (!ctx) {
      setBilling(null);
      return;
    }
      const me = await fetchBillingMe(ctx);
      setBilling(me);
      setSelectedPlan(me.accountType);
      await writeBillingSnapshot(ctx.uid, me, 'account_page_refresh');

    try {
      const snap = await getDoc(doc(db, 'users', ctx.uid));
      setUserDocData(snap.exists() ? (snap.data() as Record<string, unknown>) : null);
    } catch (error) {
      console.warn('Unable to read user profile document:', error);
      setUserDocData(null);
    }
  };

  const applyPersistence = async () => {
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      if (!nextUser) {
        clearClientAuthContext();
        setBilling(null);
        return;
      }
      setMessage('');

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

  const signInEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await applyPersistence();
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();
      setClientAuthContext({ uid: credential.user.uid, idToken });
      await refreshBilling();
    } catch (error) {
      console.error(error);
      setMessage('Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async () => {
    setLoading(true);
    setMessage('');
    try {
      await applyPersistence();
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      const idToken = await credential.user.getIdToken();
      setClientAuthContext({ uid: credential.user.uid, idToken });
      await refreshBilling();
    } catch (error) {
      console.error(error);
      if (!auth.currentUser) {
        setMessage('Google login failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setMessage('');
    try {
      await signOut(auth);
      clearClientAuthContext();
    } catch (error) {
      console.error(error);
      setMessage('Could not sign out.');
    } finally {
      setLoading(false);
    }
  };

  const changePlan = async (plan: BillingPlan) => {
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

  const managePlan = async () => {
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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900/35 to-pink-900/35 -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => navigateTo('/')} className="text-sm text-gray-300 hover:text-white">← Back to home</button>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto mt-8 grid lg:grid-cols-[240px_1fr] gap-6">
          <aside className="bg-gray-900/80 border border-gray-700 rounded-2xl p-5 h-fit">
            <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
            <div className="space-y-2">
              <button
                onClick={() => setActiveSection('account')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${activeSection === 'account' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-200 hover:bg-gray-700'}`}
              >
                Account
              </button>
              <button
                onClick={logout}
                disabled={loading || !user}
                className="w-full text-left px-3 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 disabled:opacity-50"
              >
                Sign Out
              </button>
            </div>
          </aside>

          <section className="bg-gray-900/80 border border-gray-700 rounded-2xl p-8">
            <h1 className="text-3xl font-bold mb-2">Account</h1>
            <p className="text-gray-400 mb-8">Login and manage your plan.</p>

            {!user && (
              <div className="space-y-4">
                <button onClick={signInGoogle} disabled={loading} className="w-full bg-white text-gray-900 font-semibold py-3 rounded-lg disabled:opacity-60">
                  Continue with Google
                </button>

                <form onSubmit={signInEmail} className="space-y-3">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3" />
                  <label className="flex items-center space-x-2 text-sm text-gray-300">
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    <span>Remember me</span>
                  </label>
                  <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 font-semibold py-3 rounded-lg disabled:opacity-60">
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>
              </div>
            )}

            {user && (
              <div className="space-y-8">
                {billing?.cancelAtPeriodEnd && billing.subscriptionCurrentPeriodEnd && (
                  <div className="mb-2 flex items-center gap-2 bg-amber-900/30 border border-amber-600/50 rounded-xl px-4 py-3 text-sm text-amber-300">
                    <span>⚠</span>
                    <span>
                      Your plan is cancelled and will remain active until{' '}
                      <strong>{new Date(billing.subscriptionCurrentPeriodEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>.
                    </span>
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Email</p>
                    <p className="text-white font-medium">{user.email ?? 'No email'}</p>
                  </div>
                  <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Account Type</p>
                    <p className="text-white font-medium uppercase">{billing?.accountType ?? 'basic'}</p>
                  </div>
                  <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Plan Status</p>
                    <p className="text-white font-medium">{billing?.subscriptionStatus ?? 'none'}</p>
                  </div>
                  <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">
                      {billing?.cancelAtPeriodEnd ? 'Active Until' : 'Renews On'}
                    </p>
                    <p className="text-white font-medium">
                      {billing?.subscriptionCurrentPeriodEnd
                        ? new Date(billing.subscriptionCurrentPeriodEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                        : '—'}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Plans</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div
                      onClick={() => setSelectedPlan('basic')}
                      className={`relative text-left border rounded-2xl p-5 transition-colors cursor-pointer ${selectedPlan === 'basic' ? 'border-green-400 bg-green-900/20' : 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/60'}`}
                    >
                      <div className="absolute -top-3 left-4 text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-200">BASIC</div>
                      <p className="text-3xl font-bold text-white mt-3">$0.00</p>
                      <p className="text-xs text-gray-400 mb-4">/month</p>
                      <div className="space-y-2 text-sm text-gray-300">
                        <p className="flex items-start gap-2"><span className="text-green-400">✓</span><span>Total streams: 2</span></p>
                        <p className="flex items-start gap-2"><span className="text-green-400">✓</span><span>Streams per month: 2</span></p>
                        <p className="flex items-start gap-2"><span className="text-green-400">✓</span><span>YouTube API ops/month: 12</span></p>
                        <p className="flex items-start gap-2"><span className="text-gray-500">✕</span><span>External broadcast sync: No</span></p>
                      </div>
                      {billing?.accountType === 'basic' && (
                        <p className="mt-4 text-xs font-semibold text-green-300">Current plan</p>
                      )}
                    </div>

                    <div
                      onClick={() => setSelectedPlan('pro')}
                      className={`relative border rounded-2xl p-5 text-left transition-colors cursor-pointer ${selectedPlan === 'pro' ? 'border-purple-400 bg-purple-900/20' : 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/60'}`}
                    >
                      <div className="absolute -top-3 left-4 text-xs px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">MOST POPULAR</div>
                      <p className="text-3xl font-bold text-white mt-3">$2.99</p>
                      <p className="text-xs text-gray-400 mb-4">/month</p>
                      <div className="space-y-2 text-sm text-gray-300">
                        <p className="flex items-start gap-2"><span className="text-purple-400">✓</span><span>Total streams: Unlimited</span></p>
                        <p className="flex items-start gap-2"><span className="text-purple-400">✓</span><span>Streams per month: 20</span></p>
                        <p className="flex items-start gap-2"><span className="text-purple-400">✓</span><span>YouTube API ops/month: 240</span></p>
                        <p className="flex items-start gap-2"><span className="text-purple-400">✓</span><span>External broadcast sync: Yes</span></p>
                      </div>
                      <p className={`mt-4 text-xs font-semibold ${billing?.accountType === 'pro' ? 'text-purple-300' : 'text-gray-300'}`}>
                        {billing?.accountType === 'pro' ? 'Current plan' : 'Change to Pro'}
                      </p>
                    </div>

                    <div
                      onClick={() => setSelectedPlan('max')}
                      className={`relative border rounded-2xl p-5 text-left transition-colors cursor-pointer ${selectedPlan === 'max' ? 'border-pink-400 bg-pink-900/20' : 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/60'}`}
                    >
                      <div className="absolute -top-3 left-4 text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-200">HIGH VOLUME</div>
                      <p className="text-3xl font-bold text-white mt-3">$9.99</p>
                      <p className="text-xs text-gray-400 mb-4">/month</p>
                      <div className="space-y-2 text-sm text-gray-300">
                        <p className="flex items-start gap-2"><span className="text-pink-400">✓</span><span>Total streams: Unlimited</span></p>
                        <p className="flex items-start gap-2"><span className="text-pink-400">✓</span><span>Streams per month: 50</span></p>
                        <p className="flex items-start gap-2"><span className="text-pink-400">✓</span><span>YouTube API ops/month: 1000</span></p>
                        <p className="flex items-start gap-2"><span className="text-pink-400">✓</span><span>External broadcast sync: Yes</span></p>
                      </div>
                      <p className={`mt-4 text-xs font-semibold ${billing?.accountType === 'max' ? 'text-pink-300' : 'text-gray-300'}`}>
                        {billing?.accountType === 'max' ? 'Current plan' : 'Change to Max'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <button onClick={managePlan} disabled={loading} className="bg-gray-700 hover:bg-gray-600 disabled:opacity-60 font-semibold py-3 px-5 rounded-lg">
                      Cancel / Manage
                    </button>
                    <div className="w-[190px] flex justify-end">
                      {(selectedPlan === 'pro' || selectedPlan === 'max') && (
                        <button
                          onClick={() => changePlan(selectedPlan)}
                          disabled={loading}
                          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-60 disabled:cursor-not-allowed font-semibold py-3 px-6 rounded-lg min-w-[190px]"
                        >
                          {loading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                          {loading ? 'Loading Stripe...' : `Choose ${selectedPlan === 'pro' ? 'Pro' : 'Max'}`}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {message && <p className="mt-4 text-sm text-amber-300">{message}</p>}
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default AccountPage;
