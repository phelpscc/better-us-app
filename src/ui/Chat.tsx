import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';

/**
 * Chat component renders a simple conversation view along with an input to
 * compose messages. Messages are stored in the global Zustand store.
 * When the user sends a message, a playful canned response from the
 * "partner" is appended automatically after a brief delay to simulate
 * interaction. Messages from the user align to the right and partner
 * messages align to the left to distinguish who is speaking.
 */
export function Chat() {
  const { messages, addMessage } = useStore();
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom whenever messages update
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Sends a new message and triggers a canned partner response
  const send = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addMessage({ who: 'me', text: trimmed });
    setText('');
    // Generate a random reply from a small set of supportive responses
    const replies = [
      "I love that! ❤️",
      "Tell me more…",
      "Sounds fun!",
      "I'm here with you."
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    setTimeout(() => {
      addMessage({ who: 'partner', text: reply });
    }, 600);
  };

  return (
    <div className="flex flex-col h-[40vh] md:h-[50vh] bg-surface/50 backdrop-blur-sm p-4 rounded-xl shadow-neon space-y-3">
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.who === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm \
                ${m.who === 'me' ? 'bg-neon4/40 text-white' : 'bg-neon2/40 text-white'}`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-lg bg-black/40 text-white placeholder-gray-400 focus:outline-none"
          placeholder="Type your message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              send();
            }
          }}
        />
        <button
          className="px-4 py-2 rounded-lg bg-neon3/60 hover:bg-neon3/80 transition"
          onClick={send}
        >
          Send
        </button>
      </div>
    </div>
  );
}
