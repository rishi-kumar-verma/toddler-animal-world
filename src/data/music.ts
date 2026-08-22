import { MusicalInstrument } from '../types/hub';

export const PIANO_KEYS = [
  { note: 'Sa / C', freq: 261.63, color: 'bg-red-500', name: 'C4' },
  { note: 'Re / D', freq: 293.66, color: 'bg-orange-500', name: 'D4' },
  { note: 'Ga / E', freq: 329.63, color: 'bg-yellow-500', name: 'E4' },
  { note: 'Ma / F', freq: 349.23, color: 'bg-emerald-500', name: 'F4' },
  { note: 'Pa / G', freq: 392.00, color: 'bg-teal-500', name: 'G4' },
  { note: 'Dha / A', freq: 440.00, color: 'bg-blue-500', name: 'A4' },
  { note: 'Ni / B', freq: 493.88, color: 'bg-indigo-500', name: 'B4' },
  { note: 'Sa / C High', freq: 523.25, color: 'bg-purple-500', name: 'C5' }
];

export const INSTRUMENTS: MusicalInstrument[] = [
  {
    id: 'piano',
    name: 'Grand Piano',
    hindiName: 'पियानो',
    emoji: '🎹',
    imageUrl: 'https://images.unsplash.com/photo-1520523839898-5071282543e1?w=500&auto=format&fit=crop&q=80',
    category: 'keyboard',
    soundFreq: 261.63,
    funFact: 'Has 88 black and white keys that strike tiny felt hammers to make sweet melodies!',
    colorGradient: 'from-slate-900 via-indigo-950 to-slate-800'
  },
  {
    id: 'drums',
    name: 'Drum Kit',
    hindiName: 'ड्रम / ढोलक',
    emoji: '🥁',
    imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=500&auto=format&fit=crop&q=80',
    category: 'percussion',
    soundFreq: 120.0,
    funFact: 'Keep the exciting rhythm and dance beat with wooden drumsticks and cymbals!',
    colorGradient: 'from-amber-600 via-red-600 to-rose-700'
  },
  {
    id: 'guitar',
    name: 'Acoustic Guitar',
    hindiName: 'गिटार',
    emoji: '🎸',
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop&q=80',
    category: 'strings',
    soundFreq: 330.0,
    funFact: 'Strum its 6 vibrating strings to make warm, happy campfire acoustic songs!',
    colorGradient: 'from-amber-500 via-orange-600 to-yellow-600'
  },
  {
    id: 'tabla',
    name: 'Indian Tabla',
    hindiName: 'तबला',
    emoji: '🪘',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&auto=format&fit=crop&q=80',
    category: 'traditional',
    soundFreq: 200.0,
    funFact: 'Twin Indian hand drums (Dayan & Bayan) that make magical "Dha-Dhin-Dha" rhythms!',
    colorGradient: 'from-amber-700 via-yellow-700 to-orange-800'
  },
  {
    id: 'flute',
    name: 'Bansuri Flute',
    hindiName: 'बांसुरी',
    emoji: '🪈',
    imageUrl: 'https://images.unsplash.com/photo-1520523839898-5071282543e1?w=500&auto=format&fit=crop&q=80',
    category: 'wind',
    soundFreq: 587.33,
    funFact: 'Made of natural bamboo reed, blows soothing, gentle bird-like whistling sounds!',
    colorGradient: 'from-emerald-500 via-teal-600 to-cyan-700'
  },
  {
    id: 'trumpet',
    name: 'Brass Trumpet',
    hindiName: 'तुरही',
    emoji: '🎺',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&auto=format&fit=crop&q=80',
    category: 'wind',
    soundFreq: 440.0,
    funFact: 'Shiny golden brass horn that plays loud royal fanfare celebrations!',
    colorGradient: 'from-yellow-400 via-amber-500 to-orange-500'
  },
  {
    id: 'violin',
    name: 'Violin',
    hindiName: 'वायलिन / सारंगी',
    emoji: '🎻',
    imageUrl: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=500&auto=format&fit=crop&q=80',
    category: 'strings',
    soundFreq: 659.25,
    funFact: 'Played by sliding a horsehair bow gently across 4 shiny strings for sweet singing notes!',
    colorGradient: 'from-amber-800 via-rose-900 to-slate-950'
  },
  {
    id: 'xylophone',
    name: 'Rainbow Xylophone',
    hindiName: 'जलोतरंग',
    emoji: '🌈',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80',
    category: 'percussion',
    soundFreq: 523.25,
    funFact: 'Features rainbow metal bars that chime like crystal bells when tapped with mallets!',
    colorGradient: 'from-pink-500 via-purple-500 to-indigo-600'
  }
];
