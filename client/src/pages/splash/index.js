import React from "react";
import "./splash.css";
import { Typing, TypingStep } from "typing-effect-reactjs";
import { Card, Container, Row, Col, Button} from "react-bootstrap";

function background(e){
    e.target.style.height = "400px";
  
   
    console.log("over")

}

function backgroundEnd(e){
    e.target.style.height = '300px';
}


function Splash() {
 

  return (
    <Container fluid className="display">
      <Row>
        <div className="col-2"></div>
        <div className="col-8">
          <div className="move">
            <Typing
              styleClass="white"
              element="h1"
              typeSpeed="200"
              text="Welcome To GlobeTracker"
            />
            <Typing
              styleClass="p-white"
              element="p"
              typeSpeed="40"
              text="Coronavirus disease 2019 (COVID-19) is a respiratory illness caused by a virus called SARS-CoV-2. Symptoms often include cough, shortness of breath, fever, chills, muscle pain, sore throat, or new loss of taste or smell. GlobeTracker allows you to track current global coronavirus trends."
            />
          </div>
        </div><div  className="col-xs-12 col-md-4"></div>
      </Row>
      <Row>
          <div className="col-xs-12 col-md-2"></div>
          <div className=" col-xs-12 col-md-8">
              <Button href="/globe" variant="outline-light" className="text">Explore The World</Button>
          </div>
          <div className="col-xs-12 col-md-2"></div>
      </Row>

      <Row className="move">
          <div className="col-xs-12 col-sm-8 col-md-4 right w3-animate-right">
             
                  <a href="https://www.livescience.com/first-case-coronavirus-found.html" target="_blank" onMouseOver={background} onMouseLeave={backgroundEnd}>
                  <img src="https://images.squarespace-cdn.com/content/v1/5c4085e585ede1f50f94a4b9/1581018457505-JM3FO6WMFN9BGP3IOE8D/ke17ZwdGBToddI8pDm48kL5hQm_JZO5i_9Equza1B-57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1URbcWFoTofQNHE0Fe4ADwtkYw2N2aveJw6FaFCcRrQmU3WUfc_ZsVm9Mi1E6FasEnQ/2019-nCoV-CDC-23312_without_background.png" alt="corona" className="img" ></img>
                  </a>
          </div>
          <div className="col-xs-12 col-sm-8 col-md-4 bottom w3-animate-bottom">
              <div className="changeColor"> 
              
              <iframe width="560" height="315" src="https://www.youtube.com/embed/78jLBNSqc3g" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
          </div>
          <div className="col-xs-12 col-sm-8 col-md-4 left w3-animate-left" onMouseOver={background} onMouseLeave={backgroundEnd}>
              <a href="https://www.coronavirustoday.com/" target="_blank">
                  <img src ="https://alliedmachine.com/AlliedMachine/media/AlliedMasterPageImages/Company/covid-19-alert.png" alt="coroniebologna" className="img"></img>
              </a>
          </div>
      </Row>

      
    </Container>
  );
}

export default Splash;
