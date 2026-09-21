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
import { fetchBillingMe, type BillingMe } from '../lib/billingApi';
import { clearClientAuthContext, getFreshClientAuthContext, setClientAuthContext } from '../lib/authContext';
import { writeBillingSnapshot } from '../lib/subscriptionLedger';
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
      provider.setCustomParameters({ prompt: 'select_account' });
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

  return (
    <div className="min-h-[100dvh] bg-ink-900 text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => navigateTo('/')} className="text-sm text-fg-muted hover:text-white">← Back to home</button>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto mt-8 grid lg:grid-cols-[240px_1fr] gap-6">
          <aside className="bg-ink-800/80 border border-white/[0.07] rounded-card p-5 h-fit">
            <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
            <div className="space-y-2">
              <button
                onClick={() => setActiveSection('account')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${activeSection === 'account' ? 'bg-brand text-white' : 'bg-ink-700 text-fg hover:bg-ink-600'}`}
              >
                Account
              </button>
              <button
                onClick={logout}
                disabled={loading || !user}
                className="w-full text-left px-3 py-2 rounded-lg bg-ink-700 text-fg hover:bg-ink-600 disabled:opacity-50"
              >
                Sign Out
              </button>
            </div>
          </aside>

          <section className="bg-ink-800/80 border border-white/[0.07] rounded-card p-8">
            <h1 className="text-3xl font-bold mb-2">Account</h1>
            <p className="text-fg-muted mb-8">Login and manage your plan.</p>

            {!user && (
              <div className="space-y-4">
                <button onClick={signInGoogle} disabled={loading} className="w-full bg-white text-ink-900 font-semibold py-3 rounded-lg disabled:opacity-60">
                  Continue with Google
                </button>

                <form onSubmit={signInEmail} className="space-y-3">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full bg-ink-700 border border-white/15 rounded-lg px-4 py-3" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full bg-ink-700 border border-white/15 rounded-lg px-4 py-3" />
                  <label className="flex items-center space-x-2 text-sm text-fg-muted">
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    <span>Remember me</span>
                  </label>
                  <button type="submit" disabled={loading} className="w-full bg-brand font-semibold py-3 rounded-lg disabled:opacity-60">
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>
              </div>
            )}

            {user && (
              <div className="space-y-8">
                {billing?.cancelAtPeriodEnd && billing.subscriptionCurrentPeriodEnd && (
                  <div className="mb-2 flex items-center gap-2 bg-amber-900/30 border border-amber-600/50 rounded-card px-4 py-3 text-sm text-amber-300">
                    <span>⚠</span>
                    <span>
                      Your plan is cancelled and will remain active until{' '}
                      <strong>{new Date(billing.subscriptionCurrentPeriodEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>.
                    </span>
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-ink-700/70 border border-white/[0.07] rounded-card p-4">
                    <p className="text-xs text-fg-muted mb-1">Email</p>
                    <p className="text-white font-medium">{user.email ?? 'No email'}</p>
                  </div>
                  <div className="bg-ink-700/70 border border-white/[0.07] rounded-card p-4">
                    <p className="text-xs text-fg-muted mb-1">Account Type</p>
                    <p className="text-white font-medium uppercase">{billing?.accountType ?? 'basic'}</p>
                  </div>
                  <div className="bg-ink-700/70 border border-white/[0.07] rounded-card p-4">
                    <p className="text-xs text-fg-muted mb-1">Plan Status</p>
                    <p className="text-white font-medium">{billing?.subscriptionStatus ?? 'none'}</p>
                  </div>
                  <div className="bg-ink-700/70 border border-white/[0.07] rounded-card p-4">
                    <p className="text-xs text-fg-muted mb-1">
                      {billing?.cancelAtPeriodEnd ? 'Active Until' : 'Renews On'}
                    </p>
                    <p className="text-white font-medium">
                      {billing?.subscriptionCurrentPeriodEnd
                        ? new Date(billing.subscriptionCurrentPeriodEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                        : '-'}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Plans</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div
                      onClick={() => setSelectedPlan('basic')}
                      className={`relative text-left border rounded-card p-5 transition-colors cursor-pointer ${selectedPlan === 'basic' ? 'border-brand bg-brand/10' : 'border-white/[0.07] bg-ink-700/50 hover:bg-ink-600/60'}`}
                    >
                      <div className="absolute -top-3 left-4 text-xs px-3 py-1 rounded-full bg-ink-600 text-fg">BASIC</div>
                      <p className="text-3xl font-bold text-white mt-3">0 €</p>
                      <p className="text-xs text-fg-muted mb-4">free forever</p>
                      <div className="space-y-2 text-sm text-fg-muted">
                        <p className="flex items-start gap-2"><span className="text-brand">✓</span><span>Total streams: 2</span></p>
                        <p className="flex items-start gap-2"><span className="text-brand">✓</span><span>Streams per month: 2</span></p>
                        <p className="flex items-start gap-2"><span className="text-brand">✓</span><span>YouTube API ops/month: 12</span></p>
                        <p className="flex items-start gap-2"><span className="text-fg-faint">✕</span><span>External broadcast sync: No</span></p>
                      </div>
                      {billing?.accountType === 'basic' && (
                        <p className="mt-4 text-xs font-semibold text-brand-light">Current plan</p>
                      )}
                    </div>

                    <div
                      onClick={() => setSelectedPlan('pro')}
                      className={`relative border rounded-card p-5 text-left transition-colors cursor-pointer ${selectedPlan === 'pro' ? 'border-brand bg-brand/10' : 'border-white/[0.07] bg-ink-700/50 hover:bg-ink-600/60'}`}
                    >
                      <div className="absolute -top-3 left-4 text-xs px-3 py-1 rounded-full bg-brand text-white">MOST POPULAR</div>
                      <p className="text-3xl font-bold text-white mt-3">5,99 €</p>
                      <p className="text-xs text-fg-muted mb-4">/month · 49,99 €/year</p>
                      <div className="space-y-2 text-sm text-fg-muted">
                        <p className="flex items-start gap-2"><span className="text-brand">✓</span><span>Total streams: Unlimited</span></p>
                        <p className="flex items-start gap-2"><span className="text-brand">✓</span><span>Streams per month: 20</span></p>
                        <p className="flex items-start gap-2"><span className="text-brand">✓</span><span>YouTube API ops/month: 240</span></p>
                        <p className="flex items-start gap-2"><span className="text-brand">✓</span><span>External broadcast sync: Yes</span></p>
                      </div>
                      <p className={`mt-4 text-xs font-semibold ${billing?.accountType === 'pro' ? 'text-brand-light' : 'text-fg-muted'}`}>
                        {billing?.accountType === 'pro' ? 'Current plan' : 'Change to Pro'}
                      </p>
                    </div>

                    <div
                      onClick={() => setSelectedPlan('max')}
                      className={`relative border rounded-card p-5 text-left transition-colors cursor-pointer ${selectedPlan === 'max' ? 'border-brand bg-brand/10' : 'border-white/[0.07] bg-ink-700/50 hover:bg-ink-600/60'}`}
                    >
                      <div className="absolute -top-3 left-4 text-xs px-3 py-1 rounded-full bg-ink-600 text-fg">HIGH VOLUME</div>
                      <p className="text-3xl font-bold text-white mt-3">12,99 €</p>
                      <p className="text-xs text-fg-muted mb-4">/month · 109,99 €/year</p>
                      <div className="space-y-2 text-sm text-fg-muted">
                        <p className="flex items-start gap-2"><span className="text-brand">✓</span><span>Total streams: Unlimited</span></p>
                        <p className="flex items-start gap-2"><span className="text-brand">✓</span><span>Streams per month: 50</span></p>
                        <p className="flex items-start gap-2"><span className="text-brand">✓</span><span>YouTube API ops/month: 1000</span></p>
                        <p className="flex items-start gap-2"><span className="text-brand">✓</span><span>External broadcast sync: Yes</span></p>
                      </div>
                      <p className={`mt-4 text-xs font-semibold ${billing?.accountType === 'max' ? 'text-brand-light' : 'text-fg-muted'}`}>
                        {billing?.accountType === 'max' ? 'Current plan' : 'Change to Max'}
                      </p>
                    </div>
                  </div>
                  {/* Ni comprar ni cancelar desde la web: los planes se cobran por Google
                      Play y allí se gestionan. Lo que había aquí abría Stripe, que ya no
                      vende nada. */}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.danihg.calypso"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-brand hover:bg-brand-light font-semibold py-3 px-6 rounded-lg"
                    >
                      Subscribe in the app
                    </a>
                    <a
                      href="https://play.google.com/store/account/subscriptions"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-ink-600 hover:bg-ink-600 font-semibold py-3 px-5 rounded-lg"
                    >
                      Manage on Google Play
                    </a>
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
