import React, { useState } from 'react';
import questions from '../assets/question.json'; // load question data
import hike from '../assets/daytime_hike.png'
import flag from '../assets/finishFlag.png'
import walk from '../assets/stickmanWalking.gif'
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
  // const hostname = window.location.hostname;
  // const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
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
    <div style={{borderTop: '.5rem solid #90C67C',
      borderBottom: '.5rem solid #90C67C'}}>
      {/* Full page besides progress bar */}
      <div id="basic-page-style">
        <div id="basic-quiz-style">
          {/* Quiz Title */}
          <center><h1 className="basic-title">Short Trail</h1></center>

          {/* Single question view */}
          <div>
            {/* Question text */}
            <p className="basic-question-text">{question.questionText}</p>
            
            {/* Question answer buttons */}
            <div id="basic-quiz-buttons">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOptions[currentIndex].includes(opt.optionText);
                return (
                  <button
                    key={opt.optionId}
                    onClick={() => { handleOptionSelect(idx); }}
                    id='basic-question-buttons'
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

          {/* Quiz navigation buttons */}
          <center id="basic-nav-buttons">

            {/* Previous button */}
            <button
              onClick={() => { setCurrentIndex(i => Math.max(i - 1, 0)); }}
              disabled={currentIndex === 0}
              id='basic-submitButton'
            >&lt;&lt; Previous</button>

            {/* Next/Submit Buttons */}
            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={() => { setCurrentIndex(i => Math.min(i + 1, totalQuestions - 1)); }}
                disabled={selectedOptions[currentIndex].length === 0}
                id='basic-submitButton'
              >Next &gt;&gt;</button>
            ) : (
              <button
                onClick={() => { toResultsPage(); }}
                disabled={progressPercentage !== 100}
                id='basic-submitButton'
              >Submit Answers</button>
            )}

            {/* Clear button */}
            <button
              onClick={() => { clearSelections(); }}
              disabled={answeredCount === 0}
              id='basic-submitButton'
            >Clear Answers</button>

            {/* Randomize Answer Button for testing/demo */}
            {/*isLocalhost && */(
              <button
                onClick={() => { randomizeSelections(); }}
                style={{position: 'absolute', right: '0vh', bottom: '0vh'}}
              >Randomize Answers</button>
            )}

          </center>
        </div>

        {/* Hiking Trail Background */}
        <img src={hike} id="basic-quizBackgroundImage"style={{ 
          transform: `scale(${100 + progressPercentage}%)` }}/>

      </div>

      {/* Progress bar */}
      <div className="basic-progress-wrapper">
        {/* Progress bar background */}
        <div className="basic-progress-bar">

          {/* Progress content */}
          <div role="progressContent" id="basic-progress-content" style={{
            width: `${progressPercentage === 100 ? 105 : progressPercentage.toFixed(0)}%`}}>
              
            {/* Progress percentage */}
            <p className="basic-progress-text">
              {!progressPercentage ? '' : `${progressPercentage.toFixed(0)}%`}
            </p>
          </div>

          {/* Walking person image */}
          <img src={walk} id="basic-person-walk" style={{
              left: `${progressPercentage === 100 ? 105 : (progressPercentage - 1).toFixed(0)}%`}}/>

          {/* Finish Line */}
          <img src={flag} id="basic-finish-flag"/>
        </div>
      </div>
    </div>
  );
};

export default BasicQuestions;