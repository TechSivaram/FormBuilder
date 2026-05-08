import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SoapAssessmentPage from './SoapAssessmentPage';
import './Layout.css';

function App() {
  const { i18n, t } = useTranslation();
  const [isNavOpen, setNavOpen] = useState(false); 
  const [activeTab, setActiveTab] = useState('soap-note');

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className={`app-shell ${isNavOpen ? 'nav-open' : ''}`}>
      {/* Mobile Dimmer Overlay */}
      {isNavOpen && <div className="mobile-overlay" onClick={() => setNavOpen(false)} />}

      <header className="app-header">
        <div className="header-left">
          <button className="menu-btn" onClick={() => setNavOpen(!isNavOpen)}>
            <span className="material-icons">menu</span>
          </button>
          <div className="brand">
            <span className="material-icons brand-icon">health_and_safety</span>
            <span className="brand-text">MedPortal AI</span>
          </div>
        </div>

        <div className="header-right">
          <div className="lang-wrapper">
            <span className="material-icons">translate</span>
            <select className="lang-select" onChange={handleLanguageChange} value={i18n.language}>
              <option value="en">English</option>
              <option value="te">తెలుగు</option>
              <option value="es">Español</option>
              <option value="ms">Bahasa Melayu</option>
            </select>
          </div>
          <span className="material-icons account-icon">account_circle</span>
        </div>
      </header>

      <div className="app-main">
        <nav className={`side-nav ${isNavOpen ? 'open' : 'closed'}`}>
          <div className="nav-container">
            <div className="nav-section">
              <small className="nav-label">Clinical Tasks</small>
              <div 
                className={`nav-item ${activeTab === 'soap-note' ? 'active' : ''}`}
                onClick={() => { setActiveTab('soap-note'); setNavOpen(false); }}
              >
                <span className="material-icons">edit_note</span>
                <span className="nav-text">New SOAP Note</span>
              </div>
              <div className="nav-item" onClick={() => { setActiveTab('history'); setNavOpen(false); }}>
                <span className="material-icons">history</span>
                <span className="nav-text">Patient Records</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="main-content">
          {activeTab === 'soap-note' ? (
            <SoapAssessmentPage formId="soap-001" />
          ) : (
            <div className="content-container fluid">
              <h2>{t('history') || 'Patient Records'}</h2>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;