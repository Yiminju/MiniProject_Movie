// NavBar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/NavBar.css";
import useDebounce from "../useDebounce";
import { logout, onUserStateChange } from "../api/firebaseConfig";

// Nav-bar 컴포넌트
const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [user, setUser] = useState(null); // 사용자 상태
  const [dropdownVisible, setDropdownVisible] = useState(false); // 드롭다운 메뉴 상태

  const navigate = useNavigate();

  // 사용자 상태 변화 감지
  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user); // 사용자 상태 업데이트
    });
  }, []);

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null); // 사용자 상태 초기화
      setDropdownVisible(false); // 드롭다운 메뉴 숨김
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  // useDebounce 훅을 사용하여 검색 요청에 2.5초의 지연을 적용
  const debouncedSearchTerm = useDebounce(searchTerm, 2500);

  // 검색어 입력 핸들러
  const onChangeSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  // 검색 요청 핸들러
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      navigate(`/search?query=${debouncedSearchTerm}`);
    }
  }, [debouncedSearchTerm, navigate]);

  // 썸네일 클릭 핸들러
  const handleThumbnailClick = () => {
    setDropdownVisible(!dropdownVisible); // 드롭다운 메뉴 토글
  };

  const userThumbnail = user?.photoURL || "/default-thumbnail.jpeg"; // 기본 썸네일 이미지 경로

  return (
    <nav className="navbar">
      {/* 홈 페이지로 이동하는 로고 */}
      <Link to="/" className="logo">
        Hagisirol
      </Link>
      {/* 검색 입력 필드 */}
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={onChangeSearch}
        className="search-input"
      />
      <div className="nav-links">
        {/* 로그인 상태에 따라 다른 링크 표시 */}
        {user ? (
          <div className="user-menu">
            <img
              src={userThumbnail}
              alt="User Thumbnail"
              className="user-thumbnail"
              onClick={handleThumbnailClick}
            />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <Link to="/mypage">My Page</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
