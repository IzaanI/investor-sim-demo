import React, { useState } from "react";
import { useGameStore } from "../state/useGameStore";
import { formatMoney } from "./Header";
import { TRAITS } from "../data/traits";
import { Briefcase, ArrowUpRight, TrendingDown, Clock, ShieldAlert, BarChart3, X } from "lucide-react";

export default function PortfolioPanel() {
  const portfolio = useGameStore(state => state.portfolio);
  const exitHolding = useGameStore(state => state.exitHolding);
  const [selectedHolding, setSelectedHolding] = useState(null);

  const handleOpenDetails = (holding) => {
    setSelectedHolding(holding);
  };

  const handleCloseDetails = () => {
    setSelectedHolding(null);
  };

  // Helper to generate SVG path for the valuation history chart
  const renderHistoryChart = (history) => {
    if (!history || history.length === 0) return null;

    const points = [{ multiplier: 1.0, turn: "Start" }, ...history];
    const width = 500;
    const height = 100;
    const padding = 10;

    const maxMult = Math.max(...points.map(p => p.multiplier), 1.5);
    const minMult = Math.min(...points.map(p => p.multiplier), 0.5);
    const multRange = maxMult - minMult || 1;

    const coords = points.map((p, index) => {
      const x = padding + (index / (points.length - 1)) * (width - 2 * padding);
      // In SVG, Y coordinates go downwards, so we subtract from height
      const y = height - padding - ((p.multiplier - minMult) / multRange) * (height - 2 * padding);
      return `${x},${y}`;
    });

    const pathData = `M ${coords.join(" L ")}`;

    return (
      <div className="chart-placeholder">
        <svg className="chart-svg" viewBox={`0 0 ${width} ${height}`}>
          {/* Background grid lines */}
          <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="rgba(255,255,255,0.03)" strokeWidth={1} />
          {/* Chart path */}
          <path className="chart-glow" d={pathData} />
          <path className="chart-path" d={pathData} />
          {/* Points */}
          {coords.map((c, index) => {
            const [cx, cy] = c.split(",");
            return (
              <circle
                key={index}
                cx={cx}
                cy={cy}
                r={3}
                fill="var(--color-accent-light)"
                stroke="var(--bg-panel)"
                strokeWidth={1.5}
              />
            );
          })}
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
          <span>Investment Start ({formatMoney(selectedHolding.investedAmount)})</span>
          <span>Current Value ({formatMoney(Math.round(selectedHolding.investedAmount * points[points.length - 1].multiplier))})</span>
        </div>
      </div>
    );
  };

  const activeHoldings = portfolio.filter(h => h.status === "active" || h.status === "exit_pending");
  const exitedHoldings = portfolio.filter(h => h.status === "exited");
  const failedHoldings = portfolio.filter(h => h.status === "failed");

  const renderHoldingRow = (holding, index) => {
    const currentValue = Math.round(holding.investedAmount * holding.currentValueMultiplier);
    const isPositive = holding.currentValueMultiplier >= 1.0;
    const percentChange = Math.round((holding.currentValueMultiplier - 1) * 100);

    return (
      <div 
        className="portfolio-row" 
        key={`${holding.pitchId}_${holding.investedAmount}_${index}`}
        style={{ cursor: "pointer" }}
        onClick={() => handleOpenDetails(holding)}
      >
        <div>
          <div className="portfolio-cell-header">Company</div>
          <strong style={{ color: "var(--text-primary)" }}>{holding.businessName}</strong>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{holding.archetype}</div>
        </div>

        <div>
          <div className="portfolio-cell-header">Capital Invested</div>
          <div>{formatMoney(holding.investedAmount)}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{holding.equityPercent}% Equity</div>
        </div>

        <div>
          <div className="portfolio-cell-header">Current Value</div>
          <strong className="portfolio-value" style={{ color: isPositive ? "var(--color-success)" : "var(--color-danger)" }}>
            {formatMoney(currentValue)}
          </strong>
          <div style={{ fontSize: "0.75rem", color: isPositive ? "var(--color-success)" : "var(--color-danger)", fontWeight: "500" }}>
            {percentChange >= 0 ? `+${percentChange}%` : `${percentChange}%`}
          </div>
        </div>

        <div>
          <div className="portfolio-cell-header">Status</div>
          <span className={`portfolio-status-badge ${holding.status}`}>
            {holding.status === "exit_pending" ? "Exit Queued" : holding.status}
          </span>
        </div>

        <div style={{ textAlign: "right" }} onClick={(e) => e.stopPropagation()}>
          {holding.status === "active" && (
            <button 
              className="card-action-btn"
              style={{ padding: "0.4rem 0.8rem", fontSize: "0.7rem", width: "auto", display: "inline-block" }}
              onClick={() => exitHolding(holding.pitchId, holding.investedAmount)}
            >
              Queue Exit
            </button>
          )}
          {holding.status === "exit_pending" && (
            <span style={{ fontSize: "0.75rem", color: "var(--color-warning)" }}>
              Pending Next Turn
            </span>
          )}
          {holding.status === "exited" && (
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Sold for {formatMoney(holding.exitValue || currentValue)}
            </span>
          )}
          {holding.status === "failed" && (
            <span style={{ fontSize: "0.75rem", color: "var(--color-danger)" }}>
              Written Off ($0)
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="portfolio-panel">
      <div className="panel-title-container">
        <h2 className="panel-title">
          <Briefcase size={20} className="text-accent" />
          Portfolio Holdings
        </h2>
      </div>

      {portfolio.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {activeHoldings.length > 0 && (
            <div>
              <h3 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--color-accent-light)", marginBottom: "1rem", fontWeight: "700" }}>
                Active Ventures ({activeHoldings.length})
              </h3>
              <div className="portfolio-grid">
                {activeHoldings.map((holding, idx) => renderHoldingRow(holding, idx))}
              </div>
            </div>
          )}

          {exitedHoldings.length > 0 && (
            <div>
              <h3 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--text-secondary)", marginBottom: "1rem", fontWeight: "700" }}>
                Exited Positions ({exitedHoldings.length})
              </h3>
              <div className="portfolio-grid" style={{ opacity: 0.9 }}>
                {exitedHoldings.map((holding, idx) => renderHoldingRow(holding, idx))}
              </div>
            </div>
          )}

          {failedHoldings.length > 0 && (
            <div>
              <h3 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--color-danger)", marginBottom: "1rem", fontWeight: "700" }}>
                Write-offs & Failures ({failedHoldings.length})
              </h3>
              <div className="portfolio-grid" style={{ opacity: 0.8 }}>
                {failedHoldings.map((holding, idx) => renderHoldingRow(holding, idx))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="news-card" style={{ justifyContent: "center", padding: "4rem", color: "var(--text-secondary)" }}>
          <div style={{ textAlign: "center" }}>
            <Briefcase size={36} style={{ marginBottom: "1rem", opacity: 0.5, display: "inline-block" }} />
            <p>Your portfolio is currently empty.</p>
            <p style={{ fontSize: "0.8rem", marginTop: "0.25rem", opacity: 0.7 }}>Sift through pitches and deploy capital to start building your portfolio.</p>
          </div>
        </div>
      )}

      {/* Details / History Modal */}
      {selectedHolding && (
        <div className="modal-overlay" onClick={handleCloseDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="card-archetype">{selectedHolding.archetype}</span>
                <h2 className="card-title" style={{ fontSize: "1.6rem", marginTop: "0.25rem" }}>
                  {selectedHolding.businessName}
                </h2>
              </div>
              <button className="modal-close" onClick={handleCloseDetails}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              {/* Valuation Performance Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div>
                  <div className="card-stat-label">Initial Investment</div>
                  <strong style={{ fontSize: "1.1rem" }}>{formatMoney(selectedHolding.investedAmount)}</strong>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>for {selectedHolding.equityPercent}% equity</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="card-stat-label">Current Value</div>
                  <strong style={{ fontSize: "1.4rem", color: selectedHolding.currentValueMultiplier >= 1.0 ? "var(--color-success)" : "var(--color-danger)" }}>
                    {formatMoney(Math.round(selectedHolding.investedAmount * selectedHolding.currentValueMultiplier))}
                  </strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                    Turns Held: <strong style={{ color: "var(--text-primary)" }}>{selectedHolding.turnsHeld}</strong>
                  </div>
                </div>
              </div>

              {/* Chart */}
              {selectedHolding.history && selectedHolding.history.length > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-accent-light)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <BarChart3 size={14} /> Valuation Trend Line
                  </h4>
                  {renderHistoryChart(selectedHolding.history)}
                </div>
              )}

              {/* Ground Truth Traits */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-accent-light)", marginBottom: "0.5rem" }}>
                  Internal Company Dynamics (Ground Truth)
                </h4>
                <div className="diligence-log-box">
                  {selectedHolding.traits.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {selectedHolding.traits.map(t => {
                        const traitDef = TRAITS[t];
                        if (!traitDef) return null;
                        return (
                          <div key={t} className="log-alert neutral">
                            <ShieldAlert size={16} style={{ flexShrink: 0 }} />
                            <div>
                              <strong style={{ textTransform: "uppercase", fontSize: "0.75rem" }}>
                                {traitDef.label}
                              </strong>
                              <p style={{ fontSize: "0.8rem", marginTop: "0.15rem", color: "white" }}>
                                {traitDef.deepDiveReveal}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p style={{ fontSize: "0.85rem", color: "var(--color-success)", margin: "0.5rem 0" }}>
                      ✓ Exemplary organization. No hidden operational risks, legal flaws, or negative founder traits.
                    </p>
                  )}
                </div>
              </div>

              {/* History Log */}
              {selectedHolding.history && selectedHolding.history.length > 0 && (
                <div>
                  <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-accent-light)", marginBottom: "0.5rem" }}>
                    Performance History Logs
                  </h4>
                  <div style={{ maxHeight: "150px", overflowY: "auto", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem", textAlign: "left" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
                          <th style={{ padding: "0.5rem 1rem" }}>Turn</th>
                          <th style={{ padding: "0.5rem 1rem" }}>Outcome</th>
                          <th style={{ padding: "0.5rem 1rem" }}>Change</th>
                          <th style={{ padding: "0.5rem 1rem" }}>Valuation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedHolding.history.map((h, i) => (
                          <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                            <td style={{ padding: "0.5rem 1rem", color: "var(--text-secondary)" }}>Turn {h.turn}</td>
                            <td style={{ padding: "0.5rem 1rem", textTransform: "capitalize" }}>
                              <span style={{ 
                                color: h.outcomeType === "growth" ? "var(--color-success)" : 
                                       h.outcomeType === "decline" ? "var(--color-danger)" : 
                                       "var(--color-warning)" 
                              }}>
                                {h.outcomeType}
                              </span>
                            </td>
                            <td style={{ padding: "0.5rem 1rem" }}>
                              {h.changePercent >= 0 ? `+${h.changePercent}%` : `${h.changePercent}%`}
                            </td>
                            <td style={{ padding: "0.5rem 1rem", fontWeight: "600" }}>
                              {formatMoney(h.value)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer" style={{ justifyContent: "flex-end" }}>
              <button className="decision-btn pass" style={{ maxWidth: "150px" }} onClick={handleCloseDetails}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
