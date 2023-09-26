import React, { useEffect } from "react";
import WithBackground from "../withBackground";
import Logo from "../logo";
import Background from '../../images/roundBackground.svg';
import izquierda from '../../images/izquierda.svg'
import derecha from '../../images/derecha.svg'
import 'animate.css';
import "./index.css";


const Espectrómetro = ({follow, setResults, candidates}) => {

    const handleSend = async (event)=>{
        event.target.disabled = true
        const results = {}
        const sliders = document.querySelectorAll('input[type="range"]')
        sliders.forEach(val => results[val.id]=parseInt(val.value))
        setResults(results)
       
        follow()
    }

    const handleSlide = (event) =>{
        const resultSpan = document.getElementById('result-'+event.target.id)
        resultSpan.style.left = (parseInt(event.target.value) + 100) / 200 * 100 + "%"
        resultSpan.innerHTML = Math.abs(event.target.value) !== 0 ? Math.abs(event.target.value)+"%" : ''
        const candidateName = document.getElementById('name-'+event.target.id)
        if (candidateName.style.display !== 'none') candidateName.style.display = 'none'
        if(Math.abs(event.target.value) === 0) candidateName.style.display = 'block'
    }


    return (
        <div className="" >
            <WithBackground background={Background}>
                <div className="game-wrapper">
                    <p className="game-name">
                        Posicioná las candidaturas
                    </p>
                    <p className="others-players">
                    Arrastrá la foto y ubicala donde creas que corresponde
                    </p>
                    <div className="game-content mt-3">
                        <div className="game">
                            <div className="lateral">
                                <img src={izquierda} alt="" height={100}  />
                            </div>
                            <div className="sliders">
                                {candidates.map((candidate,idx)=> <div key={idx}>
                                    <div className="result-wrapper">
                                        <span id={'result-'+candidate.value}></span>

                                    </div>
                                    <input type="range" name="candidate" min={-100} max={100} defaultValue={0} id={candidate.value} onChange={handleSlide}/>
                                    <p className="name-candidate" id={'name-'+candidate.value} >{candidate.name}</p>
                                </div>
                                )}
                                
                            </div>
                            <div className="lateral">
                                <img src={derecha} alt="" height={100} />
                            </div>

                        </div>
                    </div>
                    <div className="action">
                        <button className="btn btn-outline-secondary mt-3 w-25 text-uppercase" onClick={handleSend} > enviar </button>

                    </div>
                </div>
                <div className="logo-wrapper-game">
                    <Logo />
                </div>
            </WithBackground>
        </div>
    )
}

export default Espectrómetro;