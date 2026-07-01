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

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <BarChart2 size={24} style={{ color: "var(--color-accent-light)" }} />
          <span>Capitalist.io</span>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === "news" ? "active" : ""}`}
            onClick={() => setActiveTab("news")}
          >
            <Newspaper size={18} />
            <span>News</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === "pitches" ? "active" : ""}`}
            onClick={() => setActiveTab("pitches")}
          >
            <Users size={18} />
            <span>Pitches</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === "portfolio" ? "active" : ""}`}
            onClick={() => setActiveTab("portfolio")}
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
