import React from "react";
import "../../src/App.css";
import { Button } from "react-bootstrap";

function splashText() {
  return (
    <div className="container-fluid splash-container">
      <div className="row">
        <h1 className="textEdit col-12">Welcome</h1>
      </div>
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
  );
}

export default splashText;
