import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dashboard } from './Dashboard';
import { Chat } from './Chat';
import { Vault } from './Vault';
import { Header } from './Header';

export function App() {
  const [tab, setTab] = useState<'dashboard' | 'chat' | 'vault'>('dashboard');
  return (
    <div className="min-h-screen">
      <Header tab={tab} setTab={setTab} />
      <main className="max-w-5xl mx-auto p-4 space-y-4">
        <motion.div layout>
          {tab === 'dashboard' && <Dashboard />}
          {tab === 'chat' && <Chat />}
          {tab === 'vault' && <Vault />}
        </motion.div>
      </main>
    </div>
  );
}
