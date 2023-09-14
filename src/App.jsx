import _ from "lodash";
import React, { useState } from 'react';
import "./App.css";
import Landing from "./components/landing";
import Home from "./components/home";
import Espectrómetro from "./components/espectrometro";
import Results from "./components/results";
import { CuestionarioUser } from "./uttils/options";
import Question from "./components/questionsUser";
import Header from "./components/header";


function App() {
  const [currentStep, setCurrentStep] = useState("landing");
  const [personalResults, setPersonalResults] = useState({})
  const [location, setLocation] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const setPlayAgain = _.last(useState());
  const Result = ({ setPlayAgain }) => {
    return <Results personalResults={personalResults}/>;
  };


  const choiceSet=(type)=>{
    switch(type){
      case 'location':
        return setLocation
      case 'age':
        return setAge
      case 'gender':
        return setGender
    }
  }

  const setres = (res)=>{
    setPersonalResults(res)
  }

  const questionOptions = {};
  
  CuestionarioUser.forEach(el =>{
    questionOptions[el.id] = () => <Question follow={() => setCurrentStep(el.follow)} options={el.options} title={el.title} setOption={choiceSet(el.id)}/>
  })

  const steps = {
    "landing": () => <Landing follow={() => setCurrentStep("home")}/>,
    "home": () => <Home follow={() => setCurrentStep("location")}/>,
    ...questionOptions,
    "game": () => <Espectrómetro follow={() => setCurrentStep("result")} setResults={setres} location={location} age={age} gender={gender} />,
    "result": () => <Result setPlayAgain={setPlayAgain} />
  };

  const Step = _.get(steps, currentStep);
  return (
    <> 
      {currentStep !== 'landing' && <Header follow={() => setCurrentStep("home")}/>}
      <Step />
    </>
  )
}

export default App
