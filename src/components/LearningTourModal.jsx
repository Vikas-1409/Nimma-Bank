// src/components/LearningTourModal.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ReadAloudButton } from './ReadAloudButton';
import { ChevronRight, ChevronLeft, CheckCircle, X, HelpCircle } from 'lucide-react';

export const LearningTourModal = ({
  stepObj,
  currentStepIndex,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
  onPractice
}) => {
  const { t } = useLanguage();

  if (!stepObj) return null;

  const title = t(stepObj.titleKey);
  const desc = t(stepObj.descKey);
  const isLastStep = currentStepIndex === totalSteps - 1;

  return (
    <div className="tour-banner-overlay">
      <div className="tour-card animate-fade-in">
        <div className="tour-header">
          <div className="tour-badge">
            <HelpCircle size={18} />
            <span>Step {currentStepIndex + 1} of {totalSteps}</span>
          </div>
          <ReadAloudButton text={`${title}. ${desc}`} label="" />
          <button onClick={onSkip} className="close-tour-btn" aria-label={t('skipTutorial')}>
            <X size={18} />
          </button>
        </div>

        <div className="tour-body">
          <h3 className="tour-title">{title}</h3>
          <p className="tour-desc">{desc}</p>
        </div>

        <div className="tour-footer">
          <div className="step-dots">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <span
                key={idx}
                className={`step-dot ${idx === currentStepIndex ? 'active' : ''} ${idx < currentStepIndex ? 'completed' : ''}`}
              />
            ))}
          </div>

          <div className="tour-action-btns">
            {currentStepIndex > 0 && (
              <button onClick={onPrev} className="btn-secondary nav-tour-btn">
                <ChevronLeft size={18} />
                {t('prevStep')}
              </button>
            )}

            {isLastStep ? (
              <button onClick={onPractice} className="btn-accent nav-tour-btn">
                <CheckCircle size={18} />
                {t('practiceTransferBtn')}
              </button>
            ) : (
              <button onClick={onNext} className="btn-primary nav-tour-btn">
                {t('nextStep')}
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .tour-banner-overlay {
          position: fixed;
          bottom: calc(var(--bottom-nav-height) + 1rem);
          left: 50%;
          transform: translateX(-50%);
          width: 92%;
          max-width: var(--container-max-width);
          z-index: 180;
        }

        .tour-card {
          background-color: #FFF7E8;
          border: 3px solid var(--primary-teal);
          border-radius: 20px;
          padding: 1.25rem;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.25);
        }

        html.high-contrast .tour-card {
          background-color: #121212;
          border-color: #FFE600;
        }

        .tour-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .tour-badge {
          background-color: var(--primary-teal);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 14px;
          font-weight: 700;
          font-size: calc(0.8rem * var(--font-scale));
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        html.high-contrast .tour-badge {
          background-color: #FFE600;
          color: #000000;
        }

        .close-tour-btn {
          background: none;
          border: none;
          color: var(--secondary-text);
          cursor: pointer;
        }

        .tour-title {
          font-size: calc(1.15rem * var(--font-scale));
          color: var(--dark-text);
          margin-bottom: 0.35rem;
        }

        .tour-desc {
          font-size: calc(0.95rem * var(--font-scale));
          color: var(--secondary-text);
          margin-bottom: 1rem;
        }

        .tour-footer {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .step-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }

        .step-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--border-color);
          transition: all 0.2s ease;
        }

        .step-dot.active {
          width: 24px;
          border-radius: 12px;
          background-color: var(--primary-teal);
        }

        .step-dot.completed {
          background-color: var(--soft-mint);
        }

        .tour-action-btns {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .nav-tour-btn {
          width: auto !important;
          padding: 0.6rem 1.25rem;
          min-height: 44px;
        }
      `}</style>
    </div>
  );
};
