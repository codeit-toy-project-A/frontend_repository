// text를 입력받는 input 컴포넌트
// 허용하지 않는 특수문자를 받으면 상태 error로 변경

// label: 입력 필드의 레이블 텍스트 (그룹명, 닉네임 등)
// onChange: 입력 값이 변경될 때 호출되는 함수

import "./InputText.css";
import { useState, useEffect } from "react";

const InputText = ({ label, onChange, parentValue }) => {
  const [value, setValue] = useState(parentValue || "");
  const [error, setError] = useState("");
  const [state, setState] = useState("default");

  useEffect(() => {
    setValue(parentValue || "");
  }, [parentValue]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    const allowedChars = /^[0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\s!@#$%^&*()_+]*$/;
    if (!allowedChars.test(inputValue)) {
      setError("특수문자는 !@#$%^&*()_+ 만 사용 가능합니다.");
      setState("error"); // 상태를 error로 변경
    } else {
      setError("");
      setState(inputValue.length > 0 ? "filled" : "default");
    }

    // 부모 컴포넌트에 변경 사항 전달
    onChange(inputValue);
  };

  const isError = state === "error";
  const isDisabled = state === "disabled";

  return (
    <div className="input-text-container">
      <label className="label">{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={`${label}을 입력하세요`}
        className={"input-text"}
        disabled={isDisabled}
      />
      {isError && <p className="error-message">{error}</p>}
    </div>
  );
};

export default InputText;
