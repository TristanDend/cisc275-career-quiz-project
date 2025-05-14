import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import '../CSS/HomePage.css';
import signPost from '../assets/SignpostScene.png'

// homepage props to import state
interface HomePageProps {
    isTestingMode: boolean // testing mode to bypass api key check
    apiKeyWork: number // whether api key works
    setOnBasic: (onBasic: boolean) => void // function to turn on basic page
    setOnHome: (onHome: boolean) => void // function to turn on home page
    setOnDetailed: (onDetailed: boolean) => void // function to turn on detailed page
}


export function HomePage({isTestingMode, apiKeyWork, setOnBasic, setOnHome, setOnDetailed} : HomePageProps): React.JSX.Element {


    // This function takes the name of the button clicked, and displays the correct page accordingly
    // false = close, true = open
    function changeActive(buttonName: string) {

        // case for if the basic button is clicked 
        if(buttonName === "basic"){
            setOnHome(false);
            setOnBasic(true);
            setOnDetailed(false);
        }
        // case for if the detailed button is clicked
        else if(buttonName === "detailed"){
            setOnHome(false);
            setOnBasic(false);
            setOnDetailed(true);
        }
    }

    return (
        <div id="homePageWhole">
            {/* Title and Caption */}
            <h1 id="homePageTitle"><strong>Career Pathfinder</strong></h1>
            <h2 id="titleCaption"><strong>Unearth Your Own Path</strong></h2>
            <div id="quizBlock1">
                {/* Basic Quiz Title */}
                <div id="homePageSubhead">Short Trail</div>
                {/* Quiz Description */}
                <span id="quizDescription">More Simple Questions, Takes Less Time</span>
                <span id="quizDescription">18 Questions, ~2 minutes</span>
                {/* Button to go to Basic Questions */}
                <center><Button disabled={!isTestingMode && apiKeyWork !== 2} id="questionButton" onClick = {() => {changeActive('basic')}}>Take Short Trail =={'>'}</Button></center>
            </div>
            <div id="quizBlock2">
                {/* Detailed Quiz Title */}
                <div id="homePageSubhead">Longer Trail</div>
                {/* Quiz Description */}
                <span id="quizDescription">Deeper Questions, Better Results</span>
                <span id="quizDescription">9 Questions, ~5 minutes</span>
                {/* Button to go to Detailed Questions */}
                <center><Button disabled={!isTestingMode && apiKeyWork !== 2} id="questionButton" onClick = {() => {changeActive("detailed")}}>{'<'}== Take Longer Trail</Button></center>
            </div>
            {/* Block to remind users to enter a valid api key for ChatGPT */}
            <div id="quizBlock3">
                <span id="quizDescription">Please enter a valid ChatGPT</span>
                <span id="quizDescription">API Key to start the quiz.</span>
                <span id="quizDescriptionsi">Powered by AI</span>
            </div>
            {/* background image sits here, scaling to resolution size */}
            <img src={signPost} id="homePageBackgroundImage" alt="signpost"/>
        </div>
    )
}
