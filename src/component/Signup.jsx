import React from "react";
import "../css/Signup.css";
import NavBar from "./NavBar";

const Signup = () => {
  return (
    <>
      <NavBar />
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <label>
            Confirm Password:
            <input type="password" name="confirmPassword" />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
