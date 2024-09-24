// 공감 보내는 버튼 컴포넌트

// onClick: 버튼 클릭 시 호출되는 함수

import "./Like.css";
import favicon from "../../assets/favicon.png";

const Like = ({ onClick }) => {
  return (
    <button onClick={onClick} className="Like">
      <span className="icon">
        <img src={favicon} alt="favicon" />
      </span>
      <span className="text">공감 보내기</span>
    </button>
  );
};

export default Like;
