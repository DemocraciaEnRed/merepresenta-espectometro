import React, { useEffect, useState } from "react";
import WithBackground from "../withBackground";
import Logo from "../logo";
import Background from '../../images/roundBackground.svg';
import izquierda from '../../images/izquierda.svg'
import derecha from '../../images/derecha.svg'
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



const Results = ({ personalResults, candidates}) => {
    const [perRes] = useState(personalResults)
    const [promRes, setPromRes] = useState({})


    const getResults =async ()=>{
        
        const response = await axios.get('https://content.merepresenta.info/items/respuestas_espectometro')
        const datos = await response.data.data.map(el => el.respuestas)
        const promedio = datos.reduce((resultado, objeto) => {
            Object.keys(objeto).forEach((clave) => {
                resultado[clave] = (resultado[clave] || 0) + objeto[clave];
            });
            return resultado;
        }, {});
        
        const cantidadObjetos = datos.length;
        Object.keys(promedio).forEach((clave) => {
            promedio[clave] /= cantidadObjetos;
        });
        
        setPromRes(promedio)
    }


    useEffect( ()=>{
        getResults()
        setTimeout(() => {
            if (document.getElementById('overlay')) {
                document.getElementById('overlay').remove()
            }
        }, 3000);
    },[])

    return (
        <div className="" >
            <div className="overlay animate__animated animate__fadeOut animate__delay-3s" id="overlay" style={{backgroundImage:'url("src/images/roundBackground.svg")'}}>
                <div id="loading"></div>

            </div>
            <WithBackground background={Background}>
                <div className="game-wrapper">
                    <p className="game-name">
                        Posicioná los candidatos
                    </p>
                    <p className="game-description-result">
                    Este es el resultado de lo que opina la ciudadanía sobre sus posiciones <br />
                    <span>*Tus resultados están más claros como referencia</span>
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
                                    <input type="range" name={candidate.value} min={-100} max={100} className="others-results" value={promRes[candidate.value]} disabled id={candidate.value}/>
                                    <input type="range" name={candidate.value} min={-100} max={100} value={perRes[candidate.value]} disabled id={candidate.value} />
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
                <div className="logo-wrapper-game">
                    <Logo />
                </div>
            </WithBackground>
        </div>
    )
}

export default Results;