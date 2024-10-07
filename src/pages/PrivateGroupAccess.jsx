// 비공개 접근 권환 확인 페이지

import Button from "../components/common/Button";
import Header from "../components/common/Header";
import InputText from "../components/common/Input/InputText";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PrivateGroupAccess.css";

const PrivateGroupAccess = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { groupId } = useParams();

  const handleSubmit = async () => {
    console.log("제출된 비밀번호:", password);

    try {
      const response = await fetch(
        `https://project-zogakzip-fe.vercel.app/api/groups/${groupId}/access`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // 비밀번호가 확인되면 그룹 상세 페이지로 이동
        navigate(`/groupInfo/${groupId}`);
      } else {
        // 비밀번호 오류 처리
        setError(data.message || "비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      // 서버 오류 처리
      setError("서버 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="privateGroupAccess">
      <Header />
      <div className="privateGroupAccess__container">
        <h1>비공개 그룹</h1>
        <p>비공개 그룹에 접근하기 위해 권한 확인이 필요합니다.</p>
        <InputText label="비밀번호 입력" onChange={setPassword} />
        <Button text="제출하기" size="L" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default PrivateGroupAccess;
