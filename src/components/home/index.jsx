import React from "react";
import WithBackground from "../withBackground";
import Logo from "../logo";
import Background from '../../images/roundBackground.svg';
import 'animate.css';
import "./index.css";

const Home = ({follow}) => {

    return (
        <div className="" >
            <WithBackground background={Background}>
                <div className="centered animate__animated animate__fadeIn animate__delay-1s">
                    <p className="game-name">
                        Espectrómetro <br /> Político
                    </p>
                    <p className="game-description">
                    Posicioná a las candidaturas a presidenciales, en el espectro entre Derecha e Izquierda.  <br />
                    <strong>Y descubrí lo que opinan los demás</strong>
                    </p>
                    <button className="btn btn-dark" onClick={follow} > JUGAR </button>
                </div>
                <div className="logo-wrapper animate__animated animate__fadeIn animate__delay-1s">
                    <Logo />
                </div>
            </WithBackground>
        </div>
    )
}

export default Home;