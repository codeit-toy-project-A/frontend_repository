// 그룹 목록 페이지
// 공개 / 비공개 필터링, 그룹명 검색 필터링 기능 구현
//공개 그룹, 비공개 그룹, 데이터 없는 경우 표시
// Header에도 '그룹만들기' 버튼 추가 필요

import Header from "../components/common/Header";
import Search from "../components/common/Search";
import Tab from "../components/Group/Tab";
import Dropdown from "../components/Group/Dropdown";
import GroupCardGrid from "../components/Group/GroupCardGrid";
import Button from "../components/common/Button";

import "./PublicGroups.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 임시 데이터 -> JSon 형식으로 서버에서 받아오려면 변경 필요
const groupsData = Array(51)
  .fill(null)
  .map((_, index) => ({
    imageUrl: "https://via.placeholder.com/300",
    dDay: 265,
    isPublic: index % 2 === 0, // Even-indexed groups are public, odd-indexed groups are private
    title: `에델바이스 ${index + 1}`,
    description: `서로 한 마음으로 응원하고 아끼는 단봉이네 가족입니다. (${index % 2 === 0 ? "공개" : "비공개"} 그룹)`,
    badges: Math.floor(Math.random() * 5) + 1, // Random badges between 1 and 5
    memories: Math.floor(Math.random() * 10) + 1, // Random memories between 1 and 10
    likes: (Math.random() * 5).toFixed(1), // Random likes between 0.0 and 5.0
  }));

const PublicGroups = () => {
  const navigate = useNavigate();

  const [visibleGroups, setVisibleGroups] = useState(16);
  const [selectedTab, setSelectedTab] = useState("public");
  const [searchQuery, setSearchQuery] = useState("");

  const filterGroups = (tab, query) => {
    return groupsData.filter((group) => {
      const matchesTab = tab === "public" ? group.isPublic : !group.isPublic;
      const matchesSearch = group.title
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesTab && matchesSearch;
    });
  };

  const [filteredGroups, setFilteredGroups] = useState(
    filterGroups(selectedTab, searchQuery)
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = filterGroups(selectedTab, query);
    setFilteredGroups(filtered);
    setVisibleGroups(16);
  };

  const loadMoreGroups = () => {
    setVisibleGroups((prevVisibleGroups) => prevVisibleGroups + 16);
  };

  const groupMakeButtonClick = () => {
    navigate("/groupInsert");
  };

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
    const filtered = filterGroups(tab, searchQuery);
    setFilteredGroups(filtered);
    setVisibleGroups(16);
  };

  return (
    <>
      <Header />

      <div className="create-group-button-container">
        <Button text="그룹만들기" size="M" onClick={groupMakeButtonClick} />
      </div>

      <div className="filter-components">
        <Tab onSelect={handleTabSelect} />
        <Search label="그룹" handleSearch={handleSearch} />
        <Dropdown />
      </div>

      <GroupCardGrid
        groups={filteredGroups}
        visibleGroups={visibleGroups}
        selectedTab={selectedTab}
      />

      {visibleGroups < filteredGroups.length && (
        <button className="load-more-button" onClick={loadMoreGroups}>
          더보기
        </button>
      )}
    </>
  );
};

export default PublicGroups;
