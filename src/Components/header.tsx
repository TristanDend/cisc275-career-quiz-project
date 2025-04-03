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
    const [isHome, setHome] = useState<boolean>(true);
    const [isBasic, setBasic] = useState<boolean>(false);
    const [isDetailed, setDetailed] = useState<boolean>(false);

    function changeActive(buttonName: string){
        if(buttonName === "home" && isHome === false){
            setOnHome(true);
            setOnBasic(false);
            setOnDetailed(false);
            setHome(true);
            setBasic(false);
            setDetailed(false);
        }
        else if(buttonName === "basic" && isBasic === false){
            setOnHome(false);
            setOnBasic(true);
            setOnDetailed(false);
            setHome(false);
            setBasic(true);
            setDetailed(false);
        }
        else if(buttonName === "detailed" && isDetailed === false){
            setOnHome(false);
            setOnBasic(false);
            setOnDetailed(true);
            setHome(false);
            setBasic(false);
            setDetailed(true);
        }

    }

    return (
        <div className = 'header'>
            <Button className = 'header-button' onClick={() => {changeActive("home")}} disabled = {isHome}> 
                Home
            </Button>
            <Button className = 'header-button' onClick={() => {changeActive("basic")}} disabled = {isBasic}>
                Simple Quiz
            </Button>
            <Button className = 'header-button' onClick={() => {changeActive("detailed")}} disabled = {isDetailed}>
                Detailed Quiz
            </Button>
        </div>
    )
    
}