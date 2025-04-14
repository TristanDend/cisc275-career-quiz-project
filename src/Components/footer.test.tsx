import react from 'react';
import { act, render, screen } from '@testing-library/react';
import App from '../App'; // Adjusted the path to correctly locate the App component

beforeEach(() => {
    render(<App />);
});

test('All of footer renders', () => {
    // find and click "about us" popup
    const contactUsPopup = screen.getByRole("button", {name: /contact us/i});
    const ApiKeyButton = screen.getByRole("button", {name: /Enter API Key/i});
    const aboutUsPopup = screen.getByRole("button", {name: /about us/i});
    expect(contactUsPopup).toBeInTheDocument();
    expect(ApiKeyButton).toBeInTheDocument();
    expect(aboutUsPopup).toBeInTheDocument();
  });

test('api key popup works', () => {
    // find and click "api key" popup
    const apiKeyPopup = screen.getByRole("button", {name: /Enter API Key/i});
    act(() => {
        apiKeyPopup.click();
    });
    // check for popup by looking for the heading
    const apiKeyHeader = screen.getByTestId("APIKeyForm");
    expect(apiKeyHeader).toBeInTheDocument();
});

test('contact us popup works', () => {
  // find and click "contact us" popup
  const contactUsPopup = screen.getByRole("button", {name: /contact us/i});
  act(() => {
    contactUsPopup.click();
  });
  // check for popup by looking for the heading
  const contactUsHeader = screen.getByRole("heading", {level: 2, name: /contact us/i});
  expect(contactUsHeader).toBeInTheDocument();
});

test('about us popup works', () => {
  // find and click "about us" popup
  const aboutUsPopup = screen.getByRole("button", {name: /about us/i});
  act(() => {
    aboutUsPopup.click();
  });
  // check for popup by looking for the heading
  const aboutUsHeader = screen.getByRole("heading", {level: 2, name: /about us/i});
  expect(aboutUsHeader).toBeInTheDocument();
});

test('contact us close button works', () => {
    const contactUsPopup = screen.getByRole("button", {name: /contact us/i});
    act(() => {
        contactUsPopup.click();
    });
    // check for popup by looking for the heading
    const contactUsClose = screen.getByRole("button", {name: /Close/i});
    const contactUsHeader = screen.getByRole("heading", {level: 2, name: /contact us/i});
    act(() => {
        contactUsClose.click();
    });
    // check for popup by looking for the heading
    expect(contactUsHeader).not.toBeInTheDocument();
});

test('about us close button works', () => {
    const aboutUsPopup = screen.getByRole("button", {name: /about us/i});
    act(() => {
        aboutUsPopup.click();
    });
    // check for popup by looking for the heading
    const aboutUsHeader = screen.getByRole("heading", {level: 2, name: /about us/i});
    const aboutUsClose = screen.getByRole("button", {name: /Close/i});
    act(() => {
        aboutUsClose.click();
    });
    // check for popup by looking for the heading
    expect(aboutUsHeader).not.toBeInTheDocument();
});

