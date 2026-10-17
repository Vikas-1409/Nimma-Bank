// src/utils/speech.js

// Speech Synthesis (Text-to-Speech)
export const speak = (text, lang = 'en', onEnd = null) => {
  if (!('speechSynthesis' in window)) {
    console.warn("Speech synthesis is not supported in this browser.");
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  if (!text || text.trim() === '') return false;

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language code
  utterance.lang = lang === 'kn' ? 'kn-IN' : 'en-IN';
  utterance.rate = 0.9; // Slightly slower for elderly/accessibility clarity
  utterance.pitch = 1.0;

  // Attempt to select an appropriate voice
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    const targetLangPrefix = lang === 'kn' ? 'kn' : 'en';
    const matchingVoice = voices.find(v => v.lang.startsWith(targetLangPrefix));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return true;
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// Speech Recognition (Voice Commands)
export const initSpeechRecognition = (lang = 'en', onResult, onError, onEnd) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = lang === 'kn' ? 'kn-IN' : 'en-IN';

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (onResult) {
      onResult(transcript);
    }
  };

  recognition.onerror = (event) => {
    if (onError) {
      onError(event.error);
    }
  };

  recognition.onend = () => {
    if (onEnd) {
      onEnd();
    }
  };

  return recognition;
};

// Command Matcher Helper
export const parseVoiceCommand = (transcript, lang = 'en') => {
  const text = transcript.toLowerCase();

  // Balance command
  if (
    text.includes('balance') ||
    text.includes('ಬಾಕಿ') ||
    text.includes('ಹಣ ನೋಡಿ') ||
    text.includes('check balance') ||
    text.includes('show balance')
  ) {
    return { action: 'NAVIGATE', path: '/balance', label: 'Check Balance' };
  }

  // Send Money command
  if (
    text.includes('send') ||
    text.includes('transfer') ||
    text.includes('ಹಣ ಕಳುಹಿಸಿ') ||
    text.includes('ರವಾನಿಸಿ') ||
    text.includes('send money')
  ) {
    return { action: 'NAVIGATE', path: '/transfer', label: 'Send Money' };
  }

  // Transactions command
  if (
    text.includes('history') ||
    text.includes('transactions') ||
    text.includes('ವ್ಯವಹಾರ') ||
    text.includes('ಇತಿಹಾಸ') ||
    text.includes('show transactions')
  ) {
    return { action: 'NAVIGATE', path: '/transactions', label: 'Transaction History' };
  }

  // Profile command
  if (
    text.includes('profile') ||
    text.includes('settings') ||
    text.includes('ಪ್ರೊಫೈಲ್') ||
    text.includes('ಸಂರಚನೆ')
  ) {
    return { action: 'NAVIGATE', path: '/profile', label: 'Profile' };
  }

  // Help command
  if (
    text.includes('help') ||
    text.includes('faq') ||
    text.includes('ಸಹಾಯ') ||
    text.includes('ನೆರವು') ||
    text.includes('open help')
  ) {
    return { action: 'NAVIGATE', path: '/help', label: 'Help Center' };
  }

  // Dashboard / Home command
  if (
    text.includes('home') ||
    text.includes('dashboard') ||
    text.includes('ಮುಖಪುಟ') ||
    text.includes('open dashboard')
  ) {
    return { action: 'NAVIGATE', path: '/dashboard', label: 'Home' };
  }

  // Language command
  if (text.includes('kannada') || text.includes('ಕನ್ನಡ')) {
    return { action: 'CHANGE_LANG', lang: 'kn', label: 'Switch to Kannada' };
  }
  if (text.includes('english') || text.includes('ಇಂಗ್ಲಿಷ್')) {
    return { action: 'CHANGE_LANG', lang: 'en', label: 'Switch to English' };
  }

  return { action: 'UNKNOWN', text };
};
