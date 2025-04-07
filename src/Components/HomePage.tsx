import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import '../CSS/HomePage.css';
import Square from '../assets/Square.png';

export function HomePage(): React.JSX.Element {
    return (
        <div id="homePageWhole">
            <h1 id="homePageTitle"><strong>Da Quiz</strong></h1>
            {/* Container creates two columns, each column is for a quiz */}
            <Container>
                <Row>
                    <Col id="quizBlock">
                        {/* Quiz Title */}
                        <div id="homePageSubhead"><u>Basic Questions</u></div>
                        {/* Placeholder image */}
                        <img id="squareImg" src={Square} alt="empty square"/>
                        <br></br>
                        {/* Quiz Description */}
                        <span id="quizDescription">More Simple Questions, Takes Less Time</span>
                        <br></br>
                        {/* Button to go to Basic Questions */}
                        <center><Button id="questionButton">Go to Basic Questions</Button></center>
                    </Col>
                    <Col id="quizBlock">
                        {/* Quiz Title */}
                        <div id="homePageSubhead"><u>Detailed Questions</u></div>
                        {/* Placeholder image */}
                        <img id="squareImg" src={Square} alt="empty square"/>
                        <br></br>
                        {/* Quiz Description */}
                        <span id="quizDescription">Deeper Questions, Better Results</span>
                        <br></br>
                        {/* Button to go to Detailed Questions */}
                        <center><Button id="questionButton">Go to Detailed Questions</Button></center>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
