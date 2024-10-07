// 여러 줄 입력받는 input 컴포넌트

// label: 입력 필드의 레이블 텍스트 (본문, 댓글 등)
// onChange: 입력 값이 변경될 때 호출되는 함수

import "./InputBox.css";
import { useState } from "react";

const InputBox = ({ label, onChange }) => {
  const [value, setValue] = useState("");
  const [state, setState] = useState("default");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    onChange(inputValue); // 부모 컴포넌트에 변경 사항 전달
    setState(inputValue.length > 0 ? "filled" : "default");
  };

  return (
    <div className="input-box-container">
      <label className="label">{label}</label>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={`${label}을 입력하세요`}
        className="input-box"
      />
    </div>
  );
};

export default InputBox;
