import React from "react";
import "./GroupCard.css"; // 스타일은 따로 CSS 파일로 관리

const GroupCard = ({
  imageUrl,
  dDay,
  isPublic,
  title,
  description,
  badges,
  memories,
  likes,
}) => {
  return (
    <div className={`group-card ${isPublic ? "public" : "private"}`}>
      {isPublic && (
        <img src={imageUrl} alt="그룹 이미지" className="group-image" />
      )}
      <div className="group-info">
        <div className="group-meta">
          <span className="d-day">D+{dDay}</span>
          <span className="between-line">|</span>
          <span className="public-status">{isPublic ? "공개" : "비공개"}</span>
        </div>
        <h2 className="group-title">{title}</h2>
        {isPublic && <p className="group-description">{description}</p>}
        <div className="group-stats">
          {isPublic && (
            <div className="stat-item">
              <span className="stat-label">획득 배지</span>
              <span className="stat-value">{badges}</span>
            </div>
          )}
          <div className="stat-item">
            <span className="stat-label">추억</span>
            <span className="stat-value">{memories}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">그룹 공감</span>
            <span className="stat-value">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
