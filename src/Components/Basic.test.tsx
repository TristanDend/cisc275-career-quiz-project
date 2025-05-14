import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BasicQuestions from './Basic';
import '@testing-library/jest-dom/extend-expect';

// test variable placeholders for the basic page states
const dummySetOnBasicAns = jest.fn();
const dummySetOnBasic = jest.fn();
const dummySetOnResults = jest.fn();
const dummySetQuizAnswered = jest.fn();

describe('BasicQuestions Component', () => {
  test('renders the title and questions', () => {
    render(
      <BasicQuestions setBasicAns={dummySetOnBasicAns} setOnBasic={dummySetOnBasic} setOnResults={dummySetOnResults} setQuizAnswered={dummySetQuizAnswered}/>
    ); // sets variable placeholders as values for the basic page lifted states
    
    expect(screen.getByText('Short Trail')).toBeInTheDocument(); // tests if title shows up on website
    expect(screen.getByText(/What topics interest you\?/i)).toBeInTheDocument(); // tests if question shows up on website
  });
  
  test('renders basic buttons: prev, next, and the for testing randomize answers', () => {
    render(
      <BasicQuestions setBasicAns={dummySetOnBasicAns} setOnBasic={dummySetOnBasic} setOnResults={dummySetOnResults} setQuizAnswered={dummySetQuizAnswered} />
    ); // sets variable placeholders as values for the basic page lifted states
    const prevButton = screen.getByRole("button", {name: "<< Previous"}); // get previous button
    const nextButton = screen.getByRole("button", {name: "Next >>"}); // get next button
    const randomButton = screen.getByRole("button", {name: /randomize answers/i}); // get random answers button
    const clearButton = screen.getByRole("button", {name: /clear answers/i}); // get clear answers button
    expect(clearButton).toBeInTheDocument(); // tests if clear button shows up on website
    expect(prevButton).toBeInTheDocument(); // tests if previous button shows up on website
    expect(nextButton).toBeInTheDocument(); // tests if next button shows up on website
    expect(randomButton).toBeInTheDocument(); // tests if random answers shows up on website
  });
});
