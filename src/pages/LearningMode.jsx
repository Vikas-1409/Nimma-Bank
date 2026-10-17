// src/pages/LearningMode.jsx
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { learningStepsData } from '../data/demoData';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { BookOpen, ChevronRight, ChevronLeft, CheckCircle2, RotateCcw, ArrowLeft, Send, ShieldCheck, Eye, Sparkles } from 'lucide-react';

export const LearningMode = ({ onExit }) => {
  const { t, language } = useLanguage();

  const [currentStep, setCurrentStep] = useState(0);
  const [inSandbox, setInSandbox] = useState(false);
  const [sandboxAmount, setSandboxAmount] = useState('100');
  const [sandboxSuccess, setSandboxSuccess] = useState(false);

  const stepObj = learningStepsData[currentStep];
  const stepTitle = t(stepObj.titleKey);
  const stepDesc = t(stepObj.descKey);

  const audioText = `${stepTitle}. ${stepDesc}`;

  const handleNext = () => {
    if (currentStep < learningStepsData.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setInSandbox(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSandboxTransfer = (e) => {
    e.preventDefault();
    setSandboxSuccess(true);
  };

  const handleResetSandbox = () => {
    setSandboxSuccess(false);
    setInSandbox(false);
    setCurrentStep(0);
  };

  return (
    <div className="learning-mode-page animate-fade-in">
      <button onClick={onExit} className="back-link">
        <ArrowLeft size={18} />
        <span>{t('skipTutorial')}</span>
      </button>

      <div className="page-header-row">
        <div className="title-group">
          <BookOpen size={24} color="#147D75" />
          <h2>{t('learningTitle')}</h2>
        </div>
        <ReadAloudButton text={audioText} label="" />
      </div>

      <p className="learning-subtitle">{t('learningSubtitle')}</p>

      {!inSandbox ? (
        <div className="learning-step-card nimma-card">
          <div className="step-badge-row">
            <span className="step-pill">
              {t('step1Title').split(':')[0]}: {currentStep + 1} / {learningStepsData.length}
            </span>
          </div>

          <div className="step-content">
            <h3 className="step-heading">{stepTitle}</h3>
            <p className="step-description">{stepDesc}</p>

            {/* Visual Step Illustration / Mockup */}
            <div className="step-mockup-box">
              {currentStep === 0 && (
                <div className="mockup-preview">
                  <div className="mockup-header">
                    <span>👋 Welcome Ramesh</span>
                    <span className="mockup-acc"># 4092-8812</span>
                  </div>
                  <div className="mockup-balance">₹15,450.00</div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="mockup-preview">
                  <div className="eye-demo">
                    <Eye size={32} color="#147D75" />
                    <span>Tap Eye icon to hide/show balance!</span>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="mockup-preview">
                  <div className="rec-demo-card">
                    <span className="avatar">SG</span>
                    <span>Suma Gowda (Sister)</span>
                    <CheckCircle2 size={20} color="#2E7D32" />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="mockup-preview">
                  <div className="amount-demo">
                    <span className="chip-demo">+₹100</span>
                    <span className="chip-demo selected">+₹500</span>
                    <span className="chip-demo">+₹1000</span>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="mockup-preview">
                  <div className="confirm-demo">
                    <ShieldCheck size={28} color="#147D75" />
                    <span>Double-check recipient name before tapping Confirm!</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stepper Footer Controls */}
          <div className="stepper-footer">
            <div className="dots-row">
              {learningStepsData.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${idx === currentStep ? 'active' : ''}`}
                />
              ))}
            </div>

            <div className="controls-row">
              {currentStep > 0 && (
                <button onClick={handlePrev} className="btn-secondary nav-btn">
                  <ChevronLeft size={18} />
                  <span>{t('prevStep')}</span>
                </button>
              )}

              <button onClick={handleNext} className="btn-primary nav-btn">
                <span>{currentStep === learningStepsData.length - 1 ? t('practiceTransferBtn') : t('nextStep')}</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Sandbox Practice Environment */
        <div className="sandbox-container nimma-card animate-fade-in">
          <div className="sandbox-header">
            <Sparkles size={24} color="#F2B66D" />
            <h3>Practice Money Transfer (Sandbox)</h3>
          </div>
          <p className="sandbox-notice">
            This is an isolated practice room. Sending practice money here will NOT affect your actual demo account balance!
          </p>

          {!sandboxSuccess ? (
            <form onSubmit={handleSandboxTransfer} className="sandbox-form">
              <div className="form-group">
                <label className="form-label">Practice Recipient</label>
                <div className="practice-rec-box">
                  <span className="avatar">SG</span>
                  <div>
                    <strong>Suma Gowda (Sister)</strong>
                    <br />
                    <small>Practice Account</small>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Practice Amount (₹)</label>
                <input
                  type="number"
                  value={sandboxAmount}
                  onChange={(e) => setSandboxAmount(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <button type="submit" className="btn-accent practice-send-btn">
                <Send size={18} />
                <span>Send Practice Money (₹{sandboxAmount})</span>
              </button>
            </form>
          ) : (
            <div className="sandbox-success-box animate-fade-in">
              <CheckCircle2 size={48} color="#2E7D32" />
              <h3>{t('practiceSuccessMsg')}</h3>
              <p>You have mastered how to send money safely in nimmaBank!</p>

              <div className="sandbox-actions">
                <button onClick={handleResetSandbox} className="btn-secondary">
                  <RotateCcw size={16} />
                  <span>{t('restartTutorial')}</span>
                </button>
                <button onClick={onExit} className="btn-primary">
                  {t('backToDashboard')}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        .learning-mode-page {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--secondary-text);
          font-weight: 600;
        }

        .page-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .title-group h2 {
          margin: 0;
        }

        .learning-subtitle {
          color: var(--secondary-text);
          margin-top: -0.5rem;
        }

        .learning-step-card {
          padding: 1.5rem;
          background-color: var(--white);
          border-radius: 20px;
        }

        .step-badge-row {
          margin-bottom: 1rem;
        }

        .step-pill {
          background-color: var(--soft-mint);
          color: var(--primary-teal);
          font-weight: 700;
          padding: 0.3rem 0.75rem;
          border-radius: 12px;
          font-size: calc(0.85rem * var(--font-scale));
        }

        .step-heading {
          font-size: calc(1.3rem * var(--font-scale));
          color: var(--dark-text);
          margin-bottom: 0.5rem;
        }

        .step-description {
          font-size: calc(1rem * var(--font-scale));
          color: var(--secondary-text);
          margin-bottom: 1.5rem;
        }

        .step-mockup-box {
          background-color: var(--cream-bg);
          border: 2px dashed var(--border-color);
          border-radius: 16px;
          padding: 1.5rem;
          min-height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .mockup-preview {
          width: 100%;
          text-align: center;
        }

        .mockup-header {
          display: flex;
          justify-content: space-between;
          font-weight: 700;
          color: var(--secondary-text);
          font-size: 0.85rem;
        }

        .mockup-balance {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--primary-teal);
          margin-top: 0.5rem;
        }

        .eye-demo, .confirm-demo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 700;
        }

        .rec-demo-card {
          background: white;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
        }

        .rec-demo-card .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--primary-teal);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .amount-demo {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }

        .chip-demo {
          background-color: white;
          border: 1px solid var(--border-color);
          padding: 0.4rem 0.85rem;
          border-radius: 20px;
          font-weight: 700;
        }

        .chip-demo.selected {
          background-color: var(--primary-teal);
          color: white;
        }

        .stepper-footer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
        }

        .dots-row {
          display: flex;
          justify-content: center;
          gap: 0.4rem;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--border-color);
        }

        .dot.active {
          width: 24px;
          border-radius: 12px;
          background-color: var(--primary-teal);
        }

        .controls-row {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        .nav-btn {
          width: auto !important;
          padding: 0.6rem 1.25rem;
        }

        .sandbox-container {
          background-color: #FFF7E8;
          border: 2px solid var(--warm-accent);
          padding: 1.5rem;
        }

        .sandbox-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .sandbox-notice {
          font-size: calc(0.85rem * var(--font-scale));
          color: var(--secondary-text);
          margin-bottom: 1.25rem;
        }

        .practice-rec-box {
          background-color: white;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .practice-rec-box .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--primary-teal);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .practice-send-btn {
          min-height: 52px;
          margin-top: 1rem;
        }

        .sandbox-success-box {
          text-align: center;
          padding: 1.5rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .sandbox-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};
