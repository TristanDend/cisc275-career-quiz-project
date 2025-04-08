import React from 'react';
import { render, screen } from '@testing-library/react';
import { HomePage } from '../Components/HomePage';

// renders the home page before each test
beforeEach(() => {
    render(<HomePage></HomePage>)
});

test('Can find certain text', () => {
    // test Da Quiz is on the screen
    const quizTitle = screen.getByText("Da Quiz");
    expect(quizTitle).toBeInTheDocument();

    // test basic questions is on the screen
    const basicQuestionTitle = screen.getByText("Basic Questions");
    expect(basicQuestionTitle).toBeInTheDocument();

    // test detailed questions is on the screen
    const detailedQuestionTitle = screen.getByText("Detailed Questions");
    expect(detailedQuestionTitle).toBeInTheDocument();
});

test('The basic question button goes to basic quiz', () => {
    // find and click basic button
    const basicQuestionButton = screen.getByRole("button", {name: /go to basic questions/i})
    basicQuestionButton.click();
});

test('The detailed question button goes to detailed quiz', () => {
    // find and click detailed button
    const detailedQuestionButton = screen.getByRole("button", {name: /go to detailed questions/i})
    detailedQuestionButton.click();
});

