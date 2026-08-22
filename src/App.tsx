import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HubDashboard } from './components/HubDashboard';
import { IndiaHub } from './components/india/IndiaHub';
import { HindiHub } from './components/hindi/HindiHub';
import { MusicHub } from './components/music/MusicHub';
import { VehiclesHub } from './components/vehicles/VehiclesHub';
import { FruitsHub } from './components/fruits/FruitsHub';
import { SuperheroesHub } from './components/superheroes/SuperheroesHub';
import { ScienceHub } from './components/science/ScienceHub';
import { MathHub } from './components/math/MathHub';
import { GeographyHub } from './components/geography/GeographyHub';
import { HistoryHub } from './components/history/HistoryHub';
import { AnimalsHub } from './components/animals/AnimalsHub';
import { FloatingBubbles } from './components/FloatingBubbles';
import { playPopSound, speakText, preloadAnimalSounds } from './audio/animalSounds';
import { Volume2, Play, Sparkles } from 'lucide-react';
import { AgeCategory, HubCategory } from './types/hub';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<HubCategory>('hub');
  const [currentAge, setCurrentAge] = useState<AgeCategory>('all');
  const [isLocked, setIsLocked] = useState(false);

  const handleStartGame = () => {
    preloadAnimalSounds();
    playPopSound();
    speakText('Welcome to Kids Learning and Games Hub! Let us play and learn!');
    setHasStarted(true);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-yellow-100 via-pink-100 to-sky-200 select-none relative font-sans">
      
      {/* Ambient Floating Pop Bubbles */}
      <FloatingBubbles />

      {/* Landing Start Screen (Required for Browser Audio Permission) */}
      {!hasStarted ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-300 via-yellow-400 to-pink-500 text-slate-900 text-center">
          
          <div className="relative mb-6">
            <div className="text-8xl sm:text-9xl animate-bounce">🌟</div>
            <Sparkles className="w-12 h-12 text-white absolute -top-4 -right-4 animate-spin" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-black mb-3 tracking-tight drop-shadow-md text-slate-950">
            Kids Learning & Games Hub 🚀
          </h1>

          <p className="text-lg sm:text-xl font-bold text-slate-900 max-w-2xl mb-6 drop-shadow-sm">
            Incredible India • Hindi • Marvel Superheroes • Piano & Music • Vehicles • Fruits & Veggies • Science & Planets • Math • Geography • History • Animal World
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-lg">
            <span className="bg-white/90 text-slate-900 font-extrabold px-3 py-1.5 rounded-full text-sm shadow-sm">
              🐣 Baby (Age 2)
            </span>
            <span className="bg-white/90 text-slate-900 font-extrabold px-3 py-1.5 rounded-full text-sm shadow-sm">
              🦁 Toddler (Age 3)
            </span>
            <span className="bg-white/90 text-slate-900 font-extrabold px-3 py-1.5 rounded-full text-sm shadow-sm">
              🚀 Explorer (Age 4+)
            </span>
          </div>

          <button
            onClick={handleStartGame}
            onTouchStart={handleStartGame}
            className="group relative bg-emerald-400 hover:bg-emerald-500 active:scale-95 text-slate-950 px-10 py-6 rounded-full font-black text-3xl shadow-2xl border-4 border-white transition-all transform hover:scale-105 flex items-center gap-4 cursor-pointer"
          >
            <Play className="w-10 h-10 fill-slate-950" />
            <span>START PLAYING!</span>
            <Volume2 className="w-8 h-8 animate-pulse text-slate-900" />
          </button>

          <p className="text-sm font-semibold text-slate-800 mt-6">
            🔊 Sound On • Designed for Toddlers & Kids
          </p>
        </div>
      ) : (
        <>
          {/* Main Navigation with Age & Lock Controls */}
          <Navbar
            currentCategory={currentCategory}
            onSelectCategory={setCurrentCategory}
            currentAge={currentAge}
            onSelectAge={setCurrentAge}
            isLocked={isLocked}
            onToggleLock={setIsLocked}
          />

          {/* Active View Container */}
          <main className="w-full h-full overflow-hidden">
            {currentCategory === 'hub' && (
              <HubDashboard
                currentAge={currentAge}
                onSelectCategory={setCurrentCategory}
              />
            )}
            {currentCategory === 'india' && <IndiaHub />}
            {currentCategory === 'hindi' && <HindiHub />}
            {currentCategory === 'music' && <MusicHub />}
            {currentCategory === 'vehicles' && <VehiclesHub />}
            {currentCategory === 'fruits' && <FruitsHub />}
            {currentCategory === 'superheroes' && <SuperheroesHub />}
            {currentCategory === 'science' && <ScienceHub />}
            {currentCategory === 'math' && <MathHub />}
            {currentCategory === 'geography' && <GeographyHub />}
            {currentCategory === 'history' && <HistoryHub />}
            {currentCategory === 'animals' && <AnimalsHub />}
          </main>
        </>
      )}
    </div>
  );
}
