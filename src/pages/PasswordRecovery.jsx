// src/pages/PasswordRecovery.jsx
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { KeyRound, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export const PasswordRecovery = ({ onGoLogin }) => {
  const { t } = useLanguage();

  const [phone, setPhone] = useState('9876543210');
  const [answer, setAnswer] = useState('Gejjalagere');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!answer.trim()) {
      setErrorMsg('Please enter your village/town name answer.');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('Demo Password reset successfully! Your temporary password is: password123');
  };

  return (
    <div className="recovery-page animate-fade-in">
      <div className="nimma-card recovery-card">
        <button onClick={onGoLogin} className="back-link">
          <ArrowLeft size={18} />
          <span>{t('backToLogin')}</span>
        </button>

        <div className="recovery-header">
          <div className="icon-badge">
            <KeyRound size={32} color="#147D75" />
          </div>
          <h2>{t('recoveryTitle')}</h2>
          <p className="subtitle">{t('recoverySubtitle')}</p>
          <ReadAloudButton text={`${t('recoveryTitle')}. ${t('recoverySubtitle')}`} />
        </div>

        {errorMsg && (
          <div className="error-alert">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="success-alert">
            <CheckCircle2 size={18} />
            <div>
              <p style={{ margin: 0, fontWeight: 700 }}>{successMsg}</p>
              <button onClick={onGoLogin} className="btn-primary" style={{ marginTop: '0.75rem' }}>
                {t('loginHere')}
              </button>
            </div>
          </div>
        )}

        {!successMsg && (
          <form onSubmit={handleReset} className="recovery-form">
            <div className="form-group">
              <label className="form-label">{t('phoneLabel')}</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t('phonePlaceholder')}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t('securityQuestion')}</label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={t('securityAnswerPlaceholder')}
                className="form-input"
                required
              />
            </div>

            <button type="submit" className="btn-primary reset-btn">
              <span>{t('resetPasswordButton')}</span>
            </button>
          </form>
        )}
      </div>

      <style>{`
        .recovery-card {
          max-width: 480px;
          margin: 1.5rem auto;
          padding: 2rem 1.5rem;
          border-radius: 24px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--secondary-text);
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .recovery-header {
          text-align: center;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
        }

        .reset-btn {
          min-height: 54px;
          font-size: calc(1.1rem * var(--font-scale));
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
};
