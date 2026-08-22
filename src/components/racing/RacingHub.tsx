import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RACER_CARS, RACE_TRACKS } from '../../data/racing';
import { RacerCar, RaceTrack } from '../../types/hub';
import { speakHindi } from '../../audio/hindiSpeech';
import { playCheerSound, playPopSound } from '../../audio/animalSounds';
import { getAudioContext, playRocketLaunch } from '../../audio/soundEffects';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Volume2, Zap, Trophy, Flame, ChevronLeft, ChevronRight, Gauge, Sliders } from 'lucide-react';

interface GameItem {
  id: number;
  lane: number; // 0, 1, 2, 3
  y: number; // 0 to 100%
  type: 'star' | 'obstacle';
  emoji: string;
}

export type SpeedDifficulty = 'baby' | 'toddler' | 'turbo';

export const RacingHub: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<RacerCar>(RACER_CARS[0]);
  const [selectedTrack, setSelectedTrack] = useState<RaceTrack>(RACE_TRACKS[0]);
  const [gameState, setGameState] = useState<'garage' | 'racing' | 'victory'>('garage');
  
  // Speed Difficulty Setting (Baby / Toddler / Turbo)
  const [speedMode, setSpeedMode] = useState<SpeedDifficulty>('baby');

  // Racing In-Game State
  const [playerLane, setPlayerLane] = useState(1); // 0, 1, 2, 3
  const [speed, setSpeed] = useState(40);
  const [nitro, setNitro] = useState(100);
  const [isNitro, setIsNitro] = useState(false);
  const [starsCount, setStarsCount] = useState(0);
  const [distance, setDistance] = useState(0); // 0 to 1000 meters
  const [isCrashed, setIsCrashed] = useState(false);
  const [items, setItems] = useState<GameItem[]>([]);

  const nextItemId = useRef(1);

  // Engine Pitch Sound
  const playEngineSound = (highPitch: boolean) => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(highPitch ? 280 : 120, now);
      osc.frequency.linearRampToValueAtTime(highPitch ? 440 : 160, now + 0.2);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      console.error(e);
    }
  };

  // Horn Sound
  const playHorn = () => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      [440, 554].forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      });
      speakHindi('बीप बीप! रास्ता दो!');
    } catch (e) {
      console.error(e);
    }
  };

  // Move Left
  const moveLeft = useCallback(() => {
    setPlayerLane((prev) => Math.max(0, prev - 1));
    playEngineSound(false);
  }, []);

  // Move Right
  const moveRight = useCallback(() => {
    setPlayerLane((prev) => Math.min(3, prev + 1));
    playEngineSound(false);
  }, []);

  // Activate Nitro
  const triggerNitro = useCallback(() => {
    if (nitro < 20 || isNitro) return;
    setIsNitro(true);
    playRocketLaunch();
    confetti({ particleCount: 30, spread: 60 });
    speakHindi('टर्बो बूस्ट! सुपर स्पीड!');

    setTimeout(() => {
      setIsNitro(false);
    }, 2500);
  }, [nitro, isNitro]);

  // Set Speed Mode with Voice Feedback
  const handleSpeedModeChange = (mode: SpeedDifficulty) => {
    setSpeedMode(mode);
    playPopSound();
    if (mode === 'baby') {
      speakHindi('बेबी मोड! धीमी और आसान गति!');
    } else if (mode === 'toddler') {
      speakHindi('टॉडलर मोड! मध्यम गति!');
    } else {
      speakHindi('टर्बो मोड! सुपर फ़ास्ट स्पीड!');
    }
  };

  // Keyboard Controls Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'racing') return;
      if (e.key === 'ArrowLeft' || e.key === 'a') moveLeft();
      if (e.key === 'ArrowRight' || e.key === 'd') moveRight();
      if (e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w') triggerNitro();
      if (e.key === 'h') playHorn();
      if (e.key === '1') handleSpeedModeChange('baby');
      if (e.key === '2') handleSpeedModeChange('toddler');
      if (e.key === '3') handleSpeedModeChange('turbo');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, moveLeft, moveRight, triggerNitro]);

  // Start Race
  const startRace = () => {
    setGameState('racing');
    setPlayerLane(1);
    setSpeed(speedMode === 'baby' ? 40 : speedMode === 'toddler' ? 80 : 140);
    setNitro(100);
    setStarsCount(0);
    setDistance(0);
    setIsCrashed(false);
    setItems([]);
    playPopSound();
    speakHindi(`३, २, १... गो! ${selectedCar.hindiName} रेस शुरू!`);
  };

  // Main Race Loop with Dynamic Speed Adjustment
  useEffect(() => {
    if (gameState !== 'racing') return;

    // Speed configuration per mode
    const speedConfig = {
      baby: { baseScroll: 2.2, nitroScroll: 4.5, distStep: 3, displayBase: 40, spawnRate: 0.25 },
      toddler: { baseScroll: 4.0, nitroScroll: 7.5, distStep: 5.5, displayBase: 80, spawnRate: 0.35 },
      turbo: { baseScroll: 6.5, nitroScroll: 11.0, distStep: 8.5, displayBase: 150, spawnRate: 0.45 }
    }[speedMode];

    const interval = setInterval(() => {
      setDistance((prev) => {
        const step = isNitro ? speedConfig.distStep * 2 : speedConfig.distStep;
        const nextDist = prev + step;

        // Finish Line check (1000m)
        if (nextDist >= 1000) {
          clearInterval(interval);
          setGameState('victory');
          playCheerSound();
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 }
          });
          speakHindi(`बधाई हो! ${selectedCar.name} प्रथम आया! यू आर द चैंपियन! 🏆`);
          return 1000;
        }
        return nextDist;
      });

      // Update Display Speed
      const currentDisplay = isNitro
        ? speedConfig.displayBase * 1.6
        : speedConfig.displayBase + Math.floor(Math.random() * 6);
      setSpeed(Math.floor(currentDisplay));

      // Regenerate Nitro gradually
      setNitro((prev) => Math.min(100, isNitro ? prev - 3 : prev + 0.6));

      // Spawn Random Items (Stars / Obstacles)
      if (Math.random() < speedConfig.spawnRate) {
        // In baby mode, 80% are stars!
        const starChance = speedMode === 'baby' ? 0.8 : speedMode === 'toddler' ? 0.6 : 0.45;
        const isStar = Math.random() < starChance;
        const lane = Math.floor(Math.random() * 4);
        const obstacleList = selectedTrack.obstacleEmoji;
        const emoji = isStar
          ? selectedTrack.collectibleEmoji
          : obstacleList[Math.floor(Math.random() * obstacleList.length)];

        setItems((prev) => [
          ...prev,
          {
            id: nextItemId.current++,
            lane,
            y: 0,
            type: isStar ? 'star' : 'obstacle',
            emoji
          }
        ]);
      }

      // Move Items Down the Track
      setItems((prev) => {
        const scrollSpeed = isNitro ? speedConfig.nitroScroll : speedConfig.baseScroll;
        return prev
          .map((item) => ({ ...item, y: item.y + scrollSpeed }))
          .filter((item) => {
            // Collision Detection with Player Car (Near y: 78% to 92%)
            if (item.y >= 75 && item.y <= 92 && item.lane === playerLane) {
              if (item.type === 'star') {
                setStarsCount((s) => s + 1);
                playPopSound();
              } else {
                // Obstacle Hit
                setIsCrashed(true);
                playEngineSound(false);
                setTimeout(() => setIsCrashed(false), 450);
              }
              return false; // Remove collected item
            }
            return item.y < 105; // Keep on screen
          });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [gameState, isNitro, playerLane, selectedCar, selectedTrack, speedMode]);

  return (
    <div className="w-full h-full overflow-hidden pt-20 pb-24 px-3 sm:px-6 relative select-none">
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        
        {/* Header Bar with Quick Speed Controller */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl border-3 border-red-400 shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-bounce">🏎️</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                टर्बो कार रेसिंग • Kids Turbo Racers 🏁
              </h2>
              <p className="text-xs font-bold text-slate-600">
                Speed Control for Babies (2 yrs), Toddlers (3 yrs) & Turbo Kids (4+ yrs)!
              </p>
            </div>
          </div>

          {/* Speed Selector Tabs (Available in Garage & In-Game!) */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-300">
            <button
              onClick={() => handleSpeedModeChange('baby')}
              className={`px-3 py-1 rounded-xl font-black text-xs transition-all ${
                speedMode === 'baby'
                  ? 'bg-emerald-500 text-slate-950 shadow scale-105 ring-2 ring-emerald-300'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🐣 Baby (Slow & Easy)
            </button>

            <button
              onClick={() => handleSpeedModeChange('toddler')}
              className={`px-3 py-1 rounded-xl font-black text-xs transition-all ${
                speedMode === 'toddler'
                  ? 'bg-amber-500 text-slate-950 shadow scale-105 ring-2 ring-amber-300'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🦁 Toddler (Medium)
            </button>

            <button
              onClick={() => handleSpeedModeChange('turbo')}
              className={`px-3 py-1 rounded-xl font-black text-xs transition-all ${
                speedMode === 'turbo'
                  ? 'bg-red-600 text-white shadow scale-105 ring-2 ring-red-300'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🚀 Turbo Pro (Fast)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { playPopSound(); setGameState('garage'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                gameState === 'garage'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🚗 Garage
            </button>

            {gameState === 'garage' && (
              <button
                onClick={startRace}
                className="px-5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-md border-2 border-white flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>START RACE!</span>
              </button>
            )}
          </div>
        </div>

        {/* SCREEN 1: CAR & TRACK GARAGE SELECTION */}
        {gameState === 'garage' && (
          <div className="flex-1 overflow-y-auto space-y-4 pb-8">
            
            {/* Speed Difficulty Setting Banner */}
            <div className="bg-gradient-to-r from-emerald-100 via-amber-50 to-rose-100 rounded-3xl p-4 border-3 border-amber-300 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <span className="text-4xl">⚡</span>
                <div>
                  <h4 className="font-black text-slate-900 text-base sm:text-lg">
                    Speed Control Setting (गति चयन)
                  </h4>
                  <p className="text-xs font-bold text-slate-600">
                    {speedMode === 'baby' && '🐣 Baby Mode: Extra gentle cruising speed, lots of golden stars!'}
                    {speedMode === 'toddler' && '🦁 Toddler Mode: Fun balanced speed with obstacles!'}
                    {speedMode === 'turbo' && '🚀 Turbo Pro: Maximum adrenaline championship speed!'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleSpeedModeChange('baby')}
                  className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm border-2 ${
                    speedMode === 'baby'
                      ? 'bg-emerald-500 text-slate-950 border-emerald-600 shadow-md scale-105'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  🐣 40 MPH
                </button>
                <button
                  onClick={() => handleSpeedModeChange('toddler')}
                  className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm border-2 ${
                    speedMode === 'toddler'
                      ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md scale-105'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  🦁 80 MPH
                </button>
                <button
                  onClick={() => handleSpeedModeChange('turbo')}
                  className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm border-2 ${
                    speedMode === 'turbo'
                      ? 'bg-red-600 text-white border-red-700 shadow-md scale-105'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  🚀 150 MPH
                </button>
              </div>
            </div>

            {/* Choose Your Car */}
            <div className="bg-white/95 rounded-3xl p-5 border-3 border-red-300 shadow-xl">
              <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                <span>🏎️ Step 1: Choose Your Racing Vehicle</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {RACER_CARS.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => { setSelectedCar(car); playPopSound(); speakHindi(`${car.hindiName}! ${car.name}!`); }}
                    className={`p-3.5 rounded-2xl bg-gradient-to-br ${car.colorGradient} border-4 ${
                      selectedCar.id === car.id ? 'border-yellow-300 ring-4 ring-yellow-400 scale-105 shadow-2xl' : 'border-white'
                    } text-white shadow-md hover:scale-105 active:scale-95 transition-all text-center flex flex-col items-center justify-between cursor-pointer`}
                  >
                    <span className="text-5xl my-2 drop-shadow-md animate-pulse">{car.emoji}</span>
                    <div>
                      <h4 className="font-black text-sm">{car.name}</h4>
                      <p className="text-[11px] font-bold text-yellow-200">{car.hindiName}</p>
                      <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-full inline-block mt-1">
                        Power: {car.specialMove}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Track */}
            <div className="bg-white/95 rounded-3xl p-5 border-3 border-purple-300 shadow-xl">
              <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                <span>🌈 Step 2: Choose Your Race Track</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {RACE_TRACKS.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => { setSelectedTrack(track); playPopSound(); speakHindi(`${track.hindiName}!`); }}
                    className={`p-4 rounded-2xl bg-gradient-to-br ${track.bgGradient} border-4 ${
                      selectedTrack.id === track.id ? 'border-yellow-300 ring-4 ring-yellow-400 scale-105 shadow-2xl' : 'border-white'
                    } text-white shadow-md hover:scale-105 active:scale-95 transition-all text-left flex flex-col justify-between cursor-pointer`}
                  >
                    <span className="text-4xl mb-2">{track.emoji}</span>
                    <div>
                      <h4 className="font-black text-lg">{track.name}</h4>
                      <p className="text-xs font-bold text-yellow-200">{track.hindiName}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Giant Start Button */}
            <button
              onClick={startRace}
              className="w-full py-5 rounded-3xl bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600 hover:from-emerald-500 hover:to-teal-700 active:scale-95 text-slate-950 font-black text-2xl sm:text-3xl shadow-2xl border-4 border-white flex items-center justify-center gap-3 cursor-pointer transition-transform"
            >
              <Play className="w-8 h-8 fill-slate-950" />
              <span>START RACE ({speedMode.toUpperCase()} SPEED)! 🏁</span>
            </button>

          </div>
        )}

        {/* SCREEN 2: ACTIVE 3D/2.5D ARCADE RACE TRACK */}
        {gameState === 'racing' && (
          <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full relative">
            
            {/* In-Game Dashboard HUD with Live Speed Switcher */}
            <div className="bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-2xl border-2 border-yellow-400 shadow-xl flex items-center justify-between gap-2 mb-2 z-20">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 text-yellow-300 flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>{speed} MPH</span>
                </span>

                <span className="text-xs font-black bg-amber-500 text-slate-950 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  ⭐ {starsCount}
                </span>
              </div>

              {/* Race Distance Progress */}
              <div className="flex-1 max-w-[140px] bg-slate-800 h-3.5 rounded-full overflow-hidden border border-slate-700 relative">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-emerald-500 transition-all duration-100"
                  style={{ width: `${(distance / 1000) * 100}%` }}
                />
              </div>

              {/* Live In-Game Speed Adjuster */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleSpeedModeChange(speedMode === 'turbo' ? 'toddler' : 'baby')}
                  className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-[10px] font-bold border border-slate-600"
                >
                  🐢 Slower
                </button>
                <button
                  onClick={() => handleSpeedModeChange(speedMode === 'baby' ? 'toddler' : 'turbo')}
                  className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-[10px] font-bold border border-slate-600"
                >
                  🚀 Faster
                </button>
              </div>

              {/* Nitro Bar */}
              <div className="flex items-center gap-1">
                <Flame className={`w-4 h-4 ${nitro > 30 ? 'text-orange-500 animate-bounce' : 'text-slate-500'}`} />
                <span className="text-xs font-bold">{Math.floor(nitro)}%</span>
              </div>
            </div>

            {/* The 4-Lane Scrolling Road Track with Touch-Tap steering */}
            <div 
              className={`flex-1 rounded-3xl overflow-hidden relative border-4 border-white shadow-2xl bg-gradient-to-b ${selectedTrack.roadColor}`}
            >
              
              {/* Touch Half Screens for Quick Steering */}
              <div 
                onClick={moveLeft}
                className="absolute inset-y-0 left-0 w-1/2 z-10 opacity-0 cursor-pointer"
                title="Tap Left Side to Steer Left"
              />
              <div 
                onClick={moveRight}
                className="absolute inset-y-0 right-0 w-1/2 z-10 opacity-0 cursor-pointer"
                title="Tap Right Side to Steer Right"
              />

              {/* Speed Lines Effect during Nitro */}
              {isNitro && (
                <div className="absolute inset-0 bg-white/10 pointer-events-none z-10 animate-pulse" />
              )}

              {/* Road Lanes Divider Lines */}
              <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
                <div className="border-r-2 border-dashed border-white/40 h-full" />
                <div className="border-r-2 border-dashed border-yellow-300/60 h-full" />
                <div className="border-r-2 border-dashed border-white/40 h-full" />
                <div className="h-full" />
              </div>

              {/* Scrolling Items (Stars & Obstacles) */}
              {items.map((item) => (
                <div
                  key={item.id}
                  className="absolute text-4xl sm:text-5xl transition-transform duration-75 flex items-center justify-center pointer-events-none"
                  style={{
                    left: `${item.lane * 25 + 4}%`,
                    top: `${item.y}%`,
                    width: '18%'
                  }}
                >
                  <span className={item.type === 'star' ? 'animate-spin' : 'animate-bounce'}>
                    {item.emoji}
                  </span>
                </div>
              ))}

              {/* Player Racing Car */}
              <div
                className={`absolute bottom-6 transition-all duration-150 flex flex-col items-center justify-center ${
                  isCrashed ? 'animate-ping rotate-45' : ''
                } ${isNitro ? 'scale-115' : ''}`}
                style={{
                  left: `${playerLane * 25 + 3.5}%`,
                  width: '18%'
                }}
              >
                {/* Nitro Flame Exhaust */}
                {isNitro && (
                  <div className="text-3xl sm:text-4xl animate-bounce -mb-2 z-10">
                    🔥
                  </div>
                )}
                <div className="text-6xl sm:text-7xl filter drop-shadow-2xl">
                  {selectedCar.emoji}
                </div>
              </div>

            </div>

            {/* Big Arcade Controls for Toddlers & Kids */}
            <div className="grid grid-cols-4 gap-2 mt-2 z-20">
              <button
                onClick={moveLeft}
                className="py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 active:scale-90 text-white font-black text-2xl shadow-lg border-2 border-white flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-8 h-8" />
                <span>LEFT</span>
              </button>

              <button
                onClick={moveRight}
                className="py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 active:scale-90 text-white font-black text-2xl shadow-lg border-2 border-white flex items-center justify-center cursor-pointer"
              >
                <span>RIGHT</span>
                <ChevronRight className="w-8 h-8" />
              </button>

              <button
                onClick={triggerNitro}
                className={`py-4 rounded-2xl ${
                  isNitro ? 'bg-orange-600 animate-pulse' : 'bg-gradient-to-r from-amber-500 to-red-600'
                } active:scale-90 text-white font-black text-base sm:text-lg shadow-lg border-2 border-white flex items-center justify-center gap-1 cursor-pointer`}
              >
                <Zap className="w-5 h-5 fill-yellow-300" />
                <span>NITRO!</span>
              </button>

              <button
                onClick={playHorn}
                className="py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 active:scale-90 text-slate-950 font-black text-base sm:text-lg shadow-lg border-2 border-white flex items-center justify-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
                <span>HONK!</span>
              </button>
            </div>

          </div>
        )}

        {/* SCREEN 3: VICTORY CHAMPIONSHIP PODIUM */}
        {gameState === 'victory' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-yellow-400 shadow-2xl text-center max-w-xl mx-auto my-auto animate-fadeIn">
            <div className="text-8xl mb-3 animate-bounce">🏆</div>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-1">
              GRAND CHAMPION! प्रथम स्थान 🥇
            </h3>
            <p className="text-lg font-bold text-amber-700">
              {selectedCar.name} ({selectedCar.hindiName}) Won The Race!
            </p>

            <div className="my-6 bg-amber-50 p-4 rounded-2xl border-2 border-amber-200 flex justify-around items-center">
              <div>
                <span className="text-xs font-bold text-slate-500">Stars Collected</span>
                <p className="text-3xl font-black text-amber-600">⭐ {starsCount}</p>
              </div>
              <div className="h-8 w-px bg-amber-200" />
              <div>
                <span className="text-xs font-bold text-slate-500">Speed Mode</span>
                <p className="text-2xl font-black text-emerald-600 capitalize">{speedMode} Mode</p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={startRace}
                className="px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-lg shadow-xl border-2 border-white flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-5 h-5" />
                <span>RACE AGAIN!</span>
              </button>

              <button
                onClick={() => setGameState('garage')}
                className="px-6 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg shadow-xl border-2 border-white flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>CHANGE CAR 🚗</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
