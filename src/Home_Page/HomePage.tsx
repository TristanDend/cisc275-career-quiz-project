import React, { useState } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import './HomePage.css';
import Square from '../assets/Square.png';

export function HomePage(): React.JSX.Element {
    return (
        <div>
            <h1 id="homePageTitle"><strong>Da Quiz</strong></h1>
            <Container>
                <Row>
                    <Col>
                        <div id="homePageSubhead"><u>Basic Questions</u></div>
                        <img id="squareImg" src={Square} alt="empty square"/>
                        <br></br>
                        <span id="quizDescription">More Simple Questions, Takes Less Time</span>
                        <br></br>
                        <Button id="questionButton">Go to Basic Questions</Button>
                    </Col>
                    <Col>
                        <div id="homePageSubhead"><u>Detailed Questions</u></div>
                        <img id="squareImg" src={Square} alt="empty square"/>
                        <br></br>
                        <span id="quizDescription">Deeper Questions, Better Results</span>
                        <br></br>
                        <Button id="questionButton">Go to Detailed Questions</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}