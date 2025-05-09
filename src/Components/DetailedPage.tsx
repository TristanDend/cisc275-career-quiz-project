import React, { useState } from 'react';
import '../CSS/DetailedPage.css';
import hike from '../assets/daytime_hike.png'
import flag from '../assets/finishFlag.png'
import run from '../assets/stickmanRunning.gif'
import { Button, Form } from 'react-bootstrap';
import { questions } from '../assets/DetailedPageQuestions'

// Transferred state variables for page transitions
interface DetailedPageProps {
    setDetailedAns: (detailedAns: string[][]) => void;
    setOnDetailed: (onDetailed: boolean) => void;
    setOnResults: (onResults: boolean) => void;
    setQuizAnswered: (quizAnswered: string) => void;
}

export function DetailedPage({setDetailedAns, setOnDetailed, setOnResults, setQuizAnswered} : DetailedPageProps): React.JSX.Element {
    const [answers, takeAnswers] = useState<string[]>(new Array(questions.length).fill("")); // for all questions and answers in page
    const [q1Answers, q1TakeAnswers] = useState<string[]>([]); // for question 1 answers (specific due to being checklist)
    const [currQuestion, changeQuestion] = useState<number>(0); // to keep track of what question the user is on
    const answerPercent = ((answers.filter((answer) => answer !== "").length / answers.length) * 100); // for progress bar answer check
    
    // Debug and demo function to answer all questions on one button click
    function randomizeAnswers() {
        let newq1Answers = questions[0].options.map((option) => Math.random() > 0.5 ? option.optionText : "")
        q1TakeAnswers(newq1Answers.filter((answer) => answer));
        const newAnswers = [
            newq1Answers.filter((answer) => answer).join(),
            questions[1].options[Math.floor(Math.random() * 6)].optionText,
            questions[2].options[Math.floor(Math.random() * 4)].optionText,
            "My favorite hobby is playing video games because they offer an endless source of entertainment and excitement. With such a wide variety of genres, stories, and gameplay styles, there's always something new to discover. Whether it's exploring vast open worlds, solving challenging puzzles, or competing with friends, video games provide a constantly evolving experience that never gets old.",
            Math.floor(Math.random() * 10 + 1).toString(),
            "I hope to earn lots of money from my job because I want to be very rich and have lots of dollarydoos to spend lots of doubloons.",
            "I would spend my time going for a long walk on the beach with the goodest of boys, my gray dobbermann Craig Jenson. I would bring my frisbee to play catch with him and we would have a great time.",
            "My deepest fear is forgetting my memories—being swallowed by something like Dementia. It's not just forgetting facts or faces; it's the slow erosion of everything that makes you you. Every moment, every experience, no matter how small, shapes your identity. And to lose them, piece by piece, is like watching your soul rot away while you're still alive. You don’t just forget where you put your keys—you forget your childhood, your dreams, your loved ones, even your own name. You become a stranger trapped in your own decaying mind, helpless to stop the unraveling. And worse, those who love you are forced to stand by, powerless, watching the light in your eyes dim day by day. They grieve you while you’re still breathing. Eventually, you're not a person anymore—just a shell, a haunted echo of someone who once lived. There’s no peace in it, only the cruel, silent horror of vanishing while still being seen.",
            "My best soft skills are communication, time management, consistency, problem-solving, teamwork, and adaptability. "
        ]
        takeAnswers(newAnswers);
    }

    // updates the answers value for the text answer questions
    function changeTextAnswer(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const newAnswers = [...answers];
        newAnswers[parseInt(event.target.id) - 1] = event.target.value;
        takeAnswers(newAnswers);
    }

    // updates the answers values when the user makes an input
    function changeAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        const newAnswers = [...answers];
        newAnswers[parseInt(event.target.id) - 1] = event.target.value;
        takeAnswers(newAnswers);
    }

    // turns the quiz off and turns results page on and brings answers over
    function toResultsPage() {
        const answerArray: string[][] = new Array<string[]>(answers.length).fill([])
        setDetailedAns(answerArray.map((answer: string[], index: number) => answer = [answers[index]]))
        setQuizAnswered("Detailed Quiz");
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
        changeQuestion(0);
    }

    return (
        <div style={{ 
            borderTop: '.5rem solid #90C67C',
            borderBottom: '.5rem solid #90C67C',
            }}>
            {/* Full page besides the progress bar */}
            <div id='page-style'>
                <img src={hike} style={{ 
                        position: 'absolute',
                        width: '100%',
                        display: 'block',
                        transform: `scale(${100 + answerPercent}%)`,
                        transition: 'transform 0.3s ease',
                        zIndex: '-1',
                        overflow: 'hidden'
                    }}></img>
                <div id="quiz-style" style={{ borderRadius: '3%', marginTop: '2rem', marginBottom: '2rem' }}>
                    {/* Page Title */}
                    <center><h1 className='title'>Long Trail</h1></center>
                    
                    {/* adds all the questions and answers for Detailed Question page one at a time. */}
                    <div style={{ marginBottom: '2rem' }}>
                        <p className='question-text' role="question">{questions[currQuestion].questionText}</p>
                        {questions[currQuestion].questionType === "checkbox" && 
                            Array.from({length: questions[currQuestion].options.length}, (_, ind: number) => (
                                // Question 1
                                    <Form.Check
                                        className='answer-text'
                                        key={ind}
                                        name={questions[currQuestion].questionId.toString()}
                                        type="checkbox"
                                        value={questions[currQuestion].options[ind].optionText}
                                        id={questions[currQuestion].questionId.toString()}
                                        label={questions[currQuestion].options[ind].optionText}
                                        checked={q1Answers.includes(questions[currQuestion].options[ind].optionText)}
                                        onChange={handleCheckBoxChange}
                                    />
                            ))
                        }
                        {questions[currQuestion].questionType === "radio" && 
                            Array.from({length: questions[currQuestion].options.length}, (_, ind: number) => (
                                // Questions 2 and 3
                                <Form.Check
                                        className="answer-text"
                                        name={questions[currQuestion].questionId.toString()}
                                        type="radio"
                                        key={ind}
                                        value={questions[currQuestion].options[ind].optionText}
                                        id={questions[currQuestion].questionId.toString()}
                                        label={questions[currQuestion].options[ind].optionText}
                                        checked={answers[questions[currQuestion].questionId - 1] === questions[currQuestion].options[ind].optionText}
                                        onChange={changeAnswer}
                                    />
                            ))
                        }
                        {questions[currQuestion].questionType === "short-answer" && 
                            // Question 4 & Questions 6 - 9
                            <textarea
                                className='short-text'
                                id={questions[currQuestion].questionId.toString()}
                                title={"answer-".concat((currQuestion + 1).toString())} 
                                role="answer"
                                value={answers[currQuestion]}
                                onChange={changeTextAnswer}
                                />
                            }
                        {questions[currQuestion].questionType === "slider" && 
                            // Question 5
                            <div>
                                <input 
                                    className='slider'
                                    id={questions[currQuestion].questionId.toString()}
                                    type="range"
                                    role="answer"
                                    min="1"
                                    max="10"
                                    title={"answer-".concat((currQuestion + 1).toString())}
                                    list="scale"
                                    value={answers[currQuestion]}
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
                    {/* All user buttons to go between questions, clear answers, and submit results */}
                    <center>
                        <Button disabled={!currQuestion} onClick={() => {changeQuestion(currQuestion - 1)}} id='submitButton'>&lt;&lt; Previous</Button>
                        <Button disabled={!answerPercent} onClick={handleClear} id='clearButton'>Clear Answers</Button>
                        <Button hidden={currQuestion !== 8} disabled={answerPercent !== 100} onClick={toResultsPage} id="submitButton">Submit Answers</Button>
                        <Button disabled={!answers[currQuestion]} hidden={currQuestion === 8} onClick={() => {changeQuestion(currQuestion + 1)}} id='submitButton'>Next &gt;&gt;</Button>
                        {/* <Button onClick={randomizeAnswers} id="submitButton">Randomize Answers</Button> */}
                    </center>
                </div>
            </div>
            {/* All elements necessary to display the progress bar */}
            <div className="progress-wrapper">
                <div className="progress-bar" id="progressBar">
                    <div role="progressContent" id="progress-content" style={{
                        width: `${answerPercent.toFixed(0)}%`}}>
                        <p className="progress-text">{answerPercent.toFixed(0)}%</p>
                    </div>
                    <img hidden={answerPercent === 100} src={run} id="person-run" style={{
                        left: `${(answerPercent - 1).toFixed(0)}%`,
                        backgroundColor: 'rgb(241, 241, 241)',
                        border: '2px solid black',
                        borderRadius: '100%'
                    }}></img>
                    <img src={flag} id="finish-flag"></img>
                </div>
            </div>
        </div>
    )
}