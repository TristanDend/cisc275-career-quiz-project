import React, { useState } from 'react';
import './App.css';
import { Footer } from './Components/footer'
import { Header } from './Components/header'
import { Button, Form } from 'react-bootstrap';
import { HomePage } from './Components/HomePage'
import { DetailedPage } from './Components/DetailedPage';
import { ResultPage } from './Components/Result';
import Basic from './Components/Basic';
import OpenAI from 'openai';
import Popup from 'reactjs-popup';

// local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
const saveKeyData: string = "MYKEY";
function parseJson<T>(keyString: string | null): T {
  if (keyString !== null) return JSON.parse(keyString) as T;
  return "" as T;
}

// Get api key from local storage if it exists there
const prevKey = localStorage.getItem(saveKeyData);
const keyData: string = parseJson(prevKey);

function App() {
  
  // update api key taken from local storage
  function updateKey(): number {
    if (localStorage.getItem(saveKeyData)) return 2;
    else return 0;
  }

  const [key, setKey] = useState<string>(keyData.toString());
  const [isHome, setHome] = useState<boolean>(true); // sets whether home page is on
  const [isBasic, setBasic] = useState<boolean>(false); // sets whether basic quiz page is on
  const [isDetailed, setDetailed] = useState<boolean>(false); // sets whether detailed quiz page is on
  const [isResultPage, setResultPage] = useState<boolean>(false); // sets whether results page is on
  const [apiKeyShow, setApiShow] = useState<boolean>(false); // sets whether api page is on
  const [apiKeyWork, setApiKeyWork] = useState<number>(updateKey()); // whether api key was valid
  const [checkApiKey, setCheckApiKey] = useState<boolean>(false); // whether api key has been checked or not
  const [userAnswers, setUserAnswers] = useState<string[][]>([]); // holding user answers
  const [quizAnswered, setQuizAnswered] = useState<string>(""); // which quiz was answered

  async function testAPI(): Promise<boolean> {

    // functions opens a test session of ChatGPT, in order to check to see if the API key was valid
    // returns true if worked, false if not
    const testClient = new OpenAI({apiKey: key, dangerouslyAllowBrowser: true});
    try {
      const test = await testClient.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: "x"}],
        store: false
      })
      return true;
    } catch (error) {
      setApiKeyWork(1);
      return false;
    } 
  }

  // check API, then if true, set the API key
  function checkAPI() {
    if (!key) testAPI().then(setCheckApiKey);
    else setApiKeyWork(1);
  }

  // sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  /* whenever there's a change it'll store the api key in a local state called key but 
  it won't be set in the local storage until the user clicks the submit button */
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <div className="App">
      {/* API Popup which appears if the inputted API key was incorrect */}
      <Popup className='api-test' open={apiKeyWork === 1} closeOnDocumentClick={false}>
        {
          <div className='api-test'>
            Invalid API key, please input a valid API key.
            <Button className="api-test-button" onClick={() => {
              setCheckApiKey(false);
              setApiKeyWork(0);
            }}>Close</Button>
          </div>
        }
      </Popup>

      {/* Header */}
      <Header apiKeyWork={apiKeyWork} setOnHome={setHome} setOnBasic={setBasic} setOnDetailed={setDetailed} setOnResults={setResultPage}></Header>

      {/* Home Page */}
      {isHome && <HomePage apiKeyWork={apiKeyWork} setOnBasic={setBasic} setOnHome={setHome} setOnDetailed={setDetailed}></HomePage>}

      {/* Basic Questions Page */}
      {isBasic && <Basic setBasicAns={setUserAnswers} setOnBasic={setBasic} setOnResults={setResultPage} setQuizAnswered={setQuizAnswered}></Basic>}

      {/* Detailed Questions Page */}
      {isDetailed && <DetailedPage setDetailedAns={setUserAnswers} setOnDetailed={setDetailed} setOnResults={setResultPage} setQuizAnswered={setQuizAnswered}></DetailedPage>}

      {/* Results Page */}
      {isResultPage && <ResultPage userAnswers={userAnswers} quizAnswered={quizAnswered} apiKey={key}></ResultPage>}

      {/* Footer */}
      <Footer setApiOpen = {setApiShow}></Footer>
      
      {/* API Key Submission Section */}
      <div className="App-footer">
        {apiKeyShow && <Form className = "apiKeyEntry" data-testid='APIKeyForm'>
          <Form.Label>API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br></br>
          <Button className="Submit-Button" onClick={checkAPI}>Check API {checkApiKey && <div>✔️</div>}</Button>
          <Button className="Submit-Button" onClick={handleSubmit} disabled={!checkApiKey}>Submit</Button>
        </Form>}
      </div>
    </div>
  );
}

export default App;
