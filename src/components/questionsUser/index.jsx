import React, { useEffect } from "react";
import WithBackground from "../withBackground";
import Logo from "../logo";
import Background from '../../images/roundBackground.svg';
import 'animate.css';
import "./index.css";

const Question = ({follow, options, title, setOption, id, lastEl}) => {

    const handleOption = (option)=>{
        setOption(id, option, lastEl)
        follow()
    }

    return (
        <div className="mb-6" >
            <WithBackground background={Background}>
                <div className="">
                    <h1 className="text-secondary-emphasis text-center">
                        {title}
                    </h1>
                    
                    <div className=" row mx-auto justify-content-center">
                        {options.map(option=> <div key={option} className="col-12 text-center" ><button type="button" onClick={()=>handleOption(option)} className=" btn btn-dark btn-lg w-50 m-2">{option}</button></div>)}
                    </div>

                    {/* <button className="btn btn-dark" onClick={follow} > JUGAR </button> */}
                </div>
            </WithBackground>
        </div>
    )
}

export default Question;