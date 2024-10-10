// 그룹 카드

import React from "react";
import "./GroupCard.css"; // 스타일은 따로 CSS 파일로 관리

const GroupCard = ({
  imageUrl,
  createdAt,
  isPublic,
  name,
  introduction,
  badgeCount,
  postCount,
  likeCount,
}) => {
  return (
    <div className={`group-card ${isPublic ? "public" : "private"}`}>
      {isPublic && (
        <img src={imageUrl} alt="그룹 이미지" className="group-image" />
      )}
      <div className="group-info">
        <div className="group-meta">
          <span className="created-at">
            {new Date(createdAt).toLocaleDateString()}
          </span>
          <span className="between-line">|</span>
          <span className="public-status">{isPublic ? "공개" : "비공개"}</span>
        </div>
        <h2 className="group-title">{name}</h2>
        {isPublic && <p className="group-description">{introduction}</p>}
        <div className="group-stats">
          {isPublic && (
            <div className="stat-item">
              <span className="stat-label">획득 배지</span>
              <span className="stat-value">{badgeCount || 0}</span>
            </div>
          )}
          <div className="stat-item">
            <span className="stat-label">게시글 수</span>
            <span className="stat-value">{postCount || 0}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">그룹 공감</span>
            <span className="stat-value">{likeCount || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
