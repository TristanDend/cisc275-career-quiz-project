import React, { useEffect, useState } from 'react';
import fs from 'fs/promises';
import '../CSS/Result.css'
import OpenAI from 'openai';

// props interface for user answers
interface ResultsPageProps {
    userAnswers: string[][];
    quizAnswered: string;
    apiKey: string;
}

// allows time for ChatGPT to get response without stopping the website
async function processResults(userAnswers: string[][], apiKey: string, quizAnswered: string): Promise<OpenAI.Responses.Response & {
    _request_id?: string | null;
}> {
    if (!apiKey) {
        throw new Error("API key is required");
    }
    const instructions = await fs.readFile('src/Components/instructions.txt', 'utf-8');
    if(quizAnswered === "basic") {
        const instructions = await fs.readFile('src/Components/basicInstructions.txt', 'utf-8');
    }
    else{
        const instructions = await fs.readFile('src/Components/detailedInstructions.txt', 'utf-8');
    }
    
    const client = new OpenAI({apiKey: apiKey, dangerouslyAllowBrowser: true});
    const response = await client.responses.create({
        model: "gpt-4.1-mini",
        instructions,
        input: `Give a career recommendation based on these answers ${userAnswers}`
    })
    return response;
}

export function ResultPage({ userAnswers, quizAnswered, apiKey }: ResultsPageProps): React.JSX.Element {
    const [response, setResponse] = useState<Awaited<ReturnType<typeof processResults>> | null>(null);

    // Turns response into a useable value
    useEffect(() => {
        processResults(userAnswers, apiKey, quizAnswered).then(setResponse)
    }, [userAnswers, apiKey, quizAnswered]);

    return (
        <div className="resultsPage-Style">
            <center><h1 className='resultsPage-Title'>{quizAnswered} Results</h1></center>
            {!response && <div>Loading...</div>}
            {response && <div>ChatGPT Response: {response.output_text}</div>}
            <div>{quizAnswered} Answers: {JSON.stringify(userAnswers)}</div>
        </div>
    )
}