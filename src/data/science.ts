import { Planet, Dinosaur, BodyPart } from '../types/hub';

export const PLANETS: Planet[] = [
  {
    id: 'sun',
    name: 'The Sun',
    emoji: '☀️',
    imageUrl: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=500&auto=format&fit=crop&q=80',
    color: 'from-amber-500 to-yellow-400',
    funFact: 'The giant glowing star at the center of our solar system that keeps Earth warm!',
    size: 'Giant Super Star ⭐',
    soundDescription: 'Warm solar flare whoosh',
    temperature: 'Super Hot! 🔥 15 Million °C',
    orderFromSun: 0
  },
  {
    id: 'mercury',
    name: 'Mercury',
    emoji: '🌑',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=500&auto=format&fit=crop&q=80',
    color: 'from-slate-400 to-gray-600',
    funFact: 'The smallest planet and closest to the sun! It zooms super fast in space.',
    size: 'Smallest planet 🔘',
    soundDescription: 'Speedy orbit zip',
    temperature: 'Hot day, freezing night 🌡️',
    orderFromSun: 1
  },
  {
    id: 'venus',
    name: 'Venus',
    emoji: '🌕',
    imageUrl: 'https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?w=500&auto=format&fit=crop&q=80',
    color: 'from-amber-400 to-orange-500',
    funFact: 'The brightest and hottest planet in our night sky! Covered in thick yellow clouds.',
    size: 'Almost same size as Earth 🌍',
    soundDescription: 'Cloudy sizzling wind',
    temperature: 'Hottest Planet! 465 °C 🌋',
    orderFromSun: 2
  },
  {
    id: 'earth',
    name: 'Planet Earth',
    emoji: '🌍',
    imageUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=500&auto=format&fit=crop&q=80',
    color: 'from-blue-500 via-emerald-500 to-sky-400',
    funFact: 'Our home! The only planet with yummy water, fresh air, cute animals, and you!',
    size: 'Our Sweet Home 🏡',
    soundDescription: 'Ocean waves & bird chirps',
    temperature: 'Just perfect for life! 🌸',
    orderFromSun: 3
  },
  {
    id: 'mars',
    name: 'Mars',
    emoji: '🔴',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=500&auto=format&fit=crop&q=80',
    color: 'from-red-600 to-orange-600',
    funFact: 'The Red Planet! It has the biggest volcano in the solar system named Olympus Mons.',
    size: 'Half the size of Earth 🔴',
    soundDescription: 'Red dust storm whir',
    temperature: 'Cold & dusty ❄️',
    orderFromSun: 4
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    emoji: '🪐',
    imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=500&auto=format&fit=crop&q=80',
    color: 'from-amber-600 via-orange-500 to-stone-500',
    funFact: 'The King of Planets! The biggest planet with a giant swirling red storm spot!',
    size: 'Giant King Planet 👑',
    soundDescription: 'Deep cosmic storm rumble',
    temperature: 'Freezing Gas Giant 🌪️',
    orderFromSun: 5
  },
  {
    id: 'saturn',
    name: 'Saturn',
    emoji: '🪐',
    imageUrl: 'https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=500&auto=format&fit=crop&q=80',
    color: 'from-yellow-300 via-amber-400 to-amber-600',
    funFact: 'Famous for its dazzling sparkling rings made of billions of chunks of ice and rock!',
    size: 'Gorgeous Ring Giant 💍',
    soundDescription: 'Crystal icy chime',
    temperature: 'Super Chilly ❄️',
    orderFromSun: 6
  },
  {
    id: 'uranus',
    name: 'Uranus',
    emoji: '🌐',
    imageUrl: 'https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?w=500&auto=format&fit=crop&q=80',
    color: 'from-cyan-400 to-teal-500',
    funFact: 'The sideways rolling ice giant! It spins on its side like a rolling blue ball.',
    size: 'Rolling Ice Giant 🌀',
    soundDescription: 'Sideways wind whistle',
    temperature: 'Freezing Ice -224 °C 🧊',
    orderFromSun: 7
  },
  {
    id: 'neptune',
    name: 'Neptune',
    emoji: '🔵',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=500&auto=format&fit=crop&q=80',
    color: 'from-blue-600 to-indigo-800',
    funFact: 'The deep blue planet with supersonic winds zooming faster than sound across space!',
    size: 'Deep Blue Wind Giant 🌊',
    soundDescription: 'Supersonic jet whoosh',
    temperature: 'Ultra Frozen -218 °C 🌬️',
    orderFromSun: 8
  }
];

export const DINOSAURS: Dinosaur[] = [
  {
    id: 'trex',
    name: 'Tyrannosaurus Rex',
    pronounce: 'Tie-RAN-oh-SORE-us',
    diet: 'Carnivore 🥩',
    emoji: '🦖',
    imageUrl: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=500&auto=format&fit=crop&q=80',
    funFact: 'The mighty king of dinosaurs with teeth as big as bananas and tiny little arms!',
    period: 'Late Cretaceous (66M years ago)',
    size: '12 meters long (As big as a school bus!) 🚌',
    roarType: 't-rex'
  },
  {
    id: 'triceratops',
    name: 'Triceratops',
    pronounce: 'Tri-SERRA-tops',
    diet: 'Herbivore 🌿',
    emoji: '🦏',
    imageUrl: 'https://images.unsplash.com/photo-1525877442103-5ddb2089e2bb?w=500&auto=format&fit=crop&q=80',
    funFact: 'Had 3 giant horns on its face and a big shield frill to protect its friendly family!',
    period: 'Late Cretaceous',
    size: '9 meters long 🌿',
    roarType: 'tricera'
  },
  {
    id: 'brachiosaurus',
    name: 'Brachiosaurus',
    pronounce: 'BRACK-ee-oh-SORE-us',
    diet: 'Herbivore 🌿',
    emoji: '🦕',
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=500&auto=format&fit=crop&q=80',
    funFact: 'A super gentle giant with a neck so tall it could eat leaves from the top of tall trees!',
    period: 'Late Jurassic',
    size: '26 meters long (Tall as a 4-story building!) 🏢',
    roarType: 'brachio'
  },
  {
    id: 'pterodactyl',
    name: 'Pterodactyl',
    pronounce: 'Ter-oh-DAK-till',
    diet: 'Carnivore 🥩',
    emoji: '🦅',
    imageUrl: 'https://images.unsplash.com/photo-1551972251-12070d63502a?w=500&auto=format&fit=crop&q=80',
    funFact: 'A flying reptile with massive leathery wings who swooped across ancient prehistoric skies!',
    period: 'Jurassic Skies',
    size: 'Wingspan of 2 to 10 meters! 🪽',
    roarType: 'pterodactyl'
  },
  {
    id: 'stegosaurus',
    name: 'Stegosaurus',
    pronounce: 'Steg-oh-SORE-us',
    diet: 'Herbivore 🌿',
    emoji: '🐢',
    imageUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=500&auto=format&fit=crop&q=80',
    funFact: 'Had diamond plates along its back and four spikes on its tail called a thagomizer!',
    period: 'Late Jurassic',
    size: 'Brain the size of a walnut! 🥜',
    roarType: 'tricera'
  }
];

export const BODY_PARTS: BodyPart[] = [
  {
    id: 'heart',
    name: 'The Heart',
    emoji: '❤️',
    imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=500&auto=format&fit=crop&q=80',
    fact: 'Your heart beats like a super drum, pumping fresh oxygen and blood all through your body!',
    action: 'Thump... Thump... Thump!',
    sound: 'heart'
  },
  {
    id: 'brain',
    name: 'The Brain',
    emoji: '🧠',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&auto=format&fit=crop&q=80',
    fact: 'Your brain is your supercomputer! It helps you think, dream, learn, and play games.',
    action: 'Sparkle idea magic! ✨',
    sound: 'brain'
  },
  {
    id: 'eyes',
    name: 'The Eyes',
    emoji: '👀',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=80',
    fact: 'Your eyes take colorful pictures of the world and let you see puppies, stars, and rainbows!',
    action: 'Blink! Blink! 🌟',
    sound: 'blink'
  },
  {
    id: 'ears',
    name: 'The Ears',
    emoji: '👂',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
    fact: 'Your ears catch sound waves so you can hear music, giggles, and bird songs!',
    action: 'Listen to the music! 🎵',
    sound: 'blink'
  },
  {
    id: 'muscles',
    name: 'The Muscles',
    emoji: '💪',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=80',
    fact: 'Muscles let you run, jump high in the air, climb, dance, and give giant bear hugs!',
    action: 'Flex your super power! 💥',
    sound: 'flex'
  }
];

export const SCIENCE_EXPERIMENTS = [
  {
    id: 'volcano',
    name: 'Volcano Lava Burst',
    emoji: '🌋',
    imageUrl: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=500&auto=format&fit=crop&q=80',
    tagline: 'Melted rock bubbling from Earth deep inside!',
    funFact: 'Baking soda + vinegar causes fizzy bubbly red lava eruption!',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'rainbow',
    name: 'Rainbow Color Light',
    emoji: '🌈',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
    tagline: 'Sunlight shining through raindrops splits into 7 vibrant colors!',
    funFact: 'Red, Orange, Yellow, Green, Blue, Indigo, Violet!',
    color: 'from-purple-400 via-pink-400 to-yellow-300'
  },
  {
    id: 'magnet',
    name: 'Magic Magnets',
    emoji: '🧲',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
    tagline: 'Invisible magnetic force attracts iron and steel objects!',
    funFact: 'Opposite poles attract (North + South pull together)!',
    color: 'from-blue-500 to-red-500'
  },
  {
    id: 'plant',
    name: 'Growing Little Seed',
    emoji: '🌱',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&auto=format&fit=crop&q=80',
    tagline: 'Plants drink water and soak sunshine to grow into giant sunflowers!',
    funFact: 'Photosynthesis makes yummy fresh oxygen for us to breathe!',
    color: 'from-emerald-400 to-green-600'
  }
];
