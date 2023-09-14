import React from "react";
import WithBackground from "../withBackground";
import Logo from "../logo";
import Background from '../../images/roundBackground.svg';
import 'animate.css';
import "./index.css";

const Landing = ({ follow }) => <div className="animate__animated animate__fadeOut animate__delay-4s" onAnimationEnd={follow}>
  <WithBackground background={Background}>
    <div className="centered animate__animated animate__fadeIn animate__delay-1s">
      <p className="game-name">Espectrómetro <br />
        Político</p>
    </div>
      <div className="logo-wrapper animate__animated animate__fadeIn animate__delay-1s">

        <Logo />
      </div>
  </WithBackground>
</div>

export default Landing;