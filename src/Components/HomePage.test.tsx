import React from 'react';
import { render, screen } from '@testing-library/react';
import { HomePage } from './HomePage';

// renders the home page before each test
beforeEach(() => {
    render(<HomePage apiKeyWork={2} setOnHome={jest.fn()} setOnBasic={jest.fn()} setOnDetailed={jest.fn()}/>)
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

