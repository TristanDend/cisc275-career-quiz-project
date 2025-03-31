import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './App.css';
import { HomePage } from './Home_Page/HomePage';
import Basic from './Home_Page/Basic';

// local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData);

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
    <BrowserRouter>
      <div className="App">
 
          {/* 可以放入 logo 和其他 header 内容 */}
        
        <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insert API Key Here"
            onChange={changeKey}
          />
          <br />
          <Button className="Submit-Button" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
        {/* 路由配置 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Basic" element={<Basic />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
