import React from "react";
import Stopwatch from "./Stopwatch";
import { isMobile } from "react-device-detect";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import "./Home.scss";
import clockImg from "./clock.svg";

const Home = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <div className="clock">
        <div className="timer-container">
          <img src={clockImg} alt="login" />
          <Stopwatch view={"Desktop"} start={!isMobile} uid={currentUser.uid} />
        </div>
        <div className="timer-container">
          <img src={clockImg} alt="login" />
          <Stopwatch view={"Mobile"} start={isMobile} uid={currentUser.uid} />
        </div>
      </div>
      <button className="blob-btn" onClick={handleLogout}>
        {" "}
        Logout
        <div className="blob-btn__inner">
          <div className="blob-btn__blobs">
            <div className="blob-btn__blob"></div>
            <div className="blob-btn__blob"></div>
            <div className="blob-btn__blob"></div>
            <div className="blob-btn__blob"></div>
          </div>
        </div>
      </button>
    </div>
  );
};
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="goo">
      <feGaussianBlur
        in="SourceGraphic"
        result="blur"
        stdDeviation="10"
      ></feGaussianBlur>
      <feColorMatrix
        in="blur"
        mode="matrix"
        values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
        result="goo"
      ></feColorMatrix>
      <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
    </filter>
  </defs>
</svg>;

export default Home;
