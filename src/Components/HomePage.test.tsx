import React from 'react';
import { render, screen } from '@testing-library/react';
import { HomePage } from './HomePage';

// renders the home page before each test
beforeEach(() => {
    render(<HomePage isTestingMode={false} apiKeyWork={2} setOnHome={jest.fn()} setOnBasic={jest.fn()} setOnDetailed={jest.fn()}/>)
});

test('Can find certain text', () => {
    // test Career Pathfinder is on the screen
    const quizTitle = screen.getByText("Career Pathfinder");
    expect(quizTitle).toBeInTheDocument();

    // test Short Trail is on the screen
    const basicQuestionTitle = screen.getByText("Short Trail");
    expect(basicQuestionTitle).toBeInTheDocument();

    // test Longer trail is on the screen
    const detailedQuestionTitle = screen.getByText("Longer Trail");
    expect(detailedQuestionTitle).toBeInTheDocument();
});

