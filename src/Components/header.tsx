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

    //Function changes the active button and sets the state of the other buttons to false
    //It also sets the state of the quiz to be displayed to true or false depending on which button is clicked
    function changeActive(buttonName: string){
        if(buttonName === "home"){
            setOnHome(true);
            setOnBasic(false);
            setOnDetailed(false);
        }
        else if(buttonName === "basic"){
            setOnHome(false);
            setOnBasic(true);
            setOnDetailed(false);
        }
        else if(buttonName === "detailed"){
            setOnHome(false);
            setOnBasic(false);
            setOnDetailed(true);
        }

    }

    //What is actually shown on the screen
    //The buttons are disabled if they are the active button
    return (
        <div className = 'header'>
            <Button id = 'header-button' onClick={() => {changeActive("home")}}> 
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