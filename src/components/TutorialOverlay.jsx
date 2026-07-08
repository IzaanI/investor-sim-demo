import React, { useState, useEffect } from "react";
import { useGameStore } from "../state/useGameStore";
import { formatMoney } from "./Header";
import { HelpCircle, ChevronRight, X } from "lucide-react";
import sounds from "../utils/sounds";

export default function TutorialOverlay({ activeTab }) {
  const tutorialActive = useGameStore(state => state.tutorialActive);
  const tutorialStep = useGameStore(state => state.tutorialStep);
  const skipTutorial = useGameStore(state => state.skipTutorial);
  const setTutorialStep = useGameStore(state => state.setTutorialStep);
  const currentPitches = useGameStore(state => state.currentPitches);

  const [coords, setCoords] = useState(null);

  // Dialog dialogues
  const steps = {
    1: {
      title: "Onboarding Tutorial",
      text: "Welcome to the firm, Director. I'm Dreamy, your Executive Robot Assistant. Thanks again for offering the firm your investment expertise. Let me get you up to speed.",
      targetId: null,
      btnLabel: "Begin Onboarding"
    },
    1.5: {
      title: "Onboarding Tutorial",
      text: "Before starting each day, glance over the breaking news to gain market intelligence. Some headlines can inform key market indicators, so pin any that seem helpful to remember.",
      targetId: "news-panel",
      btnLabel: "Review Deal Flow"
    },
    2: {
      title: "Onboarding Tutorial",
      text: "We have our first founder waiting to pitch their business to you. Head over to the Pitches tab.",
      targetId: "sidebar-tab-pitches",
      btnLabel: null // user must click the tab to advance
    },
    3: {
      title: "Onboarding Tutorial",
      text: "This is a live pitch. Note the ask amount and business valuation, and press 'Read Pitch' when you are ready.",
      targetId: "first-pitch-card",
      btnLabel: null // user must click the first pitch card
    },
    4: {
      title: "Onboarding Tutorial",
      text: "Pay close attention to the presentation of the pitch. Each founder has a unique personality, and you should factor that into your judgement when deciding if they are worth our money.",
      targetId: "pitch-tutorial-review-wrapper",
      btnLabel: null // advanced automatically when typewriter finish sets progress to 3
    },
    5: {
      title: "Onboarding Tutorial",
      text: "Background checks can offer key insights at a small cost. We are limited to one background check per turn. Run one now!",
      targetId: "diligence-btn-bgcheck",
      btnLabel: null // advanced on background check click
    },
    5.5: {
      title: "Onboarding Tutorial",
      text: "Here are the results of the background check. Review the findings carefully to see what information was found.",
      targetId: "diligence-bgcheck-results",
      btnLabel: "Proceed to Decision"
    },
    6: {
      title: "Onboarding Tutorial",
      text: "Now that you've done your diligence, let's invest in our first company!",
      targetId: "pitch-invest-btn",
      btnLabel: null // advanced on investment click
    },
    7: {
      title: "Onboarding Tutorial",
      text: "Congratulations! The company is now in your Portfolio. You can track performance and manage company events here.",
      targetId: "sidebar-tab-portfolio",
      btnLabel: null // user must click the portfolio tab
    },
    8: {
      title: "Onboarding Tutorial",
      text: "When you're done with the current day, click 'End Turn'. Be mindful that our facility takes $10,000 each turn to cover operating costs, so don't bleed out. Good luck, director.",
      targetId: "end-turn-btn",
      btnLabel: "Finish Tutorial"
    }
  };

  const currentStepData = steps[tutorialStep];

  // Track target coords
  useEffect(() => {
    if (!tutorialActive || !currentStepData || !currentStepData.targetId) {
      setCoords(null);
      return;
    }

    const updateCoords = () => {
      let targetId = currentStepData.targetId;
      if (window.innerWidth <= 768 && targetId && targetId.startsWith("sidebar-tab")) {
        const mobileTabId = targetId.replace("sidebar-tab-", "mobile-tab-");
        const mobileEl = document.getElementById(mobileTabId);
        if (mobileEl) {
          targetId = mobileTabId;
        } else {
          targetId = "hamburger-menu-btn";
        }
      }
      const el = document.getElementById(targetId);
      if (el) {
        const rect = el.getBoundingClientRect();
        // Add a slight padding to the spotlight box for visual breathing room
        const padding = 8;
        setCoords({
          top: rect.top - padding + window.scrollY,
          left: rect.left - padding + window.scrollX,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2
        });
      } else {
        setCoords(null);
      }
    };

    updateCoords();
    // Check multiple times as animations finish or content loads
    const timer1 = setTimeout(updateCoords, 100);
    const timer2 = setTimeout(updateCoords, 500);

    const handleClick = () => {
      // Small timeout to let React render state updates (e.g. menu open/close)
      setTimeout(updateCoords, 50);
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("resize", updateCoords);
    window.addEventListener("scroll", updateCoords, true); // Use capture phase so scrolling scrollable panels triggers update

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords, true);
    };
  }, [tutorialStep, currentStepData, activeTab, currentPitches, tutorialActive]);

  if (!tutorialActive || !currentStepData) return null;

  // Calculate polygon clip path for the spotlight cutout
  const getClipPath = () => {
    if (!coords) return "none";
    const { top, left, width, height } = coords;
    return `polygon(
      0% 0%, 
      0% 100%, 
      ${left}px 100%, 
      ${left}px ${top}px, 
      ${left + width}px ${top}px, 
      ${left + width}px ${top + height}px, 
      ${left}px ${top + height}px, 
      ${left}px 100%, 
      100% 100%, 
      100% 0%
    )`;
  };

  const handleNextBtn = () => {
    sounds.tutorialAdvance();
    if (tutorialStep === 1) {
      setTutorialStep(1.5);
    } else if (tutorialStep === 1.5) {
      setTutorialStep(2);
    } else if (tutorialStep === 5.5) {
      setTutorialStep(6);
    } else if (tutorialStep === 8) {
      skipTutorial();
    }
  };

  // Determine tooltip style placement
  const getTooltipStyle = () => {
    if (!coords) {
      // Center of the screen for step 1
      return {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        maxWidth: "480px",
        zIndex: 10000
      };
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    if (viewportWidth <= 768) {
      const isBottomHalf = coords && (coords.top + coords.height / 2) > viewportHeight / 2;
      return {
        position: "fixed",
        top: isBottomHalf ? "16px" : "auto",
        bottom: isBottomHalf ? "auto" : "16px",
        left: "5%",
        width: "90%",
        zIndex: 10000
      };
    }

    const { top, left, width, height } = coords;

    // Default to putting it below the spotlight
    let placementStyle = {
      position: "absolute",
      top: `${top + height + 16}px`,
      left: `${Math.max(16, Math.min(viewportWidth - 360, left + (width / 2) - 170))}px`,
      width: "340px",
      zIndex: 10000
    };

    // If it's too close to the bottom of the viewport, put it above
    if (top + height + 250 > viewportHeight + window.scrollY) {
      placementStyle.top = `${top - 200}px`;
    }

    // Special override for sidebar tabs
    if (currentStepData.targetId && currentStepData.targetId.startsWith("sidebar-tab")) {
      placementStyle = {
        position: "absolute",
        top: `${top + (height / 2) - 90}px`,
        left: `${left + width + 16}px`,
        width: "320px",
        zIndex: 10000
      };
    }

    // Special override for modal-focused steps to place dialogue on the right
    // Aligns the top of the dialog exactly with the highlighted target's top
    if (currentStepData.targetId && (
      currentStepData.targetId === "pitch-tutorial-review-wrapper" ||
      currentStepData.targetId === "diligence-btn-bgcheck" ||
      currentStepData.targetId === "diligence-bgcheck-results" ||
      currentStepData.targetId === "pitch-invest-btn"
    )) {
      const modalEl = document.getElementById("pitch-modal-content");
      if (modalEl) {
        const modalRect = modalEl.getBoundingClientRect();
        placementStyle = {
          position: "absolute",
          top: `${top-55}px`, // vertically align top of dialogue with coords.top
          left: `${modalRect.right + window.scrollX + 20}px`,
          width: "320px",
          zIndex: 10000
        };
      }
    }

    // Special override for diligence steps to place tooltip on the right of the pitch box
    if (currentStepData.targetId && currentStepData.targetId.startsWith("diligence-")) {
      placementStyle = {
        position: "absolute",
        top: `${top - 20}px`,
        left: `${left + width + 16}px`,
        width: "320px",
        zIndex: 10000
      };
    }

    // Special override for the End Turn button to place the dialog above it
    if (currentStepData.targetId === "end-turn-btn") {
      placementStyle = {
        position: "absolute",
        top: `${top - 250}px`,
        left: `${left -130}px`,
        width: "340px",
        zIndex: 10000
      };
    }

    return placementStyle;
  };

  return (
    <>
      {/* Background Mask with Cutout */}
      <div 
        className="tutorial-mask"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(5, 8, 14, 0.72)",
          backdropFilter: "blur(2.5px)",
          zIndex: 9998,
          pointerEvents: coords ? "auto" : "all", // allow clicking spotlight area
          clipPath: getClipPath(),
          transition: "clip-path 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      />

      {/* Floating Dialog Box */}
      <div 
        className="tutorial-dialog glassmorphic"
        style={{
          ...getTooltipStyle(),
          backgroundColor: "rgba(10, 15, 30, 0.88)",
          border: "1px solid rgba(56, 189, 248, 0.3)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 0 12px rgba(56, 189, 248, 0.15)",
          borderRadius: "12px",
          padding: "1.25rem",
          transition: "all 0.3s ease-out"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-accent-light)", fontWeight: "bold", fontSize: "0.85rem" }}>
            <HelpCircle size={16} />
            <span>{currentStepData.title}</span>
          </div>
          <button 
            onClick={skipTutorial}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              padding: "0.2rem",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center"
            }}
            title="Skip Tutorial"
          >
            <X size={16} />
          </button>
        </div>

        <p style={{ color: "#ffffff", fontSize: "0.95rem", lineHeight: "1.6", margin: "0 0 1rem 0" }}>
          {currentStepData.text}
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Progress Indicator */}
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            Step {
              tutorialStep === 1 ? 1 :
              tutorialStep === 1.5 ? 2 :
              tutorialStep === 2 ? 3 :
              tutorialStep === 3 ? 4 :
              tutorialStep === 4 ? 5 :
              tutorialStep === 5 ? 6 :
              tutorialStep === 5.5 ? 7 :
              tutorialStep === 6 ? 8 :
              tutorialStep === 7 ? 9 : 10
            } of 10
          </span>

          {/* Action button if applicable */}
          {currentStepData.btnLabel ? (
            <button 
              className="card-action-btn"
              onClick={handleNextBtn}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.4rem 1rem",
                fontSize: "0.85rem",
                width: "auto",
                marginTop: 0
              }}
            >
              <span>{currentStepData.btnLabel}</span>
              <ChevronRight size={14} />
            </button>
          ) : (
            <span style={{ fontSize: "0.75rem", fontStyle: "italic", color: "var(--color-accent-light)" }}>
              {tutorialStep === 2 && "Click the Pitches Tab"}
              {tutorialStep === 3 && "Click the first Deal Card"}
              {tutorialStep === 4 && "Read the pitch terms"}
              {tutorialStep === 5 && "Run a Diligence check"}
              {tutorialStep === 6 && "Invest in the deal"}
              {tutorialStep === 7 && "Click the Portfolio Tab"}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
