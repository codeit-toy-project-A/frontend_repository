import "./GroupInsert.css";
import InputText from "../components/common/Input/InputText";
import InputImage from "../components/common/Input/InputImage";
import InputToggle from "../components/common/Input/InputToggle";
import InputBox from "../components/common/Input/InputBox";
import Button from "../components/common/Button";
import Header from "../components/common/Header";
import { useState } from "react";

const GroupInsert = () => {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null); // Image URL or File
  const [groupDescription, setGroupDescription] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    const groupData = {
      groupName,
      groupImage,
      groupDescription,
      password,
    };

    console.log("그룹 데이터:", groupData);
    // 여기서 그룹 데이터를 서버에 전송하는 등의 추가 작업을 수행할 수 있습니다.
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
      </div>{" "}
    </div>
  );
};

export default GroupInsert;
