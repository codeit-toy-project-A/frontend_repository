// 그룹 상세 페이지 하단 - 해당 그룹의 추억 목록 & 목록 검색 기능 포함하는 컴포넌트

import React, { useState, useEffect } from "react";
import Search from "../../components/common/Search";
import Tab from "../../components/Group/Tab";
import Dropdown from "../../components/Group/Dropdown";
import MemoryCardGrid from "./MemoryCardGrid";
import Button from "../common/Button";
import { useNavigate, useParams } from "react-router-dom";
import "./Memories.css";

const Memories = () => {
  const navigate = useNavigate();
  const { groupId } = useParams(); // URL에서 그룹 ID 가져오기

  // 상태 관리
  const [memoriesData, setMemoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [visibleMemories, setVisibleMemories] = useState(16);
  const [activeTab, setActiveTab] = useState("public");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [isPublic, setIsPublic] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // API 호출 함수
  const fetchMemories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://project-zogakzip-fe.vercel.app/api/groups/${groupId}/posts?page=${currentPage}&pageSize=${visibleMemories}&sortBy=${sortBy}&keyword=${searchQuery}&isPublic=${isPublic}`
      );

      if (!response.ok) {
        throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
      }
      const data = await response.json();
      setMemoriesData(data.data);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      console.error(err.message);
      setError(err.message);

      // API 호출 실패 시 mockData 사용
      console.log("서버에서 데이터를 불러오지 못했습니다.");
      setMemoriesData([]);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때와 검색/필터 변경 시 데이터를 다시 불러옴
  useEffect(() => {
    fetchMemories();
  }, [currentPage, visibleMemories, sortBy, searchQuery, isPublic]);

  // 검색 핸들러
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // 검색 시 첫 페이지로 돌아가도록 설정
    setVisibleMemories(16); // 검색 시 visibleMemories 초기화
  };

  // 탭 전환 핸들러
  const handleTabSelect = (tab) => {
    const publicStatus = tab === "public";
    setIsPublic(publicStatus);
    setActiveTab(tab);
    setCurrentPage(1); // 탭 변경 시 첫 페이지로 돌아가도록 설정
    setVisibleMemories(16); // 탭 변경 시 visibleMemories 초기화
  };

  // 더보기 버튼 핸들러
  const loadMoreMemories = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1); // 다음 페이지로 증가
    }
  };

  // 정렬 방식 변경 핸들러 (Dropdown과 연결)
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1); // 정렬 기준 변경 시 첫 페이지로 돌아가도록 설정
    setVisibleMemories(16); // 정렬 기준 변경 시 visibleMemories 초기화
  };

  // 추억 올리기 버튼 클릭 핸들러
  const addMemoryButtonClick = () => {
    navigate(`/memoryInsert/${groupId}`); // 그룹 ID를 전달하여 추억 올리기 페이지로 이동
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) console.log(error);

  return (
    <>
      <div className="memories-header">
        <div></div>
        <div className="memories-header__title">추억 목록</div>
        <div className="create-memory-button-container">
          <Button text="추억 올리기" size="M" onClick={addMemoryButtonClick} />
        </div>
      </div>

      <div className="filter-components">
        <Tab onSelect={handleTabSelect} activeTab={activeTab} />
        <Search label="추억" handleSearch={handleSearch} />
        <Dropdown onChange={handleSortChange} />
      </div>

      <MemoryCardGrid
        memories={memoriesData} // 메모리 데이터
        visibleMemories={visibleMemories}
        selectedTab={activeTab}
        loading={loading}
      />

      {currentPage < totalPages && (
        <button className="load-more-button" onClick={loadMoreMemories}>
          더보기
        </button>
      )}
    </>
  );
};

export default Memories;
