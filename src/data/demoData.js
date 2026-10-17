// src/data/demoData.js

export const initialUserProfile = {
  name: {
    en: "Ramesh Gowda",
    kn: "ರಮೇಶ್ ಗೌಡ"
  },
  userId: "DEMO1234",
  accountNumber: "4092-8812-9901",
  branch: {
    en: "Mandya Rural Branch",
    kn: "ಮಂಡ್ಯ ಗ್ರಾಮಾಂತರ ಶಾಖೆ"
  },
  ifsc: "NIMM0001234",
  phone: "+91 98765 43210",
  village: {
    en: "Gejjalagere, Mandya",
    kn: "ಗೆಜ್ಜಲಗೆರೆ, ಮಂಡ್ಯ"
  },
  accountType: {
    en: "Savings Demo Account",
    kn: "ಉಳಿತಾಯ ಡೆಮೋ ಖಾತೆ"
  }
};

export const initialBalance = 15450.00;

export const initialBeneficiaries = [
  {
    id: "b1",
    name: "Suma Gowda (Sister)",
    nameKn: "ಸುಮಾ ಗೌಡ (ಸಹೋದರಿ)",
    bank: "State Bank of India",
    bankKn: "ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ",
    accountNumber: "9876-5432-1001",
    avatarColor: "#147D75",
    initials: "SG"
  },
  {
    id: "b2",
    name: "Basavaraj (Fertilizer Store)",
    nameKn: "ಬಸವರಾಜು (ಗೊಬ್ಬರದ ಅಂಗಡಿ)",
    bank: "Canara Bank",
    bankKn: "ಕೆನರಾ ಬ್ಯಾಂಕ್",
    accountNumber: "5678-1234-9002",
    avatarColor: "#F2B66D",
    initials: "BF"
  },
  {
    id: "b3",
    name: "Krishna Dairy Cooperative",
    nameKn: "ಕೃಷ್ಣ ಹಾಲಿನ ಡೈರಿ ಕೊ-ಆಪರೇಟಿವ್",
    bank: "Apex Co-operative Bank",
    bankKn: "ಅಪೆಕ್ಸ್ ಕೊ-ಆಪರೇಟಿವ್ ಬ್ಯಾಂಕ್",
    accountNumber: "3456-7890-1122",
    avatarColor: "#46645A",
    initials: "KD"
  },
  {
    id: "b4",
    name: "Venkatesh (Son - College Fee)",
    nameKn: "ವೆಂಕಟೇಶ್ (ಮಗ - ಕಾಲೇಜು ಫೀಸ್)",
    bank: "Union Bank of India",
    bankKn: "ಯೂನಿಯನ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ",
    accountNumber: "1122-3344-5566",
    avatarColor: "#E07A5F",
    initials: "VK"
  }
];

export const initialTransactions = [
  {
    id: "NIMMA-8821",
    type: "CREDIT",
    amount: 5000.00,
    title: {
      en: "Govt Agriculture Subsidy",
      kn: "ಸರ್ಕಾರದ ಕೃಷಿ ಸಹಾಯಧನ"
    },
    senderReceiver: "Dept of Agriculture",
    senderReceiverKn: "ಕೃಷಿ ಇಲಾಖೆ",
    date: "2026-09-18 10:30 AM",
    status: "Successful",
    note: {
      en: "PM-Kisan Installment",
      kn: "ಪಿಎಂ-ಕಿಸಾನ್ ಕಂತು"
    }
  },
  {
    id: "NIMMA-8790",
    type: "DEBIT",
    amount: 1250.00,
    title: {
      en: "Basavaraj Fertilizer Store",
      kn: "ಬಸವರಾಜು ಗೊಬ್ಬರದ ಅಂಗಡಿ"
    },
    senderReceiver: "Basavaraj",
    senderReceiverKn: "ಬಸವರಾಜು",
    date: "2026-09-17 04:15 PM",
    status: "Successful",
    note: {
      en: "Urea & Organic Fertilizer",
      kn: "ಯೂರಿಯಾ ಮತ್ತು ಗೊಬ್ಬರ"
    }
  },
  {
    id: "NIMMA-8654",
    type: "CREDIT",
    amount: 3200.00,
    title: {
      en: "Milk Payment - Krishna Dairy",
      kn: "ಹಾಲಿನ ಹಣ - ಕೃಷ್ಣ ಡೈರಿ"
    },
    senderReceiver: "Krishna Dairy Coop",
    senderReceiverKn: "ಕೃಷ್ಣ ಡೈರಿ",
    date: "2026-09-15 08:00 AM",
    status: "Successful",
    note: {
      en: "Fortnightly Milk Supply",
      kn: "15 ದಿನಗಳ ಹಾಲಿನ ಹಣ"
    }
  },
  {
    id: "NIMMA-8512",
    type: "DEBIT",
    amount: 480.00,
    title: {
      en: "Electricity Bill (BESCOM)",
      kn: "ವಿದ್ಯುತ್ ಬಿಲ್ (ಚಾಮುಂಡೇಶ್ವರಿ)"
    },
    senderReceiver: "CESC Karnataka",
    senderReceiverKn: "ಸಿಇಎಸ್ ಸಿ ಕರ್ನಾಟಕ",
    date: "2026-09-10 02:45 PM",
    status: "Successful",
    note: {
      en: "Pump house & Farm electricity",
      kn: "ಪಂಪ್ ಹೌಸ್ ಬಿಲ್"
    }
  }
];

export const learningStepsData = [
  {
    step: 1,
    titleKey: "learningStep1Title",
    descKey: "learningStep1Desc",
    highlightArea: "dashboard-overview"
  },
  {
    step: 2,
    titleKey: "learningStep2Title",
    descKey: "learningStep2Desc",
    highlightArea: "balance-card"
  },
  {
    step: 3,
    titleKey: "learningStep3Title",
    descKey: "learningStep3Desc",
    highlightArea: "select-recipient"
  },
  {
    step: 4,
    titleKey: "learningStep4Title",
    descKey: "learningStep4Desc",
    highlightArea: "amount-entry"
  },
  {
    step: 5,
    titleKey: "learningStep5Title",
    descKey: "learningStep5Desc",
    highlightArea: "confirm-transfer"
  }
];
