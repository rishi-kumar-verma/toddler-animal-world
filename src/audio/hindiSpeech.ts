// Hindi Speech Synthesis Helper for Kids Hub

export function stopAllSpeech() {
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
}

export function speakHindi(text: string, pitch = 1.25, rate = 0.9) {
  if ('speechSynthesis' in window) {
    stopAllSpeech();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    // Look for Hindi voice or Indian English
    const hindiVoice = voices.find(v => v.lang.startsWith('hi') || v.lang.includes('IN') || v.name.toLowerCase().includes('hindi') || v.name.toLowerCase().includes('india'));
    
    if (hindiVoice) {
      utterance.voice = hindiVoice;
      utterance.lang = hindiVoice.lang || 'hi-IN';
    } else {
      utterance.lang = 'hi-IN';
    }

    window.speechSynthesis.speak(utterance);
  }
}
