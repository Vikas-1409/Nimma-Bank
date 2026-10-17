// src/pages/Transfer.jsx
import React, { useState } from 'react';
import { useBanking } from '../context/BankingContext';
import { useLanguage } from '../context/LanguageContext';
import { useNetwork } from '../context/NetworkContext';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { InsufficientBalanceModal } from '../components/InsufficientBalanceModal';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { ArrowLeft, UserPlus, CheckCircle2, AlertCircle, Send, Edit, RefreshCw, FileText, Printer, WifiOff } from 'lucide-react';

export const Transfer = ({ onBack, onCompleteTransfer }) => {
  const { balance, beneficiaries, addBeneficiary, processTransfer } = useBanking();
  const { language, t } = useLanguage();
  const { isOnline } = useNetwork();

  // Wizard state: 1: Select, 2: Amount, 3: Review, 4: Result
  const [step, setStep] = useState(1);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showInsufficientModal, setShowInsufficientModal] = useState(false);
  const [transferResult, setTransferResult] = useState(null);

  // New beneficiary form modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecName, setNewRecName] = useState('');
  const [newRecBank, setNewRecBank] = useState('');
  const [newRecAcc, setNewRecAcc] = useState('');

  // Handle Beneficiary selection
  const handleSelectRecipient = (rec) => {
    setSelectedRecipient(rec);
    setErrorMsg('');
    setStep(2);
  };

  // Handle new beneficiary addition
  const handleSaveBeneficiary = (e) => {
    e.preventDefault();
    if (!newRecName.trim() || !newRecBank.trim() || !newRecAcc.trim()) {
      return;
    }
    const added = addBeneficiary({
      name: newRecName,
      bank: newRecBank,
      accountNumber: newRecAcc
    });
    setSelectedRecipient(added);
    setShowAddModal(false);
    setNewRecName('');
    setNewRecBank('');
    setNewRecAcc('');
    setStep(2);
  };

  // Handle Amount Step Submission
  const handleProceedToReview = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMsg(t('invalidAmountMsg'));
      return;
    }
    if (numAmount > balance) {
      setShowInsufficientModal(true);
      setErrorMsg(`${t('insufficientFundsMsg')} ₹${balance.toLocaleString('en-IN')}`);
      return;
    }

    setStep(3);
  };

  // Handle final transfer confirmation
  const handleExecuteTransfer = () => {
    setShowConfirmModal(false);

    if (!isOnline) {
      setErrorMsg(t('offlineTransferError'));
      return;
    }

    const numAmount = parseFloat(amount);
    if (numAmount > balance) {
      setShowInsufficientModal(true);
      setErrorMsg(`${t('insufficientFundsMsg')} ₹${balance.toLocaleString('en-IN')}`);
      return;
    }

    const res = processTransfer(selectedRecipient, amount, note);
    if (res.success) {
      setTransferResult(res);
      setStep(4); // Success Result Step
      if (onCompleteTransfer) {
        onCompleteTransfer(res.transaction);
      }
    } else {
      if (res.reason === 'INSUFFICIENT_BALANCE') {
        setShowInsufficientModal(true);
      }
      setErrorMsg('Transfer failed: ' + res.reason);
    }
  };

  const currentStepTitle = step === 1 ? t('step1Title') : step === 2 ? t('step2Title') : step === 3 ? t('step3Title') : t('step5Title');

  return (
    <div className="transfer-page animate-fade-in">
      <button onClick={onBack} className="back-link">
        <ArrowLeft size={18} />
        <span>{t('backToDashboard')}</span>
      </button>

      {/* Progress Header */}
      <div className="transfer-header-row">
        <h2>{t('transferTitle')}</h2>
        <ReadAloudButton text={currentStepTitle} label="" />
      </div>

      <div className="wizard-progress-bar">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>4</div>
      </div>

      {errorMsg && (
        <div className="error-alert">
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: SELECT RECIPIENT */}
      {step === 1 && (
        <div className="step-container animate-fade-in">
          <div className="step-prompt-row">
            <h3>{t('selectBeneficiaryPrompt')}</h3>
            <button onClick={() => setShowAddModal(true)} className="add-rec-btn">
              <UserPlus size={18} />
              <span>{t('addBeneficiaryBtn')}</span>
            </button>
          </div>

          <div className="beneficiary-list">
            {beneficiaries.map((rec) => (
              <div
                key={rec.id}
                onClick={() => handleSelectRecipient(rec)}
                className="nimma-card beneficiary-item"
              >
                <div className="avatar-circle" style={{ backgroundColor: rec.avatarColor }}>
                  {rec.initials}
                </div>
                <div className="rec-info">
                  <h4 className="rec-name">{rec.nameKn && language === 'kn' ? rec.nameKn : rec.name}</h4>
                  <span className="rec-bank">{rec.bankKn && language === 'kn' ? rec.bankKn : rec.bank} • {rec.accountNumber}</span>
                </div>
                <div className="select-arrow">&rarr;</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: ENTER AMOUNT */}
      {step === 2 && selectedRecipient && (
        <div className="step-container animate-fade-in">
          <div className="selected-rec-card nimma-card">
            <span className="sub-label">{t('transferTo')}:</span>
            <h3 className="rec-name-bold">{selectedRecipient.nameKn && language === 'kn' ? selectedRecipient.nameKn : selectedRecipient.name}</h3>
            <span className="rec-sub">{selectedRecipient.bank} • {selectedRecipient.accountNumber}</span>
            <button onClick={() => setStep(1)} className="change-rec-btn">Change Recipient</button>
          </div>

          <form onSubmit={handleProceedToReview} className="amount-form nimma-card">
            <div className="form-group">
              <label className="form-label">{t('enterAmountPrompt')}</label>
              <div className="amount-input-wrapper">
                <span className="currency-symbol">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="amount-input"
                  min="1"
                  step="any"
                  autoFocus
                  required
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="presets-row">
              <span className="presets-label">{t('presetAmounts')}</span>
              <div className="chips-grid">
                {[100, 500, 1000, 2000, 5000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val.toString())}
                    className="preset-chip"
                  >
                    +₹{val}
                  </button>
                ))}
              </div>
            </div>

            {/* Note Field */}
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="form-label">{t('noteLabel')}</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t('notePlaceholder')}
                className="form-input"
              />
            </div>

            <button type="submit" className="btn-primary continue-btn">
              <span>{t('continueBtn')}</span>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* STEP 3: REVIEW DETAILS */}
      {step === 3 && selectedRecipient && (
        <div className="step-container animate-fade-in">
          <div className="nimma-card review-card">
            <h3>{t('reviewTitle')}</h3>

            <div className="review-box">
              <div className="review-row">
                <span className="r-label">{t('transferTo')}</span>
                <span className="r-val">{selectedRecipient.name}</span>
              </div>
              <div className="review-row">
                <span className="r-label">{t('recipientBankLabel')}</span>
                <span className="r-val">{selectedRecipient.bank} ({selectedRecipient.accountNumber})</span>
              </div>
              <div className="review-row">
                <span className="r-label">{t('transferAmount')}</span>
                <span className="r-val amount-big">₹{parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              {note && (
                <div className="review-row">
                  <span className="r-label">{t('transferNote')}</span>
                  <span className="r-val">"{note}"</span>
                </div>
              )}
              <div className="review-row">
                <span className="r-label">{t('feeLabel')}</span>
                <span className="r-val fee-free">{t('freeFee')}</span>
              </div>
            </div>

            {!isOnline && (
              <div className="offline-warning-box">
                <WifiOff size={18} />
                <span>{t('offlineTransferError')}</span>
              </div>
            )}

            <div className="review-actions">
              <button onClick={() => setStep(2)} className="btn-secondary">
                <Edit size={16} />
                <span>{t('editBtn')}</span>
              </button>
              <button
                onClick={() => setShowConfirmModal(true)}
                disabled={!isOnline}
                className="btn-primary"
              >
                <span>{t('confirmTransferBtn')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: RESULT SCREEN */}
      {step === 4 && transferResult && (
        <div className="step-container animate-fade-in">
          <div className="nimma-card result-card printable-receipt">
            <div className="success-icon-badge no-print">
              <CheckCircle2 size={48} color="#2E7D32" />
            </div>
            <h2>{t('transferSuccessTitle')}</h2>
            <p className="ref-number">{t('referenceIdLabel')}: <strong>{transferResult.refId}</strong></p>

            <div className="result-summary-box">
              <div className="res-row">
                <span>{t('transferTo')}:</span>
                <strong>{selectedRecipient.name} ({selectedRecipient.bank})</strong>
              </div>
              <div className="res-row">
                <span>{t('recipientAccountLabel')}:</span>
                <strong>{selectedRecipient.accountNumber}</strong>
              </div>
              <div className="res-row">
                <span>{t('transferAmount')}:</span>
                <strong className="res-amount">₹{parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
              </div>
              {note && (
                <div className="res-row">
                  <span>{t('transferNote')}:</span>
                  <strong>"{note}"</strong>
                </div>
              )}
              <div className="res-row">
                <span>{t('dateLabel')}:</span>
                <strong>{transferResult.transaction?.date || new Date().toLocaleString()}</strong>
              </div>
              <div className="res-row">
                <span>{t('updatedBalanceLabel')}:</span>
                <strong className="new-bal">₹{transferResult.newBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
              </div>
            </div>

            <div className="print-watermark">
              <span>✓ NIMMA BANK OFFICIAL VOUCHER • PROTOTYPE DEMO</span>
            </div>

            <div className="result-actions no-print">
              <button onClick={() => window.print()} className="btn-secondary">
                <Printer size={18} />
                <span>{t('printReceipt')}</span>
              </button>
              <button onClick={() => { setStep(1); setAmount(''); setNote(''); }} className="btn-accent">
                <RefreshCw size={18} />
                <span>{t('sendAnotherBtn')}</span>
              </button>
              <button onClick={onBack} className="btn-primary">
                {t('backToDashboard')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationDialog
        isOpen={showConfirmModal}
        recipientName={selectedRecipient ? selectedRecipient.name : ''}
        amount={amount}
        note={note}
        onConfirm={handleExecuteTransfer}
        onCancel={() => setShowConfirmModal(false)}
      />

      {/* Insufficient Balance Popup Modal */}
      <InsufficientBalanceModal
        isOpen={showInsufficientModal}
        enteredAmount={amount}
        availableBalance={balance}
        onClose={() => setShowInsufficientModal(false)}
      />

      {/* Add Beneficiary Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card animate-fade-in">
            <h3>{t('addBeneficiaryBtn')}</h3>
            <form onSubmit={handleSaveBeneficiary} style={{ marginTop: '1rem' }}>
              <div className="form-group">
                <label className="form-label">{t('recipientNameLabel')}</label>
                <input
                  type="text"
                  value={newRecName}
                  onChange={(e) => setNewRecName(e.target.value)}
                  placeholder="e.g. Suresh Kumar"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('recipientBankLabel')}</label>
                <input
                  type="text"
                  value={newRecBank}
                  onChange={(e) => setNewRecBank(e.target.value)}
                  placeholder="e.g. Canara Bank"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('recipientAccountLabel')}</label>
                <input
                  type="text"
                  value={newRecAcc}
                  onChange={(e) => setNewRecAcc(e.target.value)}
                  placeholder="e.g. 1234-5678-9012"
                  className="form-input"
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">
                  {t('cancelBtn')}
                </button>
                <button type="submit" className="btn-primary">
                  {t('saveBeneficiaryBtn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .transfer-page {
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

        .transfer-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .transfer-header-row h2 {
          margin: 0;
        }

        .wizard-progress-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .progress-step {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--border-color);
          color: var(--secondary-text);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .progress-step.active {
          background-color: var(--primary-teal);
          color: white;
        }

        html.high-contrast .progress-step.active {
          background-color: #FFE600;
          color: #000000;
        }

        .progress-line {
          flex: 1;
          height: 4px;
          max-width: 40px;
          background-color: var(--border-color);
        }

        .step-prompt-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .step-prompt-row h3 {
          margin: 0;
          font-size: calc(1.1rem * var(--font-scale));
        }

        .add-rec-btn {
          background-color: var(--soft-mint);
          color: var(--primary-teal);
          padding: 0.4rem 0.85rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          font-weight: 700;
          font-size: calc(0.85rem * var(--font-scale));
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .beneficiary-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .beneficiary-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 0;
          cursor: pointer;
        }

        .avatar-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          color: white;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .rec-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .rec-name {
          margin: 0;
          font-size: calc(1.05rem * var(--font-scale));
          font-weight: 700;
        }

        .rec-bank {
          font-size: calc(0.82rem * var(--font-scale));
          color: var(--secondary-text);
        }

        .select-arrow {
          font-size: 1.25rem;
          color: var(--primary-teal);
          font-weight: 700;
        }

        .selected-rec-card {
          background-color: var(--soft-mint);
          position: relative;
        }

        .sub-label {
          font-size: calc(0.8rem * var(--font-scale));
          color: var(--secondary-text);
        }

        .rec-name-bold {
          margin: 0.2rem 0;
          font-size: calc(1.3rem * var(--font-scale));
          color: var(--primary-teal);
        }

        html.high-contrast .rec-name-bold {
          color: #FFE600;
        }

        .change-rec-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          color: var(--primary-teal);
          font-weight: 700;
          text-decoration: underline;
          font-size: calc(0.85rem * var(--font-scale));
        }

        .amount-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .currency-symbol {
          position: absolute;
          left: 1rem;
          font-size: calc(2rem * var(--font-scale));
          font-weight: 800;
          color: var(--primary-teal);
        }

        .amount-input {
          width: 100%;
          min-height: 64px;
          padding: 0.75rem 1rem 0.75rem 3rem;
          font-size: calc(2rem * var(--font-scale));
          font-weight: 800;
          border: 3px solid var(--border-color);
          border-radius: 16px;
          color: var(--dark-text);
          outline: none;
        }

        .amount-input:focus {
          border-color: var(--primary-teal);
        }

        .presets-row {
          margin-top: 1rem;
        }

        .chips-grid {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 0.35rem;
        }

        .preset-chip {
          background-color: var(--cream-bg);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 0.4rem 0.85rem;
          font-weight: 700;
          font-size: calc(0.9rem * var(--font-scale));
          color: var(--dark-text);
        }

        .preset-chip:hover {
          background-color: var(--primary-teal);
          color: white;
        }

        .continue-btn {
          min-height: 54px;
          margin-top: 1.5rem;
          font-size: calc(1.1rem * var(--font-scale));
        }

        .review-box {
          background-color: var(--cream-bg);
          border-radius: 14px;
          padding: 1.25rem;
          margin: 1rem 0;
          border: 1px solid var(--border-color);
        }

        .review-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px dashed var(--border-color);
        }

        .review-row:last-child {
          border-bottom: none;
        }

        .r-label {
          color: var(--secondary-text);
          font-weight: 600;
        }

        .r-val {
          font-weight: 700;
          color: var(--dark-text);
        }

        .amount-big {
          font-size: calc(1.4rem * var(--font-scale));
          color: var(--primary-teal);
        }

        .fee-free {
          color: var(--success-green);
        }

        .review-actions {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 0.75rem;
        }

        .result-card {
          text-align: center;
          padding: 2.5rem 1.5rem;
        }

        .success-icon-badge {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: var(--success-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem auto;
        }

        .ref-number {
          color: var(--secondary-text);
          margin-bottom: 1.5rem;
        }

        .result-summary-box {
          background-color: var(--soft-mint);
          border-radius: 16px;
          padding: 1.25rem;
          margin-bottom: 2rem;
          text-align: left;
        }

        .res-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .res-amount {
          color: var(--primary-teal);
          font-size: calc(1.2rem * var(--font-scale));
        }

        .new-bal {
          color: var(--success-green);
        }

        .result-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .offline-warning-box {
          background-color: var(--danger-bg);
          color: var(--danger-red);
          padding: 0.75rem 1rem;
          border-radius: 12px;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};
