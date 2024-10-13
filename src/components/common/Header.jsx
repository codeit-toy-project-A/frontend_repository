// Header 컴포넌트
// 모든 페이지 가장 위에 추가하기

import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.png";

const Header = ({ onClick }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    console.log("홈으로 이동");
    navigate("/"); // 로고 클릭 시 /default 경로로 이동
  };

  return (
    <header className="Header">
      <div onClick={onClick} className="logo">
        <img src={logo} alt="logo" onClick={handleLogoClick} />
      </div>
    </header>
  );
};

export default Header;
