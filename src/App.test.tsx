import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';

// renders the app before each test
beforeEach(() => {
  render(<App />)
});

test('find title text Da Quiz', () => {
  // test Career Pathfinder is on the screen
  const quizTitle = screen.getByText("Career Pathfinder");
  expect(quizTitle).toBeInTheDocument();
});

// test('The basic question button goes to basic quiz', () => {
//   // find and click short trail button
//   const basicQuestionButton = screen.getByRole("button", {name: /take short trail/i});
//   act(() => {
//     basicQuestionButton.click();
//   });
//   // check for page by looking for the heading
//   const basicQuestionTitle = screen.getByRole("heading", {level: 1, name: /short trail/i});
//   expect(basicQuestionTitle).toBeInTheDocument();
// });

// test('The detailed question button goes to detailed quiz', () => {
//     // find and click longer trail button
//     const detailedQuestionButton = screen.getByRole("button", {name: /take longer trail/i});
//     act(() => {
//       detailedQuestionButton.click();
//     });
//     // check for page by looking for the heading
//     const detailedQuestionTitle = screen.getByRole("heading", {level: 1, name: /longer trail/i});
//     expect(detailedQuestionTitle).toBeInTheDocument();
// });

// test('Simple Quiz header goes to basic quiz', () => {
//   // find and click "simple quiz" header
//   const simpleQuizHeader = screen.getByRole("button", {name: /short trail/i});
//   act(() => {
//     simpleQuizHeader.click();
//   });
//   // check for page by looking for the heading
//   const basicQuestionTitle = screen.getByRole("heading", {level: 1, name: /short trail/i});
//   expect(basicQuestionTitle).toBeInTheDocument();
// });

// test('Detailed Quiz header goes to detailed quiz', () => {
//   // find and click "long trail" header
//   const detailedQuizHeader = screen.getByRole("button", {name: /long trail/i});
//   act(() => {
//     detailedQuizHeader.click();
//   });
//   // check for page by looking for the heading
//   const detailedQuestionTitle = screen.getByRole("heading", {level: 1, name: /long trail/i});
//   expect(detailedQuestionTitle).toBeInTheDocument();
// });

// test('header quiz button + home button = home', () => {
//   // find and click "short trail" header, then click home button
//   const simpleQuizHeader = screen.getByRole("button", {name: /short trail/i});
//   const homeButton = screen.getByRole("button", {name: /home/i});

//   act(() => {
//     simpleQuizHeader.click();
//     homeButton.click();
//   });

//   // check for page by looking for the heading
//   const mainPageTitle = screen.getByRole("heading", {level: 1, name: /Career Pathfinder/i});
//   expect(mainPageTitle).toBeInTheDocument();
// });

// test('main page quiz button + home button = home', () => {
//   // find and click "go to basic quiz" button, then click home button
//   const basicQuizButton = screen.getByRole("button", {name: /take short trail/i});
//   const homeButton = screen.getByRole("button", {name: /home/i});

//   act(() => {
//     basicQuizButton.click();
//     homeButton.click();
//   });

//   // check for page by looking for the heading
//   const mainPageTitle = screen.getByRole("heading", {level: 1, name: /Career Pathfinder/i});
//   expect(mainPageTitle).toBeInTheDocument();
// });

// test('navigating to results page and back', () => {
//   //find short trail button and click it
//   const basicQuizButton = screen.getByRole("button", {name: /take short trail/i});
//   act(() => {
//     basicQuizButton.click();
//   });

//   //then find submit answers button and click it, to go to results page
//   const resultsPageButton = screen.getByRole("button", {name: /submit answers/i});

//   act(() => {
//     resultsPageButton.click();
//   });

//   //identify results page by the heading, check if it's correct
//   const resultsPageTitle = screen.getByRole("heading", {level: 1, name: /basic results/i});
//   expect(resultsPageTitle).toBeInTheDocument();

//   //find and press the home button
//   const homeButton = screen.getByRole("button", {name: /home/i});
//   act(() => {
//     homeButton.click();
//   });

//   // check for home page title
//   const mainPageTitle = screen.getByRole("heading", {level: 1, name: /Career Pathfinder/i});
//   expect(mainPageTitle).toBeInTheDocument();
// });