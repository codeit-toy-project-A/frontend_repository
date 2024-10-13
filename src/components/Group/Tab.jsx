// 공개, 비공개 그룹은 필터링할 때 사용할 Tab 버튼 조합 컴포넌트
// onSelect 함수를 prop으로 받기

import "./Tab.css";
import React from "react";

const Tab = ({ onSelect, activeTab }) => {
  return (
    <div className="tab-container">
      <button
        className={`tab-button ${activeTab === "public" ? "active" : ""}`}
        onClick={() => onSelect("public")}
      >
        공개
      </button>
      <button
        className={`tab-button ${activeTab === "private" ? "active" : ""}`}
        onClick={() => onSelect("private")}
      >
        비공개
      </button>
    </div>
  );
};

export default Tab;
