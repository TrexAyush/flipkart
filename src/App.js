import {React,useEffect} from 'react'
import Routing from './routes/Routes'
import { useLocation } from 'react-router-dom';

// Import Parse minified version
import Parse from 'parse/dist/parse.min.js';


// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'OcRT8lralxaX4rBhe7rA40qjC6swrH3pymxVKoP5';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'MAcm8PYYY2VHGhpHlotwPzMtCN5aoxQFB7N1HGnO';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;


function App() {
  const { pathname } = useLocation();
     // always scroll to top on route/path change
    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }, [pathname])

    // disable right click
    window.addEventListener("contextmenu", (e) => e.preventDefault());
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 123) e.preventDefault();
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  });
  return (
    <>
      <Routing/>
      
    </>
  );
}

export default App;
