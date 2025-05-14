import React from 'react';
import { act } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { HomePage} from './HomePage';
import Basic from './Basic';
import { DetailedPage } from './DetailedPage';


describe('Header Component Tests', () => {
    beforeEach(() => {
        render(<Header isTestingMode={false} apiKeyWork={2} setOnHome={jest.fn()} setOnBasic={jest.fn()} setOnDetailed={jest.fn()} setOnResults={jest.fn()} />);
    });
    test("renders header buttons", () => {
        const homeButton = screen.getByText(/home/i);
        const basicButton = screen.getByText(/short trail/i);
        const detailedButton = screen.getByText(/long trail/i);
        expect(homeButton).toBeInTheDocument();
        expect(basicButton).toBeInTheDocument();
        expect(detailedButton).toBeInTheDocument();
    });
});