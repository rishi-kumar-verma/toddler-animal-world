import React, { useState } from 'react';
import { CONTINENTS, WORLD_LANDMARKS, OCEAN_CREATURES } from '../../data/geography';
import { Continent, WorldLandmark } from '../../types/hub';
import { speakText, playCheerSound, playPopSound } from '../../audio/animalSounds';
import { playMagicSound } from '../../audio/soundEffects';
import confetti from 'canvas-confetti';
import { Compass, Sparkles } from 'lucide-react';

export const GeographyHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'continents' | 'landmarks' | 'ocean'>('continents');
  const [selectedContinent, setSelectedContinent] = useState<Continent>(CONTINENTS[0]); // Africa default
  const [selectedLandmark, setSelectedLandmark] = useState<WorldLandmark>(WORLD_LANDMARKS[0]);

  const handleContinentClick = (cont: Continent) => {
    setSelectedContinent(cont);
    playPopSound();
    speakText(`Continent ${cont.name}! ${cont.funFact} Look at the famous landmark: ${cont.landmark}!`);
  };

  const handleLandmarkClick = (lm: WorldLandmark) => {
    setSelectedLandmark(lm);
    playMagicSound();
    speakText(`${lm.name} in ${lm.country}! ${lm.fact}`);
    confetti({ particleCount: 30, spread: 50 });
  };

  const handleOceanCreatureClick = (creature: typeof OCEAN_CREATURES[0]) => {
    playPopSound();
    speakText(`${creature.name}! Found in the ${creature.depth}. ${creature.soundFact}`);
    confetti({ particleCount: 25, spread: 40 });
  };

  return (
    <div className="w-full h-full overflow-y-auto pt-20 pb-24 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-3xl border-3 border-emerald-300 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-4xl animate-bounce">🌍</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Geography World Safari
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                Real World Photos of 7 Continents, Famous Landmarks & Deep Sea Life!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => { playPopSound(); setActiveTab('continents'); speakText('Let us explore the 7 Continents of Earth!'); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'continents'
                  ? 'bg-emerald-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>7 Continents</span>
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('landmarks'); speakText('World Wonders and famous Landmarks!'); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'landmarks'
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Landmarks</span>
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('ocean'); speakText('Submarine dive into the Deep Ocean!'); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'ocean'
                  ? 'bg-sky-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>🌊 Ocean Dive</span>
            </button>
          </div>
        </div>

        {/* TAB 1: 7 CONTINENTS MAP SAFARI WITH REAL PHOTOS */}
        {activeTab === 'continents' && (
          <div className="space-y-6">
            
            {/* Active Continent Showcase */}
            <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${selectedContinent.bgColor} text-white shadow-2xl border-4 border-white flex flex-col md:flex-row items-center justify-between gap-6`}>
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-black/30 shrink-0">
                  <img
                    src={selectedContinent.imageUrl}
                    alt={selectedContinent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-3xl sm:text-4xl font-black">{selectedContinent.name} {selectedContinent.emoji}</h3>
                  <p className="text-base sm:text-lg font-bold text-yellow-100 max-w-xl mt-1">
                    {selectedContinent.funFact}
                  </p>
                  
                  {/* Wildlife in this continent */}
                  <div className="mt-4">
                    <span className="text-xs font-black uppercase text-yellow-200 tracking-wider">
                      Native Animals:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1 justify-center sm:justify-start">
                      {selectedContinent.animals.map((anim, idx) => (
                        <span
                          key={idx}
                          className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-extrabold border border-white/30"
                        >
                          {anim}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/40 text-center shrink-0">
                <span className="text-4xl">{selectedContinent.landmarkEmoji}</span>
                <p className="text-xs font-black text-white mt-1">Famous Landmark</p>
                <p className="text-sm font-bold text-yellow-200">{selectedContinent.landmark}</p>
              </div>
            </div>

            {/* Continent Selector Grid with Real Photos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {CONTINENTS.map((cont) => (
                <button
                  key={cont.id}
                  onClick={() => handleContinentClick(cont)}
                  className={`p-3 sm:p-4 rounded-3xl bg-gradient-to-br ${cont.bgColor} text-white border-4 ${
                    selectedContinent.id === cont.id ? 'border-yellow-300 ring-4 ring-yellow-400 scale-105' : 'border-white'
                  } shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 text-center flex flex-col items-center gap-2 cursor-pointer`}
                >
                  <div className="w-full aspect-video rounded-2xl overflow-hidden border-2 border-white/60 shadow bg-black/20">
                    <img
                      src={cont.imageUrl}
                      alt={cont.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-black text-lg drop-shadow-md">{cont.name} {cont.emoji}</span>
                  <span className="text-xs font-semibold opacity-90">Tap to travel!</span>
                </button>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: WORLD LANDMARKS WITH REAL PHOTOS */}
        {activeTab === 'landmarks' && (
          <div className="space-y-6">
            
            {/* Active Landmark */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-2xl border-4 border-white flex flex-col sm:flex-row items-center gap-6">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-black/30 shrink-0">
                <img
                  src={selectedLandmark.imageUrl}
                  alt={selectedLandmark.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 bg-white/90 text-slate-950 text-xs font-black px-3 py-1 rounded-full mb-2">
                  <span>{selectedLandmark.flag}</span>
                  <span>{selectedLandmark.country}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black">{selectedLandmark.name} {selectedLandmark.emoji}</h3>
                <p className="text-base sm:text-lg font-bold text-yellow-100 max-w-xl mt-2">
                  {selectedLandmark.fact}
                </p>
              </div>
            </div>

            {/* Landmarks Grid with Real Photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WORLD_LANDMARKS.map((lm) => (
                <button
                  key={lm.id}
                  onClick={() => handleLandmarkClick(lm)}
                  className={`p-4 rounded-3xl bg-white/95 border-4 ${
                    selectedLandmark.id === lm.id ? 'border-amber-400 ring-4 ring-amber-300' : 'border-slate-200'
                  } shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-left flex flex-col justify-between cursor-pointer`}
                >
                  <div className="w-full aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 mb-3 relative">
                    <img
                      src={lm.imageUrl}
                      alt={lm.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 text-2xl bg-white/80 rounded-full px-1.5 py-0.5 shadow">
                      {lm.flag}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900">{lm.name} {lm.emoji}</h4>
                    <p className="text-xs font-bold text-amber-800">{lm.country}</p>
                    <p className="text-xs font-semibold text-slate-600 mt-1">{lm.fact}</p>
                  </div>
                </button>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: OCEAN EXPLORER WITH REAL SEA PHOTOGRAPHY */}
        {activeTab === 'ocean' && (
          <div className="bg-gradient-to-b from-sky-400 via-blue-600 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white border-4 border-sky-300 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-7xl animate-bounce mb-2">🤿 🚢</div>
              <h3 className="text-3xl sm:text-4xl font-black text-sky-200">
                Submarine Deep Ocean Adventure!
              </h3>
              <p className="text-sky-100 font-bold text-sm sm:text-base">
                Real photos of creatures swimming in the deep blue sea!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {OCEAN_CREATURES.map((creature) => (
                <button
                  key={creature.id}
                  onClick={() => handleOceanCreatureClick(creature)}
                  className="p-4 rounded-3xl bg-white/15 backdrop-blur-md border-2 border-white/30 hover:border-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 text-left cursor-pointer flex items-center gap-4"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/60 shadow shrink-0">
                    <img
                      src={creature.imageUrl}
                      alt={creature.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-black bg-sky-300 text-slate-950 px-2 py-0.5 rounded-md">
                      {creature.depth}
                    </span>
                    <h4 className="text-xl font-black text-white mt-1">{creature.name} {creature.emoji}</h4>
                    <p className="text-xs font-semibold text-sky-100 mt-1">{creature.soundFact}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
