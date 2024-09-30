// 그룹 생성 페이지

import "./GroupInsert.css";
import InputText from "../components/common/Input/InputText";
import InputImage from "../components/common/Input/InputImage";
import InputToggle from "../components/common/Input/InputToggle";
import InputBox from "../components/common/Input/InputBox";
import Button from "../components/common/Button";
import Header from "../components/common/Header";
import TextInfoModal from "../components/modal/textInfoModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GroupInsert = () => {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null); // Image URL or File
  const [groupDescription, setGroupDescription] = useState("");
  const [password, setPassword] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [modalInfo, setModalInfo] = useState({ title: "", text: "" }); // 모달 정보
  const [isSuccess, setIsSuccess] = useState(false); // 성공 여부

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    const groupData = {
      groupName,
      groupImage,
      groupDescription,
      password,
    };

    console.log("그룹 데이터:", groupData);
    // 서버로 전송 작업 수행 -> api 연결하기

    if (groupName && groupImage && groupDescription && password) {
      setIsSuccess(true);
      setModalInfo({
        title: "그룹 만들기 성공",
        text: "그룹이 성공적으로 등록되었습니다",
      });
    } else {
      setIsSuccess(false);
      setModalInfo({
        title: "그룹 만들기 실패",
        text: "그룹 등록에 실패하였습니다",
      });
    }

    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (isSuccess) {
      navigate("/");
    }
  };

  return (
    <div className="groupInsert">
      <Header />
      <div className="groupInsert-form">
        <div className="groupInsert__title">그룹 만들기</div>
        <form className="groupInsert__inserts" onSubmit={handleSubmit}>
          <InputText
            label="그룹명"
            value={groupName}
            onChange={setGroupName} // e.target.value 없이 직접 상태 업데이트
          />
          <InputImage onChange={(image) => setGroupImage(image)} />
          <InputBox
            label="그룹 소개"
            value={groupDescription}
            onChange={setGroupDescription} // e.target.value 없이 직접 상태 업데이트
          />
          <InputToggle
            label="그룹 공개 선택"
            toggleName="공개"
            onChange={(value) => console.log("공개", value)}
          />
          <InputText
            label="비밀번호 생성"
            type="password"
            value={password}
            onChange={setPassword} // e.target.value 없이 직접 상태 업데이트
          />
          <Button text="만들기" size="L" type="submit" />
        </form>
      </div>
      {isModalOpen && (
        <TextInfoModal
          title={modalInfo.title}
          text={modalInfo.text}
          onClose={handleModalClose} // 확인 버튼을 눌렀을 때 호출되는 함수
        />
      )}
    </div>
  );
};

export default GroupInsert;
