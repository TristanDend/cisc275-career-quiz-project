import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import '../CSS/Result.css'
import leafLoad from '../assets/leaf_loading.gif'
import OpenAI, { APIConnectionError, APIConnectionTimeoutError, APIError, AuthenticationError, BadRequestError, InternalServerError, OpenAIError } from 'openai';
import basicQuestions from '../assets/question.json';
import { questions, Question, Option } from '../assets/DetailedPageQuestions'
import { ChatCompletion } from 'openai/resources/chat';
import basicInstructions from '../assets/BasicInstructions';
import detailedInstructions from '../assets/DetailedInstructions';

type yesResponse = { worked: true; response: ChatCompletion & 
    { _request_id?: string | null | undefined; }};
type noError = { worked: false; error: Error };

// props interface for user answers
interface ResultsPageProps {
    userAnswers: string[][];
    quizAnswered: string;
    apiKey: string;
}

// allows time for ChatGPT to get response without stopping the website
async function processResults(quizAnswered: string, userAnswers: string[][], apiKey: string): Promise<yesResponse | noError | undefined>  {

    if (!apiKey) {
        throw new Error("API key is required");
    }

    // empty string as detail instructions
    let instructions: string = "";

    if (quizAnswered.toLowerCase() === "basic quiz") {
        instructions = basicInstructions;
    } else {
        instructions = detailedInstructions;
    }

    const client = new OpenAI({apiKey: apiKey, dangerouslyAllowBrowser: true});
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                { role: "system", content: instructions },
                { role: "user", content: `Give a career recommendation based on these answers: ${userAnswers}, to the following questions: ${
                    quizAnswered === "Basic Quiz" ? basicQuestions : questions}`
        }]});
        return { worked: true, response: response };
    } catch (error) {
        if (error instanceof OpenAI.APIError) return { worked: false, error: error};
    }
}

export function ResultPage({ userAnswers, quizAnswered, apiKey }: ResultsPageProps): React.JSX.Element {
    const [response, setResponse] = useState<Awaited<ReturnType<typeof processResults>> | null>(null);
    const [loadResults, setLoadResults] = useState<boolean>(true);

    // Turns response into a useable value
    useEffect(() => {
        processResults(quizAnswered, userAnswers, apiKey).then(setResponse)

        // Sets loadResults to false after 5 seconds
        const timer = setTimeout(() => {
            setLoadResults(false);
        }, 5000); // 5 seconds

        return () => {clearTimeout(timer)}; // cleanup
    }, [quizAnswered, userAnswers, apiKey]);

    return (
        <div className="resultsPage-Style">
            <span>{quizAnswered}</span>
            <center><h1 className='resultsPage-Title'>{quizAnswered} Results</h1></center>
            <Popup open={loadResults} closeOnDocumentClick={false}>
                {
                  <div id="ResultsInitialPopup">
                    <p id="ResultsInitialPopupText">Processing Your Answers</p>
                    <img id="loadingImage" src={leafLoad} alt="leaf loading..."/>
                  </div>
                }
            </Popup>
            {/* check if there is a response, response worked is true, and content isn't empty */}
            {response && response.worked && response.response.choices[0].message.content &&
                (<div>
                    {response.response.choices[0].message.content
                    .split("\n")
                    .map((paragraph: string, index: number) => (<p key={index}>{paragraph}</p>))}
                </div>)}
            {/* runs if response did not work */}
            {response && !response.worked && (
                <div>{response.error.message}</div>
            )}
            {/* <div>{quizAnswered} Answers: {JSON.stringify(userAnswers)}</div> */}
        </div>
    )
}