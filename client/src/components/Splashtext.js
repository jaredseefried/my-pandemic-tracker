import React from "react";
import "./splashtext.css";
import { Button } from "react-bootstrap";

function splashText() {
  return (
    <div className="container-fluid">
      <div className="row">
        <h1 className="textEdit col-12">Welcome</h1>
        <div className="row">
          <p className="textEdit1 col-12">
            Explore <strong>Pandemic Tracker</strong> to see how our world is
            dealing with COVID-19.
          </p>
        </div>
        <div className="row">
          <Button variant="secondary" className="textEdit4 col-2" href="/globe">
            Enter
          </Button>
        </div>
      </div>

      <p className="textEdit2 fade-in">Pandemic Tracker</p>
      <p className="textEdit3 fade-in">Pandemic Tracker</p>
    </div>
  );
}

export default splashText;
