import React, { useEffect } from "react";
import { AlertCircle, DollarSign, ShieldAlert } from "lucide-react";
import { useGameStore } from "../state/useGameStore";
import sounds from "../utils/sounds";

export default function EventModal({ event }) {
  const cash = useGameStore(state => state.cash);
  const resolveEventOption = useGameStore(state => state.resolveEventOption);

  const handleSelectOption = (effectType) => {
    // Map effectType to the right sound
    if (effectType === "accept_follow_on" || effectType === "accept_distress") {
      sounds.acceptFollowOn();
    } else if (effectType === "decline_follow_on" || effectType === "decline_distress") {
      sounds.declineFollowOn();
    } else if (effectType === "accept_buyout") {
      sounds.buyout();
    } else if (effectType === "decline_buyout") {
      sounds.declineFollowOn();
    } else {
      sounds.click();
    }
    resolveEventOption(event.id, effectType);
  };

  // Play notification sound when the modal first appears
  useEffect(() => {
    sounds.eventModal();
  }, []);

  let title = "Portfolio Event";
  let icon = <AlertCircle size={24} />;
  let headerColor = "var(--color-accent-light)";
  let borderStyle = "1px solid var(--border-color)";

  if (event.type === "founder_swap") {
    title = "Leadership Change";
    icon = <AlertCircle size={24} style={{ color: "var(--color-warning)" }} />;
    headerColor = "var(--color-warning)";
  } else if (event.type === "follow_on_request") {
    title = "Series A Funding Request";
    icon = <DollarSign size={24} style={{ color: "var(--color-accent-light)" }} />;
    headerColor = "var(--color-accent-light)";
  } else if (event.type === "buyout_offer") {
    title = "Acquisition Buyout Offer";
    icon = <ShieldAlert size={24} style={{ color: "var(--color-warning)" }} />;
    headerColor = "var(--color-warning)";
    borderStyle = "1px solid rgba(245, 158, 11, 0.3)";
  } else if (event.type === "distress_request") {
    title = "Emergency Capital Request";
    icon = <AlertCircle size={24} style={{ color: "var(--color-danger)" }} />;
    headerColor = "var(--color-danger)";
    borderStyle = "1px solid rgba(239, 68, 68, 0.3)";
  }

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-content" style={{ border: borderStyle, maxWidth: "500px" }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ paddingBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {icon}
            <h2 className="card-title" style={{ fontSize: "1.4rem", color: headerColor, marginTop: 0 }}>
              {title}
            </h2>
          </div>
        </div>

        <div className="modal-body" style={{ padding: "1.5rem 2rem" }}>
          <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "var(--text-primary)", marginBottom: "1.5rem" }}>
            {event.promptText}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {event.options.map((option, idx) => {
              const isSpendOption = option.effectType === "accept_follow_on" || option.effectType === "accept_distress" || option.effectType === "accept_lawsuit_settlement";
              const cannotAfford = isSpendOption && cash < event.eventAsk;

              return (
                <button
                  key={idx}
                  className={`decision-btn ${(option.effectType || option.effect || "").startsWith("accept") ? "invest" : "pass"}`}
                  disabled={cannotAfford}
                  onClick={() => handleSelectOption(option.effectType || option.effect)}
                  style={{ width: "100%", padding: "0.85rem", fontSize: "0.85rem" }}
                >
                  {cannotAfford ? `${option.label} (Insufficient Cash)` : option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
