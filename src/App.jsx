import _ from "lodash";
import React, { useEffect, useState } from 'react';
import "./App.css";
import Landing from "./components/landing";
import Home from "./components/home";
import Espectrómetro from "./components/espectrometro";
import Results from "./components/results";
import { CuestionarioUser, shuffleArray } from "./uttils/options";
import Question from "./components/questionsUser";
import Header from "./components/header";
import { candidates } from "./uttils/options";
import axios from "axios";
import Logo from "./components/logo";


function App() {
  const [currentStep, setCurrentStep] = useState("landing");
  const [randomCandidates, setRandomCandidates] = useState({})
  const [personalResults, setPersonalResults] = useState({})
  const [userData, setUserData] = useState({})
  const setPlayAgain = ()=> setCurrentStep("home");
  const Result = ({ setPlayAgain }) => {
    return <Results personalResults={personalResults} candidates={randomCandidates} setPlayAgain={setPlayAgain}/>;
  };




  const sendToDirectus = async (data)=>{
    const body = {
      localidad: data['location'],
      edad: data['age'],
      genero: data['gender'],
      respuestas: personalResults
  }
    const response = await axios.post('https://content.merepresenta.info/items/respuestas_espectometro',body,{ 
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer iKETGevoDyRC6o8sVK3sWp8Tr8pKn5TW" 
            }
            
        })
  }

  const handleUsrData = (id, data, lastEl)=>{
    const dataUser = {...userData,
      [id]:data}
    setUserData(dataUser)


    if(lastEl)sendToDirectus(dataUser)
      
  }

  useEffect(()=>{
    setRandomCandidates(shuffleArray(candidates))
  },[])

  const setres = (res)=>{
    setPersonalResults(res)
  }
  const questionOptions = {};
  
  CuestionarioUser.forEach((el,idx,arr) =>{
    questionOptions[el.id] = () => <Question follow={() => setCurrentStep(el.follow)} options={el.options} title={el.title} id={el.id} lastEl={idx === arr.length - 1} setOption={handleUsrData}/>
  })

  const steps = {
    "landing": () => <Landing follow={() => setCurrentStep("home")}/>,
    "home": () => <Home follow={() => setCurrentStep("game")}/>,
    "game": () => <Espectrómetro follow={() => setCurrentStep("location")} candidates={randomCandidates} setResults={setres} />,
    ...questionOptions,
    "result": () => <Result setPlayAgain={setPlayAgain} />
  };

  const Step = _.get(steps, currentStep);
  return (
    <> 
      {currentStep !== 'landing' && <Header follow={() => setCurrentStep("home")}/>}
      <Step />
      {currentStep !== 'landing' && <footer className="general-footer">
        <Logo />
      </footer>}
      
    </>
  )
}

export default App
