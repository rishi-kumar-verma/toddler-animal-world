// Real Animal Sound & Audio Engine for Toddler Animal Game

let audioCtx: AudioContext | null = null;
const audioCache: Record<string, HTMLAudioElement> = {};

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Map animal IDs to authentic recorded sound MP3/WAV files in /sounds/
const REAL_ANIMAL_AUDIO_MAP: Record<string, string> = {
  cow: '/sounds/cow.mp3',
  dog: '/sounds/dog.mp3',
  cat: '/sounds/cat.mp3',
  duck: '/sounds/duck.mp3',
  lion: '/sounds/lion.mp3',
  elephant: '/sounds/elephant.mp3',
  pig: '/sounds/pig.mp3',
  sheep: '/sounds/sheep.mp3',
  rooster: '/sounds/rooster.mp3',
  frog: '/sounds/frog.mp3',
  monkey: '/sounds/monkey.mp3',
  owl: '/sounds/owl.mp3',
  horse: '/sounds/horse.mp3',
  bear: '/sounds/bear.wav',
  bee: '/sounds/duck.mp3',
  dolphin: '/sounds/dolphin.wav',
};

// Preload real sound files
export function preloadAnimalSounds() {
  Object.entries(REAL_ANIMAL_AUDIO_MAP).forEach(([id, src]) => {
    try {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audioCache[id] = audio;
    } catch {
      // Ignore
    }
  });
}

// Speak the animal name using Web Speech API with pitch & rate tuned for toddler friendliness
export function speakText(text: string, pitch = 1.2, rate = 0.95) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Zira'))
    ) || voices.find(v => v.lang.startsWith('en'));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    window.speechSynthesis.speak(utterance);
  }
}

// Play UI Pop sound effect
export function playPopSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {
    console.error('Audio play pop error', e);
  }
}

// Play UI Cheer / Sparkle sound effect
export function playCheerSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.3, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  } catch (e) {
    console.error('Audio play cheer error', e);
  }
}

// Play authentic recorded animal sound file
export function playAnimalSound(animalId: string) {
  try {
    const realAudioSrc = REAL_ANIMAL_AUDIO_MAP[animalId];
    if (realAudioSrc) {
      const audio = new Audio(realAudioSrc);
      audio.currentTime = 0;
      audio.volume = 1.0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio autoplay prevented or error:', err);
          playSynthesizedAnimalSound(animalId);
        });
      }
      return;
    }
  } catch (e) {
    console.warn('Audio play failed, falling back:', e);
  }

  playSynthesizedAnimalSound(animalId);
}

// Synthesize custom realistic animal noises as fallback
function playSynthesizedAnimalSound(animalId: string) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    switch (animalId) {
      case 'cow': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, now);

        osc.frequency.setValueAtTime(140, now);
        osc.frequency.linearRampToValueAtTime(155, now + 0.3);
        osc.frequency.linearRampToValueAtTime(120, now + 1.2);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.5, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1.3);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.35);
        break;
      }
      default:
        playPopSound();
    }
  } catch (e) {
    console.error('Synthesizer audio error', e);
  }
}
