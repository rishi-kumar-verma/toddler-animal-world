import React, { useState } from 'react';
import { HINDI_SWAR, HINDI_VYANJAN, HINDI_GINTI, HINDI_GINTI_EXTRA } from '../../data/hindi';
import { HindiLetter, HindiNumber } from '../../types/hub';
import { speakHindi } from '../../audio/hindiSpeech';
import { playPopSound, playCheerSound } from '../../audio/animalSounds';
import { playCountNote } from '../../audio/soundEffects';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, RotateCcw } from 'lucide-react';

export const HindiHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'varnamala' | 'ginti' | 'quiz' | 'haathi'>('varnamala');
  const [letterType, setLetterType] = useState<'swar' | 'vyanjan'>('swar');
  const [selectedLetter, setSelectedLetter] = useState<HindiLetter>(HINDI_SWAR[0]);

  // Ginti State
  const [showExtendedGinti, setShowExtendedGinti] = useState(false);
  const [poppedGinti, setPoppedGinti] = useState<number[]>([]);
  const currentGintiList = showExtendedGinti ? [...HINDI_GINTI, ...HINDI_GINTI_EXTRA] : HINDI_GINTI;

  // Quiz State
  const allLetters = [...HINDI_SWAR, ...HINDI_VYANJAN];
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);
  
  const currentQuizLetter = allLetters[quizIndex % allLetters.length];
  const wrongOptions = allLetters.filter(l => l.id !== currentQuizLetter.id).slice(0, 2);
  const quizChoices = [currentQuizLetter, ...wrongOptions].sort(() => 0.5 - Math.random());

  // Haathi Feed State
  const [haathiLaddus, setHaathiLaddus] = useState(0);

  // Trigger Letter
  const handleLetterClick = (item: HindiLetter) => {
    setSelectedLetter(item);
    playPopSound();
    speakHindi(`${item.letter}! ${item.letter} से ${item.word}! ${item.pronunciation}!`);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
  };

  // Trigger Ginti Pop
  const handleGintiPop = (num: HindiNumber) => {
    if (poppedGinti.includes(num.englishNum)) return;
    playPopSound();
    playCountNote(num.englishNum);
    speakHindi(`${num.hindiNum}! ${num.word}! ${num.pronunciation}!`);

    setPoppedGinti(prev => [...prev, num.englishNum]);
    confetti({ particleCount: 25, spread: 50 });

    if (poppedGinti.length + 1 === currentGintiList.length) {
      setTimeout(() => {
        playCheerSound();
        confetti({ particleCount: 80, spread: 80 });
        speakHindi('शाबाश! आपने पूरी गिनती पूरी कर ली! Very good!');
      }, 600);
    }
  };

  // Reset Ginti
  const resetGinti = () => {
    setPoppedGinti([]);
    playPopSound();
    speakHindi('गिनती शुरू करते हैं! एक, दो, तीन!');
  };

  // Handle Quiz Answer
  const handleQuizAnswer = (letter: HindiLetter) => {
    if (letter.id === currentQuizLetter.id) {
      playCheerSound();
      setQuizFeedback('correct');
      setQuizScore(prev => prev + 1);
      confetti({ particleCount: 60, spread: 70 });
      speakHindi(`बिल्कुल सही! ${currentQuizLetter.letter} से ${currentQuizLetter.word}!`);

      setTimeout(() => {
        setQuizFeedback(null);
        setQuizIndex(prev => prev + 1);
      }, 1600);
    } else {
      playPopSound();
      setQuizFeedback('wrong');
      speakHindi(`फिर से कोशिश करो! ${currentQuizLetter.word} के लिए सही अक्षर चुनो!`);
      setTimeout(() => setQuizFeedback(null), 1200);
    }
  };

  // Feed Haathi
  const feedHaathi = () => {
    const next = haathiLaddus + 1;
    setHaathiLaddus(next);
    playPopSound();
    playCountNote(next);

    const gintiWord = HINDI_GINTI[next - 1]?.word || `${next}`;
    if (next >= 10) {
      playCheerSound();
      confetti({ particleCount: 90, spread: 80 });
      speakHindi(`वाह! दस लड्डू! हाथी राजा बहुत खुश हो गए! शाबाश!`);
    } else {
      speakHindi(`${gintiWord} लड्डू! मज़ा आ गया!`);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto pt-20 pb-24 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl border-3 border-orange-400 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-4xl animate-bounce">🪷</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                नमस्ते हिन्दी पाठशाला 🇮🇳
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                Real Photos of Objects, Hindi Letters (वर्णमाला) & Hindi Counting (गिनती)!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => { playPopSound(); setActiveTab('varnamala'); speakHindi('वर्णमाला सीखें!'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'varnamala'
                  ? 'bg-orange-500 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🔤 वर्णमाला (Letters)
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('ginti'); speakHindi('हिन्दी गिनती १ से १०!'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'ginti'
                  ? 'bg-emerald-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🔢 गिनती (Numbers)
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('quiz'); speakHindi(`पहचानो कौन सा अक्षर है?`); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'quiz'
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🎯 क्विज (Quiz)
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('haathi'); speakHindi('हाथी राजा को लड्डू खिलाओ!'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'haathi'
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🐘 हाथी और लड्डू
            </button>
          </div>
        </div>

        {/* TAB 1: VARNAMALA (SWAR & VYANJAN) WITH REAL OBJECT PHOTOS */}
        {activeTab === 'varnamala' && (
          <div className="space-y-6">
            
            {/* Swar / Vyanjan Switcher */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => { playPopSound(); setLetterType('swar'); setSelectedLetter(HINDI_SWAR[0]); speakHindi('स्वर! अ, आ, इ, ई...'); }}
                className={`px-6 py-2.5 rounded-2xl font-black text-base sm:text-lg transition-all border-2 ${
                  letterType === 'swar'
                    ? 'bg-rose-500 text-white border-rose-600 shadow-lg scale-105 ring-2 ring-rose-300'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                स्वर (Vowels • अ - अं)
              </button>

              <button
                onClick={() => { playPopSound(); setLetterType('vyanjan'); setSelectedLetter(HINDI_VYANJAN[0]); speakHindi('व्यंजन! क, ख, ग, घ...'); }}
                className={`px-6 py-2.5 rounded-2xl font-black text-base sm:text-lg transition-all border-2 ${
                  letterType === 'vyanjan'
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-lg scale-105 ring-2 ring-indigo-300'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                व्यंजन (Consonants • क - ह)
              </button>
            </div>

            {/* Active Selected Letter Banner with Real Photo */}
            {selectedLetter && (
              <div className={`p-6 rounded-3xl bg-gradient-to-r ${selectedLetter.colorGradient} text-white shadow-2xl border-4 border-white flex flex-col sm:flex-row items-center justify-between gap-6 animate-fadeIn`}>
                <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-black/30 shrink-0 relative">
                    <img
                      src={selectedLetter.imageUrl}
                      alt={selectedLetter.word}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 left-1 bg-white/90 text-slate-950 font-black text-2xl px-2 py-0.5 rounded-xl shadow">
                      {selectedLetter.letter}
                    </div>
                  </div>
                  <div>
                    <div className="inline-block bg-white/90 text-slate-950 text-xs font-black px-3 py-1 rounded-full mb-1">
                      Pronounced: "{selectedLetter.pronunciation}"
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black">
                      {selectedLetter.letter} से {selectedLetter.word} {selectedLetter.emoji}
                    </h3>
                    <p className="text-base sm:text-lg font-bold text-yellow-200 mt-1">
                      Meaning: {selectedLetter.meaning}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleLetterClick(selectedLetter)}
                  className="px-6 py-3.5 rounded-2xl bg-white text-slate-950 font-black text-base shadow-xl hover:bg-yellow-300 transition-transform active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Sparkles className="w-5 h-5 text-orange-500 animate-spin" />
                  <span>सुनो (LISTEN AGAIN)</span>
                </button>
              </div>
            )}

            {/* Grid of Letters with Real Photo Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {(letterType === 'swar' ? HINDI_SWAR : HINDI_VYANJAN).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLetterClick(item)}
                  className={`p-3 rounded-3xl bg-gradient-to-br ${item.colorGradient} border-4 ${
                    selectedLetter.id === item.id ? 'border-yellow-300 ring-4 ring-yellow-400 scale-105' : 'border-white'
                  } text-white shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-center flex flex-col items-center justify-between cursor-pointer`}
                >
                  {/* Top Real Photo Tile with Overlay Letter */}
                  <div className="w-full aspect-square rounded-2xl overflow-hidden mb-2 relative border-2 border-white/60 shadow bg-black/20">
                    <img
                      src={item.imageUrl}
                      alt={item.word}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-white/95 text-slate-950 text-xl sm:text-2xl font-black px-2 py-0.5 rounded-xl shadow-md">
                      {item.letter}
                    </div>
                  </div>

                  {/* Word & Emoji */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black drop-shadow-sm">{item.word}</span>
                    <span className="text-base">{item.emoji}</span>
                  </div>
                </button>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: HINDI GINTI BALLOON POP */}
        {activeTab === 'ginti' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-emerald-300 shadow-2xl text-center">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="text-sm font-black bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-full">
                Popped: {poppedGinti.length} / {currentGintiList.length}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setShowExtendedGinti(!showExtendedGinti); setPoppedGinti([]); playPopSound(); }}
                  className="text-xs font-black bg-indigo-50 hover:bg-indigo-100 text-indigo-900 px-3.5 py-2 rounded-xl border border-indigo-200 cursor-pointer"
                >
                  {showExtendedGinti ? '🔢 Show १ to १०' : '🚀 Extend to १ to २०'}
                </button>

                <button
                  onClick={resetGinti}
                  className="text-xs font-black bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-xl border border-slate-300 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
              गुब्बारा फोड़ो और हिन्दी गिनती सीखो! 🎈✨
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6">
              {currentGintiList.map((item) => {
                const isPopped = poppedGinti.includes(item.englishNum);
                return (
                  <button
                    key={item.englishNum}
                    onClick={() => handleGintiPop(item)}
                    disabled={isPopped}
                    className={`aspect-square rounded-full p-4 flex flex-col items-center justify-center font-black transition-all transform shadow-xl cursor-pointer ${
                      isPopped
                        ? 'bg-slate-200 text-slate-400 scale-90 border-2 border-dashed border-slate-300 opacity-40'
                        : `bg-gradient-to-br ${item.color} text-white border-4 border-white hover:scale-110 active:scale-95 animate-bounce`
                    }`}
                  >
                    <span className="text-4xl sm:text-5xl font-black drop-shadow-md">
                      {isPopped ? '💥' : item.hindiNum}
                    </span>
                    <span className="text-lg sm:text-xl mt-1 font-black drop-shadow-sm">
                      {item.word}
                    </span>
                    <span className="text-xs font-semibold opacity-90">
                      ({item.pronunciation})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: HINDI LETTER QUIZ WITH REAL PHOTO */}
        {activeTab === 'quiz' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-2xl text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black bg-indigo-100 text-indigo-900 px-4 py-1.5 rounded-full">
                Question {quizIndex + 1}
              </span>
              <span className="text-sm font-black bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full flex items-center gap-1">
                <Trophy className="w-4 h-4 text-amber-500" /> Score: {quizScore}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">
              इस चित्र के लिए सही अक्षर कौन सा है?
            </h3>

            <div className="bg-indigo-50 border-2 border-indigo-200 p-6 rounded-3xl mb-6 shadow-inner flex flex-col items-center">
              <div className="w-36 h-36 rounded-3xl overflow-hidden border-4 border-white shadow-xl mb-3">
                <img
                  src={currentQuizLetter.imageUrl}
                  alt={currentQuizLetter.word}
                  className="w-full h-full object-cover animate-bounce"
                />
              </div>
              <p className="text-3xl font-black text-indigo-950">
                "{currentQuizLetter.word}" {currentQuizLetter.emoji}
              </p>
              <span className="text-sm font-bold text-slate-500">
                ({currentQuizLetter.meaning})
              </span>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-3 gap-4">
              {quizChoices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleQuizAnswer(choice)}
                  className={`p-6 rounded-3xl bg-gradient-to-br ${choice.colorGradient} border-4 ${choice.borderColor} text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center gap-1 cursor-pointer`}
                >
                  <span className="text-6xl font-black drop-shadow-md">{choice.letter}</span>
                  <span className="text-xs font-bold opacity-90">{choice.pronunciation}</span>
                </button>
              ))}
            </div>

            {/* Feedback Alert */}
            {quizFeedback === 'correct' && (
              <div className="mt-5 p-3 rounded-2xl bg-emerald-500 text-white font-black text-lg animate-bounce">
                🎉 शाबाश! बिलकुल सही उत्तर! ⭐
              </div>
            )}
            {quizFeedback === 'wrong' && (
              <div className="mt-5 p-3 rounded-2xl bg-rose-500 text-white font-black text-lg animate-pulse">
                ❌ अरे! फिर से कोशिश करो!
              </div>
            )}
          </div>
        )}

        {/* TAB 4: HAATHI AND LADDU FEEDING */}
        {activeTab === 'haathi' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-2xl text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full">
                खाए गए लड्डू: {haathiLaddus} / १०
              </span>
              <button
                onClick={() => { setHaathiLaddus(0); playPopSound(); }}
                className="text-xs font-black bg-slate-100 text-slate-800 px-3 py-1.5 rounded-xl border border-slate-300 cursor-pointer"
              >
                🔄 Reset
              </button>
            </div>

            {/* Haathi Animation Display */}
            <div className="my-4 flex flex-col items-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl mb-3">
                <img
                  src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=500&auto=format&fit=crop&q=80"
                  alt="Elephant"
                  className="w-full h-full object-cover animate-bounce"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                {haathiLaddus >= 10 ? 'हाथी राजा बहुत खुश हो गए! 👑' : 'हाथी राजा को मीठे लड्डू खिलाओ! 🟡'}
              </h3>
              <p className="text-slate-600 font-bold text-sm mt-1">
                लड्डू बटन दबाओ और हिन्दी में गिनती सीखो!
              </p>
            </div>

            {/* Laddus Count Visual */}
            <div className="flex flex-wrap justify-center gap-2 mb-6 min-h-12 bg-amber-50 p-4 rounded-2xl border-2 border-amber-200">
              {Array.from({ length: haathiLaddus }).map((_, idx) => (
                <span key={idx} className="text-3xl animate-bounce">
                  🟡
                </span>
              ))}
              {haathiLaddus === 0 && (
                <span className="text-slate-400 font-bold text-sm">यहाँ लड्डू दिखेंगे...</span>
              )}
            </div>

            {/* Feed Button */}
            <button
              onClick={feedHaathi}
              className="w-full py-5 rounded-3xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 active:scale-95 text-slate-950 font-black text-2xl shadow-xl border-4 border-white flex items-center justify-center gap-3 cursor-pointer transition-transform"
            >
              <span className="text-4xl">🟡</span>
              <span>हाथी को लड्डू खिलाओ (FEED LADDU)!</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
