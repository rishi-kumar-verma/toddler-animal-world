import { useState } from 'react';
import { Navbar, GameMode } from './components/Navbar';
import { AnimalGrid } from './components/AnimalGrid';
import { ThreeAnimalBox } from './components/ThreeAnimalBox';
import { PeekABooQuiz } from './components/PeekABooQuiz';
import { FloatingBubbles } from './components/FloatingBubbles';
import { playPopSound, speakText, preloadAnimalSounds } from './audio/animalSounds';
import { Volume2, Play, Sparkles } from 'lucide-react';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentMode, setCurrentMode] = useState<GameMode>('grid');
  const [isLocked, setIsLocked] = useState(false);

  const handleStartGame = () => {
    preloadAnimalSounds();
    playPopSound();
    speakText('Welcome to Baby Animal World! Let us play with animals!');
    setHasStarted(true);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-yellow-100 via-pink-100 to-sky-200 select-none relative font-sans">
      
      {/* Ambient Floating Pop Bubbles */}
      <FloatingBubbles />

      {/* Landing Start Screen (Required for Browser Audio Permission) */}
      {!hasStarted ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-yellow-300 via-amber-400 to-pink-500 text-slate-900 text-center">
          
          <div className="relative mb-8">
            <div className="text-8xl sm:text-9xl animate-bounce">🐮</div>
            <Sparkles className="w-12 h-12 text-white absolute -top-4 -right-4 animate-spin" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight drop-shadow-md text-slate-950">
            Baby Animal World 🐶🐱
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-slate-900 max-w-lg mb-8 drop-shadow-sm">
            Touch any animal to hear its sound! Perfect for toddlers & babies.
          </p>

          <button
            onClick={handleStartGame}
            onTouchStart={handleStartGame}
            className="group relative bg-emerald-400 hover:bg-emerald-500 active:scale-95 text-slate-950 px-10 py-6 rounded-full font-black text-3xl shadow-2xl border-4 border-white transition-all transform hover:scale-105 flex items-center gap-4 cursor-pointer"
          >
            <Play className="w-10 h-10 fill-slate-950" />
            <span>TAP TO PLAY!</span>
            <Volume2 className="w-8 h-8 animate-pulse text-slate-900" />
          </button>

          <p className="text-sm font-semibold text-slate-800 mt-6">
            🔊 Sound On • Designed for 18-month Toddlers
          </p>
        </div>
      ) : (
        <>
          {/* Main Navigation */}
          <Navbar
            currentMode={currentMode}
            onSelectMode={setCurrentMode}
            isLocked={isLocked}
            onToggleLock={setIsLocked}
          />

          {/* Active View Container */}
          <main className="w-full h-full overflow-hidden">
            {currentMode === 'grid' && <AnimalGrid />}
            {currentMode === '3d' && <ThreeAnimalBox />}
            {currentMode === 'quiz' && <PeekABooQuiz />}
          </main>
        </>
      )}
    </div>
  );
}
