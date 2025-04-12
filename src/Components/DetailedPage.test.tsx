import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { DetailedPage } from "./DetailedPage";

describe("DetailedPage Component Tests", () => {
    beforeEach(() => {  
        render(<DetailedPage setOnResults={jest.fn()} setOnDetailed={jest.fn()}></DetailedPage>);
    });    

    test("Necessary elements appear (Clear, Submit, Title).", () => {
        const detailedTitle = screen.getByText("Detailed Questions"); // get title element
        const clearButton = screen.getByRole("button", {name: "Clear Answers"}); // get clear button
        const submitButton = screen.getByRole("button", {name: "Get Answers"}); // get submit button
        expect(detailedTitle).toBeInTheDocument();
        expect(clearButton).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test("There are the same amount of questions as answers.", () => {
        const questionElements = screen.getAllByRole("question"); // get all question elements
        const answerElements = screen.getAllByRole("answer"); // get all answer elements
        expect(questionElements.length === answerElements.length);
    });

    test("Progress bar updates based on user input.", async () => {
        const answerElements = screen.getAllByRole("answer"); // get all answer elements
        const progressbar = screen.getByRole("progressContent"); // get the progress bar element
        await act(async () => {
            userEvent.type(answerElements[0], "TestAnswer1");
        });
        expect(parseInt(progressbar.style.width) > 0);
        await act(async () => {
            userEvent.clear(answerElements[0]);
        });
        expect(parseInt(progressbar.style.width) === 0);
    });
})