import React from "react";
import { useGameStore } from "../state/useGameStore";
import { Newspaper, Activity, Pin, PinOff } from "lucide-react";
import { NEWS_BANK } from "../data/news.js";

export default function NewsPanel() {
  const currentNews = useGameStore(state => state.currentNews);
  const activeNewsEffects = useGameStore(state => state.activeNewsEffects || []);
  const pinnedNewsIds = useGameStore(state => state.pinnedNewsIds || []);
  const togglePinNews = useGameStore(state => state.togglePinNews);

  const pinnedNews = pinnedNewsIds
    .map(id => {
      const staticNews = NEWS_BANK.find(n => n.id === id);
      if (!staticNews) return null;
      const activeEffect = activeNewsEffects.find(a => a.id === id);
      return {
        ...staticNews,
        turnsRemaining: activeEffect ? activeEffect.turnsRemaining : 0,
        isActive: !!activeEffect
      };
    })
    .filter(Boolean);

  const renderNewsCard = (news, isPinnedSection = false) => {
    const isPinned = pinnedNewsIds.includes(news.id);
    const activeEffect = activeNewsEffects.find(a => a.id === news.id);
    const turnsRemaining = activeEffect ? activeEffect.turnsRemaining : 0;
    const hasDuration = news.duration > 0;
    const isActive = activeEffect || (isPinnedSection && news.isActive);

    return (
      <div className={`news-card ${isPinned ? "pinned" : ""}`} key={`${news.id}_${isPinnedSection ? "pinned" : "current"}`}>
        <div className="news-image-placeholder">
          <Activity size={24} />
        </div>
        <div className="news-body">
          <div>
            <div className="news-meta" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span className="news-category">{news.category}</span>
                <span className="news-time">{news.timeString}</span>
              </div>
              
              {hasDuration && (
                <span className={`news-duration-badge ${isActive ? "active" : "expired"}`} style={{
                  fontSize: "0.7rem",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "4px",
                  background: isActive ? "rgba(56, 189, 248, 0.15)" : "rgba(239, 68, 68, 0.1)",
                  color: isActive ? "var(--color-accent-light)" : "var(--color-danger)",
                  border: isActive ? "1px solid var(--color-accent-light)" : "1px solid rgba(239, 68, 68, 0.3)",
                  fontWeight: "600",
                  textTransform: "uppercase"
                }}>
                  {isActive ? `${turnsRemaining} Quarters Left` : "Expired"}
                </span>
              )}
            </div>
            <h3 className="news-headline">{news.headline}</h3>
            <p className="news-detail">{news.detail}</p>
          </div>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            togglePinNews(news.id);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: isPinned ? "var(--color-accent-light)" : "var(--text-muted)",
            padding: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-start",
            transition: "color 0.2s"
          }}
          title={isPinned ? "Unpin Headline" : "Pin Headline"}
        >
          {isPinned ? <PinOff size={18} /> : <Pin size={18} />}
        </button>
      </div>
    );
  };

  return (
    <div className="news-panel">
      {pinnedNews.length > 0 && (
        <div style={{ marginBottom: "2.5rem" }}>
          <div className="panel-title-container" style={{ borderBottom: "1px solid rgba(56, 189, 248, 0.2)", paddingBottom: "0.5rem" }}>
            <h2 className="panel-title" style={{ fontSize: "1.1rem", color: "var(--color-accent-light)" }}>
              <Pin size={16} />
              Pinned Watchlist
            </h2>
          </div>
          <div className="news-list" style={{ gap: "1rem", marginTop: "1rem" }}>
            {pinnedNews.map(news => renderNewsCard(news, true))}
          </div>
        </div>
      )}

      <div className="panel-title-container">
        <h2 className="panel-title">
          <Newspaper size={20} className="text-accent" />
          Breaking News
        </h2>
      </div>

      <div className="news-list">
        {currentNews.length > 0 ? (
          currentNews.map(news => renderNewsCard(news, false))
        ) : (
          <div className="news-card" style={{ justifyContent: "center", padding: "3rem", color: "var(--text-secondary)" }}>
            <div style={{ textAlign: "center" }}>
              <Newspaper size={36} style={{ marginBottom: "1rem", opacity: 0.5, display: "inline-block" }} />
              <p>No breaking headlines this turn.</p>
              <p style={{ fontSize: "0.8rem", marginTop: "0.25rem", opacity: 0.7 }}>Sector activity remains stable. Check back next turn.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
