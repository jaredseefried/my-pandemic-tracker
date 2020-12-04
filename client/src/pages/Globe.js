import React, {useState, useEffect} from 'react'
import ReactGlobe from 'react-globe';
import axios from 'axios';
import Info from '../components/Info.js'
import './globe.css'
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import covidCountries from "./covidMarkers.json";

// FORMATTING COVID LIST TO MATCH GLOBE REACT PARAMETERS - ANDY ADD
for(var i=0; i<covidCountries.length; i++){
  covidCountries[i].value = (i+1)
  covidCountries[i].id = (i+1)
  covidCountries[i].color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
}
function markerTooltipRenderer(marker) {
  return `COUNTRY: ${marker.country} (Value: ${marker.value})`;
}
const options = {
  markerTooltipRenderer,
  ambientLightColor: 'red',
  globeGlowColor: 'blue'
};
function Globe() {
  const randomMarkers = covidCountries.map((marker) => ({
    ...marker,
    value: Math.floor(Math.random() * 100)
  }));
  const [markers, setMarkers] = useState([]);
  const [covidData, setCovidData] = useState([]);

  const [details, setDetails] = useState(null);
  ///////////////////////////////////////
  // THIS FUNCTION MAKES API CALL TO COVID DATA
  // AND THEN ADDS THE DATA TO THE COUNTRY OBJECT
  useEffect(() => {
    loadAllData()
  }, []) 

  function loadAllData() {
    var options = {
      method: 'GET',
      url: 'https://covid-19-tracking.p.rapidapi.com/v1',
      headers: {
        'x-rapidapi-key': 'aa4bbfbbc6msh943bc8aba837399p1827ebjsnde6bed3202fa',
        'x-rapidapi-host': 'covid-19-tracking.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      var covidData = response.data
      console.log(covidData[0][`Active Cases_text`]);
      // THIS LOOP ADDS THE COVID DATA TO THE CORRESPONDING COUNTRY OBJECT
      for(var i=0;i<randomMarkers.length; i++){  
          randomMarkers[i].activeCases = response.data[randomMarkers[i].covidIndex][`Active Cases_text`]
          randomMarkers[i].newCases = response.data[randomMarkers[i].covidIndex][`New Cases_text`]
          randomMarkers[i].newDeaths = response.data[randomMarkers[i].covidIndex][`New Deaths_text`]
          randomMarkers[i].totalCases = response.data[randomMarkers[i].covidIndex][`Total Cases_text`]
          randomMarkers[i].totalDeaths = response.data[randomMarkers[i].covidIndex][`Total Deaths_text`]
          randomMarkers[i].totalRecovered = response.data[randomMarkers[i].covidIndex][`Total Recovered_text`]
      }
      // EVERYTHING CONSOLE LOGS OUT SO FAR...
      
    }).catch(function (error) {
      console.error(error);
    });
    setMarkers(randomMarkers)
  }

  console.log(markers);
  
  // function renderCovidData() {
  //   console.log("read")
  //   // var options = {
  //   //   method: 'GET',
  //   //   url: 'https://covid-19-tracking.p.rapidapi.com/v1',
  //   //   headers: {
  //   //     'x-rapidapi-key': 'aa4bbfbbc6msh943bc8aba837399p1827ebjsnde6bed3202fa',
  //   //     'x-rapidapi-host': 'covid-19-tracking.p.rapidapi.com'
  //   //   }
  //   // };

  //   // axios.request(options).then(function (response) {
  //   // }).catch(function (error) {
  //   //   console.error(error);
  //   // });
  //   // setMarkers(randomMarkers)
  // }
      
  
  return (
    <div className="globe">
      <ReactGlobe
        markers={markers}
        options={options}
        // onClickMarker={renderCovidData}
      />

      <Info 
        country = {markers.country}
        totalCases = {markers.totalCases}
        totalDeaths = {markers.totalDeaths}
        totalRecovered = {markers.totalRecovered}
      />
    </div>
  );
}
export default Globe