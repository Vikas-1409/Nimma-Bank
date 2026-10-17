// src/App.jsx
import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BankingProvider } from './context/BankingContext';
import { NetworkProvider } from './context/NetworkContext';

import { AppHeader } from './components/AppHeader';
import { BottomNavigation } from './components/BottomNavigation';
import { VoiceAssistant } from './components/VoiceAssistant';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { SessionTimeoutModal } from './components/SessionTimeoutModal';

import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PasswordRecovery } from './pages/PasswordRecovery';
import { Dashboard } from './pages/Dashboard';
import { BalanceEnquiry } from './pages/BalanceEnquiry';
import { Transfer } from './pages/Transfer';
import { Transactions } from './pages/Transactions';
import { Profile } from './pages/Profile';
import { LearningMode } from './pages/LearningMode';
import { Help } from './pages/Help';

function AppContent() {
  const { isAuthenticated } = useAuth();

  // Navigation State
  const [currentView, setCurrentView] = useState('welcome');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTxForDetails, setSelectedTxForDetails] = useState(null);

  // Accessibility Panel Modal State
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  // Router handler
  const navigateTo = (viewPath) => {
    // Map paths to views
    if (viewPath === '/dashboard' || viewPath === 'home') {
      setCurrentView('dashboard');
      setActiveTab('home');
    } else if (viewPath === '/transfer' || viewPath === 'transfer') {
      setCurrentView('transfer');
      setActiveTab('transfer');
    } else if (viewPath === '/transactions' || viewPath === 'transactions') {
      setCurrentView('transactions');
      setActiveTab('transactions');
    } else if (viewPath === '/profile' || viewPath === 'profile') {
      setCurrentView('profile');
      setActiveTab('profile');
    } else if (viewPath === '/help' || viewPath === 'help') {
      setCurrentView('help');
      setActiveTab('help');
    } else if (viewPath === '/balance') {
      setCurrentView('balance');
    } else if (viewPath === '/learning') {
      setCurrentView('learning');
    } else if (viewPath === '/login') {
      setCurrentView('login');
    } else if (viewPath === '/register') {
      setCurrentView('register');
    } else if (viewPath === '/recovery') {
      setCurrentView('recovery');
    }
  };

  const handleTabChange = (tabId, path) => {
    setActiveTab(tabId);
    navigateTo(path);
  };

  // Determine what view to render
  const renderView = () => {
    // Unauthenticated Views
    if (!isAuthenticated) {
      if (currentView === 'login') {
        return (
          <Login
            onLoginSuccess={() => { setCurrentView('dashboard'); setActiveTab('home'); }}
            onGoRegister={() => setCurrentView('register')}
            onGoRecovery={() => setCurrentView('recovery')}
          />
        );
      }
      if (currentView === 'register') {
        return (
          <Register
            onAccountCreated={() => setCurrentView('login')}
            onGoLogin={() => setCurrentView('login')}
          />
        );
      }
      if (currentView === 'recovery') {
        return <PasswordRecovery onGoLogin={() => setCurrentView('login')} />;
      }
      if (currentView === 'learning') {
        return <LearningMode onExit={() => setCurrentView('welcome')} />;
      }
      // Default Unauthenticated: Welcome Page
      return (
        <Welcome
          onGetStarted={() => setCurrentView('login')}
          onLearnMore={() => setCurrentView('learning')}
        />
      );
    }

    // Authenticated Views
    switch (currentView) {
      case 'balance':
        return <BalanceEnquiry onBack={() => navigateTo('/dashboard')} />;
      case 'transfer':
        return (
          <Transfer
            onBack={() => navigateTo('/dashboard')}
            onCompleteTransfer={(tx) => setSelectedTxForDetails(tx)}
          />
        );
      case 'transactions':
        return (
          <Transactions
            onBack={() => navigateTo('/dashboard')}
            selectedTx={selectedTxForDetails}
            setSelectedTx={setSelectedTxForDetails}
          />
        );
      case 'profile':
        return (
          <Profile
            onBack={() => navigateTo('/dashboard')}
            onOpenAccessibility={() => setIsAccessibilityOpen(true)}
            onNavigate={navigateTo}
          />
        );
      case 'learning':
        return <LearningMode onExit={() => navigateTo('/dashboard')} />;
      case 'help':
        return <Help onBack={() => navigateTo('/dashboard')} />;
      case 'dashboard':
      default:
        return (
          <Dashboard
            onNavigate={navigateTo}
            onSelectTransaction={(tx) => {
              setSelectedTxForDetails(tx);
              setCurrentView('transactions');
              setActiveTab('transactions');
            }}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Universal Header */}
      <AppHeader onOpenAccessibility={() => setIsAccessibilityOpen(true)} />

      {/* Main Page Area */}
      <main className="main-content">
        {renderView()}
      </main>

      {/* Floating Voice Assistant */}
      <VoiceAssistant onNavigate={navigateTo} />

      {/* Bottom Navigation for Mobile */}
      {isAuthenticated && (
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {/* Accessibility Controls Panel Drawer */}
      <AccessibilityPanel
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
      />

      {/* Session Inactivity Timeout Modal */}
      <SessionTimeoutModal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <AuthProvider>
          <BankingProvider>
            <NetworkProvider>
              <AppContent />
            </NetworkProvider>
          </BankingProvider>
        </AuthProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}
