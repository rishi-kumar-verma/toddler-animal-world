import React, { useState, useRef, useEffect } from 'react';
import { Maximize, Minimize, Lock, Unlock, Grid, Box, HelpCircle } from 'lucide-react';
import { playPopSound, playCheerSound } from '../audio/animalSounds';

export type GameMode = 'grid' | '3d' | 'quiz';

interface NavbarProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  isLocked: boolean;
  onToggleLock: (locked: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
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

  const handleModeChange = (mode: GameMode) => {
    if (isLocked) return;
    playPopSound();
    onSelectMode(mode);
  };

  // Immediate Lock when unlocked, 3s hold when locked
  const handleLockClick = () => {
    if (!isLocked) {
      onToggleLock(true);
      playPopSound();
      // Optionally request fullscreen on lock for baby safety
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
      <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-white/95 backdrop-blur-md border-b-2 border-yellow-300 px-2 sm:px-4 flex items-center justify-between shadow-sm select-none">
        
        {/* Brand Title */}
        <div className="flex items-center gap-1">
          <span className="text-2xl animate-bounce">🐮</span>
          <h1 className="text-base font-black text-slate-800 tracking-tight hidden lg:block">
            Baby Animal World
          </h1>
        </div>

        {/* Mode Switcher Tabs (Hidden when Baby Lock is ON) */}
        {!isLocked ? (
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => handleModeChange('grid')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-extrabold text-xs transition-all ${
                currentMode === 'grid'
                  ? 'bg-yellow-400 text-slate-950 shadow-sm border border-yellow-500 scale-105'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Zoo Grid</span>
            </button>

            <button
              onClick={() => handleModeChange('3d')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-extrabold text-xs transition-all ${
                currentMode === '3d'
                  ? 'bg-pink-400 text-white shadow-sm border border-pink-500 scale-105'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">3D Box</span>
            </button>

            <button
              onClick={() => handleModeChange('quiz')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-extrabold text-xs transition-all ${
                currentMode === 'quiz'
                  ? 'bg-indigo-500 text-white shadow-sm border border-indigo-600 scale-105'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Quiz</span>
            </button>
          </div>
        ) : (
          <div className="bg-amber-100 border border-amber-400 px-3 py-1 rounded-xl flex items-center gap-1.5 animate-pulse">
            <Lock className="w-4 h-4 text-amber-700" />
            <span className="font-extrabold text-amber-950 text-xs sm:text-sm">
              🔒 Toddler Lock Active
            </span>
          </div>
        )}

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5">
          
          {/* Baby Lock / Unlock Button */}
          {isLocked ? (
            /* UNLOCK BUTTON (Requires 3s Hold) */
            <button
              onMouseDown={startHoldUnlock}
              onMouseUp={stopHoldUnlock}
              onMouseLeave={stopHoldUnlock}
              onTouchStart={startHoldUnlock}
              onTouchEnd={stopHoldUnlock}
              onTouchCancel={stopHoldUnlock}
              className="relative overflow-hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm bg-red-600 text-white border-2 border-yellow-300 shadow-lg cursor-pointer animate-pulse"
            >
              <Lock className="w-4 h-4 text-yellow-300" />
              <span>HOLD 3S TO UNLOCK 🔓</span>

              {/* Progress Bar Indicator */}
              {lockHoldProgress > 0 && (
                <div
                  className="absolute inset-0 bg-yellow-400/90 transition-all duration-75 pointer-events-none flex items-center justify-center text-slate-950 font-black text-xs"
                  style={{ width: `${lockHoldProgress}%` }}
                >
                  {lockHoldProgress}%
                </div>
              )}
            </button>
          ) : (
            /* LOCK BUTTON (Click once to lock) */
            <button
              onClick={handleLockClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-extrabold text-xs sm:text-sm bg-emerald-400 text-slate-950 border border-emerald-500 shadow-sm hover:bg-emerald-500 transition-transform active:scale-95 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Baby Lock</span>
            </button>
          )}

          {/* Fullscreen Button (Hidden when locked to protect baby) */}
          {!isLocked && (
            <button
              onClick={toggleFullscreen}
              className="p-1.5 bg-yellow-200 hover:bg-yellow-300 border border-yellow-400 text-slate-900 rounded-xl font-bold shadow-sm active:scale-95"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          )}

        </div>
      </header>

      {/* Floating Parent Unlock Banner when Baby Lock is ON */}
      {isLocked && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-4 py-2 rounded-full shadow-2xl border-2 border-yellow-300 flex items-center gap-2 animate-bounce max-w-[95vw]">
          <Lock className="w-4 h-4 text-yellow-300 shrink-0" />
          <span className="font-extrabold text-xs sm:text-sm tracking-wide text-center">
            🔒 SCREEN LOCKED FOR BABY! Press & Hold "HOLD 3S TO UNLOCK" for 3 seconds.
          </span>
        </div>
      )}
    </>
  );
};
