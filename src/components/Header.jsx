import React from "react";
import { useGameStore } from "../state/useGameStore";
import { getReputationTier } from "../data/reputationConfig";

export const formatMoney = (val) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(val);
};

export default function Header() {
  const cash = useGameStore(state => state.cash);
  const portfolio = useGameStore(state => state.portfolio);
  const turn = useGameStore(state => state.turn);
  const reputation = useGameStore(state => state.reputation ?? 0);

  // Recalculate current net worth
  const activeHoldingsValue = portfolio
    .filter(h => h.status === "active" || h.status === "exit_pending")
    .reduce((sum, h) => sum + Math.round(h.valuationAtInvestment * h.currentValueMultiplier * (h.equityPercent / 100)), 0);
  const netWorth = cash + activeHoldingsValue;

  // 52 turns total, 1 turn = 1 month. 3 turns = 1 quarter, 12 turns = 1 year.
  const totalTurns = 52;
  const year = Math.floor((turn - 1) / 12) + 1;
  const quarter = Math.floor(((turn - 1) % 12) / 3) + 1;

  const isCashNegative = cash < 0;
  const isNetWorthDanger = netWorth < 200000;

  const tier = getReputationTier(reputation);


  return (
    <header className="dashboard-header">
      <div className="header-stat">
        <span className="stat-label">Net Worth</span>
        <span className={`stat-value networth ${isNetWorthDanger ? "bankruptcy-danger" : ""}`}>{formatMoney(netWorth)}</span>
        <span className="stat-subtext">Portfolio + Cash</span>
      </div>

      <div className="header-stat">
        <span className="stat-label">Cash</span>
        <span className={`stat-value cash ${isCashNegative ? "liquidity-crunch" : ""}`}>{formatMoney(cash)}</span>
        <span className="stat-subtext">Ready to deploy</span>
      </div>

      <div className="header-stat">
        <span className="stat-label">Turn</span>
        <span className="stat-value">{turn} / {totalTurns}</span>
        <span className="stat-subtext highlight">Year {year} • Q{quarter}</span>
      </div>

      <div className="header-stat">
        <span className="stat-label">Reputation</span>
        <div style={{
          width: "65%",
          height: "6px",
          borderRadius: "3px",
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
          margin: "5px 0",
          position: "relative"
        }}>
          <div style={{
            height: "100%",
            width: `${Math.min(100, Math.max(0, reputation))}%`,
            background: "var(--color-accent-light)",
            borderRadius: "3px",
            transition: "width 0.4s ease"
          }} />
        </div>
        <span className="stat-subtext" style={{ color: "var(--color-accent-light)" }}>{tier.label}</span>
      </div>



    </header>
  );
}
