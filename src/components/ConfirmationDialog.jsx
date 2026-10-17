// src/components/ConfirmationDialog.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';

export const ConfirmationDialog = ({
  isOpen,
  title,
  message,
  recipientName,
  amount,
  note,
  onConfirm,
  onCancel,
  confirmText,
  cancelText
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card animate-fade-in" role="dialog" aria-modal="true">
        <div className="modal-header">
          <AlertTriangle size={24} color="#F2B66D" />
          <h3>{title || t('confirmModalTitle')}</h3>
          <button onClick={onCancel} className="close-modal-btn" aria-label={t('cancelBtn')}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p>{message || t('confirmModalMessage')}</p>

          {recipientName && (
            <div className="summary-box">
              <div className="summary-row">
                <span className="summary-label">{t('transferTo')}:</span>
                <span className="summary-value">{recipientName}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">{t('transferAmount')}:</span>
                <span className="summary-value amount-highlight">₹{parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              {note && (
                <div className="summary-row">
                  <span className="summary-label">{t('transferNote')}:</span>
                  <span className="summary-value">"{note}"</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onCancel} className="btn-secondary">
            {cancelText || t('cancelBtn')}
          </button>
          <button onClick={onConfirm} className="btn-primary">
            <CheckCircle size={18} />
            {confirmText || t('yesConfirmBtn')}
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
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          z-index: 200;
          backdrop-filter: blur(4px);
        }

        .modal-card {
          background-color: var(--white);
          border-radius: 20px;
          max-width: 480px;
          width: 100%;
          padding: 1.5rem;
          border: 2px solid var(--border-color);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .modal-header h3 {
          margin: 0;
          flex: 1;
        }

        .close-modal-btn {
          background: none;
          border: none;
          color: var(--secondary-text);
          cursor: pointer;
          padding: 0.25rem;
        }

        .modal-body {
          margin-bottom: 1.5rem;
        }

        .summary-box {
          background-color: var(--soft-mint);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1rem;
          margin-top: 0.75rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 0.35rem 0;
          border-bottom: 1px dashed var(--border-color);
        }

        .summary-row:last-child {
          border-bottom: none;
        }

        .summary-label {
          font-weight: 600;
          color: var(--secondary-text);
        }

        .summary-value {
          font-weight: 700;
          color: var(--dark-text);
        }

        .amount-highlight {
          color: var(--primary-teal);
          font-size: calc(1.15rem * var(--font-scale));
        }

        html.high-contrast .amount-highlight {
          color: #FFE600;
        }

        .modal-footer {
          display: flex;
          gap: 0.75rem;
        }
      `}</style>
    </div>
  );
};
