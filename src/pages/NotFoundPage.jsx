import React from "react";
import Header from "../components/common/Header";
import "./NotFoundPage.css";
import NotFoundImage from "../assets/404.png";

const NotFoundPage = () => {
  return (
    <>
      {/* 모든 페이지의 상단에 공통 Header 포함 */}
      <Header />

      <div className="not-found-container">
        <img
          src={NotFoundImage}
          alt="404 Not Found"
          className="not-found-image"
        />
      </div>
    </>
  );
};

export default NotFoundPage;
