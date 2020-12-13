import React, { useRef, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from "react-router-dom";
import loginImg from "./login.svg";
import "./style.scss";

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const history = useHistory()

  async function handleSubmit(e) {
    try {
      setError("")
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }
  }
  return (
    <div className="base-container">
      <div className="header ">Login</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} alt="login" />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input type="email" name="email" placeholder="email" ref={emailRef} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" ref={passwordRef}/>
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
