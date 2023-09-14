import React, { useEffect, useState } from "react";
import WithBackground from "../withBackground";
import Logo from "../logo";
import Background from '../../images/roundBackground.svg';
import izquierda from '../../images/izquierda.svg'
import derecha from '../../images/derecha.svg'
import 'animate.css';
import "./index.css";
import axios from "axios";

const candidates=[
    'milei', 'bregman', 'bullrich', 'massa', 'schiaretti'
]

const getPosition = (value, candidate) =>{
    if (value < -100 || value > 100) {
        console.error("El valor está fuera del rango válido de -100 a 100.");
        return null;
    }
    // Calcular el porcentaje
    const porcentaje = (parseInt(value) + 100) / 200 * 100;
    return `${value}%`;

}



const Results = ({ personalResults}) => {
    const [perRes, setPerRes] = useState(personalResults)
    const [promRes, setPromRes] = useState({})


    /* function generarObjetosAleatorios() {
        const objetos = [];
        
        for (let i = 0; i < 1000; i++) {
          const objeto = {
            milei: getRandomInt(0, 100),
            bregman: getRandomInt(-100, 0),
            bullrich: getRandomInt(-10, 50),
            massa: getRandomInt(-50, 10),
            schiaretti: getRandomInt(-30, 30),
          };
          
          objetos.push(objeto);
        }
        
        return objetos;
      }
      
      // Función auxiliar para obtener un número entero aleatorio en un rango dado
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      } */
      
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
            document.getElementById('overlay').remove()
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
                        Posiciona los candidatos
                    </p>
                    <p className="game-description-result">
                    Este es el resultado de lo que opina la ciudadanía sobre sus posiciones <br />
                    <span>*Tus resultados están mas claros como referencia</span>
                    </p>
                    <div className="game-content mt-3">
                        <div className="game">
                            <div className="lateral">
                                <img src={izquierda} alt="" height={100}  />
                            </div>
                            <div className="result-sliders">
                                {candidates.map((candidate,idx)=><div key={idx}>
                                    <div className="text-result">
                                        <span id={'rangeValue-'+ candidate} style={{left:  getPosition(perRes[candidate], candidate)}}>
                                        {Math.abs(perRes[candidate])}%

                                        </span>

                                    </div>
                                    <div className="text-result others">
                                        <span id={'rangeValue-'+ candidate} style={{left:  getPosition(promRes[candidate], candidate)}}>
                                        {Math.abs(promRes[candidate]).toFixed()}%

                                        </span>

                                    </div>
                                    <input type="range" name={candidate} min={-100} max={100} className="others-results" value={promRes[candidate]} disabled id={candidate}/>
                                    <input type="range" name={candidate} min={-100} max={100} value={perRes[candidate]} disabled id={candidate} />
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