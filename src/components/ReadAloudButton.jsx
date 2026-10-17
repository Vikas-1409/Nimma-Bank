// src/components/ReadAloudButton.jsx
import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { Volume2, VolumeX } from 'lucide-react';

export const ReadAloudButton = ({ text, className = '', label = null }) => {
  const { isSpeaking, speakText, stopAudio } = useAccessibility();
  const { language, t } = useLanguage();

  const handleToggle = (e) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopAudio();
    } else {
      speakText(text, language);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`read-aloud-btn ${isSpeaking ? 'speaking' : ''} ${className}`}
      title={isSpeaking ? t('stopListening') : t('listenToPage')}
      aria-label={isSpeaking ? t('stopListening') : t('listenToPage')}
    >
      {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
      <span>{label || (isSpeaking ? t('stopListening') : t('listenToPage'))}</span>

      <style>{`
        .read-aloud-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: var(--soft-mint);
          color: var(--dark-text);
          border: 1px solid var(--border-color);
          padding: 0.4rem 0.85rem;
          border-radius: 20px;
          font-size: calc(0.85rem * var(--font-scale));
          font-weight: 600;
          transition: background-color 0.2s ease, transform 0.15s ease;
        }

        .read-aloud-btn:hover {
          background-color: var(--primary-teal);
          color: var(--white);
          transform: scale(1.02);
        }

        .read-aloud-btn.speaking {
          background-color: var(--danger-red);
          color: white;
          animation: pulse 1s infinite;
        }
      `}</style>
    </button>
  );
};
