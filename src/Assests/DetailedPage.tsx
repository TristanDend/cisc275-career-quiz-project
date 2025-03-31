import React, { useState } from 'react';
import '../CSS/DetailedPage.css';
import { Col, Container, Form, Row } from 'react-bootstrap';

export function DetailedPage(): React.JSX.Element {
    const [answer1, takeAnswer1] = useState<string>("");
    const [answer2, takeAnswer2] = useState<string>("");
    const [answer3, takeAnswer3] = useState<string>("");
    const [answer4, takeAnswer4] = useState<string>("");
    const [answer5, takeAnswer5] = useState<string>("");
    const [answer6, takeAnswer6] = useState<string>("");

    function changeAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        switch (event.target.title) {
            case "answer-1": takeAnswer1(event.target.value); break;
            case "answer-2": takeAnswer2(event.target.value); break;
            case "answer-3": takeAnswer3(event.target.value); break;
            case "answer-4": takeAnswer4(event.target.value); break;
            case "answer-5": takeAnswer5(event.target.value); break;
            case "answer-6": takeAnswer6(event.target.value); break;
        }
    }

    return (
        <div>
            <h1>Detailed Page</h1>
            <Container>
                <Row>
                    <Col>
                        <div>Question 1</div>
                        <Form.Control title="answer-1" type="answer" placeholder="Answer 1" onChange={changeAnswer}></Form.Control>
                    </Col>
                    <Col>
                        <div>Question 2</div>
                        <Form.Control title="answer-2" type="answer" placeholder="Answer 2" onChange={changeAnswer}></Form.Control>
                    </Col>
                    <Col>
                        <div>Question 3</div>
                        <Form.Control title="answer-3" type="answer" placeholder="Answer 3" onChange={changeAnswer}></Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>Question 4</div>
                        <Form.Control title="answer-4" type="answer" placeholder="Answer 4" onChange={changeAnswer}></Form.Control>
                    </Col>
                    <Col>
                        <div>Question 5</div>
                        <Form.Control title="answer-5" type="answer" placeholder="Answer 5" onChange={changeAnswer}></Form.Control>
                    </Col>
                    <Col>
                        <div>Question 6</div>
                        <Form.Control title="answer-6" type="answer" placeholder="Answer 6" onChange={changeAnswer}></Form.Control>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}