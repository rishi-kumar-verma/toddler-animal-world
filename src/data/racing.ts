import { RacerCar, RaceTrack } from '../types/hub';

export const RACER_CARS: RacerCar[] = [
  {
    id: 'lightning_red',
    name: 'Lightning Red Supercar',
    hindiName: 'लाल तूफ़ानी कार',
    emoji: '🏎️',
    colorGradient: 'from-red-500 via-rose-600 to-amber-500',
    topSpeed: 180,
    acceleration: 95,
    specialMove: 'Turbo Flame Boost 🔥',
    soundType: 'supercar'
  },
  {
    id: 'police_cruiser',
    name: 'Police Siren Cruiser',
    hindiName: 'पुलिस सायरन कार',
    emoji: '🚓',
    colorGradient: 'from-blue-600 via-indigo-700 to-slate-900',
    topSpeed: 165,
    acceleration: 90,
    specialMove: 'Siren Speed Warp 🚨',
    soundType: 'police'
  },
  {
    id: 'fire_turbo',
    name: 'Fire Turbo Truck',
    hindiName: 'दमकल टर्बो ट्रक',
    emoji: '🚒',
    colorGradient: 'from-orange-500 via-red-600 to-yellow-500',
    topSpeed: 155,
    acceleration: 88,
    specialMove: 'Water Cannon Blast 💦',
    soundType: 'fire'
  },
  {
    id: 'dino_kart',
    name: 'Dino-Kart Racer',
    hindiName: 'डायनासोर कार्ट',
    emoji: '🦖',
    colorGradient: 'from-emerald-600 via-green-600 to-lime-600',
    topSpeed: 170,
    acceleration: 92,
    specialMove: 'T-Rex Roar Jump 🐾',
    soundType: 'dino'
  },
  {
    id: 'space_hover',
    name: 'Cosmic Rocket Hover',
    hindiName: 'अंतरिक्ष होवर कार',
    emoji: '🚀',
    colorGradient: 'from-purple-600 via-indigo-600 to-cyan-500',
    topSpeed: 200,
    acceleration: 98,
    specialMove: 'Anti-Gravity Glide 🌌',
    soundType: 'rocket'
  },
  {
    id: 'spider_mobile',
    name: 'Spider Web-Mobile',
    hindiName: 'स्पाइडर वेब मोबाइल',
    emoji: '🕷️',
    colorGradient: 'from-rose-600 via-red-600 to-blue-700',
    topSpeed: 175,
    acceleration: 94,
    specialMove: 'Web Slingshot Jump 🕸️',
    soundType: 'batmobile'
  }
];

export const RACE_TRACKS: RaceTrack[] = [
  {
    id: 'rainbow_skyway',
    name: 'Rainbow Skyway Track',
    hindiName: 'इंद्रधनुष ट्रैक 🌈',
    emoji: '🌈',
    bgGradient: 'from-sky-400 via-pink-300 to-indigo-500',
    roadColor: 'from-purple-600 via-pink-500 to-indigo-600',
    trackTheme: 'rainbow',
    obstacleEmoji: ['☁️', '🎈', '🕊️'],
    collectibleEmoji: '⭐'
  },
  {
    id: 'dino_jungle',
    name: 'Dinosaur Safari Jungle',
    hindiName: 'डायनासोर जंगल 🌴',
    emoji: '🦖',
    bgGradient: 'from-emerald-600 via-amber-600 to-lime-700',
    roadColor: 'from-amber-800 via-stone-800 to-amber-900',
    trackTheme: 'jungle',
    obstacleEmoji: ['🌿', '🪨', '🥥'],
    collectibleEmoji: '💎'
  },
  {
    id: 'neon_city',
    name: 'Neon City Highway',
    hindiName: 'नियॉन सिटी हाईवे 🌆',
    emoji: '🌆',
    bgGradient: 'from-slate-950 via-purple-950 to-indigo-950',
    roadColor: 'from-slate-900 via-indigo-900 to-slate-950',
    trackTheme: 'neon',
    obstacleEmoji: ['🚧', '🚦', '🛢️'],
    collectibleEmoji: '⚡'
  },
  {
    id: 'candy_wonderland',
    name: 'Sweet Candy Land',
    hindiName: 'कैंडी वंडरलैंड 🍭',
    emoji: '🍬',
    bgGradient: 'from-pink-400 via-rose-300 to-yellow-300',
    roadColor: 'from-rose-500 via-pink-400 to-rose-600',
    trackTheme: 'candy',
    obstacleEmoji: ['🍩', '🧁', '🍪'],
    collectibleEmoji: '🍓'
  }
];
