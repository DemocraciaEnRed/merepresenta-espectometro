import React from "react";
import WithBackground from "../withBackground";
import Logo from "../logo";
import Background from '../../images/roundBackground.svg';
import 'animate.css';
import "./index.css";

const Landing = ({ follow }) => <div className="animate__animated animate__fadeOut animate__delay-4s" onAnimationEnd={follow}>
  <WithBackground background={Background}>
    <div className="centered animate__animated animate__fadeIn animate__delay-1s">
      <p className="game-name">¿De qué  <br />
      lado están?</p>
    </div>
  </WithBackground>
</div>

export default Landing;