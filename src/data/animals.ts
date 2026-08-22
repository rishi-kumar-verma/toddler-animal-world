export interface Animal {
  id: string;
  name: string;
  soundName: string;
  emoji: string;
  imageUrl: string;
  bgGradient: string;
  textColor: string;
  borderColor: string;
  ringColor: string;
  babySoundText: string;
}

export const ANIMALS: Animal[] = [
  {
    id: 'cow',
    name: 'Cow',
    soundName: 'Moo~ Moo~',
    emoji: '🐮',
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-amber-100 via-orange-200 to-amber-300',
    textColor: 'text-amber-900',
    borderColor: 'border-amber-400',
    ringColor: 'ring-amber-400',
    babySoundText: 'MOO!'
  },
  {
    id: 'dog',
    name: 'Doggy',
    soundName: 'Woof! Woof!',
    emoji: '🐶',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-yellow-100 via-amber-200 to-yellow-300',
    textColor: 'text-yellow-950',
    borderColor: 'border-yellow-400',
    ringColor: 'ring-yellow-400',
    babySoundText: 'WOOF!'
  },
  {
    id: 'cat',
    name: 'Kitty',
    soundName: 'Meow~ Meow~',
    emoji: '🐱',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-rose-100 via-pink-200 to-rose-300',
    textColor: 'text-rose-900',
    borderColor: 'border-rose-400',
    ringColor: 'ring-rose-400',
    babySoundText: 'MEOW!'
  },
  {
    id: 'duck',
    name: 'Duckie',
    soundName: 'Quack! Quack!',
    emoji: '🦆',
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-amber-200 via-yellow-300 to-lime-300',
    textColor: 'text-amber-950',
    borderColor: 'border-yellow-500',
    ringColor: 'ring-yellow-500',
    babySoundText: 'QUACK!'
  },
  {
    id: 'lion',
    name: 'Lion',
    soundName: 'ROARRR!',
    emoji: '🦁',
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-orange-100 via-amber-200 to-orange-300',
    textColor: 'text-orange-950',
    borderColor: 'border-orange-400',
    ringColor: 'ring-orange-400',
    babySoundText: 'ROAR!'
  },
  {
    id: 'elephant',
    name: 'Elephant',
    soundName: 'Pawoo~!',
    emoji: '🐘',
    imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-slate-200 via-gray-300 to-slate-400',
    textColor: 'text-slate-900',
    borderColor: 'border-slate-400',
    ringColor: 'ring-slate-400',
    babySoundText: 'TRUMPET!'
  },
  {
    id: 'pig',
    name: 'Piggy',
    soundName: 'Oink! Oink!',
    emoji: '🐷',
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-pink-100 via-rose-200 to-pink-300',
    textColor: 'text-pink-950',
    borderColor: 'border-pink-400',
    ringColor: 'ring-pink-400',
    babySoundText: 'OINK!'
  },
  {
    id: 'sheep',
    name: 'Sheep',
    soundName: 'Baa~ Baa~',
    emoji: '🐑',
    imageUrl: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-emerald-100 via-green-200 to-teal-200',
    textColor: 'text-emerald-950',
    borderColor: 'border-emerald-400',
    ringColor: 'ring-emerald-400',
    babySoundText: 'BAA!'
  },
  {
    id: 'rooster',
    name: 'Rooster',
    soundName: 'Cock-a-doodle-doo!',
    emoji: '🐓',
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-red-100 via-amber-200 to-yellow-300',
    textColor: 'text-red-950',
    borderColor: 'border-red-400',
    ringColor: 'ring-red-400',
    babySoundText: 'COCK-A-DOODLE-DOO!'
  },
  {
    id: 'frog',
    name: 'Froggy',
    soundName: 'Ribbit! Ribbit!',
    emoji: '🐸',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-lime-100 via-emerald-200 to-green-300',
    textColor: 'text-emerald-950',
    borderColor: 'border-lime-400',
    ringColor: 'ring-lime-400',
    babySoundText: 'RIBBIT!'
  },
  {
    id: 'monkey',
    name: 'Monkey',
    soundName: 'Ooh Ooh Aah Aah!',
    emoji: '🐵',
    imageUrl: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-amber-200 via-yellow-300 to-orange-300',
    textColor: 'text-amber-950',
    borderColor: 'border-amber-500',
    ringColor: 'ring-amber-500',
    babySoundText: 'OOH-AAH!'
  },
  {
    id: 'owl',
    name: 'Owl',
    soundName: 'Hoo~ Hoo~',
    emoji: '🦉',
    imageUrl: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-indigo-100 via-purple-200 to-indigo-300',
    textColor: 'text-indigo-950',
    borderColor: 'border-indigo-400',
    ringColor: 'ring-indigo-400',
    babySoundText: 'HOO-HOO!'
  },
  {
    id: 'horse',
    name: 'Horse',
    soundName: 'Neigh~!',
    emoji: '🐴',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-stone-200 via-amber-200 to-yellow-200',
    textColor: 'text-stone-900',
    borderColor: 'border-amber-400',
    ringColor: 'ring-amber-400',
    babySoundText: 'NEIGH!'
  },
  {
    id: 'bear',
    name: 'Bear',
    soundName: 'Grrrr~!',
    emoji: '🐻',
    imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-amber-200 via-stone-300 to-amber-400',
    textColor: 'text-stone-950',
    borderColor: 'border-amber-600',
    ringColor: 'ring-amber-600',
    babySoundText: 'GRRR!'
  },
  {
    id: 'bee',
    name: 'Bumblebee',
    soundName: 'Buzzzz~!',
    emoji: '🐝',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-yellow-200 via-amber-300 to-yellow-400',
    textColor: 'text-yellow-950',
    borderColor: 'border-yellow-400',
    ringColor: 'ring-yellow-400',
    babySoundText: 'BUZZ!'
  },
  {
    id: 'dolphin',
    name: 'Dolphin',
    soundName: 'Click-Whistle~!',
    emoji: '🐬',
    imageUrl: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-sky-200 via-blue-300 to-cyan-300',
    textColor: 'text-sky-950',
    borderColor: 'border-sky-400',
    ringColor: 'ring-sky-400',
    babySoundText: 'CLICK!'
  }
];
