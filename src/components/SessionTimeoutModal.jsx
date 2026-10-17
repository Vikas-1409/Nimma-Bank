// src/components/SessionTimeoutModal.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Clock, ShieldAlert, LogOut, CheckCircle2 } from 'lucide-react';

export const SessionTimeoutModal = () => {
  const { sessionTimeoutWarning, extendSession, logout } = useAuth();
  const { t } = useLanguage();

  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (!sessionTimeoutWarning) {
      setCountdown(30);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          logout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionTimeoutWarning, logout]);

  if (!sessionTimeoutWarning) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card session-modal animate-fade-in">
        <div className="session-icon">
          <Clock size={40} color="#F57C00" />
        </div>
        <h2>{t('sessionTimeoutTitle')}</h2>
        <p>{t('sessionTimeoutMsg')}</p>

        <div className="countdown-ring">
          <span className="countdown-sec">{countdown}s</span>
        </div>

        <div className="modal-footer">
          <button onClick={logout} className="btn-secondary">
            <LogOut size={16} />
            <span>{t('logoutNowBtn')}</span>
          </button>
          <button onClick={extendSession} className="btn-primary">
            <CheckCircle2 size={16} />
            <span>{t('extendSessionBtn')}</span>
          </button>
        </div>
      </div>

      <style>{`
        .session-modal {
          text-align: center;
          max-width: 440px;
        }

        .session-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background-color: #FFF3E0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem auto;
        }

        .countdown-ring {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 4px solid var(--primary-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1rem auto 1.5rem auto;
          background-color: var(--soft-mint);
        }

        .countdown-sec {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--primary-teal);
        }
      `}</style>
    </div>
  );
};
