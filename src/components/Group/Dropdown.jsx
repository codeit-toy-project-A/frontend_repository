// Dropdown.jsx
import "./Dropdown.css";
import React, { useState } from "react";

const Dropdown = ({ onChange, selectedSortBy }) => {
  // selectedSortBy 추가
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setIsOpen(false); // 선택 후 드롭다운 닫기
    onChange(option); // 부모 컴포넌트에 선택된 값 전달
  };

  const sortOptions = {
    latest: "최신 순",
    mostPosted: "게시글 순",
    mostLiked: "좋아요 순",
    mostBadge: "배지 순",
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {sortOptions[selectedSortBy]}
        <span className="dropdown-icon">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M11.9999 9.6923L15.8076 13.5L8.19222 13.5L11.9999 9.6923Z"
                fill="#282828"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M11.9999 14.3077L8.19222 10.5L15.8076 10.5L11.9999 14.3077Z"
                fill="#282828"
              />
            </svg>
          )}
        </span>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={() => handleSelect("latest")}>최신 순</li>
          <li onClick={() => handleSelect("mostPosted")}>게시글 순</li>
          <li onClick={() => handleSelect("mostLiked")}>좋아요 순</li>
          <li onClick={() => handleSelect("mostBadge")}>배지 순</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
