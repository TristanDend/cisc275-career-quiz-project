import React, { useState } from 'react';
import questions from '../assets/question.json'; // load question data
import hike from '../assets/daytime_hike.png'
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
    <div style={{ 
      borderTop: '.5rem solid #90C67C',
      borderBottom: '.5rem solid #90C67C'}}>
      <div id="page-style">
        <div style={{
            top: '0', left: '0', right: '0', bottom: '0',
            position: 'absolute',
            backgroundSize: 'cover',
            backgroundImage: `url(${hike})`,
            transform: `scale(${100 + progressPercentage}%)`,
            transition: 'transform 0.3s ease',
            zIndex: '-1',
            overflow: 'hidden'
          }}></div>
        <div id="quiz-style" style={{ borderRadius: '3%', marginTop: '2rem', marginBottom: '2rem' }}>
          {/* Title */}
          <center><h1 className="title">Basic Questions</h1></center>

          {/* Single question view */}
          <div style={{ marginBottom: '2rem'}}>
            <p className="question-text">{question.questionText}</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {question.options.map((opt, idx) => {
                const isSelected = selectedOptions[currentIndex].includes(opt.optionText);
                return (
                  <button
                    key={opt.optionId}
                    onClick={() => { handleOptionSelect(idx); }}
                    id='question-buttons'
                    style={{
                      backgroundColor: isSelected ? '#4CAF50' : 'rgb(241, 241, 241)',
                      color: isSelected ? '#fff' : '#000',
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
              id='submitButton'
            >&lt;&lt; Previous</button>

            <button
              onClick={() => { clearSelections(); }}
              disabled={answeredCount === 0}
              id='clearButton'
            >Clear Answers</button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={() => { setCurrentIndex(i => Math.min(i + 1, totalQuestions - 1)); }}
                disabled={selectedOptions[currentIndex].length === 0}
                id='submitButton'
              >Next &gt;&gt;</button>
            ) : (
              <button
                onClick={() => { toResultsPage(); }}
                disabled={progressPercentage !== 100}
                id='submitButton'
              >Submit Answers</button>
            )}

            {isLocalhost && (
              <button
                onClick={() => { randomizeSelections(); }}
                id='submitButton'
              >Randomize Answers</button>
            )}
          </center>
        </div>
      </div>
    {/* Progress bar */}
      <div className="progress-wrapper">
        <div className="progress-bar" id="progressBar">
          <div role="progressContent" id="progress-content" style={{
            width: `${progressPercentage}%`}}>
            <p className="progress-text">{progressPercentage.toFixed()}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicQuestions;