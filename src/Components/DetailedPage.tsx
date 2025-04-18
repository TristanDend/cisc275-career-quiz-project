import React, { useRef, useState } from 'react';
import '../CSS/DetailedPage.css';
import { Button, Form} from 'react-bootstrap';
import { questions, Question, Option } from '../assets/DetailedPageQuestions'

// Transferred state variables for page transitions
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
            <div id="quiz-style">
                <center>
                    <h1 className='title'>Detailed Questions</h1>
                </center>
                {/* adds all the questions and answers for Detailed Question page */}
                {Array.from({length: questions.length}, (_, index: number) => (
                    <div key={index} style={{marginBottom: '1.5rem'}}>
                        <p className='question-text' role="question">{questions[index].questionText}</p>
                        {questions[index].questionType === "checkbox" && 
                            Array.from({length: questions[index].options.length}, (_, ind: number) => (
                                // Question 1
                                    <Form.Check
                                        className='answer-text'
                                        key={ind}
                                        name={questions[index].questionId.toString()}
                                        type="checkbox"
                                        value={questions[index].options[ind].optionText}
                                        id={questions[index].questionId.toString()}
                                        label={questions[index].options[ind].optionText}
                                        checked={q1Answers.includes(questions[index].options[ind].optionText)}
                                        onChange={handleCheckBoxChange}
                                    />
                            ))
                        }
                        {questions[index].questionType === "radio" && 
                            Array.from({length: questions[index].options.length}, (_, ind: number) => (
                                // Questions 2 and 3
                                <Form.Check
                                        className="answer-text"
                                        name={questions[index].questionId.toString()}
                                        type="radio"
                                        key={ind}
                                        value={questions[index].options[ind].optionText}
                                        id={questions[index].questionId.toString()}
                                        label={questions[index].options[ind].optionText}
                                        checked={answers[questions[index].questionId - 1] === questions[index].options[ind].optionText}
                                        onChange={changeAnswer}
                                    />
                            ))
                        }
                        {questions[index].questionType === "short-answer" && 
                            // Question 4 & Questions 6 - 9
                            <Form.Control
                                className='short-text'
                                id={questions[index].questionId.toString()}
                                title={"answer-".concat((index + 1).toString())} 
                                role="answer"
                                type="textbox"
                                value={answers[index]}
                                onChange={changeAnswer}
                                />
                            }
                        {questions[index].questionType === "slider" && 
                            // Question 5
                            <div>
                                <input 
                                    className='slider'
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
                <center>
                    <Button disabled={answerPercent !== 100} onClick={toResultsPage} id="submitButton">Get Answers</Button>
                    <Button disabled={!answerPercent} onClick={handleClear} id='clearButton'>Clear Answers</Button>
                </center>
                {/* Elements to display chosen answers for debugging purposes */}
                {/* <div>Answers: {JSON.stringify(answers)}</div>
                <div>Q1 Answers: {JSON.stringify(q1Answers)}</div> */}
            </div>
            {/* All elements necessary to display the progress bar */}
            <div className="progress-wrapper">
                <div className="progress-bar" id="progressBar">
                    <div role="progressContent" id="progress-content" style={{
                        width: `${answerPercent}%`}}>
                        <p className="progress-text">{answerPercent.toFixed(0)}%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}