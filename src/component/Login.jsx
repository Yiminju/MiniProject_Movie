// Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import NavBar from "./NavBar";
import { Googlelogin, LoginWithEmail } from "../api/firebaseConfig";

// 이메일 유효성 검사 정규식
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [error, setError] = useState(null); // 에러 메시지 상태
  const navigate = useNavigate();

  // Google 로그인 처리 함수
  const handleGoogleLogin = async () => {
    try {
      const user = await Googlelogin();
      // 로그인 성공 시 사용자 상태 업데이트
      if (user) {
        navigate("/"); // 홈 페이지로 리디렉션
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // 이메일 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked");
    // 이메일 유효성 검사
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }
    try {
      const user = await LoginWithEmail(email, password);
      // 로그인 성공 시 사용자 상태 업데이트
      if (user) {
        console.log("Login successful", user);
        navigate("/"); // 홈 페이지로 리디렉션
      }
    } catch (error) {
      console.error("Login failed", error);
      setError(error.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          {error && <div className="error">{error}</div>}{" "}
          {/* 에러 메시지 표시 */}
          <button type="submit">Login</button>
        </form>
        <button onClick={handleGoogleLogin}>Google Login</button>
      </div>
    </>
  );
};

export default Login;
