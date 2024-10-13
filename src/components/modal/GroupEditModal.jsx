// 그룹 수정 모달

import React, { useState, useRef, useEffect } from "react";
import InputText from "../common/Input/InputText";
import InputImage from "../common/Input/InputImage";
import InputBox from "../common/Input/InputBox";
import InputToggle from "../common/Input/InputToggle";
import Button from "../common/Button";
import "./GroupEditModal.css";

const GroupEditModal = ({ isOpen, onClose, groupId }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  // 그룹 정보 불러오기
  useEffect(() => {
    const fetchGroupData = async () => {
      if (groupId && isOpen) {
        try {
          const response = await fetch(
            `https://backend-repository-t82r.onrender.com/api/groups/${groupId}`
          );
          const data = await response.json();
          console.log(data);

          if (response.ok) {
            setName(data.name);
            setImageUrl(data.imageUrl);
            setIntroduction(data.introduction);
            setIsPublic(data.isPublic);
          } else {
            setError("그룹 정보를 불러오는 데 실패했습니다.");
          }
        } catch (error) {
          setError("서버 오류가 발생했습니다. 다시 시도해 주세요.");
        }
      }
    };

    fetchGroupData();
  }, [groupId, isOpen]);

  const handleEdit = async () => {
    if (!name || !password || !introduction) {
      setError("모든 필드를 입력해야 합니다.");
      return;
    }

    try {
      const response = await fetch(
        `https://backend-repository-t82r.onrender.com/api/groups/${groupId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            password,
            imageUrl,
            isPublic,
            introduction,
          }),
        }
      );

      console.log(response);

      if (response.ok) {
        alert("그룹 수정 성공!");
        onClose();
      } else {
        // api 응답에 따라 에러 설정
        switch (response.status) {
          case 400:
            setError("잘못된 요청입니다.");
            break;
          case 403:
            setError("비밀번호가 틀렸습니다.");
            break;
          case 404:
            setError("존재하지 않는 그룹입니다.");
            break;
          default:
            setError("서버 오류가 발생했습니다. 다시 시도해 주세요.");
            break;
        }
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
    <div className="editModal-overlay">
      <div className="modal-content" ref={modalRef}>
        <h1>그룹 수정</h1>
        <InputText label="그룹명" onChange={setName} parentValue={name} />
        <InputImage
          label="대표 이미지"
          onChange={setImageUrl}
          parentValue={imageUrl}
        />
        <InputBox
          label="그룹 소개"
          onChange={setIntroduction}
          parentValue={introduction}
        />
        <InputToggle
          label="공개 여부"
          toggleName={"공개"}
          isChecked={isPublic}
          onChange={setIsPublic}
        />
        <InputText label="수정 권한 인증" onChange={setPassword} />
        {error && <p className="error-message">{error}</p>}
        <Button
          onClick={handleEdit}
          text="수정하기"
          size="L"
          className="edit-button"
        />
      </div>
    </div>
  );
};

export default GroupEditModal;
