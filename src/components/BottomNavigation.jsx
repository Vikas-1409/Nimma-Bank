// src/components/BottomNavigation.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Home, Send, History, User, HelpCircle, BookOpen } from 'lucide-react';

export const BottomNavigation = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', labelKey: 'navHome', icon: Home, path: '/dashboard' },
    { id: 'transfer', labelKey: 'navTransfer', icon: Send, path: '/transfer' },
    { id: 'transactions', labelKey: 'navTransactions', icon: History, path: '/transactions' },
    { id: 'profile', labelKey: 'navProfile', icon: User, path: '/profile' },
    { id: 'help', labelKey: 'navHelp', icon: HelpCircle, path: '/help' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(item => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id, item.path)}
            className={`nav-item ${isActive ? 'active' : ''}`}
            aria-label={t(item.labelKey)}
          >
            <IconComponent size={22} className="nav-icon" />
            <span className="nav-label">{t(item.labelKey)}</span>
          </button>
        );
      })}

      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: var(--container-max-width);
          height: var(--bottom-nav-height);
          background-color: var(--white);
          border-top: 2px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 0.5rem;
          z-index: 90;
          box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.06);
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          height: 100%;
          color: var(--secondary-text);
          background: none;
          border: none;
          transition: color 0.15s ease, transform 0.1s ease;
          position: relative;
        }

        .nav-item:hover {
          color: var(--primary-teal);
        }

        .nav-item.active {
          color: var(--primary-teal);
          font-weight: 700;
        }

        .nav-item.active::after {
          content: '';
          position: absolute;
          top: 0;
          width: 32px;
          height: 3px;
          background-color: var(--primary-teal);
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }

        html.high-contrast .nav-item.active::after {
          background-color: #FFE600;
        }

        .nav-icon {
          margin-bottom: 2px;
        }

        .nav-label {
          font-size: calc(0.72rem * var(--font-scale));
          line-height: 1.1;
          text-align: center;
        }
      `}</style>
    </nav>
  );
};
