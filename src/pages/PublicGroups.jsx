// 그룹 목록 페이지
// 공개 / 비공개 필터링, 그룹명 검색 필터링 기능 구현
//공개 그룹, 비공개 그룹, 데이터 없는 경우 표시

import Header from "../components/common/Header";
import Search from "../components/common/Search";
import Tab from "../components/Group/Tab";
import Dropdown from "../components/Group/Dropdown";
import GroupCardGrid from "../components/Group/GroupCardGrid";
import Button from "../components/common/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PublicGroups.css";

const PublicGroups = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [groupsData, setGroupsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [visibleGroups, setVisibleGroups] = useState(16);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [isPublic, setIsPublic] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [activeTab, setActiveTab] = useState("public");

  // API 호출 함수
  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://backend-repository-t82r.onrender.com/api/groups?page=${currentPage}&pageSize=${visibleGroups}&sortBy=${sortBy}&keyword=${searchQuery}&isPublic=${isPublic}`
      );
      console.log("API 호출 URL:", response); // 로그로 확인

      if (!response.ok) {
        throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
      }
      const data = await response.json();
      console.log("서버 응답 데이터:", data.data); // 응답 데이터 확인

      setGroupsData(data.data);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      // 데이터 빈 상태로 두기
      setGroupsData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // 상태 초기화 함수
  const resetStates = () => {
    setVisibleGroups(16);
    setActiveTab("public");
    setSearchQuery("");
    setSortBy("latest");
    setIsPublic(true);
    setCurrentPage(1);
  };

  // Header 클릭 핸뎔르
  const handleHeaderClick = () => {
    resetStates(); // 상태 초기화
    fetchGroups(); // API 호출
  };

  // 검색 핸들러
  const handleSearch = (query) => {
    console.log("검색:", query);
    setSearchQuery(query);
  };

  // 탭 전환 핸들러
  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    setIsPublic(tab === "public");
    setCurrentPage(1);
    setVisibleGroups(16);
  };

  // 더보기 버튼 핸들러
  const loadMoreGroups = () => {
    if (currentPage < totalPages) {
      // 현재 페이지가 총 페이지 수보다 작은 경우
      setCurrentPage((prevPage) => prevPage + 1); // 다음 페이지로 증가
    }
  };

  // 정렬 방식 변경 핸들러 (Dropdown과 연결)
  const handleSortChange = (newSortBy) => {
    console.log("정렬 방식 변경됨:", newSortBy); // 로그로 확인
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  // 그룹 만들기 버튼 클릭 핸들러
  const groupMakeButtonClick = () => {
    navigate("/groupInsert");
  };

  // 컴포넌트가 마운트될 때와 검색/필터 변경 시 데이터를 다시 불러옴
  useEffect(() => {
    fetchGroups();
  }, [currentPage, visibleGroups, sortBy, searchQuery, isPublic]);

  if (loading) return <div>로딩 중...</div>;
  if (error) console.log(error);

  return (
    <>
      <Header onClick={handleHeaderClick} />

      <div className="create-group-button-container">
        <Button text="그룹만들기" size="M" onClick={groupMakeButtonClick} />
      </div>

      <div className="filter-components">
        <Tab onSelect={handleTabSelect} activeTab={activeTab} />
        <Search label="그룹" handleSearch={handleSearch} />
        <Dropdown onChange={handleSortChange} selectedSortBy={sortBy} />
      </div>

      <GroupCardGrid
        groups={groupsData}
        visibleGroups={visibleGroups}
        selectedTab={activeTab}
        loading={loading}
      />

      {currentPage < totalPages && (
        <button className="load-more-button" onClick={loadMoreGroups}>
          더보기
        </button>
      )}
    </>
  );
};

export default PublicGroups;
