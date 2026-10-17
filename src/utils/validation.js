// src/utils/validation.js

export const validateUserId = (userId) => {
  const trimmedUserId = typeof userId === 'string' ? userId.trim() : '';

  if (!trimmedUserId) {
    return 'User ID is required.';
  }
  if (trimmedUserId.length < 3) {
    return 'User ID must be at least 3 characters.';
  }
  return null;
};

export const validatePassword = (password) => {
  const trimmedPassword = typeof password === 'string' ? password.trim() : '';

  if (!trimmedPassword) {
    return 'Password is required.';
  }
  if (trimmedPassword.length < 4) {
    return 'Password must be at least 4 characters.';
  }
  return null;
};

export const validateTransferAmount = (amount, availableBalance) => {
  const numAmount = Number.parseFloat(amount);

  if (!Number.isFinite(numAmount) || numAmount <= 0) {
    return 'Please enter a valid amount greater than ₹0.';
  }

  if (typeof availableBalance === 'number' && numAmount > availableBalance) {
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
