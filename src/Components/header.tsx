import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import '../CSS/header.css'

interface headerProps {
    // The type is "a function that consumes a boolean and returns nothing"
    //apiKeyWork: number represents the API key status in the form of a three value boolean
    // 0 = no API key, 1 = API key is invalid, 2 = API key is valid
    apiKeyWork: number
    setOnHome: (onHome: boolean) => void
    setOnBasic: (onBasic: boolean) => void
    setOnDetailed: (onDetailed: boolean) => void
    setOnResults: (onResults: boolean) => void
  }
  

export function Header({apiKeyWork, setOnHome, setOnBasic, setOnDetailed, setOnResults}: headerProps) {
    //setting up states

    //Function changes the active button and sets the state of the other buttons to false
    //It also sets the state of the quiz to be displayed to true or false depending on which button is clicked
    function changeActive(buttonName: string){
        if(buttonName === "home"){
            setOnHome(true);
            setOnBasic(false);
            setOnDetailed(false);
            setOnResults(false);
        }
        //Case for the basic quiz button
        else if(buttonName === "basic"){
            setOnHome(false);
            setOnBasic(true);
            setOnDetailed(false);
            setOnResults(false);
        }
        //Case for the detailed quiz button
        else if(buttonName === "detailed"){
            setOnHome(false);
            setOnBasic(false);
            setOnDetailed(true);
            setOnResults(false);
        }

    }

    //What is actually shown on the screen
    //The buttons are disabled if they are the active screen
    return (
        <div className = 'header'>
            <Button id = 'header-button' onClick={() => {changeActive("home")}}> 
                Home
            </Button>
            <Button id = 'header-button' onClick={() => {changeActive("basic")}} disabled={apiKeyWork !== 2}>
                Short Trail
            </Button>
            <Button id = 'header-button' onClick={() => {changeActive("detailed")}} disabled={apiKeyWork !== 2}>
                Long Trail
            </Button>
        </div>
    )
    
}