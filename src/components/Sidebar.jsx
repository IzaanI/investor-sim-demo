import React from "react";
import { Newspaper, Users, Briefcase, Lock, RefreshCw, BarChart2 } from "lucide-react";
import { useGameStore } from "../state/useGameStore";

export default function Sidebar({ activeTab, setActiveTab }) {
  const resetGame = useGameStore(state => state.resetGame);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the game? All current progress will be lost.")) {
      resetGame();
      setActiveTab("news");
    }
  };

  const tutorialActive = useGameStore(state => state.tutorialActive);
  const tutorialStep = useGameStore(state => state.tutorialStep);
  const setTutorialStep = useGameStore(state => state.setTutorialStep);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tutorialActive) {
      if (tab === "pitches" && tutorialStep === 2) {
        setTutorialStep(3);
      } else if (tab === "portfolio" && tutorialStep === 7) {
        setTutorialStep(8);
      }
    }
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <BarChart2 size={24} style={{ color: "var(--color-accent-light)" }} />
          <span>Apex Capitalist</span>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            id="sidebar-tab-news"
            className={`nav-item ${activeTab === "news" ? "active" : ""}`}
            onClick={() => handleTabClick("news")}
          >
            <Newspaper size={18} />
            <span>News</span>
          </button>
          
          <button 
            id="sidebar-tab-pitches"
            className={`nav-item ${activeTab === "pitches" ? "active" : ""}`}
            onClick={() => handleTabClick("pitches")}
          >
            <Users size={18} />
            <span>Pitches</span>
          </button>
          
          <button 
            id="sidebar-tab-portfolio"
            className={`nav-item ${activeTab === "portfolio" ? "active" : ""}`}
            onClick={() => handleTabClick("portfolio")}
          >
            <Briefcase size={18} />
            <span>Portfolio</span>
          </button>
          
          <button 
            className="nav-item disabled" 
            title="Upgrades are locked in the demo"
            disabled
          >
            <Lock size={18} />
            <span>Upgrades</span>
          </button>
        </nav>
      </div>

      <div className="sidebar-footer">
        <button className="reset-btn" onClick={handleReset}>
          <RefreshCw size={12} />
          <span>Reset Session</span>
        </button>
      </div>
    </aside>
  );
}
