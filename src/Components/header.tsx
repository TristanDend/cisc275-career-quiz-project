import React, {useState} from 'react';

import { Button } from 'react-bootstrap';
import '../CSS/header.css'

interface headerProps {
    // The type is "a function that consumes a boolean and returns nothing"
    setOnHome: (onHome: boolean) => void
    setOnBasic: (onBasic: boolean) => void
    setOnDetailed: (onDetailed: boolean) => void
  }
  

export function Header({setOnHome, setOnBasic, setOnDetailed}: headerProps) {
    //setting up states
    const [isHome, setHome] = useState<boolean>(true);
    const [isBasic, setBasic] = useState<boolean>(false);
    const [isDetailed, setDetailed] = useState<boolean>(false);

    //Function changes the active button and sets the state of the other buttons to false
    //It also sets the state of the quiz to be displayed to true or false depending on which button is clicked
    function changeActive(buttonName: string){
        //case for if the home button is clicked
        //if the button clicked is not the active button, set the active button to true and the other buttons to false
        if(buttonName === "home" && isHome === false){
            setOnHome(true);
            setOnBasic(false);
            setOnDetailed(false);
            setHome(true);
            setBasic(false);
            setDetailed(false);
        }
        //case for if the basic button is clicked
        //if the button clicked is not the active button, set the active button to true and the other buttons to false
        else if(buttonName === "basic" && isBasic === false){
            setOnHome(false);
            setOnBasic(true);
            setOnDetailed(false);
            setHome(false);
            setBasic(true);
            setDetailed(false);
        }
        //case for if the detailed button is clicked
        //if the button clicked is not the active button, set the active button to true and the other buttons to false
        else if(buttonName === "detailed" && isDetailed === false){
            setOnHome(false);
            setOnBasic(false);
            setOnDetailed(true);
            setHome(false);
            setBasic(false);
            setDetailed(true);
        }

    }

    //What is actually shown on the screen
    //The buttons are disabled if they are the active button
    return (
        <div className = 'header'>
            <Button id = 'header-button' onClick={() => {changeActive("home")}} disabled = {isHome}> 
                Home
            </Button>
            <Button id = 'header-button' onClick={() => {changeActive("basic")}} disabled = {isBasic}>
                Simple Quiz
            </Button>
            <Button id = 'header-button' onClick={() => {changeActive("detailed")}} disabled = {isDetailed}>
                Detailed Quiz
            </Button>
        </div>
    )
    
}