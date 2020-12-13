import React, { useState, useRef } from "react";
import Login from "./Login";
import Register from "./Register";
import "./LoginHome.scss";

const LoginHome = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const rightSideRef = useRef();

  function changeState() {
    if (isLoginActive) {
      rightSideRef.current.classList.remove("right");
      rightSideRef.current.classList.add("left");
    } else {
      rightSideRef.current.classList.add("right");
      rightSideRef.current.classList.remove("left");
    }

    setIsLoginActive(!isLoginActive);
  }

  const current = isLoginActive ? "Register" : "Login";
  return (
    <div className="LoginHome">
      <div className="login">
        <div className="container">
          {isLoginActive && <Login />}
          {!isLoginActive && <Register />}
        </div>
        <RightSide
          current={current}
          forwardedRef={rightSideRef}
          onClick={changeState}
        />
      </div>
    </div>
  );
};

const RightSide = (props) => {
  return (
    <div
      className="right-side"
      ref={props.forwardedRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default LoginHome;
