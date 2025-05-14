import React, { useState } from 'react';
import '../CSS/DetailedPage.css';
import hike from '../assets/daytime_hike.png'
import flag from '../assets/finishFlag.png'
import run from '../assets/stickmanRunning.gif'
import { Button, Form } from 'react-bootstrap';
import { questions } from '../assets/DetailedPageQuestions'

// Transferred state variables from previous pages to import state
interface DetailedPageProps {
    setDetailedAns: (detailedAns: string[][]) => void; // stores the user answers for results page
    setOnDetailed: (onDetailed: boolean) => void; // function to turn on detailed page
    setOnResults: (onResults: boolean) => void; // function to turn on results page
    setQuizAnswered: (quizAnswered: string) => void; // stores which quiz the user submitted for results page
}

export function DetailedPage({setDetailedAns, setOnDetailed, setOnResults, setQuizAnswered} : DetailedPageProps): React.JSX.Element {
    const [answers, takeAnswers] = useState<string[]>(new Array(questions.length).fill("")); // stores all answers made by the user
    const [q1Answers, q1TakeAnswers] = useState<string[]>([]); // stores the answers made by user for question 1 (specific due to being a checklist)
    const [currQuestion, changeQuestion] = useState<number>(0); // keeps track of which question the user is on (0 = Q1, 1 = Q2, etc.)
    const answerPercent = ((answers.filter((answer) => answer !== "").length / answers.length) * 100); // stores the percentage of answered questions for progress bar
    
    // Debug and demo function to answer all questions on one button click (localhost testing only)
    function randomizeAnswers() {
        let newq1Answers = questions[0].options.map((option) => Math.random() > 0.5 ? option.optionText : "")
        q1TakeAnswers(newq1Answers.filter((answer) => answer));
        const newAnswers = [
            newq1Answers.filter((answer) => answer).join(),
            questions[1].options[Math.floor(Math.random() * 6)].optionText,
            questions[2].options[Math.floor(Math.random() * 4)].optionText,
            `My favorite hobby is playing video games because they offer an endless source of entertainment and excitement. 
             With such a wide variety of genres, stories, and gameplay styles, there's always something new to discover. 
             Whether it's exploring vast open worlds, solving challenging puzzles, or competing with friends, video games 
             provide a constantly evolving experience that never gets old.`,
            Math.floor(Math.random() * 10 + 1).toString(),
            "I hope to earn lots of money from my job because I want to be very rich and have lots of dollarydoos to spend lots of doubloons.",
            `I would spend my time going for a long walk on the beach with the goodest of boys, my gray dobbermann Craig Jenson. 
             I would bring my frisbee to play catch with him and we would have a great time.`,
            `My deepest fear is forgetting my memories—being swallowed by something like Dementia. 
             It's not just forgetting facts or faces; it's the slow erosion of everything that makes you you. 
             Every moment, every experience, no matter how small, shapes your identity. 
             And to lose them, piece by piece, is like watching your soul rot away while you're still alive. 
             You do not just forget where you put your keys—you forget your childhood, your dreams, your loved ones, even your own name. 
             You become a stranger trapped in your own decaying mind, helpless to stop the unraveling. 
             And worse, those who love you are forced to stand by, powerless, watching the light in your eyes dim day by day. 
             They grieve you while you are still breathing. 
             Eventually, you're not a person anymore—just a shell, a haunted echo of someone who once lived. 
             There is no peace in it, only the cruel, silent horror of vanishing while still being seen.`,
            "My best soft skills are communication, time management, consistency, problem-solving, teamwork, and adaptability. "
        ]
        takeAnswers(newAnswers);
    }

    // updates the answers value for the short answer questions when user makes an input
    function changeTextAnswer(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const newAnswers = [...answers];
        newAnswers[parseInt(event.target.id) - 1] = event.target.value;
        takeAnswers(newAnswers);
    }
 
    // updates the answers value for the checklist question when the user makes an input
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

    // updates the answers value for the radio questions when the user makes an input
    function changeAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        const newAnswers = [...answers];
        newAnswers[parseInt(event.target.id) - 1] = event.target.value;
        takeAnswers(newAnswers);
    }

    // turns the detailed page off, turns the results page on, and transfers the user answers over for results
    function toResultsPage() {
        const answerArray: string[][] = new Array<string[]>(answers.length).fill([])
        setDetailedAns(answerArray.map((answer: string[], index: number) => answer = [answers[index]]))
        setQuizAnswered("Detailed Quiz");
        setOnDetailed(false);
        setOnResults(true);
    }

    // resets all answer values to unanswered states when user clicks the "Clear Answers" button
    function handleClear() {
        takeAnswers(Array<string>(answers.length).fill(""));
        q1TakeAnswers([]);
        changeQuestion(0);
    }

    return (
        <div style={{borderTop: '.5rem solid #90C67C',
            borderBottom: '.5rem solid #90C67C'}}>

            {/* Full page besides the progress bar */}
            <div id='detailed-page-style'>

                {/* Quiz portion of the page */}
                <div id="detailed-quiz-style">

                    {/* Detailed Quiz title */}
                    <center><h1 className='detailed-title'>Long Trail</h1></center>
                    
                    {/* Single question and answer choices */}
                    <div>

                        {/* Question text */}
                        <p className='detailed-question-text' role="question">
                            {questions[currQuestion].questionText}</p>
                        
                        {/* Question 1 (Select all that apply list of options) */}
                        <div className='detailed-check-radio-wrapper'>
                            {questions[currQuestion].questionType === "checkbox" && 
                                Array.from({length: questions[currQuestion].options.length}, (_, ind: number) => (

                                    // Question 1 answer options
                                    <Form.Check
                                        className='detailed-checkbox-radio'
                                        key={ind}
                                        name={questions[currQuestion].questionId.toString()}
                                        type="checkbox"
                                        role="answer"
                                        value={questions[currQuestion].options[ind].optionText}
                                        id={questions[currQuestion].questionId.toString().concat(` + ${ind}`)}
                                        label={questions[currQuestion].options[ind].optionText}
                                        checked={q1Answers.includes(questions[currQuestion].options[ind].optionText)}
                                        onChange={handleCheckBoxChange}
                                    />
                                ))
                            }
                        </div>

                        {/* Questions 2 and 3 (Multiple choice list of options)*/}
                        <div className='detailed-check-radio-wrapper'>
                            {questions[currQuestion].questionType === "radio" && 
                                Array.from({length: questions[currQuestion].options.length}, (_, ind: number) => (

                                    // Questions 2 and 3 answer options
                                    <Form.Check
                                        className='detailed-checkbox-radio'
                                        name={questions[currQuestion].questionId.toString()}
                                        type="radio"
                                        role="answer"
                                        key={ind}
                                        value={questions[currQuestion].options[ind].optionText}
                                        id={questions[currQuestion].questionId.toString().concat(` - ${ind}`)}
                                        label={questions[currQuestion].options[ind].optionText}
                                        checked={answers[questions[currQuestion].questionId - 1]
                                            === questions[currQuestion].options[ind].optionText}
                                        onChange={changeAnswer}
                                    />
                                ))
                            }
                        </div>

                        {/* Questions 4, 6-9 (Short answer text boxes) */}
                        {questions[currQuestion].questionType === "short-answer" && 

                            // Questions 4, 6-9 textbox for answering
                            <textarea
                                className='detailed-short-text'
                                id={questions[currQuestion].questionId.toString()}
                                title={"answer-".concat((currQuestion + 1).toString())} 
                                role="answer"
                                value={answers[currQuestion]}
                                onChange={changeTextAnswer}
                            />
                        }
                        
                        {/* Question 5 (Scale from 1-10) */}
                        {questions[currQuestion].questionType === "slider" && 
                            <div>

                                {/* Question 5 full slider for answering */}
                                <input 
                                    className='detailed-slider'
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

                                {/* Numbers 1-10 displayed for slider */}
                                <datalist id="detailed-scale">
                                    {Array.from({length: 10}, (_, ind: number) => (
                                        <option id="detailed-scale-text" key={ind} value=
                                            {(ind + 1).toString()} label={(ind + 1).toString()}></option>
                                    ))}
                                </datalist>
                            </div>
                        }
                    </div>

                    {/* Quiz navigation buttons*/}
                    <center id="detailed-nav-buttons">

                        {/* Previous button */}
                        <Button disabled={!currQuestion} onClick={() => {changeQuestion(currQuestion - 1)}}
                            id='detailed-submitButton'>&lt;&lt; Previous</Button>
                        
                        {/* Submit button */}
                        <Button hidden={currQuestion !== 8} disabled={answerPercent !== 100}
                            onClick={toResultsPage} id="detailed-submitButton">Submit Answers</Button>
                        
                        {/* Next button */}
                        <Button disabled={!answers[currQuestion]} hidden={currQuestion === 8} 
                            onClick={() => {changeQuestion(currQuestion + 1)}} 
                            id='detailed-submitButton'>Next &gt;&gt;</Button>
                        
                        {/* Clear button */}
                        <Button disabled={!answerPercent} onClick={handleClear} 
                            id='detailed-submitButton'>Clear Answers</Button>
                        
                        {/* Randomize Answers button for testing/demo (localhost testing only)*/}
                        {window.location.hostname === 'localhost' && <Button onClick={randomizeAnswers} 
                            style={{ border: '0vh', color: 'black', backgroundColor: 'white', position: 'absolute', 
                                        right: '0vh', bottom: '0vh'}}>Randomize Answers</Button>}
                    
                    </center>
                </div>
                
                {/* Hiking Trail Background */}
                <img src={hike} role="detailed-bgImg" id="detailed-quizBackgroundImage" style={{ 
                    transform: `scale(${100 + answerPercent}%)`}}/>

            </div>

            {/* Progress bar */}
            <div className="detailed-progress-wrapper">

                {/* Progress bar background */}
                <div className="detailed-progress-bar">

                    {/* Progress content */}
                    <div role="detailed-progressContent" id="detailed-progress-content" style={{
                        width: `${answerPercent === 100 ? 105 : answerPercent.toFixed(0)}%`}}>
              
                        {/* Progress percentage */}
                        <p className="detailed-progress-text">
                            {!answerPercent ? '' : `${answerPercent.toFixed(0)}%`}
                        </p>
                    </div>

                    {/* Walking person image */}
                    <img src={run} id="detailed-person-run" style={{
                        left: `${answerPercent === 100 ? 105 : (answerPercent - 1).toFixed(0)}%`}}/>

                    {/* Finish Line */}
                    <img src={flag} id="detailed-finish-flag"/>
                </div>
            </div>
        </div>
    )
}