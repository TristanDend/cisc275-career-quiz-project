import React, {useState} from 'react';

import { Button } from 'react-bootstrap';
import '../CSS/header.css'

export function Header(){

    const[isHome, setHome] = useState<Boolean>(true);
    const[isBasic, setBasic] = useState<Boolean>(false);
    const[isDetailed, setDetailed] = useState<Boolean>(false);

    function changeActive(buttonName: string){
        if(buttonName === "home" && isHome === false){
            setHome(true);
            setBasic(false);
            setDetailed(false);
        }
        else if(buttonName === "basic" && isBasic === false){
            setHome(false);
            setBasic(true);
            setDetailed(false);
        }
        else if(buttonName === "basic" && isBasic === false){
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