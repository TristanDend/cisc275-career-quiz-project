import React, { useState } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import './HomePage.css';

export function HomePage(): React.JSX.Element {
    return (
        <div>
            <h1>Da Quiz</h1>
            <Container>
                <Row>
                    <Col>
                        <div>Basic Questions</div>
                        <br></br>
                        More Simple Questions, Takes Less Time
                        <Button>Go to Basic Questions</Button>
                    </Col>
                    <Col>
                        <div>Detailed Questions</div>
                        <br></br>
                        Deeper Questions, Better Results
                        <Button>Go to Detailed Questions</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}