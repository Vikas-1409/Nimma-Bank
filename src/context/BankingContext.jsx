// src/context/BankingContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialBalance, initialBeneficiaries, initialTransactions } from '../data/demoData';

const BankingContext = createContext();

export const BankingProvider = ({ children }) => {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('nimmaBank_balance');
    return saved ? parseFloat(saved) : initialBalance;
  });

  const [showBalance, setShowBalance] = useState(() => {
    return localStorage.getItem('nimmaBank_showBalance') !== 'false';
  });

  const [beneficiaries, setBeneficiaries] = useState(() => {
    const saved = localStorage.getItem('nimmaBank_beneficiaries');
    return saved ? JSON.parse(saved) : initialBeneficiaries;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('nimmaBank_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  useEffect(() => {
    localStorage.setItem('nimmaBank_balance', balance.toString());
    localStorage.setItem('nimmaBank_showBalance', showBalance.toString());
    localStorage.setItem('nimmaBank_beneficiaries', JSON.stringify(beneficiaries));
    localStorage.setItem('nimmaBank_transactions', JSON.stringify(transactions));
  }, [balance, showBalance, beneficiaries, transactions]);

  const toggleShowBalance = () => {
    setShowBalance(prev => !prev);
  };

  const addBeneficiary = (newBeneficiary) => {
    const beneficiaryObj = {
      id: 'b_' + Date.now(),
      name: newBeneficiary.name,
      nameKn: newBeneficiary.name,
      bank: newBeneficiary.bank,
      bankKn: newBeneficiary.bank,
      accountNumber: newBeneficiary.accountNumber,
      avatarColor: '#147D75',
      initials: newBeneficiary.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    };
    setBeneficiaries(prev => [beneficiaryObj, ...prev]);
    return beneficiaryObj;
  };

  const processTransfer = (recipient, amount, note) => {
    const numAmount = parseFloat(amount);
    
    // Safety check against balance
    if (numAmount > balance) {
      return { success: false, reason: 'INSUFFICIENT_BALANCE' };
    }

    const refId = 'NIMMA-' + Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newTransaction = {
      id: refId,
      type: 'DEBIT',
      amount: numAmount,
      title: {
        en: recipient.name,
        kn: recipient.nameKn || recipient.name
      },
      senderReceiver: recipient.name,
      senderReceiverKn: recipient.nameKn || recipient.name,
      date: dateStr,
      status: 'Successful',
      note: {
        en: note || 'Money Transfer',
        kn: note || 'ಹಣ ರವಾನೆ'
      }
    };

    const newBalance = balance - numAmount;
    setBalance(newBalance);
    setTransactions(prev => [newTransaction, ...prev]);

    return {
      success: true,
      refId,
      newBalance,
      transaction: newTransaction
    };
  };

  const resetBankingData = () => {
    setBalance(initialBalance);
    setBeneficiaries(initialBeneficiaries);
    setTransactions(initialTransactions);
    setShowBalance(true);
    localStorage.removeItem('nimmaBank_balance');
    localStorage.removeItem('nimmaBank_beneficiaries');
    localStorage.removeItem('nimmaBank_transactions');
  };

  return (
    <BankingContext.Provider
      value={{
        balance,
        showBalance,
        toggleShowBalance,
        beneficiaries,
        addBeneficiary,
        transactions,
        processTransfer,
        resetBankingData
      }}
    >
      {children}
    </BankingContext.Provider>
  );
};

export const useBanking = () => useContext(BankingContext);
