import React, { useState, useEffect } from "react";
import { useGameStore } from "../state/useGameStore";
import { formatMoney } from "./Header";
import { Search, TrendingUp, X, FileText } from "lucide-react";

function TypewriterText({ text, typingSpeed = 15, forceComplete }) {
  const [displayedText, setDisplayedText] = useState(forceComplete ? text : "");
  
  useEffect(() => {
    if (forceComplete) {
      setDisplayedText(text);
      return;
    }
    
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(intervalId);
    }, typingSpeed);
    
    return () => clearInterval(intervalId);
  }, [text, typingSpeed, forceComplete]);

  return <span>{displayedText}</span>;
}

export default function PitchPanel() {
  const currentPitches = useGameStore(state => state.currentPitches);
  const cash = useGameStore(state => state.cash);
  const diligenceLog = useGameStore(state => state.diligenceLog);
  const backgroundChecksRemaining = useGameStore(state => state.backgroundChecksRemaining);

  const conductBackgroundCheck = useGameStore(state => state.conductBackgroundCheck);
  const runCOICheck = useGameStore(state => state.runCOICheck);
  const investInPitch = useGameStore(state => state.investInPitch);
  const dismissPitch = useGameStore(state => state.dismissPitch);

  const [selectedPitch, setSelectedPitch] = useState(null);
  const [pitchProgress, setPitchProgress] = useState(0);
  const [readPitches, setReadPitches] = useState(new Set());

  const handleOpenPitch = (pitch) => {
    setSelectedPitch(pitch);
    if (readPitches.has(pitch.instanceId)) {
      setPitchProgress(3);
    } else {
      setPitchProgress(0);
    }
  };
  const handleClosePitch = () => setSelectedPitch(null);

  const activeLog = selectedPitch
    ? diligenceLog[selectedPitch.instanceId] || { backgroundChecked: false, backgroundClue: null, coiChecked: false, coiWarning: null, hasConflict: false }
    : null;

  // Background check cost for the selected pitch
  const bgCheckCost = selectedPitch
    ? Math.max(10000, Math.round((selectedPitch.ask * 0.08) / 5000) * 5000)
    : 0;

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
                <h3 className="card-title">{pitch.businessName}</h3>
              </div>
              <p className="card-summary" style={{ fontStyle: "italic", opacity: 0.85 }}>
                {pitch.assembledParagraphs?.[0] ?? ""}
              </p>
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
              <button className="card-action-btn" onClick={() => handleOpenPitch(pitch)}>
                <span>Read Pitch</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="news-card" style={{ justifyContent: "center", padding: "4rem", color: "var(--text-secondary)" }}>
          <div style={{ textAlign: "center" }}>
            <TrendingUp size={36} style={{ marginBottom: "1rem", opacity: 0.5, display: "inline-block" }} />
            <p>No new deals on the table.</p>
            <p style={{ fontSize: "0.8rem", marginTop: "0.25rem", opacity: 0.7 }}>
              All active pitches have been evaluated or funded. Advance the turn to source more deals.
            </p>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedPitch && activeLog && (
        <div className="modal-overlay" onClick={handleClosePitch}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px" }}>
            <div className="modal-header">
              <div>
                <h2 className="card-title" style={{ fontSize: "1.6rem", marginTop: "0.25rem" }}>
                  {selectedPitch.businessName}
                </h2>
              </div>
              <button className="modal-close" onClick={handleClosePitch}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              {/* Assembled pitch — joined up to pitchProgress */}
              <div style={{
                borderLeft: "3px solid var(--color-accent-light)",
                paddingLeft: "1.25rem",
                marginBottom: "1.75rem"
              }}>
                {(selectedPitch.assembledParagraphs || []).slice(0, pitchProgress + 1).map((paragraph, idx) => (
                  <p key={idx} style={{
                    fontSize: "1rem",
                    lineHeight: "1.8",
                    color: "#ffffff",
                    margin: idx === 0 ? 0 : "1rem 0 0 0",
                    textShadow: "0 1px 2px rgba(0,0,0,0.15)",
                    animation: "fadeIn 0.5s ease-out"
                  }}>
                    <TypewriterText text={paragraph} forceComplete={idx < pitchProgress || pitchProgress >= 3} />
                  </p>
                ))}
              </div>

              {pitchProgress < 3 && (
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                  <button 
                    className="card-action-btn" 
                    onClick={() => {
                      const next = pitchProgress + 1;
                      setPitchProgress(next);
                      if (next === 3) setReadPitches(prev => new Set(prev).add(selectedPitch.instanceId));
                    }}
                    style={{ display: "inline-block", padding: "0.5rem 1.5rem", width: "auto" }}
                  >
                    <span>{pitchProgress === 2 ? "Review Terms" : "Continue Listening..."}</span>
                  </button>
                </div>
              )}

              {/* Reveal UI when pitch is finished */}
              {pitchProgress >= 3 && (
                <div style={{ animation: "slideDown 0.4s ease-out" }}>
                  {/* Deal terms */}
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

              {/* Background Check */}
              <div className="diligence-section">
                <div className="diligence-section-title">
                  <Search size={14} />
                  Background Check
                </div>

                {!activeLog.backgroundChecked ? (
                  <button
                    className="diligence-btn"
                    disabled={cash < bgCheckCost || backgroundChecksRemaining < 1}
                    onClick={() => conductBackgroundCheck(selectedPitch.instanceId)}
                    style={{ marginTop: "0.5rem" }}
                  >
                    <span className="diligence-btn-title">
                      <span>Run Background Check ({backgroundChecksRemaining} left)</span>
                      <span className="diligence-btn-cost">{formatMoney(bgCheckCost)}</span>
                    </span>
                    <span className="diligence-btn-desc">
                      {backgroundChecksRemaining < 1 
                        ? "Out of bandwidth. Only 1 check per turn."
                        : cash < bgCheckCost
                        ? "Insufficient cash to run a check."
                        : "Surfaces one factual note from public records. One-time only."}
                    </span>
                  </button>
                ) : (
                  <div className="diligence-log-box" style={{ marginTop: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                      <FileText size={16} style={{ flexShrink: 0, marginTop: "0.15rem", color: "var(--color-accent-light)" }} />
                      <p style={{ fontSize: "0.9rem", lineHeight: "1.6", color: "var(--text-secondary)", margin: 0 }}>
                        {activeLog.backgroundClue}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Conflict of Interest Check */}
              <div className="diligence-section" style={{ marginTop: "1rem" }}>
                <div className="diligence-section-title">
                  <Search size={14} />
                  Conflict of Interest Check
                </div>

                {!activeLog.coiChecked ? (
                  <button
                    className="diligence-btn"
                    disabled={cash < 1000}
                    onClick={() => runCOICheck(selectedPitch.instanceId)}
                    style={{ marginTop: "0.5rem" }}
                  >
                    <span className="diligence-btn-title">
                      <span>Run Internal COI Check</span>
                      <span className="diligence-btn-cost">{formatMoney(1000)}</span>
                    </span>
                    <span className="diligence-btn-desc">
                      Checks your active portfolio for direct competitors to avoid breach of non-compete clauses.
                    </span>
                  </button>
                ) : (
                  <div className="diligence-log-box" style={{ marginTop: "0.5rem", borderColor: activeLog.hasConflict ? "var(--color-danger)" : "var(--color-success)" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                      <FileText size={16} style={{ flexShrink: 0, marginTop: "0.15rem", color: activeLog.hasConflict ? "var(--color-danger)" : "var(--color-success)" }} />
                      <p style={{ fontSize: "0.9rem", lineHeight: "1.6", color: activeLog.hasConflict ? "var(--color-danger)" : "var(--color-success)", margin: 0, fontWeight: "bold" }}>
                        {activeLog.coiWarning}
                      </p>
                    </div>
                  </div>
                )}
              </div>
                </div>
              )}
            </div>

            {pitchProgress >= 3 && (
              <div className="modal-footer" style={{ animation: "slideDown 0.4s ease-out" }}>
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}
