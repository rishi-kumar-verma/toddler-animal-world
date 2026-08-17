import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ANIMALS, Animal } from '../data/animals';
import { playAnimalSound, speakText } from '../audio/animalSounds';
import { Sparkles, Volume2 } from 'lucide-react';

export const AnimalGrid: React.FC = () => {
  const [activeAnimalId, setActiveAnimalId] = useState<string | null>(null);
  const [lastSoundText, setLastSoundText] = useState<string | null>(null);

  const handleAnimalTouch = (animal: Animal, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setActiveAnimalId(animal.id);
    setLastSoundText(`${animal.name}: ${animal.babySoundText}`);

    // 1. Play real animal sound recording
    playAnimalSound(animal.id);

    // 2. Speak animal name and sound
    speakText(`${animal.name}! ${animal.soundName}`);

    // 3. Trigger confetti near tap location
    try {
      let x = 0.5;
      let y = 0.5;
      if ('clientX' in e && e.clientX) {
        x = e.clientX / window.innerWidth;
        y = e.clientY / window.innerHeight;
      } else if ('touches' in e && e.touches[0]) {
        x = e.touches[0].clientX / window.innerWidth;
        y = e.touches[0].clientY / window.innerHeight;
      }

      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x, y },
        colors: ['#FFD166', '#EF476F', '#06D6A0', '#118AB2', '#073B4C']
      });
    } catch {
      // Fallback ignore
    }

    setTimeout(() => {
      setActiveAnimalId(null);
    }, 1200);
  };

  return (
    <div className="w-full h-[calc(100vh-3.5rem)] mt-14 overflow-y-auto sm:overflow-hidden p-2 sm:p-3 flex flex-col items-center justify-start sm:justify-center relative select-none">
      
      {/* Floating Audio Feedback Toast */}
      {lastSoundText && (
        <div className="fixed top-16 z-50 bg-white/95 backdrop-blur-md px-4 py-1 rounded-full shadow-xl border-2 border-yellow-400 animate-bounce flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-yellow-500 animate-pulse" />
          <span className="text-sm sm:text-base font-black text-slate-900 tracking-wide uppercase">
            {lastSoundText}
          </span>
          <Sparkles className="w-5 h-5 text-pink-500 animate-spin" />
        </div>
      )}

      {/* Animal Card Grid without bottom sound badges */}
      <div className="w-full h-auto sm:h-full grid grid-cols-2 sm:grid-cols-4 sm:grid-rows-4 gap-2.5 sm:gap-2.5 pb-6 sm:pb-0">
        {ANIMALS.map((animal) => {
          const isActive = activeAnimalId === animal.id;
          return (
            <div
              key={animal.id}
              onClick={(e) => handleAnimalTouch(animal, e)}
              onTouchStart={(e) => handleAnimalTouch(animal, e)}
              className={`
                relative cursor-pointer rounded-2xl p-2.5 sm:p-3
                bg-gradient-to-br ${animal.bgGradient}
                border-3 ${animal.borderColor}
                shadow-md hover:shadow-xl
                flex flex-col items-center justify-center overflow-hidden
                transition-all duration-200 transform
                ${isActive ? 'scale-105 rotate-1 ring-4 ' + animal.ringColor : 'hover:scale-102 active:scale-95'}
                min-h-[160px] sm:min-h-0 w-full sm:h-full touch-manipulation
              `}
            >
              {/* Sound wave ring animation when active */}
              {isActive && (
                <div className="absolute inset-0 rounded-2xl border-4 border-white/80 animate-ring pointer-events-none" />
              )}

              {/* Top Animal Name */}
              <div className="w-full text-center mb-1">
                <span className={`text-base sm:text-lg md:text-xl font-black tracking-wide drop-shadow-sm truncate block ${animal.textColor}`}>
                  {animal.name}
                </span>
              </div>

              {/* Center Emoji Graphic (Exact font-size: 7rem) */}
              <div className="my-auto flex items-center justify-center">
                <span 
                  className={`transition-transform group-hover:scale-110 leading-none select-none ${isActive ? 'animate-bounce' : ''}`}
                  style={{ fontSize: '7rem' }}
                >
                  {animal.emoji}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
