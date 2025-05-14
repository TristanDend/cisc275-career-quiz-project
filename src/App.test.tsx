import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// renders the app before each test, and finds and clicks testing mode button
beforeEach(() => {
  render(<App />)
  const testModeButton = screen.getByRole("button", {name: /testing mode/i});
  act(() => {
    testModeButton.click();
  });
  
});

test('find title text Da Quiz', () => {
  // test Career Pathfinder is on the screen
  const quizTitle = screen.getByText("Career Pathfinder");
  expect(quizTitle).toBeInTheDocument();
});

test('NAVIGATION: The Short Trail button goes to Short Trail', () => {
  // find and click short trail button
  const shortTrailButton = screen.getByRole("button", {name: /take short trail/i});
  act(() => {
    shortTrailButton.click();
  });
  // check for page by looking for the heading
  const basicQuestionTitle = screen.getByRole("heading", {level: 1, name: /short trail/i});
  expect(basicQuestionTitle).toBeInTheDocument();
});

test('NAVIGATION: The Long Trail button goes to Long Trail', () => {
    // find and click longer trail button
    const longTrailButton = screen.getByRole("button", {name: /take longer trail/i});
    act(() => {
      longTrailButton.click();
    });
    // check for page by looking for the heading
    const longTrailTitle = screen.getByRole("heading", {level: 1, name: /long trail/i});
    expect(longTrailTitle).toBeInTheDocument();
});

test('NAVIGATION: Short Trail header goes to Short Trail', () => {
  // find and click "short trail" header
  const shortTrailButton = screen.getByRole("button", {name: "Short Trail"});
  act(() => {
    shortTrailButton.click();
  });
  // check for page by looking for the heading
  const shortTrailTitle = screen.getByRole("heading", {level: 1, name: /short trail/i});
  expect(shortTrailTitle).toBeInTheDocument();
});

test('NAVIGATION: Long Trail header goes to Long Trail', () => {
  // find and click "long trail" header
  const longTrailHeader = screen.getByRole("button", {name: /long trail/i});
  act(() => {
    longTrailHeader.click();
  });
  // check for page by looking for the heading
  const longTrailTitle = screen.getByRole("heading", {level: 1, name: /long trail/i});
  expect(longTrailTitle).toBeInTheDocument();
});

test('NAVIGATION: header quiz button + home button = home', () => {
  // find and click "short trail" header, then click home button
  const simpleQuizHeader = screen.getByRole("button", {name: "Short Trail"});
  const homeButton = screen.getByRole("button", {name: /home/i});

  act(() => {
    simpleQuizHeader.click();
    homeButton.click();
  });

  // check for page by looking for the heading
  const mainPageTitle = screen.getByRole("heading", {level: 1, name: /Career Pathfinder/i});
  expect(mainPageTitle).toBeInTheDocument();
});

// test('NAVIGATION: navigating to results page and back', () => {
//   //find short trail button and click it
//   const basicQuizButton = screen.getByRole("button", {name: /take short trail/i});
//   act(() => {
//     basicQuizButton.click();
//   });

//   //then find randomize button and click it, to answer all questions
//   const randomButton = screen.getByRole("button", {name: /randomize answers/i});
//   act(() => {
//     randomButton.click();
//   });

//   //randomize answers then press next button until end of basic quiz
//   for (let i = 0; i < 17; i++) {
//     const nextButton = screen.getByRole("button", {name: /next >>/i});
//     act(() => {
//       nextButton.click();
//     })
//   }

//   //then find submit answers button and click it, to go to results page
//   const resultsPageButton = screen.getByRole("button", {name: /submit answers/i});

//   act(() => {
//     resultsPageButton.click();
//   });

//   //identify results page by the heading, check if it's correct
//   const resultsPageTitle = screen.getByRole("heading", {level: 1, name: /basic quiz results/i});
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

test('API checker rejects invalid keys', async () => {
  // find and click api key button in header
  const apiKeyButton = screen.getByRole("button", {name: "Enter API Key"});

  await act( async () => {
    await userEvent.click(apiKeyButton);
  });

  // find the api key input field (by its label) and the button to check the api key
  const apiKeyTextField = screen.getByLabelText(/api key/i);
  const checkAPIKey = screen.getByRole("button", {name: "Check API"});

  // something random is typed in textbox, then check api key is clicked
  await act( async () => {
    await userEvent.type(apiKeyTextField, 'foomo\n');
    await userEvent.click(checkAPIKey);
  });

  // check that invalid key popup shows up
  const invalidKeyPopup = await screen.findByRole("heading", {level: 4, name: /Invalid API key, please input a valid API key./i})
  expect(invalidKeyPopup).toBeInTheDocument();
});