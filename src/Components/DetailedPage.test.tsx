import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { DetailedPage } from "./DetailedPage";

describe("DetailedPage Component Tests", () => {
    beforeEach(() => {  
        render(<DetailedPage setDetailedAns={jest.fn()} setOnResults={jest.fn()} setOnDetailed={jest.fn()} setQuizAnswered={jest.fn()}></DetailedPage>);
    }); // test variable placeholders as values for the detailed page lifted states

    test("Necessary elements appear (Clear, Title, Previous, Next, Randomize Answers).", () => {
        const detailedTitle = screen.getByText("Long Trail"); // get title element
        const prevButton = screen.getByRole("button", {name: "<< Previous"}); // get previous button
        const nextButton = screen.getByRole("button", {name: "Next >>"}); // get next button
        const randomButton = screen.getByRole("button", {name: /randomize answers/i}); // get random answers button
        const clearButton = screen.getByRole("button", {name: /clear answers/i}); // get clear answers button
        expect(clearButton).toBeInTheDocument(); // tests if clear button shows up on website
        expect(detailedTitle).toBeInTheDocument(); // tests if title shows up on website
        expect(prevButton).toBeInTheDocument(); // tests if previous button shows up on website
        expect(nextButton).toBeInTheDocument(); // tests if next button shows up on website
        expect(randomButton).toBeInTheDocument(); // tests if random answers button shows up on website
    });

    test("There are the same amount of questions as answers.", () => {
        const questionElements = screen.getAllByRole("question"); // get all question elements
        const answerElements = screen.getAllByRole("answer"); // get all answer elements
        expect(questionElements.length === answerElements.length); // tests if the same amount of questions shown matches the amount of answers shown
    });

    test("Progress bar updates based on user input.", async () => {
        const answerElements = screen.getAllByRole("answer"); // get all answer elements
        const progressbar = screen.getByRole("detailed-progressContent"); // get the progress bar element
        await act(async () => {
            userEvent.type(answerElements[0], "TestAnswer1");
        }); // imitates a user typing a text answer input
        expect(parseInt(progressbar.style.width) > 0); // tests if the user typing increases the progress bar
        await act(async () => {
            userEvent.clear(answerElements[0]);
        }); // imitates a user clearing a text answer input
        expect(parseInt(progressbar.style.width) === 0); // tests if the user clearing decreases the progress bar
    });

    test("Background zooms in based on user input.", async () => {
        const answerElements = screen.getAllByRole("answer"); // get all answer elements
        const detailedBgImg = screen.getByRole("detailed-bgImg"); // get the background image for detailed quiz
        await act (async () => {
            userEvent.type(answerElements[0], "TestAnswer1");
        }); // imitates a user typing a text answer input
        expect(parseInt(detailedBgImg.style.scale) > 100); // tests if the user typing zooms in background image
        await act (async () => {
            userEvent.clear(answerElements[0]);
        }); // imitates a user clearing a text answer input
        expect(parseInt(detailedBgImg.style.scale) === 100); // tests if the user typing zooms out background image
    })
})