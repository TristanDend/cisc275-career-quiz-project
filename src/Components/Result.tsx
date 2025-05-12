import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import '../CSS/Result.css'
import leafyVideo from '../assets/leafy_loading.mp4'; // Ensure TypeScript recognizes this as a string
import OpenAI from 'openai';
import basicQuestions from '../assets/question.json';
import { questions } from '../assets/DetailedPageQuestions'
import { ChatCompletion } from 'openai/resources/chat';
import basicInstructions from '../assets/BasicInstructions';
import detailedInstructions from '../assets/DetailedInstructions';

// Defining a type to describe the ChatGPT responses 
// worked is a boolean for whether ChatGPT worked
// everything from response onward is the type of the response sent by ChatGPT
type yesResponse = { worked: true; response: ChatCompletion & 
    { _request_id?: string | null | undefined; }};

// this is the type if ChatGPT sends an error, worked field is the same as above
type noError = { worked: false; error: Error };

// props interface for user answers
interface ResultsPageProps {
    userAnswers: string[][]; // storing user answers
    quizAnswered: string; // which quiz was done
    apiKey: string;
}

// the two interfaces below define a structure for the careers provided by ChatGPT
/**
 * Three careers are provided by ChatGPT (held in CareerResponse)
 * Career interface defines the format of all the information given by chatGPT
 */
interface Career {
    title: string;
    salary: number;
    education_level?: string; // optional if not always included
    description: string[];
    reason: string[]; // why it fits the user
  }
  
  interface CareerResponse {
    career_one: Career;
    career_two: Career;
    career_three: Career;
  }
  

// allows time for ChatGPT to get response without stopping the website
async function processResults(quizAnswered: string, userAnswers: string[][], apiKey: string): Promise<yesResponse | noError | undefined>  {

    // empty string as default instructions
    let instructions: string = "";

    // choosing which instruction to feed into ChatGPT, depending on which quiz was answered
    if (quizAnswered.toLowerCase() === "basic quiz") {
        instructions = basicInstructions;
    } else {
        instructions = detailedInstructions;
    }

    // Here is where the response is created
    const client = new OpenAI({apiKey: apiKey, dangerouslyAllowBrowser: true});
    try {
        
        // the actual response
        const response = await client.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                // using the role, ChatGPT first follows the system instructions before the user instructions
                { role: "system", content: instructions},
                { role: "user", content: `Give me three career recommendations based on these answers: ${userAnswers}, to the following questions: ${
                    quizAnswered === "basic" ? basicQuestions : questions}`
                    
                }],
                store: false, // response is not kept

                //format of response to clearly express results
                /**
                 * Response format is a json_schema, which defines a strict structure of the output
                 *      From line 84 -> line 182
                 * This strict structure is later used to map the response to variables of Career and CareerResponse type
                 * Saving it in variables makes the output MUCH easier to work with
                 */
                response_format: {
                    type: "json_schema",
                    json_schema: {
                        name: "Career-Recommendation",
                        description: "A list of 3 recommendations for a career based on the user's answers to the quiz.",
                        schema: {
                            type: "object",
                            properties: {
                                career_one: {
                                    type: "object",
                                    description: "The best recommended career for the user.",
                                    properties: {
                                        title: {
                                            type: "string",
                                            description: "The title of the recommended career.",
                                        },
                                        salary: {
                                            type: "number",
                                            description: "The average yearly salary for the recommended career.",
                                        },
                                        education_level: {
                                            type: "string",
                                            description: "The education level required for the recommended career.",
                                        },
                                        description: {
                                            type: ["string"],
                                            description: "The tasks performed by the recommended career. Each element of array is a seperate task",
                                        },
                                        reason: {
                                            type: ["string"],
                                            description: "The reasons why the recommended career fits the user's answers. Each element of array is a seperate reason",
                                        },
                                    },
                                    required: ["title", "description", "salary", "reason"],
                                },

                                career_two: {
                                    type: "object",
                                    description: "The second best recommended career for the user.",
                                    properties: {
                                        title: {
                                            type: "string",
                                            description: "The title of the recommended career.",
                                        },
                                        salary: {
                                            type: "number",
                                            description: "The average yearly salary for the recommended career.",
                                        },
                                        education_level: {
                                            type: "string",
                                            description: "The education level required for the recommended career.",
                                        },
                                        description: {
                                            type: ["string"],
                                            description: "The tasks performed by the recommended career. Each element of array is a seperate task",
                                        },
                                        reason: {
                                            type: ["string"],
                                            description: "The reasons why the recommended career fits the user's answers. Each element of array is a seperate reason",
                                        },
                                    },
                                    required: ["title", "description", "salary", "reason"],
                                },

                                career_three: {
                                    type: "object",
                                    description: "The third best recommended career for the user.",
                                    properties: {
                                        title: {
                                            type: "string",
                                            description: "The title of the recommended career.",
                                        },
                                        salary: {
                                            type: "number",
                                            description: "The average yearly salary for the recommended career.",
                                        },
                                        education_level: {
                                            type: "string",
                                            description: "The education level required for the recommended career.",
                                        },
                                        description: {
                                            type: ["string"],
                                            description: "The tasks performed by the recommended career. Each element of array is a seperate task",
                                        },
                                        reason: {
                                            type: ["string"],
                                            description: "The reasons why the recommended career fits the user's answers. Each element of array is a seperate reason",
                                        },
                                    },
                                    required: ["title", "description", "salary", "reason"],
                                }
                            },
                            required: quizAnswered.toLowerCase() === "Basic Quiz" ? ["career_title", "description", "salary", "reason"] : ["career", "description", "education_level", "salary", "reason", "adjacent_careers"],

                        }
                    }
                }

        });
        return { worked: true, response: response };
    } catch (error) {
        if (error instanceof OpenAI.APIError) return { worked: false, error: error};
    }
}

// main body of results page
export function ResultPage({ userAnswers, quizAnswered, apiKey }: ResultsPageProps): React.JSX.Element {
    const [response, setResponse] = useState<Awaited<ReturnType<typeof processResults>> | null>(null); // ChatGPT response
    const [loadResults, setLoadResults] = useState<boolean>(true); // For loading screen, tells if the response is loading
    const [finishResults, setFinishResults] = useState<boolean>(false); // For loading screen, tells if response is done 

    // Turns response into a useable value
    useEffect(() => {
        processResults(quizAnswered, userAnswers, apiKey).then(setResponse)

        // Sets loadResults to false and finishResults to true after 5 seconds
        const loadTimer = setTimeout(() => {
            setLoadResults(false);
            setFinishResults(true);
            const finishTimer = setTimeout(() => {
                setFinishResults(false);
            }, 4000) // 4 seconds
            return () => {clearTimeout(finishTimer)}
        }, 5530); // 5.53 seconds

        return () => {clearTimeout(loadTimer)}; // cleanup
    }, [quizAnswered, userAnswers, apiKey]);

    return (
        <div className="resultsPage-Style">
            <center><h1 className='resultsPage-Title'>{quizAnswered} Results</h1></center>
            <Popup open={loadResults} closeOnDocumentClick={false}>
                {
                  <div id="ResultsInitialPopup">
                    <p id="ResultsInitialPopupText">Processing Your Answers</p>
                    <video id="loadingImage" width="129" height="129" autoPlay muted>
                        <source src={leafyVideo}/>
                    </video>
                  </div>
                }
            </Popup>
            <Popup open={finishResults} closeOnDocumentClick={false}>
                {
                    <div id="ResultsInitialPopup">
                        <p id="ResultsInitialPopupText">Your Results Are In!</p>
                        <video id="loadingImage" width="129" height="129" autoPlay muted>
                            <source src={`${leafyVideo}#t=5.53`}/>
                        </video>
                    </div>
                }
            </Popup>
            {response && response.worked && (
                    (() => {
                        const content: string = response.response.choices[0].message.content ?? '{}';
                        let data: CareerResponse = JSON.parse(content) as CareerResponse;

                        // Parse the response to extract career information
                        // Assuming the response is in the format you provided, you can access the careers like this:
                        const careers = [data.career_one, data.career_two, data.career_three];

                        return (
                        <div className='career-results'>
                            <h1 className="resultsPage-SubTitle">Career Recommendations</h1>
                            {careers.map((career, index) => (
                            <div key={index} className="career_section">
                                <h2 className="career_name">Career {index + 1}: {career.title}</h2>

                                <h3 className="career_subheading">Description</h3>
                                <ul className="career_text_list">{career.description.map((des_sentence, index) => (
                                    <li key={index}>{des_sentence}</li>
                                ))}</ul>

                                <h3 className="career_subheading">Salary</h3>
                                <p className="career_text_list">${career.salary.toLocaleString()}</p>

                                {career.education_level && (
                                <>
                                    <h3 className="career_subheading">Education Level</h3>
                                    <p className="career_text_list">{career.education_level}</p>
                                </>
                                )}

                                <h3 className="career_subheading">Reason</h3>
                                <ul className="career_text_list">{career.reason.map((reason_sentence, index) => (
                                    <li key={index}>{reason_sentence}</li>
                                ))}</ul>
                            </div>
                            ))}
                        </div>
                        );
                    })()
                )
            }
            {/*runs if response is not successful*/}
            {response && !response.worked && (
                <div className="error-message">
                    <h2>Error</h2>
                    <p>{response.error.message}</p>
                </div>
            )}
            {/* <div>{quizAnswered} Answers: {JSON.stringify(userAnswers)}</div> */}
        </div>
    )
}