import React, { useState } from 'react';
import questions from '../assets/question.json'; // load question
import '../CSS/Basic.css';

// data interfaces
type Option = {
  optionId: string;
  optionText: string;
};

type Question = {
  questionId: string;
  questionText: string;
  allowMultiple: boolean;
  options: Option[];
};

// props interface for navigation functions
interface BasicPageProps {
  setBasicAns: (basicAns: string[][]) => void;
  setOnBasic: (onBasic: boolean) => void;
  setOnResults: (onResults: boolean) => void;
  setQuizAnswered: (quizAnswered: string) => void;
}

export const BasicQuestions: React.FC<BasicPageProps> = ({ setBasicAns, setOnBasic, setOnResults, setQuizAnswered }) => {
  // initialize state: an empty array for each question to track selected option texts
  const [selectedOptions, setSelectedOptions] = useState<string[][]>(
    (questions as Question[]).map(() => [])
  );

  // check if running on local test environment
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

  // switch from quiz to results page and send answers over
  function toResultsPage(): void {
    setBasicAns(selectedOptions);
    setQuizAnswered("Basic Quiz");
    setOnBasic(false);
    setOnResults(true);
  }

  // randomly select answers for testing
  const randomizeSelections = (): void => {
    const newSelections = (questions as Question[]).map((question) => {
      if (question.allowMultiple) {
        // random subset, ensure at least one option
        let picks = question.options
          .filter(() => Math.random() > 0.5)
          .map(opt => opt.optionText);
        if (picks.length === 0) {
          const randomIndex = Math.floor(Math.random() * question.options.length);
          picks = [question.options[randomIndex].optionText];
        }
        return picks;
      } else {
        // single random choice
        const randomIndex = Math.floor(Math.random() * question.options.length);
        return [question.options[randomIndex].optionText];
      }
    });
    setSelectedOptions(newSelections);
  };

  // update selection when an option is clicked
  const handleOptionSelect = (questionIndex: number, optionIndex: number): void => {
    const currentSelections = selectedOptions[questionIndex];
    const question = (questions as Question[])[questionIndex];

    let newSelectionsForQuestion: string[];

    if (question.allowMultiple) {
      // if multiple selections allowed, toggle the option
      const optionText = question.options[optionIndex].optionText;
      if (currentSelections.includes(optionText)) {
        newSelectionsForQuestion = currentSelections.filter(val => val !== optionText);
      } else {
        newSelectionsForQuestion = [...currentSelections, optionText];
      }
    } else {
      // single selection: replace with the current option
      newSelectionsForQuestion = [question.options[optionIndex].optionText];
    }

    const newSelections = [...selectedOptions];
    newSelections[questionIndex] = newSelectionsForQuestion;
    setSelectedOptions(newSelections);
  };

  // clear all selections
  const clearSelections = (): void => {
    setSelectedOptions((questions as Question[]).map(() => []));
  };

  // count answered questions: any question with a non-empty selection is considered answered
  const answeredCount = selectedOptions.filter(selection => selection.length > 0).length;
  const progressPercentage = (answeredCount / (questions as Question[]).length) * 100;

  return (
    <div id="page-style">
      <div id="quiz-style">
        {/* Title */}
        <center>
          <h1 className='title'>Basic Questions</h1>
        </center>

        {/* render questions dynamically based on the JSON template */}
        {(questions as Question[]).map((question, qIndex) => (
          <div key={question.questionId} style={{ marginBottom: '2rem' }}>
            <p className='question-text'>{question.questionText}</p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {question.options.map((option, oIndex) => {
                const isSelected = selectedOptions[qIndex].includes(option.optionText);
                return (
                  <button
                    key={option.optionId}
                    style={{
                      backgroundColor: isSelected ? 'rgb(35, 176, 0)' : 'rgb(236, 236, 236)',
                      color: isSelected ? 'white' : 'black',
                      fontFamily: 'Georgia',
                      height: 'auto',
                      width: 'auto',
                      border: '1px solid black',
                    }}
                    onClick={() => { handleOptionSelect(qIndex, oIndex); }}
                  >{option.optionText}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* bottom buttons */}
        <center>
          <button
            id='submitButton'
            disabled={progressPercentage !== 100}
            onClick={toResultsPage}
          >Submit Answers</button>

          <button
            id='clearButton'
            disabled={!(progressPercentage > 0)}
            onClick={clearSelections}
          >Clear Answers</button>

          {/* {isLocalhost && ( */}
          <button
              id='submitButton'
              onClick={randomizeSelections}
            >Randomize Answers</button>
          {/* )} */}

        </center>
      </div>

      {/* progress bar */}
      <div className="progress-wrapper">
        <div className="progress-bar">
          <div id="progress-content" style={{ width: `${progressPercentage}%` }}>
            <p className="progress-text">{progressPercentage.toFixed(0)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicQuestions;
