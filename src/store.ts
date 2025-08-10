import { create } from 'zustand';
import type { MoodMap } from './types';

type Message = { id: string; who: 'me' | 'partner'; text: string; ts: number };
type Surprise = { id: string; title: string; cat: string; heat: number };

type State = {
  me: MoodMap;
  partner: MoodMap;
  match: number;
  lastUpdated: number;
  messages: Message[];
  surprises: Surprise[];
  addMessage: (m: Omit<Message, 'id' | 'ts'>) => void;
  setMood: (m: Partial<MoodMap>) => void;
  randomSurprise: (cat?: string) => Surprise;
};

const empty: MoodMap = {
  happy: 0,
  romantic: 0,
  naughty: 0,
  playful: 0,
  frisky: 0,
  affectionate: 0,
  tired: 0,
  disconnected: 0,
};

const SEED: Surprise[] = [
  { id: 's1', title: 'Cuddle + movie in the dark', cat: 'Romantic', heat: 1 },
  { id: 's2', title: 'Blindfold + whisper game', cat: 'Playful', heat: 2 },
  { id: 's3', title: '30-min tease timer', cat: 'Spicy', heat: 3 },
  { id: 's4', title: 'Public risk: secret toy', cat: 'Public Risk', heat: 4 },
  { id: 's5', title: 'Roleplay: bar strangers', cat: 'Roleplay', heat: 3 },
];

export const useStore = create<State>((set, get) => ({
  me: JSON.parse(localStorage.getItem('meMood') || 'null') || { ...empty },
  partner: { ...empty },
  match: 0,
  lastUpdated: Date.now(),
  messages: [],
  surprises: SEED,
  addMessage: (m) =>
    set((s) => ({ messages: [...s.messages, { ...m, id: crypto.randomUUID(), ts: Date.now() }] })),
  setMood: (m) =>
    set((s) => {
      const next = { ...s.me, ...m };
      localStorage.setItem('meMood', JSON.stringify(next));
      const match = computeMatch(next, s.partner);
      return { me: next, lastUpdated: Date.now(), match };
    }),
  randomSurprise: (cat) => {
    const list = cat ? get().surprises.filter((s) => s.cat === cat) : get().surprises;
    return list[Math.floor(Math.random() * list.length)];
  },
}));

function computeMatch(a: MoodMap, b: MoodMap) {
  const keys = Object.keys(a) as (keyof MoodMap)[];
  let sum = 0;
  let denom = 0;
  for (const k of keys) {
    sum += 100 - Math.abs(a[k] - b[k]);
    denom += 100;
  }
  return Math.round((sum / denom) * 100);
}
