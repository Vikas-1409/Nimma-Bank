// src/components/AppHeader.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { useNetwork } from '../context/NetworkContext';
import { useAuth } from '../context/AuthContext';
import { Languages, Type, ShieldAlert, Wifi, WifiOff, Volume2, VolumeX, User } from 'lucide-react';

export const AppHeader = ({ onOpenAccessibility }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { isSpeaking, stopAudio } = useAccessibility();
  const { isOnline, isOfflineSimulated, toggleOfflineSimulation } = useNetwork();
  const { isAuthenticated, userProfile, logout } = useAuth();

  return (
    <header className="app-header">
      {/* Top Banner: Demo Prototype Disclaimer */}
      <div className="demo-banner">
        <ShieldAlert size={16} />
        <span>{t('demoNotice')}</span>
      </div>

      {/* Main Header Bar */}
      <div className="header-main">
        <div className="brand-group">
          <div className="logo-badge">
            <span className="logo-icon">🏦</span>
            <div className="brand-text">
              <span className="brand-name">{t('appName')}</span>
              <span className="brand-tagline">{t('tagline')}</span>
            </div>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="header-actions">
          {/* Audio Stop Button if speaking */}
          {isSpeaking && (
            <button
              onClick={stopAudio}
              className="header-icon-btn audio-active"
              title={t('stopListening')}
              aria-label={t('stopListening')}
            >
              <VolumeX size={20} />
            </button>
          )}

          {/* Offline Simulation Toggle */}
          <button
            onClick={toggleOfflineSimulation}
            className={`header-icon-btn ${!isOnline ? 'offline-active' : ''}`}
            title={isOnline ? t('onlineStatus') : t('offlineStatus')}
            aria-label={isOnline ? t('onlineStatus') : t('offlineStatus')}
          >
            {isOnline ? <Wifi size={20} color="#2E7D32" /> : <WifiOff size={20} color="#D32F2F" />}
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="lang-toggle-btn"
            title="Switch Language / ಭಾಷೆ ಬದಲಾಯಿಸಿ"
            aria-label="Switch Language / ಭಾಷೆ ಬದಲಾಯಿಸಿ"
          >
            <Languages size={18} />
            <span className="lang-text">{language === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
          </button>

          {/* Accessibility Settings Panel Button */}
          <button
            onClick={onOpenAccessibility}
            className="header-icon-btn"
            title={t('accessibilityTitle')}
            aria-label={t('accessibilityTitle')}
          >
            <Type size={20} />
          </button>
        </div>
      </div>

      <style>{`
        .app-header {
          background-color: var(--white);
          border-bottom: 2px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .demo-banner {
          background-color: #FFF3CD;
          color: #856404;
          font-size: 0.75rem;
          font-weight: 600;
          text-align: center;
          padding: 0.25rem 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          border-bottom: 1px solid #FFEBAA;
        }

        html.high-contrast .demo-banner {
          background-color: #332200;
          color: #FFE600;
          border-bottom: 1px solid #FFE600;
        }

        .header-main {
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .brand-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-icon {
          font-size: 1.75rem;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-weight: 800;
          font-size: calc(1.2rem * var(--font-scale));
          color: var(--primary-teal);
          line-height: 1.1;
        }

        .brand-tagline {
          font-size: calc(0.7rem * var(--font-scale));
          color: var(--secondary-text);
          font-weight: 500;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .lang-toggle-btn {
          background-color: var(--soft-mint);
          color: var(--dark-text);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 0.35rem 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 700;
          font-size: calc(0.85rem * var(--font-scale));
          transition: transform 0.15s ease;
        }

        .lang-toggle-btn:hover {
          transform: scale(1.05);
          background-color: var(--primary-teal);
          color: var(--white);
        }

        .header-icon-btn {
          background-color: var(--cream-bg);
          border: 1px solid var(--border-color);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--dark-text);
          transition: background-color 0.2s ease;
        }

        .header-icon-btn:hover {
          background-color: var(--soft-mint);
        }

        .audio-active {
          background-color: var(--danger-red);
          color: white;
          animation: pulse 1s infinite;
        }

        .offline-active {
          background-color: var(--danger-bg);
          border-color: var(--danger-red);
        }
      `}</style>
    </header>
  );
};
