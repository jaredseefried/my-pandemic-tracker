// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Globe from "./pages/globe/Globe";
import Splash from "./pages/splash"
import Info from "./components/info/Info";

import { SemipolarLoading } from "react-loadingg";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 6000);
  }, []);

  return (
    <>
      {loading === false ? (
        <Router>
          <div className="App">
            <Route exact path = "/" component ={Splash}/>
            <Route exact path ="/globe" component={Globe}/>
            <Route exact path ="/globe" component={Info}/>
          </div>
        </Router>
      ) : (
        <SemipolarLoading color ="#FF1400" />
      )}
      )
    </>
  );
}

export default App;
