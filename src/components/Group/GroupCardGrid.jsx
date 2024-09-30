// 그룹 카드 목록 컴포넌트

import "./GroupCardGrid.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import GroupCard from "./GroupCard";
import Button from "../common/Button";

const GroupCardGrid = ({ groups, visibleGroups, selectedTab, loading }) => {
  const navigate = useNavigate();

  const handleCardClick = (group) => {
    console.log(group.isPublic);
    if (group.isPublic) {
      // 공개 그룹이면 바로 그룹 상세 페이지로 이동
      navigate(`/groupInfo/${group.id}`);
    } else {
      // 비공개 그룹이면 검증 페이지로 이동
      navigate(`/privateGroupAccess/${group.id}`);
    }
  };

  const groupMakeButtonClick = () => {
    navigate("/groupInsert");
  };

  const noGroupsMessageVisible =
    selectedTab === "public" && groups.length === 0 && !loading;

  return (
    <div className="group-card-grid">
      {noGroupsMessageVisible ? (
        <div className="no-groups-message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            className="no-groups-message__svg"
          >
            <path
              d="M25.6406 74.3585H47.5957V58.6534H25.6406V74.3585ZM25.6406 53.8457H47.5957V25.6406H25.6406V53.8457ZM52.4034 74.3585H74.3585V46.1534H52.4034V74.3585ZM52.4034 41.3457H74.3585V25.6406H52.4034V41.3457ZM22.1151 85.4161C20.0104 85.4161 18.2288 84.687 16.7705 83.2286C15.3122 81.7703 14.583 79.9888 14.583 77.884V22.1151C14.583 20.0104 15.3122 18.2288 16.7705 16.7705C18.2288 15.3122 20.0104 14.583 22.1151 14.583H77.884C79.9888 14.583 81.7703 15.3122 83.2286 16.7705C84.687 18.2288 85.4161 20.0104 85.4161 22.1151V30.7689H92.7878V37.0187H85.4161V46.8747H92.7878V53.1245H85.4161V62.9804H92.7878V69.2302H85.4161V77.884C85.4161 79.9888 84.687 81.7703 83.2286 83.2286C81.7703 84.687 79.9888 85.4161 77.884 85.4161H22.1151ZM22.1151 79.1662H77.884C78.2046 79.1662 78.4985 79.0327 78.7656 78.7656C79.0327 78.4985 79.1662 78.2046 79.1662 77.884V22.1151C79.1662 21.7945 79.0327 21.5007 78.7656 21.2335C78.4985 20.9664 78.2046 20.8329 77.884 20.8329H22.1151C21.7945 20.8329 21.5007 20.9664 21.2335 21.2335C20.9664 21.5007 20.8329 21.7945 20.8329 22.1151V77.884C20.8329 78.2046 20.9664 78.4985 21.2335 78.7656C21.5007 79.0327 21.7945 79.1662 22.1151 79.1662Z"
              fill="#DDDDDD"
            />
          </svg>
          <div className="no-groups-message__text1">
            등록된 공개 그룹이 없습니다.
          </div>
          <div className="no-groups-message__text2">
            가장 먼저 그룹을 만들어보세요!
          </div>
          <Button
            className="no-groups-message__btn"
            text={"그룹만들기"}
            size={"L"}
            onClick={groupMakeButtonClick}
          />
        </div>
      ) : (
        groups.slice(0, visibleGroups).map((group, index) => (
          <div key={group.id} onClick={() => handleCardClick(group)}>
            <GroupCard
              key={index}
              imageUrl={group.imageUrl}
              createdAt={group.createdAt}
              isPublic={group.isPublic}
              name={group.name}
              introduction={group.introduction}
              badgeCount={group.badgeCount}
              postCount={group.postCount}
              likeCount={group.likeCount}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default GroupCardGrid;
