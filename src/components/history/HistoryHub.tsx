import React, { useState } from 'react';
import { HISTORY_ERAS, INVENTIONS, HISTORICAL_FIGURES } from '../../data/history';
import { HistoryEra, Invention, HistoricalFigure } from '../../types/hub';
import { speakHindi } from '../../audio/hindiSpeech';
import { playPopSound, playCheerSound } from '../../audio/animalSounds';
import { playRocketLaunch, playMagicSound, playDinoRoar, playShieldSound, getAudioContext } from '../../audio/soundEffects';
import confetti from 'canvas-confetti';
import { Sparkles, Clock, Lightbulb, Crown, Trophy, Volume2 } from 'lucide-react';

export const HistoryHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'eras' | 'inventions' | 'figures' | 'quiz'>('eras');
  const [selectedEra, setSelectedEra] = useState<HistoryEra>(HISTORY_ERAS[2]); // Default Egypt
  const [selectedInvention, setSelectedInvention] = useState<Invention>(INVENTIONS[0]);
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure>(HISTORICAL_FIGURES[1]); // Default Ashoka
  const [isWarping, setIsWarping] = useState(false);

  // Inventions Filter
  const [invFilter, setInvFilter] = useState<'all' | 'transport' | 'communication' | 'science'>('all');
  const filteredInventions = INVENTIONS.filter((inv) => {
    if (invFilter === 'transport') return inv.impactCategory === 'transport';
    if (invFilter === 'communication') return inv.impactCategory === 'communication';
    if (invFilter === 'science') return inv.impactCategory === 'science' || inv.impactCategory === 'daily';
    return true;
  });

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const QUIZ_QUESTIONS = [
    {
      question: 'चंद्रमा पर कदम रखने वाले पहले इंसान कौन थे?',
      correct: 'Neil Armstrong 🧑‍🚀',
      options: ['Neil Armstrong 🧑‍🚀', 'Alexander Graham Bell ☎️', 'Leonardo da Vinci 🎨'],
      speech: 'Neil Armstrong in 1969 on Apollo 11!'
    },
    {
      question: 'प्राचीन पिरामिड (Great Pyramids) किस देश में बने हैं?',
      correct: 'Ancient Egypt 🏛️',
      options: ['Ancient Rome 🏟️', 'Ancient Egypt 🏛️', 'Ancient Greece 🌿'],
      speech: 'The Great Pyramids were built in Ancient Egypt near the Nile river!'
    },
    {
      question: 'बिजली के बल्ब (Electric Lightbulb) का आविष्कार किसने किया?',
      correct: 'Thomas Edison 💡',
      options: ['Thomas Edison 💡', 'Wright Brothers ✈️', 'Galileo 🔭'],
      speech: 'Thomas Edison invented the long-lasting incandescent lightbulb!'
    },
    {
      question: 'प्रसिद्ध नालंदा विश्वविद्यालय (Nalanda University) किस देश में स्थित था?',
      correct: 'Ancient India 🛕',
      options: ['Ancient India 🛕', 'Ancient Rome 🏟️', 'Ancient Greece 🏛️'],
      speech: 'Nalanda was the world famous center of learning in India!'
    },
    {
      question: 'हवाई जहाज़ (Flying Airplane) का पहला सफल आविष्कार किसने किया?',
      correct: 'Wright Brothers ✈️',
      options: ['Wright Brothers ✈️', 'Johannes Gutenberg 📚', 'James Watt 🚂'],
      speech: 'The Wright Brothers flew the first airplane at Kitty Hawk!'
    },
    {
      question: 'प्रसिद्ध पेंटिंग "मोना लिसा" (Mona Lisa) किसने बनाई?',
      correct: 'Leonardo da Vinci 🎨',
      options: ['Leonardo da Vinci 🎨', 'King Tutankhamun 👑', 'Marie Curie 🔬'],
      speech: 'Leonardo da Vinci, the ultimate Renaissance genius!'
    }
  ];

  const currentQuiz = QUIZ_QUESTIONS[quizIndex % QUIZ_QUESTIONS.length];

  // Play Era Audio Sound Effect
  const playEraSound = (era: HistoryEra) => {
    try {
      if (era.soundType === 'dino') {
        playDinoRoar();
      } else if (era.soundType === 'rocket') {
        playRocketLaunch();
      } else if (era.soundType === 'sword') {
        playShieldSound();
      } else if (era.soundType === 'steam') {
        // Steam engine chug
        const ctx = getAudioContext();
        const now = ctx.currentTime;
        [0, 0.15, 0.3].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(140, now + offset);
          gain.gain.setValueAtTime(0.3, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.12);
        });
      } else {
        playMagicSound();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Handle Era Time Travel
  const handleEraTravel = (era: HistoryEra) => {
    setSelectedEra(era);
    setIsWarping(true);
    playEraSound(era);
    speakHindi(`टाइम मशीन चालू! ${era.hindiTitle}! ${era.timePeriod}! ${era.story}`);

    confetti({
      particleCount: 50,
      spread: 70,
      colors: ['#FFD700', '#FF8C00', '#4169E1']
    });

    setTimeout(() => {
      setIsWarping(false);
    }, 900);
  };

  // Handle Invention Tap
  const handleInventionClick = (inv: Invention) => {
    setSelectedInvention(inv);
    playCheerSound();
    speakHindi(`${inv.hindiName}! ${inv.name}! ${inv.year} में आविष्कार! ${inv.whyAwesome}`);
    confetti({ particleCount: 35, spread: 50 });
  };

  // Handle Figure Tap
  const handleFigureClick = (fig: HistoricalFigure) => {
    setSelectedFigure(fig);
    playMagicSound();
    speakHindi(`${fig.hindiName}! ${fig.title}! ${fig.era}! "${fig.quote}" ${fig.achievement}`);
    confetti({ particleCount: 45, spread: 65 });
  };

  // Handle Quiz Answer
  const handleQuizAnswer = (ans: string) => {
    if (ans === currentQuiz.correct) {
      playCheerSound();
      setQuizFeedback('correct');
      setQuizScore((prev) => prev + 1);
      confetti({ particleCount: 70, spread: 80 });
      speakHindi(`शाबाश! सही उत्तर! ${currentQuiz.speech}`);

      setTimeout(() => {
        setQuizFeedback(null);
        setQuizIndex((prev) => prev + 1);
      }, 1800);
    } else {
      playPopSound();
      setQuizFeedback('wrong');
      speakHindi('फिर से कोशिश करो!');
      setTimeout(() => setQuizFeedback(null), 1200);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto pt-20 pb-24 px-3 sm:px-6">
      
      {/* Time Warp Ambient Flash Effect */}
      {isWarping && (
        <div className="fixed inset-0 pointer-events-none z-50 bg-gradient-to-r from-amber-400/30 via-indigo-500/30 to-purple-600/30 animate-ping" />
      )}

      <div className="max-w-6xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl border-3 border-amber-400 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-4xl animate-bounce">⏳</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                इतिहास और टाइम मशीन • History Time Machine 🚀
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                Explore 10 Great Epochs (30,000 BCE to Space Age), 10 Inventions & World Legends!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => { playPopSound(); setActiveTab('eras'); speakHindi('टाइम मशीन के युग!'); }}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'eras'
                  ? 'bg-amber-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>युग ({HISTORY_ERAS.length} Epochs)</span>
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('inventions'); speakHindi('महान आविष्कार!'); }}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'inventions'
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>आविष्कार ({INVENTIONS.length} Inventions)</span>
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('figures'); speakHindi('इतिहास के महानायक!'); }}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'figures'
                  ? 'bg-rose-500 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>महानायक (Legends)</span>
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('quiz'); speakHindi('टाइम ट्रैवलर क्विज!'); }}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'quiz'
                  ? 'bg-emerald-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>क्विज (Quiz)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: 10 TIME MACHINE ERAS */}
        {activeTab === 'eras' && (
          <div className="space-y-6">
            
            {/* Active Time Warp Portal Showcase */}
            <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${selectedEra.color} text-white shadow-2xl border-4 border-white flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn`}>
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-yellow-300 shadow-2xl bg-black/30 shrink-0 relative">
                  <img
                    src={selectedEra.imageUrl}
                    alt={selectedEra.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 right-1 text-2xl bg-white/90 rounded-full px-1.5 py-0.5 shadow">
                    {selectedEra.emoji}
                  </div>
                </div>
                <div>
                  <div className="inline-block bg-white/90 text-slate-950 text-xs font-black px-3 py-1 rounded-full mb-1">
                    ⏳ {selectedEra.timePeriod}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black">
                    {selectedEra.hindiTitle}
                  </h3>
                  <h4 className="text-lg sm:text-xl font-bold text-yellow-200 mt-0.5">
                    {selectedEra.title}
                  </h4>
                  <p className="text-base font-medium text-white/95 max-w-xl mt-2">
                    {selectedEra.story}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
                    {selectedEra.highlights.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-black/30 text-white text-xs font-black px-3 py-1.5 rounded-xl border border-white/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleEraTravel(selectedEra)}
                className="px-6 py-4 rounded-2xl bg-yellow-300 hover:bg-yellow-200 active:scale-95 text-slate-950 font-black text-base shadow-xl border-4 border-white flex items-center gap-2 cursor-pointer shrink-0 transition-transform"
              >
                <Sparkles className="w-6 h-6 text-orange-600 animate-spin" />
                <span>TIME TRAVEL NOW (समय यात्रा)!</span>
              </button>
            </div>

            {/* Complete 10 Eras Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {HISTORY_ERAS.map((era) => (
                <button
                  key={era.id}
                  onClick={() => handleEraTravel(era)}
                  className={`p-3.5 rounded-3xl bg-gradient-to-br ${era.color} text-white border-4 ${
                    selectedEra.id === era.id ? 'border-yellow-300 ring-4 ring-yellow-400 scale-105' : 'border-white'
                  } shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-left flex flex-col justify-between cursor-pointer`}
                >
                  <div className="w-full aspect-video rounded-2xl overflow-hidden mb-2.5 relative border-2 border-white/40 shadow bg-black/20">
                    <img
                      src={era.imageUrl}
                      alt={era.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1.5 right-1.5 text-xl bg-white/90 rounded-full px-1.5 py-0.5 shadow">
                      {era.emoji}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full inline-block mb-1">
                      {era.timePeriod}
                    </span>
                    <h4 className="font-black text-base text-white drop-shadow-md line-clamp-1">
                      {era.hindiTitle}
                    </h4>
                    <p className="text-xs font-semibold text-yellow-200 line-clamp-1">
                      {era.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: 10 GREAT INVENTIONS */}
        {activeTab === 'inventions' && (
          <div className="space-y-6">
            
            {/* Filter Sub-Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <button
                onClick={() => { playPopSound(); setInvFilter('all'); }}
                className={`px-4 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                  invFilter === 'all'
                    ? 'bg-indigo-600 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                🌟 All {INVENTIONS.length} Inventions
              </button>

              <button
                onClick={() => { playPopSound(); setInvFilter('transport'); }}
                className={`px-4 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                  invFilter === 'transport'
                    ? 'bg-amber-600 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                🚂 Wheels & Travel
              </button>

              <button
                onClick={() => { playPopSound(); setInvFilter('communication'); }}
                className={`px-4 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                  invFilter === 'communication'
                    ? 'bg-emerald-600 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                ☎️ Telephone, Books & Computer
              </button>

              <button
                onClick={() => { playPopSound(); setInvFilter('science'); }}
                className={`px-4 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                  invFilter === 'science'
                    ? 'bg-purple-600 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                💡 Lightbulb, Telescope & Rocket
              </button>
            </div>

            {/* Active Invention Showcase */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white shadow-2xl border-4 border-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
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
                    <span>Year: {selectedInvention.year} • By {selectedInvention.inventorOrEra}</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black">
                    {selectedInvention.hindiName} ({selectedInvention.name}) {selectedInvention.emoji}
                  </h3>
                  <p className="text-base sm:text-lg font-bold text-yellow-100 max-w-xl mt-2">
                    {selectedInvention.whyAwesome}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleInventionClick(selectedInvention)}
                className="px-6 py-4 rounded-2xl bg-white text-slate-950 font-black text-base shadow-xl hover:bg-yellow-300 transition-transform active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
              >
                <Volume2 className="w-6 h-6 text-orange-600" />
                <span>सुनो (LISTEN)</span>
              </button>
            </div>

            {/* Inventions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {filteredInventions.map((inv) => (
                <button
                  key={inv.id}
                  onClick={() => handleInventionClick(inv)}
                  className={`p-4 rounded-3xl bg-white/95 border-4 ${
                    selectedInvention.id === inv.id ? 'border-amber-400 ring-4 ring-amber-300 scale-102' : 'border-slate-200'
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
                    <h4 className="text-lg font-black text-slate-900 line-clamp-1">{inv.name} {inv.emoji}</h4>
                    <p className="text-xs font-bold text-amber-700">{inv.inventorOrEra}</p>
                    <p className="text-xs font-medium text-slate-600 mt-1 line-clamp-2">{inv.whyAwesome}</p>
                  </div>
                </button>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: WORLD HISTORICAL FIGURES & LEGENDS */}
        {activeTab === 'figures' && (
          <div className="space-y-6">
            
            {/* Active Figure Showcase */}
            <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${selectedFigure.color} text-white shadow-2xl border-4 border-white flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn`}>
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-yellow-300 shadow-2xl bg-black/30 shrink-0 relative">
                  <img
                    src={selectedFigure.imageUrl}
                    alt={selectedFigure.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 right-1 text-2xl bg-white/90 rounded-full px-1.5 py-0.5 shadow">
                    {selectedFigure.emoji}
                  </div>
                </div>
                <div>
                  <div className="inline-block bg-white/90 text-slate-950 text-xs font-black px-3 py-1 rounded-full mb-1">
                    {selectedFigure.era}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black">
                    {selectedFigure.hindiName} ({selectedFigure.name})
                  </h3>
                  <p className="font-bold text-yellow-200 text-sm sm:text-base mt-0.5">
                    {selectedFigure.title}
                  </p>
                  <p className="italic text-sm font-semibold bg-black/20 px-3.5 py-1.5 rounded-xl inline-block my-2 border border-white/20">
                    "{selectedFigure.quote}"
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-white/95 max-w-xl">
                    {selectedFigure.achievement}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleFigureClick(selectedFigure)}
                className="px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-base shadow-xl border-4 border-white flex items-center gap-2 cursor-pointer shrink-0 transition-transform"
              >
                <Crown className="w-6 h-6 text-orange-600 animate-bounce" />
                <span>सुनो (EXPLORE LEGEND)</span>
              </button>
            </div>

            {/* Figures Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {HISTORICAL_FIGURES.map((fig) => (
                <button
                  key={fig.id}
                  onClick={() => handleFigureClick(fig)}
                  className={`p-4 rounded-3xl bg-gradient-to-br ${fig.color} border-4 ${
                    selectedFigure.id === fig.id ? 'border-yellow-300 ring-4 ring-yellow-400 scale-102' : 'border-white'
                  } text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-left flex flex-col justify-between cursor-pointer`}
                >
                  <div className="w-full aspect-video rounded-2xl overflow-hidden mb-3 relative border-2 border-white/40 shadow bg-black/20">
                    <img
                      src={fig.imageUrl}
                      alt={fig.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 text-2xl bg-white/90 rounded-full px-1.5 py-0.5 shadow">
                      {fig.emoji}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full inline-block mb-1">
                      {fig.era}
                    </span>
                    <h4 className="text-xl font-black text-white drop-shadow-md">{fig.name}</h4>
                    <p className="text-xs font-bold text-yellow-200">{fig.title}</p>
                    <p className="text-xs font-semibold text-white/90 italic mt-1 line-clamp-2">
                      "{fig.quote}"
                    </p>
                  </div>
                </button>
              ))}
            </div>

          </div>
        )}

        {/* TAB 4: TIME TRAVELER TRIVIA QUIZ */}
        {activeTab === 'quiz' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-2xl text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black bg-indigo-100 text-indigo-900 px-4 py-1.5 rounded-full">
                Question {quizIndex + 1} / {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-sm font-black bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full flex items-center gap-1">
                <Trophy className="w-4 h-4 text-amber-500" /> Stars: {quizScore}
              </span>
            </div>

            <div className="my-6 bg-gradient-to-r from-amber-100 via-orange-50 to-indigo-100 p-6 rounded-3xl border-2 border-amber-300 shadow-inner">
              <span className="text-5xl mb-3 block animate-bounce">⏳</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                {currentQuiz.question}
              </h3>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-3.5 mt-6">
              {currentQuiz.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuizAnswer(option)}
                  className="p-5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 active:scale-95 text-slate-950 font-black text-xl shadow-lg border-2 border-white cursor-pointer transition-transform flex items-center justify-center gap-2"
                >
                  <span>{option}</span>
                </button>
              ))}
            </div>

            {/* Feedback Alert */}
            {quizFeedback === 'correct' && (
              <div className="mt-5 p-3.5 rounded-2xl bg-emerald-500 text-white font-black text-lg animate-bounce shadow-md">
                🎉 शाबाश! बिलकुल सही उत्तर! ⭐
              </div>
            )}
            {quizFeedback === 'wrong' && (
              <div className="mt-5 p-3.5 rounded-2xl bg-rose-500 text-white font-black text-lg animate-pulse shadow-md">
                ❌ अरे! फिर से कोशिश करो!
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
