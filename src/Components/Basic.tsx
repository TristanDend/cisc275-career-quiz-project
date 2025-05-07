import React, { useState } from 'react';
import questions from '../assets/question.json'; // load question data
import '../CSS/Basic.css';

// data interfaces
type Option = { optionId: string; optionText: string; };
type Question = { questionId: string; questionText: string; allowMultiple: boolean; options: Option[]; };

// props interface for navigation functions
interface BasicPageProps {
  setBasicAns: (basicAns: string[][]) => void;
  setOnBasic: (onBasic: boolean) => void;
  setOnResults: (onResults: boolean) => void;
  setQuizAnswered: (quizAnswered: string) => void;
}

const BasicQuestions: React.FC<BasicPageProps> = ({ setBasicAns, setOnBasic, setOnResults, setQuizAnswered }) => {
  // state: selected options for each question
  const [selectedOptions, setSelectedOptions] = useState<string[][]>(
    (questions as Question[]).map(() => [])
  );
  // state: current question index
  const [currentIndex, setCurrentIndex] = useState(0);

  // helper: total questions count
  const totalQuestions = (questions as Question[]).length;

  // count answered for progress
  const answeredCount = selectedOptions.filter(sel => sel.length > 0).length;
  const progressPercentage = (answeredCount / totalQuestions) * 100;

  // navigation to results page
  const toResultsPage = (): void => {
    setBasicAns(selectedOptions);
    setQuizAnswered('Basic Quiz');
    setOnBasic(false);
    setOnResults(true);
  };

  // select/deselect an option
  const handleOptionSelect = (optionIndex: number): void => {
    const q = (questions as Question[])[currentIndex];
    const current = [...selectedOptions];
    const sel = current[currentIndex];
    const text = q.options[optionIndex].optionText;

    let updated: string[];
    if (q.allowMultiple) {
      if (sel.includes(text)) {
        updated = sel.filter(s => s !== text);
      } else {
        updated = [...sel, text];
      }
    } else {
      updated = [text];
    }
    current[currentIndex] = updated;
    setSelectedOptions(current);
  };

  // clear all selections
  const clearSelections = (): void => {
    setSelectedOptions((questions as Question[]).map(() => []));
    setCurrentIndex(0);
  };

  // randomize selections (for localhost testing)
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  const randomizeSelections = (): void => {
    const randomized = (questions as Question[]).map(q => {
      if (q.allowMultiple) {
        let picks = q.options.filter(() => Math.random() > 0.5).map(opt => opt.optionText);
        if (picks.length === 0) picks = [q.options[Math.floor(Math.random() * q.options.length)].optionText];
        return picks;
      } else {
        return [q.options[Math.floor(Math.random() * q.options.length)].optionText];
      }
    });
    setSelectedOptions(randomized);
  };

  const question = (questions as Question[])[currentIndex];

  return (
    <div id="page-style">
      <div id="quiz-style">
        {/* Title */}
        <center><h1 className="title">Basic Questions</h1></center>

        {/* Single question view */}
        <div style={{ marginBottom: '2rem' }}>
          <p className="question-text">{question.questionText}</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {question.options.map((opt, idx) => {
              const isSelected = selectedOptions[currentIndex].includes(opt.optionText);
              return (
                <button
                  key={opt.optionId}
                  onClick={() => { handleOptionSelect(idx); }}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#4CAF50' : '#fff',
                    color: isSelected ? '#fff' : '#000',
                    minWidth: '100px',
                    textAlign: 'center'
                  }}
                >{opt.optionText}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation buttons */}
        <center>
          <button
            onClick={() => { setCurrentIndex(i => Math.max(i - 1, 0)); }}
            disabled={currentIndex === 0}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >Previous</button>

          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => { setCurrentIndex(i => Math.min(i + 1, totalQuestions - 1)); }}
              disabled={selectedOptions[currentIndex].length === 0}
              style={{
                padding: '0.5rem 1rem',
                marginRight: '1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >Next</button>
          ) : (
            <button
              onClick={() => { toResultsPage(); }}
              disabled={progressPercentage !== 100}
              style={{
                padding: '0.5rem 1rem',
                marginRight: '1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >Submit Answers</button>
          )}

          <button
            onClick={() => { clearSelections(); }}
            disabled={answeredCount === 0}
            style={{
              padding: '0.5rem 1rem',
              marginRight: isLocalhost ? '1rem' : '0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >Clear All</button>

          {isLocalhost && (
            <button
              onClick={() => { randomizeSelections(); }}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >Randomize</button>
          )}
        </center>
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <div
          style={{
            width: '100%',
            backgroundColor: '#ccc',
            height: '20px',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`, // dynamic width
              backgroundColor: 'green',
              height: '100%'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BasicQuestions;