import React, { useState } from 'react';
import { SHAPES_DATA, COUNTING_ITEMS, MATH_ADDITION_PROBLEMS } from '../../data/math';
import { ShapeItem } from '../../types/hub';
import { speakText, playCheerSound, playPopSound } from '../../audio/animalSounds';
import { playCountNote } from '../../audio/soundEffects';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy } from 'lucide-react';

export const MathHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'balloons' | 'feed' | 'shapes' | 'addition'>('balloons');

  // Balloon Pop State
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const balloonNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const balloonColors = [
    'from-red-400 to-rose-500',
    'from-amber-400 to-orange-500',
    'from-yellow-400 to-amber-500',
    'from-emerald-400 to-green-500',
    'from-teal-400 to-cyan-500',
    'from-sky-400 to-blue-500',
    'from-indigo-400 to-purple-500',
    'from-purple-400 to-pink-500',
    'from-pink-400 to-rose-500',
    'from-rose-400 to-red-600',
  ];

  // Hungry Monster Feed State
  const [fedCount, setFedCount] = useState(0);
  const [selectedSnack, setSelectedSnack] = useState(COUNTING_ITEMS[0]);

  // Shape Sorter State
  const [targetShape, setTargetShape] = useState<ShapeItem>(SHAPES_DATA[0]);
  const [shapeScore, setShapeScore] = useState(0);

  // Addition State
  const [mathIndex, setMathIndex] = useState(0);
  const [mathScore, setMathScore] = useState(0);
  const currentProblem = MATH_ADDITION_PROBLEMS[mathIndex % MATH_ADDITION_PROBLEMS.length];
  const correctAnswer = currentProblem.num1 + currentProblem.num2;
  const answerOptions = [
    correctAnswer,
    correctAnswer + 1,
    Math.max(1, correctAnswer - 1),
  ].sort(() => 0.5 - Math.random());

  // Handle Balloon Pop
  const handlePopBalloon = (num: number) => {
    if (poppedBalloons.includes(num)) return;
    playPopSound();
    playCountNote(num);
    speakText(`${num}!`);

    setPoppedBalloons(prev => [...prev, num]);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });

    if (poppedBalloons.length + 1 === 10) {
      setTimeout(() => {
        playCheerSound();
        confetti({ particleCount: 100, spread: 90 });
        speakText('Hooray! You popped all 10 balloons!');
      }, 500);
    }
  };

  const resetBalloons = () => {
    setPoppedBalloons([]);
    playPopSound();
    speakText('Pop balloons from 1 to 10!');
  };

  // Handle Feed Monster
  const handleFeedMonster = () => {
    const next = fedCount + 1;
    setFedCount(next);
    playPopSound();
    playCountNote(next);

    if (next >= 10) {
      playCheerSound();
      confetti({ particleCount: 80, spread: 70 });
      speakText(`Nom nom nom! ${next}! Monster is so full and happy!`);
    } else {
      speakText(`Nom nom! ${next} ${selectedSnack.name}s!`);
    }
  };

  // Handle Shape Match
  const handleShapeSelect = (shape: ShapeItem) => {
    if (shape.id === targetShape.id) {
      playCheerSound();
      setShapeScore(prev => prev + 1);
      confetti({ particleCount: 50, spread: 60 });
      speakText(`Great job! That is the ${shape.name}!`);

      // Next random shape
      const nextShapes = SHAPES_DATA.filter(s => s.id !== shape.id);
      const nextTarget = nextShapes[Math.floor(Math.random() * nextShapes.length)];
      setTimeout(() => {
        setTargetShape(nextTarget);
        speakText(`Now find the ${nextTarget.name}!`);
      }, 1500);
    } else {
      playPopSound();
      speakText(`That is a ${shape.name}. Let us find the ${targetShape.name}!`);
    }
  };

  // Handle Addition Answer
  const handleMathAnswer = (ans: number) => {
    if (ans === correctAnswer) {
      playCheerSound();
      setMathScore(prev => prev + 1);
      confetti({ particleCount: 60, spread: 70 });
      speakText(`Correct! ${currentProblem.num1} plus ${currentProblem.num2} equals ${correctAnswer}!`);

      setTimeout(() => {
        setMathIndex(prev => prev + 1);
      }, 1800);
    } else {
      playPopSound();
      speakText(`Try again! Count the ${currentProblem.name}!`);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto pt-20 pb-24 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Sub-tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-3xl border-3 border-amber-300 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-4xl animate-bounce">🔢</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Math & Shapes Playground
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                Pop Balloons, Feed Hungry Monster, Sort Shapes & Add!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => { playPopSound(); setActiveTab('balloons'); speakText('Pop balloons from 1 to 10!'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'balloons'
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🎈 Balloon Pop
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('feed'); speakText('Feed the hungry monster!'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'feed'
                  ? 'bg-emerald-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🍎 Count & Feed
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('shapes'); speakText(`Find the ${targetShape.name}!`); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'shapes'
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              🔷 Shape Sorter
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('addition'); speakText('Let us add numbers!'); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'addition'
                  ? 'bg-rose-500 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              ➕ Fun Addition
            </button>
          </div>
        </div>

        {/* TAB 1: BALLOON NUMBER POP */}
        {activeTab === 'balloons' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-2xl text-center">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full">
                Popped: {poppedBalloons.length} / 10
              </span>
              <button
                onClick={resetBalloons}
                className="text-xs font-black bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl border border-slate-300 active:scale-95 cursor-pointer"
              >
                🔄 Reset Balloons
              </button>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
              Tap any Balloon to Pop & Count! 🎈✨
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6">
              {balloonNumbers.map((num, idx) => {
                const isPopped = poppedBalloons.includes(num);
                return (
                  <button
                    key={num}
                    onClick={() => handlePopBalloon(num)}
                    disabled={isPopped}
                    className={`aspect-square rounded-full p-4 flex flex-col items-center justify-center font-black transition-all transform shadow-xl cursor-pointer ${
                      isPopped
                        ? 'bg-slate-200 text-slate-400 scale-90 border-2 border-dashed border-slate-300 opacity-40'
                        : `bg-gradient-to-br ${balloonColors[idx]} text-white border-4 border-white hover:scale-110 active:scale-95 animate-bounce`
                    }`}
                  >
                    <span className="text-5xl sm:text-6xl drop-shadow-md">
                      {isPopped ? '💥' : '🎈'}
                    </span>
                    <span className="text-2xl sm:text-3xl mt-1 drop-shadow-sm">
                      {num}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: COUNT & FEED HUNGRY MONSTER */}
        {activeTab === 'feed' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-emerald-300 shadow-2xl text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-full">
                Snacks Eaten: {fedCount}
              </span>
              <button
                onClick={() => { setFedCount(0); playPopSound(); }}
                className="text-xs font-black bg-slate-100 text-slate-800 px-3 py-1.5 rounded-xl border border-slate-300 cursor-pointer"
              >
                🔄 Reset
              </button>
            </div>

            {/* Monster Display */}
            <div className="my-4">
              <div className="text-9xl animate-bounce">
                {fedCount >= 10 ? '😋' : fedCount > 0 ? '🤤' : '👾'}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                {fedCount >= 10 ? 'Monster is Super Happy & Full! 🎉' : 'Feed the Hungry Monster! 🍽️'}
              </h3>
              <p className="text-slate-600 font-bold text-sm mt-1">
                Choose a snack and tap to feed him!
              </p>
            </div>

            {/* Snack Selector */}
            <div className="flex justify-center gap-2 mb-6">
              {COUNTING_ITEMS.map((snack) => (
                <button
                  key={snack.id}
                  onClick={() => { setSelectedSnack(snack); playPopSound(); }}
                  className={`p-3 rounded-2xl text-3xl border-2 transition-all cursor-pointer ${
                    selectedSnack.id === snack.id
                      ? 'bg-amber-100 border-amber-500 scale-110 shadow-md'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  {snack.emoji}
                </button>
              ))}
            </div>

            {/* Feed Action Button */}
            <button
              onClick={handleFeedMonster}
              className="w-full py-5 rounded-3xl bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 active:scale-95 text-slate-950 font-black text-2xl shadow-xl border-4 border-white flex items-center justify-center gap-3 cursor-pointer transition-transform"
            >
              <span className="text-4xl">{selectedSnack.emoji}</span>
              <span>TAP TO FEED {selectedSnack.name.toUpperCase()}!</span>
            </button>
          </div>
        )}

        {/* TAB 3: SHAPE SORTER */}
        {activeTab === 'shapes' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-2xl text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black bg-indigo-100 text-indigo-900 px-4 py-1.5 rounded-full flex items-center gap-1">
                <Trophy className="w-4 h-4 text-amber-500" /> Score: {shapeScore}
              </span>
            </div>

            <div className="my-4">
              <span className="text-sm font-black text-slate-500 uppercase tracking-wide">
                Target Shape:
              </span>
              <div className="text-8xl my-2 animate-pulse">{targetShape.emoji}</div>
              <h3 className="text-3xl font-black text-indigo-950">
                Can you find the {targetShape.name}?
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              {SHAPES_DATA.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => handleShapeSelect(shape)}
                  className={`p-6 rounded-3xl border-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center gap-2 cursor-pointer ${shape.color} border-white`}
                >
                  <span className="text-6xl">{shape.emoji}</span>
                  <span className="font-black text-xl">{shape.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: VISUAL ADDITION */}
        {activeTab === 'addition' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-rose-300 shadow-2xl text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black bg-rose-100 text-rose-900 px-4 py-1.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-500" /> Solved: {mathScore}
              </span>
            </div>

            {/* Visual Problem */}
            <div className="bg-rose-50 border-2 border-rose-200 p-6 rounded-3xl my-4">
              <div className="flex items-center justify-center gap-3 text-3xl sm:text-5xl font-black text-slate-900">
                
                {/* Group 1 */}
                <div className="flex flex-col items-center">
                  <div className="text-4xl sm:text-5xl mb-1">
                    {Array(currentProblem.num1).fill(currentProblem.item).join(' ')}
                  </div>
                  <span className="text-2xl text-rose-600 font-black">{currentProblem.num1}</span>
                </div>

                <span className="text-slate-400">+</span>

                {/* Group 2 */}
                <div className="flex flex-col items-center">
                  <div className="text-4xl sm:text-5xl mb-1">
                    {Array(currentProblem.num2).fill(currentProblem.item).join(' ')}
                  </div>
                  <span className="text-2xl text-rose-600 font-black">{currentProblem.num2}</span>
                </div>

                <span className="text-slate-400">=</span>
                <span className="text-4xl text-amber-500 font-black">?</span>
              </div>
            </div>

            <p className="text-slate-700 font-bold text-base mb-6">
              How many {currentProblem.name} altogether?
            </p>

            {/* Options */}
            <div className="grid grid-cols-3 gap-4">
              {answerOptions.map((ans, idx) => (
                <button
                  key={idx}
                  onClick={() => handleMathAnswer(ans)}
                  className="py-5 rounded-3xl bg-gradient-to-br from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 active:scale-95 text-slate-950 font-black text-4xl shadow-xl border-4 border-white cursor-pointer transition-transform"
                >
                  {ans}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
