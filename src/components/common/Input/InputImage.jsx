// 이미지 파일만 입력받는 input 컴포넌트

// onChange: 선택한 파일의 이름을 부모 컴포넌트에 전달하는 함수

import "./InputImage.css";
import { useState } from "react";

const InputImage = ({ onChange }) => {
  const [fileName, setFileName] = useState("");
  const [state, setState] = useState("default");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange(file.name); // 파일 이름을 부모 컴포넌트에 전달
      setState("filled");
    } else {
      setFileName("");
      onChange(""); // 파일이 선택되지 않으면 빈 문자열 전달
      setState("default");
    }
  };

  return (
    <div className="input-image-container">
      <label className="input-image-label">대표이미지</label>
      <div className="input-image-wrapper">
        <input
          type="text"
          value={fileName}
          placeholder="파일을 선택해 주세요."
          readOnly
          className="input-image"
        />
        <label className="file-upload-label">
          파일 선택
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="file-input"
          />
        </label>
      </div>
    </div>
  );
};

export default InputImage;
