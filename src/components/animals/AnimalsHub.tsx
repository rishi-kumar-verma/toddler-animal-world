import React, { useState } from 'react';
import { AnimalGrid } from '../AnimalGrid';
import { ThreeAnimalBox } from '../ThreeAnimalBox';
import { PeekABooQuiz } from '../PeekABooQuiz';
import { playPopSound } from '../../audio/animalSounds';
import { Grid, Box, HelpCircle } from 'lucide-react';

export const AnimalsHub: React.FC = () => {
  const [animalMode, setAnimalMode] = useState<'grid' | '3d' | 'quiz'>('grid');

  return (
    <div className="w-full h-full relative">
      {/* Sub-mode floating switcher for Animal World */}
      <div className="absolute top-18 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border-2 border-yellow-400 shadow-lg">
        <button
          onClick={() => { playPopSound(); setAnimalMode('grid'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
            animalMode === 'grid'
              ? 'bg-yellow-400 text-slate-950 shadow-md scale-105 border border-yellow-500'
              : 'text-slate-700 hover:bg-yellow-50'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Zoo Grid</span>
        </button>

        <button
          onClick={() => { playPopSound(); setAnimalMode('3d'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
            animalMode === '3d'
              ? 'bg-pink-500 text-white shadow-md scale-105 border border-pink-600'
              : 'text-slate-700 hover:bg-pink-50'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>3D Box</span>
        </button>

        <button
          onClick={() => { playPopSound(); setAnimalMode('quiz'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
            animalMode === 'quiz'
              ? 'bg-indigo-600 text-white shadow-md scale-105 border border-indigo-700'
              : 'text-slate-700 hover:bg-indigo-50'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Quiz</span>
        </button>
      </div>

      {/* Render Active View */}
      <div className="w-full h-full pt-12">
        {animalMode === 'grid' && <AnimalGrid />}
        {animalMode === '3d' && <ThreeAnimalBox />}
        {animalMode === 'quiz' && <PeekABooQuiz />}
      </div>
    </div>
  );
};
