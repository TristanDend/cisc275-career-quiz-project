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
        if(buttonName === "home" && !isHome){
            setOnHome(true);
            setOnBasic(false);
            setOnDetailed(false);
            setHome(true);
            setBasic(false);
            setDetailed(false);
        }
        else if(buttonName === "basic" && !isBasic){
            setOnHome(false);
            setOnBasic(true);
            setOnDetailed(false);
            setHome(false);
            setBasic(true);
            setDetailed(false);
        }
        else if(buttonName === "detailed" && !isDetailed){
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
            <Button id = 'header-button' onClick={() => {setOnHome(true); changeActive("home")}}> 
                Home
            </Button>
            <Button id = 'header-button' onClick={() => {changeActive("basic")}}>
                Simple Quiz
            </Button>
            <Button id = 'header-button' onClick={() => {changeActive("detailed")}}>
                Detailed Quiz
            </Button>
        </div>
    )
    
}