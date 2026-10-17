// src/utils/validation.js

export const validateUserId = (userId) => {
  if (!userId || userId.trim() === '') {
    return 'User ID is required.';
  }
  if (userId.trim().length < 3) {
    return 'User ID must be at least 3 characters.';
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return 'Password is required.';
  }
  if (password.length < 4) {
    return 'Password must be at least 4 characters.';
  }
  return null;
};

export const validateTransferAmount = (amount, availableBalance) => {
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount) || numAmount <= 0) {
    return 'Please enter a valid amount greater than ₹0.';
  }
  if (numAmount > availableBalance) {
    return `Amount exceeds available demo balance of ₹${availableBalance.toLocaleString('en-IN')}.`;
  }
  return null;
};

export const validateBeneficiary = (name, bank, accountNumber) => {
  if (!name || name.trim() === '') {
    return 'Recipient name is required.';
  }
  if (!bank || bank.trim() === '') {
    return 'Bank name is required.';
  }
  if (!accountNumber || accountNumber.trim() === '') {
    return 'Account number is required.';
  }
  return null;
};
