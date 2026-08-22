import React, { useState } from 'react';
import { INSTRUMENTS, PIANO_KEYS } from '../../data/music';
import { MusicalInstrument } from '../../types/hub';
import { speakHindi } from '../../audio/hindiSpeech';
import { getAudioContext, playMagicSound } from '../../audio/soundEffects';
import { playPopSound, playCheerSound } from '../../audio/animalSounds';
import confetti from 'canvas-confetti';
import { Music, Sparkles } from 'lucide-react';

export const MusicHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'piano' | 'instruments' | 'rhymes'>('piano');
  const [selectedInst, setSelectedInst] = useState<MusicalInstrument>(INSTRUMENTS[0]);
  const [activeKeyIndex, setActiveKeyIndex] = useState<number | null>(null);

  // Play custom frequency note
  const playFrequency = (freq: number) => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    } catch (e) {
      console.error(e);
    }
  };

  // Handle Piano Key Tap
  const handleKeyTap = (key: typeof PIANO_KEYS[0], idx: number) => {
    setActiveKeyIndex(idx);
    playFrequency(key.freq);
    confetti({ particleCount: 15, spread: 35, origin: { y: 0.8 } });

    setTimeout(() => {
      setActiveKeyIndex(null);
    }, 200);
  };

  // Handle Instrument Tap
  const handleInstrumentTap = (inst: MusicalInstrument) => {
    setSelectedInst(inst);
    playFrequency(inst.soundFreq);
    setTimeout(() => {
      playFrequency(inst.soundFreq * 1.25);
    }, 150);
    setTimeout(() => {
      playFrequency(inst.soundFreq * 1.5);
    }, 300);

    speakHindi(`${inst.hindiName}! ${inst.name}! ${inst.funFact}`);
    confetti({ particleCount: 35, spread: 60 });
  };

  // Play Rhyme sequence
  const playTwinkleSong = () => {
    const twinkleNotes = [261.63, 261.63, 392.0, 392.0, 440.0, 440.0, 392.0];
    twinkleNotes.forEach((freq, idx) => {
      setTimeout(() => {
        playFrequency(freq);
      }, idx * 350);
    });

    speakHindi('ट्विंकल ट्विंकल लिटिल स्टार! Twinkle Twinkle Little Star!');
    confetti({ particleCount: 60, spread: 70 });
  };

  return (
    <div className="w-full h-full overflow-y-auto pt-20 pb-24 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl border-3 border-purple-400 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-4xl animate-bounce">🎵</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                संगीत की दुनिया • Music & Piano World 🎹
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                Play Rainbow Piano Keys, Drums, Guitar, Flute & Nursery Melodies!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => { playPopSound(); setActiveTab('piano'); }}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'piano'
                  ? 'bg-purple-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>🎹 Rainbow Piano</span>
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('instruments'); speakHindi('संगीत वाद्ययंत्र!'); }}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'instruments'
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>🥁 Instruments</span>
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('rhymes'); speakHindi('बाल गीत और धुनें!'); }}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'rhymes'
                  ? 'bg-rose-500 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>⭐ Rhyme Tunes</span>
            </button>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE RAINBOW PIANO */}
        {activeTab === 'piano' && (
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border-4 border-purple-400 shadow-2xl text-center text-white">
              <h3 className="text-2xl sm:text-3xl font-black text-purple-300 mb-2">
                🎹 Tap the Rainbow Keys to Play Melodies! 🌈
              </h3>
              <p className="text-slate-300 font-bold text-sm sm:text-base mb-6">
                सा रे ग म प ध नि सा (Do Re Mi Fa So La Ti Do)
              </p>

              {/* Big Responsive Piano Keys */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3 max-w-4xl mx-auto">
                {PIANO_KEYS.map((k, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleKeyTap(k, idx)}
                    className={`h-48 sm:h-64 rounded-2xl ${k.color} border-4 ${
                      activeKeyIndex === idx ? 'border-white scale-95 shadow-inner' : 'border-white/60 shadow-xl'
                    } flex flex-col justify-between items-center py-4 font-black text-white cursor-pointer transition-transform hover:scale-105 active:scale-95`}
                  >
                    <span className="text-xl sm:text-2xl">{k.name}</span>
                    <span className="text-2xl sm:text-3xl font-black drop-shadow-md">
                      {k.note.split('/')[0]}
                    </span>
                    <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full">
                      TAP!
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MUSICAL INSTRUMENTS WITH REAL PHOTOS */}
        {activeTab === 'instruments' && (
          <div className="space-y-6">
            
            {/* Active Instrument Showcase */}
            <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${selectedInst.colorGradient} text-white shadow-2xl border-4 border-white flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn`}>
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-black/30 shrink-0">
                  <img
                    src={selectedInst.imageUrl}
                    alt={selectedInst.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="inline-block bg-white/90 text-slate-950 text-xs font-black px-3 py-1 rounded-full mb-1">
                    Family: {selectedInst.category.toUpperCase()}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black">
                    {selectedInst.hindiName} ({selectedInst.name}) {selectedInst.emoji}
                  </h3>
                  <p className="text-base sm:text-lg font-bold text-yellow-200 max-w-xl mt-2">
                    {selectedInst.funFact}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleInstrumentTap(selectedInst)}
                className="px-6 py-4 rounded-2xl bg-yellow-300 hover:bg-yellow-200 active:scale-95 text-slate-950 font-black text-base shadow-xl border-4 border-white flex items-center gap-2 cursor-pointer shrink-0 transition-transform"
              >
                <Music className="w-6 h-6 text-purple-600 animate-bounce" />
                <span>PLAY SOUND!</span>
              </button>
            </div>

            {/* Instruments Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {INSTRUMENTS.map((inst) => (
                <button
                  key={inst.id}
                  onClick={() => handleInstrumentTap(inst)}
                  className={`p-4 rounded-3xl bg-gradient-to-br ${inst.colorGradient} border-4 ${
                    selectedInst.id === inst.id ? 'border-yellow-300 ring-4 ring-yellow-400 scale-105' : 'border-white'
                  } text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-left flex flex-col justify-between cursor-pointer`}
                >
                  <div className="w-full aspect-video rounded-2xl overflow-hidden mb-3 relative border-2 border-white/40 shadow bg-black/20">
                    <img
                      src={inst.imageUrl}
                      alt={inst.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 text-2xl bg-white/90 rounded-full px-1.5 py-0.5 shadow">
                      {inst.emoji}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-black text-white drop-shadow-md">{inst.name}</h4>
                    <p className="text-xs font-bold text-yellow-200">{inst.hindiName}</p>
                  </div>
                </button>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: NURSERY RHYME TUNES */}
        {activeTab === 'rhymes' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-rose-300 shadow-2xl text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              ⭐ Sing & Play Famous Rhyme Melodies! ⭐
            </h3>
            <p className="text-slate-600 font-bold text-sm sm:text-base mb-6">
              Tap the buttons to listen to interactive musical scales!
            </p>

            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={playTwinkleSong}
                className="p-5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-xl shadow-xl border-4 border-white flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
              >
                <span className="text-3xl">⭐</span>
                <span>Twinkle Twinkle Little Star (ट्विंकल ट्विंकल)</span>
                <Sparkles className="w-6 h-6 text-orange-600" />
              </button>

              <button
                onClick={() => {
                  [392, 392, 392, 329, 349, 392].forEach((f, i) => setTimeout(() => playFrequency(f), i * 280));
                  speakHindi('Wheels on the Bus go round and round!');
                  confetti({ particleCount: 40 });
                }}
                className="p-5 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 text-white font-black text-xl shadow-xl border-4 border-white flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
              >
                <span className="text-3xl">🚌</span>
                <span>The Wheels on the Bus Go Round!</span>
                <Music className="w-6 h-6 text-yellow-300" />
              </button>

              <button
                onClick={() => {
                  [261, 329, 392, 523].forEach((f, i) => setTimeout(() => playFrequency(f), i * 250));
                  playCheerSound();
                  speakHindi('Old MacDonald Had a Farm! E-I-E-I-O!');
                  confetti({ particleCount: 50 });
                }}
                className="p-5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-black text-xl shadow-xl border-4 border-white flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
              >
                <span className="text-3xl">🚜</span>
                <span>Old MacDonald Had a Farm</span>
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
