import React from 'react'
import Routing from './routes/Routes'
// Import Parse minified version
import Parse from 'parse/dist/parse.min.js';

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'jJoj6WF7MxcXs3IdhylDfaGOgTTOWybJWzSRCQm0';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'sk3P1bRTxGJ88RsdlalI2liEhD7p5tsSIJmqxpC1';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  
  return (
    <>
      <Routing/>
      
    </>
  );
}

export default App;
