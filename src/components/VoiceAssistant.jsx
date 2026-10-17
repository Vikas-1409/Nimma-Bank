// src/components/VoiceAssistant.jsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { initSpeechRecognition, parseVoiceCommand } from '../utils/speech';
import { Mic, MicOff, AlertCircle, CheckCircle2, X } from 'lucide-react';

export const VoiceAssistant = ({ onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const { speakText } = useAccessibility();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const rec = initSpeechRecognition(
      language,
      (text) => handleSpeechResult(text),
      (err) => handleSpeechError(err),
      () => setIsListening(false)
    );
    setRecognition(rec);
  }, [language]);

  const handleSpeechResult = (text) => {
    setTranscript(text);
    const parsed = parseVoiceCommand(text, language);

    if (parsed.action === 'NAVIGATE') {
      const msg = `${t('voiceCommandExecuted')} "${parsed.label}"`;
      setFeedbackMsg(msg);
      speakText(msg, language);
      if (onNavigate) {
        onNavigate(parsed.path);
      }
    } else if (parsed.action === 'CHANGE_LANG') {
      setLanguage(parsed.lang);
      const msg = `Switched language to ${parsed.lang === 'kn' ? 'Kannada' : 'English'}`;
      setFeedbackMsg(msg);
      speakText(msg, parsed.lang);
    } else {
      const msg = language === 'kn' ? 'ಆಜ್ಞೆ ಅರ್ಥವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ.' : 'Command not recognized. Please try again.';
      setErrorMsg(msg);
      speakText(msg, language);
    }
  };

  const handleSpeechError = (error) => {
    setIsListening(false);
    if (error === 'not-allowed' || error === 'permission-denied') {
      setErrorMsg(t('voiceDenied'));
    } else {
      setErrorMsg(t('voiceUnsupported'));
    }
  };

  const toggleListening = () => {
    if (!recognition) {
      setErrorMsg(t('voiceUnsupported'));
      speakText(t('voiceUnsupported'), language);
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setErrorMsg('');
      setFeedbackMsg('');
      setTranscript('');
      try {
        recognition.start();
        setIsListening(true);
        speakText(t('voiceListening'), language);
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  return (
    <div className="voice-assistant-floating">
      {/* Toast Feedback popup */}
      {(feedbackMsg || errorMsg || isListening) && (
        <div className={`voice-toast ${errorMsg ? 'toast-error' : feedbackMsg ? 'toast-success' : 'toast-listening'}`}>
          <div className="toast-header">
            {errorMsg ? (
              <AlertCircle size={18} />
            ) : feedbackMsg ? (
              <CheckCircle2 size={18} />
            ) : (
              <span className="listening-dot"></span>
            )}
            <span className="toast-title">
              {isListening ? t('voiceListening') : errorMsg ? 'Notice' : 'Executed'}
            </span>
            <button onClick={() => { setFeedbackMsg(''); setErrorMsg(''); }} className="close-toast">
              <X size={14} />
            </button>
          </div>
          <p className="toast-body">
            {isListening
              ? transcript || t('voicePromptMsg')
              : errorMsg || feedbackMsg}
          </p>
        </div>
      )}

      {/* Floating Mic Action Button */}
      <button
        onClick={toggleListening}
        className={`floating-mic-btn ${isListening ? 'mic-listening' : ''}`}
        title={t('voiceTitle')}
        aria-label={t('voiceTitle')}
      >
        {isListening ? <MicOff size={26} /> : <Mic size={26} />}
        <span className="mic-label">{t('voiceTitle')}</span>
      </button>

      <style>{`
        .voice-assistant-floating {
          position: fixed;
          bottom: calc(var(--bottom-nav-height) + 1rem);
          right: 1.25rem;
          z-index: 95;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
        }

        .floating-mic-btn {
          background-color: var(--primary-teal);
          color: white;
          border-radius: 30px;
          padding: 0.6rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 6px 20px rgba(20, 125, 117, 0.35);
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        html.high-contrast .floating-mic-btn {
          background-color: #FFE600;
          color: #000000;
        }

        .floating-mic-btn:hover {
          transform: scale(1.05);
          background-color: var(--primary-teal-hover);
        }

        .mic-label {
          font-weight: 700;
          font-size: calc(0.9rem * var(--font-scale));
        }

        .voice-toast {
          background-color: var(--white);
          border-radius: 14px;
          padding: 0.85rem 1rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          border: 2px solid var(--border-color);
          max-width: 280px;
          animation: fadeIn 0.2s ease-out;
        }

        .toast-listening {
          border-color: var(--primary-teal);
        }

        .toast-success {
          border-color: var(--success-green);
          background-color: var(--success-bg);
        }

        .toast-error {
          border-color: var(--danger-red);
          background-color: var(--danger-bg);
        }

        .toast-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .close-toast {
          margin-left: auto;
          background: none;
          border: none;
          min-height: auto;
          cursor: pointer;
        }

        .listening-dot {
          width: 10px;
          height: 10px;
          background-color: var(--danger-red);
          border-radius: 50%;
          display: inline-block;
          animation: pulse 1s infinite;
        }

        .toast-body {
          font-size: calc(0.85rem * var(--font-scale));
          margin: 0;
        }
      `}</style>
    </div>
  );
};
