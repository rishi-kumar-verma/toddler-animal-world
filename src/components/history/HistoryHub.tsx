import React, { useState } from 'react';
import { HISTORY_ERAS, INVENTIONS } from '../../data/history';
import { HistoryEra, Invention } from '../../types/hub';
import { speakText, playCheerSound, playPopSound } from '../../audio/animalSounds';
import { playMagicSound, playRocketLaunch, playDinoRoar } from '../../audio/soundEffects';
import confetti from 'canvas-confetti';
import { Sparkles, Clock, Lightbulb } from 'lucide-react';

export const HistoryHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'eras' | 'inventions'>('eras');
  const [selectedEra, setSelectedEra] = useState<HistoryEra>(HISTORY_ERAS[1]); // Default Egypt
  const [selectedInvention, setSelectedInvention] = useState<Invention>(INVENTIONS[0]);

  const handleEraClick = (era: HistoryEra) => {
    setSelectedEra(era);
    if (era.id === 'dinosaurs') {
      playDinoRoar();
    } else if (era.id === 'space_age') {
      playRocketLaunch();
    } else {
      playMagicSound();
    }
    speakText(`Time traveling to ${era.title}! ${era.timePeriod}! ${era.story}`);
  };

  const handleInventionClick = (inv: Invention) => {
    setSelectedInvention(inv);
    playCheerSound();
    speakText(`${inv.name}, invented in ${inv.year} by ${inv.inventorOrEra}! ${inv.whyAwesome}`);
    confetti({ particleCount: 40, spread: 60 });
  };

  return (
    <div className="w-full h-full overflow-y-auto pt-20 pb-24 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-3xl border-3 border-amber-400 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-4xl animate-bounce">⏳</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                History Time Machine
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                Real Historical Photos of Ancient Egypt, Knights, Inventions & Space!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => { playPopSound(); setActiveTab('eras'); speakText('Choose a time period in the Time Machine!'); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'eras'
                  ? 'bg-amber-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Time Epochs</span>
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('inventions'); speakText('Discover great world inventions!'); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'inventions'
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>Inventions</span>
            </button>
          </div>
        </div>

        {/* TAB 1: TIME MACHINE ERAS WITH REAL PHOTOS */}
        {activeTab === 'eras' && (
          <div className="space-y-6">
            
            {/* Active Era Portal Showcase */}
            <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${selectedEra.color} text-white shadow-2xl border-4 border-white flex flex-col md:flex-row items-center justify-between gap-6`}>
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-black/30 shrink-0">
                  <img
                    src={selectedEra.imageUrl}
                    alt={selectedEra.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="inline-block bg-white/90 text-slate-950 text-xs font-black px-3 py-1 rounded-full mb-2">
                    ⏳ {selectedEra.timePeriod}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black">{selectedEra.title} {selectedEra.emoji}</h3>
                  <p className="text-base sm:text-lg font-bold text-yellow-100 max-w-xl mt-2">
                    {selectedEra.story}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
                    {selectedEra.highlights.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-black/20 text-white text-xs font-black px-3 py-1 rounded-xl border border-white/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Eras Selector Timeline with Real Photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              {HISTORY_ERAS.map((era) => (
                <button
                  key={era.id}
                  onClick={() => handleEraClick(era)}
                  className={`p-3.5 sm:p-4 rounded-3xl bg-gradient-to-br ${era.color} text-white border-4 ${
                    selectedEra.id === era.id ? 'border-yellow-300 ring-4 ring-yellow-400 scale-105' : 'border-white'
                  } shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 text-center flex flex-col items-center justify-between gap-2 cursor-pointer`}
                >
                  <div className="w-full aspect-video rounded-2xl overflow-hidden border-2 border-white/60 shadow bg-black/20">
                    <img
                      src={era.imageUrl}
                      alt={era.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-black text-base drop-shadow-md">{era.title} {era.emoji}</h4>
                    <span className="text-xs font-bold text-yellow-200">{era.timePeriod}</span>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-lg">Time Travel!</span>
                </button>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: GREAT INVENTIONS WITH REAL PHOTOS */}
        {activeTab === 'inventions' && (
          <div className="space-y-6">
            
            {/* Active Invention */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white shadow-2xl border-4 border-white flex flex-col sm:flex-row items-center gap-6">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-black/30 shrink-0">
                <img
                  src={selectedInvention.imageUrl}
                  alt={selectedInvention.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 bg-white/90 text-slate-950 text-xs font-black px-3 py-1 rounded-full mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Invented in {selectedInvention.year} by {selectedInvention.inventorOrEra}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black">{selectedInvention.name} {selectedInvention.emoji}</h3>
                <p className="text-base sm:text-lg font-bold text-yellow-100 max-w-xl mt-2">
                  {selectedInvention.whyAwesome}
                </p>
              </div>
            </div>

            {/* Inventions Grid with Real Photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {INVENTIONS.map((inv) => (
                <button
                  key={inv.id}
                  onClick={() => handleInventionClick(inv)}
                  className={`p-4 rounded-3xl bg-white/95 border-4 ${
                    selectedInvention.id === inv.id ? 'border-amber-400 ring-4 ring-amber-300 scale-105' : 'border-slate-200'
                  } shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-left flex flex-col justify-between cursor-pointer`}
                >
                  <div className="w-full aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 mb-3 relative">
                    <img
                      src={inv.imageUrl}
                      alt={inv.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 text-xs font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg shadow">
                      {inv.year}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900">{inv.name} {inv.emoji}</h4>
                    <p className="text-xs font-bold text-amber-700">{inv.inventorOrEra}</p>
                    <p className="text-xs font-semibold text-slate-600 mt-1">{inv.whyAwesome}</p>
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
