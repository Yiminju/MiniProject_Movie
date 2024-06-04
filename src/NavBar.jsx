import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      {/* 홈 페이지로 이동하는 로고 */}
      <Link to="/" className="logo">
        Hagisirol
      </Link>
      <div className="nav-links">
        {/* 회원가입 및 로그인 페이지로 이동하는 링크 */}
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default NavBar;
