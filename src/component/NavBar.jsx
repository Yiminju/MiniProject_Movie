import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/NavBar.css";
import useDebounce from "../useDebounce";

// Nav-bar 컴포넌트
const NavBar = () => {
  // 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // useDebounce 훅을 사용하여 검색 요청에 3초의 지연을 적용
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
        {/* 회원가입 및 로그인 페이지로 이동하는 링크 */}
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default NavBar;
