import React, { useState } from "react";
import { Newspaper, Users, Briefcase, Lock, RefreshCw, BarChart2, Menu, X } from "lucide-react";
import { useGameStore } from "../state/useGameStore";

export default function MobileNav({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const resetGame = useGameStore(state => state.resetGame);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the game? All current progress will be lost.")) {
      resetGame();
      setActiveTab("news");
      setIsOpen(false);
    }
  };

  const tutorialActive = useGameStore(state => state.tutorialActive);
  const tutorialStep = useGameStore(state => state.tutorialStep);
  const setTutorialStep = useGameStore(state => state.setTutorialStep);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
    if (tutorialActive) {
      if (tab === "pitches" && tutorialStep === 2) {
        setTutorialStep(3);
      } else if (tab === "portfolio" && tutorialStep === 7) {
        setTutorialStep(8);
      }
    }
  };

  return (
    <div className="mobile-nav mobile-only">
      <div className="mobile-nav-bar">
        <div className="mobile-logo">
          <BarChart2 size={20} style={{ color: "var(--color-accent-light)" }} />
          <span>Apex Capitalist</span>
        </div>
        
        <button 
          id="hamburger-menu-btn"
          className="hamburger-btn" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="mobile-dropdown glassmorphic">
          <nav className="mobile-dropdown-nav">
            <button 
              id="mobile-tab-news"
              className={`mobile-nav-item ${activeTab === "news" ? "active" : ""}`}
              onClick={() => handleTabClick("news")}
            >
              <Newspaper size={18} />
              <span>News</span>
            </button>
            
            <button 
              id="mobile-tab-pitches"
              className={`mobile-nav-item ${activeTab === "pitches" ? "active" : ""}`}
              onClick={() => handleTabClick("pitches")}
            >
              <Users size={18} />
              <span>Pitches</span>
            </button>
            
            <button 
              id="mobile-tab-portfolio"
              className={`mobile-nav-item ${activeTab === "portfolio" ? "active" : ""}`}
              onClick={() => handleTabClick("portfolio")}
            >
              <Briefcase size={18} />
              <span>Portfolio</span>
            </button>
            
            <button 
              className="mobile-nav-item disabled" 
              title="Upgrades are locked in the demo"
              disabled
            >
              <Lock size={18} />
              <span>Upgrades</span>
            </button>

            <div className="mobile-dropdown-divider" />

            <button className="mobile-reset-btn" onClick={handleReset}>
              <RefreshCw size={14} />
              <span>Reset Session</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
