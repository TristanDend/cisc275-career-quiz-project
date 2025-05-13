import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { DetailedPage } from "./DetailedPage";

describe("DetailedPage Component Tests", () => {
    beforeEach(() => {  
        render(<DetailedPage setDetailedAns={jest.fn()} setOnResults={jest.fn()} setOnDetailed={jest.fn()} setQuizAnswered={jest.fn()}></DetailedPage>);
    });    

    test("Necessary elements appear (Clear, Submit, Title).", () => {
        const detailedTitle = screen.getByText("Long Trail"); // get title element
        const prevButton = screen.getByRole("button", {name: "<< Previous"}); // get previous button
        const nextButton = screen.getByRole("button", {name: "Next >>"}); // get next button
        const randomButton = screen.getByRole("button", {name: /randomize answers/i}); // get random answers button
        const clearButton = screen.getByRole("button", {name: /clear answers/i}); // get clear answers button
        expect(clearButton).toBeInTheDocument();
        expect(detailedTitle).toBeInTheDocument();
        expect(prevButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
        expect(randomButton).toBeInTheDocument();
    });

    // test("There are the same amount of questions as answers.", () => {
    //     const questionElements = screen.getAllByRole("question"); // get all question elements
    //     const answerElements = screen.getAllByRole("answer"); // get all answer elements
    //     expect(questionElements.length === answerElements.length);
    // });

    // test("Progress bar updates based on user input.", async () => {
    //     const answerElements = screen.getAllByRole("answer"); // get all answer elements
    //     const progressbar = screen.getByRole("progressContent"); // get the progress bar element
    //     await act(async () => {
    //         userEvent.type(answerElements[0], "TestAnswer1");
    //     });
    //     expect(parseInt(progressbar.style.width) > 0);
    //     await act(async () => {
    //         userEvent.clear(answerElements[0]);
    //     });
    //     expect(parseInt(progressbar.style.width) === 0);
    // });
})