import React from 'react';
import { act } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { HomePage} from './HomePage';
import Basic from './Basic';
import { DetailedPage } from './DetailedPage';


describe('Header Component Tests', () => {
    beforeEach(() => {
        render(<Header setOnHome={jest.fn()} setOnBasic={jest.fn()} setOnDetailed={jest.fn()} />);
    });
    test("renders header buttons", () => {
        const homeButton = screen.getByText(/home/i);
        const basicButton = screen.getByText(/simple quiz/i);
        const detailedButton = screen.getByText(/detailed quiz/i);
        expect(homeButton).toBeInTheDocument();
        expect(basicButton).toBeInTheDocument();
        expect(detailedButton).toBeInTheDocument();
    });
});