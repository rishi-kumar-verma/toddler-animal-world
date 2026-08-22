import { Vehicle } from '../types/hub';

export const VEHICLES: Vehicle[] = [
  {
    id: 'firetruck',
    name: 'Fire Truck',
    hindiName: 'दमकल गाड़ी',
    emoji: '🚒',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=80',
    category: 'rescue',
    soundType: 'siren',
    funFact: 'Rushes to put out fires with long extension ladders and powerful water hoses!',
    colorGradient: 'from-red-600 via-rose-600 to-amber-600'
  },
  {
    id: 'policecar',
    name: 'Police Car',
    hindiName: 'पुलिस गाड़ी',
    emoji: '🚓',
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&auto=format&fit=crop&q=80',
    category: 'rescue',
    soundType: 'siren',
    funFact: 'Flashes red and blue glowing lights to keep the city neighborhoods safe!',
    colorGradient: 'from-blue-600 via-indigo-700 to-slate-900'
  },
  {
    id: 'ambulance',
    name: 'Ambulance',
    hindiName: 'एम्बुलेंस',
    emoji: '🚑',
    imageUrl: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=500&auto=format&fit=crop&q=80',
    category: 'rescue',
    soundType: 'siren',
    funFact: 'Speeds to help sick people with kind doctors and medical stretchers inside!',
    colorGradient: 'from-emerald-500 via-teal-600 to-cyan-600'
  },
  {
    id: 'train',
    name: 'Steam Engine Train',
    hindiName: 'रेलगाड़ी',
    emoji: '🚂',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=500&auto=format&fit=crop&q=80',
    category: 'land',
    soundType: 'train',
    funFact: 'Chugga-chugga Choo-choo! Rolls on steel tracks carrying passengers across mountains!',
    colorGradient: 'from-amber-600 via-orange-600 to-slate-900'
  },
  {
    id: 'airplane',
    name: 'Jet Airplane',
    hindiName: 'हवाई जहाज़',
    emoji: '✈️',
    imageUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4fff16def?w=500&auto=format&fit=crop&q=80',
    category: 'air',
    soundType: 'jet',
    funFact: 'Zooms above white fluffy clouds across oceans at 500 miles per hour!',
    colorGradient: 'from-sky-500 via-blue-600 to-indigo-700'
  },
  {
    id: 'helicopter',
    name: 'Rescue Helicopter',
    hindiName: 'हेलिकॉप्टर',
    emoji: '🚁',
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&auto=format&fit=crop&q=80',
    category: 'air',
    soundType: 'helicopter',
    funFact: 'Spins big top rotor blades (Chop-Chop-Chop!) to take off straight up into the sky!',
    colorGradient: 'from-amber-500 via-yellow-500 to-orange-600'
  },
  {
    id: 'schoolbus',
    name: 'Yellow School Bus',
    hindiName: 'स्कूल बस',
    emoji: '🚌',
    imageUrl: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=500&auto=format&fit=crop&q=80',
    category: 'land',
    soundType: 'horn',
    funFact: 'Beep beep! Picks up smiling kids in the morning and plays Wheels on the Bus!',
    colorGradient: 'from-yellow-400 via-amber-500 to-orange-500'
  },
  {
    id: 'excavator',
    name: 'Digger & Excavator',
    hindiName: 'जेसीबी / खुदाई मशीन',
    emoji: '🚜',
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=500&auto=format&fit=crop&q=80',
    category: 'land',
    soundType: 'engine',
    funFact: 'Uses a giant steel claw shovel to scoop huge mounds of dirt and rocks!',
    colorGradient: 'from-yellow-500 via-orange-600 to-amber-700'
  },
  {
    id: 'speedboat',
    name: 'Ocean Speedboat',
    hindiName: 'नाव / स्पीडबोट',
    emoji: '🚤',
    imageUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=500&auto=format&fit=crop&q=80',
    category: 'water',
    soundType: 'engine',
    funFact: 'Glides across sparkling ocean waves creating white splashing foam trails!',
    colorGradient: 'from-cyan-500 via-teal-600 to-blue-700'
  },
  {
    id: 'rocket',
    name: 'Space Rocket',
    hindiName: 'अंतरिक्ष रॉकेट',
    emoji: '🚀',
    imageUrl: 'https://images.unsplash.com/photo-1517976487507-5b3a4a259c7c?w=500&auto=format&fit=crop&q=80',
    category: 'space',
    soundType: 'jet',
    funFact: 'Shoots bright fire out the bottom to blast astronauts into outer space!',
    colorGradient: 'from-indigo-600 via-purple-700 to-slate-950'
  }
];
