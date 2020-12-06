import React, { useState, useEffect } from 'react'
import ReactGlobe from 'react-globe';
import axios from 'axios';
import Info from '../components/Info.js'
import './globe.css'
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import defaultMarkers from "./markers";
import Continents from '../components/Continents'

for (var i = 0; i < defaultMarkers.length; i++) {
  defaultMarkers[i].color = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
  defaultMarkers[i].value = 50
}

function markerTooltipRenderer(marker) {
  return `CITY: ${marker.country}`;
}

function Globe() {
  const [markers, setMarkers] = useState(defaultMarkers);

  const [info, setInfo] = useState({
    country: "",
    infected: 0,
    deaths: 0,
    recoveries: 0
  })

  useEffect(() => {
    loadData()

  }, [])


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
      const covidData = response.data
      for (var i = 0; i < covidData.length; i++) {
        console.log(covidData[i])
      }
      setInfo({
        country: (covidData[0].Country_text),
        infected: (covidData[0]["Total Cases_text"]),
        deaths: (covidData[0]["Total Deaths_text"]),
        recoveries: (covidData[0]["Total Recovered_text"])
      })
    }).catch(function (error) {
      console.error(error);
    });

  }

  const options = {
    markerTooltipRenderer,
    ambientLightColor: 'red',
    globeGlowColor: 'blue',

  };

  function onClickMarker(markerObj) {
    var options = {
      method: 'GET',
      url: 'https://covid-19-tracking.p.rapidapi.com/v1',
      headers: {
        'x-rapidapi-key': 'aa4bbfbbc6msh943bc8aba837399p1827ebjsnde6bed3202fa',
        'x-rapidapi-host': 'covid-19-tracking.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      const covidData = response.data
      for (var i = 0; i < covidData.length; i++) {
        console.log(covidData[i])
        if (covidData[i].Country_text === markerObj.country) {
          setInfo({
            country: (covidData[i].Country_text),
            infected: (covidData[i]["Total Cases_text"]),
            deaths: (covidData[i]["Total Deaths_text"]),
            recoveries: (covidData[i]["Total Recovered_text"])
          })
        }
      }

    }).catch(function (error) {
      console.error(error);
    });
  }


  return (
    <div className="globe">
      <Continents />

      <ReactGlobe
        markers={markers}
        options={options}
        onClickMarker={onClickMarker}
      />
      <Info
        country={info.country}
        infected={info.infected}
        deaths={info.deaths}
        recoveries={info.recoveries}
      />
    </div>
  );
}
export default Globe