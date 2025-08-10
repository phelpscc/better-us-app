import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { startEmailLink, completeEmailLink } from '../auth';

export function Header({ tab, setTab }: { tab: string; setTab: (t: any) => void }) {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  useEffect(() => {
    completeEmailLink().catch(() => {});
    return onAuthStateChanged(auth, setUser);
  }, []);
  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-neon1 via-neon2 to-neon4">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="font-semibold text-xl">Better Us</h1>
        <ul className="flex gap-4 items-center">
          {['dashboard', 'chat', 'vault'].map((t) => (
            <li key={t}>
              <button
                onClick={() => setTab(t as any)}
                className={`px-3 py-1 rounded-full ${tab === t ? 'bg-black/40 shadow-neon' : ''}`}
              >
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            </li>
          ))}
          {!user ? (
            <li className="flex gap-2">
              <input
                className="px-2 py-1 rounded bg-black/30 placeholder-white/70"
                placeholder="email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="px-3 py-1 rounded bg-black/40"
                onClick={() => email && startEmailLink(email)}
              >
                Get Sign-in Link
              </button>
            </li>
          ) : (
            <li className="text-sm bg-black/30 px-2 py-1 rounded">{user.email}</li>
          )}
        </ul>
      </nav>
    </header>
  );
}
