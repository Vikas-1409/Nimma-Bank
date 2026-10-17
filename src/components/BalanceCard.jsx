// src/components/BalanceCard.jsx
import React from 'react';
import { useBanking } from '../context/BankingContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { ReadAloudButton } from './ReadAloudButton';
import { Eye, EyeOff, ShieldCheck, RefreshCw } from 'lucide-react';

export const BalanceCard = ({ onCheckBalanceDetails }) => {
  const { balance, showBalance, toggleShowBalance } = useBanking();
  const { language, t } = useLanguage();
  const { userProfile } = useAuth();

  const formattedBalance = `₹${balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const displayBalance = showBalance ? formattedBalance : '₹ • • • • • •';

  const readAloudText = `${t('availableBalance')}: ${showBalance ? balance + ' Rupees' : 'Hidden'}. ${t('accNumberLabel')}: ${userProfile.accountNumber}`;

  return (
    <div className="nimma-card balance-card-widget">
      <div className="card-top-row">
        <div className="account-meta">
          <span className="account-type-badge">{userProfile.accountType[language] || userProfile.accountType.en}</span>
          <span className="account-number">{t('accNumberLabel')}: {userProfile.accountNumber}</span>
        </div>
        <ReadAloudButton text={readAloudText} label="" />
      </div>

      <div className="balance-main">
        <span className="balance-label">{t('availableBalance')}</span>
        <div className="balance-amount-row">
          <h2 className="balance-amount">{displayBalance}</h2>
          <button
            onClick={toggleShowBalance}
            className="eye-toggle-btn"
            title={showBalance ? t('hideBalance') : t('showBalance')}
            aria-label={showBalance ? t('hideBalance') : t('showBalance')}
          >
            {showBalance ? <EyeOff size={22} /> : <Eye size={22} />}
            <span className="eye-btn-text">{showBalance ? t('hideBalance') : t('showBalance')}</span>
          </button>
        </div>
      </div>

      <div className="card-bottom-row">
        <span className="security-tag">
          <ShieldCheck size={16} color="#147D75" />
          <span>Fictional Demo Money</span>
        </span>
        <button onClick={onCheckBalanceDetails} className="details-link">
          {t('checkBalanceCardTitle')} &rarr;
        </button>
      </div>

      <style>{`
        .balance-card-widget {
          background: linear-gradient(135deg, #147D75 0%, #0F635D 100%);
          color: white;
          border: none;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 8px 24px rgba(20, 125, 117, 0.25);
        }

        html.high-contrast .balance-card-widget {
          background: #1E1E1E;
          color: #FFFFFF;
          border: 2px solid #FFE600;
        }

        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .account-meta {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .account-type-badge {
          background-color: rgba(255, 255, 255, 0.2);
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
          font-size: calc(0.75rem * var(--font-scale));
          font-weight: 600;
          align-self: flex-start;
        }

        .account-number {
          font-size: calc(0.85rem * var(--font-scale));
          opacity: 0.9;
        }

        .balance-main {
          margin-bottom: 1.25rem;
        }

        .balance-label {
          font-size: calc(0.9rem * var(--font-scale));
          opacity: 0.9;
          display: block;
          margin-bottom: 0.25rem;
        }

        .balance-amount-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .balance-amount {
          font-size: calc(2.2rem * var(--font-scale));
          font-weight: 800;
          color: #FFF7E8;
          margin: 0;
          letter-spacing: 0.5px;
        }

        html.high-contrast .balance-amount {
          color: #FFE600;
        }

        .eye-toggle-btn {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          padding: 0.4rem 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: calc(0.85rem * var(--font-scale));
          font-weight: 600;
          transition: background-color 0.2s ease;
        }

        .eye-toggle-btn:hover {
          background-color: rgba(255, 255, 255, 0.35);
        }

        .card-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 0.85rem;
          font-size: calc(0.8rem * var(--font-scale));
        }

        .security-tag {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background-color: rgba(255, 255, 255, 0.95);
          color: #174F49;
          padding: 0.25rem 0.6rem;
          border-radius: 12px;
          font-weight: 700;
        }

        .details-link {
          color: #F2B66D;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
        }

        html.high-contrast .details-link {
          color: #FFE600;
        }

        .details-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
