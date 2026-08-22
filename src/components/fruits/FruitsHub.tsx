import React, { useState } from 'react';
import { FRUITS_VEGGIES } from '../../data/fruits';
import { FruitVeggie } from '../../types/hub';
import { speakHindi } from '../../audio/hindiSpeech';
import { playPopSound, playCheerSound } from '../../audio/animalSounds';
import confetti from 'canvas-confetti';
import { Sparkles, Utensils, RotateCcw } from 'lucide-react';

export const FruitsHub: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<FruitVeggie>(FRUITS_VEGGIES[0]);
  const [activeTab, setActiveTab] = useState<'all' | 'fruits' | 'veggies' | 'smoothie'>('all');
  const [smoothieFruits, setSmoothieFruits] = useState<FruitVeggie[]>([]);

  const filteredItems = FRUITS_VEGGIES.filter((item) => {
    if (activeTab === 'fruits') return item.type === 'fruit';
    if (activeTab === 'veggies') return item.type === 'veggie';
    return true;
  });

  const handleItemTap = (item: FruitVeggie) => {
    setSelectedItem(item);
    playPopSound();
    speakHindi(`${item.hindiName}! ${item.name}! ${item.taste}! ${item.benefit}`);
    confetti({ particleCount: 30, spread: 50 });
  };

  const addToSmoothie = (item: FruitVeggie) => {
    if (smoothieFruits.length >= 6) return;
    setSmoothieFruits((prev) => [...prev, item]);
    playPopSound();
    speakHindi(`${item.hindiName} स्मूदी में डाला!`);
    confetti({ particleCount: 20, spread: 40 });
  };

  const blendSmoothie = () => {
    if (smoothieFruits.length === 0) return;
    playCheerSound();
    confetti({ particleCount: 80, spread: 80 });
    speakHindi('मजेदार हेल्दी रेनबो स्मूदी तैयार है! Yum Yum Delicious Smoothie!');
  };

  return (
    <div className="w-full h-full overflow-y-auto pt-20 pb-24 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl border-3 border-emerald-400 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-4xl animate-bounce">🍎</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                फल और सब्जियां • Fruits & Veggies World 🥦
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                Real Photos of Delicious Fruits, Crunchy Veggies & Smoothie Maker!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => { playPopSound(); setActiveTab('all'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'all'
                  ? 'bg-emerald-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🌟 All Items
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('fruits'); speakHindi('मीठे फल!'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'fruits'
                  ? 'bg-rose-500 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🍎 Fruits (फल)
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('veggies'); speakHindi('ताज़ी सब्जियां!'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'veggies'
                  ? 'bg-teal-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🥦 Veggies (सब्जियां)
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('smoothie'); speakHindi('रेनबो स्मूदी बनाओ!'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'smoothie'
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🥤 Smoothie Blender
            </button>
          </div>
        </div>

        {/* TAB 1, 2, 3: FRUITS & VEGGIES GRID */}
        {activeTab !== 'smoothie' && (
          <div className="space-y-6">
            
            {/* Active Highlight Banner */}
            <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${selectedItem.colorGradient} text-white shadow-2xl border-4 border-white flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn`}>
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-black/30 shrink-0">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="inline-block bg-white/90 text-slate-950 text-xs font-black px-3 py-1 rounded-full mb-1">
                    {selectedItem.colorName} • {selectedItem.taste}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black">
                    {selectedItem.hindiName} ({selectedItem.name}) {selectedItem.emoji}
                  </h3>
                  <p className="text-base sm:text-lg font-bold text-yellow-200 max-w-xl mt-1">
                    {selectedItem.benefit}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleItemTap(selectedItem)}
                className="px-6 py-4 rounded-2xl bg-white text-slate-950 font-black text-base shadow-xl hover:bg-yellow-300 transition-transform active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
              >
                <Sparkles className="w-5 h-5 text-emerald-600 animate-spin" />
                <span>सुनो (LISTEN)</span>
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemTap(item)}
                  className={`p-4 rounded-3xl bg-gradient-to-br ${item.colorGradient} border-4 ${
                    selectedItem.id === item.id ? 'border-yellow-300 ring-4 ring-yellow-400 scale-105' : 'border-white'
                  } text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-left flex flex-col justify-between cursor-pointer`}
                >
                  <div className="w-full aspect-video rounded-2xl overflow-hidden mb-3 relative border-2 border-white/40 shadow bg-black/20">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 text-2xl bg-white/90 rounded-full px-1.5 py-0.5 shadow">
                      {item.emoji}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-black text-white drop-shadow-md">{item.name}</h4>
                    <p className="text-xs font-bold text-yellow-200">{item.hindiName}</p>
                    <p className="text-xs font-semibold opacity-90 mt-0.5">{item.taste}</p>
                  </div>
                </button>
              ))}
            </div>

          </div>
        )}

        {/* TAB 4: SMOOTHIE BLENDER GAME */}
        {activeTab === 'smoothie' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-2xl text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full">
                Smoothie Ingredients: {smoothieFruits.length} / 6
              </span>
              <button
                onClick={() => { setSmoothieFruits([]); playPopSound(); }}
                className="text-xs font-black bg-slate-100 text-slate-800 px-3 py-1.5 rounded-xl border border-slate-300 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Blender</span>
              </button>
            </div>

            {/* Blender Glass Visual */}
            <div className="my-6 bg-gradient-to-b from-rose-100 via-amber-50 to-emerald-100 p-8 rounded-3xl border-4 border-amber-400 shadow-inner flex flex-col items-center">
              <span className="text-6xl mb-2">🥤</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                रेनबो स्मूदी ब्लेंडर (Rainbow Smoothie Maker)! 🌈
              </h3>
              <p className="text-slate-600 font-bold text-sm mb-4">
                Tap fruits below to drop them into your healthy smoothie glass!
              </p>

              <div className="flex flex-wrap justify-center gap-3 min-h-16 bg-white/80 p-4 rounded-2xl border-2 border-dashed border-amber-300 w-full max-w-md">
                {smoothieFruits.map((f, i) => (
                  <span key={i} className="text-4xl animate-bounce">
                    {f.emoji}
                  </span>
                ))}
                {smoothieFruits.length === 0 && (
                  <span className="text-slate-400 font-bold text-sm self-center">
                    Tap fruits below to add to the glass...
                  </span>
                )}
              </div>

              {smoothieFruits.length > 0 && (
                <button
                  onClick={blendSmoothie}
                  className="mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-xl shadow-xl border-4 border-white cursor-pointer active:scale-95 transition-transform"
                >
                  🥤 BLEND MY DELICIOUS SMOOTHIE! ✨
                </button>
              )}
            </div>

            {/* Fruit Selector to Drop in Blender */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {FRUITS_VEGGIES.filter((i) => i.type === 'fruit').map((item) => (
                <button
                  key={item.id}
                  onClick={() => addToSmoothie(item)}
                  className={`p-3 rounded-2xl bg-gradient-to-br ${item.colorGradient} text-white font-black shadow hover:scale-105 active:scale-95 flex flex-col items-center gap-1 cursor-pointer`}
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <span className="text-xs">{item.name}</span>
                </button>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
