// 공감 보내는 버튼 컴포넌트
// groupId 또는 postId를 받아서, 그룹 / 게시물 공감 둘 다 활용 가능

import "./Like.css";
import favicon from "../../assets/favicon.png";

const Like = ({ groupId, postId }) => {
  // 그룹 공감하기
  const sendGroupEmpathy = async () => {
    try {
      const response = await fetch(
        `https://backend-repository-t82r.onrender.com/api/groups/${groupId}/like`, // 그룹 공감 API
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("그룹 공감하기 중 에러 발생:", error);
      alert("공감하기 요청 중 에러가 발생했습니다.");
    }
  };

  // 게시글 공감하기
  const sendPostEmpathy = async () => {
    try {
      const response = await fetch(
        `https://backend-repository-t82r.onrender.com/api/posts/${postId}/like`, // 게시글 공감 API
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("게시글 공감하기 중 에러 발생:", error);
      alert("공감하기 요청 중 에러가 발생했습니다.");
    }
  };

  const handleClick = () => {
    if (groupId) {
      sendGroupEmpathy(); // 그룹 공감하기 실행
    } else if (postId) {
      sendPostEmpathy(); // 게시글 공감하기 실행
    } else {
      alert("공감할 대상을 찾을 수 없습니다.");
    }
  };

  return (
    <button onClick={handleClick} className="Like">
      <span className="icon">
        <img src={favicon} alt="favicon" />
      </span>
      <span className="text">공감 보내기</span>
    </button>
  );
};

export default Like;
