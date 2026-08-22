import { HistoryEra, Invention } from '../types/hub';

export const HISTORY_ERAS: HistoryEra[] = [
  {
    id: 'dinosaurs',
    title: 'Prehistoric Dinosaur Age',
    timePeriod: '65 Million Years Ago',
    emoji: '🦖',
    imageUrl: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=500&auto=format&fit=crop&q=80',
    color: 'from-amber-600 to-emerald-700',
    highlights: ['Giant Dinosaurs 🦕', 'Pterodactyls in the sky 🦅', 'Lush Fern Forests 🌿'],
    story: 'Long before cars or towns, giant prehistoric creatures ruled the Earth under sunny skies!'
  },
  {
    id: 'egypt',
    title: 'Ancient Egypt & Pyramids',
    timePeriod: '4,500 Years Ago',
    emoji: '🏛️',
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=500&auto=format&fit=crop&q=80',
    color: 'from-yellow-500 via-amber-600 to-orange-700',
    highlights: ['Pharaohs with Gold Masks 👑', 'Sphinx Guardian 🦁', 'Secret Hieroglyphic codes 📜'],
    story: 'People built magnificent stone pyramids near the Nile river and painted pictures on temple walls!'
  },
  {
    id: 'medieval',
    title: 'Knights & Castles',
    timePeriod: '1,000 Years Ago',
    emoji: '🏰',
    imageUrl: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=500&auto=format&fit=crop&q=80',
    color: 'from-blue-600 via-slate-700 to-indigo-800',
    highlights: ['Shining Armor & Shields 🛡️', 'Drawbridges & Moats 🌊', 'Brave Royal Knights 🏇'],
    story: 'Knights wore clinking suits of steel armor and lived in grand stone castles with tall towers!'
  },
  {
    id: 'inventions',
    title: 'Age of Great Inventions',
    timePeriod: '1800s - 1900s',
    emoji: '💡',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80',
    color: 'from-emerald-500 via-teal-600 to-sky-700',
    highlights: ['Steam Trains 🚂', 'Lightbulbs Glowing 💡', 'First Flying Airplanes ✈️'],
    story: 'Creative inventors built machines that lit up the night and helped people travel across continents!'
  },
  {
    id: 'space_age',
    title: 'Space Age & Moon Landing',
    timePeriod: '1969 to Present',
    emoji: '🚀',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=500&auto=format&fit=crop&q=80',
    color: 'from-indigo-600 via-purple-700 to-slate-950',
    highlights: ['Apollo Moon Rocket 🚀', 'Walking on the Moon 🌕', 'Space Station Labs 🛰️'],
    story: 'Brave astronauts zoomed into outer space on giant rockets and walked on the dusty Moon!'
  }
];

export const INVENTIONS: Invention[] = [
  {
    id: 'wheel',
    name: 'The Wheel',
    emoji: '🛞',
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=80',
    year: '5,000 BC',
    inventorOrEra: 'Ancient Builders',
    whyAwesome: 'Allowed carts, bicycles, and cars to roll smoothly across the land!'
  },
  {
    id: 'lightbulb',
    name: 'The Electric Lightbulb',
    emoji: '💡',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80',
    year: '1879',
    inventorOrEra: 'Thomas Edison',
    whyAwesome: 'Turned dark nights into bright, warm light with the flip of a switch!'
  },
  {
    id: 'airplane',
    name: 'The Flying Airplane',
    emoji: '✈️',
    imageUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4fff16def?w=500&auto=format&fit=crop&q=80',
    year: '1903',
    inventorOrEra: 'Wright Brothers',
    whyAwesome: 'Gave humans wings to fly above fluffy clouds and travel across oceans in hours!'
  },
  {
    id: 'rocket',
    name: 'Space Rocket',
    emoji: '🚀',
    imageUrl: 'https://images.unsplash.com/photo-1517976487507-5b3a4a259c7c?w=500&auto=format&fit=crop&q=80',
    year: '1969',
    inventorOrEra: 'NASA Apollo Team',
    whyAwesome: 'Launched brave humans into space to land on the Moon and explore distant planets!'
  }
];
