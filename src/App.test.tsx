import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';

// renders the app before each test
beforeEach(() => {
  render(<App />)
});

test('find title text Da Quiz', () => {
  // test Da Quiz is on the screen
  const quizTitle = screen.getByText("Da Quiz");
  expect(quizTitle).toBeInTheDocument();
});

test('The basic question button goes to basic quiz', () => {
  // find and click basic button
  const basicQuestionButton = screen.getByRole("button", {name: /go to basic questions/i});
  act(() => {
    basicQuestionButton.click();
  });
  // check for page by looking for the heading
  const basicQuestionTitle = screen.getByRole("heading", {level: 1, name: /basic questions/i});
  expect(basicQuestionTitle).toBeInTheDocument();
});

test('The detailed question button goes to detailed quiz', () => {
    // find and click detailed button
    const detailedQuestionButton = screen.getByRole("button", {name: /go to detailed questions/i});
    act(() => {
      detailedQuestionButton.click();
    });
    // check for page by looking for the heading
    const detailedQuestionTitle = screen.getByRole("heading", {level: 1, name: /detailed questions/i});
    expect(detailedQuestionTitle).toBeInTheDocument();
});

test('Simple Quiz header goes to basic quiz', () => {
  // find and click "simple quiz" header
  const simpleQuizHeader = screen.getByRole("button", {name: /simple quiz/i});
  act(() => {
    simpleQuizHeader.click();
  });
  // check for page by looking for the heading
  const basicQuestionTitle = screen.getByRole("heading", {level: 1, name: /basic questions/i});
  expect(basicQuestionTitle).toBeInTheDocument();
});

test('Detailed Quiz header goes to detailed quiz', () => {
  // find and click "detailed quiz" header
  const detailedQuizHeader = screen.getByRole("button", {name: /detailed quiz/i});
  act(() => {
    detailedQuizHeader.click();
  });
  // check for page by looking for the heading
  const detailedQuestionTitle = screen.getByRole("heading", {level: 1, name: /detailed questions/i});
  expect(detailedQuestionTitle).toBeInTheDocument();
});

test('header quiz button + home button = home', () => {
  // find and click "simple quiz" header, then click home button
  const simpleQuizHeader = screen.getByRole("button", {name: /simple quiz/i});
  const homeButton = screen.getByRole("button", {name: /home/i});

  act(() => {
    simpleQuizHeader.click();
    homeButton.click();
  });

  // check for page by looking for the heading
  const mainPageTitle = screen.getByRole("heading", {level: 1, name: /da quiz/i});
  expect(mainPageTitle).toBeInTheDocument();
});

test('main page quiz button + home button = home', () => {
  // find and click "go to basic quiz" button, then click home button
  const basicQuizButton = screen.getByRole("button", {name: /go to basic questions/i});
  const homeButton = screen.getByRole("button", {name: /home/i});

  act(() => {
    basicQuizButton.click();
    homeButton.click();
  });

  // check for page by looking for the heading
  const mainPageTitle = screen.getByRole("heading", {level: 1, name: /da quiz/i});
  expect(mainPageTitle).toBeInTheDocument();
});

test('navigating to results page and back', () => {
  //find basic quiz button and click it
  const basicQuizButton = screen.getByRole("button", {name: /go to basic questions/i});
  act(() => {
    basicQuizButton.click();
  });

  //then find get answers button and click it, to go to results page
  const resultsPageButton = screen.getByRole("button", {name: /get answers/i});

  act(() => {
    resultsPageButton.click();
  });

  //identify results page by the heading, check if it's correct
  const resultsPageTitle = screen.getByRole("heading", {level: 1, name: /results/i});
  expect(resultsPageTitle).toBeInTheDocument();

  //find and press the home button
  const homeButton = screen.getByRole("button", {name: /home/i});
  act(() => {
    homeButton.click();
  });

  // check for home page title
  const mainPageTitle = screen.getByRole("heading", {level: 1, name: /da quiz/i});
  expect(mainPageTitle).toBeInTheDocument();
});