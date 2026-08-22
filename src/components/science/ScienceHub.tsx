import React, { useState } from 'react';
import { PLANETS, DINOSAURS, BODY_PARTS, SCIENCE_EXPERIMENTS } from '../../data/science';
import { Planet, Dinosaur, BodyPart } from '../../types/hub';
import { speakText, playCheerSound, playPopSound } from '../../audio/animalSounds';
import {
  playRocketLaunch,
  playDinoRoar,
  playHeartBeat,
  playMagicSound,
} from '../../audio/soundEffects';
import confetti from 'canvas-confetti';
import { Rocket, Sparkles, Heart, Flame } from 'lucide-react';

export const ScienceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'planets' | 'dinos' | 'lab' | 'body'>('planets');
  const [selectedPlanet, setSelectedPlanet] = useState<Planet>(PLANETS[3]); // Default Earth
  const [selectedDino, setSelectedDino] = useState<Dinosaur>(DINOSAURS[0]); // Default T-Rex
  const [isLaunchingRocket, setIsLaunchingRocket] = useState(false);
  const [launchCountdown, setLaunchCountdown] = useState<number | null>(null);
  const [plantGrowth, setPlantGrowth] = useState(1);
  const [isVolcanoErupting, setIsVolcanoErupting] = useState(false);

  // Trigger Planet Selection
  const handlePlanetClick = (planet: Planet) => {
    setSelectedPlanet(planet);
    playPopSound();
    speakText(`${planet.name}! ${planet.funFact}`);
  };

  // Trigger Rocket Launch
  const handleRocketLaunch = () => {
    if (isLaunchingRocket) return;
    setIsLaunchingRocket(true);
    setLaunchCountdown(3);
    speakText('Rocket launch in 3... 2... 1...');

    setTimeout(() => setLaunchCountdown(2), 1000);
    setTimeout(() => setLaunchCountdown(1), 2000);
    setTimeout(() => {
      setLaunchCountdown(0);
      playRocketLaunch();
      speakText('BLAST OFF TO THE STARS! 🚀');
      confetti({ particleCount: 100, spread: 100, origin: { y: 0.5 } });

      setTimeout(() => {
        setIsLaunchingRocket(false);
        setLaunchCountdown(null);
      }, 3000);
    }, 3000);
  };

  // Trigger Dino Roar
  const handleDinoClick = (dino: Dinosaur) => {
    setSelectedDino(dino);
    playDinoRoar();
    setTimeout(() => {
      speakText(`${dino.name}! ${dino.pronounce}! ${dino.funFact}`);
    }, 200);
  };

  // Trigger Body Part
  const handleBodyClick = (part: BodyPart) => {
    if (part.sound === 'heart') {
      playHeartBeat();
    } else {
      playMagicSound();
    }
    speakText(`${part.name}! ${part.fact}`);
  };

  // Trigger Volcano
  const triggerVolcano = () => {
    setIsVolcanoErupting(true);
    playRocketLaunch();
    confetti({ particleCount: 80, spread: 70, colors: ['#ff0000', '#ff7700', '#ffff00'] });
    speakText('Volcano eruption! Fizzing bubbly lava bursts into the sky!');
    setTimeout(() => setIsVolcanoErupting(false), 2500);
  };

  // Trigger Plant Water
  const waterPlant = () => {
    playPopSound();
    const nextGrowth = plantGrowth >= 4 ? 1 : plantGrowth + 1;
    setPlantGrowth(nextGrowth);
    if (nextGrowth === 4) {
      playCheerSound();
      confetti({ particleCount: 60, spread: 80 });
      speakText('Yay! The sunflower blossomed into a beautiful flower!');
    } else {
      speakText('Watering the little seed! It drinks water and grows bigger!');
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto pt-20 pb-24 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Sub-tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-3xl border-3 border-indigo-300 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-4xl animate-bounce">🪐</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Science & Nature World
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                Real NASA Space Photos, Dinosaurs, Body Organs & Experiments!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => { playPopSound(); setActiveTab('planets'); speakText('Solar System & Planets!'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'planets'
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🪐 Solar System
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('dinos'); speakText('Dinosaur Park!'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'dinos'
                  ? 'bg-emerald-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🦖 Dino Park
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('lab'); speakText('Science Lab Experiments!'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'lab'
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🌋 Science Lab
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('body'); speakText('My Amazing Body!'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'body'
                  ? 'bg-rose-500 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🫀 My Body
            </button>
          </div>
        </div>

        {/* TAB 1: SOLAR SYSTEM & PLANETS WITH REAL NASA PHOTOS */}
        {activeTab === 'planets' && (
          <div className="space-y-6">
            
            {/* Featured Planet Card */}
            <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${selectedPlanet.color} text-white shadow-2xl border-4 border-white flex flex-col md:flex-row items-center justify-between gap-6`}>
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-black/30 shrink-0">
                  <img
                    src={selectedPlanet.imageUrl}
                    alt={selectedPlanet.name}
                    className="w-full h-full object-cover animate-pulse"
                  />
                </div>
                <div>
                  <div className="inline-block bg-white/90 text-slate-950 text-xs font-black px-3 py-1 rounded-full mb-2 shadow-sm">
                    {selectedPlanet.size} • Order #{selectedPlanet.orderFromSun}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black">{selectedPlanet.name} {selectedPlanet.emoji}</h3>
                  <p className="text-base sm:text-lg font-bold text-yellow-100 max-w-xl mt-1">
                    {selectedPlanet.funFact}
                  </p>
                  <p className="text-sm font-semibold opacity-90 mt-2">
                    🌡️ Temperature: {selectedPlanet.temperature}
                  </p>
                </div>
              </div>

              {/* Rocket Launcher Button */}
              <button
                onClick={handleRocketLaunch}
                disabled={isLaunchingRocket}
                className="px-6 py-4 rounded-3xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-lg shadow-xl border-4 border-white flex items-center gap-3 cursor-pointer shrink-0 transition-transform"
              >
                <Rocket className={`w-7 h-7 text-slate-950 ${isLaunchingRocket ? 'animate-bounce' : ''}`} />
                <span>
                  {launchCountdown !== null
                    ? launchCountdown === 0
                      ? '🚀 BLAST OFF!'
                      : `🚀 LAUNCH IN ${launchCountdown}...`
                    : 'LAUNCH ROCKET!'}
                </span>
              </button>
            </div>

            {/* Planets Grid with Real Space Photos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {PLANETS.map((planet) => (
                <button
                  key={planet.id}
                  onClick={() => handlePlanetClick(planet)}
                  className={`p-3 sm:p-4 rounded-3xl bg-gradient-to-br ${planet.color} text-white border-4 ${
                    selectedPlanet.id === planet.id ? 'border-yellow-300 ring-4 ring-yellow-400 scale-105' : 'border-white/80'
                  } shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 text-center flex flex-col items-center gap-2 cursor-pointer`}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/60 shadow bg-black/20">
                    <img
                      src={planet.imageUrl}
                      alt={planet.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-black text-base drop-shadow-sm">{planet.name}</span>
                  <span className="text-xs font-semibold opacity-90">{planet.emoji} Explore</span>
                </button>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: DINOSAUR PARK WITH REAL PHOTOS */}
        {activeTab === 'dinos' && (
          <div className="space-y-6">
            
            {/* Active Dino Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-amber-700 text-white shadow-2xl border-4 border-emerald-300 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-black/30 shrink-0">
                  <img
                    src={selectedDino.imageUrl}
                    alt={selectedDino.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-2 justify-center sm:justify-start">
                    <span className="bg-emerald-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full">
                      {selectedDino.diet}
                    </span>
                    <span className="bg-amber-300 text-slate-950 text-xs font-black px-3 py-1 rounded-full">
                      {selectedDino.period}
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black">{selectedDino.name} {selectedDino.emoji}</h3>
                  <p className="text-sm font-black text-yellow-200">
                    🗣️ Pronounce: "{selectedDino.pronounce}"
                  </p>
                  <p className="text-base font-bold text-white/95 max-w-xl mt-2">
                    {selectedDino.funFact}
                  </p>
                  <p className="text-sm font-semibold text-emerald-200 mt-1">
                    📏 Size: {selectedDino.size}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDinoClick(selectedDino)}
                className="px-6 py-4 rounded-3xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-lg shadow-xl border-4 border-white flex items-center gap-3 cursor-pointer shrink-0"
              >
                <Flame className="w-6 h-6 text-red-600" />
                <span>ROAR LIKE DINO!</span>
              </button>
            </div>

            {/* Dinosaurs Selection */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {DINOSAURS.map((dino) => (
                <button
                  key={dino.id}
                  onClick={() => handleDinoClick(dino)}
                  className={`p-3 sm:p-4 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white border-4 ${
                    selectedDino.id === dino.id ? 'border-yellow-300 ring-4 ring-yellow-400 scale-105' : 'border-white'
                  } shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 text-center flex flex-col items-center gap-2 cursor-pointer`}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/60 shadow bg-black/20">
                    <img
                      src={dino.imageUrl}
                      alt={dino.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-black text-sm sm:text-base drop-shadow-sm">{dino.name}</span>
                  <span className="text-xs font-semibold text-emerald-200">{dino.diet}</span>
                </button>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: SCIENCE LAB EXPERIMENTS */}
        {activeTab === 'lab' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Volcano Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 text-white border-4 border-yellow-300 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-6xl ${isVolcanoErupting ? 'animate-bounce' : ''}`}>🌋</span>
                  <span className="bg-yellow-300 text-slate-950 font-black text-xs px-3 py-1 rounded-full">
                    Active Experiment
                  </span>
                </div>
                <h4 className="text-2xl font-black mb-1">Volcano Lava Eruption!</h4>
                <p className="text-sm font-bold text-yellow-100 mb-4">
                  {SCIENCE_EXPERIMENTS[0].tagline}
                </p>
                <p className="text-xs font-semibold bg-black/20 p-3 rounded-2xl">
                  🧪 Fun Fact: {SCIENCE_EXPERIMENTS[0].funFact}
                </p>
              </div>

              <button
                onClick={triggerVolcano}
                className="mt-6 w-full py-4 rounded-2xl bg-yellow-400 text-slate-950 font-black text-lg shadow-lg hover:bg-yellow-300 transition-transform active:scale-95 cursor-pointer"
              >
                🔥 TAP TO ERUPT VOLCANO!
              </button>
            </div>

            {/* Plant Growing Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-700 text-white border-4 border-lime-300 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-6xl">
                    {plantGrowth === 1 && '🌱'}
                    {plantGrowth === 2 && '🌿'}
                    {plantGrowth === 3 && '🪴'}
                    {plantGrowth === 4 && '🌻'}
                  </span>
                  <span className="bg-lime-300 text-slate-950 font-black text-xs px-3 py-1 rounded-full">
                    Growth Stage {plantGrowth} of 4
                  </span>
                </div>
                <h4 className="text-2xl font-black mb-1">Water the Sunflower!</h4>
                <p className="text-sm font-bold text-lime-100 mb-4">
                  {SCIENCE_EXPERIMENTS[3].tagline}
                </p>
                <p className="text-xs font-semibold bg-black/20 p-3 rounded-2xl">
                  💧 Fun Fact: {SCIENCE_EXPERIMENTS[3].funFact}
                </p>
              </div>

              <button
                onClick={waterPlant}
                className="mt-6 w-full py-4 rounded-2xl bg-sky-300 text-slate-950 font-black text-lg shadow-lg hover:bg-sky-200 transition-transform active:scale-95 cursor-pointer"
              >
                💧 TAP TO WATER PLANT!
              </button>
            </div>

            {/* Rainbow Maker */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-amber-400 text-white border-4 border-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-6xl">🌈</span>
                  <span className="bg-white text-slate-950 font-black text-xs px-3 py-1 rounded-full">
                    Prism Colors
                  </span>
                </div>
                <h4 className="text-2xl font-black mb-1">Rainbow Prism Maker!</h4>
                <p className="text-sm font-bold text-white/90 mb-4">
                  {SCIENCE_EXPERIMENTS[1].tagline}
                </p>
              </div>

              <button
                onClick={() => { playCheerSound(); confetti({ particleCount: 60 }); speakText('Rainbow light! Red, Orange, Yellow, Green, Blue, Indigo, Violet!'); }}
                className="mt-6 w-full py-4 rounded-2xl bg-white text-slate-950 font-black text-lg shadow-lg hover:bg-yellow-200 transition-transform active:scale-95 cursor-pointer"
              >
                ✨ SHINE RAINBOW LIGHT!
              </button>
            </div>

            {/* Magic Magnets */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-red-600 text-white border-4 border-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-6xl">🧲</span>
                  <span className="bg-white text-slate-950 font-black text-xs px-3 py-1 rounded-full">
                    Magnetic Force
                  </span>
                </div>
                <h4 className="text-2xl font-black mb-1">Magic Magnets Pull!</h4>
                <p className="text-sm font-bold text-white/90 mb-4">
                  {SCIENCE_EXPERIMENTS[2].tagline}
                </p>
              </div>

              <button
                onClick={() => { playMagicSound(); confetti({ particleCount: 40 }); speakText('Snap! The magnet pulls all iron paperclips together with invisible force!'); }}
                className="mt-6 w-full py-4 rounded-2xl bg-white text-slate-950 font-black text-lg shadow-lg hover:bg-yellow-200 transition-transform active:scale-95 cursor-pointer"
              >
                🧲 SNAP MAGNETS!
              </button>
            </div>

          </div>
        )}

        {/* TAB 4: MY AMAZING BODY WITH REAL ORGAN PHOTOS */}
        {activeTab === 'body' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {BODY_PARTS.map((part) => (
              <button
                key={part.id}
                onClick={() => handleBodyClick(part)}
                className="p-5 sm:p-6 rounded-3xl bg-white/95 border-4 border-rose-300 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-left flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-rose-200 shadow bg-rose-50">
                      <img
                        src={part.imageUrl}
                        alt={part.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Heart className="w-6 h-6 text-rose-500 animate-pulse" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">{part.name} {part.emoji}</h4>
                  <p className="text-sm font-bold text-slate-600 mt-2">{part.fact}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-rose-100 flex items-center justify-between text-rose-700 font-black text-sm">
                  <span>{part.action}</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
