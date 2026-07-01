import React, { useEffect, useState } from "react";
import useGameStore from "./state/useGameStore";
import Sidebar from "./components/Sidebar";
import Header, { formatMoney } from "./components/Header";
import NewsPanel from "./components/NewsPanel";
import PitchPanel from "./components/PitchPanel";
import PortfolioPanel from "./components/PortfolioPanel";
import { ArrowRight, AlertTriangle, Trophy, TrendingUp, RefreshCw } from "lucide-react";

export default function App() {
  const {
    turn,
    cash,
    portfolio,
    netWorthHistory,
    gameOver,
    demoFinished,
    startGame,
    nextTurn,
    resetGame
  } = useGameStore();

  const [activeTab, setActiveTab] = useState("news");

  // Load or start game on mount
  useEffect(() => {
    startGame();
  }, [startGame]);

  // Recalculate portfolio value and net worth for summary screens
  const activeHoldingsValue = portfolio
    .filter(h => h.status === "active" || h.status === "exit_pending")
    .reduce((sum, h) => sum + Math.round(h.investedAmount * h.currentValueMultiplier), 0);
  const currentNetWorth = cash + activeHoldingsValue;

  const maxNetWorth = Math.max(...netWorthHistory, 10000000);
  const totalInvestments = portfolio.length;
  const successfulExits = portfolio.filter(h => h.status === "exited" && (h.exitValue || 0) > h.investedAmount).length;

  // Helper to render the net worth progression chart on end-screens
  const renderNetWorthChart = () => {
    if (netWorthHistory.length < 2) return null;
    const width = 500;
    const height = 150;
    const padding = 15;

    const maxVal = Math.max(...netWorthHistory) * 1.1;
    const minVal = Math.min(...netWorthHistory) * 0.9;
    const valRange = maxVal - minVal || 1;

    const coords = netWorthHistory.map((val, index) => {
      const x = padding + (index / (netWorthHistory.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((val - minVal) / valRange) * (height - 2 * padding);
      return `${x},${y}`;
    });

    const pathData = `M ${coords.join(" L ")}`;

    return (
      <div style={{ width: "100%", maxWidth: "500px", margin: "1.5rem auto", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid var(--border-color)", padding: "1rem", borderRadius: "8px" }}>
        <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-accent-light)", marginBottom: "0.75rem" }}>
          Net Worth Trajectory
        </h4>
        <div style={{ position: "relative", height: `${height}px` }}>
          <svg style={{ width: "100%", height: "100%", overflow: "visible" }} viewBox={`0 0 ${width} ${height}`}>
            <path className="chart-glow" d={pathData} />
            <path className="chart-path" d={pathData} />
            {/* Draw first and last points */}
            <circle cx={coords[0].split(",")[0]} cy={coords[0].split(",")[1]} r={4} fill="var(--color-accent-light)" />
            <circle cx={coords[coords.length-1].split(",")[0]} cy={coords[coords.length-1].split(",")[1]} r={4} fill="var(--color-accent-light)" />
          </svg>
        </div>
        <div style={{ display: "flex", justifyBetween: "space-between", fontSize: "0.65rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
          <span>Start: {formatMoney(netWorthHistory[0])}</span>
          <span style={{ marginLeft: "auto" }}>Peak: {formatMoney(maxVal / 1.1)}</span>
        </div>
      </div>
    );
  };

  const handleRestart = () => {
    resetGame();
    setActiveTab("news");
  };

  // 1. GAME OVER / BANKRUPTCY SCREEN
  if (gameOver) {
    return (
      <div style={{ display: "flex", height: "100vh", width: "100vw", alignItems: "center", justifyContent: "center", backgroundColor: "var(--bg-main)" }}>
        <div className="game-over-screen">
          <AlertTriangle size={48} style={{ color: "var(--color-danger)", marginBottom: "1rem" }} />
          <h1 className="game-over-title">Bankruptcy</h1>
          <p className="game-over-desc">
            Your fund net worth hit zero. The board of directors has dissolved your assets, closed your remaining venture holdings, and terminated your role as Managing Partner.
          </p>

          <div className="game-over-stats">
            <div>
              <div className="card-stat-label">Final Turn</div>
              <div className="card-stat-value">{turn} / 52</div>
            </div>
            <div>
              <div className="card-stat-label">Peak Net Worth</div>
              <div className="card-stat-value" style={{ color: "var(--color-accent-light)" }}>
                {formatMoney(maxNetWorth)}
              </div>
            </div>
            <div>
              <div className="card-stat-label">Total Investments</div>
              <div className="card-stat-value">{totalInvestments}</div>
            </div>
            <div>
              <div className="card-stat-label">Successful Exits</div>
              <div className="card-stat-value" style={{ color: "var(--color-success)" }}>{successfulExits}</div>
            </div>
          </div>

          {renderNetWorthChart()}

          <button className="restart-btn" onClick={handleRestart}>
            Start New Session
          </button>
        </div>
      </div>
    );
  }

  // 2. DEMO COMPLETED SCREEN (52 Turns reached)
  if (demoFinished) {
    const totalProfit = currentNetWorth - 10000000;
    const profitPercent = ((totalProfit / 10000000) * 100).toFixed(1);
    const hasProfit = totalProfit >= 0;

    return (
      <div style={{ display: "flex", height: "100vh", width: "100vw", alignItems: "center", justifyContent: "center", backgroundColor: "var(--bg-main)" }}>
        <div className="game-over-screen" style={{ borderColor: "rgba(16, 185, 129, 0.3)" }}>
          <Trophy size={48} style={{ color: "var(--color-success)", marginBottom: "1rem" }} />
          <h1 className="game-over-title" style={{ color: "var(--color-success)", textShadow: "0 0 15px var(--color-success-glow)" }}>
            Demo Completed
          </h1>
          <p className="game-over-desc">
            Venture period concluded. You have successfully managed the portfolio through Year 1. Here is your final performance record as Managing Partner.
          </p>

          <div className="game-over-stats">
            <div>
              <div className="card-stat-label">Final Net Worth</div>
              <div className="card-stat-value" style={{ color: hasProfit ? "var(--color-success)" : "var(--color-danger)" }}>
                {formatMoney(currentNetWorth)}
              </div>
            </div>
            <div>
              <div className="card-stat-label">Net Performance</div>
              <div className="card-stat-value" style={{ color: hasProfit ? "var(--color-success)" : "var(--color-danger)" }}>
                {hasProfit ? `+${profitPercent}%` : `${profitPercent}%`}
              </div>
            </div>
            <div>
              <div className="card-stat-label">Cash on Hand</div>
              <div className="card-stat-value">{formatMoney(cash)}</div>
            </div>
            <div>
              <div className="card-stat-label">Active Ventures</div>
              <div className="card-stat-value">{portfolio.filter(h => h.status === "active").length}</div>
            </div>
          </div>

          {renderNetWorthChart()}

          <button className="restart-btn" style={{ backgroundColor: "var(--color-success)", borderColor: "var(--color-success)" }} onClick={handleRestart}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // 3. MAIN GAMEPLAY INTERFACE
  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-viewport">
        <Header />

        <div className="content-container">
          {activeTab === "news" && <NewsPanel />}
          {activeTab === "pitches" && <PitchPanel />}
          {activeTab === "portfolio" && <PortfolioPanel />}

          {/* End Turn Widget */}
          <div className="next-turn-container">
            <button className="next-turn-btn" onClick={nextTurn}>
              <span>End Turn {turn}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
