import React, { useState, useRef, useEffect } from 'react';
import { Maximize, Minimize, Lock, Unlock, Home, Sparkles } from 'lucide-react';
import { AgeCategory, HubCategory } from '../types/hub';
import { playPopSound, playCheerSound } from '../audio/animalSounds';

interface NavbarProps {
  currentCategory: HubCategory;
  onSelectCategory: (cat: HubCategory) => void;
  currentAge: AgeCategory;
  onSelectAge: (age: AgeCategory) => void;
  isLocked: boolean;
  onToggleLock: (locked: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  onSelectCategory,
  currentAge,
  onSelectAge,
  isLocked,
  onToggleLock,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lockHoldProgress, setLockHoldProgress] = useState(0);
  const holdIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  const toggleFullscreen = () => {
    playPopSound();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleAgeChange = (age: AgeCategory) => {
    if (isLocked) return;
    playPopSound();
    onSelectAge(age);
  };

  const handleHomeClick = () => {
    if (isLocked) return;
    playPopSound();
    onSelectCategory('hub');
  };

  const handleLockClick = () => {
    if (!isLocked) {
      onToggleLock(true);
      playPopSound();
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    }
  };

  const startHoldUnlock = (e: React.SyntheticEvent) => {
    if (!isLocked) return;
    e.preventDefault();
    playPopSound();

    let progress = 0;
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);

    holdIntervalRef.current = setInterval(() => {
      progress += 10;
      setLockHoldProgress(progress);
      if (progress >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        holdIntervalRef.current = null;
        onToggleLock(false);
        setLockHoldProgress(0);
        playCheerSound();
      }
    }, 100);
  };

  const stopHoldUnlock = () => {
    if (!isLocked) return;
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    setLockHoldProgress(0);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white/95 backdrop-blur-md border-b-4 border-amber-300 px-3 sm:px-5 flex items-center justify-between shadow-md select-none">
        
        {/* Brand & Home */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleHomeClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-black text-sm transition-all transform active:scale-95 ${
              currentCategory === 'hub'
                ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-md border-2 border-amber-500 scale-105'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
            }`}
            title="Go to Games Hub"
          >
            <Home className="w-4 h-4 text-slate-900" />
            <span className="hidden xs:inline">Hub</span>
          </button>

          <div className="hidden md:flex items-center gap-1.5 text-slate-800 font-extrabold text-sm ml-2">
            <span className="text-xl animate-bounce">🌟</span>
            <span className="bg-gradient-to-r from-amber-600 to-pink-600 bg-clip-text text-transparent">
              Kids Learning & Games Hub
            </span>
          </div>
        </div>

        {/* Age Selector Tabs (Hidden when Baby Lock is ON) */}
        {!isLocked ? (
          <div className="flex items-center gap-1 sm:gap-1.5 bg-amber-50/80 p-1 sm:p-1.5 rounded-2xl border-2 border-amber-200 shadow-inner">
            <button
              onClick={() => handleAgeChange('all')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-1 ${
                currentAge === 'all'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md scale-105 ring-2 ring-indigo-300'
                  : 'text-slate-700 hover:bg-amber-100'
              }`}
            >
              <Sparkles className="w-3 h-3 text-yellow-300" />
              <span>All Ages</span>
            </button>

            <button
              onClick={() => handleAgeChange('2')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                currentAge === '2'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md scale-105 ring-2 ring-pink-300'
                  : 'text-slate-700 hover:bg-amber-100'
              }`}
            >
              🐣 Age 2
            </button>

            <button
              onClick={() => handleAgeChange('3')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                currentAge === '3'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-md scale-105 ring-2 ring-amber-300'
                  : 'text-slate-700 hover:bg-amber-100'
              }`}
            >
              🦁 Age 3
            </button>

            <button
              onClick={() => handleAgeChange('4')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                currentAge === '4'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md scale-105 ring-2 ring-emerald-300'
                  : 'text-slate-700 hover:bg-amber-100'
              }`}
            >
              🚀 Age 4+
            </button>
          </div>
        ) : (
          <div className="bg-amber-100 border-2 border-amber-400 px-3 py-1.5 rounded-2xl flex items-center gap-1.5 animate-pulse">
            <Lock className="w-4 h-4 text-amber-800" />
            <span className="font-extrabold text-amber-950 text-xs sm:text-sm">
              🔒 Toddler Lock Active
            </span>
          </div>
        )}

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          
          {/* Baby Lock / Unlock Button */}
          {isLocked ? (
            <button
              onMouseDown={startHoldUnlock}
              onMouseUp={stopHoldUnlock}
              onMouseLeave={stopHoldUnlock}
              onTouchStart={startHoldUnlock}
              onTouchEnd={stopHoldUnlock}
              onTouchCancel={stopHoldUnlock}
              className="relative overflow-hidden flex items-center gap-1.5 px-3 py-2 rounded-2xl font-black text-xs sm:text-sm bg-red-600 text-white border-2 border-yellow-300 shadow-lg cursor-pointer animate-pulse"
            >
              <Lock className="w-4 h-4 text-yellow-300" />
              <span>HOLD 3S 🔓</span>

              {lockHoldProgress > 0 && (
                <div
                  className="absolute inset-0 bg-yellow-400/95 transition-all duration-75 pointer-events-none flex items-center justify-center text-slate-950 font-black text-xs"
                  style={{ width: `${lockHoldProgress}%` }}
                >
                  {lockHoldProgress}%
                </div>
              )}
            </button>
          ) : (
            <button
              onClick={handleLockClick}
              className="flex items-center gap-1 px-3 py-2 rounded-2xl font-black text-xs sm:text-sm bg-emerald-400 text-slate-950 border-2 border-emerald-500 shadow-sm hover:bg-emerald-500 transition-transform active:scale-95 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span className="hidden sm:inline">Toddler Lock</span>
            </button>
          )}

          {/* Fullscreen Button */}
          {!isLocked && (
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-yellow-200 hover:bg-yellow-300 border-2 border-yellow-400 text-slate-900 rounded-2xl font-bold shadow-sm active:scale-95"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          )}

        </div>
      </header>

      {/* Floating Parent Unlock Banner when Baby Lock is ON */}
      {isLocked && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-5 py-2.5 rounded-full shadow-2xl border-2 border-yellow-300 flex items-center gap-2 animate-bounce max-w-[95vw]">
          <Lock className="w-5 h-5 text-yellow-300 shrink-0" />
          <span className="font-black text-xs sm:text-sm tracking-wide text-center">
            🔒 SCREEN LOCKED! Press & hold "HOLD 3S" button to unlock.
          </span>
        </div>
      )}
    </>
  );
};
