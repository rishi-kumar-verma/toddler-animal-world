export interface Animal {
  id: string;
  name: string;
  soundName: string;
  emoji: string;
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
    bgGradient: 'from-amber-200 via-yellow-300 to-lime-300',
    textColor: 'text-amber-950',
    borderColor: 'border-yellow-500',
    ringColor: 'ring-yellow-500',
    babySoundText: 'QUACK!'
  },
  {
    id: 'lion',
    name: 'Lion',
    soundName: 'Roar~!',
    emoji: '🦁',
    bgGradient: 'from-orange-200 via-amber-300 to-red-300',
    textColor: 'text-orange-950',
    borderColor: 'border-orange-500',
    ringColor: 'ring-orange-500',
    babySoundText: 'ROAR!'
  },
  {
    id: 'elephant',
    name: 'Elephant',
    soundName: 'Pawoo~!',
    emoji: '🐘',
    bgGradient: 'from-sky-100 via-blue-200 to-indigo-200',
    textColor: 'text-blue-950',
    borderColor: 'border-sky-400',
    ringColor: 'ring-sky-400',
    babySoundText: 'TRUMPET!'
  },
  {
    id: 'pig',
    name: 'Piggy',
    soundName: 'Oink! Oink!',
    emoji: '🐷',
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
    bgGradient: 'from-emerald-100 via-teal-200 to-cyan-200',
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
    bgGradient: 'from-red-100 via-orange-200 to-yellow-200',
    textColor: 'text-red-950',
    borderColor: 'border-red-400',
    ringColor: 'ring-red-400',
    babySoundText: 'COCK-A-DOODLE!'
  },
  {
    id: 'frog',
    name: 'Froggy',
    soundName: 'Ribbit! Ribbit!',
    emoji: '🐸',
    bgGradient: 'from-lime-100 via-green-200 to-emerald-300',
    textColor: 'text-green-950',
    borderColor: 'border-lime-500',
    ringColor: 'ring-lime-500',
    babySoundText: 'RIBBIT!'
  },
  {
    id: 'monkey',
    name: 'Monkey',
    soundName: 'Oo-oo Ah-ah!',
    emoji: '🐵',
    bgGradient: 'from-amber-200 via-yellow-200 to-amber-400',
    textColor: 'text-amber-950',
    borderColor: 'border-amber-500',
    ringColor: 'ring-amber-500',
    babySoundText: 'OO-OO AH-AH!'
  },
  {
    id: 'owl',
    name: 'Owl',
    soundName: 'Hoot! Hoot!',
    emoji: '🦉',
    bgGradient: 'from-purple-100 via-indigo-200 to-violet-300',
    textColor: 'text-purple-950',
    borderColor: 'border-purple-400',
    ringColor: 'ring-purple-400',
    babySoundText: 'HOOT!'
  },
  {
    id: 'horse',
    name: 'Horsey',
    soundName: 'Neigh~!',
    emoji: '🐴',
    bgGradient: 'from-orange-100 via-amber-200 to-stone-300',
    textColor: 'text-amber-950',
    borderColor: 'border-amber-600',
    ringColor: 'ring-amber-600',
    babySoundText: 'NEIGH!'
  },
  {
    id: 'bear',
    name: 'Bear',
    soundName: 'Grrr~!',
    emoji: '🐻',
    bgGradient: 'from-stone-200 via-amber-200 to-yellow-300',
    textColor: 'text-stone-900',
    borderColor: 'border-stone-400',
    ringColor: 'ring-stone-400',
    babySoundText: 'GRRR!'
  },
  {
    id: 'bee',
    name: 'Buzzy Bee',
    soundName: 'Bzzzz~!',
    emoji: '🐝',
    bgGradient: 'from-yellow-200 via-amber-300 to-yellow-400',
    textColor: 'text-yellow-950',
    borderColor: 'border-yellow-500',
    ringColor: 'ring-yellow-500',
    babySoundText: 'BZZZZ!'
  },
  {
    id: 'dolphin',
    name: 'Dolphin',
    soundName: 'Click! Click!',
    emoji: '🐬',
    bgGradient: 'from-cyan-100 via-sky-200 to-blue-300',
    textColor: 'text-cyan-950',
    borderColor: 'border-cyan-400',
    ringColor: 'ring-cyan-400',
    babySoundText: 'SPLASH!'
  }
];
