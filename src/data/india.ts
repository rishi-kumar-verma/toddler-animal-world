import { IndianState, FamousCity, FreedomFighter } from '../types/hub';

export const INDIAN_STATES: IndianState[] = [
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    hindiName: 'महाराष्ट्र',
    capital: 'Mumbai',
    emoji: '🌊',
    imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500&auto=format&fit=crop&q=80',
    famousFor: 'Gateway of India, Bollywood, Ajanta Caves & Sahyadri Hills!',
    monument: 'Gateway of India 🏛️',
    food: 'Pav Bhaji & Puran Poli 🍲',
    colorGradient: 'from-orange-500 via-amber-600 to-red-600',
    borderColor: 'border-orange-400'
  },
  {
    id: 'delhi',
    name: 'Delhi (NCT)',
    hindiName: 'दिल्ली',
    capital: 'New Delhi (Capital of India)',
    emoji: '🏛️',
    imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&auto=format&fit=crop&q=80',
    famousFor: 'India Gate, Red Fort, Qutub Minar & Lotus Temple!',
    monument: 'India Gate 🇮🇳',
    food: 'Chole Bhature & Parathas 🫓',
    colorGradient: 'from-blue-600 via-indigo-700 to-slate-900',
    borderColor: 'border-blue-400'
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    hindiName: 'राजस्थान',
    capital: 'Jaipur (Pink City)',
    emoji: '🏰',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&auto=format&fit=crop&q=80',
    famousFor: 'Royal Palaces, Thar Desert, Camels & Grand Forts!',
    monument: 'Hawa Mahal & Amber Fort 🏰',
    food: 'Dal Baati Churma 🍛',
    colorGradient: 'from-pink-500 via-rose-600 to-amber-600',
    borderColor: 'border-pink-400'
  },
  {
    id: 'uttar_pradesh',
    name: 'Uttar Pradesh',
    hindiName: 'उत्तर प्रदेश',
    capital: 'Lucknow',
    emoji: '🕌',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&auto=format&fit=crop&q=80',
    famousFor: 'The Wonder Taj Mahal, Holy Ganga River & Varanasi Ghats!',
    monument: 'Taj Mahal in Agra 🕌',
    food: 'Lucknowi Kebabs & Peda 🍬',
    colorGradient: 'from-amber-500 via-orange-600 to-yellow-600',
    borderColor: 'border-amber-400'
  },
  {
    id: 'tamil_nadu',
    name: 'Tamil Nadu',
    hindiName: 'तमिलनाडु',
    capital: 'Chennai',
    emoji: '🛕',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&auto=format&fit=crop&q=80',
    famousFor: 'Magnificent Dravidian Temples, Marina Beach & Bharatanatyam Dance!',
    monument: 'Meenakshi Temple 🛕',
    food: 'Crispy Dosa, Idli & Filter Coffee ☕',
    colorGradient: 'from-yellow-500 via-amber-600 to-red-600',
    borderColor: 'border-yellow-400'
  },
  {
    id: 'west_bengal',
    name: 'West Bengal',
    hindiName: 'पश्चिम बंगाल',
    capital: 'Kolkata',
    emoji: '🐯',
    imageUrl: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=500&auto=format&fit=crop&q=80',
    famousFor: 'Howrah Bridge, Royal Bengal Tiger, Sunderbans & Durga Puja!',
    monument: 'Howrah Bridge & Victoria Memorial 🌉',
    food: 'Rosogolla & Machher Jhol 🐟',
    colorGradient: 'from-emerald-500 via-teal-600 to-green-700',
    borderColor: 'border-emerald-400'
  },
  {
    id: 'punjab',
    name: 'Punjab',
    hindiName: 'पंजाब',
    capital: 'Chandigarh',
    emoji: '🌾',
    imageUrl: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=500&auto=format&fit=crop&q=80',
    famousFor: 'The Golden Temple, Bhangra Dance & Green Mustard Fields!',
    monument: 'Golden Temple in Amritsar ✨',
    food: 'Makki di Roti & Sarson da Saag 🫓',
    colorGradient: 'from-yellow-400 via-amber-500 to-orange-600',
    borderColor: 'border-yellow-300'
  },
  {
    id: 'kerala',
    name: 'Kerala',
    hindiName: 'केरल',
    capital: 'Thiruvananthapuram',
    emoji: '🌴',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&auto=format&fit=crop&q=80',
    famousFor: 'God\'s Own Country, Lush Backwaters, Houseboats & Kathakali!',
    monument: 'Alleppey Backwaters & Houseboats ⛵',
    food: 'Appam, Coconut Stew & Banana Chips 🍌',
    colorGradient: 'from-teal-500 via-emerald-600 to-green-700',
    borderColor: 'border-teal-400'
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    hindiName: 'गुजरात',
    capital: 'Gandhinagar',
    emoji: '🦁',
    imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=500&auto=format&fit=crop&q=80',
    famousFor: 'Statue of Unity, Asiatic Gir Lions, Garba Dance & Rann of Kutch!',
    monument: 'Statue of Unity (World\'s Tallest) 🗿',
    food: 'Dhokla, Khandvi & Thepla 🧆',
    colorGradient: 'from-orange-400 via-amber-500 to-yellow-600',
    borderColor: 'border-orange-300'
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    hindiName: 'कर्नाटक',
    capital: 'Bengaluru',
    emoji: '🚀',
    imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=500&auto=format&fit=crop&q=80',
    famousFor: 'Silicon Valley of India, Mysore Palace, Coffee Plantations & Hampi!',
    monument: 'Mysore Palace & Hampi Ruins 👑',
    food: 'Bisi Bele Bath & Mysore Pak 🍯',
    colorGradient: 'from-red-500 via-yellow-500 to-emerald-600',
    borderColor: 'border-yellow-400'
  },
  {
    id: 'kashmir',
    name: 'Jammu & Kashmir',
    hindiName: 'जम्मू और कश्मीर',
    capital: 'Srinagar / Jammu',
    emoji: '🏔️',
    imageUrl: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=500&auto=format&fit=crop&q=80',
    famousFor: 'Paradise on Earth, Dal Lake Shikara, Snow Peaks & Tulip Gardens!',
    monument: 'Dal Lake & Houseboats 🚣',
    food: 'Kashmiri Kahwa Tea & Rogan Josh 🫖',
    colorGradient: 'from-cyan-400 via-sky-500 to-blue-700',
    borderColor: 'border-cyan-300'
  },
  {
    id: 'assam',
    name: 'Assam',
    hindiName: 'असम',
    capital: 'Dispur',
    emoji: '🦏',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&auto=format&fit=crop&q=80',
    famousFor: 'One-horned Rhinoceros, Lush Green Tea Gardens & Brahmaputra River!',
    monument: 'Kaziranga National Park 🦏',
    food: 'Assam Tea & Pitha 🍵',
    colorGradient: 'from-emerald-600 via-green-700 to-lime-600',
    borderColor: 'border-emerald-400'
  }
];

export const FAMOUS_CITIES: FamousCity[] = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    nickname: 'City of Dreams 🌟',
    emoji: '🌊',
    imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500&auto=format&fit=crop&q=80',
    highlight: 'Gateway of India & Marine Drive Queen\'s Necklace',
    fact: 'India\'s financial capital and home to the world-famous Bollywood film industry!'
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    nickname: 'The Pink City 🌸',
    emoji: '🏰',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&auto=format&fit=crop&q=80',
    highlight: 'Hawa Mahal Palace of Winds',
    fact: 'Famous for its pink terracotta buildings, royal elephant rides, and historic stone forts!'
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    nickname: 'The City of Lights & Ghats 🪔',
    emoji: '🪔',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=500&auto=format&fit=crop&q=80',
    highlight: 'Ganga Aarti at Dashashwamedh Ghat',
    fact: 'One of the world\'s oldest living cities, where thousands of golden diya lamps float on river Ganga!'
  },
  {
    id: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    nickname: 'City of the Taj Mahal 🕌',
    emoji: '🕌',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&auto=format&fit=crop&q=80',
    highlight: 'The Wonder of the World: Taj Mahal',
    fact: 'Home to the magnificent white marble Taj Mahal, built with pure love and craftsmanship!'
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    nickname: 'Silicon Valley & Garden City 🚀',
    emoji: '🌳',
    imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=500&auto=format&fit=crop&q=80',
    highlight: 'ISRO Space Center & Lalbagh Botanical Gardens',
    fact: 'India\'s high-tech innovation capital where ISRO builds rockets to explore the Moon and Mars!'
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    nickname: 'City of Joy 💛',
    emoji: '🌉',
    imageUrl: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=500&auto=format&fit=crop&q=80',
    highlight: 'Howrah Bridge over the Hooghly River',
    fact: 'Famous for yellow vintage taxis, classic trams, sweet rosogollas, and grand literary heritage!'
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    state: 'Punjab',
    nickname: 'The Golden City ✨',
    emoji: '🛕',
    imageUrl: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=500&auto=format&fit=crop&q=80',
    highlight: 'Harmandir Sahib (Golden Temple)',
    fact: 'Home to the sparkling Golden Temple surrounded by holy waters and the world\'s largest free kitchen (Langar)!'
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    nickname: 'City of Pearls & Biryani 🦚',
    emoji: '🏛️',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=500&auto=format&fit=crop&q=80',
    highlight: 'Historic Charminar & Golconda Fort',
    fact: 'Famous for its 400-year-old four-minaret monument Charminar, shimmering pearls, and delicious Dum Biryani!'
  }
];

export const FREEDOM_FIGHTERS: FreedomFighter[] = [
  {
    id: 'gandhi',
    name: 'Mahatma Gandhi',
    title: 'Father of the Nation (राष्ट्रपिता)',
    slogan: 'Do or Die! (करो या मरो)',
    emoji: '🕊️',
    imageUrl: '/images/freedom_fighters/gandhi.jpg',
    contribution: 'Led India\'s freedom struggle with Ahimsa (Non-violence), Truth, and the historic Dandi Salt March.',
    colorGradient: 'from-orange-500 via-amber-500 to-green-600',
    borderColor: 'border-amber-400'
  },
  {
    id: 'bhagat_singh',
    name: 'Shaheed Bhagat Singh',
    title: 'Fearless Youth Patriot (शहीद-ए-आज़म)',
    slogan: 'Inquilab Zindabad! (इंकलाब ज़िंदाबाद)',
    emoji: '🔥',
    imageUrl: '/images/freedom_fighters/bhagat_singh.jpg',
    contribution: 'A brave young revolutionary whose supreme courage, sacrifice, and patriotism inspired millions across India.',
    colorGradient: 'from-amber-600 via-red-600 to-stone-900',
    borderColor: 'border-red-400'
  },
  {
    id: 'netaji',
    name: 'Netaji Subhas Chandra Bose',
    title: 'Supreme Commander of Azad Hind Fauj (नेताजी)',
    slogan: 'Tum Mujhe Khoon Do, Main Tumhe Azadi Doonga! (तुम मुझे खून दो, मैं तुम्हें आज़ादी दूंगा)',
    emoji: '🎖️',
    imageUrl: '/images/freedom_fighters/netaji.jpg',
    contribution: 'Formed the Indian National Army (Azad Hind Fauj) and fought fiercely with the battle cry "Jai Hind!".',
    colorGradient: 'from-emerald-600 via-teal-700 to-slate-900',
    borderColor: 'border-emerald-400'
  },
  {
    id: 'rani_lakshmibai',
    name: 'Rani Lakshmibai of Jhansi',
    title: 'Warrior Queen of Jhansi (झाँसी की रानी)',
    slogan: 'Main Apni Jhansi Nahi Doongi! (मैं अपनी झाँसी नहीं दूँगी)',
    emoji: '⚔️',
    imageUrl: '/images/freedom_fighters/rani_lakshmibai.jpg',
    contribution: 'Brave queen who fought fearlessly on horseback with her sword in the 1857 First War of Indian Independence.',
    colorGradient: 'from-rose-600 via-red-600 to-purple-800',
    borderColor: 'border-rose-400'
  },
  {
    id: 'sardar_patel',
    name: 'Sardar Vallabhbhai Patel',
    title: 'Iron Man of India (लौह पुरुष)',
    slogan: 'Unity in Diversity is India\'s Greatest Strength!',
    emoji: '🗿',
    imageUrl: '/images/freedom_fighters/sardar_patel.jpg',
    contribution: 'United over 565 princely states into one single united India; honored by the Statue of Unity.',
    colorGradient: 'from-amber-600 via-yellow-600 to-stone-800',
    borderColor: 'border-amber-400'
  },
  {
    id: 'ambedkar',
    name: 'Dr. B. R. Ambedkar',
    title: 'Architect of the Constitution (बाबासाहेब)',
    slogan: 'Educate, Agitate, Organise! (शिक्षित बनो, संगठित रहो, संघर्ष करो)',
    emoji: '📜',
    imageUrl: '/images/freedom_fighters/ambedkar.jpg',
    contribution: 'Chief Architect of the Constitution of India, who dedicated his entire life to equality, social justice, and education.',
    colorGradient: 'from-blue-700 via-indigo-800 to-slate-900',
    borderColor: 'border-blue-400'
  },
  {
    id: 'chandrashekhar_azad',
    name: 'Chandra Shekhar Azad',
    title: 'Unstoppable Revolutionary (आज़ाद)',
    slogan: 'Azad Hi Rahe Hain, Azad Hi Rahenge! (आज़ाद ही रहे हैं, आज़ाद ही रहेंगे)',
    emoji: '🎯',
    imageUrl: '/images/freedom_fighters/chandrashekhar_azad.jpg',
    contribution: 'Fierce revolutionary leader who lived free, trained youth patriots, and never surrendered to colonial forces.',
    colorGradient: 'from-orange-600 via-amber-700 to-slate-950',
    borderColor: 'border-orange-400'
  },
  {
    id: 'sarojini_naidu',
    name: 'Sarojini Naidu',
    title: 'Nightingale of India (भारत कोकिला)',
    slogan: 'A country\'s greatness lies in its undying ideals of love and sacrifice!',
    emoji: '🦚',
    imageUrl: '/images/freedom_fighters/sarojini_naidu.jpg',
    contribution: 'Celebrated poet, inspiring orator, and fearless freedom fighter who championed women\'s leadership across India.',
    colorGradient: 'from-purple-600 via-pink-600 to-rose-700',
    borderColor: 'border-pink-400'
  }
];
