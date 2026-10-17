// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { useBanking } from '../context/BankingContext';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { User, Languages, Type, Moon, Sun, BookOpen, HelpCircle, RotateCcw, LogOut, Shield, MapPin, Building, ArrowLeft } from 'lucide-react';

export const Profile = ({
  onBack,
  onOpenAccessibility,
  onNavigate
}) => {
  const { userProfile, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { highContrast, setHighContrast } = useAccessibility();
  const { resetBankingData } = useBanking();

  const userName = userProfile.name[language] || userProfile.name.en;
  const branchName = userProfile.branch[language] || userProfile.branch.en;
  const villageName = userProfile.village[language] || userProfile.village.en;

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const profileAudioText = `${t('profileTitle')}. ${userName}. ${t('accNumberLabel')}: ${userProfile.accountNumber}. ${branchName}.`;

  const handleResetData = () => {
    resetBankingData();
    setShowResetConfirm(false);
    alert('Demo data successfully reset to default initial values.');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="profile-page animate-fade-in">
      {onBack && (
        <button onClick={onBack} className="back-link">
          <ArrowLeft size={18} />
          <span>{t('backToDashboard')}</span>
        </button>
      )}

      <div className="profile-header-row">
        <h2>{t('profileTitle')}</h2>
        <ReadAloudButton text={profileAudioText} label="" />
      </div>

      {/* User Info Card */}
      <div className="nimma-card user-profile-card">
        <div className="avatar-large">
          <User size={36} color="#147D75" />
        </div>
        <div className="user-details-box">
          <h3 className="profile-name">{userName}</h3>
          <span className="profile-id">ID: {userProfile.userId}</span>
          <span className="profile-acc">{t('accNumberLabel')}: {userProfile.accountNumber}</span>
        </div>
      </div>

      {/* Account Info Details */}
      <div className="nimma-card info-section-card">
        <h3 className="section-title">{t('personalInfoSection')}</h3>

        <div className="info-item">
          <Building size={18} color="#147D75" />
          <div className="info-item-text">
            <span className="item-label">Branch</span>
            <span className="item-value">{branchName}</span>
          </div>
        </div>

        <div className="info-item">
          <MapPin size={18} color="#147D75" />
          <div className="info-item-text">
            <span className="item-label">Village / Location</span>
            <span className="item-value">{villageName}</span>
          </div>
        </div>

        <div className="info-item">
          <Shield size={18} color="#147D75" />
          <div className="info-item-text">
            <span className="item-label">IFSC Code</span>
            <span className="item-value">{userProfile.ifsc}</span>
          </div>
        </div>
      </div>

      {/* Application Preferences */}
      <div className="nimma-card preferences-card">
        <h3 className="section-title">{t('preferencesSection')}</h3>

        {/* Language Switcher */}
        <div className="setting-row-item" onClick={toggleLanguage}>
          <div className="setting-label-group">
            <Languages size={20} color="#147D75" />
            <span>{t('appLanguage')}</span>
          </div>
          <span className="setting-value-badge">{language === 'en' ? 'English' : 'ಕನ್ನಡ'}</span>
        </div>

        {/* Accessibility Button */}
        <div className="setting-row-item" onClick={onOpenAccessibility}>
          <div className="setting-label-group">
            <Type size={20} color="#147D75" />
            <span>{t('textSizeSetting')} & Accessibility</span>
          </div>
          <span className="setting-value-badge">&rarr;</span>
        </div>

        {/* High Contrast Toggle */}
        <div className="setting-row-item" onClick={() => setHighContrast(!highContrast)}>
          <div className="setting-label-group">
            {highContrast ? <Moon size={20} color="#FFE600" /> : <Sun size={20} color="#147D75" />}
            <span>{t('contrastSetting')}</span>
          </div>
          <span className="setting-value-badge">{highContrast ? t('highContrastOn') : t('highContrastOff')}</span>
        </div>

        {/* Learning Mode Link */}
        <div className="setting-row-item" onClick={() => onNavigate('/learning')}>
          <div className="setting-label-group">
            <BookOpen size={20} color="#147D75" />
            <span>{t('learnHowToUse')}</span>
          </div>
          <span className="setting-value-badge">&rarr;</span>
        </div>

        {/* Help Center Link */}
        <div className="setting-row-item" onClick={() => onNavigate('/help')}>
          <div className="setting-label-group">
            <HelpCircle size={20} color="#147D75" />
            <span>{t('navHelp')}</span>
          </div>
          <span className="setting-value-badge">&rarr;</span>
        </div>
      </div>

      {/* Dangerous / Reset Actions */}
      <div className="action-buttons-stack">
        <button onClick={() => setShowResetConfirm(true)} className="btn-secondary danger-soft">
          <RotateCcw size={18} />
          <span>{t('resetDemoData')}</span>
        </button>

        <button onClick={() => setShowLogoutConfirm(true)} className="btn-primary logout-btn">
          <LogOut size={18} />
          <span>{t('logoutBtn')}</span>
        </button>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="modal-overlay">
          <div className="modal-card animate-fade-in">
            <h3>{t('resetDemoData')}</h3>
            <p>{t('resetDemoDataConfirm')}</p>
            <div className="modal-footer">
              <button onClick={() => setShowResetConfirm(false)} className="btn-secondary">
                {t('cancelBtn')}
              </button>
              <button onClick={handleResetData} className="btn-primary danger-btn">
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="modal-overlay">
          <div className="modal-card animate-fade-in">
            <h3>{t('logoutBtn')}</h3>
            <p>{t('logoutConfirm')}</p>
            <div className="modal-footer">
              <button onClick={() => setShowLogoutConfirm(false)} className="btn-secondary">
                {t('cancelBtn')}
              </button>
              <button onClick={handleLogout} className="btn-primary">
                {t('logoutBtn')}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .profile-page {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--secondary-text);
          font-weight: 600;
        }

        .profile-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .profile-header-row h2 {
          margin: 0;
        }

        .user-profile-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: linear-gradient(135deg, #FFF7E8 0%, #E3F1E9 100%);
          border: 2px solid var(--border-color);
        }

        html.high-contrast .user-profile-card {
          background: #121212;
          border-color: #FFE600;
        }

        .avatar-large {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background-color: var(--white);
          border: 2px solid var(--primary-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .user-details-box {
          display: flex;
          flex-direction: column;
        }

        .profile-name {
          margin: 0 0 0.2rem 0;
          font-size: calc(1.3rem * var(--font-scale));
          color: var(--primary-teal);
        }

        html.high-contrast .profile-name {
          color: #FFE600;
        }

        .profile-id {
          font-size: calc(0.85rem * var(--font-scale));
          font-weight: 700;
          color: var(--dark-text);
        }

        .profile-acc {
          font-size: calc(0.82rem * var(--font-scale));
          color: var(--secondary-text);
        }

        .info-section-card {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .section-title {
          font-size: calc(1.1rem * var(--font-scale));
          margin: 0 0 0.5rem 0;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0;
          border-bottom: 1px dashed var(--border-color);
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .info-item-text {
          display: flex;
          flex-direction: column;
        }

        .item-label {
          font-size: calc(0.78rem * var(--font-scale));
          color: var(--secondary-text);
        }

        .item-value {
          font-weight: 700;
          font-size: calc(0.95rem * var(--font-scale));
          color: var(--dark-text);
        }

        .preferences-card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .setting-row-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 0.5rem;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .setting-row-item:hover {
          background-color: var(--soft-mint);
        }

        .setting-label-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          font-size: calc(0.95rem * var(--font-scale));
        }

        .setting-value-badge {
          background-color: var(--soft-mint);
          color: var(--primary-teal);
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 12px;
          font-size: calc(0.82rem * var(--font-scale));
        }

        .action-buttons-stack {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .logout-btn {
          background-color: var(--danger-red);
          border-color: var(--danger-red);
        }

        .logout-btn:hover {
          background-color: #B71C1C;
        }

        .danger-btn {
          background-color: var(--danger-red);
        }
      `}</style>
    </div>
  );
};
