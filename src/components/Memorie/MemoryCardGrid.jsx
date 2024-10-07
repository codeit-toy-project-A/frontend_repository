// 추억 목록 카드 컴포넌트

import "./MemoryCardGrid.css"; // Ensure this path is correct
import React from "react";
import { useNavigate } from "react-router-dom";
import MemoryCard from "./MemoryCard"; // Ensure this path is correct
import Button from "../common/Button";

const MemoryCardGrid = ({ memories, visibleMemories, loading }) => {
  const navigate = useNavigate();

  const handleCardClick = (memoryId) => {
    navigate(`/memorieInfo/${memoryId}`); // Memory ID to URL parameter
  };

  const noMemoriesMessageVisible = memories.length === 0 && !loading;

  return (
    <div className="moments-card-grid">
      {" "}
      {/* Updated class name */}
      {noMemoriesMessageVisible ? (
        <div className="no-moments-message">
          {" "}
          {/* Updated class name */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            className="no-moments-message__svg" // Keep existing class for SVG
          >
            <path
              d="M25.6406 74.3585H47.5957V58.6534H25.6406V74.3585ZM25.6406 53.8457H47.5957V25.6406H25.6406V53.8457ZM52.4034 74.3585H74.3585V46.1534H52.4034V74.3585ZM52.4034 41.3457H74.3585V25.6406H52.4034V41.3457ZM22.1151 85.4161C20.0104 85.4161 18.2288 84.687 16.7705 83.2286C15.3122 81.7703 14.583 79.9888 14.583 77.884V22.1151C14.583 20.0104 15.3122 18.2288 16.7705 16.7705C18.2288 15.3122 20.0104 14.583 22.1151 14.583H77.884C79.9888 14.583 81.7703 15.3122 83.2286 16.7705C84.687 18.2288 85.4161 20.0104 85.4161 22.1151V30.7689H92.7878V37.0187H85.4161V46.8747H92.7878V53.1245H85.4161V62.9804H92.7878V69.2302H85.4161V77.884C85.4161 79.9888 84.687 81.7703 83.2286 83.2286C81.7703 84.687 79.9888 85.4161 77.884 85.4161H22.1151ZM22.1151 79.1662H77.884C78.2046 79.1662 78.4985 79.0327 78.7656 78.7656C79.0327 78.4985 79.1662 78.2046 79.1662 77.884V22.1151C79.1662 21.7945 79.0327 21.5007 78.7656 21.2335C78.4985 20.9664 78.2046 20.8329 77.884 20.8329H22.1151C21.7945 20.8329 21.5007 20.9664 21.2335 21.2335C20.9664 21.5007 20.8329 21.7945 20.8329 22.1151V77.884C20.8329 78.2046 20.9664 78.4985 21.2335 78.7656C21.5007 79.0327 21.7945 79.1662 22.1151 79.1662Z"
              fill="#DDDDDD"
            />
          </svg>
          <div className="no-moments-message__text1">
            {" "}
            {/* Keep existing class name */}
            등록된 추억이 없습니다.
          </div>
          <div className="no-moments-message__text2">
            {" "}
            {/* Keep existing class name */}
            가장 먼저 추억을 만들어보세요!
          </div>
          <Button
            className="no-moments-message__btn" // Keep existing class name
            text={"추억 올리기"}
            size={"L"}
            onClick={() => navigate("/memorieInsert")}
          />
        </div>
      ) : (
        memories.slice(0, visibleMemories).map((memory) => (
          <div key={memory.id} onClick={() => handleCardClick(memory.id)}>
            <MemoryCard
              nickname={memory.nickname} // Adding nickname prop
              title={memory.title}
              imageUrl={memory.imageUrl}
              tags={memory.tags} // Adding tags prop
              location={memory.location}
              moment={memory.moment}
              isPublic={memory.isPublic}
              likeCount={memory.likeCount}
              commentCount={memory.commentCount}
              createdAt={memory.createdAt}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default MemoryCardGrid;
