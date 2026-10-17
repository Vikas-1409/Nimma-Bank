// src/components/InsufficientBalanceModal.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ReadAloudButton } from './ReadAloudButton';
import { AlertCircle, X, Wallet, ArrowDownRight } from 'lucide-react';

export const InsufficientBalanceModal = ({
  isOpen,
  enteredAmount,
  availableBalance,
  onClose
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const numEntered = parseFloat(enteredAmount) || 0;
  const numBalance = parseFloat(availableBalance) || 0;
  const shortage = Math.max(0, numEntered - numBalance);

  const modalSpeechText = `${t('insufficientBalanceTitle')}. ${t('insufficientBalanceMsg')} ${t('enteredAmountLabel')}: ₹${numEntered.toLocaleString('en-IN')}. ${t('availableBalanceLabel')}: ₹${numBalance.toLocaleString('en-IN')}.`;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="insufficient-balance-title">
      <div className="modal-card insufficient-modal animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header warning-header">
          <div className="alert-icon-badge">
            <AlertCircle size={28} color="#D32F2F" />
          </div>
          <h3 id="insufficient-balance-title">{t('insufficientBalanceTitle')}</h3>
          <ReadAloudButton text={modalSpeechText} label="" />
          <button onClick={onClose} className="close-modal-btn" aria-label={t('cancelBtn')}>
            <X size={22} />
          </button>
        </div>

        <div className="modal-body">
          <p className="warning-text">{t('insufficientBalanceMsg')}</p>

          <div className="balance-comparison-box">
            <div className="comparison-row">
              <span className="comp-label">
                <ArrowDownRight size={16} color="#D32F2F" />
                {t('enteredAmountLabel')}:
              </span>
              <span className="comp-val entered-val">
                ₹{numEntered.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="comparison-row">
              <span className="comp-label">
                <Wallet size={16} color="#147D75" />
                {t('availableBalanceLabel')}:
              </span>
              <span className="comp-val balance-val">
                ₹{numBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {shortage > 0 && (
              <div className="comparison-row shortage-row">
                <span className="comp-label">{t('shortageLabel')}:</span>
                <span className="comp-val shortage-val">
                  -₹{shortage.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer single-action">
          <button onClick={onClose} className="btn-primary ok-btn">
            {t('okGotItBtn')}
          </button>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          z-index: 300;
          backdrop-filter: blur(4px);
        }

        .insufficient-modal {
          background-color: var(--white);
          border-radius: 20px;
          max-width: 480px;
          width: 100%;
          padding: 1.5rem;
          border: 2px solid #E57373;
          box-shadow: 0 16px 40px rgba(211, 47, 47, 0.2);
        }

        .warning-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #FFCDD2;
        }

        .alert-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: #FFEBEE;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .warning-header h3 {
          margin: 0;
          flex: 1;
          color: #C62828;
          font-size: calc(1.2rem * var(--font-scale));
          font-weight: 700;
        }

        .close-modal-btn {
          background: none;
          border: none;
          color: var(--secondary-text);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 6px;
        }

        .close-modal-btn:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .modal-body {
          margin-bottom: 1.5rem;
        }

        .warning-text {
          font-size: calc(1rem * var(--font-scale));
          color: var(--dark-text);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .balance-comparison-box {
          background-color: #FFEBEE;
          border: 1.5px solid #FFCDD2;
          border-radius: 14px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .comparison-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: calc(0.95rem * var(--font-scale));
        }

        .comp-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-weight: 600;
          color: var(--secondary-text);
        }

        .comp-val {
          font-weight: 700;
        }

        .entered-val {
          color: #C62828;
          font-size: calc(1.1rem * var(--font-scale));
        }

        .balance-val {
          color: var(--primary-teal);
        }

        .shortage-row {
          border-top: 1px dashed #E57373;
          padding-top: 0.5rem;
          margin-top: 0.2rem;
        }

        .shortage-val {
          color: #B71C1C;
          font-weight: 800;
        }

        .single-action {
          display: flex;
          justify-content: flex-end;
        }

        .ok-btn {
          width: 100%;
          min-height: 48px;
          background-color: #C62828;
          color: white;
          font-size: calc(1rem * var(--font-scale));
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
        }

        .ok-btn:hover {
          background-color: #B71C1C;
        }

        html.high-contrast .insufficient-modal {
          background-color: #000000;
          border-color: #FF5252;
        }

        html.high-contrast .warning-header h3 {
          color: #FF5252;
        }

        html.high-contrast .balance-comparison-box {
          background-color: #1A0000;
          border-color: #FF5252;
        }

        html.high-contrast .entered-val,
        html.high-contrast .shortage-val {
          color: #FF5252;
        }

        html.high-contrast .ok-btn {
          background-color: #FF5252;
          color: #000000;
        }
      `}</style>
    </div>
  );
};
