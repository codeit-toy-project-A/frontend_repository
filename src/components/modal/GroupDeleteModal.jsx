// 그룹 삭제 모달

import React, { useState, useRef, useEffect } from "react";
import InputText from "../common/Input/InputText";
import Button from "../common/Button";
import "./GroupDeleteModal.css";

const GroupDeleteModal = ({ isOpen, onClose, groupId }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  const handleDelete = async () => {
    if (!password) {
      setError("비밀번호를 입력하세요.");
      return;
    }

    try {
      const response = await fetch(`/api/groups/${groupId}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        onClose();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("서버 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  // 팝업 바깥 클릭하면 닫기
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="deleteModal-overlay">
      <div className="modal-content" ref={modalRef}>
        <h1>그룹 삭제</h1>
        <InputText label="삭제 권한 인증" onChange={setPassword} />
        <Button
          text="삭제하기"
          className="delete-button"
          size="M"
          onClick={handleDelete}
        />
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default GroupDeleteModal;
