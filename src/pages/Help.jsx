// src/pages/Help.jsx
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ReadAloudButton } from '../components/ReadAloudButton';
import { HelpCircle, ShieldAlert, PhoneCall, ChevronDown, ChevronUp, Search, ArrowLeft } from 'lucide-react';

export const Help = ({ onBack }) => {
  const { language, t } = useLanguage();

  const [expandedFaq, setExpandedFaq] = useState(0); // expand first by default
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    { qKey: 'faqQ1', aKey: 'faqA1' },
    { qKey: 'faqQ2', aKey: 'faqA2' },
    { qKey: 'faqQ3', aKey: 'faqA3' },
    { qKey: 'faqQ4', aKey: 'faqA4' },
    { qKey: 'faqQ5', aKey: 'faqA5' },
  ];

  const filteredFaqs = faqs.filter(f => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const questionText = t(f.qKey).toLowerCase();
    const answerText = t(f.aKey).toLowerCase();
    return questionText.includes(q) || answerText.includes(q);
  });

  const pageAudioText = `${t('helpTitle')}. ${t('securityWarningTitle')}: ${t('securityWarningMsg')}`;

  return (
    <div className="help-page animate-fade-in">
      {onBack && (
        <button onClick={onBack} className="back-link">
          <ArrowLeft size={18} />
          <span>{t('backToDashboard')}</span>
        </button>
      )}

      <div className="help-header-row">
        <div className="header-title">
          <HelpCircle size={24} color="#147D75" />
          <h2>{t('helpTitle')}</h2>
        </div>
        <ReadAloudButton text={pageAudioText} label="" />
      </div>

      {/* Critical Security Warning Card */}
      <div className="security-alert-card">
        <div className="security-icon-col">
          <ShieldAlert size={32} color="#D32F2F" />
        </div>
        <div className="security-text-col">
          <h3 className="sec-title">{t('securityWarningTitle')}</h3>
          <p className="sec-msg">{t('securityWarningMsg')}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar-wrapper">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search FAQs (e.g., balance, language, text)..."
          className="search-input"
        />
      </div>

      {/* FAQs List */}
      <div className="faqs-list">
        {filteredFaqs.length === 0 ? (
          <div className="nimma-card empty-faq">
            <p>No questions matching your search. Please contact helpline below.</p>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            const question = t(faq.qKey);
            const answer = t(faq.aKey);
            return (
              <div
                key={idx}
                className={`faq-accordion-item nimma-card ${isExpanded ? 'expanded' : ''}`}
                onClick={() => setExpandedFaq(isExpanded ? null : idx)}
              >
                <div className="faq-question-row">
                  <h3 className="faq-question-text">{question}</h3>
                  <div className="faq-arrow-btn">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="faq-answer-body animate-fade-in" onClick={(e) => e.stopPropagation()}>
                    <p className="faq-answer-text">{answer}</p>
                    <ReadAloudButton text={`${question}. ${answer}`} />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Helpline Contact Card */}
      <div className="nimma-card contact-support-card">
        <div className="contact-icon">
          <PhoneCall size={28} color="#147D75" />
        </div>
        <div className="contact-text">
          <h3>{t('contactSupportTitle')}</h3>
          <p className="helpline-num">{t('contactSupportDesc')}</p>
          <span className="availability-tag">Available 24/7 in Kannada & English</span>
        </div>
      </div>

      <style>{`
        .help-page {
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

        .help-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .header-title h2 {
          margin: 0;
        }

        .security-alert-card {
          background-color: var(--danger-bg);
          border: 2px solid var(--danger-red);
          border-radius: 18px;
          padding: 1.25rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .sec-title {
          color: var(--danger-red);
          margin: 0 0 0.25rem 0;
          font-size: calc(1.1rem * var(--font-scale));
        }

        .sec-msg {
          color: #B71C1C;
          margin: 0;
          font-weight: 600;
          font-size: calc(0.95rem * var(--font-scale));
        }

        .search-bar-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--secondary-text);
        }

        .search-input {
          width: 100%;
          min-height: 48px;
          padding: 0.75rem 1rem 0.75rem 2.8rem;
          border: 2px solid var(--border-color);
          border-radius: 14px;
          background-color: var(--white);
          outline: none;
          font-size: calc(0.95rem * var(--font-scale));
        }

        .faqs-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .faq-accordion-item {
          margin: 0;
          cursor: pointer;
          transition: border-color 0.2s ease;
        }

        .faq-accordion-item.expanded {
          border-color: var(--primary-teal);
        }

        .faq-question-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .faq-question-text {
          margin: 0;
          font-size: calc(1.05rem * var(--font-scale));
          font-weight: 700;
          color: var(--dark-text);
        }

        .faq-arrow-btn {
          color: var(--primary-teal);
        }

        .faq-answer-body {
          border-top: 1px dashed var(--border-color);
          padding-top: 0.85rem;
          margin-top: 0.85rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .faq-answer-text {
          margin: 0;
          color: var(--secondary-text);
          font-size: calc(0.95rem * var(--font-scale));
          line-height: 1.5;
        }

        .contact-support-card {
          background: linear-gradient(135deg, #FFF7E8 0%, #E3F1E9 100%);
          border: 2px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .contact-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-text h3 {
          margin: 0 0 0.2rem 0;
          font-size: calc(1.1rem * var(--font-scale));
        }

        .helpline-num {
          margin: 0 0 0.25rem 0;
          font-weight: 800;
          color: var(--primary-teal);
          font-size: calc(1.05rem * var(--font-scale));
        }

        .availability-tag {
          font-size: calc(0.78rem * var(--font-scale));
          color: var(--secondary-text);
        }
      `}</style>
    </div>
  );
};
