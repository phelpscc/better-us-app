import { useStore } from '../store';
import type { MoodKey } from '../types';
import { motion } from 'framer-motion';

const MOODS: { key: MoodKey; label: string; hint: string; color: string }[] = [
  { key: 'happy', label: 'Happy', hint: "I’m feeling good today.", color: 'from-neon5 to-neon4' },
  { key: 'romantic', label: 'Romantic', hint: 'Want to connect emotionally.', color: 'from-neon1 to-neon2' },
  { key: 'naughty', label: 'Naughty', hint: 'Let’s play with the rules…', color: 'from-neon2 to-neon3' },
  { key: 'playful', label: 'Playful', hint: 'Feeling silly, let’s have fun.', color: 'from-neon4 to-neon5' },
  { key: 'frisky', label: 'Frisky', hint: '', color: 'from-neon3 to-neon2' },
  { key: 'affectionate', label: 'Affectionate', hint: 'In the mood to be held close.', color: 'from-neon1 to-neon4' },
  { key: 'tired', label: 'Tired', hint: 'Drained but still love you.', color: 'from-neon4 to-neon1' },
  { key: 'disconnected', label: 'Disconnected', hint: 'I’m feeling off today.', color: 'from-neon1 to-neon3' },
];

export function Dashboard() {
  const { me, partner, match, setMood, lastUpdated } = useStore();
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Ring title="You" val={avg(me)} />
        <Ring title="Partner" val={avg(partner)} />
      </div>
      <div className="card space-y-3">
        <h2 className="text-lg glow">Mood Sliders</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {MOODS.map((m) => (
            <div key={m.key} className="p-3 rounded-xl bg-white/5">
              <div className="flex justify-between mb-1">
                <span>{m.label}</span>
                <span className="text-sm opacity-70">{me[m.key] ?? 0}</span>
              </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={me[m.key] ?? 0}
                  onChange={(e) => setMood({ [m.key]: Number(e.target.value) } as any)}
                  className={`w-full accent-white bg-gradient-to-r ${m.color} h-2 rounded`}
                />
                {m.hint && <div className="text-xs opacity-70 mt-1">{m.hint}</div>}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm opacity-70">Last updated: {new Date(lastUpdated).toLocaleTimeString()}</div>
          <div className="text-sm">Match score: <span className="font-semibold">{match}%</span></div>
        </div>
      </div>
    </div>
  );
}

function avg(m: any) {
  const vals = Object.values(m || {}) as number[];
  return Math.round(vals.reduce((a, b) => a + b, 0) / (vals.length || 1));
}

function Ring({ title, val }: { title: string; val: number }) {
  return (
    <div className="card flex flex-col items-center gap-2">
      <div className="text-sm opacity-70">{title}</div>
      <div className="relative">
        <motion.div
          className="w-40 h-40 rounded-full bg-gradient-to-br from-neon2 to-neon5"
          animate={{ boxShadow: ['0 0 20px #00f5d4', '0 0 40px #9b5de5', '0 0 20px #00f5d4'] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <div className="absolute inset-0 grid place-items-center text-2xl font-bold">{val}</div>
      </div>
    </div>
  );
}
