import React, { useState } from 'react';
import './App.css';
import {Footer} from './Components/footer'
import {Header} from './Components/header'
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
const prevKey = localStorage.getItem(saveKeyData);
const keyData: string = parseJson(prevKey);

function App() {
  
  function updateKey(): number {
    if (localStorage.getItem(saveKeyData)) return 2;
    else return 0;
  }

  const [key, setKey] = useState<string>(keyData.toString());
  const [isHome, setHome] = useState<boolean>(true);
  const [isBasic, setBasic] = useState<boolean>(false);
  const [isDetailed, setDetailed] = useState<boolean>(false);
  const [isResultPage, setResultPage] = useState<boolean>(false);
  const [apiKeyShow, setApiShow] = useState<boolean>(false);
  const [apiKeyWork, setApiKeyWork] = useState<number>(updateKey());
  const [checkApiKey, setCheckApiKey] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);
  const [quizAnswered, setQuizAnswered] = useState<string>("");

  async function testAPI(): Promise<boolean> {
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

  function checkAPI() {
    testAPI().then(setCheckApiKey);
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
      <Popup className='api-test' open={apiKeyWork === 1} closeOnDocumentClick={false}>
        {
          <div className='api-test'>
            Invalid API key, please input a valid API key.
            <Button className="api-test-button" onClick={() => {
              setCheckApiKey(false);
              setApiKeyWork(0);
              close();
            }}>Close</Button>
          </div>
        }
      </Popup>
      <Header apiKeyWork={apiKeyWork} setOnHome={setHome} setOnBasic={setBasic} setOnDetailed={setDetailed} setOnResults={setResultPage}></Header>
      {isHome && <HomePage apiKeyWork={apiKeyWork} setOnBasic={setBasic} setOnHome={setHome} setOnDetailed={setDetailed}></HomePage>}
      {isBasic && <Basic setBasicAns={setUserAnswers} setOnBasic={setBasic} setOnResults={setResultPage} setQuizAnswered={setQuizAnswered}></Basic>}
      {isDetailed && <DetailedPage setDetailedAns={setUserAnswers} setOnDetailed={setDetailed} setOnResults={setResultPage} setQuizAnswered={setQuizAnswered}></DetailedPage>}
      {isResultPage && <ResultPage userAnswers={userAnswers} quizAnswered={quizAnswered} apiKey={key}></ResultPage>}
      <Footer setApiOpen = {setApiShow}></Footer>
      <div className="App-footer">
        {apiKeyShow && <Form className = 'App' data-testid='APIKeyForm'>
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
