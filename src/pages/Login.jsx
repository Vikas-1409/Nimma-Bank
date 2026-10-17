// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { LogIn, Eye, EyeOff, KeyRound, UserCheck, AlertCircle, HelpCircle } from 'lucide-react';
import { validatePassword, validateUserId } from '../utils/validation';

export const Login = ({ onLoginSuccess, onGoRegister, onGoRecovery }) => {
  const { login } = useAuth();
  const { t } = useLanguage();

  const [userId, setUserId] = useState('DEMO1234');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const userIdError = validateUserId(userId);
    if (userIdError) {
      setErrorMessage(userIdError);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    const res = login(userId, password);
    if (res.success) {
      onLoginSuccess();
    } else {
      setErrorMessage(res.message || t('invalidCredentialsMsg'));
    }
  };

  const loginInstructionsText = `${t('loginTitle')}. ${t('loginSubtitle')}. Demo User ID: DEMO1234, Password: password123.`;

  return (
    <div className="login-page animate-fade-in">
      <div className="nimma-card login-card">
        <div className="login-header">
          <div className="icon-badge">
            <UserCheck size={32} color="#147D75" />
          </div>
          <h2>{t('loginTitle')}</h2>
          <p className="subtitle">{t('loginSubtitle')}</p>
          <ReadAloudButton text={loginInstructionsText} />
        </div>

        {/* Quick Demo Hint */}
        <div className="demo-credentials-box">
          <KeyRound size={18} color="#147D75" />
          <span>Quick Demo Access: User ID: <strong>DEMO1234</strong> | Pass: <strong>password123</strong></span>
        </div>

        {errorMessage && (
          <div className="error-alert">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          {/* User ID Field */}
          <div className="form-group">
            <label className="form-label">{t('userIdLabel')}</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder={t('userIdPlaceholder')}
              className="form-input"
              autoCapitalize="characters"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="form-label">{t('passwordLabel')}</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('passwordPlaceholder')}
                className="form-input"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-pass-btn"
                aria-label={showPassword ? t('hidePassword') : t('showPassword')}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Action */}
          <button type="submit" className="btn-primary login-btn">
            <LogIn size={20} />
            <span>{t('loginButton')}</span>
          </button>
        </form>

        {/* Links */}
        <div className="login-footer">
          <button onClick={onGoRecovery} className="footer-link">
            <HelpCircle size={16} />
            <span>{t('forgotPasswordLink')}</span>
          </button>

          <div className="register-prompt">
            <span>{t('noAccount')}</span>{' '}
            <button onClick={onGoRegister} className="register-link">
              {t('registerHere')}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .login-card {
          max-width: 480px;
          margin: 1.5rem auto;
          padding: 2rem 1.5rem;
          border-radius: 24px;
        }

        .login-header {
          text-align: center;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .icon-badge {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background-color: var(--soft-mint);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: var(--secondary-text);
          font-size: calc(0.95rem * var(--font-scale));
          margin: 0;
        }

        .demo-credentials-box {
          background-color: #E8F5E9;
          border: 1px solid #A5D6A7;
          color: #1B5E20;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-size: calc(0.85rem * var(--font-scale));
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        html.high-contrast .demo-credentials-box {
          background-color: #003311;
          color: #FFE600;
          border-color: #FFE600;
        }

        .error-alert {
          background-color: var(--danger-bg);
          color: var(--danger-red);
          border: 1px solid var(--danger-red);
          padding: 0.75rem 1rem;
          border-radius: 12px;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: calc(0.85rem * var(--font-scale));
        }

        .password-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .toggle-pass-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: var(--secondary-text);
          cursor: pointer;
        }

        .login-btn {
          min-height: 54px;
          font-size: calc(1.1rem * var(--font-scale));
          margin-top: 0.5rem;
        }

        .login-footer {
          margin-top: 1.5rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .footer-link {
          color: var(--secondary-text);
          font-weight: 600;
          font-size: calc(0.9rem * var(--font-scale));
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .register-prompt {
          font-size: calc(0.9rem * var(--font-scale));
          color: var(--secondary-text);
        }

        .register-link {
          color: var(--primary-teal);
          font-weight: 700;
          text-decoration: underline;
        }

        html.high-contrast .register-link {
          color: #FFE600;
        }
      `}</style>
    </div>
  );
};
