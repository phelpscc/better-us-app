import { useState } from 'react';
import { useStore } from '../store';

/**
 * Vault component exposes a "Surprise Vault" where users can draw
 * randomized romantic/spicy/playful challenges. Categories are presented as
 * buttons; clicking one draws a suggestion from that category. A generic
 * random button will draw from all available surprises. The currently
 * selected suggestion is displayed below until dismissed.
 */
export function Vault() {
  const { randomSurprise } = useStore();
  const [current, setCurrent] = useState<{
    id: string;
    title: string;
    cat: string;
    heat: number;
  } | null>(null);

  const cats = [
    'Romantic',
    'Playful',
    'Spicy',
    'Roleplay',
    'Public Risk',
    'Bondage',
    'Other',
  ];

  const pick = (cat?: string) => {
    const s = randomSurprise(cat);
    setCurrent(s);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            className="px-3 py-1 rounded-full bg-neon4/40 hover:bg-neon4/60 transition text-sm text-white"
            onClick={() => pick(c)}
          >
            {c}
          </button>
        ))}
        <button
          className="px-3 py-1 rounded-full bg-neon2/40 hover:bg-neon2/60 transition text-sm text-white"
          onClick={() => pick(undefined)}
        >
          Random
        </button>
      </div>
      {current && (
        <div className="p-4 rounded-xl bg-black/40 backdrop-blur-sm shadow-neon space-y-3 max-w-md">
          <h3 className="text-lg font-semibold text-neon4">{current.title}</h3>
          <p className="text-sm text-gray-300">Category: {current.cat}</p>
          <div className="flex justify-end">
            <button
              className="px-3 py-1 rounded-lg bg-neon3/50 hover:bg-neon3/70 transition text-sm"
              onClick={() => setCurrent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
