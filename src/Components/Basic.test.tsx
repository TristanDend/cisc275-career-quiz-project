import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BasicQuestions from './Basic';
import '@testing-library/jest-dom/extend-expect';

const dummySetOnBasic = jest.fn();
const dummySetOnResults = jest.fn();

describe('BasicQuestions Component', () => {
  test('renders the title and questions', () => {
    render(
      <BasicQuestions setOnBasic={dummySetOnBasic} setOnResults={dummySetOnResults} />
    );
    
    expect(screen.getByText('Basic Questions')).toBeInTheDocument();
    
    expect(screen.getByText(/What topics interest you\?/i)).toBeInTheDocument();
  });
  
  
  
  test('renders Get Answers button', () => {
    render(
      <BasicQuestions setOnBasic={dummySetOnBasic} setOnResults={dummySetOnResults} />
    );
    const getAnswersButton = screen.getByText('Get Answers');
    expect(getAnswersButton).toBeInTheDocument();
  });
});
