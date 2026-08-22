import React, { useState, useEffect, useRef, useCallback } from 'react';
import { REAL_SUPER_CARS, REAL_RACING_MAPS, RealSupercar, RealRacingMap } from '../../data/realRacing';
import { speakHindi, stopAllSpeech } from '../../audio/hindiSpeech';
import { playPopSound, playCheerSound, stopAllAnimalSounds } from '../../audio/animalSounds';
import { getAudioContext, playRocketLaunch } from '../../audio/soundEffects';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Volume2, Zap, Trophy, Flame, ChevronLeft, ChevronRight, Gauge, Camera, ArrowRight, ArrowLeft, Check, Sparkles, Timer, Star, Award, Coins, Clock, Flag } from 'lucide-react';

interface RoadSegment {
  index: number;
  z: number;
  curve: number;
  hill: number;
  isDark: boolean;
  scenery?: { emoji: string; side: number };
}

interface RivalCar {
  id: number;
  x: number;
  z: number;
  speed: number;
  car: RealSupercar;
}

// Lap timing options in seconds
const LAP_TIME_OPTIONS = [
  { id: '30s', label: '30 Seconds', seconds: 30, emoji: '⚡', subtitle: 'Quick Sprint', bonusMultiplier: 1.0 },
  { id: '1m', label: '1 Minute', seconds: 60, emoji: '⏱️', subtitle: 'Standard Sprint', bonusMultiplier: 1.2 },
  { id: '2m', label: '2 Minutes', seconds: 120, emoji: '🏁', subtitle: 'Grand Prix Short', bonusMultiplier: 1.5 },
  { id: '3m', label: '3 Minutes', seconds: 180, emoji: '🏆', subtitle: 'Grand Prix Medium', bonusMultiplier: 1.8 },
  { id: '4m', label: '4 Minutes', seconds: 240, emoji: '🏎️', subtitle: 'Endurance Cup', bonusMultiplier: 2.2 },
  { id: '5m', label: '5 Minutes', seconds: 300, emoji: '👑', subtitle: 'Champion Marathon', bonusMultiplier: 3.0 }
];

// Draw a High-Definition Realistic Supercar on HTML5 Canvas
function drawRealisticSupercar(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  bottomY: number,
  carWidth: number,
  carHeight: number,
  car: RealSupercar,
  steerAngle: number,
  isNitro: boolean,
  isBraking: boolean
) {
  ctx.save();
  ctx.translate(centerX, bottomY);
  ctx.rotate(steerAngle * 0.08);

  const w = carWidth;
  const h = carHeight;
  const halfW = w / 2;

  // 1. Ground Shadow
  ctx.beginPath();
  ctx.ellipse(0, 6, halfW * 1.15, 14, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
  ctx.fill();

  // 2. Wide Racing Tires
  const tireW = w * 0.17;
  const tireH = h * 0.44;

  ctx.fillStyle = '#090D16';
  // Left Tire
  ctx.beginPath();
  ctx.roundRect(-halfW, -tireH + 2, tireW, tireH, 6);
  ctx.fill();
  // Right Tire
  ctx.beginPath();
  ctx.roundRect(halfW - tireW, -tireH + 2, tireW, tireH, 6);
  ctx.fill();

  // Chrome Wheel Rim Highlights
  ctx.fillStyle = '#9CA3AF';
  ctx.fillRect(-halfW + 4, -tireH + 8, 4, tireH - 12);
  ctx.fillRect(halfW - 8, -tireH + 8, 4, tireH - 12);

  // 3. Lower Rear Carbon Diffuser & Exhausts
  ctx.fillStyle = '#0F172A';
  ctx.beginPath();
  ctx.roundRect(-halfW * 0.78, -h * 0.32, w * 0.78, h * 0.32, 4);
  ctx.fill();

  // Quad Chrome Exhaust Pipes
  ctx.fillStyle = '#CBD5E1';
  ctx.beginPath();
  ctx.arc(-w * 0.24, -h * 0.14, 7, 0, Math.PI * 2);
  ctx.arc(-w * 0.13, -h * 0.14, 7, 0, Math.PI * 2);
  ctx.arc(w * 0.13, -h * 0.14, 7, 0, Math.PI * 2);
  ctx.arc(w * 0.24, -h * 0.14, 7, 0, Math.PI * 2);
  ctx.fill();

  // Exhaust Inner Glow
  ctx.fillStyle = isNitro ? '#38BDF8' : '#1E293B';
  ctx.beginPath();
  ctx.arc(-w * 0.24, -h * 0.14, 5, 0, Math.PI * 2);
  ctx.arc(-w * 0.13, -h * 0.14, 5, 0, Math.PI * 2);
  ctx.arc(w * 0.13, -h * 0.14, 5, 0, Math.PI * 2);
  ctx.arc(w * 0.24, -h * 0.14, 5, 0, Math.PI * 2);
  ctx.fill();

  // Nitro Blue & Orange Fire Jet Exhaust
  if (isNitro) {
    ctx.save();
    const flameGrad1 = ctx.createLinearGradient(0, 0, 0, 50);
    flameGrad1.addColorStop(0, '#FFFFFF');
    flameGrad1.addColorStop(0.3, '#38BDF8');
    flameGrad1.addColorStop(0.7, '#F97316');
    flameGrad1.addColorStop(1, 'transparent');

    ctx.fillStyle = flameGrad1;
    ctx.beginPath();
    ctx.moveTo(-w * 0.28, -h * 0.1);
    ctx.lineTo(-w * 0.18, 40 + Math.random() * 20);
    ctx.lineTo(-w * 0.08, -h * 0.1);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(w * 0.08, -h * 0.1);
    ctx.lineTo(w * 0.18, 40 + Math.random() * 20);
    ctx.lineTo(w * 0.28, -h * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // 4. Main Aerodynamic Supercar Body Shell
  const bodyGrad = ctx.createLinearGradient(0, -h, 0, 0);
  bodyGrad.addColorStop(0, car.bodyGradient[0]);
  bodyGrad.addColorStop(0.5, car.bodyGradient[1]);
  bodyGrad.addColorStop(1, car.bodyGradient[2]);

  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.moveTo(-halfW * 0.95, -h * 0.15);
  ctx.lineTo(-halfW * 0.92, -h * 0.58);
  ctx.lineTo(-halfW * 0.72, -h * 0.88);
  ctx.lineTo(halfW * 0.72, -h * 0.88);
  ctx.lineTo(halfW * 0.92, -h * 0.58);
  ctx.lineTo(halfW * 0.95, -h * 0.15);
  ctx.closePath();
  ctx.fill();

  // Subtle Metallic Highlight Sheen
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.beginPath();
  ctx.moveTo(-halfW * 0.6, -h * 0.88);
  ctx.lineTo(halfW * 0.6, -h * 0.88);
  ctx.lineTo(halfW * 0.78, -h * 0.58);
  ctx.lineTo(-halfW * 0.78, -h * 0.58);
  ctx.closePath();
  ctx.fill();

  // 5. Dark Tinted Rear Windshield
  const glassGrad = ctx.createLinearGradient(0, -h * 0.88, 0, -h * 0.58);
  glassGrad.addColorStop(0, '#0B1120');
  glassGrad.addColorStop(0.6, '#1E293B');
  glassGrad.addColorStop(1, '#334155');

  ctx.fillStyle = glassGrad;
  ctx.beginPath();
  ctx.moveTo(-halfW * 0.56, -h * 0.85);
  ctx.lineTo(halfW * 0.56, -h * 0.85);
  ctx.lineTo(halfW * 0.68, -h * 0.6);
  ctx.lineTo(-halfW * 0.68, -h * 0.6);
  ctx.closePath();
  ctx.fill();

  // Windshield Reflection Lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-halfW * 0.35, -h * 0.82);
  ctx.lineTo(-halfW * 0.12, -h * 0.62);
  ctx.stroke();

  // 6. High-Tech LED Horizon Taillights
  ctx.save();
  const taillightColor = isBraking ? '#FF0033' : '#EF4444';
  ctx.shadowColor = taillightColor;
  ctx.shadowBlur = isBraking ? 30 : 18;

  ctx.fillStyle = taillightColor;
  // Left LED Strip
  ctx.beginPath();
  ctx.roundRect(-halfW * 0.88, -h * 0.54, w * 0.34, h * 0.12, 5);
  ctx.fill();

  // Right LED Strip
  ctx.beginPath();
  ctx.roundRect(halfW * 0.88 - w * 0.34, -h * 0.54, w * 0.34, h * 0.12, 5);
  ctx.fill();

  // Center Light Bar
  ctx.fillRect(-halfW * 0.5, -h * 0.49, w * 0.5, 4);
  ctx.restore();

  // 7. Carbon Fiber Racing GT Wing
  ctx.fillStyle = '#020617';
  ctx.fillRect(-halfW * 0.62, -h * 1.02, 7, h * 0.18);
  ctx.fillRect(halfW * 0.62 - 7, -h * 1.02, 7, h * 0.18);

  const wingGrad = ctx.createLinearGradient(0, -h * 1.08, 0, -h * 0.96);
  wingGrad.addColorStop(0, '#334155');
  wingGrad.addColorStop(1, '#020617');
  ctx.fillStyle = wingGrad;
  ctx.beginPath();
  ctx.roundRect(-halfW * 0.94, -h * 1.08, w * 0.94, h * 0.12, 5);
  ctx.fill();

  // 8. License Plate
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(-22, -h * 0.3, 44, 14);
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('GP-V12', 0, -h * 0.3 + 10);

  ctx.restore();
}

export const Real3DRacingGame: React.FC = () => {
  // 4-Step Setup Flow: Step 1 Map -> Step 2 Car -> Step 3 Timing -> Racing -> Victory
  const [screenFlow, setScreenFlow] = useState<'select_map' | 'select_car' | 'select_timing' | 'racing' | 'victory'>('select_map');

  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const selectedMap = REAL_RACING_MAPS[currentMapIndex % REAL_RACING_MAPS.length];
  const [selectedCar, setSelectedCar] = useState<RealSupercar>(REAL_SUPER_CARS[0]);
  const [selectedLapTiming, setSelectedLapTiming] = useState(LAP_TIME_OPTIONS[1]); // Default 1 Minute

  // Career Rewards & Wallet
  const [careerCoins, setCareerCoins] = useState(1200);
  const [unlockedMapMax, setUnlockedMapMax] = useState(0);

  // Racing Settings & Speed Modes
  const [speedMode, setSpeedMode] = useState<'baby' | 'toddler' | 'pro'>('baby');
  const [cameraView, setCameraView] = useState<'chase' | 'hood'>('chase');

  // Live HUD metrics
  const [currentSpeedKmh, setCurrentSpeedKmh] = useState(0);
  const [nitroFuel, setNitroFuel] = useState(100);
  const [isNitro, setIsNitro] = useState(false);
  const [overtakesCount, setOvertakesCount] = useState(0);
  const [totalLapsCompleted, setTotalLapsCompleted] = useState(0);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(60);
  
  // Score & Rewards State
  const [raceScore, setRaceScore] = useState(0);
  const [earnedStars, setEarnedStars] = useState(3);
  const [earnedCoins, setEarnedCoins] = useState(500);

  // Canvas & Game Engine Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const raceStartTime = useRef<number>(0);
  const lapsCountRef = useRef<number>(0);
  const nitroTimeoutRef = useRef<number | null>(null);

  // Road & Physics Engine Variables
  const playerX = useRef(0);
  const playerZ = useRef(0);
  const currentSpeed = useRef(0);
  const keyState = useRef<{ left: boolean; right: boolean; up: boolean; down: boolean; nitro: boolean }>({
    left: false,
    right: false,
    up: false,
    down: false,
    nitro: false
  });

  const segmentsRef = useRef<RoadSegment[]>([]);
  const rivalsRef = useRef<RivalCar[]>([]);
  const trackLengthRef = useRef(0);

  // Engine Audio Synthesis Ref
  const engineAudioOsc = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  // Build Road Geometry with Continuous Forward Segments
  const buildTrack = useCallback((map: RealRacingMap) => {
    const SEGMENT_LENGTH = 200;
    const NUM_SEGMENTS = 1600;
    const segments: RoadSegment[] = [];

    for (let i = 0; i < NUM_SEGMENTS; i++) {
      const isDark = Math.floor(i / 3) % 2 === 0;
      
      let curve = 0;
      if (i > 80 && i < 280) curve = 0.025 * map.trackCurvature;
      if (i > 360 && i < 560) curve = -0.028 * map.trackCurvature;
      if (i > 680 && i < 880) curve = 0.03 * map.trackCurvature;
      if (i > 900 && i < 1100) curve = -0.03 * map.trackCurvature;
      if (i > 1200 && i < 1400) curve = 0.022 * map.trackCurvature;

      let hill = 0;
      if (i > 150 && i < 350) hill = Math.sin((i - 150) / 25) * 200 * map.trackHills;
      if (i > 600 && i < 900) hill = Math.sin((i - 600) / 35) * 300 * map.trackHills;

      let scenery: { emoji: string; side: number } | undefined = undefined;
      if (i % 12 === 0 && map.roadsideScenery.length > 0) {
        const emoji = map.roadsideScenery[i % map.roadsideScenery.length];
        const side = i % 24 === 0 ? 1 : -1;
        scenery = { emoji, side };
      }

      segments.push({
        index: i,
        z: i * SEGMENT_LENGTH,
        curve,
        hill,
        isDark,
        scenery
      });
    }

    segmentsRef.current = segments;
    trackLengthRef.current = NUM_SEGMENTS * SEGMENT_LENGTH;

    const rivals: RivalCar[] = [];
    for (let r = 0; r < 6; r++) {
      const car = REAL_SUPER_CARS[(r + 1) % REAL_SUPER_CARS.length];
      rivals.push({
        id: r + 1,
        x: ((r % 3) - 1) * 0.5,
        z: 1600 + r * 4500,
        speed: 120 + r * 22,
        car
      });
    }
    rivalsRef.current = rivals;
  }, []);

  // Update Engine Audio
  const updateEngineAudio = (spdKmh: number) => {
    try {
      if (!engineAudioOsc.current) {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'triangle';

        gain.gain.setValueAtTime(0.08, now);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);

        engineAudioOsc.current = { osc1, osc2, gain };
      }

      const ratio = Math.max(0.1, Math.min(1.8, spdKmh / 160));
      const now = getAudioContext().currentTime;
      engineAudioOsc.current.osc1.frequency.setValueAtTime(65 + ratio * 140, now);
      engineAudioOsc.current.osc2.frequency.setValueAtTime(130 + ratio * 280, now);
    } catch (e) {}
  };

  const stopEngineAudio = () => {
    if (engineAudioOsc.current) {
      try {
        engineAudioOsc.current.gain.gain.setValueAtTime(0, getAudioContext().currentTime);
        engineAudioOsc.current.osc1.stop();
        engineAudioOsc.current.osc2.stop();
      } catch (e) {}
      engineAudioOsc.current = null;
    }
  };

  // Horn Sound
  const triggerHorn = () => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      [520, 650].forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      });
      speakHindi('बीप बीप! रास्ता दो!');
    } catch (e) {}
  };

  // Bulletproof Component Unmount and Audio/Animation Cleanup
  useEffect(() => {
    return () => {
      // 1. Instantly stop engine audio oscillators
      stopEngineAudio();

      // 2. Instantly cancel all speech synthesis
      stopAllSpeech();

      // 3. Stop running animation frames
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }

      // 4. Clear pending timeout
      if (nitroTimeoutRef.current) {
        clearTimeout(nitroTimeoutRef.current);
        nitroTimeoutRef.current = null;
      }
    };
  }, []);

  // Trigger Nitro Boost
  const triggerNitro = useCallback(() => {
    if (nitroFuel < 15 || isNitro) return;
    setIsNitro(true);
    playRocketLaunch();
    confetti({ particleCount: 30, spread: 60 });
    speakHindi('सुपरचार्ज्ड टर्बो नाइट्रो!');

    if (nitroTimeoutRef.current) {
      clearTimeout(nitroTimeoutRef.current);
    }

    nitroTimeoutRef.current = window.setTimeout(() => {
      setIsNitro(false);
      nitroTimeoutRef.current = null;
    }, 2800);
  }, [nitroFuel, isNitro]);

  // Start Race
  const startRace = () => {
    buildTrack(selectedMap);
    playerX.current = 0;
    playerZ.current = 0;
    currentSpeed.current = 0;
    lapsCountRef.current = 0;
    setTotalLapsCompleted(0);
    setNitroFuel(100);
    setIsNitro(false);
    setOvertakesCount(0);
    setRaceScore(0);
    setTimeRemainingSeconds(selectedLapTiming.seconds);
    raceStartTime.current = Date.now();
    setScreenFlow('racing');
    playPopSound();
    speakHindi(`३, २, १... गो! ${selectedMap.name} पर ${selectedLapTiming.label} रेस शुरू!`);
  };

  // Go to Next Circuit Level
  const goToNextLevel = () => {
    const nextIdx = (currentMapIndex + 1) % REAL_RACING_MAPS.length;
    setCurrentMapIndex(nextIdx);
    setUnlockedMapMax((prev) => Math.max(prev, nextIdx));
    playPopSound();
    setScreenFlow('select_car');
    speakHindi(`लेवल अनलॉक! अगला ट्रैक: ${REAL_RACING_MAPS[nextIdx].name}!`);
  };

  // Keyboard Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screenFlow !== 'racing') return;
      if (e.key === 'ArrowLeft' || e.key === 'a') keyState.current.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') keyState.current.right = true;
      if (e.key === 'ArrowUp' || e.key === 'w') keyState.current.up = true;
      if (e.key === 'ArrowDown' || e.key === 's') keyState.current.down = true;
      if (e.key === ' ' || e.key === 'Shift') triggerNitro();
      if (e.key === 'h') triggerHorn();
      if (e.key === 'c') setCameraView((prev) => (prev === 'chase' ? 'hood' : 'chase'));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') keyState.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') keyState.current.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w') keyState.current.up = false;
      if (e.key === 'ArrowDown' || e.key === 's') keyState.current.down = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [screenFlow, triggerNitro]);

  // Main 3D Forward-Driving Canvas Loop (60 FPS)
  useEffect(() => {
    if (screenFlow !== 'racing') {
      stopEngineAudio();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    // Speed limits & acceleration per mode
    const maxSpeedLimit = speedMode === 'baby' ? 70 : speedMode === 'toddler' ? 160 : selectedCar.topSpeedKmh;
    const accelRate = speedMode === 'baby' ? 1.8 : speedMode === 'toddler' ? 3.0 : 4.8;
    const steerSpeed = speedMode === 'baby' ? 0.026 : 0.04;

    const render = () => {
      if (!running) return;

      const rect = canvas.getBoundingClientRect();
      const targetW = Math.max(300, Math.floor(rect.width));
      const targetH = Math.max(200, Math.floor(rect.height));

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      const width = canvas.width;
      const height = canvas.height;
      const segments = segmentsRef.current;
      if (segments.length === 0) return;

      const SEGMENT_LENGTH = 200;
      const trackLength = trackLengthRef.current;

      // Update Countdown Timer
      const elapsed = (Date.now() - raceStartTime.current) / 1000;
      const remaining = Math.max(0, selectedLapTiming.seconds - elapsed);
      setTimeRemainingSeconds(remaining);

      // Check If Time is Up -> Finish Race Victory!
      if (remaining <= 0) {
        running = false;
        stopEngineAudio();

        const baseReward = selectedMap.rewardCoins * selectedLapTiming.bonusMultiplier;
        const totalLaps = Math.max(1, lapsCountRef.current);
        const stars = totalLaps >= 2 ? 3 : totalLaps === 1 ? 2 : 1;

        setEarnedStars(stars);
        setEarnedCoins(Math.floor(baseReward));
        setCareerCoins((c) => c + Math.floor(baseReward));
        setUnlockedMapMax((prev) => Math.max(prev, (currentMapIndex + 1) % REAL_RACING_MAPS.length));

        setScreenFlow('victory');
        playCheerSound();
        confetti({ particleCount: 180, spread: 120 });
        speakHindi(`समय समाप्त! चेकर फ्लैग! आपने ${totalLaps} लैप्स पूरे किए और ${Math.floor(baseReward)} कॉइन्स जीते! 🏆`);
        return;
      }

      // 1. Acceleration & Forward Speed
      const isAccelerating = keyState.current.up || speedMode === 'baby' || speedMode === 'toddler';
      const isBraking = keyState.current.down;

      if (isAccelerating) {
        const topLimit = isNitro ? maxSpeedLimit * 1.35 : maxSpeedLimit;
        currentSpeed.current = Math.min(topLimit, currentSpeed.current + accelRate);
      } else if (isBraking) {
        currentSpeed.current = Math.max(0, currentSpeed.current - 6.0);
      } else {
        currentSpeed.current = Math.max(0, currentSpeed.current - 1.2);
      }

      // Update Score
      setRaceScore((prev) => prev + Math.floor(currentSpeed.current * 0.15));

      // 2. Turning & Steering
      let steerInput = 0;
      if (keyState.current.left) {
        playerX.current = Math.max(-0.95, playerX.current - steerSpeed);
        steerInput = -1;
      }
      if (keyState.current.right) {
        playerX.current = Math.min(0.95, playerX.current + steerSpeed);
        steerInput = 1;
      }

      // Advance Player Forward in Z direction with Loop Count
      playerZ.current += currentSpeed.current * 16;
      if (playerZ.current >= trackLength) {
        playerZ.current = playerZ.current % trackLength;
        lapsCountRef.current += 1;
        setTotalLapsCompleted(lapsCountRef.current);
        playPopSound();
        speakHindi(`लैप ${lapsCountRef.current} पूरा! शानदार!`);
      }

      const baseIndex = Math.floor(playerZ.current / SEGMENT_LENGTH) % segments.length;
      const playerSeg = segments[baseIndex];

      // Gentle Centrifugal drift on curves
      if (currentSpeed.current > 40 && playerSeg.curve !== 0) {
        playerX.current -= (playerSeg.curve * 0.12 * (currentSpeed.current / maxSpeedLimit));
        playerX.current = Math.max(-0.95, Math.min(0.95, playerX.current));
      }

      // Update HUD
      setCurrentSpeedKmh(Math.floor(currentSpeed.current));
      setNitroFuel((prev) => Math.min(100, isNitro ? prev - 0.6 : prev + 0.15));

      updateEngineAudio(currentSpeed.current);

      // 3. Draw Sky & Horizon Backdrop
      const horizonY = height * 0.45;

      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0, selectedMap.skyGradient[0]);
      skyGrad.addColorStop(0.5, selectedMap.skyGradient[1]);
      skyGrad.addColorStop(1, selectedMap.skyGradient[2]);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, horizonY);

      // Distant Horizon Mountains
      ctx.save();
      ctx.fillStyle = selectedMap.timeOfDay === 'night' ? '#0F172A' : '#1E293B';
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      for (let x = 0; x <= width; x += 40) {
        const peakHeight = Math.sin(x / 60) * 28 + 18;
        ctx.lineTo(x, horizonY - peakHeight);
      }
      ctx.lineTo(width, horizonY);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Sun / Moon
      ctx.save();
      ctx.beginPath();
      ctx.arc(width * 0.72, horizonY - 45, 26, 0, Math.PI * 2);
      ctx.fillStyle = selectedMap.timeOfDay === 'night' ? '#E2E8F0' : selectedMap.timeOfDay === 'sunset' ? '#F97316' : '#FDE047';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 25;
      ctx.fill();
      ctx.restore();

      // 4. Project and Draw True 3D Forward-Moving Highway
      const drawDistance = 160;
      const cameraHeight = 850;
      const roadWidth = 1100;
      const cameraDepth = 0.65;

      interface ProjectedSegment {
        screenX: number;
        screenY: number;
        screenW: number;
        scale: number;
        seg: RoadSegment;
      }

      const projected: ProjectedSegment[] = [];
      let curveAccum = 0;

      for (let n = 0; n < drawDistance; n++) {
        const segIndex = (baseIndex + n) % segments.length;
        const seg = segments[segIndex];

        const relativeZ = (n * SEGMENT_LENGTH) + (SEGMENT_LENGTH - (playerZ.current % SEGMENT_LENGTH));
        if (relativeZ <= 50) continue;

        const scale = cameraDepth / (relativeZ / 1000);
        curveAccum += seg.curve;

        const boundedCurveOffset = curveAccum * 120;
        const screenX = Math.round((width / 2) + (scale * (-playerX.current * roadWidth + boundedCurveOffset) * (width / 1600)));
        const screenY = Math.round(horizonY + (scale * (cameraHeight - seg.hill) * 0.45 * (height / 450)));
        const screenW = Math.round(scale * roadWidth * 0.6 * (width / 800));

        projected.push({ screenX, screenY, screenW, scale, seg });
      }

      // Draw Ground base under horizon
      ctx.fillStyle = selectedMap.timeOfDay === 'snow' ? '#CBD5E1' : selectedMap.timeOfDay === 'night' ? '#0A0F1D' : '#14532D';
      ctx.fillRect(0, horizonY, width, height - horizonY);

      // Draw from furthest to closest (Painter's Algorithm)
      for (let i = projected.length - 1; i > 0; i--) {
        const p1 = projected[i];
        const p2 = projected[i - 1];

        if (p1.screenY >= height || p2.screenY <= horizonY || p1.scale <= 0) continue;

        const isDark = p1.seg.isDark;
        const dy = Math.max(1, p2.screenY - p1.screenY + 1);

        // 4a. Ground / Grass on Left & Right Sides
        const rumbleW1 = p1.screenW * 1.18;
        const rumbleW2 = p2.screenW * 1.18;

        const grassColor = selectedMap.timeOfDay === 'snow'
          ? (isDark ? '#F1F5F9' : '#E2E8F0')
          : selectedMap.timeOfDay === 'night'
          ? (isDark ? '#0F172A' : '#0B1120')
          : (isDark ? '#15803D' : '#166534');

        ctx.fillStyle = grassColor;
        ctx.fillRect(0, p1.screenY, Math.max(0, p1.screenX - rumbleW1), dy);
        ctx.fillRect(Math.min(width, p1.screenX + rumbleW1), p1.screenY, width, dy);

        // 4b. Rumble Strip Curbs
        ctx.fillStyle = isDark ? '#EF4444' : '#F8FAFC';
        ctx.beginPath();
        ctx.moveTo(p1.screenX - rumbleW1, p1.screenY);
        ctx.lineTo(p1.screenX + rumbleW1, p1.screenY);
        ctx.lineTo(p2.screenX + rumbleW2, p2.screenY);
        ctx.lineTo(p2.screenX - rumbleW2, p2.screenY);
        ctx.closePath();
        ctx.fill();

        // 4c. Asphalt Road Surface
        ctx.fillStyle = isDark ? '#374151' : '#1F2937';
        ctx.beginPath();
        ctx.moveTo(p1.screenX - p1.screenW, p1.screenY);
        ctx.lineTo(p1.screenX + p1.screenW, p1.screenY);
        ctx.lineTo(p2.screenX + p2.screenW, p2.screenY);
        ctx.lineTo(p2.screenX - p2.screenW, p2.screenY);
        ctx.closePath();
        ctx.fill();

        // 4d. Moving Lane Divider Dashes
        if (isDark) {
          const laneW1 = Math.max(2, p1.screenW * 0.04);
          const laneW2 = Math.max(2, p2.screenW * 0.04);

          // Center Lane (Yellow)
          ctx.fillStyle = '#FACC15';
          ctx.beginPath();
          ctx.moveTo(p1.screenX - laneW1, p1.screenY);
          ctx.lineTo(p1.screenX + laneW1, p1.screenY);
          ctx.lineTo(p2.screenX + laneW2, p2.screenY);
          ctx.lineTo(p2.screenX - laneW2, p2.screenY);
          ctx.closePath();
          ctx.fill();

          // Left Lane Line (White)
          ctx.fillStyle = '#FFFFFF';
          const leftOffset1 = p1.screenW * 0.52;
          const leftOffset2 = p2.screenW * 0.52;
          ctx.beginPath();
          ctx.moveTo(p1.screenX - leftOffset1 - laneW1, p1.screenY);
          ctx.lineTo(p1.screenX - leftOffset1 + laneW1, p1.screenY);
          ctx.lineTo(p2.screenX - leftOffset2 + laneW2, p2.screenY);
          ctx.lineTo(p2.screenX - leftOffset2 - laneW2, p2.screenY);
          ctx.closePath();
          ctx.fill();

          // Right Lane Line (White)
          ctx.beginPath();
          ctx.moveTo(p1.screenX + leftOffset1 - laneW1, p1.screenY);
          ctx.lineTo(p1.screenX + leftOffset1 + laneW1, p1.screenY);
          ctx.lineTo(p2.screenX + leftOffset2 + laneW2, p2.screenY);
          ctx.lineTo(p2.screenX - leftOffset2 - laneW2, p2.screenY);
          ctx.closePath();
          ctx.fill();
        }

        // Roadside Scenery
        if (p1.seg.scenery && p1.scale > 0.02) {
          const sceneryScale = p1.scale * 85;
          const sceneryX = p1.screenX + (p1.seg.scenery.side * p1.screenW * 1.55);
          const sceneryY = p1.screenY;

          ctx.save();
          ctx.font = `${Math.max(12, Math.floor(sceneryScale))}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillText(p1.seg.scenery.emoji, sceneryX, sceneryY);
          ctx.restore();
        }

        // Draw AI Rival Supercars on this segment
        const rivals = rivalsRef.current;
        rivals.forEach((rival) => {
          if (Math.floor(rival.z / SEGMENT_LENGTH) % segments.length === p1.seg.index && p1.scale > 0.03) {
            const rx = p1.screenX + rival.x * p1.screenW;
            const ry = p1.screenY;
            const rWidth = Math.max(30, Math.floor(p1.scale * 200));
            const rHeight = Math.floor(rWidth * 0.65);

            drawRealisticSupercar(
              ctx,
              rx,
              ry,
              rWidth,
              rHeight,
              rival.car,
              0,
              false,
              false
            );

            // Overtake detection (+250 points!)
            const relZ = rival.z - playerZ.current;
            if (relZ > 0 && relZ < 250 && Math.abs(rival.x - playerX.current) < 0.35) {
              setOvertakesCount((c) => c + 1);
              setRaceScore((s) => s + 250);
            }
          }
        });
      }

      rivalsRef.current.forEach((rival) => {
        rival.z += rival.speed * 8;
        if (rival.z > trackLength) rival.z -= trackLength;
      });

      // 5. Draw Player Realistic Supercar in Full Front View
      if (cameraView === 'chase') {
        const carScreenX = width / 2;
        const carScreenY = height - 25;
        const carWidth = Math.min(260, Math.max(150, Math.floor(width * 0.28)));
        const carHeight = Math.floor(carWidth * 0.65);

        drawRealisticSupercar(
          ctx,
          carScreenX,
          carScreenY,
          carWidth,
          carHeight,
          selectedCar,
          steerInput,
          isNitro,
          isBraking
        );
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [screenFlow, cameraView, isNitro, selectedCar, selectedMap, speedMode, selectedLapTiming]);

  // Format seconds to mm:ss
  const formatCountdown = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full overflow-hidden pt-20 pb-24 px-3 sm:px-6 relative select-none">
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        
        {/* STEP 1: CHOOSE YOUR MAP SCREEN */}
        {screenFlow === 'select_map' && (
          <div className="flex-1 flex flex-col justify-between bg-slate-900/95 text-white rounded-3xl p-5 sm:p-6 border-3 border-indigo-500 shadow-2xl overflow-y-auto">
            
            <div>
              {/* Header Title with Career Coins Wallet */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">🌍</span>
                  <div>
                    <span className="text-xs font-black bg-indigo-600 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                      Step 1 of 3 • Choose Map
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      Choose Your Grand Prix Track
                    </h2>
                  </div>
                </div>

                {/* Career Coins Wallet */}
                <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-2xl border border-amber-500/50 shadow">
                  <Coins className="w-5 h-5 text-amber-400 animate-spin" />
                  <span className="font-black text-amber-400 text-base">{careerCoins} Coins</span>
                </div>
              </div>

              {/* 5 Map Choices Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 my-2">
                {REAL_RACING_MAPS.map((map, idx) => {
                  const isSelected = currentMapIndex === idx;

                  return (
                    <button
                      key={map.id}
                      onClick={() => {
                        setCurrentMapIndex(idx);
                        playPopSound();
                        speakHindi(`${map.name}!`);
                      }}
                      className={`p-4 rounded-2xl text-left transition-all transform cursor-pointer flex flex-col justify-between border-3 ${
                        isSelected
                          ? 'border-yellow-400 bg-gradient-to-br from-indigo-900/90 to-slate-800 ring-4 ring-yellow-400/30 scale-102 shadow-2xl'
                          : 'border-slate-700 bg-slate-800/80 hover:border-slate-500 hover:scale-101'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-4xl">{map.emoji}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black bg-black/40 text-yellow-300 px-2.5 py-1 rounded-lg border border-yellow-500/30">
                            {map.countryFlag}
                          </span>
                          <span className="text-xs font-bold bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-lg flex items-center gap-1">
                            <Trophy className="w-3.5 h-3.5 text-amber-400" />
                            <span>+{map.rewardCoins}</span>
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-black text-lg text-white flex items-center gap-1.5">
                            <span>{map.name}</span>
                            {isSelected && <Check className="w-5 h-5 text-yellow-400 stroke-[3]" />}
                          </h4>
                        </div>
                        <p className="text-xs font-bold text-yellow-400 mt-0.5">{map.location}</p>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                          {map.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Proceed Button */}
            <div className="mt-4 pt-3 border-t border-slate-700 flex justify-end">
              <button
                onClick={() => {
                  playPopSound();
                  setScreenFlow('select_car');
                  speakHindi(`बहुत बढ़िया! अब अपनी सुपरकार चुनें!`);
                }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:from-yellow-300 hover:to-orange-400 active:scale-95 text-slate-950 font-black text-lg sm:text-xl shadow-xl flex items-center gap-3 cursor-pointer transition-transform"
              >
                <span>NEXT: SELECT SUPERCAR</span>
                <ArrowRight className="w-6 h-6 stroke-[3]" />
              </button>
            </div>

          </div>
        )}

        {/* STEP 2: CHOOSE YOUR SUPERCAR SHOWROOM */}
        {screenFlow === 'select_car' && (
          <div className="flex-1 flex flex-col justify-between bg-slate-900/95 text-white rounded-3xl p-5 sm:p-6 border-3 border-red-500 shadow-2xl overflow-y-auto">
            
            <div>
              {/* Header Title with Back Button */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { playPopSound(); setScreenFlow('select_map'); }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 flex items-center gap-1 cursor-pointer text-xs font-bold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Maps</span>
                  </button>
                  <div>
                    <span className="text-xs font-black bg-red-600 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                      Step 2 of 3 • Choose Supercar
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      Choose Your Luxury Supercar
                    </h2>
                  </div>
                </div>

                {/* Speed Mode Switcher */}
                <div className="flex items-center gap-1 bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
                  <button
                    onClick={() => { setSpeedMode('baby'); playPopSound(); speakHindi('बेबी मोड! क्रूज़ स्पीड!'); }}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                      speedMode === 'baby' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    🐣 Baby (40 km/h)
                  </button>
                  <button
                    onClick={() => { setSpeedMode('toddler'); playPopSound(); speakHindi('टॉडलर मोड! 100 km/h!'); }}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                      speedMode === 'toddler' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    🦁 Toddler (100 km/h)
                  </button>
                  <button
                    onClick={() => { setSpeedMode('pro'); playPopSound(); speakHindi('प्रो ग्रां प्री मोड!'); }}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                      speedMode === 'pro' ? 'bg-red-600 text-white shadow' : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    🚀 Pro (340 km/h)
                  </button>
                </div>
              </div>

              {/* 6 Supercars Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 my-2">
                {REAL_SUPER_CARS.map((car) => {
                  const isSelected = selectedCar.id === car.id;
                  return (
                    <button
                      key={car.id}
                      onClick={() => {
                        setSelectedCar(car);
                        playPopSound();
                        speakHindi(`${car.brand}! ${car.name}!`);
                      }}
                      className={`p-4 rounded-2xl text-center transition-all transform cursor-pointer flex flex-col items-center justify-between border-3 ${
                        isSelected
                          ? 'border-yellow-400 bg-slate-800 ring-4 ring-yellow-400/40 scale-105 shadow-2xl'
                          : 'border-slate-700 bg-slate-800/80 hover:border-slate-500 hover:scale-102'
                      }`}
                    >
                      <span className="text-5xl my-2 animate-pulse">{car.emoji}</span>
                      <div>
                        <h4 className="font-black text-sm text-white flex items-center justify-center gap-1">
                          <span>{car.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-yellow-400 stroke-[3]" />}
                        </h4>
                        <p className="text-xs font-bold text-yellow-400 mt-0.5">{car.brand}</p>
                        <span className="text-[10px] font-black bg-red-950 text-red-300 px-2.5 py-0.5 rounded-full inline-block mt-1.5 border border-red-800/50">
                          {car.topSpeedKmh} KM/H
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Car Specs Summary */}
              <div className="mt-4 bg-slate-800/80 rounded-2xl p-4 border border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div>
                  <span className="text-slate-400 font-semibold">Engine</span>
                  <p className="font-black text-white text-sm">{selectedCar.specs.engine}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Horsepower</span>
                  <p className="font-black text-yellow-400 text-sm">{selectedCar.specs.horsepower}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">0-100 KM/H</span>
                  <p className="font-black text-emerald-400 text-sm">{selectedCar.acceleration0to100}s</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Selected Circuit</span>
                  <p className="font-black text-sky-400 text-sm">{selectedMap.name.split(' ')[0]}</p>
                </div>
              </div>
            </div>

            {/* Bottom Proceed Button */}
            <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between gap-3">
              <button
                onClick={() => { playPopSound(); setScreenFlow('select_map'); }}
                className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-600 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>CHANGE MAP</span>
              </button>

              <button
                onClick={() => {
                  playPopSound();
                  setScreenFlow('select_timing');
                  speakHindi(`बहुत बढ़िया! अब रेस का समय चुनें!`);
                }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:from-yellow-300 hover:to-orange-400 active:scale-95 text-slate-950 font-black text-lg sm:text-xl shadow-xl flex items-center gap-3 cursor-pointer transition-transform"
              >
                <span>NEXT: CHOOSE LAP TIMING</span>
                <ArrowRight className="w-6 h-6 stroke-[3]" />
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: CHOOSE LAP TIMING / RACE DURATION */}
        {screenFlow === 'select_timing' && (
          <div className="flex-1 flex flex-col justify-between bg-slate-900/95 text-white rounded-3xl p-5 sm:p-6 border-3 border-amber-500 shadow-2xl overflow-y-auto">
            
            <div>
              {/* Header Title with Back Button */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { playPopSound(); setScreenFlow('select_car'); }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 flex items-center gap-1 cursor-pointer text-xs font-bold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Supercars</span>
                  </button>
                  <div>
                    <span className="text-xs font-black bg-amber-600 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                      Step 3 of 3 • Choose Lap Timing
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      Choose Your Race Duration & Loop Timing
                    </h2>
                  </div>
                </div>

                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Timed Grand Prix Session</span>
                </span>
              </div>

              {/* 6 Lap Timing Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 my-2">
                {LAP_TIME_OPTIONS.map((opt) => {
                  const isSelected = selectedLapTiming.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSelectedLapTiming(opt);
                        playPopSound();
                        speakHindi(`${opt.label} रेस चुनी गई!`);
                      }}
                      className={`p-4 rounded-2xl text-left transition-all transform cursor-pointer flex flex-col justify-between border-3 ${
                        isSelected
                          ? 'border-yellow-400 bg-gradient-to-br from-amber-900/90 to-slate-800 ring-4 ring-yellow-400/30 scale-102 shadow-2xl'
                          : 'border-slate-700 bg-slate-800/80 hover:border-slate-500 hover:scale-101'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-4xl">{opt.emoji}</span>
                        <span className="text-xs font-black bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-lg">
                          {opt.bonusMultiplier}x Coin Bonus
                        </span>
                      </div>

                      <div>
                        <h4 className="font-black text-xl text-white flex items-center gap-1.5">
                          <span>{opt.label}</span>
                          {isSelected && <Check className="w-5 h-5 text-yellow-400 stroke-[3]" />}
                        </h4>
                        <p className="text-xs font-bold text-yellow-400 mt-0.5">{opt.subtitle}</p>
                        <p className="text-xs text-slate-300 mt-1">
                          Race on {selectedMap.name.split(' ')[0]} with {selectedCar.name.split(' ')[0]} for {opt.label}!
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Race Summary Strip */}
              <div className="mt-4 bg-slate-800/80 rounded-2xl p-4 border border-slate-700 flex flex-wrap items-center justify-around gap-2 text-center text-xs">
                <div>
                  <span className="text-slate-400 font-semibold">Circuit Map</span>
                  <p className="font-black text-white text-sm">{selectedMap.name.split(' ')[0]}</p>
                </div>
                <div className="h-6 w-px bg-slate-700" />
                <div>
                  <span className="text-slate-400 font-semibold">Supercar</span>
                  <p className="font-black text-yellow-400 text-sm">{selectedCar.name.split(' ')[0]}</p>
                </div>
                <div className="h-6 w-px bg-slate-700" />
                <div>
                  <span className="text-slate-400 font-semibold">Timing Mode</span>
                  <p className="font-black text-emerald-400 text-sm">{selectedLapTiming.label}</p>
                </div>
                <div className="h-6 w-px bg-slate-700" />
                <div>
                  <span className="text-slate-400 font-semibold">Speed Mode</span>
                  <p className="font-black text-sky-400 text-sm uppercase">{speedMode}</p>
                </div>
              </div>
            </div>

            {/* Bottom Giant START RACE Button */}
            <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between gap-3">
              <button
                onClick={() => { playPopSound(); setScreenFlow('select_car'); }}
                className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-600 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>CHANGE CAR</span>
              </button>

              <button
                onClick={startRace}
                className="flex-1 max-w-md py-4 rounded-2xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 hover:from-red-700 hover:to-yellow-500 active:scale-95 text-slate-950 font-black text-xl sm:text-2xl shadow-2xl border-2 border-white flex items-center justify-center gap-3 cursor-pointer transition-transform"
              >
                <Play className="w-7 h-7 fill-slate-950" />
                <span>START {selectedLapTiming.label.toUpperCase()} 3D RACE! 🏁</span>
              </button>
            </div>

          </div>
        )}

        {/* STEP 4: ACTIVE 3D RACE TRACK WITH TIMING & LAP COUNTER */}
        {screenFlow === 'racing' && (
          <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full relative">
            
            {/* Real Cockpit HUD Dashboard */}
            <div className="bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-2xl border-2 border-yellow-400 shadow-2xl flex items-center justify-between gap-3 mb-2 z-20">
              
              {/* Digital Speedometer & Score */}
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700 text-yellow-400 flex items-center gap-1.5 shadow-inner font-mono">
                  <Gauge className="w-4 h-4 text-red-500" />
                  <span>{currentSpeedKmh} KM/H</span>
                </span>

                <span className="text-xs sm:text-sm font-black bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700 text-amber-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{raceScore} PTS</span>
                </span>
              </div>

              {/* Countdown Stopwatch Timer */}
              <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-amber-500/60 font-mono text-sm sm:text-base font-black text-amber-400 shadow">
                <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                <span>{formatCountdown(timeRemainingSeconds)}</span>
              </div>

              {/* Laps Completed Counter */}
              <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-700 font-bold text-xs text-sky-300">
                <Flag className="w-3.5 h-3.5 text-sky-400" />
                <span>LAP {totalLapsCompleted}</span>
              </div>

              {/* Camera & Nitro Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCameraView((prev) => (prev === 'chase' ? 'hood' : 'chase'))}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold border border-slate-600 flex items-center gap-1 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline">{cameraView === 'chase' ? 'Chase' : 'Hood'}</span>
                </button>

                <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-700">
                  <Flame className={`w-4 h-4 ${nitroFuel > 20 ? 'text-orange-500 animate-bounce' : 'text-slate-600'}`} />
                  <span className="text-xs font-black text-orange-400">{Math.floor(nitroFuel)}%</span>
                </div>

                <button
                  onClick={() => { playPopSound(); stopEngineAudio(); setScreenFlow('select_map'); }}
                  className="px-2.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-black text-white cursor-pointer"
                >
                  Quit
                </button>
              </div>

            </div>

            {/* True 3D Projected Canvas Viewport */}
            <div className="flex-1 rounded-3xl overflow-hidden relative border-4 border-slate-700 shadow-2xl bg-black min-h-[300px]">
              <canvas
                ref={canvasRef}
                className="w-full h-full block"
              />

              {/* Touch Half Screens for Quick Steering */}
              <div
                onClick={() => { playerX.current = Math.max(-0.95, playerX.current - 0.25); }}
                className="absolute inset-y-0 left-0 w-1/2 z-10 opacity-0 cursor-pointer"
                title="Tap Left Side to Steer"
              />
              <div
                onClick={() => { playerX.current = Math.min(0.95, playerX.current + 0.25); }}
                className="absolute inset-y-0 right-0 w-1/2 z-10 opacity-0 cursor-pointer"
                title="Tap Right Side to Steer"
              />
            </div>

            {/* Responsive On-Screen Arcade Steering Buttons */}
            <div className="grid grid-cols-4 gap-2 mt-2 z-20">
              <button
                onClick={() => { playerX.current = Math.max(-0.95, playerX.current - 0.25); }}
                className="py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 active:scale-90 text-white font-black text-lg sm:text-xl shadow-lg border-2 border-white flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-7 h-7" />
                <span>STEER L</span>
              </button>

              <button
                onClick={() => { playerX.current = Math.min(0.95, playerX.current + 0.25); }}
                className="py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 active:scale-90 text-white font-black text-lg sm:text-xl shadow-lg border-2 border-white flex items-center justify-center cursor-pointer"
              >
                <span>STEER R</span>
                <ChevronRight className="w-7 h-7" />
              </button>

              <button
                onClick={triggerNitro}
                className={`py-3 sm:py-4 rounded-2xl ${
                  isNitro ? 'bg-orange-600 animate-pulse' : 'bg-gradient-to-r from-red-600 to-amber-500'
                } active:scale-90 text-white font-black text-base sm:text-lg shadow-lg border-2 border-white flex items-center justify-center gap-1 cursor-pointer`}
              >
                <Zap className="w-5 h-5 fill-yellow-300" />
                <span>NITRO!</span>
              </button>

              <button
                onClick={triggerHorn}
                className="py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 active:scale-90 text-slate-950 font-black text-base sm:text-lg shadow-lg border-2 border-white flex items-center justify-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
                <span>HONK!</span>
              </button>
            </div>

          </div>
        )}

        {/* STEP 5: VICTORY PODIUM WITH LEVEL UNLOCK & REWARDS */}
        {screenFlow === 'victory' && (
          <div className="bg-slate-900/95 text-white backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-yellow-400 shadow-2xl text-center max-w-xl mx-auto my-auto animate-fadeIn">
            
            {/* Trophy Icon */}
            <div className="text-7xl mb-2 animate-bounce">🏆</div>
            
            {/* Stars Rating */}
            <div className="flex justify-center gap-2 mb-2">
              {[1, 2, 3].map((starIdx) => (
                <Star
                  key={starIdx}
                  className={`w-9 h-9 ${
                    starIdx <= earnedStars
                      ? 'text-yellow-400 fill-yellow-400 animate-pulse'
                      : 'text-slate-600'
                  }`}
                />
              ))}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-yellow-400 mb-1">
              {selectedMap.rewardTrophy}!
            </h3>
            <p className="text-sm sm:text-base font-bold text-slate-300">
              {selectedCar.name} Finished {selectedLapTiming.label} on {selectedMap.name}!
            </p>

            {/* Results Grid */}
            <div className="my-5 bg-slate-800 p-4 rounded-2xl border border-slate-700 grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-[11px] font-bold text-slate-400">Total Laps</span>
                <p className="text-xl font-black text-sky-400">{totalLapsCompleted} Laps</p>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400">Total Score</span>
                <p className="text-lg font-black text-yellow-400">{raceScore} PTS</p>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400">Reward Coins</span>
                <p className="text-lg font-black text-amber-400">+{earnedCoins} 🪙</p>
              </div>
            </div>

            {/* Action Buttons with Next Level Progression */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={goToNextLevel}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-slate-950 font-black text-lg shadow-xl border-2 border-white flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform"
              >
                <span>NEXT LEVEL CIRCUIT ➡️</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </button>

              <button
                onClick={startRace}
                className="px-5 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-base border border-slate-600 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RETRY</span>
              </button>

              <button
                onClick={() => setScreenFlow('select_map')}
                className="px-5 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base border border-indigo-500 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>CIRCUITS 🌍</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
