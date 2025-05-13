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
    
    expect(screen.getByText('Short Trail')).toBeInTheDocument();
    expect(screen.getByText(/What topics interest you\?/i)).toBeInTheDocument();
  });
  
  test('renders basic buttons: prev, next, and the for testing randomize answers', () => {
    render(
      <BasicQuestions setBasicAns={dummySetOnBasicAns} setOnBasic={dummySetOnBasic} setOnResults={dummySetOnResults} setQuizAnswered={dummySetQuizAnswered} />
    );
    const prevButton = screen.getByRole("button", {name: "<< Previous"}); // get previous button
    const nextButton = screen.getByRole("button", {name: "Next >>"}); // get next button
    const randomButton = screen.getByRole("button", {name: /randomize answers/i}); // get random answers button
    const clearButton = screen.getByRole("button", {name: /clear answers/i}); // get clear answers button
    expect(clearButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(randomButton).toBeInTheDocument();
  });
});
