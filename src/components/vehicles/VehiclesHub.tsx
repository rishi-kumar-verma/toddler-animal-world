import React, { useState } from 'react';
import { VEHICLES } from '../../data/vehicles';
import { Vehicle } from '../../types/hub';
import { speakHindi } from '../../audio/hindiSpeech';
import { playPopSound, playCheerSound } from '../../audio/animalSounds';
import { playRocketLaunch, getAudioContext } from '../../audio/soundEffects';
import confetti from 'canvas-confetti';
import { Sparkles, Navigation } from 'lucide-react';

export const VehiclesHub: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(VEHICLES[0]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'rescue' | 'land' | 'air'>('all');

  const filteredVehicles = VEHICLES.filter((v) => {
    if (activeCategory === 'rescue') return v.category === 'rescue';
    if (activeCategory === 'land') return v.category === 'land';
    if (activeCategory === 'air') return v.category === 'air' || v.category === 'space';
    return true;
  });

  // Synthesize custom vehicle sound
  const playVehicleSound = (v: Vehicle) => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      if (v.soundType === 'siren') {
        // High-low siren
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(950, now + 0.25);
        osc.frequency.linearRampToValueAtTime(600, now + 0.5);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (v.soundType === 'train') {
        // Train Choo-Choo
        [0, 0.25].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(320, now + offset);
          osc.frequency.linearRampToValueAtTime(450, now + offset + 0.15);
          gain.gain.setValueAtTime(0.35, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.2);
        });
      } else if (v.soundType === 'jet') {
        playRocketLaunch();
      } else if (v.soundType === 'horn') {
        // Car Horn Beep-Beep
        [0, 0.18].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(440, now + offset);
          gain.gain.setValueAtTime(0.4, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.12);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.12);
        });
      } else {
        // Engine vroom
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.linearRampToValueAtTime(220, now + 0.4);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleVehicleTap = (v: Vehicle) => {
    setSelectedVehicle(v);
    playVehicleSound(v);
    speakHindi(`${v.hindiName}! ${v.name}! ${v.funFact}`);
    confetti({ particleCount: 35, spread: 60 });
  };

  return (
    <div className="w-full h-full overflow-y-auto pt-20 pb-24 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl border-3 border-amber-400 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-4xl animate-bounce">🚗</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                वाहन संसार • Vehicles & Transport World 🚒
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                Real Photos & Sounds of Fire Trucks, Trains, Airplanes & Rockets!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => { playPopSound(); setActiveCategory('all'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeCategory === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🌟 All Vehicles
            </button>

            <button
              onClick={() => { playPopSound(); setActiveCategory('rescue'); speakHindi('बचाव वाहन!'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeCategory === 'rescue'
                  ? 'bg-red-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🚒 Rescue & Safety
            </button>

            <button
              onClick={() => { playPopSound(); setActiveCategory('land'); speakHindi('सड़क और रेल वाहन!'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeCategory === 'land'
                  ? 'bg-emerald-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🚂 Land & Tracks
            </button>

            <button
              onClick={() => { playPopSound(); setActiveCategory('air'); speakHindi('आसमान और अंतरिक्ष के वाहन!'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeCategory === 'air'
                  ? 'bg-sky-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              ✈️ Sky & Space
            </button>
          </div>
        </div>

        {/* Active Vehicle Showcase Banner */}
        <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${selectedVehicle.colorGradient} text-white shadow-2xl border-4 border-white flex flex-col md:flex-row items-center justify-between gap-6 mb-6 animate-fadeIn`}>
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-black/30 shrink-0">
              <img
                src={selectedVehicle.imageUrl}
                alt={selectedVehicle.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="inline-block bg-white/90 text-slate-950 text-xs font-black px-3 py-1 rounded-full mb-1">
                Category: {selectedVehicle.category.toUpperCase()}
              </div>
              <h3 className="text-3xl sm:text-4xl font-black">
                {selectedVehicle.hindiName} ({selectedVehicle.name}) {selectedVehicle.emoji}
              </h3>
              <p className="text-base sm:text-lg font-bold text-yellow-200 max-w-xl mt-1">
                {selectedVehicle.funFact}
              </p>
            </div>
          </div>

          <button
            onClick={() => handleVehicleTap(selectedVehicle)}
            className="px-6 py-4 rounded-2xl bg-yellow-300 hover:bg-yellow-200 active:scale-95 text-slate-950 font-black text-base shadow-xl border-4 border-white flex items-center gap-2 cursor-pointer shrink-0 transition-transform"
          >
            <Navigation className="w-6 h-6 text-red-600 animate-spin" />
            <span>HONK & ZOOM (बीप बीप)!</span>
          </button>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredVehicles.map((v) => (
            <button
              key={v.id}
              onClick={() => handleVehicleTap(v)}
              className={`p-4 rounded-3xl bg-gradient-to-br ${v.colorGradient} border-4 ${
                selectedVehicle.id === v.id ? 'border-yellow-300 ring-4 ring-yellow-400 scale-105' : 'border-white'
              } text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-left flex flex-col justify-between cursor-pointer`}
            >
              <div className="w-full aspect-video rounded-2xl overflow-hidden mb-3 relative border-2 border-white/40 shadow bg-black/20">
                <img
                  src={v.imageUrl}
                  alt={v.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 text-2xl bg-white/90 rounded-full px-1.5 py-0.5 shadow">
                  {v.emoji}
                </span>
              </div>

              <div>
                <h4 className="text-xl font-black text-white drop-shadow-md">{v.name}</h4>
                <p className="text-xs font-bold text-yellow-200">{v.hindiName}</p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
