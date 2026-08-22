import { Continent, WorldLandmark } from '../types/hub';

export const CONTINENTS: Continent[] = [
  {
    id: 'africa',
    name: 'Africa',
    emoji: '🌍',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&auto=format&fit=crop&q=80',
    animals: ['🦁 Lion', '🐘 Elephant', '🦒 Giraffe', '🦓 Zebra'],
    landmark: 'Great Pyramids of Giza',
    landmarkEmoji: '🏛️',
    funFact: 'Home to the giant Sahara Desert and the long Nile River with lots of wild savannah animals!',
    bgColor: 'from-amber-500 via-orange-600 to-yellow-600'
  },
  {
    id: 'asia',
    name: 'Asia',
    emoji: '🌏',
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=500&auto=format&fit=crop&q=80',
    animals: ['🐼 Giant Panda', '🐯 Bengal Tiger', '🦚 Peacock', '🐒 Snow Monkey'],
    landmark: 'Great Wall of China & Taj Mahal',
    landmarkEmoji: '🏯',
    funFact: 'The largest continent on Earth with Mount Everest, the tallest mountain in the world!',
    bgColor: 'from-rose-500 via-red-600 to-pink-600'
  },
  {
    id: 'europe',
    name: 'Europe',
    emoji: '🏰',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop&q=80',
    animals: ['🦌 Red Deer', '🦊 Red Fox', '🦔 Hedgehog', '🦉 Barn Owl'],
    landmark: 'Eiffel Tower & Fairy Tale Castles',
    landmarkEmoji: '🗼',
    funFact: 'Filled with ancient fairy tale castles, snowy Alps mountains, and lovely cities!',
    bgColor: 'from-blue-500 via-indigo-600 to-sky-600'
  },
  {
    id: 'north_america',
    name: 'North America',
    emoji: '🦅',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80',
    animals: ['🐻 Grizzly Bear', '🦅 Bald Eagle', '🦬 Bison', '🐺 Wolf'],
    landmark: 'Statue of Liberty & Grand Canyon',
    landmarkEmoji: '🗽',
    funFact: 'Has giant Redwood trees as tall as skyscrapers and the Grand Canyon!',
    bgColor: 'from-emerald-500 via-teal-600 to-green-600'
  },
  {
    id: 'south_america',
    name: 'South America',
    emoji: '🦜',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
    animals: ['🦜 Scarlet Macaw', '🐆 Jaguar', '🦥 Sloth', '🦙 Llama'],
    landmark: 'Amazon Rainforest & Machu Picchu',
    landmarkEmoji: '🌴',
    funFact: 'Home to the lush Amazon Rainforest, the biggest green jungle on Earth!',
    bgColor: 'from-lime-500 via-emerald-600 to-green-700'
  },
  {
    id: 'australia',
    name: 'Australia',
    emoji: '🦘',
    imageUrl: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=500&auto=format&fit=crop&q=80',
    animals: ['🦘 Kangaroo', '🐨 Koala', '🦆 Platypus', '🦈 Great White Shark'],
    landmark: 'Sydney Opera House & Great Barrier Reef',
    landmarkEmoji: '⛵',
    funFact: 'The island continent where kangaroos hop and koalas snuggle eucalyptus trees!',
    bgColor: 'from-orange-500 via-amber-600 to-red-500'
  },
  {
    id: 'antarctica',
    name: 'Antarctica',
    emoji: '❄️',
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=500&auto=format&fit=crop&q=80',
    animals: ['🐧 Emperor Penguin', '🦭 Leopard Seal', '🐋 Blue Whale', '🐦 Albatross'],
    landmark: 'Giant Blue Glaciers & Icebergs',
    landmarkEmoji: '🏔️',
    funFact: 'The coldest, windiest, and iciest place on Earth, home to friendly emperor penguins!',
    bgColor: 'from-cyan-400 via-sky-500 to-blue-600'
  }
];

export const WORLD_LANDMARKS: WorldLandmark[] = [
  {
    id: 'pyramids',
    name: 'Great Pyramids of Giza',
    country: 'Egypt',
    emoji: '🏛️',
    flag: '🇪🇬',
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=500&auto=format&fit=crop&q=80',
    fact: 'Built thousands of years ago out of giant limestone blocks by ancient pharaohs!'
  },
  {
    id: 'eiffel',
    name: 'Eiffel Tower',
    country: 'France',
    emoji: '🗼',
    flag: '🇫🇷',
    imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=500&auto=format&fit=crop&q=80',
    fact: 'A towering iron landmark in Paris that sparkles with golden lights every evening!'
  },
  {
    id: 'tajmahal',
    name: 'Taj Mahal',
    country: 'India',
    emoji: '🕌',
    flag: '🇮🇳',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&auto=format&fit=crop&q=80',
    fact: 'A stunning white marble palace surrounded by reflecting fountains and gardens!'
  },
  {
    id: 'greatwall',
    name: 'Great Wall of China',
    country: 'China',
    emoji: '🏯',
    flag: '🇨🇳',
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=500&auto=format&fit=crop&q=80',
    fact: 'A winding wall so long it stretches over mountains, deserts, and valleys for thousands of miles!'
  },
  {
    id: 'statueliberty',
    name: 'Statue of Liberty',
    country: 'USA',
    emoji: '🗽',
    flag: '🇺🇸',
    imageUrl: 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=500&auto=format&fit=crop&q=80',
    fact: 'A copper statue holding a torch of freedom welcoming travelers from all over the world!'
  }
];

export const OCEAN_CREATURES = [
  { id: 'whale', name: 'Blue Whale', emoji: '🐋', imageUrl: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=500&auto=format&fit=crop&q=80', depth: 'Sunlight Zone ☀️', soundFact: 'The largest animal on planet Earth, bigger than 3 school buses!' },
  { id: 'dolphin', name: 'Playful Dolphin', emoji: '🐬', imageUrl: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=500&auto=format&fit=crop&q=80', depth: 'Sunlight Zone ☀️', soundFact: 'Dolphins love doing backflips and clicking to their ocean friends!' },
  { id: 'turtle', name: 'Sea Turtle', emoji: '🐢', imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&auto=format&fit=crop&q=80', depth: 'Coral Reef 🪸', soundFact: 'Sea turtles glide gracefully through coral reefs and live over 100 years!' },
  { id: 'clownfish', name: 'Clownfish', emoji: '🐠', imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&auto=format&fit=crop&q=80', depth: 'Coral Reef 🪸', soundFact: 'Lives safely inside soft sea anemones with bright vibrant orange stripes!' },
  { id: 'octopus', name: 'Smart Octopus', emoji: '🐙', imageUrl: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=500&auto=format&fit=crop&q=80', depth: 'Twilight Zone 🌊', soundFact: 'Has 8 flexible arms, 3 hearts, and can camouflage like magic!' },
  { id: 'jellyfish', name: 'Glowing Jellyfish', emoji: '🪼', imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&auto=format&fit=crop&q=80', depth: 'Midnight Zone 🌌', soundFact: 'Glows in the dark deep sea like floating fairy lights in the deep blue ocean!' },
];
