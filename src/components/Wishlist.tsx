import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Reveal } from './ui';

const Wishlist = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
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
      setMessage("You're on the list. We'll write when something worth knowing ships.");
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      console.error('Error adding email to wishlist:', error);
    }
  };

  return (
    <section id="wishlist" className="border-y border-white/[0.07] bg-ink-800/40 py-20 lg:py-24">
      <div className="mx-auto grid max-w-page items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <Reveal>
          <h2 className="max-w-[18ch] font-heading text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl">
            Hear about new features first.
          </h2>
          <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-fg-muted">
            Occasional email when a feature lands. No newsletter, no partners, unsubscribe in one click.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {status === 'success' ? (
            <div
              role="status"
              className="flex items-start gap-3 rounded-card border border-brand/40 bg-brand/10 p-6"
            >
              <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-brand" />
              <p className="text-sm leading-relaxed text-fg">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
              <label htmlFor="wishlist-email" className="text-sm font-medium text-fg">
                Email address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="wishlist-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'wishlist-error' : undefined}
                  className={`w-full rounded-full border bg-ink-900 px-5 py-3.5 text-base text-fg placeholder:text-fg-faint
                    focus:outline-none focus:ring-2 focus:ring-brand disabled:opacity-60
                    ${status === 'error' ? 'border-brand' : 'border-white/15'}`}
                  placeholder="you@club.com"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="shrink-0 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-brand-light active:translate-y-[1px] disabled:opacity-60"
                >
                  {status === 'loading' ? 'Signing up' : 'Notify me'}
                </button>
              </div>

              {status === 'error' && (
                <p id="wishlist-error" className="mt-1 flex items-center gap-2 text-sm text-brand-light">
                  <AlertCircle size={16} />
                  {message}
                </p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default Wishlist;
