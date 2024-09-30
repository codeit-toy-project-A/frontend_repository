// 글자만 보여주는 모달 컴포넌트 - 그룹 만들기 실패, 성공 모달에 활용

import Button from "../common/Button";
import "./textInfoModal.css";

const TextInfoModal = ({ title, text, onClose }) => {
  return (
    <>
      <div className="textInfoModal-overlay" onClick={onClose}></div>{" "}
      {/* 클릭 시 모달 닫기 */}
      <div className="textInfoModal">
        <div className="textInfoModal_detail">
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        <Button text="확인" onClick={onClose} />
      </div>
    </>
  );
};

export default TextInfoModal;
