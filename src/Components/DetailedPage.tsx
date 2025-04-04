import React, { useState } from 'react';
import '../CSS/DetailedPage.css';
import { Button, Form} from 'react-bootstrap';

export function DetailedPage(): React.JSX.Element {
    const [answers, takeAnswers] = useState<Array<string>>(new Array(6).fill("")); // for all questions and answers in page
    const answerPercent = (answers.filter((answer) => answer !== "").length / answers.length) * 100; // for progress bar answer check

    // updates the answers values when the user makes an input
    function changeAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        const newAnswers = [...answers];
        newAnswers[parseInt(event.target.title.split("-")[1]) - 1] = event.target.value;
        takeAnswers(newAnswers);
    }

    return (
        <div id="page-style">
            <center>
                <h1>Detailed Questions</h1>
            </center>
            {/* adds all the questions and answers for Detailed Question page */}
            {Array.from({length: 6}, (_, index: number) => (
                <div key={index} style={{marginBottom: '1.5rem'}}>
                    <p>Question {index + 1}:</p>
                    <Form.Control
                        id="answer-text-holder"
                        title={"answer-".concat((index + 1).toString())} 
                        type="answer" 
                        value={answers[index]}
                        placeholder={"Answer ".concat((index + 1).toString())} 
                        onChange={changeAnswer}>
                    </Form.Control>
                </div>
            ))}
            <br></br>
            <div style={{ marginBottom: '1rem' }}>
                <div id="progress-bar">
                    <div id="progress-content" style={{
                        width: `${answerPercent}%`}}></div>
                </div>
            </div>
            <center><Button>Get Answers</Button></center>
            <Button onClick={() => takeAnswers(Array(answers.length).fill(""))}>Clear Answers</Button>
        </div>
    )
}