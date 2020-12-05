import React, { useState, useEffect } from 'react'
import ReactGlobe from 'react-globe';
import axios from 'axios';
import Info from '../components/Info.js'
import './globe.css'
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import defaultMarkers from "./markers";

function markerTooltipRenderer(marker) {
  return `CITY: ${marker.city} (Value: ${marker.value})`;
}

function Globe() {
  const [markers, setMarkers] = useState(defaultMarkers);
  const [globe, setGlobe] = useState(null);
  // const [markerClicked, setMarkerClicked] = useState({})
  const [info, setInfo] = useState({
    country: "",
    infected: 0,
    deaths: 0,
    recoveries: 0
  })

  useEffect(() => {
    loadData()
    // setMarkers(randomMarkers)
  }, [])

  function handleMarkerClick(markerObj, threeJS, pointer) {
    // console.log(markerObj)
    // setMarkerClicked(markerObj)
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
      const covidData = response.data
      for (var i = 0; i < covidData.length; i++) {
        console.log(covidData[i])
      }
      // setMarkers(covidData)
      setInfo({
        country: (covidData[0].Country_text),
        infected: (covidData[0]["Active Cases_text"])
        ,
        deaths: (covidData[0]["Total Deaths_text"]),
        recoveries: (covidData[0]["Total Recovered_text"])
      })
    }).catch(function (error) {
      console.error(error);
    });

  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value })
  }

  const options = {
    markerTooltipRenderer,
    ambientLightColor: 'red',
    globeGlowColor: 'blue'
  };

  

  return (
    <div className="globe">
      
      <ReactGlobe
        markers={markers}
        options={options}
      />
      <Info
        country={info.country}
        infected={info.infected}
        deaths={info.deaths}
        recoveries={info.recoveries}
      />
      )

    </div>
  );
}
export default Globe