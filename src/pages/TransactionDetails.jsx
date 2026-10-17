// src/pages/TransactionDetails.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { CheckCircle2, AlertCircle, Printer, X, ShieldCheck } from 'lucide-react';

export const TransactionDetails = ({ transaction, onClose }) => {
  const { language, t } = useLanguage();
  const { userProfile } = useAuth();

  if (!transaction) return null;

  const isCredit = transaction.type === 'CREDIT';
  const title = transaction.title[language] || transaction.title.en;
  const note = transaction.note ? (transaction.note[language] || transaction.note.en) : '';

  const receiptAudioText = `${t('receiptTitle')}. ${title}. Amount: ${transaction.amount} Rupees. Reference ID: ${transaction.id}. Date: ${transaction.date}.`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div className="receipt-modal-card printable-receipt animate-fade-in">
        <div className="receipt-header">
          <div className="header-left">
            <span className="receipt-logo">🏦</span>
            <div>
              <h3>{t('receiptHeader')}</h3>
              <span className="ref-tag">Ref: {transaction.id}</span>
            </div>
          </div>
          <div className="header-actions no-print">
            <ReadAloudButton text={receiptAudioText} label="" />
            <button onClick={onClose} className="close-btn" aria-label={t('closeReceipt')}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="receipt-body">
          <div className="status-badge-row">
            <span className={`badge ${transaction.status === 'Successful' ? 'badge-success' : 'badge-danger'}`}>
              {transaction.status === 'Successful' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {transaction.status === 'Successful' ? t('statusSuccess') : t('statusFailed')}
            </span>
          </div>

          <div className="amount-display">
            <span className="amount-type-label">{isCredit ? t('filterReceived') : t('filterSent')}</span>
            <h1 className={`amount-value ${isCredit ? 'credit' : 'debit'}`}>
              {isCredit ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </h1>
          </div>

          <div className="receipt-details-table">
            <div className="r-item">
              <span className="r-label">{isCredit ? t('senderLabel') : t('transferTo')}:</span>
              <span className="r-val">{transaction.senderReceiver}</span>
            </div>

            <div className="r-item">
              <span className="r-label">{t('dateLabel')}:</span>
              <span className="r-val">{transaction.date}</span>
            </div>

            {note && (
              <div className="r-item">
                <span className="r-label">{t('transferNote')}:</span>
                <span className="r-val">"{note}"</span>
              </div>
            )}

            <div className="r-item">
              <span className="r-label">{t('accNumberLabel')}:</span>
              <span className="r-val">{userProfile.accountNumber}</span>
            </div>
          </div>

          <div className="prototype-disclaimer">
            <ShieldCheck size={16} color="#147D75" />
            <span>Fictional Prototype Receipt – No real banking transaction occurred.</span>
          </div>
        </div>

        <div className="receipt-footer no-print">
          <button onClick={handlePrint} className="btn-secondary">
            <Printer size={18} />
            <span>{t('printReceipt')}</span>
          </button>
          <button onClick={onClose} className="btn-primary">
            {t('closeReceipt')}
          </button>
        </div>
      </div>

      <style>{`
        .receipt-modal-card {
          background-color: var(--white);
          border-radius: 24px;
          max-width: 480px;
          width: 100%;
          padding: 1.5rem;
          border: 2px solid var(--border-color);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
        }

        .receipt-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px dashed var(--border-color);
          padding-bottom: 1rem;
          margin-bottom: 1.25rem;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .receipt-logo {
          font-size: 2rem;
        }

        .header-left h3 {
          margin: 0;
          font-size: calc(1.05rem * var(--font-scale));
        }

        .ref-tag {
          font-size: calc(0.75rem * var(--font-scale));
          color: var(--secondary-text);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--secondary-text);
          cursor: pointer;
        }

        .status-badge-row {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .amount-display {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .amount-type-label {
          font-size: calc(0.85rem * var(--font-scale));
          color: var(--secondary-text);
        }

        .amount-value {
          font-size: calc(2.4rem * var(--font-scale));
          font-weight: 800;
          margin: 0.2rem 0 0 0;
        }

        .amount-value.credit {
          color: var(--success-green);
        }

        .amount-value.debit {
          color: var(--dark-text);
        }

        .receipt-details-table {
          background-color: var(--cream-bg);
          border-radius: 14px;
          padding: 1rem;
          border: 1px solid var(--border-color);
          margin-bottom: 1.25rem;
        }

        .r-item {
          display: flex;
          justify-content: space-between;
          padding: 0.4rem 0;
          border-bottom: 1px dashed var(--border-color);
        }

        .r-item:last-child {
          border-bottom: none;
        }

        .r-label {
          font-weight: 600;
          color: var(--secondary-text);
        }

        .r-val {
          font-weight: 700;
          color: var(--dark-text);
        }

        .prototype-disclaimer {
          background-color: var(--soft-mint);
          color: var(--dark-text);
          padding: 0.5rem 0.75rem;
          border-radius: 10px;
          font-size: calc(0.75rem * var(--font-scale));
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-bottom: 1.25rem;
        }

        .receipt-footer {
          display: flex;
          gap: 0.75rem;
        }
      `}</style>
    </div>
  );
};
