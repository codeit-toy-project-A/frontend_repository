// 공개, 비공개 그룹은 필터링할 때 사용할 Tab 버튼 조합 컴포넌트
// onSelect 함수를 prop으로 받기

import "./Tab.css";
import React, { useState } from "react";

const Tab = ({ onSelect }) => {
  const [activeTab, setActiveTab] = useState("public");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onSelect(tab); // 선택된 탭에 따라 그룹 리스트 필터링할 때 사용
  };

  return (
    <div className="tab-container">
      <button
        className={`tab-button ${activeTab === "public" ? "active" : ""}`}
        onClick={() => handleTabClick("public")}
      >
        공개
      </button>
      <button
        className={`tab-button ${activeTab === "private" ? "active" : ""}`}
        onClick={() => handleTabClick("private")}
      >
        비공개
      </button>
    </div>
  );
};

export default Tab;
