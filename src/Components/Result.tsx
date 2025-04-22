import React from 'react';
import '../CSS/Result.css'

// props interface for user answers
interface ResultsPageProps {
    userAnswers: string[][];
    quizAnswered: string;
}

export function ResultPage({ userAnswers, quizAnswered }: ResultsPageProps): React.JSX.Element {
    return (
        <div className="resultsPage-Style">
            <center><h1 className='resultsPage-Title'>Results</h1></center>
            <div>{quizAnswered} Answers: {JSON.stringify(userAnswers)}</div>
        </div>
    )
}