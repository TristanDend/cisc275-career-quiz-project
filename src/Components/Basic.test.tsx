import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BasicQuestions from './Basic';
import '@testing-library/jest-dom/extend-expect';

const dummySetOnBasicAns = jest.fn();
const dummySetOnBasic = jest.fn();
const dummySetOnResults = jest.fn();
const dummySetQuizAnswered = jest.fn();

describe('BasicQuestions Component', () => {
  test('renders the title and questions', () => {
    render(
      <BasicQuestions setBasicAns={dummySetOnBasicAns} setOnBasic={dummySetOnBasic} setOnResults={dummySetOnResults} setQuizAnswered={dummySetQuizAnswered}/>
    );
    
    expect(screen.getByText('Basic Questions')).toBeInTheDocument();
    
    expect(screen.getByText(/What topics interest you\?/i)).toBeInTheDocument();
  });
  
  
  
  test('renders Get Answers button', () => {
    render(
      <BasicQuestions setBasicAns={dummySetOnBasicAns} setOnBasic={dummySetOnBasic} setOnResults={dummySetOnResults} setQuizAnswered={dummySetQuizAnswered} />
    );
    const getAnswersButton = screen.getByText('Get Answers');
    expect(getAnswersButton).toBeInTheDocument();
  });
});
