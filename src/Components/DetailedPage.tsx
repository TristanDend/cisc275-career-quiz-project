import React, { useState } from 'react';
import '../CSS/DetailedPage.css';
import { Button, Form} from 'react-bootstrap';

interface DetailedPageProps {
    setOnDetailed: (onDetailed: boolean) => void
    setOnResults: (onResults: boolean) => void
}

export function DetailedPage({setOnDetailed, setOnResults} : DetailedPageProps): React.JSX.Element {
    const [answers, takeAnswers] = useState<Array<string>>(new Array(6).fill("")); // for all questions and answers in page
    const answerPercent = (answers.filter((answer) => answer !== "").length / answers.length) * 100; // for progress bar answer check

    // updates the answers values when the user makes an input
    function changeAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        const newAnswers = [...answers];
        newAnswers[parseInt(event.target.title.split("-")[1]) - 1] = event.target.value;
        takeAnswers(newAnswers);
    }

    // turns the quiz off and turns results page on
    function toResultsPage() {
        setOnDetailed(false);
        setOnResults(true);
    }

    return (
        <div id="page-style">
            <center>
                <h1>Detailed Questions</h1>
            </center>
            {/* adds all the questions and answers for Detailed Question page */}
            {Array.from({length: 6}, (_, index: number) => (
                <div key={index} style={{marginBottom: '1.5rem'}}>
                    <p role="question">Question {index + 1}:</p>
                    <Form.Control
                        id="answer-text-holder"
                        title={"answer-".concat((index + 1).toString())} 
                        role="answer"
                        value={answers[index]}
                        placeholder={"Answer ".concat((index + 1).toString())} 
                        onChange={changeAnswer}>
                    </Form.Control>
                </div>
            ))}
            <br></br>
            <div style={{ marginBottom: '1rem' }}>
                <div id="progress-bar">
                    <div role="progressContent" id="progress-content" style={{
                        width: `${answerPercent}%`}}></div>
                </div>
            </div>
            <center><Button onClick={toResultsPage}>Get Answers</Button></center>
            <Button onClick={() => {takeAnswers(Array(answers.length).fill(""))}}>Clear Answers</Button>
        </div>
    )
}