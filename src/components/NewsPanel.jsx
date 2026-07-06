import React from "react";
import { useGameStore } from "../state/useGameStore";
import { Newspaper, Activity, Pin, PinOff, Zap, TrendingUp, TrendingDown } from "lucide-react";
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

  const getNewsImage = (news) => {
    const cat = (news.category || "").toUpperCase();
    if (cat === "POLICY" || cat === "REGULATORY") return "/news_policy.png";
    if (cat === "ECONOMY") return "/news_economy.png";
    if (cat === "LEGAL") return "/news_legal.png";
    if (cat === "MARKETS" || cat === "MARKET") return "/news_market.png";
    if (cat === "FINANCIAL") return "/news_financial.png";
    if (cat === "MANAGEMENT" || cat === "INTERNAL" || cat === "WORKPLACE") return "/news_management.png";
    if (cat === "MARKETING" || cat === "SOCIAL" || cat === "INFLUENCERS" || cat === "RUMOR") return "/news_marketing.png";
    if (cat === "SUPPLY CHAIN" || cat === "OPERATIONS") return "/news_operations.png";
    if (cat === "COMPETITION") return "/news_competition.png";
    if (cat === "INDUSTRY" || cat === "BUSINESS") return "/news_industry.png";
    if (cat === "HEALTH") return "/news_health.png";
    if (cat === "WORLD") return "/news_world.png";
    if (cat === "FINTECH") return "/news_fintech.png";
    if (cat === "SPOTLIGHT" || cat === "PRESS" || cat === "PARTNERSHIPS" || cat === "TALENT") return "/news_spotlight.png";
    if (cat === "MOMENTUM") return "/news_momentum.png";
    return "/news_company.png"; // Fallback to general workspace
  };

  const renderNewsCard = (news, isPinnedSection = false) => {
    const isPinned = pinnedNewsIds.includes(news.id);
    const activeEffect = activeNewsEffects.find(a => a.id === news.id);
    const turnsRemaining = activeEffect ? activeEffect.turnsRemaining : 0;
    const hasDuration = news.duration > 0;
    const isActive = activeEffect || (isPinnedSection && news.isActive);
    const isDynamic = news.scope === "company"; // company news can't be pinned (regenerated each turn)

    const sentimentColor = news.sentiment === "positive"
      ? "var(--color-success)"
      : news.sentiment === "negative"
      ? "var(--color-danger)"
      : "var(--color-accent-light)";

    return (
      <div className={`news-card ${isPinned ? "pinned" : ""}`} key={`${news.id}_${isPinnedSection ? "pinned" : "current"}`}>
        <div className="news-image-placeholder" style={{ padding: 0 }}>
          <img 
            src={getNewsImage(news)} 
            alt={news.category} 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              display: "block",
              transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
            }} 
          />
        </div>
        <div className="news-body">
          <div>
            <div className="news-meta" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", flexWrap: "wrap" }}>
                <span className="news-category" style={news.sentiment ? { borderColor: sentimentColor, color: sentimentColor } : {}}>{news.category}</span>
                {news.actionable && (
                  <span style={{
                    fontSize: "0.65rem", fontWeight: "700", padding: "0.15rem 0.4rem",
                    borderRadius: "4px", background: "rgba(250, 204, 21, 0.12)",
                    color: "#facc15", border: "1px solid rgba(250, 204, 21, 0.3)",
                    textTransform: "uppercase", letterSpacing: "0.5px",
                    display: "flex", alignItems: "center", gap: "0.2rem"
                  }}>
                    <Zap size={10} /> Actionable
                  </span>
                )}
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
                  {(() => {
                    const q = Math.ceil(turnsRemaining / 3);
                    return isActive ? `${q} ${q === 1 ? "Quarter" : "Quarters"} Left` : "Expired";
                  })()}
                </span>
              )}
            </div>
            <h3 className="news-headline">{news.headline}</h3>
            <p className="news-detail">{news.detail}</p>
            {news.actionable && news.actionableDetail && (
              <div style={{
                marginTop: "0.6rem", padding: "0.5rem 0.75rem",
                background: "rgba(250, 204, 21, 0.06)", borderRadius: "6px",
                borderLeft: "3px solid #facc15", fontSize: "0.75rem",
                color: "#facc15", lineHeight: "1.5"
              }}>
                <Zap size={11} style={{ display: "inline", marginRight: "0.3rem", verticalAlign: "middle" }} />
                {news.actionableDetail}
              </div>
            )}
          </div>
        </div>

        {!isDynamic && (
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
        )}
      </div>
    );
  };

  return (
    <div className="news-panel" id="news-panel">
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
