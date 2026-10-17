// src/pages/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { UserPlus, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export const Register = ({ onAccountCreated, onGoLogin }) => {
  const { register } = useAuth();
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg(t('fullNameLabel') + ' is required.');
      return;
    }
    if (!userId.trim()) {
      setErrorMsg(t('userIdLabel') + ' is required.');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMsg('Password must be at least 4 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    const res = register(name, userId, password);
    if (res.success) {
      setSuccessMsg(t('accountCreatedMsg'));
      setTimeout(() => {
        onAccountCreated();
      }, 1500);
    }
  };

  return (
    <div className="register-page animate-fade-in">
      <div className="nimma-card register-card">
        <button onClick={onGoLogin} className="back-link">
          <ArrowLeft size={18} />
          <span>{t('backToLogin')}</span>
        </button>

        <div className="register-header">
          <h2>{t('registerTitle')}</h2>
          <p className="subtitle">{t('registerSubtitle')}</p>
          <ReadAloudButton text={`${t('registerTitle')}. ${t('registerSubtitle')}`} />
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
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label className="form-label">{t('fullNameLabel')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('fullNamePlaceholder')}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('userIdLabel')}</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder={t('userIdPlaceholder')}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('passwordLabel')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('passwordPlaceholder')}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('confirmPasswordLabel')}</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="btn-primary create-btn">
            <UserPlus size={20} />
            <span>{t('createAccountButton')}</span>
          </button>
        </form>

        <div className="register-footer">
          <span>{t('hasAccount')}</span>{' '}
          <button onClick={onGoLogin} className="login-link">
            {t('loginHere')}
          </button>
        </div>
      </div>

      <style>{`
        .register-card {
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

        .register-header {
          text-align: center;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
        }

        .success-alert {
          background-color: var(--success-bg);
          color: var(--success-green);
          border: 1px solid var(--success-green);
          padding: 0.75rem 1rem;
          border-radius: 12px;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
        }

        .create-btn {
          min-height: 54px;
          font-size: calc(1.1rem * var(--font-scale));
          margin-top: 0.5rem;
        }

        .register-footer {
          margin-top: 1.5rem;
          text-align: center;
          font-size: calc(0.9rem * var(--font-scale));
        }

        .login-link {
          color: var(--primary-teal);
          font-weight: 700;
          text-decoration: underline;
        }

        html.high-contrast .login-link {
          color: #FFE600;
        }
      `}</style>
    </div>
  );
};
