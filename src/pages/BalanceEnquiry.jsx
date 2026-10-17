// src/pages/BalanceEnquiry.jsx
import React from 'react';
import { useBanking } from '../context/BankingContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { ArrowLeft, Wallet, ShieldCheck, Download, Printer, Landmark, Calendar } from 'lucide-react';

export const BalanceEnquiry = ({ onBack }) => {
  const { balance } = useBanking();
  const { language, t } = useLanguage();
  const { userProfile } = useAuth();

  const formattedBalance = `₹${balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const summaryText = `${t('balanceDetailsTitle')}. ${t('totalSavings')}: ${formattedBalance}. ${t('accNumberLabel')}: ${userProfile.accountNumber}. ${t('branchName')}.`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="balance-enquiry-page animate-fade-in">
      <button onClick={onBack} className="back-link">
        <ArrowLeft size={18} />
        <span>{t('backToDashboard')}</span>
      </button>

      <div className="page-header-row">
        <h2>{t('balanceDetailsTitle')}</h2>
        <ReadAloudButton text={summaryText} label="" />
      </div>

      {/* Main Balance Display Card */}
      <div className="nimma-card balance-summary-card">
        <div className="summary-badge">{userProfile.accountType[language] || userProfile.accountType.en}</div>
        <span className="summary-label">{t('totalSavings')}</span>
        <h1 className="summary-amount">{formattedBalance}</h1>

        <div className="account-details-grid">
          <div className="detail-item">
            <span className="detail-label">{t('accNumberLabel')}</span>
            <span className="detail-value">{userProfile.accountNumber}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">IFSC Code</span>
            <span className="detail-value">{userProfile.ifsc}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Branch</span>
            <span className="detail-value">{userProfile.branch[language] || userProfile.branch.en}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Interest Rate</span>
            <span className="detail-value">3.5% p.a. (Demo)</span>
          </div>
        </div>
      </div>

      {/* Extra Info Cards */}
      <div className="nimma-card info-card">
        <div className="info-row">
          <Landmark size={20} color="#147D75" />
          <div>
            <h4>Account Holder</h4>
            <p>{userProfile.name[language] || userProfile.name.en}</p>
          </div>
        </div>
        <div className="info-row">
          <Calendar size={20} color="#147D75" />
          <div>
            <h4>{t('lastUpdated')}</h4>
            <p>Calculated in real-time based on demo activity</p>
          </div>
        </div>
      </div>

      {/* Print / Download Button */}
      <div className="action-row">
        <button onClick={handlePrint} className="btn-primary print-btn">
          <Printer size={20} />
          <span>{t('printStatement')}</span>
        </button>
      </div>

      <style>{`
        .balance-enquiry-page {
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

        .page-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .page-header-row h2 {
          margin: 0;
        }

        .balance-summary-card {
          text-align: center;
          background: linear-gradient(180deg, #FFF7E8 0%, #E3F1E9 100%);
          border: 2px solid var(--border-color);
          padding: 2rem 1.5rem;
        }

        html.high-contrast .balance-summary-card {
          background: #121212;
          border-color: #FFE600;
        }

        .summary-badge {
          display: inline-block;
          background-color: var(--primary-teal);
          color: white;
          padding: 0.3rem 0.85rem;
          border-radius: 14px;
          font-weight: 700;
          font-size: calc(0.85rem * var(--font-scale));
          margin-bottom: 1rem;
        }

        html.high-contrast .summary-badge {
          background-color: #FFE600;
          color: #000000;
        }

        .summary-label {
          font-size: calc(1rem * var(--font-scale));
          color: var(--secondary-text);
          display: block;
        }

        .summary-amount {
          font-size: calc(2.8rem * var(--font-scale));
          color: var(--primary-teal);
          font-weight: 800;
          margin: 0.5rem 0 1.5rem 0;
        }

        html.high-contrast .summary-amount {
          color: #FFE600;
        }

        .account-details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          background-color: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.25rem;
          text-align: left;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
        }

        .detail-label {
          font-size: calc(0.8rem * var(--font-scale));
          color: var(--secondary-text);
        }

        .detail-value {
          font-size: calc(1rem * var(--font-scale));
          font-weight: 700;
          color: var(--dark-text);
        }

        .info-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .info-row h4 {
          margin: 0;
          font-size: calc(0.95rem * var(--font-scale));
        }

        .info-row p {
          margin: 0;
          font-size: calc(0.85rem * var(--font-scale));
          color: var(--secondary-text);
        }

        .print-btn {
          min-height: 52px;
        }
      `}</style>
    </div>
  );
};
