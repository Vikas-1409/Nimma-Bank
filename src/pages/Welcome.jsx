// src/pages/Welcome.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { ArrowRight, BookOpen, Volume2, ShieldCheck, Heart, Sparkles, MessageCircle, Eye } from 'lucide-react';

export const Welcome = ({ onGetStarted, onLearnMore }) => {
  const { language, toggleLanguage, t } = useLanguage();

  const welcomeText = `${t('welcomeTitle')}. ${t('welcomeSubtitle')} ${t('feature1Title')}: ${t('feature1Desc')}. ${t('feature2Title')}: ${t('feature2Desc')}. ${t('feature3Title')}: ${t('feature3Desc')}`;

  return (
    <div className="welcome-page animate-fade-in">
      {/* Hero Header */}
      <div className="welcome-hero nimma-card">
        <div className="badge demo-prototype-chip">{t('demoBadge')}</div>
        <h1 className="welcome-headline">{t('welcomeTitle')}</h1>
        <p className="welcome-subtitle">{t('welcomeSubtitle')}</p>

        {/* Listen Aloud Button */}
        <div className="listen-row">
          <ReadAloudButton text={welcomeText} label={t('listenToPage')} />
        </div>

        {/* Hero Vector Graphic / Illustration */}
        <div className="hero-illustration-box">
          <div className="illus-circle">
            <span className="illus-emoji">🌾</span>
            <span className="illus-emoji center">🏦</span>
            <span className="illus-emoji">📱</span>
          </div>
          <div className="illus-card-float card-1">
            <ShieldCheck size={18} color="#147D75" />
            <span>Simple Banking</span>
          </div>
          <div className="illus-card-float card-2">
            <Heart size={18} color="#D32F2F" />
            <span>Elderly Friendly</span>
          </div>
        </div>

        {/* Main Call to Actions */}
        <div className="welcome-actions">
          <button onClick={onGetStarted} className="btn-primary cta-large">
            <span>{t('getStarted')}</span>
            <ArrowRight size={22} />
          </button>

          <button onClick={onLearnMore} className="btn-secondary cta-learn">
            <BookOpen size={20} />
            <span>{t('learnHowToUse')}</span>
          </button>
        </div>
      </div>

      {/* Why Choose nimmaBank Feature Cards */}
      <div className="features-section">
        <h2 className="section-title">{t('whyNimmaBank')}</h2>

        <div className="feature-card nimma-card">
          <div className="feature-icon-wrapper teal">
            <MessageCircle size={28} />
          </div>
          <div className="feature-text">
            <h3>{t('feature1Title')}</h3>
            <p>{t('feature1Desc')}</p>
          </div>
        </div>

        <div className="feature-card nimma-card">
          <div className="feature-icon-wrapper warm">
            <Volume2 size={28} />
          </div>
          <div className="feature-text">
            <h3>{t('feature2Title')}</h3>
            <p>{t('feature2Desc')}</p>
          </div>
        </div>

        <div className="feature-card nimma-card">
          <div className="feature-icon-wrapper mint">
            <Eye size={28} />
          </div>
          <div className="feature-text">
            <h3>{t('feature3Title')}</h3>
            <p>{t('feature3Desc')}</p>
          </div>
        </div>
      </div>

      <style>{`
        .welcome-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .welcome-hero {
          text-align: center;
          background: linear-gradient(180deg, #FFF7E8 0%, #E3F1E9 100%);
          border: 2px solid var(--border-color);
          padding: 2rem 1.5rem;
        }

        html.high-contrast .welcome-hero {
          background: #121212;
          border-color: #FFE600;
        }

        .demo-prototype-chip {
          background-color: var(--warm-accent);
          color: #174F49;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .welcome-headline {
          font-size: calc(2rem * var(--font-scale));
          color: var(--primary-teal);
          margin-bottom: 0.5rem;
        }

        html.high-contrast .welcome-headline {
          color: #FFE600;
        }

        .welcome-subtitle {
          font-size: calc(1.1rem * var(--font-scale));
          color: var(--secondary-text);
          max-width: 600px;
          margin: 0 auto 1.25rem auto;
        }

        .listen-row {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .hero-illustration-box {
          position: relative;
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1rem 0 2rem 0;
        }

        .illus-circle {
          width: 140px;
          height: 140px;
          background-color: var(--white);
          border-radius: 50%;
          border: 4px solid var(--primary-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 8px 24px rgba(20, 125, 117, 0.15);
        }

        .illus-emoji {
          font-size: 2.2rem;
        }

        .illus-emoji.center {
          font-size: 3rem;
        }

        .illus-card-float {
          position: absolute;
          background-color: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 0.5rem 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-weight: 700;
          font-size: calc(0.85rem * var(--font-scale));
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          animation: float 3s ease-in-out infinite alternate;
        }

        .illus-card-float.card-1 {
          top: 10px;
          left: 10%;
        }

        .illus-card-float.card-2 {
          bottom: 10px;
          right: 10%;
          animation-delay: 1.5s;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }

        .welcome-actions {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          max-width: 400px;
          margin: 0 auto;
        }

        .cta-large {
          font-size: calc(1.15rem * var(--font-scale));
          padding: 1rem 1.5rem;
          min-height: 56px;
        }

        .cta-learn {
          font-size: calc(1.05rem * var(--font-scale));
          min-height: 52px;
        }

        .section-title {
          font-size: calc(1.3rem * var(--font-scale));
          text-align: center;
          margin-bottom: 1rem;
        }

        .feature-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.85rem;
        }

        .feature-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feature-icon-wrapper.teal {
          background-color: var(--soft-mint);
          color: var(--primary-teal);
        }

        .feature-icon-wrapper.warm {
          background-color: #FFF3E0;
          color: #F57C00;
        }

        .feature-icon-wrapper.mint {
          background-color: #E8F5E9;
          color: #2E7D32;
        }

        .feature-text h3 {
          margin: 0 0 0.25rem 0;
        }

        .feature-text p {
          margin: 0;
          color: var(--secondary-text);
          font-size: calc(0.9rem * var(--font-scale));
        }
      `}</style>
    </div>
  );
};
