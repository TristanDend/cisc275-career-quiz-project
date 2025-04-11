export interface Option {
    optionId: number,
    optionText: string
}

export interface Question {
    questionId: number,
    questionType: string,
    questionText: string,
    options: Option[]
}

export const questions: Question[] = [
    { 
        questionId: 1,
        questionType: "checkbox",
        questionText: "What topics interest you? (Select all that apply)", 
        options : [
            { optionId: 1, optionText: "Math" },
            { optionId: 2, optionText: "Sciences" }, 
            { optionId: 3, optionText: "English" }, 
            { optionId: 4, optionText: "Social Studies and History" },
            { optionId: 5, optionText: "Art" }, 
            { optionId: 6, optionText: "Music" }, 
            { optionId: 7, optionText: "Foreign Language"}
        ] 
    },
    { 
        questionId: 2,
        questionType: "radio",
        questionText: "What subject did you do the best in while you were in school?",
        options : [
            { optionId: 1, optionText: "Math" },
            { optionId: 2, optionText: "Sciences" }, 
            { optionId: 3, optionText: "English" }, 
            { optionId: 4, optionText: "Social Studies and History" },
            { optionId: 5, optionText: "Art" }, 
            { optionId: 6, optionText: "Music" }, 
            { optionId: 7, optionText: "Foreign Language"}
        ] 
    },
    { 
        questionId: 3,
        questionType: "radio",
        questionText: "What type of degree do you plan to get?",
        options: [
            { optionId: 1, optionText: "No Degree" },
            { optionId: 2, optionText: "Associate's" },
            { optionId: 3, optionText: "Bachelor's" },
            { optionId: 4, optionText: "Master's" },
            { optionId: 1, optionText: "PHD" }
        ]
    },
    {  
        questionId: 4,
        questionType: "short-answer",
        questionText: "What is your favority hobby and why?",
        options: []
    },
    { 
        questionId: 5,
        questionType: "slider",
        questionText: "On a scale from 1-10, how well do you perform under stress?",
        options: []
    },
    { 
        questionId: 6,
        questionType: "short-answer",
        questionText: "What do you hope to gain out of a job?",
        options: []
    },
    { 
        questionId: 7,
        questionType: "short-answer",
        questionText: "You have a day off. How do you spend your time?",
        options: []
    },
    { 
        questionId: 8,
        questionType: "short-answer",
        questionText: "What is your deepest fear?",
        options: []
    },
    { 
        questionId: 9,
        questionType: "short-answer",
        questionText: "What are your best soft skills?",
        options: []
    }
]