import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import {Footer} from './Components/footer'
import {Header} from './Components/header'
import { Button, Form } from 'react-bootstrap';
import { HomePage } from './Components/HomePage'
import { DetailedPage } from './Components/DetailedPage';
import Basic from './Components/Basic';

// local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData);
  const [isHome, setHome] = useState<boolean>(true);
  const [isBasic, setBasic] = useState<boolean>(false);
  const [isDetailed, setDetailed] = useState<boolean>(false);


  // sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  // whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <p>
          Group Members: 
          Tristan Dendorfer, 
          Zhenyuan Wang,
          Jacob Gordon, 
          Jia Qi
        </p>
      <Header setOnHome = {setHome} setOnBasic = {setBasic} setOnDetailed = {setDetailed}></Header>
      <Form className = 'App'>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </Form>
      {isHome && <HomePage></HomePage>}
      {isBasic && <Basic></Basic>}
      {isDetailed && <DetailedPage></DetailedPage>}
      <Footer></Footer>
    </div>
  );
}

export default App;
