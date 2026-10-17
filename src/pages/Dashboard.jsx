// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useBanking } from '../context/BankingContext';
import { BalanceCard } from '../components/BalanceCard';
import { TransactionCard } from '../components/TransactionCard';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { Wallet, Send, History, UserCog, HelpCircle, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

export const Dashboard = ({
  onNavigate,
  onSelectTransaction
}) => {
  const { userProfile } = useAuth();
  const { language, t } = useLanguage();
  const { transactions } = useBanking();

  const userName = userProfile.name[language] || userProfile.name.en;

  // Time-based greeting
  const hour = new Date().getHours();
  const greetingKey = hour < 12 ? 'greetingMorning' : hour < 17 ? 'greetingAfternoon' : 'greetingEvening';

  const dashboardIntroText = `${t(greetingKey)}, ${userName}. ${t('welcomeUser')}. ${t('availableBalance')}.`;

  const recentTxs = transactions.slice(0, 3);

  return (
    <div className="dashboard-page animate-fade-in">
      {/* Offline Status Warning Banner if active */}
      <ConnectionStatus />

      {/* Personalized Greeting Header */}
      <div className="dashboard-greeting-row">
        <div className="greeting-text-box">
          <span className="time-greeting">{t(greetingKey)},</span>
          <h1 className="user-greeting-name">{userName} 🙏</h1>
        </div>
        <ReadAloudButton text={dashboardIntroText} label="" />
      </div>

      {/* Main Balance Card */}
      <BalanceCard onCheckBalanceDetails={() => onNavigate('/balance')} />

      {/* Quick Action Grid (4 Large Tap Cards) */}
      <div className="quick-actions-section">
        <h2 className="section-heading">{t('quickActions')}</h2>

        <div className="action-cards-grid">
          {/* Action 1: Check Balance */}
          <div
            className="action-card card-check-balance"
            onClick={() => onNavigate('/balance')}
            role="button"
            tabIndex={0}
          >
            <div className="action-icon-wrapper">
              <Wallet size={28} />
            </div>
            <div className="action-info">
              <h3>{t('checkBalanceCardTitle')}</h3>
              <p>{t('checkBalanceCardDesc')}</p>
            </div>
          </div>

          {/* Action 2: Send Money */}
          <div
            className="action-card card-send-money"
            onClick={() => onNavigate('/transfer')}
            role="button"
            tabIndex={0}
          >
            <div className="action-icon-wrapper">
              <Send size={28} />
            </div>
            <div className="action-info">
              <h3>{t('sendMoneyCardTitle')}</h3>
              <p>{t('sendMoneyCardDesc')}</p>
            </div>
          </div>

          {/* Action 3: Transaction History */}
          <div
            className="action-card card-history"
            onClick={() => onNavigate('/transactions')}
            role="button"
            tabIndex={0}
          >
            <div className="action-icon-wrapper">
              <History size={28} />
            </div>
            <div className="action-info">
              <h3>{t('transactionsCardTitle')}</h3>
              <p>{t('transactionsCardDesc')}</p>
            </div>
          </div>

          {/* Action 4: Profile & Settings */}
          <div
            className="action-card card-profile"
            onClick={() => onNavigate('/profile')}
            role="button"
            tabIndex={0}
          >
            <div className="action-icon-wrapper">
              <UserCog size={28} />
            </div>
            <div className="action-info">
              <h3>{t('profileCardTitle')}</h3>
              <p>{t('profileCardDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="recent-activity-section">
        <div className="section-header-row">
          <h2 className="section-heading">{t('recentTransactions')}</h2>
          <button onClick={() => onNavigate('/transactions')} className="view-all-link">
            {t('viewAllTransactions')} &rarr;
          </button>
        </div>

        {recentTxs.length === 0 ? (
          <div className="nimma-card empty-tx-card">
            <p>{t('noRecentTransactions')}</p>
          </div>
        ) : (
          recentTxs.map(tx => (
            <TransactionCard
              key={tx.id}
              transaction={tx}
              onClick={() => onSelectTransaction(tx)}
            />
          ))
        )}
      </div>

      {/* Learning Mode Quick Banner */}
      <div className="nimma-card learn-banner-card" onClick={() => onNavigate('/learning')}>
        <div className="learn-icon">
          <BookOpen size={24} color="#147D75" />
        </div>
        <div className="learn-text">
          <h3>{t('learnHowToUse')}</h3>
          <p>Practice digital banking step-by-step in a safe environment.</p>
        </div>
        <span className="learn-arrow">&rarr;</span>
      </div>

      {/* Security Tip Box */}
      <div className="security-tip-box">
        <ShieldAlert size={20} color="#D32F2F" />
        <span><strong>Security Alert:</strong> nimmaBank staff will NEVER ask for your password or PIN!</span>
      </div>

      <style>{`
        .dashboard-page {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .dashboard-greeting-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.25rem 0;
        }

        .greeting-text-box {
          display: flex;
          flex-direction: column;
        }

        .time-greeting {
          font-size: calc(0.9rem * var(--font-scale));
          color: var(--secondary-text);
          font-weight: 600;
        }

        .user-greeting-name {
          font-size: calc(1.6rem * var(--font-scale));
          color: var(--primary-teal);
          margin: 0;
          font-weight: 800;
        }

        html.high-contrast .user-greeting-name {
          color: #FFE600;
        }

        .section-heading {
          font-size: calc(1.25rem * var(--font-scale));
          font-weight: 700;
          color: var(--dark-text);
          margin-bottom: 0.85rem;
        }

        .action-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
        }

        @media (max-width: 480px) {
          .action-cards-grid {
            grid-template-columns: 1fr;
          }
        }

        .action-card {
          background-color: var(--white);
          border: 2px solid var(--border-color);
          border-radius: 18px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .action-card:hover {
          transform: translateY(-3px);
          border-color: var(--primary-teal);
          box-shadow: 0 8px 20px rgba(20, 125, 117, 0.12);
        }

        .action-icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .card-check-balance .action-icon-wrapper {
          background-color: #E3F1E9;
          color: #147D75;
        }

        .card-send-money .action-icon-wrapper {
          background-color: #FFF3E0;
          color: #F57C00;
        }

        .card-history .action-icon-wrapper {
          background-color: #E8F5E9;
          color: #2E7D32;
        }

        .card-profile .action-icon-wrapper {
          background-color: #EDE7F6;
          color: #512DA8;
        }

        .action-info h3 {
          font-size: calc(1.05rem * var(--font-scale));
          font-weight: 700;
          margin: 0 0 0.2rem 0;
          color: var(--dark-text);
        }

        .action-info p {
          font-size: calc(0.8rem * var(--font-scale));
          color: var(--secondary-text);
          margin: 0;
          line-height: 1.2;
        }

        .section-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .view-all-link {
          color: var(--primary-teal);
          font-weight: 700;
          font-size: calc(0.9rem * var(--font-scale));
          cursor: pointer;
        }

        html.high-contrast .view-all-link {
          color: #FFE600;
        }

        .empty-tx-card {
          text-align: center;
          color: var(--secondary-text);
        }

        .learn-banner-card {
          background: linear-gradient(135deg, #FFF7E8 0%, #E3F1E9 100%);
          border: 2px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          margin-top: 0.5rem;
        }

        .learn-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .learn-text h3 {
          margin: 0 0 0.2rem 0;
          font-size: calc(1rem * var(--font-scale));
        }

        .learn-text p {
          margin: 0;
          font-size: calc(0.82rem * var(--font-scale));
          color: var(--secondary-text);
        }

        .learn-arrow {
          font-size: 1.5rem;
          color: var(--primary-teal);
          font-weight: 700;
          margin-left: auto;
        }

        .security-tip-box {
          background-color: var(--danger-bg);
          border: 1px solid var(--danger-red);
          color: var(--danger-red);
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-size: calc(0.82rem * var(--font-scale));
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
};
