import React, { useState } from 'react';
import { INDIAN_STATES, FAMOUS_CITIES, FREEDOM_FIGHTERS } from '../../data/india';
import { IndianState, FamousCity, FreedomFighter } from '../../types/hub';
import { speakHindi } from '../../audio/hindiSpeech';
import { playCheerSound, playPopSound } from '../../audio/animalSounds';
import { playMagicSound } from '../../audio/soundEffects';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, MapPin, Flag, Volume2, Search } from 'lucide-react';

export const IndiaHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'states' | 'cities' | 'heroes' | 'quiz'>('heroes');
  const [selectedState, setSelectedState] = useState<IndianState>(INDIAN_STATES[0]);
  const [selectedCity, setSelectedCity] = useState<FamousCity>(FAMOUS_CITIES[0]);
  const [selectedHero, setSelectedHero] = useState<FreedomFighter>(FREEDOM_FIGHTERS[0]);
  const [heroSearch, setHeroSearch] = useState('');
  const [heroEraFilter, setHeroEraFilter] = useState<'all' | 'revolutionaries' | 'leaders' | 'women'>('all');

  // Filtered Freedom Fighters
  const filteredHeroes = FREEDOM_FIGHTERS.filter((hero) => {
    const matchesSearch = hero.name.toLowerCase().includes(heroSearch.toLowerCase()) ||
                          hero.title.toLowerCase().includes(heroSearch.toLowerCase()) ||
                          hero.slogan.toLowerCase().includes(heroSearch.toLowerCase());
    if (!matchesSearch) return false;

    if (heroEraFilter === 'revolutionaries') {
      return ['bhagat_singh', 'netaji', 'chandrashekhar_azad', 'mangal_pandey', 'ram_prasad_bismil', 'ashfaqulla_khan', 'sukhdev', 'shivaram_rajguru', 'birsa_munda'].includes(hero.id);
    }
    if (heroEraFilter === 'women') {
      return ['rani_lakshmibai', 'sarojini_naidu', 'aruna_asaf_ali', 'kittur_chennamma', 'begum_hazrat_mahal'].includes(hero.id);
    }
    if (heroEraFilter === 'leaders') {
      return ['gandhi', 'sardar_patel', 'ambedkar', 'bal_gangadhar_tilak', 'lala_lajpat_rai', 'bipin_chandra_pal', 'jawaharlal_nehru', 'lal_bahadur_shastri', 'khan_abdul_ghaffar_khan', 'subramania_bharati'].includes(hero.id);
    }
    return true;
  });

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const QUIZ_QUESTIONS = [
    {
      question: '"इंकलाब ज़िंदाबाद" का नारा किसने दिया था?',
      correct: 'Shaheed Bhagat Singh 🔥',
      options: ['Shaheed Bhagat Singh 🔥', 'Mahatma Gandhi 🕊️', 'Rani Lakshmibai ⚔️'],
      speech: 'Shaheed Bhagat Singh gave the famous slogan Inquilab Zindabad!'
    },
    {
      question: '"तुम मुझे खून दो, मैं तुम्हें आज़ादी दूंगा" किसने कहा था?',
      correct: 'Netaji Subhas Chandra Bose 🎖️',
      options: ['Netaji Subhas Chandra Bose 🎖️', 'Sardar Patel 🗿', 'Dr. B.R. Ambedkar 📜'],
      speech: 'Netaji Subhas Chandra Bose of Azad Hind Fauj!'
    },
    {
      question: '"स्वराज मेरा जन्मसिद्ध अधिकार है और मैं इसे लेकर रहूँगा" किसने कहा?',
      correct: 'Lokmanya Bal Gangadhar Tilak 🦁',
      options: ['Lokmanya Bal Gangadhar Tilak 🦁', 'Lal Bahadur Shastri 🌾', 'Pandit Nehru 🌹'],
      speech: 'Lokmanya Bal Gangadhar Tilak!'
    },
    {
      question: '"जय जवान, जय किसान" का प्रसिद्ध नारा किसने दिया था?',
      correct: 'Lal Bahadur Shastri 🌾',
      options: ['Lal Bahadur Shastri 🌾', 'Bhagat Singh 🔥', 'Chandra Shekhar Azad 🎯'],
      speech: 'Lal Bahadur Shastri, champion of farmers and soldiers!'
    },
    {
      question: '"सरफ़रोशी की तमन्ना अब हमारे दिल में है" किसकी रचना है?',
      correct: 'Ram Prasad Bismil 📜',
      options: ['Ram Prasad Bismil 📜', 'Mangal Pandey ⚔️', 'Birsa Munda 🏹'],
      speech: 'Amar Shaheed Ram Prasad Bismil!'
    },
    {
      question: 'गुलाबी शहर (The Pink City) किस शहर को कहा जाता है?',
      correct: 'Jaipur 🏰',
      options: ['Jaipur 🏰', 'Mumbai 🌊', 'Kolkata 🌉'],
      speech: 'The Pink City is Jaipur in Rajasthan!'
    },
    {
      question: 'ताजमहल (Taj Mahal) किस शहर में स्थित है?',
      correct: 'Agra 🕌',
      options: ['Delhi 🏛️', 'Agra 🕌', 'Bengaluru 🚀'],
      speech: 'Taj Mahal is in Agra, Uttar Pradesh!'
    },
    {
      question: 'लौह पुरुष (Iron Man of India) किसे कहा जाता है?',
      correct: 'Sardar Vallabhbhai Patel 🗿',
      options: ['Sardar Vallabhbhai Patel 🗿', 'Chandra Shekhar Azad 🎯', 'Mahatma Gandhi 🕊️'],
      speech: 'Sardar Vallabhbhai Patel united our great nation!'
    }
  ];

  const currentQuiz = QUIZ_QUESTIONS[quizIndex % QUIZ_QUESTIONS.length];

  // Handle State Click
  const handleStateClick = (state: IndianState) => {
    setSelectedState(state);
    playPopSound();
    speakHindi(`${state.hindiName}! ${state.name}! Capital is ${state.capital}! Famous for: ${state.famousFor}`);
    confetti({
      particleCount: 30,
      spread: 50,
      colors: ['#FF9933', '#FFFFFF', '#128807']
    });
  };

  // Handle City Click
  const handleCityClick = (city: FamousCity) => {
    setSelectedCity(city);
    playMagicSound();
    speakHindi(`${city.name}! ${city.nickname}! In ${city.state}. ${city.fact}`);
    confetti({
      particleCount: 30,
      spread: 50,
      colors: ['#FF9933', '#FFFFFF', '#128807']
    });
  };

  // Handle Hero Click
  const handleHeroClick = (hero: FreedomFighter) => {
    setSelectedHero(hero);
    playCheerSound();
    speakHindi(`${hero.name}! ${hero.title}! नारा: ${hero.slogan}! ${hero.contribution}`);
    confetti({
      particleCount: 60,
      spread: 75,
      colors: ['#FF9933', '#FFFFFF', '#128807']
    });
  };

  // Handle Quiz Answer
  const handleQuizAnswer = (ans: string) => {
    if (ans === currentQuiz.correct) {
      playCheerSound();
      setQuizFeedback('correct');
      setQuizScore(prev => prev + 1);
      confetti({
        particleCount: 70,
        spread: 80,
        colors: ['#FF9933', '#FFFFFF', '#128807']
      });
      speakHindi(`शाबाश! सही उत्तर! ${currentQuiz.speech}`);

      setTimeout(() => {
        setQuizFeedback(null);
        setQuizIndex(prev => prev + 1);
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
      <div className="max-w-6xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl border-3 border-orange-400 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-4xl animate-bounce">🇮🇳</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                अतुल्य भारत • Incredible India Hub 🇮🇳
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                Complete Collection: {FREEDOM_FIGHTERS.length} Freedom Heroes, 12 States & 8 Famous Cities!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => { playPopSound(); setActiveTab('heroes'); speakHindi('भारत के वीर स्वतंत्रता सेनानी!'); }}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'heroes'
                  ? 'bg-emerald-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Flag className="w-4 h-4" />
              <span>सेनानी ({FREEDOM_FIGHTERS.length} Heroes)</span>
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('states'); speakHindi('भारत के राज्य और राजधानियाँ!'); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'states'
                  ? 'bg-orange-500 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>राज्य (States)</span>
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('cities'); speakHindi('भारत के प्रसिद्ध शहर!'); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'cities'
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>शहर (Cities)</span>
            </button>

            <button
              onClick={() => { playPopSound(); setActiveTab('quiz'); speakHindi('अतुल्य भारत क्विज खेलें!'); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                activeTab === 'quiz'
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>क्विज (Quiz)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: COMPLETE LIST OF FREEDOM FIGHTERS */}
        {activeTab === 'heroes' && (
          <div className="space-y-6">
            
            {/* Filter & Search Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white/90 p-3 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { playPopSound(); setHeroEraFilter('all'); }}
                  className={`px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                    heroEraFilter === 'all'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  🌟 All ({FREEDOM_FIGHTERS.length})
                </button>

                <button
                  onClick={() => { playPopSound(); setHeroEraFilter('revolutionaries'); }}
                  className={`px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                    heroEraFilter === 'revolutionaries'
                      ? 'bg-red-600 text-white shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  🔥 Revolutionaries (क्रांतिकारी)
                </button>

                <button
                  onClick={() => { playPopSound(); setHeroEraFilter('women'); }}
                  className={`px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                    heroEraFilter === 'women'
                      ? 'bg-purple-600 text-white shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  👑 Women Freedom Fighters (वीरांगनाएं)
                </button>

                <button
                  onClick={() => { playPopSound(); setHeroEraFilter('leaders'); }}
                  className={`px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
                    heroEraFilter === 'leaders'
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  🕊️ National Leaders & Thinkers
                </button>
              </div>

              <div className="relative flex items-center min-w-[200px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="text"
                  placeholder="Search Hero or Slogan..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
            </div>

            {/* Active Hero Showcase Banner */}
            <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${selectedHero.colorGradient} text-white shadow-2xl border-4 border-white flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn`}>
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-yellow-300 shadow-2xl bg-black/30 shrink-0 relative">
                  <img
                    src={selectedHero.imageUrl}
                    alt={selectedHero.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-1 right-1 text-2xl bg-white/90 rounded-full px-1.5 py-0.5 shadow">
                    {selectedHero.emoji}
                  </div>
                </div>
                <div>
                  <div className="inline-block bg-white/90 text-slate-950 text-xs font-black px-3 py-1 rounded-full mb-1">
                    {selectedHero.title}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black">{selectedHero.name}</h3>
                  <div className="my-2 bg-black/30 px-4 py-2 rounded-2xl inline-block border border-white/20">
                    <p className="font-black text-base sm:text-lg text-yellow-200">
                      📢 नारा: "{selectedHero.slogan}"
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-white/95 max-w-xl">
                    {selectedHero.contribution}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleHeroClick(selectedHero)}
                className="px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-base shadow-xl border-4 border-white flex items-center gap-2 cursor-pointer shrink-0 transition-transform"
              >
                <Volume2 className="w-6 h-6 text-orange-600 animate-pulse" />
                <span>जय हिन्द (LISTEN SLOGAN)</span>
              </button>
            </div>

            {/* Complete Heroes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredHeroes.map((hero) => (
                <button
                  key={hero.id}
                  onClick={() => handleHeroClick(hero)}
                  className={`p-3.5 sm:p-4 rounded-3xl bg-gradient-to-br ${hero.colorGradient} border-4 ${
                    selectedHero.id === hero.id ? 'border-yellow-300 ring-4 ring-yellow-400 scale-102' : hero.borderColor
                  } text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-left flex flex-col justify-between cursor-pointer`}
                >
                  <div className="w-full aspect-square rounded-2xl overflow-hidden mb-2.5 relative border-2 border-white/40 shadow bg-black/20">
                    <img
                      src={hero.imageUrl}
                      alt={hero.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                    <span className="absolute top-1.5 right-1.5 text-2xl bg-white/90 rounded-full px-1.5 py-0.5 shadow">
                      {hero.emoji}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-black text-white drop-shadow-md">
                      {hero.name}
                    </h4>
                    <p className="text-xs font-bold text-yellow-200 mt-0.5 line-clamp-1">
                      {hero.title}
                    </p>
                    <p className="text-xs font-semibold text-white/90 italic mt-1 line-clamp-2">
                      "{hero.slogan}"
                    </p>
                  </div>
                </button>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: INDIAN STATES & CAPITALS */}
        {activeTab === 'states' && (
          <div className="space-y-6">
            
            {/* Active State Showcase Banner */}
            <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${selectedState.colorGradient} text-white shadow-2xl border-4 border-white flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn`}>
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-black/30 shrink-0">
                  <img
                    src={selectedState.imageUrl}
                    alt={selectedState.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="inline-block bg-white/90 text-slate-950 text-xs font-black px-3 py-1 rounded-full mb-1">
                    🏛️ Capital: {selectedState.capital}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black">
                    {selectedState.hindiName} ({selectedState.name}) {selectedState.emoji}
                  </h3>
                  <p className="text-base sm:text-lg font-bold text-yellow-100 max-w-xl mt-1">
                    {selectedState.famousFor}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
                    <span className="bg-black/20 text-white text-xs font-black px-3 py-1.5 rounded-xl border border-white/20">
                      📍 Landmark: {selectedState.monument}
                    </span>
                    <span className="bg-black/20 text-white text-xs font-black px-3 py-1.5 rounded-xl border border-white/20">
                      🍲 Famous Food: {selectedState.food}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleStateClick(selectedState)}
                className="px-6 py-4 rounded-2xl bg-white text-slate-950 font-black text-base shadow-xl hover:bg-yellow-300 transition-transform active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
              >
                <Sparkles className="w-5 h-5 text-orange-500 animate-spin" />
                <span>सुनो (LISTEN)</span>
              </button>
            </div>

            {/* States Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {INDIAN_STATES.map((state) => (
                <button
                  key={state.id}
                  onClick={() => handleStateClick(state)}
                  className={`p-3.5 sm:p-4 rounded-3xl bg-gradient-to-br ${state.colorGradient} border-4 ${
                    selectedState.id === state.id ? 'border-yellow-300 ring-4 ring-yellow-400 scale-102' : state.borderColor
                  } text-white shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-left flex flex-col justify-between cursor-pointer`}
                >
                  <div className="w-full aspect-video rounded-2xl overflow-hidden mb-2.5 relative border-2 border-white/60 shadow bg-black/20">
                    <img
                      src={state.imageUrl}
                      alt={state.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1.5 right-1.5 text-2xl bg-white/80 rounded-full px-1 py-0.5 shadow">
                      {state.emoji}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black text-lg text-white drop-shadow-md">
                      {state.hindiName}
                    </h4>
                    <p className="text-xs font-bold text-yellow-200">
                      {state.name} • {state.capital}
                    </p>
                  </div>
                </button>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: FAMOUS CITIES */}
        {activeTab === 'cities' && (
          <div className="space-y-6">
            
            {/* Active City */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white shadow-2xl border-4 border-white flex flex-col md:flex-row items-center gap-6">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-black/30 shrink-0">
                <img
                  src={selectedCity.imageUrl}
                  alt={selectedCity.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 bg-white/90 text-slate-950 text-xs font-black px-3 py-1 rounded-full mb-1">
                  <span>📍 {selectedCity.state}</span>
                  <span>•</span>
                  <span>{selectedCity.nickname}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black">{selectedCity.name} {selectedCity.emoji}</h3>
                <p className="text-base sm:text-lg font-bold text-yellow-100 max-w-xl mt-1">
                  {selectedCity.fact}
                </p>
                <p className="text-xs font-semibold bg-black/20 px-3 py-1.5 rounded-xl inline-block mt-2">
                  ✨ Highlight: {selectedCity.highlight}
                </p>
              </div>
            </div>

            {/* Cities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FAMOUS_CITIES.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleCityClick(city)}
                  className={`p-4 rounded-3xl bg-white/95 border-4 ${
                    selectedCity.id === city.id ? 'border-amber-400 ring-4 ring-amber-300' : 'border-slate-200'
                  } shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-left flex flex-col justify-between cursor-pointer`}
                >
                  <div className="w-full aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 mb-3 relative">
                    <img
                      src={city.imageUrl}
                      alt={city.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 text-2xl bg-white/80 rounded-full px-1.5 py-0.5 shadow">
                      {city.emoji}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900">{city.name}</h4>
                    <p className="text-xs font-bold text-amber-700">{city.nickname}</p>
                    <p className="text-xs font-semibold text-slate-600 mt-1">{city.state}</p>
                  </div>
                </button>
              ))}
            </div>

          </div>
        )}

        {/* TAB 4: INCREDIBLE INDIA QUIZ */}
        {activeTab === 'quiz' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-2xl text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black bg-indigo-100 text-indigo-900 px-4 py-1.5 rounded-full">
                Question {quizIndex + 1} / {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-sm font-black bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full flex items-center gap-1">
                <Trophy className="w-4 h-4 text-amber-500" /> Score: {quizScore}
              </span>
            </div>

            <div className="my-6 bg-gradient-to-r from-orange-100 via-amber-50 to-green-100 p-6 rounded-3xl border-2 border-orange-300 shadow-inner">
              <span className="text-5xl mb-3 block animate-bounce">🇮🇳</span>
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
                  className="p-5 rounded-2xl bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 active:scale-95 text-slate-950 font-black text-xl shadow-lg border-2 border-white cursor-pointer transition-transform flex items-center justify-center gap-2"
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
