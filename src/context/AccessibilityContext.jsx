// src/context/AccessibilityContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { speak, stopSpeech } from '../utils/speech';
import { useLanguage } from './LanguageContext';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('nimmaBank_fontSize') || 'normal';
  });

  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('nimmaBank_highContrast') === 'true';
  });

  const [autoRead, setAutoRead] = useState(() => {
    return localStorage.getItem('nimmaBank_autoRead') === 'true';
  });

  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    localStorage.setItem('nimmaBank_fontSize', fontSize);
    localStorage.setItem('nimmaBank_highContrast', highContrast.toString());
    localStorage.setItem('nimmaBank_autoRead', autoRead.toString());

    // Apply root CSS classes for Font Size & High Contrast
    const root = document.documentElement;
    
    // Font scale variables
    if (fontSize === 'large') {
      root.style.setProperty('--font-scale', '1.2');
    } else if (fontSize === 'xlarge') {
      root.style.setProperty('--font-scale', '1.4');
    } else {
      root.style.setProperty('--font-scale', '1.0');
    }

    // High contrast theme toggles
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [fontSize, highContrast, autoRead]);

  const speakText = (text, lang = 'en') => {
    setIsSpeaking(true);
    speak(text, lang, () => {
      setIsSpeaking(false);
    });
  };

  const stopAudio = () => {
    stopSpeech();
    setIsSpeaking(false);
  };

  const resetAccessibility = () => {
    setFontSize('normal');
    setHighContrast(false);
    setAutoRead(false);
    stopAudio();
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        autoRead,
        setAutoRead,
        isSpeaking,
        speakText,
        stopAudio,
        resetAccessibility
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
