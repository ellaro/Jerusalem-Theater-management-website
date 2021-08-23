import './App.css';
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import File from "./Components/File";
import Archive from "./Components/Archive";
import Production from "./Components/Production";
import Calendar from "./Components/Calendar";
import React from 'react';

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Home" component={HomePage} />
            <Route exact path="/File" component={File} />
            <Route exact path="/Archive" component={Archive} />
            <Route exact path="/Calendar" component={Calendar} />
            <Route exact path="" component={Production} />
            
          </Switch>
        </Router>

        
      </header>

      {/* <button style={{width: 100, height: 50}} onClick={handleClick}>Add Event</button> */}
      {/* <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FJerusalem&amp;src=dGhlYXRlcmplcnVzYWxlbUBnbWFpbC5jb20&amp;color=%23039BE5&amp;showTitle=0" ></iframe> */}
      <Footer className='footer'/>
    </div>
  );
}

export default App;





