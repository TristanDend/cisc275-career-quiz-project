import React from 'react';
import { act } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { Header } from './header';


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
    test("basic button is enabled", () => {
        const basicButton = screen.getByText(/Simple Quiz/i);
        expect(basicButton).not.toBeDisabled();
    });
    test("detailed button is enabled", () => {
        const detailedButton = screen.getByText(/Detailed Quiz/i);
        expect(detailedButton).not.toBeDisabled();
    });
    test("home button is disabled", () => {
        const homeButton = screen.getByText(/Home/i);
        expect(homeButton).toBeDisabled();
    });
    test("home button is enabled when other button is clicked", async () => {
        const detailedButton = screen.getByText(/Detailed quiz/i);
        const homeButton = screen.getByText(/Home/i);
        await act(async () => {
            detailedButton.click();
        });
        expect(homeButton).toBeEnabled();
        expect(detailedButton).toBeDisabled();
        expect(screen.getByText(/Simple Quiz/i)).toBeEnabled();
    });
    test("basic button is enabled when other button is clicked", async () => {
        const homeButton = screen.getByText(/Home/i);
        const basicButton = screen.getByText(/Simple Quiz/i);
        await act(async () => {
            homeButton.click();
        });
        expect(basicButton).toBeEnabled();
        expect(homeButton).toBeDisabled();
        expect(screen.getByText(/Detailed Quiz/i)).toBeEnabled();
    });
    test("detailed button is enabled when other button is clicked", async () => {
        const basicButton = screen.getByText(/Simple Quiz/i);
        const detailedButton = screen.getByText(/Detailed Quiz/i);
        await act(async () => {
            basicButton.click();
        });
        expect(detailedButton).toBeEnabled();
        expect(basicButton).toBeDisabled();
        expect(screen.getByText(/Home/i)).toBeEnabled();
    });
});