import React, { useState, useEffect } from 'react';
import { playPopSound } from '../audio/animalSounds';

interface Bubble {
  id: number;
  x: number;
  size: number;
  speed: number;
  color: string;
  emoji?: string;
}

const BUBBLE_COLORS = [
  'rgba(255, 182, 193, 0.65)',
  'rgba(173, 216, 230, 0.65)',
  'rgba(255, 255, 224, 0.65)',
  'rgba(221, 160, 221, 0.65)',
  'rgba(144, 238, 144, 0.65)',
  'rgba(255, 218, 185, 0.65)',
];

const BUBBLE_EMOJIS = ['⭐', '🎈', '✨', '🌸', '🎵', '💫'];

export const FloatingBubbles: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Generate initial bubbles
    const initial: Bubble[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      size: Math.random() * 40 + 50, // 50px to 90px
      speed: Math.random() * 8 + 10, // 10s to 18s duration
      color: BUBBLE_COLORS[i % BUBBLE_COLORS.length],
      emoji: BUBBLE_EMOJIS[i % BUBBLE_EMOJIS.length]
    }));
    setBubbles(initial);

    const interval = setInterval(() => {
      setBubbles(prev => [
        ...prev.slice(-14),
        {
          id: Date.now() + Math.random(),
          x: Math.random() * 90 + 5,
          size: Math.random() * 40 + 50,
          speed: Math.random() * 8 + 10,
          color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
          emoji: BUBBLE_EMOJIS[Math.floor(Math.random() * BUBBLE_EMOJIS.length)]
        }
      ]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const popBubble = (id: number) => {
    playPopSound();
    setBubbles(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {bubbles.map(b => (
        <div
          key={b.id}
          onClick={() => popBubble(b.id)}
          onTouchStart={() => popBubble(b.id)}
          className="absolute pointer-events-auto cursor-pointer rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 backdrop-blur-sm transition-transform active:scale-125"
          style={{
            left: `${b.x}%`,
            bottom: '-100px',
            width: `${b.size}px`,
            height: `${b.size}px`,
            backgroundColor: b.color,
            animation: `floatUp ${b.speed}s linear infinite`,
          }}
        >
          <span className="text-2xl select-none animate-pulse">{b.emoji}</span>
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
};
