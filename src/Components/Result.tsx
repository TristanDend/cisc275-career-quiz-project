import React, { useEffect, useState } from 'react';
import '../CSS/Result.css'
import OpenAI from 'openai';

// props interface for user answers
interface ResultsPageProps {
    userAnswers: string[][];
    quizAnswered: string;
    apiKey: string;
}

// allows time for ChatGPT to get response without stopping the website
async function processResults(userAnswers: string[][], apiKey: string): Promise<OpenAI.Responses.Response & {
    _request_id?: string | null;
}> {
    const client = new OpenAI({apiKey: apiKey, dangerouslyAllowBrowser: true});
    const response = await client.responses.create({
        model: "gpt-4.1-mini",
        instructions: "Use only one to two words.",
        input: `Give a career recommendation based on these answers ${userAnswers}`
    })
    return response;
}

export function ResultPage({ userAnswers, quizAnswered, apiKey }: ResultsPageProps): React.JSX.Element {
    const [response, setResponse] = useState<Awaited<ReturnType<typeof processResults>> | null>(null);

    // Turns response into a useable value
    useEffect(() => {
        processResults(userAnswers, apiKey).then(setResponse)
    }, [userAnswers, apiKey]);

    return (
        <div className="resultsPage-Style">
            <center><h1 className='resultsPage-Title'>{quizAnswered} Results</h1></center>
            {!response && <div>Loading...</div>}
            {response && <div>ChatGPT Response: {response.output_text}</div>}
            <div>{quizAnswered} Answers: {JSON.stringify(userAnswers)}</div>
        </div>
    )
}