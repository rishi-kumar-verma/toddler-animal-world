import { ShapeItem } from '../types/hub';

export const SHAPES_DATA: ShapeItem[] = [
  { id: 'circle', name: 'Circle', emoji: '🔴', color: 'bg-rose-500 text-rose-100', sides: 0 },
  { id: 'star', name: 'Star', emoji: '⭐', color: 'bg-yellow-400 text-yellow-950', sides: 5 },
  { id: 'heart', name: 'Heart', emoji: '💖', color: 'bg-pink-500 text-pink-100', sides: 0 },
  { id: 'triangle', name: 'Triangle', emoji: '🔺', color: 'bg-emerald-500 text-emerald-100', sides: 3 },
  { id: 'square', name: 'Square', emoji: '🟦', color: 'bg-blue-500 text-blue-100', sides: 4 },
  { id: 'diamond', name: 'Diamond', emoji: '💎', color: 'bg-cyan-400 text-cyan-950', sides: 4 },
];

export const COUNTING_ITEMS = [
  { id: 'apples', name: 'Crispy Apple', emoji: '🍎', color: 'text-red-500' },
  { id: 'bananas', name: 'Sweet Banana', emoji: '🍌', color: 'text-yellow-500' },
  { id: 'strawberries', name: 'Juicy Strawberry', emoji: '🍓', color: 'text-rose-500' },
  { id: 'cookies', name: 'Yummy Cookie', emoji: '🍪', color: 'text-amber-600' },
  { id: 'fish', name: 'Tasty Fish', emoji: '🐟', color: 'text-sky-500' },
  { id: 'carrots', name: 'Crunchy Carrot', emoji: '🥕', color: 'text-orange-500' },
];

export const MATH_ADDITION_PROBLEMS = [
  { num1: 1, num2: 1, item: '⭐', name: 'Stars' },
  { num1: 2, num2: 1, item: '🍎', name: 'Apples' },
  { num1: 2, num2: 2, item: '🐱', name: 'Kitties' },
  { num1: 3, num2: 1, item: '🎈', name: 'Balloons' },
  { num1: 3, num2: 2, item: '🚗', name: 'Cars' },
  { num1: 4, num2: 1, item: '🐶', name: 'Puppies' },
  { num1: 2, num2: 3, item: '🍪', name: 'Cookies' },
  { num1: 5, num2: 2, item: '🚀', name: 'Rockets' },
];
