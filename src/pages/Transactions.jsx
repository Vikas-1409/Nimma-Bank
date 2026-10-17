// src/pages/Transactions.jsx
import React, { useState } from 'react';
import { useBanking } from '../context/BankingContext';
import { useLanguage } from '../context/LanguageContext';
import { TransactionCard } from '../components/TransactionCard';
import { TransactionDetails } from './TransactionDetails';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { Search, Filter, History, ArrowLeft } from 'lucide-react';

export const Transactions = ({ onBack, selectedTx, setSelectedTx }) => {
  const { transactions } = useBanking();
  const { language, t } = useLanguage();

  const [filterType, setFilterType] = useState('ALL'); // ALL, SENT, RECEIVED, FAILED
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = transactions.filter(tx => {
    // Filter by type
    if (filterType === 'SENT' && tx.type !== 'DEBIT') return false;
    if (filterType === 'RECEIVED' && tx.type !== 'CREDIT') return false;
    if (filterType === 'FAILED' && tx.status !== 'Failed') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleStr = (tx.title[language] || tx.title.en).toLowerCase();
      const idStr = tx.id.toLowerCase();
      return titleStr.includes(q) || idStr.includes(q);
    }

    return true;
  });

  const pageAudioText = `${t('transactionHistoryTitle')}. Total ${filteredTransactions.length} transactions listed.`;

  return (
    <div className="transactions-page animate-fade-in">
      {onBack && (
        <button onClick={onBack} className="back-link">
          <ArrowLeft size={18} />
          <span>{t('backToDashboard')}</span>
        </button>
      )}

      <div className="tx-header-row">
        <h2>{t('transactionHistoryTitle')}</h2>
        <ReadAloudButton text={pageAudioText} label="" />
      </div>

      {/* Search Input */}
      <div className="search-bar-wrapper">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('searchTransactionsPlaceholder')}
          className="search-input"
        />
      </div>

      {/* Filter Tabs */}
      <div className="filter-chips-row">
        <button
          onClick={() => setFilterType('ALL')}
          className={`filter-chip ${filterType === 'ALL' ? 'active' : ''}`}
        >
          {t('filterAll')} ({transactions.length})
        </button>
        <button
          onClick={() => setFilterType('SENT')}
          className={`filter-chip ${filterType === 'SENT' ? 'active' : ''}`}
        >
          {t('filterSent')}
        </button>
        <button
          onClick={() => setFilterType('RECEIVED')}
          className={`filter-chip ${filterType === 'RECEIVED' ? 'active' : ''}`}
        >
          {t('filterReceived')}
        </button>
        <button
          onClick={() => setFilterType('FAILED')}
          className={`filter-chip ${filterType === 'FAILED' ? 'active' : ''}`}
        >
          {t('filterFailed')}
        </button>
      </div>

      {/* Transaction Feed */}
      <div className="transactions-list">
        {filteredTransactions.length === 0 ? (
          <div className="nimma-card empty-state">
            <History size={40} color="#46645A" />
            <p>No matching transactions found.</p>
          </div>
        ) : (
          filteredTransactions.map(tx => (
            <TransactionCard
              key={tx.id}
              transaction={tx}
              onClick={(tx) => setSelectedTx(tx)}
            />
          ))
        )}
      </div>

      {/* Detailed Transaction Modal / Voucher */}
      {selectedTx && (
        <TransactionDetails
          transaction={selectedTx}
          onClose={() => setSelectedTx(null)}
        />
      )}

      <style>{`
        .transactions-page {
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

        .tx-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tx-header-row h2 {
          margin: 0;
        }

        .search-bar-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--secondary-text);
        }

        .search-input {
          width: 100%;
          min-height: 48px;
          padding: 0.75rem 1rem 0.75rem 2.8rem;
          border: 2px solid var(--border-color);
          border-radius: 14px;
          background-color: var(--white);
          outline: none;
          font-size: calc(0.95rem * var(--font-scale));
        }

        .filter-chips-row {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
        }

        .filter-chip {
          background-color: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 0.4rem 0.85rem;
          font-weight: 600;
          font-size: calc(0.85rem * var(--font-scale));
          color: var(--secondary-text);
          white-space: nowrap;
        }

        .filter-chip.active {
          background-color: var(--primary-teal);
          color: white;
          border-color: var(--primary-teal);
        }

        html.high-contrast .filter-chip.active {
          background-color: #FFE600;
          color: #000000;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          color: var(--secondary-text);
        }
      `}</style>
    </div>
  );
};
