import React, { useEffect, useState } from "react";
import WithBackground from "../withBackground";
import Logo from "../logo";
import Background from '../../images/roundBackground.svg';
import izquierda from '../../images/izquierda.svg'
import derecha from '../../images/derecha.svg'
import { ReactComponent as TwitterIcono } from "../../images/iconoX.svg";
import { ReactComponent as WhatsappIcono } from "../../images/iconoWhats.svg";
import { ReactComponent as LinkIcono } from "../../images/iconoLink.svg";

import vof from '../../images/vof.png';
import trivia from '../../images/trivia.png';
import compas from '../../images/compas.png';
import quienDijo from '../../images/quien-dijo.png';

import 'animate.css';
import "./index.css";
import axios from "axios";


const getPosition = (value, candidate) =>{
    if (value < -100 || value > 100) {
        console.error("El valor está fuera del rango válido de -100 a 100.");
        return null;
    }
    // Calcular el porcentaje
    const porcentaje = (parseInt(value) + 100) / 200 * 100;
    return `${value}%`;

}



const Results = ({ personalResults, candidates, setPlayAgain}) => {
    const [perRes] = useState(personalResults)
    const [promRes, setPromRes] = useState({})
    const [quantityResults, setQuantityResults] = useState(0)


    const getResults =async ()=>{
        
        const response = await axios.get('https://content.merepresenta.info/items/respuestas_espectometro')
        const datos = await response.data.data.map(el => el.respuestas)
        const promedio = datos.reduce((resultado, objeto) => {
            Object.keys(objeto).forEach((clave) => {
                resultado[clave] = (resultado[clave] || 0) + objeto[clave];
            });
            return resultado;
        }, {});
        setQuantityResults(response.data.data.length);
        
        const cantidadObjetos = datos.length;
        Object.keys(promedio).forEach((clave) => {
            promedio[clave] /= cantidadObjetos;
        });
        
        setPromRes(promedio)
    }

    const textShare = `En un eje izquierda/derecha, ¿cómo posicionarías a las candidaturas electorales 2023? \n ¡Jugá y compará tu opinión con el resto! Entrá ahora a "¿De qué lado están?" de #MeRepresenta y descubrí que tan alineado estás con los demás! \n\nEntra a https://dequelado.merepresenta.info/ para Jugar`

    const shareOnWhatsApp = () => {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textShare)}`;
      window.open(whatsappUrl, '_blank');
    };

    const shareOnTwitter = () => {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textShare)}`;
      window.open(twitterUrl, '_blank');
    };

    const copyToClipboard = () => {
      navigator.clipboard.writeText(textShare);
    };

    useEffect( ()=>{
        getResults()
        setTimeout(() => {
            const overlay = document.getElementById('overlay')
            if (overlay) {
                overlay.remove()
            }
        }, 3000);
    },[])

    return (
        <div className="mb-6" >
            <div className="overlay animate__animated animate__fadeOut animate__delay-3s" id="overlay" style={{backgroundImage:`url(${Background})`}}>
                <div id="loading"></div>

            </div>
            <WithBackground background={Background}>
                <div className="game-wrapper">
                    <p className="game-name">
                        Conocé los resultados
                    </p>
                    <p className="game-description-result">
                    Compará tu opinión con el promedio general. <br />
                    <span>*Tu elección se ve más transparente.</span>
                    </p>
                    <p className="others-players ">
                        Cantidad de participantes: {quantityResults}
                    </p>
                    <div className="game-content mt-3">
                        <div className="game">
                            <div className="lateral">
                                <img src={izquierda} alt="" height={100}  />
                            </div>
                            <div className="result-sliders">
                                {candidates.map((candidate,idx)=><div key={idx}>
                                    <div className="text-result">
                                        <span id={'rangeValue-'+ candidate.value} style={{left:  getPosition(perRes[candidate.value], candidate.value)}}>
                                        {Math.abs(perRes[candidate.value])}%

                                        </span>

                                    </div>
                                    <div className="text-result others">
                                        <span id={'rangeValue-'+ candidate.value} style={{left:  getPosition(promRes[candidate.value], candidate.value)}}>
                                        {Math.abs(promRes[candidate.value]).toFixed()}%

                                        </span>

                                    </div>
                                    <input type="range" name={candidate.value} min={-100} max={100} value={promRes[candidate.value]} disabled id={candidate.value}/>
                                    <input type="range" name={candidate.value} min={-100} max={100} className="player-results" value={perRes[candidate.value]} disabled id={candidate.value} />
                                </div> 
                                )}
                                
                            </div>
                            <div className="lateral">
                                <img src={derecha} alt="" height={100} />
                            </div>

                        </div>
                    </div>
                    <div className="action">

                    </div>
                </div>
                <section className="mt-4 social-wrapper text-center">
                    <p className="share-text">Compartí tu resultado en Redes sociales</p> 
                <div className="mb-4 d-flex justify-content-center">
                    <a onClick={shareOnTwitter} className="iconos">
                    <TwitterIcono alt="twitter" />
                    </a>
                    <a onClick={shareOnWhatsApp}  className="iconos">
                    <WhatsappIcono alt="twitter" />
                    </a>
                    <a onClick={copyToClipboard} className="iconos">
                    <LinkIcono alt="twitter" />
                    </a>
                    
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <button className="btn btn-dark" variant="outline-light" onClick={setPlayAgain}>volve a jugar</button>
                    <p className="call-to">Te invitamos a Jugar a:</p> 
                    <div className="d-flex flex-wrap justify-content-center">
                        <a href="https://verdaderofalso.merepresenta.info/" >
                        <img className="game-images" src={vof} alt="Jugar a verdadero o falso" />
                        </a>
                        <a href="https://trivia.merepresenta.info/" >
                        <img className="game-images" src={trivia} alt="Jugar a trivia" />
                        </a>
                        <a href="https://quiendijo.merepresenta.info/" >
                        <img className="game-images" src={quienDijo} alt="Jugar a quien dijo" />
                        </a>
                        <a href="https://compaspolitico.merepresenta.info/" >
                        <img className="game-images" src={compas} alt="Jugar a compas politico" />
                        </a>

                    </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                <p>ó</p>
                <p className="">Encontrá más info sobre las elecciones en: </p>
                <button target="_blank" href="https://merepresenta.info/" className="btn btn-dark" variant="light">#MEREPRESENTA</button>
                </div>
                </section>
            </WithBackground>
        </div>
    )
}

export default Results;