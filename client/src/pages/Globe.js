import React, { useState, useEffect } from 'react'
import ReactGlobe from 'react-globe';
import axios from 'axios';
import Info from '../components/Info.js'
import './globe.css'
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import covidCountries from "./covidMarkers.json";
// FORMATTING COVID LIST TO MATCH GLOBE REACT PARAMETERS - ANDY ADD
for (var i = 0; i < covidCountries.length; i++) {
  covidCountries[i].value = (i + 1)
  covidCountries[i].id = (i + 1)
  covidCountries[i].color = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
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
  // const randomMarkers = covidCountries.map((marker) => ({
  //   ...marker,
  //   value: Math.floor(Math.random() * 100)
  // }));
  const [markers, setMarkers] = useState(covidCountries);
  const [markerClicked, setMarkerClicked] = useState({})
  // const [covidData, setCovidData] = useState([]);
  // const [details, setDetails] = useState(null);
  ///////////////////////////////////////
  // THIS FUNCTION MAKES API CALL TO COVID DATA
  // AND THEN ADDS THE DATA TO THE COUNTRY OBJECT
  useEffect(() => {
    loadData()
    // response.data[0][`Active Cases_text`]
  }, [])
  function handleMarkerClick(markerObj, threeJS, pointer) {
    // console.log(markerObj)
    setMarkerClicked(markerObj)
  }
  function loadData() {
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
      const markersCopy = markers.slice(0)
      // console.log(covidData[0][`Active Cases_text`]);
      // THIS LOOP ADDS THE COVID DATA TO THE CORRESPONDING COUNTRY OBJECT
      // Loop through results, get country name of each one, find the same country in markers, add all
      // data from the response to the covidData object for each country
      // iterate over an object
      //Object.keys(markers).forEach(key, value)
      for (var i = 0; i < response.data.length; i++) {
        // console.log(response.data[i]) //! Get All Data
        // covidData[i].activeCases = response.data[covidData[i].covidIndex][`Active Cases_text`]
      }
      console.log(response.data[0][`Country_text`]);
    }).catch(function (error) {
      console.error(error);
    });
  }
  return (
    <div className="globe">
      <ReactGlobe
        markers={markers}
        options={options}
        onClickMarker={handleMarkerClick}
      />
      { markerClicked.id !== undefined && markerClicked.id.length > 0 && (
        <Info marker={markerClicked}
        //  country = {markers[0].country}
        //  infected = {markers[0].totalCases}
        // deaths = {markers.totalDeaths}
        // recoveries = {markers.totalRecovered}
        />
      )}
    </div>
  );
}
export default Globe