// src/components/ConnectionStatus.jsx
import React from 'react';
import { useNetwork } from '../context/NetworkContext';
import { useLanguage } from '../context/LanguageContext';
import { WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';

export const ConnectionStatus = () => {
  const { isOnline, isOfflineSimulated, toggleOfflineSimulation } = useNetwork();
  const { t } = useLanguage();

  if (isOnline) return null;

  return (
    <div className="offline-banner animate-fade-in">
      <div className="banner-content">
        <WifiOff size={20} className="banner-icon" />
        <div className="banner-text">
          <span className="banner-title">{t('offlineStatus')}</span>
          <span className="banner-subtitle">{t('offlineBannerMsg')}</span>
        </div>
      </div>
      <button onClick={toggleOfflineSimulation} className="banner-action-btn">
        <RefreshCw size={14} />
        <span>{t('simulateOnlineBtn')}</span>
      </button>

      <style>{`
        .offline-banner {
          background-color: #FFF3E0;
          border: 2px solid #F57C00;
          color: #E65100;
          border-radius: 14px;
          padding: 0.85rem 1rem;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }

        html.high-contrast .offline-banner {
          background-color: #332200;
          border-color: #FFE600;
          color: #FFE600;
        }

        .banner-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .banner-icon {
          flex-shrink: 0;
        }

        .banner-text {
          display: flex;
          flex-direction: column;
        }

        .banner-title {
          font-weight: 700;
          font-size: calc(0.9rem * var(--font-scale));
        }

        .banner-subtitle {
          font-size: calc(0.78rem * var(--font-scale));
          opacity: 0.9;
        }

        .banner-action-btn {
          background-color: #F57C00;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 0.4rem 0.75rem;
          font-size: calc(0.75rem * var(--font-scale));
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          white-space: nowrap;
        }

        html.high-contrast .banner-action-btn {
          background-color: #FFE600;
          color: #000000;
        }
      `}</style>
    </div>
  );
};
