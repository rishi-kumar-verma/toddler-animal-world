import React from 'react';
import { AgeCategory, HubCategory } from '../types/hub';
import { playPopSound, speakText } from '../audio/animalSounds';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HubDashboardProps {
  currentAge: AgeCategory;
  onSelectCategory: (cat: HubCategory) => void;
}

interface HubCard {
  id: HubCategory;
  title: string;
  subtitle: string;
  emoji: string;
  badge: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  bestAges: AgeCategory[];
  itemsPreview: string[];
  speechGreeting: string;
}

const HUB_CARDS: HubCard[] = [
  {
    id: 'india',
    title: 'अतुल्य भारत (Incredible India)',
    subtitle: 'Indian States, Famous Cities & Freedom Fighters!',
    emoji: '🇮🇳',
    badge: 'राज्य, शहर व सेनानी',
    bgGradient: 'from-orange-500 via-amber-500 to-green-600',
    borderColor: 'border-orange-300',
    textColor: 'text-white',
    bestAges: ['2', '3', '4'],
    itemsPreview: ['🏛️ 12 States & Capitals', '🌆 8 Famous Cities', '🎖️ 8 Freedom Heroes', '🏆 India Quiz'],
    speechGreeting: 'Welcome to Incredible India! Let us explore Indian states, famous cities, and freedom fighters!'
  },
  {
    id: 'hindi',
    title: 'हिन्दी पाठशाला (Hindi Hub)',
    subtitle: 'Learn Hindi Letters (वर्णमाला), Ginti & Quiz!',
    emoji: '🪷',
    badge: 'वर्णमाला व गिनती',
    bgGradient: 'from-orange-500 via-amber-500 to-rose-600',
    borderColor: 'border-orange-300',
    textColor: 'text-white',
    bestAges: ['2', '3', '4'],
    itemsPreview: ['🔤 स्वर अ-अं', '🔤 व्यंजन क-ह', '🔢 गिनती १-१०', '🐘 हाथी व लड्डू'],
    speechGreeting: 'नमस्ते! हिन्दी पाठशाला में आपका स्वागत है! आओ वर्णमाला और गिनती सीखें!'
  },
  {
    id: 'music',
    title: 'संगीत (Music & Piano)',
    subtitle: 'Rainbow Piano, Drums, Guitar & Nursery Rhymes!',
    emoji: '🎹',
    badge: 'Piano & Instruments',
    bgGradient: 'from-purple-600 via-indigo-600 to-pink-500',
    borderColor: 'border-purple-300',
    textColor: 'text-white',
    bestAges: ['2', '3', '4'],
    itemsPreview: ['🎹 Rainbow Piano', '🥁 Drums', '🎸 Guitar', '⭐ Twinkle Star'],
    speechGreeting: 'Welcome to Music and Piano World! Let us play colorful tunes!'
  },
  {
    id: 'vehicles',
    title: 'वाहन (Vehicles & Cars)',
    subtitle: 'Fire Trucks, Trains, Airplanes & Rockets!',
    emoji: '🚒',
    badge: 'Vehicles & Sounds',
    bgGradient: 'from-amber-500 via-orange-500 to-red-600',
    borderColor: 'border-amber-300',
    textColor: 'text-white',
    bestAges: ['2', '3', '4'],
    itemsPreview: ['🚒 Fire Truck', '🚂 Train Choo-Choo', '✈️ Jet Airplane', '🚀 Rocket'],
    speechGreeting: 'Beep Beep! Welcome to Vehicles and Transport World!'
  },
  {
    id: 'fruits',
    title: 'फल व सब्जियां (Fruits & Veggies)',
    subtitle: 'Delicious Fruits, Crunchy Veggies & Smoothie Maker!',
    emoji: '🍎',
    badge: 'Healthy Foods',
    bgGradient: 'from-emerald-500 via-teal-600 to-green-700',
    borderColor: 'border-emerald-300',
    textColor: 'text-white',
    bestAges: ['2', '3', '4'],
    itemsPreview: ['🍎 Red Apple', '🍌 Sweet Banana', '🥭 King Mango', '🥤 Smoothie Maker'],
    speechGreeting: 'Yum! Welcome to Fruits and Veggies World! Let us make a healthy smoothie!'
  },
  {
    id: 'superheroes',
    title: 'Marvel Superheroes',
    subtitle: 'Interactive Hero Powers & Action Sounds!',
    emoji: '🦸‍♂️',
    badge: 'Superpowers & Sounds',
    bgGradient: 'from-red-500 via-rose-600 to-indigo-700',
    borderColor: 'border-red-400',
    textColor: 'text-white',
    bestAges: ['2', '3', '4'],
    itemsPreview: ['🕸️ Spider-Man', '🦾 Iron Man', '⚡ Thor', '🥊 Hulk', '🌱 Baby Groot'],
    speechGreeting: 'Welcome to Marvel Superheroes! Tap any hero to activate their super powers!'
  },
  {
    id: 'science',
    title: 'Science & Planets',
    subtitle: 'Solar System, Dinosaurs & Body Explorer!',
    emoji: '🪐',
    badge: 'Space & Dinos',
    bgGradient: 'from-indigo-600 via-purple-600 to-cyan-500',
    borderColor: 'border-purple-400',
    textColor: 'text-white',
    bestAges: ['2', '3', '4'],
    itemsPreview: ['☀️ Solar System', '🦖 Dino Roars', '🌋 Volcano Burst', '❤️ Human Body'],
    speechGreeting: 'Welcome to Science World! Let us explore outer space and dinosaurs!'
  },
  {
    id: 'math',
    title: 'Math & Shapes Playground',
    subtitle: 'Balloon Pop, Count & Feed, Shape Sorter!',
    emoji: '🔢',
    badge: 'Counting & Games',
    bgGradient: 'from-amber-400 via-orange-500 to-pink-500',
    borderColor: 'border-amber-300',
    textColor: 'text-slate-950',
    bestAges: ['2', '3', '4'],
    itemsPreview: ['🎈 Balloon Pop', '🍎 Count & Feed', '⭐ Shape Sorter', '➕ Fun Addition'],
    speechGreeting: 'Welcome to Math Playground! Let us count numbers and sort colorful shapes!'
  },
  {
    id: 'geography',
    title: 'Geography World Safari',
    subtitle: 'Continents Map, Wonders & Deep Ocean!',
    emoji: '🌍',
    badge: 'World Safari',
    bgGradient: 'from-emerald-500 via-teal-600 to-sky-600',
    borderColor: 'border-emerald-300',
    textColor: 'text-white',
    bestAges: ['3', '4'],
    itemsPreview: ['🗺️ 7 Continents', '🦁 African Safari', '🏛️ Pyramids & Eiffel', '🐋 Ocean Dive'],
    speechGreeting: 'Welcome to Geography World Safari! Let us travel around the globe!'
  },
  {
    id: 'history',
    title: 'History Time Machine',
    subtitle: 'Pyramids, Knights, Inventions & Moon Landing!',
    emoji: '⏳',
    badge: 'Time Machine',
    bgGradient: 'from-yellow-600 via-amber-700 to-stone-800',
    borderColor: 'border-amber-400',
    textColor: 'text-amber-100',
    bestAges: ['3', '4'],
    itemsPreview: ['🦖 Prehistoric Era', '👑 Ancient Egypt', '🏰 Knights & Castles', '🚀 Moon Rocket'],
    speechGreeting: 'Hop inside the Time Machine! Let us travel to ancient castles and pyramids!'
  },
  {
    id: 'animals',
    title: 'Baby Animal World',
    subtitle: 'Authentic Animal Sounds, 3D Sandbox & Quiz!',
    emoji: '🐮',
    badge: 'Authentic Audio',
    bgGradient: 'from-yellow-400 via-amber-400 to-lime-500',
    borderColor: 'border-yellow-400',
    textColor: 'text-slate-950',
    bestAges: ['2', '3', '4'],
    itemsPreview: ['🐶 Woof Doggy', '🐱 Meow Kitty', '🦁 Roar Lion', '📦 3D Animal Box'],
    speechGreeting: 'Welcome to Baby Animal World! Touch any animal to hear real sounds!'
  }
];

export const HubDashboard: React.FC<HubDashboardProps> = ({
  currentAge,
  onSelectCategory,
}) => {
  // Filter cards if age is selected, or sort recommended ones to the top
  const filteredCards = HUB_CARDS.filter(card => 
    currentAge === 'all' || card.bestAges.includes(currentAge)
  );

  const handleCardClick = (card: HubCard) => {
    playPopSound();
    speakText(card.speechGreeting);
    onSelectCategory(card.id);
  };

  return (
    <div className="w-full h-full overflow-y-auto pt-20 pb-24 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Welcome Banner */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full shadow-md border-2 border-amber-300 mb-3">
            <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
            <span className="font-black text-sm sm:text-base text-slate-800">
              {currentAge === 'all' && '🌈 All Learning & Play Worlds'}
              {currentAge === '2' && '🐣 Baby (Age 2) - Sensory & Sound Play'}
              {currentAge === '3' && '🦁 Toddler (Age 3) - Shapes, Heroes & Counting'}
              {currentAge === '4' && '🚀 Explorer (Age 4+) - Science, Math & World Safari'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 drop-shadow-sm tracking-tight">
            Pick a World to Play! 🎮✨
          </h2>
          <p className="text-slate-700 font-bold text-sm sm:text-lg mt-1">
            Tap any colorful world card below to begin learning & playing!
          </p>
        </div>

        {/* Hub Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`group relative overflow-hidden rounded-3xl p-5 sm:p-6 bg-gradient-to-br ${card.bgGradient} border-4 ${card.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 active:scale-95 text-left flex flex-col justify-between cursor-pointer`}
            >
              {/* Top Row: Emoji & Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl sm:text-6xl p-3 bg-white/20 backdrop-blur-md rounded-2xl border-2 border-white/40 shadow-md transform group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  {card.emoji}
                </div>
                <span className="bg-white/90 text-slate-900 text-xs sm:text-sm font-black px-3 py-1 rounded-full shadow-sm">
                  {card.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-4">
                <h3 className={`text-2xl sm:text-3xl font-black mb-1 ${card.textColor} tracking-tight drop-shadow-sm`}>
                  {card.title}
                </h3>
                <p className={`text-xs sm:text-sm font-bold opacity-90 ${card.textColor}`}>
                  {card.subtitle}
                </p>
              </div>

              {/* Preview Chips */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {card.itemsPreview.map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-black/20 backdrop-blur-sm text-white text-xs font-extrabold px-2.5 py-1 rounded-xl border border-white/20"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Bottom Action Button */}
              <div className="flex items-center justify-between pt-3 border-t-2 border-white/20">
                <span className={`text-xs sm:text-sm font-black ${card.textColor}`}>
                  TAP TO ENTER WORLD
                </span>
                <div className="w-8 h-8 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-md transform group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 font-black" />
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
