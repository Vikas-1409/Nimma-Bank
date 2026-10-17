// src/components/TransactionCard.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, ArrowDownLeft, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const TransactionCard = ({ transaction, onClick }) => {
  const { language, t } = useLanguage();
  const isCredit = transaction.type === 'CREDIT';

  const title = transaction.title[language] || transaction.title.en;
  const note = transaction.note ? (transaction.note[language] || transaction.note.en) : '';

  return (
    <div className="transaction-card-item" onClick={() => onClick && onClick(transaction)}>
      <div className={`tx-icon-wrapper ${isCredit ? 'credit' : 'debit'}`}>
        {isCredit ? <ArrowDownLeft size={22} /> : <ArrowUpRight size={22} />}
      </div>

      <div className="tx-details">
        <h4 className="tx-title">{title}</h4>
        <span className="tx-date">{transaction.date}</span>
        {note && <span className="tx-note">"{note}"</span>}
      </div>

      <div className="tx-amount-col">
        <span className={`tx-amount ${isCredit ? 'amount-credit' : 'amount-debit'}`}>
          {isCredit ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </span>
        <span className={`badge ${transaction.status === 'Successful' ? 'badge-success' : 'badge-danger'}`}>
          {transaction.status === 'Successful' ? t('statusSuccess') : t('statusFailed')}
        </span>
      </div>

      <style>{`
        .transaction-card-item {
          background-color: var(--white);
          border-radius: 14px;
          padding: 1rem;
          margin-bottom: 0.75rem;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 0.85rem;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.15s ease;
        }

        .transaction-card-item:hover {
          background-color: var(--soft-mint);
          transform: translateX(4px);
        }

        .tx-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .tx-icon-wrapper.credit {
          background-color: var(--success-bg);
          color: var(--success-green);
        }

        .tx-icon-wrapper.debit {
          background-color: var(--danger-bg);
          color: var(--danger-red);
        }

        .tx-details {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }

        .tx-title {
          font-size: calc(0.95rem * var(--font-scale));
          font-weight: 700;
          color: var(--dark-text);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tx-date {
          font-size: calc(0.75rem * var(--font-scale));
          color: var(--secondary-text);
          margin-top: 2px;
        }

        .tx-note {
          font-size: calc(0.75rem * var(--font-scale));
          color: var(--secondary-text);
          font-style: italic;
        }

        .tx-amount-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.25rem;
          flex-shrink: 0;
        }

        .tx-amount {
          font-weight: 800;
          font-size: calc(1.05rem * var(--font-scale));
        }

        .amount-credit {
          color: var(--success-green);
        }

        .amount-debit {
          color: var(--dark-text);
        }
      `}</style>
    </div>
  );
};
