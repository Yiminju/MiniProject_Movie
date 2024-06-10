// MyPage.jsx
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { onUserStateChange } from "../api/firebaseConfig";
import "../css/MyPage.css"; // 필요 시 CSS 파일 생성

const MyPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onUserStateChange((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/login"); // 로그인하지 않은 경우 로그인 페이지로 리디렉션
      }
    });
  }, [navigate]);

  if (!user) {
    return null; // 사용자 정보를 로드할 때까지 아무것도 렌더링하지 않음
  }

  return (
    <>
      <NavBar />
      <div className="mypage-container">
        <h2>My Page</h2>
        <div className="user-info">
          <img src={user.photoURL} alt="User Thumbnail" />
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </>
  );
};

export default MyPage;
