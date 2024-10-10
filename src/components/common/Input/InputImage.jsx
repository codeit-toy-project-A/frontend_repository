// 이미지 파일만 입력받는 input 컴포넌트
// onChange: 선택한 파일의 이름을 부모 컴포넌트에 전달하는 함수
// parentValue:

import "./InputImage.css";
import { useState, useEffect } from "react";

const InputImage = ({ onChange, parentValue }) => {
  const [fileName, setFileName] = useState(parentValue || "");
  const [state, setState] = useState("default");

  useEffect(() => {
    setFileName(parentValue || "");
  }, [parentValue]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setState("filled");

      // 이미지 파일을 서버로 업로드
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(
          "https://backend-repository-t82r.onrender.com/api/image",
          {
            // API URL 입력
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("이미지 URL:", data.imageUrl);
          onChange(data.imageUrl); // 이미지 URL을 부모 컴포넌트에 전달
        } else {
          console.error("이미지 업로드 실패");
          onChange(""); // 실패 시 빈 문자열 전달
        }
      } catch (error) {
        console.error("서버 오류:", error);
        onChange(""); // 에러 발생 시 빈 문자열 전달
      }
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
