export type AgeCategory = 'all' | '2' | '3' | '4';

export type HubCategory = 
  | 'hub'
  | 'india'
  | 'hindi'
  | 'superheroes'
  | 'science'
  | 'math'
  | 'geography'
  | 'history'
  | 'animals';

export interface IndianState {
  id: string;
  name: string;
  hindiName: string;
  capital: string;
  emoji: string;
  imageUrl: string;
  famousFor: string;
  monument: string;
  food: string;
  colorGradient: string;
  borderColor: string;
}

export interface FamousCity {
  id: string;
  name: string;
  state: string;
  nickname: string;
  emoji: string;
  imageUrl: string;
  highlight: string;
  fact: string;
}

export interface FreedomFighter {
  id: string;
  name: string;
  title: string;
  slogan: string;
  emoji: string;
  imageUrl: string;
  contribution: string;
  colorGradient: string;
  borderColor: string;
}

export interface HindiLetter {
  id: string;
  letter: string;
  pronunciation: string;
  word: string;
  meaning: string;
  emoji: string;
  imageUrl: string;
  type: 'swar' | 'vyanjan';
  colorGradient: string;
  borderColor: string;
}

export interface HindiNumber {
  hindiNum: string;
  englishNum: number;
  word: string;
  pronunciation: string;
  emoji: string;
  color: string;
}

export interface Superhero {
  id: string;
  name: string;
  alias: string;
  power: string;
  quote: string;
  emoji: string;
  imageUrl: string;
  colorGradient: string;
  accentColor: string;
  borderColor: string;
  symbol: string;
  soundType: 'laser' | 'thunder' | 'smash' | 'web' | 'shield' | 'magic' | 'roar' | 'claw' | 'groot' | 'arrow' | 'shrink' | 'gauntlet' | 'jetpack' | 'hex';
  age: AgeCategory[];
  description: string;
  actionMove: string;
}

export interface Planet {
  id: string;
  name: string;
  emoji: string;
  imageUrl: string;
  color: string;
  funFact: string;
  size: string;
  soundDescription: string;
  temperature: string;
  orderFromSun: number;
}

export interface Dinosaur {
  id: string;
  name: string;
  pronounce: string;
  diet: 'Herbivore 🌿' | 'Carnivore 🥩' | 'Omnivore 🍓🥩';
  emoji: string;
  imageUrl: string;
  funFact: string;
  period: string;
  size: string;
  roarType: 't-rex' | 'pterodactyl' | 'brachio' | 'tricera';
}

export interface BodyPart {
  id: string;
  name: string;
  emoji: string;
  imageUrl: string;
  fact: string;
  action: string;
  sound: 'heart' | 'brain' | 'blink' | 'sniff' | 'flex';
}

export interface ShapeItem {
  id: string;
  name: string;
  emoji: string;
  color: string;
  sides: number;
}

export interface Continent {
  id: string;
  name: string;
  emoji: string;
  imageUrl: string;
  animals: string[];
  landmark: string;
  landmarkEmoji: string;
  funFact: string;
  bgColor: string;
}

export interface WorldLandmark {
  id: string;
  name: string;
  country: string;
  emoji: string;
  flag: string;
  imageUrl: string;
  fact: string;
}

export interface HistoryEra {
  id: string;
  title: string;
  timePeriod: string;
  emoji: string;
  imageUrl: string;
  color: string;
  highlights: string[];
  story: string;
}

export interface Invention {
  id: string;
  name: string;
  emoji: string;
  imageUrl: string;
  year: string;
  inventorOrEra: string;
  whyAwesome: string;
}
