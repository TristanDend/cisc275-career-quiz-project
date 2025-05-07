import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import '../CSS/HomePage.css';
import Square from '../assets/Square.png';

interface HomePageProps {
    apiKeyWork: number
    setOnBasic: (onBasic: boolean) => void
    setOnHome: (onHome: boolean) => void
    setOnDetailed: (onDetailed: boolean) => void
}


export function HomePage({apiKeyWork, setOnBasic, setOnHome, setOnDetailed} : HomePageProps): React.JSX.Element {


    function changeActive(buttonName: string) {
        //case for if the home button is clicked

        //case for if the basic button is clicked
        if(buttonName === "basic"){
            setOnHome(false);
            setOnBasic(true);
            setOnDetailed(false);
        }
        //case for if the detailed button is clicked
        else if(buttonName === "detailed"){
            setOnHome(false);
            setOnBasic(false);
            setOnDetailed(true);
        }
    }

    return (
        <div id="homePageWhole">
            <h1 id="homePageTitle"><strong>Career Pathfind</strong></h1>
            <h2 id="titleCaption"><strong>Unearth Your Own Path</strong></h2>
            <div id="quizBlock">
                {/* Quiz Title */}
                <div id="homePageSubhead"><strong>Short Trail</strong></div>
                {/* Quiz Description */}
                <span id="quizDescription">More Simple Questions, Takes Less Time</span>
                <span id="quizDescription">18 Questions, ~2 minutes</span>
                {/* Button to go to Basic Questions */}
                <center><Button id="questionButton" onClick = {() => {changeActive('basic')}}>Take Short Trail =={'>'}</Button></center>
            </div>
            <div id="quizBlock">
                {/* Quiz Title */}
                <div id="homePageSubhead"><strong>Longer Trail</strong></div>
                {/* Quiz Description */}
                <span id="quizDescription">Deeper Questions, Better Results</span>
                <span id="quizDescription">9 Questions, ~5 minutes</span>
                {/* Button to go to Detailed Questions */}
                <center><Button id="questionButton" onClick = {() => {changeActive("detailed")}}>{'<'}== Take Longer Trail</Button></center>
            </div>
        </div>
    )
}

`
 * {/* Container creates two columns, each column is for a quiz */}
<Container>
        <Row>
            <Col id="quizBlock">
                {/* Quiz Title */}
                <div id="homePageSubhead"><strong>Basic Questions</strong></div>
                {/* Placeholder image */}
                <img id="squareImg" src={Square} alt="empty square"/>
                <br></br>
                {/* Quiz Description */}
                <span id="quizDescription">More Simple Questions, Takes Less Time</span>
                <br></br>
                {/* Button to go to Basic Questions */}
                <center><Button id="questionButton" onClick = {() => {changeActive('basic')}}>Go to Basic Questions</Button></center>
            </Col>
            <Col id="quizBlock">
                {/* Quiz Title */}
                <div id="homePageSubhead"><strong>Detailed Questions</strong></div>
                {/* Placeholder image */}
                <img id="squareImg" src={Square} alt="empty square"/>
                <br></br>
                {/* Quiz Description */}
                <span id="quizDescription">Deeper Questions, Better Results</span>
                <br></br>
                {/* Button to go to Detailed Questions */}
                <center><Button id="questionButton" onClick = {() => {changeActive("detailed")}}>Go to Detailed Questions</Button></center>
            </Col>
        </Row>
    </Container>
`