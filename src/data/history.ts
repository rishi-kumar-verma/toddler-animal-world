import { HistoryEra, Invention, HistoricalFigure } from '../types/hub';

export const HISTORY_ERAS: HistoryEra[] = [
  {
    id: 'stone_age',
    title: 'Prehistoric Stone Age & Cave Paintings',
    hindiTitle: 'पाषाण युग (Stone Age)',
    timePeriod: '30,000 BCE',
    yearValue: -30000,
    emoji: '🦣',
    imageUrl: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=500&auto=format&fit=crop&q=80',
    color: 'from-amber-700 via-amber-800 to-stone-950',
    highlights: ['Giant Woolly Mammoths 🦣', 'Fire Discovery 🔥', 'Handprint Cave Paintings 🎨'],
    story: 'Early humans lived in cozy stone caves, gathered around warm campfires, and painted vivid animals on cave walls!',
    soundType: 'dino'
  },
  {
    id: 'indus_valley',
    title: 'Indus Valley Civilization (Harappa & Mohenjo-daro)',
    hindiTitle: 'सिंधु घाटी सभ्यता',
    timePeriod: '2500 BCE',
    yearValue: -2500,
    emoji: '🏺',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=80',
    color: 'from-amber-600 via-yellow-700 to-orange-800',
    highlights: ['Planned Brick Cities 🧱', 'The Great Bath 🌊', 'Bronze Dancing Girl & Seals 🪷'],
    story: 'One of the world\'s earliest peaceful civilizations with neat wide streets, baked brick houses, and advanced covered drains!',
    soundType: 'ancient'
  },
  {
    id: 'egypt',
    title: 'Ancient Egypt & The Great Pyramids',
    hindiTitle: 'प्राचीन मिस्र और पिरामिड',
    timePeriod: '2500 BCE',
    yearValue: -2500,
    emoji: '🏛️',
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=500&auto=format&fit=crop&q=80',
    color: 'from-yellow-500 via-amber-600 to-orange-700',
    highlights: ['Pharaohs with Gold Masks 👑', 'Sphinx Guardian 🦁', 'Secret Hieroglyphic codes 📜'],
    story: 'People built magnificent stone pyramids near the Nile river and painted pictures on temple walls!',
    soundType: 'ancient'
  },
  {
    id: 'greece',
    title: 'Ancient Greece & The First Olympic Games',
    hindiTitle: 'प्राचीन यूनान और ओलंपिक',
    timePeriod: '776 BCE',
    yearValue: -776,
    emoji: '🏛️',
    imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=500&auto=format&fit=crop&q=80',
    color: 'from-sky-500 via-blue-600 to-indigo-800',
    highlights: ['Parthenon White Temple 🏛️', 'Olive Wreath Crowns 🌿', 'First Olympic Races 🏃‍♂️'],
    story: 'Athletes ran races under Greek marble temples and philosophers gathered to learn mathematics, stars, and drama!',
    soundType: 'chime'
  },
  {
    id: 'rome',
    title: 'The Roman Empire & The Colosseum',
    hindiTitle: 'रोमन साम्राज्य और कोलोसियम',
    timePeriod: '27 BCE - 476 CE',
    yearValue: -27,
    emoji: '🏟️',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&auto=format&fit=crop&q=80',
    color: 'from-red-600 via-rose-700 to-amber-700',
    highlights: ['Grand Colosseum Arena 🏟️', 'Gladiator Shields 🛡️', 'Paved Stone Roman Roads 🛣️'],
    story: 'Brave Roman citizens built grand arched aqueducts that carried fresh water for miles and vast stone arenas!',
    soundType: 'sword'
  },
  {
    id: 'golden_india',
    title: 'Golden Age of India (Gupta & Chola Dynasties)',
    hindiTitle: 'भारत का स्वर्ण युग',
    timePeriod: '320 - 1050 CE',
    yearValue: 320,
    emoji: '🛕',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&auto=format&fit=crop&q=80',
    color: 'from-amber-400 via-orange-500 to-yellow-600',
    highlights: ['Nalanda University 📜', 'Aryabhata Zero & Astronomy 🌟', 'Towering Stone Temples 🛕'],
    story: 'Scholars flocked to Nalanda University from around the world to study mathematics, zero, Ayurveda, and astronomy!',
    soundType: 'chime'
  },
  {
    id: 'medieval',
    title: 'Medieval Age: Knights & Castles',
    hindiTitle: 'मध्यकालीन युग: शूरवीर और किले',
    timePeriod: '1000 - 1400 CE',
    yearValue: 1000,
    emoji: '🏰',
    imageUrl: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=500&auto=format&fit=crop&q=80',
    color: 'from-blue-600 via-slate-700 to-indigo-800',
    highlights: ['Shining Steel Armor 🛡️', 'Drawbridges & Moats 🌊', 'Brave Royal Knights 🏇'],
    story: 'Knights rode noble horses, guarded high stone castles with deep water moats, and blew herald trumpets!',
    soundType: 'sword'
  },
  {
    id: 'renaissance',
    title: 'The Renaissance & Age of Discovery',
    hindiTitle: 'पुनर्जागरण और खोज का युग',
    timePeriod: '1500 CE',
    yearValue: 1500,
    emoji: '🎨',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=80',
    color: 'from-purple-600 via-indigo-600 to-amber-600',
    highlights: ['Leonardo\'s Flying Inventions ✈️', 'Mona Lisa Painting 🖼️', 'Compass Sailing Galleons ⛵'],
    story: 'Artists and inventors painted timeless masterpieces, while brave ocean captains sailed across new seas with magnetic compasses!',
    soundType: 'chime'
  },
  {
    id: 'industrial',
    title: 'The Industrial Revolution & Steam Age',
    hindiTitle: 'औद्योगिक क्रांति और भाप का युग',
    timePeriod: '1800 - 1900 CE',
    yearValue: 1800,
    emoji: '🚂',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=500&auto=format&fit=crop&q=80',
    color: 'from-amber-600 via-stone-700 to-slate-900',
    highlights: ['Steam Locomotive Trains 🚂', 'Electric Lightbulb 💡', 'Telegraph Wires ⚡'],
    story: 'Pioneering inventors built iron steam engines that chugged across continents and lit cities with glowing electricity!',
    soundType: 'steam'
  },
  {
    id: 'space_age',
    title: 'The Space Age & Apollo Moon Landing',
    hindiTitle: 'अंतरिक्ष युग और चंद्रमा पर कदम',
    timePeriod: '1969 CE - Present',
    yearValue: 1969,
    emoji: '🚀',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=500&auto=format&fit=crop&q=80',
    color: 'from-indigo-600 via-purple-700 to-slate-950',
    highlights: ['Apollo Saturn V Rocket 🚀', 'First Footprint on the Moon 🌕', 'Space Station Orbiters 🛰️'],
    story: 'Brave astronauts zoomed 240,000 miles to the Moon in roaring rockets, bounced in low gravity, and looked back at blue Earth!',
    soundType: 'rocket'
  }
];

export const INVENTIONS: Invention[] = [
  {
    id: 'wheel',
    name: 'The Wheel',
    hindiName: 'पहिया',
    emoji: '🛞',
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=80',
    year: '3500 BCE',
    inventorOrEra: 'Ancient Mesopotamian Builders',
    whyAwesome: 'Turned heavy dragging into smooth rolling for carts, bicycles, trains, and cars!',
    impactCategory: 'transport'
  },
  {
    id: 'printing_press',
    name: 'The Printing Press',
    hindiName: 'मुद्रणालय (प्रिंटिंग प्रेस)',
    emoji: '📚',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
    year: '1440 CE',
    inventorOrEra: 'Johannes Gutenberg',
    whyAwesome: 'Made it possible to print thousands of books so children everywhere could learn to read!',
    impactCategory: 'communication'
  },
  {
    id: 'telescope',
    name: 'Astronomical Telescope',
    hindiName: 'दूरबीन (टेलीस्कोप)',
    emoji: '🔭',
    imageUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=500&auto=format&fit=crop&q=80',
    year: '1608 CE',
    inventorOrEra: 'Galileo Galilei & Hans Lippershey',
    whyAwesome: 'Brought distant twinkling stars, Moon craters, and Jupiter\'s swirling moons right into our eyes!',
    impactCategory: 'science'
  },
  {
    id: 'steam_engine',
    name: 'Steam Locomotive Train',
    hindiName: 'भाप का इंजन',
    emoji: '🚂',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=500&auto=format&fit=crop&q=80',
    year: '1804 CE',
    inventorOrEra: 'George Stephenson & James Watt',
    whyAwesome: 'Harnessed the bubbling steam of boiling water to pull heavy trains across entire nations!',
    impactCategory: 'transport'
  },
  {
    id: 'lightbulb',
    name: 'Electric Lightbulb',
    hindiName: 'बिजली का बल्ब',
    emoji: '💡',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80',
    year: '1879 CE',
    inventorOrEra: 'Thomas Edison',
    whyAwesome: 'Turned dark nights into bright sunny rooms with the simple flick of a wall switch!',
    impactCategory: 'daily'
  },
  {
    id: 'telephone',
    name: 'The Telephone',
    hindiName: 'टेलीफोन',
    emoji: '☎️',
    imageUrl: 'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=500&auto=format&fit=crop&q=80',
    year: '1876 CE',
    inventorOrEra: 'Alexander Graham Bell',
    whyAwesome: 'Allowed human voices to travel instantly through copper wires across mountains and rivers!',
    impactCategory: 'communication'
  },
  {
    id: 'airplane',
    name: 'The Flying Airplane',
    hindiName: 'हवाई जहाज़',
    emoji: '✈️',
    imageUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4fff16def?w=500&auto=format&fit=crop&q=80',
    year: '1903 CE',
    inventorOrEra: 'Wright Brothers (Orville & Wilbur)',
    whyAwesome: 'Gave humanity wings to soar above fluffy white clouds and travel across the globe!',
    impactCategory: 'transport'
  },
  {
    id: 'radio',
    name: 'Wireless Radio Waves',
    hindiName: 'रेडियो',
    emoji: '📻',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&auto=format&fit=crop&q=80',
    year: '1895 CE',
    inventorOrEra: 'Guglielmo Marconi & Jagadish Chandra Bose',
    whyAwesome: 'Sent magical invisible music and news through the air straight into living rooms!',
    impactCategory: 'communication'
  },
  {
    id: 'rocket',
    name: 'Saturn V Space Rocket',
    hindiName: 'अंतरिक्ष रॉकेट',
    emoji: '🚀',
    imageUrl: 'https://images.unsplash.com/photo-1517976487507-5b3a4a259c7c?w=500&auto=format&fit=crop&q=80',
    year: '1969 CE',
    inventorOrEra: 'NASA Apollo Team',
    whyAwesome: 'Launched astronauts with 7.5 million pounds of fiery thrust to walk on the dusty Moon!',
    impactCategory: 'science'
  },
  {
    id: 'computer',
    name: 'Personal Computer & Internet',
    hindiName: 'कंप्यूटर और इंटरनेट',
    emoji: '💻',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80',
    year: '1970s - 1990s',
    inventorOrEra: 'Computer Pioneers & Tim Berners-Lee',
    whyAwesome: 'Connected all humans across the planet to learn, play games, and share knowledge instantly!',
    impactCategory: 'communication'
  }
];

export const HISTORICAL_FIGURES: HistoricalFigure[] = [
  {
    id: 'king_tut',
    name: 'King Tutankhamun',
    hindiName: 'तूतनखामुन',
    title: 'The Boy Pharaoh of Egypt',
    era: '1332 BCE (Ancient Egypt)',
    emoji: '👑',
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=500&auto=format&fit=crop&q=80',
    quote: 'The golden pharaoh crowned under the desert stars!',
    achievement: 'Famous young Egyptian ruler whose intact tomb held a breathtaking solid gold burial mask and treasures.',
    color: 'from-yellow-500 via-amber-600 to-orange-700'
  },
  {
    id: 'ashoka',
    name: 'Emperor Ashoka the Great',
    hindiName: 'सम्राट अशोक',
    title: 'Emperor of Peace (चक्रवर्ती सम्राट)',
    era: '268 BCE (Maurya Empire, India)',
    emoji: '🦁',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&auto=format&fit=crop&q=80',
    quote: 'True victory is won not by weapons, but by love, compassion, and dharma!',
    achievement: 'United ancient India and spread peace, kindness, animal hospitals, and the Ashoka Chakra emblem of modern India.',
    color: 'from-amber-600 via-orange-600 to-yellow-600'
  },
  {
    id: 'davinci',
    name: 'Leonardo da Vinci',
    hindiName: 'लियोनार्डो दा विंची',
    title: 'The Ultimate Renaissance Genius',
    era: '1500 CE (Renaissance, Italy)',
    emoji: '🎨',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=80',
    quote: 'Learning never exhausts the curious mind!',
    achievement: 'Painted the Mona Lisa and drew visionary blueprints for helicopters, parachutes, and robotic knights.',
    color: 'from-purple-600 via-indigo-700 to-slate-900'
  },
  {
    id: 'columbus_vasco',
    name: 'Vasco da Gama',
    hindiName: 'वास्को डी गामा',
    title: 'Master Ocean Navigator',
    era: '1498 CE (Age of Discovery)',
    emoji: '🧭',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
    quote: 'Follow the North Star across uncharted waters!',
    achievement: 'First European explorer to discover the direct ocean sailing route around Africa to the shores of India.',
    color: 'from-blue-600 via-cyan-700 to-slate-900'
  },
  {
    id: 'marie_curie',
    name: 'Marie Curie',
    hindiName: 'मैरी क्यूरी',
    title: 'Mother of Modern Physics',
    era: '1903 CE (Modern Science)',
    emoji: '🔬',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&auto=format&fit=crop&q=80',
    quote: 'Nothing in life is to be feared, it is only to be understood!',
    achievement: 'First woman to win a Nobel Prize and the only person in history to win Nobel Prizes in two different scientific fields (Physics & Chemistry)!',
    color: 'from-teal-600 via-emerald-700 to-slate-900'
  },
  {
    id: 'neil_armstrong',
    name: 'Neil Armstrong',
    hindiName: 'नील आर्मस्ट्रांग',
    title: 'First Human to Walk on the Moon',
    era: '1969 CE (Apollo 11, Space Age)',
    emoji: '🧑‍🚀',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=500&auto=format&fit=crop&q=80',
    quote: 'That\'s one small step for man, one giant leap for mankind!',
    achievement: 'Stepped out of Apollo 11 Lunar Module Eagle to make the first human footprint on the Moon.',
    color: 'from-slate-900 via-indigo-900 to-purple-950'
  }
];
