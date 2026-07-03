import React from "react";
import { useGameStore } from "../state/useGameStore";

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

  // Recalculate current net worth
  const activeHoldingsValue = portfolio
    .filter(h => h.status === "active" || h.status === "exit_pending")
    .reduce((sum, h) => sum + Math.round(h.investedAmount * h.currentValueMultiplier), 0);
  const netWorth = cash + activeHoldingsValue;

  // 52 turns total, 1 turn = 1 month. 3 turns = 1 quarter, 12 turns = 1 year.
  const totalTurns = 52;
  const year = Math.floor((turn - 1) / 12) + 1;
  const quarter = Math.floor(((turn - 1) % 12) / 3) + 1;

  const isCashNegative = cash < 0;
  const isNetWorthDanger = netWorth < 200000;

  return (
    <header className="dashboard-header">
      <div className="header-stat">
        <span className="stat-label">Net Worth</span>
        <span className={`stat-value networth ${isNetWorthDanger ? "bankruptcy-danger" : ""}`}>{formatMoney(netWorth)}</span>
        <span className="stat-subtext">Portfolio + Cash</span>
      </div>

      <div className="header-stat">
        <span className="stat-label">Cash (Spendable)</span>
        <span className={`stat-value cash ${isCashNegative ? "liquidity-crunch" : ""}`}>{formatMoney(cash)}</span>
        <span className="stat-subtext">Ready to deploy</span>
      </div>

      <div className="header-stat">
        <span className="stat-label">Turn</span>
        <span className="stat-value">{turn} / {totalTurns}</span>
        <span className="stat-subtext highlight">Year {year} • Q{quarter}</span>
      </div>

      <div className="header-stat">
        <span className="stat-label">Active Holdings</span>
        <span className="stat-value" style={{ color: "var(--color-accent-light)" }}>
          {portfolio.filter(h => h.status === "active").length}
        </span>
        <span className="stat-subtext">Companies funded</span>
      </div>
    </header>
  );
}
