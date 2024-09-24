// Header 컴포넌트
// 모든 페이지 가장 위에 추가하기

import "./Header.css";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="Header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
    </header>
  );
};

export default Header;
