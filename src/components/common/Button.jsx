// 버튼 컴포넌트

// text: 버튼에 표시될 텍스트
// size: 버튼의 크기 (M, L)
// onClick: 버튼 클릭 시 호출되는 함수

import "./Button.css";

const Button = ({ text, size, onClick }) => {
  return (
    <button onClick={onClick} className={`Button Button_${size}`}>
      {text}
    </button>
  );
};

export default Button;
