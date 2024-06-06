import React from "react";
import "../css/Login.css";
import NavBar from "./NavBar";

const Login = () => {
  return (
    <>
      <NavBar />
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
