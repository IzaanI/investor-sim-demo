import React, { useState } from "react";
import { useGameStore } from "../state/useGameStore";
import { TRAITS } from "../data/traits";
import { formatMoney } from "./Header";
import { Search, Eye, TrendingUp, AlertTriangle, Check, X, ShieldAlert } from "lucide-react";

export default function PitchPanel() {
  const currentPitches = useGameStore(state => state.currentPitches);
  const cash = useGameStore(state => state.cash);
  const points = useGameStore(state => state.points);
  const diligenceLog = useGameStore(state => state.diligenceLog);
  
  const conductBackgroundCheck = useGameStore(state => state.conductBackgroundCheck);
  const conductDeepDive = useGameStore(state => state.conductDeepDive);
  const investInPitch = useGameStore(state => state.investInPitch);
  const dismissPitch = useGameStore(state => state.dismissPitch);

  const [selectedPitch, setSelectedPitch] = useState(null);

  const handleOpenPitch = (pitch) => {
    setSelectedPitch(pitch);
  };

  const handleClosePitch = () => {
    setSelectedPitch(null);
  };

  const activeLog = selectedPitch ? diligenceLog[selectedPitch.instanceId] || {
    backgroundChecked: false,
    deepDivedCount: 0,
    revealedTraits: [],
    lastDeepDiveResult: null
  } : null;

  return (
    <div className="pitch-panel">
      <div className="panel-title-container">
        <h2 className="panel-title">
          <TrendingUp size={20} className="text-accent" />
          Active Pitches
        </h2>
      </div>

      {currentPitches.length > 0 ? (
        <div className="card-grid">
          {currentPitches.map((pitch) => (
            <div className="game-card" key={pitch.instanceId}>
              <div className="card-header">
                <span className="card-archetype">{pitch.archetype}</span>
                <h3 className="card-title">{pitch.businessName}</h3>
              </div>
              <p className="card-summary">{pitch.pitchSummary}</p>
              <div className="card-stats">
                <div className="card-stat-box">
                  <span className="card-stat-label">Funding Ask</span>
                  <span className="card-stat-value" style={{ color: "var(--color-accent-light)" }}>
                    {formatMoney(pitch.ask)}
                  </span>
                </div>
                <div className="card-stat-box">
                  <span className="card-stat-label">Valuation</span>
                  <span className="card-stat-value">{formatMoney(pitch.valuation)}</span>
                </div>
              </div>
              <button 
                className="card-action-btn"
                onClick={() => handleOpenPitch(pitch)}
              >
                <span>Review Deal</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="news-card" style={{ justifyContent: "center", padding: "4rem", color: "var(--text-secondary)" }}>
          <div style={{ textAlign: "center" }}>
            <TrendingUp size={36} style={{ marginBottom: "1rem", opacity: 0.5, display: "inline-block" }} />
            <p>No new deals on the table.</p>
            <p style={{ fontSize: "0.8rem", marginTop: "0.25rem", opacity: 0.7 }}>All active pitches have been evaluated or funded. Advance the turn to source more deals.</p>
          </div>
        </div>
      )}

      {/* Modal Detail Pop-up */}
      {selectedPitch && activeLog && (
        <div className="modal-overlay" onClick={handleClosePitch}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="card-archetype">{selectedPitch.archetype}</span>
                <h2 className="card-title" style={{ fontSize: "1.6rem", marginTop: "0.25rem" }}>
                  {selectedPitch.businessName}
                </h2>
              </div>
              <button className="modal-close" onClick={handleClosePitch}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                {selectedPitch.pitchSummary}
              </p>

              <div className="card-stats" style={{ marginBottom: "1.5rem" }}>
                <div className="card-stat-box">
                  <span className="card-stat-label">Investment Ask</span>
                  <span className="card-stat-value" style={{ fontSize: "1.25rem", color: "var(--color-accent-light)" }}>
                    {formatMoney(selectedPitch.ask)}
                  </span>
                </div>
                <div className="card-stat-box">
                  <span className="card-stat-label">Equity Offered</span>
                  <span className="card-stat-value" style={{ fontSize: "1.25rem" }}>
                    {((selectedPitch.ask / selectedPitch.valuation) * 100).toFixed(1)}%
                  </span>
                  <span className="card-stat-label" style={{ fontSize: "0.6rem", marginTop: "0.1rem" }}>
                    Valued at {formatMoney(selectedPitch.valuation)}
                  </span>
                </div>
              </div>

              {/* Diligence Dashboard */}
              <div className="diligence-section">
                <div className="diligence-section-title">
                  <Search size={14} />
                  Due Diligence Actions
                </div>
                
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem", fontWeight: "500" }}>
                  Diligence Points Available: <strong style={{ color: "var(--color-accent-light)" }}>{points.available} / {points.max}</strong>
                </div>

                <div className="diligence-actions">
                  <button 
                    className="diligence-btn"
                    disabled={points.available < 1 || activeLog.backgroundChecked}
                    onClick={() => conductBackgroundCheck(selectedPitch.instanceId)}
                  >
                    <span className="diligence-btn-title">
                      <span>Background Check</span>
                      <span className="diligence-btn-cost">1 Point</span>
                    </span>
                    <span className="diligence-btn-desc">
                      {activeLog.backgroundChecked ? "Completed" : "Reveals basic public alerts and track record."}
                    </span>
                  </button>

                  <button 
                    className="diligence-btn"
                    disabled={points.available < 2 || activeLog.deepDivedCount > 0}
                    onClick={() => conductDeepDive(selectedPitch.instanceId)}
                  >
                    <span className="diligence-btn-title">
                      <span>Deep Dive</span>
                      <span className="diligence-btn-cost">2 Points</span>
                    </span>
                    <span className="diligence-btn-desc">
                      {activeLog.deepDivedCount > 0 ? "Completed" : "Investigates metrics and operations to uncover hidden anomalies."}
                    </span>
                  </button>
                </div>

                {/* Diligence Results Log */}
                {(activeLog.backgroundChecked || activeLog.deepDivedCount > 0) && (
                  <div className="diligence-log-box">
                    <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-secondary)" }}>
                      Investigation Findings
                    </h4>
                    
                    {/* Background Check Log */}
                    {activeLog.backgroundChecked && (
                      <div className="log-item">
                        <div className="log-label">Background Check Logs:</div>
                        {selectedPitch.traits.some(t => TRAITS[t]?.discoverable.backgroundCheck) ? (
                          selectedPitch.traits.map(t => {
                            const traitDef = TRAITS[t];
                            if (traitDef && traitDef.discoverable.backgroundCheck) {
                              return (
                                <p key={t} className="log-value" style={{ marginTop: "0.25rem" }}>
                                  • {traitDef.backgroundCheckHint}
                                </p>
                              );
                            }
                            return null;
                          })
                        ) : (
                          <p className="log-value" style={{ color: "var(--color-success)" }}>
                            ✓ Clean record. No civil lawsuits, bankruptcy records, or outstanding red flags found.
                          </p>
                        )}
                      </div>
                    )}

                    {/* Deep Dive Log */}
                    {activeLog.deepDivedCount > 0 && (
                      <div className="log-item">
                        <div className="log-label">Deep Dive Log:</div>
                        
                        {/* Miss results are silently mapped to no_more (clean) to preserve mystery */}

                        {activeLog.lastDeepDiveResult === "no_more" && (
                          <div className="log-alert neutral" style={{ marginBottom: "0.5rem" }}>
                            <Check size={16} style={{ flexShrink: 0 }} />
                            <span>Deep dive complete: Audit team spent 2 turns investigating and found no further hidden anomalies.</span>
                          </div>
                        )}

                        {activeLog.revealedTraits.length > 0 ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {activeLog.revealedTraits.map(t => {
                              const traitDef = TRAITS[t];
                              if (!traitDef) return null;
                              return (
                                <div key={t} className="log-alert neutral">
                                  <ShieldAlert size={16} style={{ flexShrink: 0 }} />
                                  <div>
                                    <p style={{ fontSize: "0.85rem", color: "white", margin: 0, lineHeight: "1.4" }}>
                                      {traitDef.deepDiveReveal}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          activeLog.lastDeepDiveResult !== "miss" && (
                            <p className="log-value" style={{ color: "var(--text-secondary)" }}>
                              No anomalies uncovered in this deep dive search.
                            </p>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="decision-btn pass"
                onClick={() => {
                  dismissPitch(selectedPitch.instanceId);
                  handleClosePitch();
                }}
              >
                Pass Deal
              </button>
              <button 
                className="decision-btn invest"
                disabled={cash < selectedPitch.ask}
                onClick={() => {
                  investInPitch(selectedPitch.instanceId);
                  handleClosePitch();
                }}
              >
                {cash < selectedPitch.ask ? "Insufficient Cash" : `Invest ${formatMoney(selectedPitch.ask)}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
