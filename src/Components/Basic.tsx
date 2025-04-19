import React, { useState } from 'react';
import questions from '../assets/question.json'; // load question
import '../CSS/Basic.css'

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
  setOnBasic: (onBasic: boolean) => void;
  setOnResults: (onResults: boolean) => void;
}

export const BasicQuestions: React.FC<BasicPageProps> = ({ setOnBasic, setOnResults }) => {
  // initialize state: an empty array for each question to track selected option indices
  const [selectedOptions, setSelectedOptions] = useState<number[][]>(
    (questions as Question[]).map(() => [])
  );

  // switch from quiz to results page
  function toResultsPage(): void {
    setOnBasic(false);
    setOnResults(true);
  }

  // update selection when an option is clicked
  const handleOptionSelect = (questionIndex: number, optionIndex: number): void => {
    const currentSelections = selectedOptions[questionIndex];
    const question = (questions as Question[])[questionIndex];

    let newSelectionsForQuestion: number[];

    if (question.allowMultiple) {
      // if multiple selections allowed, toggle the option
      if (currentSelections.includes(optionIndex)) {
        newSelectionsForQuestion = currentSelections.filter(val => val !== optionIndex);
      } else {
        newSelectionsForQuestion = [...currentSelections, optionIndex];
      }
    } else {
      // single selection: replace with the current option
      newSelectionsForQuestion = [optionIndex];
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
                const isSelected = selectedOptions[qIndex].includes(oIndex);
                return (
                  <button
                    key={option.optionId}
                    style={{
                      backgroundColor: isSelected ? 'rgb(35, 176, 0)' : 'rgb(236, 236, 236)',
                      color: isSelected ? "white" : "black",
                      fontFamily: "Georgia",
                      height: "auto",
                      width: "auto",
                      border: "1px solid black",
                    }}
                    onClick={() => { handleOptionSelect(qIndex, oIndex); }}>
                      {option.optionText}
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
              onClick={toResultsPage}>
            Submit Answers
          </button>
          <button
            id='clearButton'
            disabled={!progressPercentage}
            onClick={() => { clearSelections() }}>
            Clear Answers
          </button>
        </center>
      </div>
      {/* progress bar */}
      <div className="progress-wrapper">
        <div className="progress-bar">
          <div id="progress-content" style={{ 
            width: `${progressPercentage}%`}}>
            <p className="progress-text">{progressPercentage.toFixed(0)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicQuestions;
