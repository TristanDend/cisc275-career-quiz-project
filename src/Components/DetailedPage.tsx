import React, { useState } from 'react';
import '../CSS/DetailedPage.css';
import { Button, Form} from 'react-bootstrap';
import { questions, Question, Option } from '../assets/DetailedPageQuestions'


interface DetailedPageProps {
    setOnDetailed: (onDetailed: boolean) => void
    setOnResults: (onResults: boolean) => void
}

export function DetailedPage({setOnDetailed, setOnResults} : DetailedPageProps): React.JSX.Element {
    const [answers, takeAnswers] = useState<string[]>(new Array(questions.length).fill("")); // for all questions and answers in page
    const [q1Answers, q1TakeAnswers] = useState<string[]>([]); // for question 1 answers (specific due to being checklist)
    const answerPercent = ((answers.filter((answer) => answer !== "").length / answers.length) * 100); // for progress bar answer check

    // updates the answers values when the user makes an input
    function changeAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        const newAnswers = [...answers];
        newAnswers[parseInt(event.target.id) - 1] = event.target.value;
        takeAnswers(newAnswers);
    }

    // turns the quiz off and turns results page on
    function toResultsPage() {
        setOnDetailed(false);
        setOnResults(true);
    }
    
    // updates the answers values specfically for question 1 when the user makes an input
    function handleCheckBoxChange(event: React.ChangeEvent<HTMLInputElement>) {
        const currSelect = event.target.value;
        let newq1Answers: string[];
        if (q1Answers.includes(currSelect)) {
            newq1Answers = q1Answers.filter((answer) => answer !== currSelect);
        } else {
            newq1Answers = [...q1Answers, currSelect];
        }
        q1TakeAnswers(newq1Answers);
        const newAnswers = [...answers];
        newAnswers[0] = newq1Answers.join();
        takeAnswers(newAnswers);
    }

    // clears all values when "Clear Answers" is pressed
    function handleClear() {
        takeAnswers(Array<string>(answers.length).fill(""));
        q1TakeAnswers([]);
    }

    return (
        <div id="page-style">
            <center>
                <h1>Detailed Questions</h1>
            </center>
            {/* adds all the questions and answers for Detailed Question page */}
            {Array.from({length: questions.length}, (_, index: number) => (
                <div key={index} style={{marginBottom: '1.5rem'}}>
                    <p className = 'question-text' role="question">{questions[index].questionText}</p>
                    {questions[index].questionType === "checkbox" && 
                        Array.from({length: questions[index].options.length}, (_, ind: number) => (
                            <Form.Check 
                                className ='question-text'
                                name={questions[index].questionId.toString()}
                                key={ind}
                                type="checkbox"
                                value={questions[index].options[ind].optionText}
                                id={questions[index].questionId.toString()}
                                label={questions[index].options[ind].optionText}
                                checked={q1Answers.includes(questions[index].options[ind].optionText)}
                                onChange={handleCheckBoxChange}
                            />
                        ))
                    }
                    {questions[index].questionType === "short-answer" && 
                        <Form.Control
                            className = 'question-text'
                            id={questions[index].questionId.toString()}
                            title={"answer-".concat((index + 1).toString())} 
                            role="answer"
                            type="textbox"
                            value={answers[index]}
                            onChange={changeAnswer}
                            />
                        }
                    {questions[index].questionType === "slider" && 
                        <div>
                            <input 
                                id={questions[index].questionId.toString()}
                                type="range"
                                role="answer"
                                min="1"
                                max="10"
                                title={"answer-".concat((index + 1).toString())}
                                list="scale"
                                value={answers[index]}
                                onChange={changeAnswer}
                                />
                            <datalist id="scale">
                                {Array.from({length: 10}, (_, ind: number) => (
                                    <option key={ind} value={(ind + 1).toString()} label={(ind + 1).toString()}></option>
                                ))}
                            </datalist>
                        </div>
                        }
                </div>
            ))}
            <br></br>
            <div style={{ marginBottom: '1rem' }}>
                <div id="progress-bar">
                    <div role="progressContent" id="progress-content" style={{
                        width: `${answerPercent}%`}}></div>
                </div>
            </div>
            <center><Button onClick={toResultsPage} id = "questionButton">Get Answers</Button></center>
            <Button onClick={handleClear} id='questionButton'>Clear Answers</Button>
            {/* <div>Answers: {JSON.stringify(answers)}</div>
            <div>Q1 Answers: {JSON.stringify(q1Answers)}</div> */}
        </div>
    )
}