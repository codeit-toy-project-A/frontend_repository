import "./Dropdown.css";
import React, { useState } from "react";

const Dropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("공감순");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // 선택 후 드롭다운 닫기
    onSelect(option); // 부모 컴포넌트에 선택된 값 전달
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption}{" "}
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
          <li onClick={() => handleSelect("최신순")}>최신순</li>
          <li onClick={() => handleSelect("댓글순")}>댓글순</li>
          <li onClick={() => handleSelect("공감순")}>공감순</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
