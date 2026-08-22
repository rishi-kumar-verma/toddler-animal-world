export interface RealSupercar {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  emoji: string;
  topSpeedKmh: number;
  acceleration0to100: number; // in seconds
  handling: number; // 1 to 10
  color: string;
  accentColor: string;
  bodyGradient: string[];
  specs: {
    engine: string;
    horsepower: string;
    drivetrain: string;
  };
}

export interface RealRacingMap {
  id: string;
  name: string;
  location: string;
  emoji: string;
  countryFlag: string;
  timeOfDay: 'day' | 'sunset' | 'night' | 'snow';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  trackLengthKm: number;
  trackCurvature: number; // Frequency and intensity of curves
  trackHills: number; // Elevation variance
  targetLapTimeSeconds: { gold: number; silver: number; bronze: number };
  rewardCoins: number;
  rewardTrophy: string;
  skyGradient: [string, string, string];
  horizonBackdrop: 'mountains' | 'city' | 'desert' | 'snow' | 'coastal';
  roadAsphaltColor: string;
  roadRumbleColor1: string;
  roadRumbleColor2: string;
  roadLaneLineColor: string;
  roadsideScenery: string[]; // Emojis of scenery items (palms, billboards, trees, lights)
  weatherEffect?: 'snow' | 'rain' | 'sunflare' | 'neon';
  description: string;
}

export const REAL_SUPER_CARS: RealSupercar[] = [
  {
    id: 'ferrari_v12',
    name: 'Scuderia Red F8 Hypercar',
    brand: 'Ferrari Spirit',
    tagline: 'Pure Italian V12 Racing Precision',
    emoji: '🏎️',
    topSpeedKmh: 340,
    acceleration0to100: 2.8,
    handling: 9.5,
    color: '#E60000',
    accentColor: '#FFD700',
    bodyGradient: ['#FF1A1A', '#CC0000', '#800000'],
    specs: {
      engine: '3.9L Twin-Turbo V8',
      horsepower: '710 HP',
      drivetrain: 'Rear-Wheel Drive (RWD)'
    }
  },
  {
    id: 'lamborghini_gold',
    name: 'Aventador Cyber V12',
    brand: 'Lamborghini Spirit',
    tagline: 'Aggressive Stealth Fighter Jet on Wheels',
    emoji: '⚡',
    topSpeedKmh: 350,
    acceleration0to100: 2.7,
    handling: 9.2,
    color: '#FFB800',
    accentColor: '#1A1A1A',
    bodyGradient: ['#FFCC00', '#E5A800', '#997000'],
    specs: {
      engine: '6.5L Naturally Aspirated V12',
      horsepower: '770 HP',
      drivetrain: 'All-Wheel Drive (AWD)'
    }
  },
  {
    id: 'bugatti_sapphire',
    name: 'Chiron Sapphire Quad-Turbo',
    brand: 'Bugatti Spirit',
    tagline: 'King of Top Speed & Luxury Aerodynamics',
    emoji: '🌌',
    topSpeedKmh: 420,
    acceleration0to100: 2.4,
    handling: 8.9,
    color: '#0055FF',
    accentColor: '#00D9FF',
    bodyGradient: ['#0066FF', '#0033AA', '#001A66'],
    specs: {
      engine: '8.0L Quad-Turbocharged W16',
      horsepower: '1,500 HP',
      drivetrain: 'Permanent Quad-AWD'
    }
  },
  {
    id: 'porsche_silver',
    name: '911 GT3 RS Clubsport',
    brand: 'Porsche Spirit',
    tagline: 'Ultimate Track Weapon & Apex Carver',
    emoji: '🥈',
    topSpeedKmh: 320,
    acceleration0to100: 3.0,
    handling: 10.0,
    color: '#E0E6ED',
    accentColor: '#FF4500',
    bodyGradient: ['#FFFFFF', '#D1D5DB', '#9CA3AF'],
    specs: {
      engine: '4.0L High-Rev Flat-6 (9,000 RPM)',
      horsepower: '525 HP',
      drivetrain: 'Precision Track RWD'
    }
  },
  {
    id: 'mclaren_neon_green',
    name: 'P1 Hyper-Hybrid Venom',
    brand: 'McLaren Spirit',
    tagline: 'Electric Torque with Carbon Fiber Monocoque',
    emoji: '🟢',
    topSpeedKmh: 360,
    acceleration0to100: 2.6,
    handling: 9.6,
    color: '#00FF66',
    accentColor: '#111827',
    bodyGradient: ['#00FF88', '#00CC66', '#006633'],
    specs: {
      engine: '3.8L Twin-Turbo Hybrid V8',
      horsepower: '903 HP',
      drivetrain: 'Dual-Clutch Mid-Engine RWD'
    }
  },
  {
    id: 'gtr_nismo_black',
    name: 'GT-R Godzilla Nismo Edition',
    brand: 'Nissan Spirit',
    tagline: 'Legendary Japanese Midnight Supercar',
    emoji: '🖤',
    topSpeedKmh: 330,
    acceleration0to100: 2.7,
    handling: 9.3,
    color: '#1F2937',
    accentColor: '#EF4444',
    bodyGradient: ['#374151', '#1F2937', '#111827'],
    specs: {
      engine: '3.8L Twin-Turbo V6 VR38DETT',
      horsepower: '600 HP',
      drivetrain: 'ATTESA E-TS All-Wheel Drive'
    }
  }
];

export const REAL_RACING_MAPS: RealRacingMap[] = [
  {
    id: 'monaco_neon_night',
    name: 'Monaco & Dubai Neon Grand Prix',
    location: 'Marina Coast & Neon Highway',
    emoji: '🌃',
    countryFlag: '🇲🇨 🇦🇪',
    timeOfDay: 'night',
    difficulty: 'Medium',
    trackLengthKm: 4.5,
    trackCurvature: 1.2,
    trackHills: 0.6,
    targetLapTimeSeconds: { gold: 35, silver: 50, bronze: 75 },
    rewardCoins: 500,
    rewardTrophy: '🏆 Monaco Gold Cup',
    skyGradient: ['#050814', '#0A122C', '#1E1B4B'],
    horizonBackdrop: 'city',
    roadAsphaltColor: '#1E222D',
    roadRumbleColor1: '#EF4444',
    roadRumbleColor2: '#F8FAFC',
    roadLaneLineColor: '#FACC15',
    roadsideScenery: ['💡', '🏙️', '🌴', '🛥️', '✨', '🚧'],
    weatherEffect: 'neon',
    description: 'Glamorous coastal night circuit with glittering skyscrapers, yacht harbor reflections, and glowing neon tunnels.'
  },
  {
    id: 'tokyo_sunset_mount_fuji',
    name: 'Tokyo Sunset Expressway & Mount Fuji',
    location: 'Japan Mountain Pass & Skyline',
    emoji: '🌸',
    countryFlag: '🇯🇵',
    timeOfDay: 'sunset',
    difficulty: 'Medium',
    trackLengthKm: 5.2,
    trackCurvature: 1.5,
    trackHills: 1.1,
    targetLapTimeSeconds: { gold: 38, silver: 55, bronze: 80 },
    rewardCoins: 750,
    rewardTrophy: '🌸 Sakura Crown Trophy',
    skyGradient: ['#311B92', '#D81B60', '#FF8F00'],
    horizonBackdrop: 'mountains',
    roadAsphaltColor: '#262930',
    roadRumbleColor1: '#E11D48',
    roadRumbleColor2: '#FFFFFF',
    roadLaneLineColor: '#FFFFFF',
    roadsideScenery: ['🌸', '🏮', '🌲', '⛩️', '🗻', '🗼'],
    weatherEffect: 'sunflare',
    description: 'High-speed sunset pass with sweeping mountain curves, cherry blossoms, and Mount Fuji silhouetted against a golden sky.'
  },
  {
    id: 'swiss_alps_snow_pass',
    name: 'Swiss Alps & Himalayan Glacier Pass',
    location: 'Alpine Mountain Crests',
    emoji: '🏔️',
    countryFlag: '🇨🇭 🇮🇳',
    timeOfDay: 'snow',
    difficulty: 'Hard',
    trackLengthKm: 6.0,
    trackCurvature: 1.8,
    trackHills: 1.6,
    targetLapTimeSeconds: { gold: 42, silver: 60, bronze: 90 },
    rewardCoins: 1000,
    rewardTrophy: '❄️ Glacier Apex Trophy',
    skyGradient: ['#1E3A8A', '#38BDF8', '#E0F2FE'],
    horizonBackdrop: 'snow',
    roadAsphaltColor: '#334155',
    roadRumbleColor1: '#0284C7',
    roadRumbleColor2: '#F8FAFC',
    roadLaneLineColor: '#38BDF8',
    roadsideScenery: ['🌲', '❄️', '⛄', '🏔️', '🪵', '🛖'],
    weatherEffect: 'snow',
    description: 'Breathtaking high-altitude frozen mountain pass with switchback curves, pine forests, and swirling snowflakes.'
  },
  {
    id: 'dubai_sahara_desert',
    name: 'Dubai Dunes & Sahara Super Speedway',
    location: 'Arabian Desert Highway',
    emoji: '🏜️',
    countryFlag: '🇦🇪 🇪🇬',
    timeOfDay: 'day',
    difficulty: 'Easy',
    trackLengthKm: 4.8,
    trackCurvature: 0.8,
    trackHills: 0.9,
    targetLapTimeSeconds: { gold: 32, silver: 45, bronze: 70 },
    rewardCoins: 1250,
    rewardTrophy: '👑 Golden Falcon Trophy',
    skyGradient: ['#0284C7', '#38BDF8', '#FED7AA'],
    horizonBackdrop: 'desert',
    roadAsphaltColor: '#374151',
    roadRumbleColor1: '#D97706',
    roadRumbleColor2: '#FEF3C7',
    roadLaneLineColor: '#F59E0B',
    roadsideScenery: ['🌴', '🐪', '🏜️', '🏛️', '🌵', '⛺'],
    weatherEffect: 'sunflare',
    description: 'Blazing desert super-highway with gentle rolling sand dunes, sunny oases, and open throttle straightaways.'
  },
  {
    id: 'miami_coastal_beach',
    name: 'Miami Ocean Drive & Palm Beach Coast',
    location: 'Florida Sunshine Ocean Boulevard',
    emoji: '🌴',
    countryFlag: '🇺🇸',
    timeOfDay: 'sunset',
    difficulty: 'Easy',
    trackLengthKm: 3.8,
    trackCurvature: 0.9,
    trackHills: 0.4,
    targetLapTimeSeconds: { gold: 30, silver: 42, bronze: 65 },
    rewardCoins: 1500,
    rewardTrophy: '🌴 Palm Championship Trophy',
    skyGradient: ['#4C1D95', '#C026D3', '#F59E0B'],
    horizonBackdrop: 'coastal',
    roadAsphaltColor: '#1F2937',
    roadRumbleColor1: '#EC4899',
    roadRumbleColor2: '#38BDF8',
    roadLaneLineColor: '#FDE047',
    roadsideScenery: ['🌴', '🏖️', '🏄‍♂️', '🦩', '🍹', '⛵'],
    weatherEffect: 'sunflare',
    description: 'Vibrant tropical coast boulevard with tall palm trees, turquoise ocean waves, and neon pink Art Deco hotels.'
  }
];
