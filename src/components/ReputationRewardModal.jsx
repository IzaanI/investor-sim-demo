import React, { useEffect } from "react";
import { Star, TrendingUp } from "lucide-react";
import { useGameStore } from "../state/useGameStore";
import { formatMoney } from "./Header";
import sounds from "../utils/sounds";

export default function ReputationRewardModal() {
  const pendingReputationReward = useGameStore(state => state.pendingReputationReward);
  const clearPendingReputationReward = useGameStore(state => state.clearPendingReputationReward);
  const reputation = useGameStore(state => state.reputation ?? 0);

  useEffect(() => {
    if (pendingReputationReward) {
      sounds.eventModal?.();
    }
  }, [pendingReputationReward]);

  if (!pendingReputationReward) return null;

  const { type, amount, threshold } = pendingReputationReward;
  const isCash = type === "cash";

  return (
    <div className="modal-overlay" style={{ zIndex: 1200 }}>
      <div
        className="modal-content"
        style={{ border: "1px solid rgba(251, 191, 36, 0.4)", maxWidth: "440px", textAlign: "center" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header" style={{ paddingBottom: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
            <Star size={24} style={{ color: "var(--color-warning)" }} />
            <h2 className="card-title" style={{ fontSize: "1.3rem", color: "var(--color-warning)", marginTop: 0 }}>
              Reputation Milestone
            </h2>
          </div>
        </div>

        <div className="modal-body" style={{ padding: "1.5rem 2rem" }}>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
            You crossed <strong style={{ color: "var(--color-warning)" }}>{threshold} reputation points</strong>. Your track record is attracting attention.
          </p>

          <div style={{
            background: "rgba(251,191,36,0.08)",
            border: "1px solid rgba(251,191,36,0.2)",
            borderRadius: "10px",
            padding: "1.25rem",
            marginBottom: "1.5rem"
          }}>
            {isCash ? (
              <div>
                <TrendingUp size={28} style={{ color: "var(--color-success)", marginBottom: "0.5rem" }} />
                <div style={{ fontSize: "1.6rem", fontWeight: "700", color: "var(--color-success)" }}>
                  +{formatMoney(amount)}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                  Corporate acknowledges your outstanding performance and has wired your team extra funds.
                </div>
              </div>
            ) : (
              <div>
                <Star size={28} style={{ color: "var(--color-accent-light)", marginBottom: "0.5rem" }} />
                <div style={{ fontSize: "1.6rem", fontWeight: "700", color: "var(--color-accent-light)" }}>
                  -{amount}% Background Check Cost
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                  To help facilitate your great work, an office upgrade has resulted in a permanent background check cost reduction.
                </div>
              </div>
            )}
          </div>

          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
            Current Reputation: <strong style={{ color: "var(--color-accent-light)" }}>{reputation} / 100</strong>
          </div>

          <button
            className="decision-btn invest"
            style={{ width: "100%", padding: "0.85rem", fontSize: "0.9rem" }}
            onClick={clearPendingReputationReward}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}