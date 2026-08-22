import React, { useState } from 'react';
import { SUPERHEROES } from '../../data/superheroes';
import { Superhero } from '../../types/hub';
import { speakText, playCheerSound, playPopSound } from '../../audio/animalSounds';
import {
  playLaserSound,
  playThunderSound,
  playSmashSound,
  playWebSound,
  playShieldSound,
  playMagicSound,
  playClawSound,
  playArrowSound,
  playShrinkSound,
  playGauntletSound,
  playJetpackSound,
  playHexSound,
} from '../../audio/soundEffects';
import confetti from 'canvas-confetti';
import { Zap, Volume2, HelpCircle, Flame, Sparkles } from 'lucide-react';

export const SuperheroesHub: React.FC = () => {
  const [activeHero, setActiveHero] = useState<Superhero | null>(SUPERHEROES[0]);
  const [activeTab, setActiveTab] = useState<'soundboard' | 'quiz' | 'powers'>('soundboard');
  const [activeEffect, setActiveEffect] = useState<string | null>(null);
  const [heroFilter, setHeroFilter] = useState<'all' | 'avengers' | 'cosmic'>('all');

  // Filtered Heroes
  const filteredHeroes = SUPERHEROES.filter(hero => {
    if (heroFilter === 'avengers') {
      return ['ironman', 'captainamerica', 'thor', 'hulk', 'blackwidow', 'hawkeye', 'spiderman', 'scarletwitch', 'vision', 'falcon', 'antman'].includes(hero.id);
    }
    if (heroFilter === 'cosmic') {
      return ['groot', 'starlord', 'rocket', 'captainmarvel', 'thanos', 'loki', 'doctorstrange'].includes(hero.id);
    }
    return true;
  });

  // Quiz State
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const triggerHeroSound = (hero: Superhero) => {
    setActiveHero(hero);
    setActiveEffect(hero.soundType);

    // Play synthesized action sound
    switch (hero.soundType) {
      case 'laser':
        playLaserSound();
        break;
      case 'thunder':
        playThunderSound();
        break;
      case 'smash':
        playSmashSound();
        break;
      case 'web':
        playWebSound();
        break;
      case 'shield':
        playShieldSound();
        break;
      case 'magic':
        playMagicSound();
        break;
      case 'claw':
        playClawSound();
        break;
      case 'arrow':
        playArrowSound();
        break;
      case 'shrink':
        playShrinkSound();
        break;
      case 'gauntlet':
        playGauntletSound();
        break;
      case 'jetpack':
        playJetpackSound();
        break;
      case 'hex':
        playHexSound();
        break;
      case 'groot':
        playCheerSound();
        break;
      default:
        playLaserSound();
    }

    // Speak hero quote & power
    setTimeout(() => {
      speakText(`${hero.name}! ${hero.quote}`);
    }, 220);

    // Confetti burst for hero activation
    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.7 }
    });

    // Reset visual effect after 1.2s
    setTimeout(() => {
      setActiveEffect(null);
    }, 1200);
  };

  // Quiz helper
  const currentQuizHero = SUPERHEROES[quizQuestionIndex % SUPERHEROES.length];
  const wrongOptions = SUPERHEROES.filter(h => h.id !== currentQuizHero.id).slice(0, 2);
  const quizChoices = [currentQuizHero, ...wrongOptions].sort(() => 0.5 - Math.random());

  const handleQuizAnswer = (hero: Superhero) => {
    if (hero.id === currentQuizHero.id) {
      playCheerSound();
      setQuizFeedback('correct');
      setQuizScore(prev => prev + 1);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      speakText(`Awesome! That is ${currentQuizHero.name}!`);

      setTimeout(() => {
        setQuizFeedback(null);
        setQuizQuestionIndex(prev => prev + 1);
      }, 1800);
    } else {
      playPopSound();
      setQuizFeedback('wrong');
      speakText(`Try again! Find who has the power: ${currentQuizHero.power}`);
      setTimeout(() => setQuizFeedback(null), 1200);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto pt-20 pb-24 px-3 sm:px-6">
      
      {/* Screen Shake effect for Smash */}
      {activeEffect === 'smash' && (
        <div className="fixed inset-0 pointer-events-none z-50 bg-emerald-500/20 animate-ping" />
      )}

      {/* Thunder Flash */}
      {activeEffect === 'thunder' && (
        <div className="fixed inset-0 pointer-events-none z-50 bg-sky-200/40 animate-pulse" />
      )}

      {/* Laser Red Beam */}
      {activeEffect === 'laser' && (
        <div className="fixed inset-0 pointer-events-none z-50 bg-red-500/20" />
      )}

      <div className="max-w-6xl mx-auto">
        
        {/* Header Navigation for Superhero Modes */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl border-3 border-red-300 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-4xl animate-bounce">🦸‍♂️</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Marvel Cinematic Heroes ({SUPERHEROES.length} Heroes)
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                Real Movie Portraits, Action Sounds, Superpowers & Quotes!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => { playPopSound(); setActiveTab('soundboard'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'soundboard'
                  ? 'bg-red-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Hero Board</span>
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('quiz'); speakText(`Who has this superpower: ${currentQuizHero.power}?`); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'quiz'
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Hero Quiz</span>
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('powers'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'powers'
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Power Blaster</span>
            </button>
          </div>
        </div>

        {/* TAB 1: HERO SOUNDBOARD WITH REAL MOVIE IMAGES */}
        {activeTab === 'soundboard' && (
          <>
            {/* Filter Sub-Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
              <button
                onClick={() => { playPopSound(); setHeroFilter('all'); }}
                className={`px-4 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                  heroFilter === 'all'
                    ? 'bg-red-600 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                🌟 All {SUPERHEROES.length} Characters
              </button>

              <button
                onClick={() => { playPopSound(); setHeroFilter('avengers'); }}
                className={`px-4 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                  heroFilter === 'avengers'
                    ? 'bg-blue-600 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                🛡️ Avengers Team
              </button>

              <button
                onClick={() => { playPopSound(); setHeroFilter('cosmic'); }}
                className={`px-4 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                  heroFilter === 'cosmic'
                    ? 'bg-purple-600 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                🌌 Guardians & Cosmic
              </button>
            </div>

            {/* Active Highlight Banner */}
            {activeHero && (
              <div className={`mb-6 p-4 sm:p-6 rounded-3xl bg-gradient-to-r ${activeHero.colorGradient} text-white shadow-2xl border-4 border-white flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn`}>
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-yellow-300 shadow-2xl bg-black/30 shrink-0 relative group">
                    <img
                      src={activeHero.imageUrl}
                      alt={activeHero.name}
                      className="w-full h-full object-cover object-top transform scale-105"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-yellow-300 text-slate-950 text-xs font-black px-3 py-1 rounded-full mb-1">
                      <span>{activeHero.symbol}</span>
                      <span>{activeHero.alias}</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black">{activeHero.name}</h3>
                    <p className="font-black text-sm sm:text-base text-yellow-200 mt-0.5">
                      ⚡ Power: {activeHero.power}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-white/95 italic mt-1 bg-black/20 px-3 py-1.5 rounded-xl inline-block">
                      "{activeHero.quote}"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => triggerHeroSound(activeHero)}
                  className="px-6 py-4 rounded-2xl bg-yellow-300 hover:bg-yellow-200 active:scale-95 text-slate-950 font-black text-base shadow-xl border-4 border-white flex items-center gap-2 cursor-pointer shrink-0 transition-transform"
                >
                  <Volume2 className="w-6 h-6 text-red-600 animate-pulse" />
                  <span>PLAY MOVE: {activeHero.actionMove}</span>
                </button>
              </div>
            )}

            {/* Grid of Superheroes with Real Photos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {filteredHeroes.map((hero) => (
                <button
                  key={hero.id}
                  onClick={() => triggerHeroSound(hero)}
                  className={`group relative overflow-hidden rounded-3xl p-3 sm:p-4 bg-gradient-to-br ${hero.colorGradient} border-4 ${
                    activeHero?.id === hero.id ? 'border-yellow-300 ring-4 ring-yellow-400 scale-102' : hero.borderColor
                  } shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 active:scale-95 text-left flex flex-col justify-between cursor-pointer`}
                >
                  {/* Hero Photo & Symbol Badge */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3 border-2 border-white/40 shadow-inner bg-black/20">
                    <img
                      src={hero.imageUrl}
                      alt={hero.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-white/95 text-slate-950 text-xs font-black px-2.5 py-1 rounded-full shadow-md">
                      {hero.symbol}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
                      {hero.name}
                    </h4>
                    <p className="text-xs font-bold text-yellow-200 mt-0.5 line-clamp-1">
                      {hero.power}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between text-white/95 text-xs font-black">
                    <span>TAP FOR POWER!</span>
                    <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* TAB 2: SUPERHERO POWER QUIZ WITH REAL PHOTOS */}
        {activeTab === 'quiz' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-2xl text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full">
                Question {quizQuestionIndex + 1}
              </span>
              <span className="text-sm font-black bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full flex items-center gap-1">
                ⭐ Stars: {quizScore}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">
              Who has this Superpower?
            </h3>

            <div className="bg-indigo-50 border-2 border-indigo-200 p-5 rounded-2xl mb-6 shadow-inner">
              <p className="text-2xl sm:text-3xl font-black text-indigo-950">
                "{currentQuizHero.power}"
              </p>
            </div>

            {/* Answer Options with Real Photos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quizChoices.map((hero) => (
                <button
                  key={hero.id}
                  onClick={() => handleQuizAnswer(hero)}
                  className={`p-4 rounded-3xl bg-gradient-to-br ${hero.colorGradient} border-4 ${hero.borderColor} text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center gap-3 cursor-pointer`}
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-black/20">
                    <img
                      src={hero.imageUrl}
                      alt={hero.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span className="font-black text-lg sm:text-xl drop-shadow-md">{hero.name}</span>
                </button>
              ))}
            </div>

            {/* Feedback Alert */}
            {quizFeedback === 'correct' && (
              <div className="mt-5 p-3.5 rounded-2xl bg-emerald-500 text-white font-black text-lg animate-bounce shadow-md">
                🎉 Correct! Super Hero Power Activated! ⭐
              </div>
            )}
            {quizFeedback === 'wrong' && (
              <div className="mt-5 p-3.5 rounded-2xl bg-rose-500 text-white font-black text-lg animate-pulse shadow-md">
                ❌ Oops! Try another superhero!
              </div>
            )}
          </div>
        )}

        {/* TAB 3: POWER BLASTER PLAYGROUND */}
        {activeTab === 'powers' && (
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-2xl text-center">
            <h3 className="text-2xl sm:text-3xl font-black text-amber-300 mb-2">
              ⚡ Superpower Blast Arena 💥
            </h3>
            <p className="text-slate-300 font-bold text-sm sm:text-base mb-6">
              Press the big power buttons to blast cosmic sound effects!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <button
                onClick={() => { playLaserSound(); speakText('Laser Repulsor Beam!'); confetti({ particleCount: 30 }); }}
                className="p-5 rounded-3xl bg-gradient-to-br from-red-600 to-amber-500 border-4 border-yellow-300 font-black text-lg shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex flex-col items-center gap-2"
              >
                <span className="text-4xl">🦾</span>
                <span>Laser Blast!</span>
              </button>

              <button
                onClick={() => { playThunderSound(); speakText('Thunder Lightning Hammer!'); confetti({ particleCount: 30 }); }}
                className="p-5 rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-700 border-4 border-sky-300 font-black text-lg shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex flex-col items-center gap-2"
              >
                <span className="text-4xl">⚡</span>
                <span>Thunder Strike!</span>
              </button>

              <button
                onClick={() => { playSmashSound(); speakText('Hulk Ground Smash!'); confetti({ particleCount: 30 }); }}
                className="p-5 rounded-3xl bg-gradient-to-br from-emerald-600 to-green-700 border-4 border-emerald-300 font-black text-lg shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex flex-col items-center gap-2"
              >
                <span className="text-4xl">🥊</span>
                <span>Earth Smash!</span>
              </button>

              <button
                onClick={() => { playWebSound(); speakText('Web Blast Thwip!'); confetti({ particleCount: 30 }); }}
                className="p-5 rounded-3xl bg-gradient-to-br from-rose-600 to-blue-600 border-4 border-rose-300 font-black text-lg shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex flex-col items-center gap-2"
              >
                <span className="text-4xl">🕸️</span>
                <span>Web Thwip!</span>
              </button>

              <button
                onClick={() => { playClawSound(); speakText('Adamantium Claw Snikt!'); confetti({ particleCount: 30 }); }}
                className="p-5 rounded-3xl bg-gradient-to-br from-yellow-500 to-amber-700 border-4 border-yellow-300 font-black text-lg shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex flex-col items-center gap-2"
              >
                <span className="text-4xl">⚔️</span>
                <span>Claw Slash!</span>
              </button>

              <button
                onClick={() => { playGauntletSound(); speakText('Infinity Gauntlet Power Snap!'); confetti({ particleCount: 50 }); }}
                className="p-5 rounded-3xl bg-gradient-to-br from-purple-800 to-yellow-600 border-4 border-amber-300 font-black text-lg shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex flex-col items-center gap-2"
              >
                <span className="text-4xl">💎</span>
                <span>Infinity Gauntlet!</span>
              </button>

              <button
                onClick={() => { playShrinkSound(); speakText('Quantum Shrink and Giant Growth!'); confetti({ particleCount: 30 }); }}
                className="p-5 rounded-3xl bg-gradient-to-br from-red-600 to-slate-800 border-4 border-red-400 font-black text-lg shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex flex-col items-center gap-2"
              >
                <span className="text-4xl">🐜</span>
                <span>Quantum Shrink!</span>
              </button>

              <button
                onClick={() => { playHexSound(); speakText('Crimson Chaos Magic Hex!'); confetti({ particleCount: 30 }); }}
                className="p-5 rounded-3xl bg-gradient-to-br from-rose-700 to-purple-900 border-4 border-rose-400 font-black text-lg shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex flex-col items-center gap-2"
              >
                <span className="text-4xl">🔮</span>
                <span>Chaos Hex!</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
