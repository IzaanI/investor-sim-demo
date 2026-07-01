import React from "react";
import { useGameStore } from "../state/useGameStore";
import { Newspaper, ChevronRight, Activity } from "lucide-react";

export default function NewsPanel() {
  const currentNews = useGameStore(state => state.currentNews);

  return (
    <div className="news-panel">
      <div className="panel-title-container">
        <h2 className="panel-title">
          <Newspaper size={20} className="text-accent" />
          Top Headlines
        </h2>
      </div>

      <div className="news-list">
        {currentNews.length > 0 ? (
          currentNews.map((news) => (
            <div className="news-card" key={news.id}>
              <div className="news-image-placeholder">
                <Activity size={24} />
              </div>
              <div className="news-body">
                <div>
                  <div className="news-meta">
                    <span className="news-category">{news.category}</span>
                    <span className="news-time">{news.timeString}</span>
                  </div>
                  <h3 className="news-headline">{news.headline}</h3>
                  <p className="news-detail">{news.detail}</p>
                </div>
              </div>
            </div>
          ))
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
