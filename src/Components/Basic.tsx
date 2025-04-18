import React, { useState } from 'react';
import questions from '../assets/question.json'; // load question

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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem', fontFamily: 'Georgia' }}>
      {/* Title */}
      <h1 style={{ textAlign: 'center' }}>Basic Questions</h1>

      {/* render questions dynamically based on the JSON template */}
      {(questions as Question[]).map((question, qIndex) => (
        <div key={question.questionId} style={{ marginBottom: '1.5rem' }}>
          <p className='question-text'>{question.questionText}</p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {question.options.map((option, oIndex) => {
              const isSelected = selectedOptions[qIndex].includes(oIndex);
              return (
                <button
                  key={option.optionId}
                  onClick={() => { handleOptionSelect(qIndex, oIndex); }}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#67AE6E' : '#328E6E',
                    color: 'white',
                    fontFamily: 'Georgia',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {option.optionText}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* progress bar */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ width: '100%', backgroundColor: '#ccc', height: '20px', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercentage}%`, backgroundColor: 'green', height: '100%' }}></div>
        </div>
      </div>

      {/* bottom buttons */}
      <div style={{ textAlign: 'center' }}>
        <button 
            disabled={progressPercentage !== 100}
            style={{
            padding: '0.5rem 1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '1rem'
          }} onClick={toResultsPage}>
          Get Answers
        </button>

        <button
          disabled={!progressPercentage}
          onClick={() => { 
            clearSelections(); 
          }}

          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default BasicQuestions;
