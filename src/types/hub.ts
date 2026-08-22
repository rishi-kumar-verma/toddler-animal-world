export type AgeCategory = 'all' | '2' | '3' | '4';

export type HubCategory = 
  | 'hub'
  | 'india'
  | 'hindi'
  | 'superheroes'
  | 'music'
  | 'vehicles'
  | 'fruits'
  | 'science'
  | 'math'
  | 'geography'
  | 'history'
  | 'animals';

export interface MusicalInstrument {
  id: string;
  name: string;
  hindiName: string;
  emoji: string;
  imageUrl: string;
  category: 'keyboard' | 'percussion' | 'strings' | 'wind' | 'traditional';
  soundFreq: number;
  funFact: string;
  colorGradient: string;
}

export interface Vehicle {
  id: string;
  name: string;
  hindiName: string;
  emoji: string;
  imageUrl: string;
  category: 'rescue' | 'land' | 'air' | 'water' | 'space';
  soundType: 'siren' | 'horn' | 'jet' | 'train' | 'helicopter' | 'engine';
  funFact: string;
  colorGradient: string;
}

export interface FruitVeggie {
  id: string;
  name: string;
  hindiName: string;
  emoji: string;
  imageUrl: string;
  type: 'fruit' | 'veggie';
  colorName: string;
  taste: string;
  benefit: string;
  colorGradient: string;
}

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
  hindiTitle: string;
  timePeriod: string;
  yearValue: number;
  emoji: string;
  imageUrl: string;
  color: string;
  highlights: string[];
  story: string;
  soundType: 'dino' | 'ancient' | 'sword' | 'steam' | 'rocket' | 'chime';
}

export interface Invention {
  id: string;
  name: string;
  hindiName: string;
  emoji: string;
  imageUrl: string;
  year: string;
  inventorOrEra: string;
  whyAwesome: string;
  impactCategory: 'transport' | 'communication' | 'science' | 'daily';
}

export interface HistoricalFigure {
  id: string;
  name: string;
  hindiName: string;
  title: string;
  era: string;
  emoji: string;
  imageUrl: string;
  quote: string;
  achievement: string;
  color: string;
}
