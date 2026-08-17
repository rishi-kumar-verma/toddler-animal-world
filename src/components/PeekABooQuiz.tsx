import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { ANIMALS, Animal } from '../data/animals';
import { playAnimalSound, playCheerSound, playPopSound, speakText } from '../audio/animalSounds';
import { Star, RefreshCw, Volume2 } from 'lucide-react';

export const PeekABooQuiz: React.FC = () => {
  const [currentTarget, setCurrentTarget] = useState<Animal | null>(null);
  const [choices, setChoices] = useState<Animal[]>([]);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ text: string; isSuccess: boolean } | null>(null);

  const startNewRound = useCallback(() => {
    const randomTarget = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    setCurrentTarget(randomTarget);

    const distractors = ANIMALS.filter(a => a.id !== randomTarget.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const roundChoices = [randomTarget, ...distractors].sort(() => 0.5 - Math.random());
    setChoices(roundChoices);
    setFeedback(null);

    setTimeout(() => {
      speakText(`Where is the ${randomTarget.name}?`);
    }, 300);
  }, []);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  const handleChoiceTap = (chosenAnimal: Animal) => {
    if (!currentTarget) return;

    if (chosenAnimal.id === currentTarget.id) {
      setScore(s => s + 1);
      setFeedback({ text: `YAY! That's the ${chosenAnimal.name}! 🎉`, isSuccess: true });
      
      playCheerSound();
      playAnimalSound(chosenAnimal.id);
      
      try {
        confetti({
          particleCount: 40,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#FFD166', '#EF476F', '#06D6A0', '#118AB2']
        });
      } catch {
        // Ignore
      }

      speakText(`Yay! Great job! That's the ${chosenAnimal.name}!`);

      setTimeout(() => {
        startNewRound();
      }, 2200);
    } else {
      playPopSound();
      playAnimalSound(chosenAnimal.id);
      setFeedback({ text: `That's the ${chosenAnimal.name}! Tap the ${currentTarget.name}! 🌟`, isSuccess: false });
      speakText(`That's the ${chosenAnimal.name}! Where is the ${currentTarget.name}?`);
    }
  };

  const repeatPrompt = () => {
    if (currentTarget) {
      speakText(`Where is the ${currentTarget.name}?`);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-3.5rem)] mt-14 overflow-hidden flex flex-col items-center justify-between p-2 sm:p-4 select-none bg-gradient-to-b from-sky-400 via-indigo-500 to-purple-700">
      
      {/* Top Question Bar */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-xl border-2 sm:border-3 border-yellow-300 flex items-center justify-between gap-1.5 z-10">
        <button
          onClick={repeatPrompt}
          className="bg-yellow-400 hover:bg-yellow-500 active:scale-95 px-2.5 py-1 rounded-xl shadow-md border border-yellow-600 transition-transform flex items-center gap-1 shrink-0"
        >
          <Volume2 className="w-4 h-4 text-slate-900 animate-pulse" />
          <span className="font-extrabold text-slate-900 text-xs hidden sm:inline">Listen Again</span>
        </button>

        <div className="flex-1 text-center">
          <h2 className="text-sm sm:text-2xl font-black text-slate-900 tracking-wide uppercase truncate">
            Where is the <span className="text-pink-600 underline">{currentTarget?.name}</span>?
          </h2>
        </div>

        <div className="flex items-center gap-1 bg-yellow-100 border border-yellow-400 px-2.5 py-1 rounded-xl shrink-0">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-400 animate-bounce" />
          <span className="text-base sm:text-lg font-black text-slate-900">{score}</span>
        </div>
      </div>

      {/* Encouragement Feedback Banner */}
      {feedback && (
        <div className={`my-1 px-3 py-1 rounded-full text-xs sm:text-base font-black shadow-lg animate-bounce border-2 ${
          feedback.isSuccess ? 'bg-emerald-400 text-slate-950 border-emerald-200' : 'bg-amber-300 text-slate-950 border-amber-100'
        }`}>
          {feedback.text}
        </div>
      )}

      {/* 4 Choice Blocks without sound badges */}
      <div className="w-full max-w-3xl grid grid-cols-2 grid-rows-2 gap-2.5 sm:gap-4 my-auto flex-1 max-h-[calc(100vh-10rem)] p-1">
        {choices.map((animal) => (
          <div
            key={animal.id}
            onClick={() => handleChoiceTap(animal)}
            onTouchStart={() => handleChoiceTap(animal)}
            className={`
              relative cursor-pointer rounded-2xl p-2.5 sm:p-4
              bg-gradient-to-br ${animal.bgGradient}
              border-3 sm:border-4 ${animal.borderColor}
              shadow-xl hover:shadow-2xl
              flex flex-col items-center justify-center overflow-hidden
              transition-all duration-200 active:scale-95 transform hover:scale-102
              w-full h-full group touch-manipulation
            `}
          >
            <span className="text-sm sm:text-base font-black tracking-wide truncate block text-slate-900 mb-1">
              {animal.name}
            </span>
            <span 
              className="my-auto transition-transform group-hover:scale-110 leading-none select-none"
              style={{ fontSize: '7rem' }}
            >
              {animal.emoji}
            </span>
          </div>
        ))}
      </div>

      {/* Skip/Next Button */}
      <button
        onClick={startNewRound}
        className="bg-white/85 hover:bg-white active:scale-95 px-3 py-1.5 rounded-xl font-bold text-slate-800 shadow-md border border-white flex items-center gap-1 text-xs mb-1"
      >
        <RefreshCw className="w-3.5 h-3.5 text-slate-700" />
        <span>Next Animal</span>
      </button>

    </div>
  );
};
