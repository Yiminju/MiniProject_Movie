// Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";
import NavBar from "./NavBar";
import { SignupWithEmail } from "../api/firebaseConfig";

// 이메일 유효성 검사 정규식
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Signup = () => {
  const [name, setName] = useState(""); // 이름 상태
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태
  const [error, setError] = useState(null); // 에러 메시지 상태
  const navigate = useNavigate();

  // 회원가입 처리 함수
  const handleSignUp = (e) => {
    e.preventDefault();
    // 이메일 유효성 검사
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }
    // 비밀번호 길이 검사
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    // 비밀번호 확인 검사
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    SignupWithEmail(email, password);
    navigate("/"); // 회원가입 성공 후 홈 페이지로 리디렉션
  };

  return (
    <>
      <NavBar />
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          {error && <div className="error">{error}</div>}{" "}
          {/* 에러 메시지 표시 */}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
