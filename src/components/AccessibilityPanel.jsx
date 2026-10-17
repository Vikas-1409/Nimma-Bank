// src/components/AccessibilityPanel.jsx
import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { Type, Sun, Moon, Volume2, RotateCcw, X, Check } from 'lucide-react';

export const AccessibilityPanel = ({ isOpen, onClose }) => {
  const {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    autoRead,
    setAutoRead,
    resetAccessibility
  } = useAccessibility();
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="accessibility-panel-card animate-fade-in">
        <div className="panel-header">
          <div className="header-title-group">
            <Type size={24} color="#147D75" />
            <h2>{t('accessibilityTitle')}</h2>
          </div>
          <button onClick={onClose} className="close-panel-btn" aria-label={t('closePanel')}>
            <X size={22} />
          </button>
        </div>

        <div className="panel-body">
          {/* Font Size Selection */}
          <div className="setting-section">
            <label className="setting-label">{t('textSizeSetting')}</label>
            <div className="button-group-options">
              <button
                onClick={() => setFontSize('normal')}
                className={`option-btn ${fontSize === 'normal' ? 'selected' : ''}`}
              >
                <span>A</span>
                <span className="option-sub">{t('fontSizeNormal')}</span>
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`option-btn ${fontSize === 'large' ? 'selected' : ''}`}
              >
                <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>A</span>
                <span className="option-sub">{t('fontSizeLarge')}</span>
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`option-btn ${fontSize === 'xlarge' ? 'selected' : ''}`}
              >
                <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>A</span>
                <span className="option-sub">{t('fontSizeXLarge')}</span>
              </button>
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div className="setting-section">
            <label className="setting-label">{t('contrastSetting')}</label>
            <div className="button-group-options">
              <button
                onClick={() => setHighContrast(false)}
                className={`option-btn ${!highContrast ? 'selected' : ''}`}
              >
                <Sun size={20} />
                <span>{t('highContrastOff')}</span>
              </button>
              <button
                onClick={() => setHighContrast(true)}
                className={`option-btn ${highContrast ? 'selected' : ''}`}
              >
                <Moon size={20} />
                <span>{t('highContrastOn')}</span>
              </button>
            </div>
          </div>

          {/* Auto Read Pages Aloud */}
          <div className="setting-section">
            <label className="setting-label">Audio Guidance</label>
            <button
              onClick={() => setAutoRead(!autoRead)}
              className={`toggle-row-btn ${autoRead ? 'active' : ''}`}
            >
              <Volume2 size={20} />
              <span>{t('ttsAutoRead')}</span>
              <div className={`checkbox-indicator ${autoRead ? 'checked' : ''}`}>
                {autoRead && <Check size={16} />}
              </div>
            </button>
          </div>
        </div>

        <div className="panel-footer">
          <button onClick={resetAccessibility} className="btn-secondary">
            <RotateCcw size={16} />
            {t('resetAccessibility')}
          </button>
          <button onClick={onClose} className="btn-primary">
            {t('closePanel')}
          </button>
        </div>
      </div>

      <style>{`
        .accessibility-panel-card {
          background-color: var(--white);
          border-radius: 24px;
          max-width: 520px;
          width: 100%;
          padding: 1.5rem;
          border: 2px solid var(--border-color);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
        }

        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid var(--border-color);
          padding-bottom: 1rem;
          margin-bottom: 1.25rem;
        }

        .header-title-group {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .header-title-group h2 {
          margin: 0;
        }

        .close-panel-btn {
          background: none;
          border: none;
          color: var(--secondary-text);
          cursor: pointer;
        }

        .setting-section {
          margin-bottom: 1.25rem;
        }

        .setting-label {
          font-weight: 700;
          display: block;
          margin-bottom: 0.5rem;
          color: var(--dark-text);
        }

        .button-group-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }

        .option-btn {
          background-color: var(--cream-bg);
          border: 2px solid var(--border-color);
          border-radius: 14px;
          padding: 0.75rem 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          font-weight: 600;
          color: var(--dark-text);
          transition: all 0.2s ease;
        }

        .option-btn:hover {
          background-color: var(--soft-mint);
        }

        .option-btn.selected {
          border-color: var(--primary-teal);
          background-color: var(--soft-mint);
          color: var(--primary-teal);
          box-shadow: 0 0 0 2px var(--primary-teal);
        }

        html.high-contrast .option-btn.selected {
          border-color: #FFE600;
          color: #FFE600;
        }

        .option-sub {
          font-size: calc(0.75rem * var(--font-scale));
          text-align: center;
        }

        .toggle-row-btn {
          width: 100%;
          background-color: var(--cream-bg);
          border: 2px solid var(--border-color);
          border-radius: 14px;
          padding: 0.85rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          color: var(--dark-text);
          cursor: pointer;
        }

        .toggle-row-btn.active {
          border-color: var(--primary-teal);
          background-color: var(--soft-mint);
        }

        .checkbox-indicator {
          margin-left: auto;
          width: 22px;
          height: 22px;
          border-radius: 6px;
          border: 2px solid var(--secondary-text);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .checkbox-indicator.checked {
          background-color: var(--primary-teal);
          border-color: var(--primary-teal);
          color: white;
        }

        .panel-footer {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
      `}</style>
    </div>
  );
};
