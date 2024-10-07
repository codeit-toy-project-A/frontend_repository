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
import mockData from "../mock/PublicGroupsMockData.json";

const PublicGroups = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [groupsData, setGroupsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [visibleGroups, setVisibleGroups] = useState(16);
  const [selectedTab, setSelectedTab] = useState("public");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [isPublic, setIsPublic] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // API 호출 함수
  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://project-zogakzip-fe.vercel.app/groups?page=${currentPage}&pageSize=${visibleGroups}&sortBy=${sortBy}&keyword=${searchQuery}&isPublic=${isPublic}`
      );

      if (!response.ok) {
        throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
      }
      const data = await response.json();
      setGroupsData(data.data);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      console.error(err.message);
      setError(err.message);

      // API 호출 실패 시 mockData 사용
      console.log(
        "서버에서 데이터를 불러오지 못했습니다. mockData를 사용합니다."
      );
      setGroupsData(mockData.data);
      setTotalPages(mockData.totalPages || 1);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때와 검색/필터 변경 시 데이터를 다시 불러옴
  useEffect(() => {
    fetchGroups();
  }, [currentPage, visibleGroups, sortBy, searchQuery, isPublic]);

  // 검색 핸들러
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // 검색 시 첫 페이지로 돌아가도록 설정
    setVisibleGroups(16); // 검색 시 visibleGroups 초기화
  };

  // 탭 전환 핸들러
  const handleTabSelect = (tab) => {
    const publicStatus = tab === "public";
    setIsPublic(publicStatus);
    setSelectedTab(tab);
    setCurrentPage(1); // 탭 변경 시 첫 페이지로 돌아가도록 설정
    setVisibleGroups(16); // 탭 변경 시 visibleGroups 초기화
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
    setSortBy(newSortBy);
    setCurrentPage(1); // 정렬 기준 변경 시 첫 페이지로 돌아가도록 설정
    setVisibleGroups(16); // 정렬 기준 변경 시 visibleGroups 초기화
  };

  // 그룹 만들기 버튼 클릭 핸들러
  const groupMakeButtonClick = () => {
    navigate("/groupInsert");
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) console.log(error);

  return (
    <>
      <Header />

      <div className="create-group-button-container">
        <Button text="그룹만들기" size="M" onClick={groupMakeButtonClick} />
      </div>

      <div className="filter-components">
        <Tab onSelect={handleTabSelect} selectedTab={selectedTab} />
        <Search label="그룹" handleSearch={handleSearch} />
        <Dropdown onChange={handleSortChange} />
      </div>

      <GroupCardGrid
        groups={groupsData}
        visibleGroups={visibleGroups}
        selectedTab={selectedTab}
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
