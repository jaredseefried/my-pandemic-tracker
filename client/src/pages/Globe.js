import React, { useState, useEffect } from 'react'
import ReactGlobe from 'react-globe';
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

// IMPORT DATA
import defaultMarkers from "../JSON/markers.js";
import continents from "../JSON/continents"
import Info from '../components/Info'
// import News from '../components/News'

import API from '../utils/API'
import { RGBADepthPacking } from 'three';

function markerTooltipRenderer(marker) {
  return `Country: ${marker.country}`;
}

function Globe() {
  const markersData = []

  const options = {
    markerTooltipRenderer,
    enableMarkerGlow: false,
    ambientLightColor: "red",
    globeGlowColor: 'blue',
    cameraDistanceRadiusScale: 5,
    markerRadiusScaleRange: [0.1, 1.5],

    markerType: 'bar',

  };

  const [markers, setMarkers] = useState([])

  const [info, setInfo] = useState({
    country: "",
    infected: 0,
    deaths: 0,
    recoveries: 0
  })

  const [animationSequence, setAnimationSequence] = useState()
  let animations = []

  // USE EFFECT
  useEffect(() => {
    loadData()
    // getNews()
    getMongoDB()
  }, [])

  function formatCountryValues(covidSize, countryName, covidColor) {
    if (countryName) {
      for (var i = 0; i < defaultMarkers.length; i++) {
        if (defaultMarkers[i].country === countryName) {
          const updatedMarkerObj = {
            id: defaultMarkers[i].id,
            country: defaultMarkers[i].country,
            coordinates: defaultMarkers[i].coordinates,
            color: covidColor,
            value: covidSize
          }
          markersData.push(updatedMarkerObj)
        }
      }
    }
  }

  function loadData() {
    API.getData()
      .then(function (response) {
        const covidData = response.data
        for (var i = 0; i < covidData.length; i++) {
          if (covidData[i]["Total Cases_text"]) {
            const covidSize = parseFloat(covidData[i]["Total Cases_text"].replace(/,/g, ''));
            // console.log(covidData[i]["Total Cases_text"])
            if (covidSize > 0 && covidSize < 1000) {
              // console.log("Between 0 and 100")
              // const covidCountryValue = 10
              const covidColor = "#00E8FF"
              const countryName = covidData[i].Country_text
              formatCountryValues(covidSize, countryName, covidColor)
            } else if (covidSize > 1000 && covidSize < 100000) {
              // console.log("Between 100 and 1,000")
              // const covidCountryValue = 15
              const covidColor = "#0087FF"
              const countryName = covidData[i].Country_text
              formatCountryValues(covidSize, countryName, covidColor)
            } else if (covidSize > 100000 && covidSize < 1000000) {
              // console.log("Between 1,000 and 10,000")
              // const covidCountryValue = 20
              const covidColor = "#FFD800"
              const countryName = covidData[i].Country_text
              formatCountryValues(covidSize, countryName, covidColor)
            } else if (covidSize > 1000000 && covidSize < 10000000) {
              // console.log("Between 10,000 and 100,000")
              const covidCountryValue = 25
              const covidColor = "#FF8033"
              const countryName = covidData[i].Country_text
              formatCountryValues(covidSize, countryName, covidColor)
            } else if (covidSize > 10000000) {
              // console.log("Between 100,000 and 100,000")
              // const covidCountryValue = 50
              const covidColor = "#FF0000"
              const countryName = covidData[i].Country_text
              formatCountryValues(covidSize, countryName, covidColor)
            }
          }
          setInfo({
            country: (covidData[0].Country_text),
            infected: (covidData[0]["Total Cases_text"]),
            deaths: (covidData[0]["Total Deaths_text"]),
            recoveries: (covidData[0]["Total Recovered_text"])
          })
        }
        setMarkers(markersData)
      }).catch(function (error) {
        console.error(error);
      });
  }

  function onClickMarker(markerObj) {
    API.getData()
      .then(function (response) {
        const covidData = response.data

        setAnimationSequence('onclickMarker')

        for (var i = 0; i < covidData.length; i++) {

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

  // const [getCovidNews, setGetCovidNews] = useState([])
  // function getNews() {
  //   API.getNews()
  //     .then(response => {
  //       const newsData = response.data
  //       setGetCovidNews(newsData.articles)
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     })
  // }

  function getMongoDB(){
    API.getMarker()
    .then((response)=>{
      const data = response.data
      console.log(data)
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  // CONTINENTS
  switch (animationSequence) {
    case 'northAmerica':
      animations = [continents[0]]
      break;
    case 'southAmerica':
      animations = [continents[1]]
      break;
    case 'europe':
      animations = [continents[2]]
      break;
    case 'africa':
      animations = [continents[3]]
      break;
    case 'asia':
      animations = [continents[4]]
      break;
    case 'australia':
      animations = [continents[5]]
      break;
    case 'antartica':
      animations = [continents[6]]
      break;
    case 'onclickMarker':
      animations = []
      break;
    default:
      console.log("hello")
  }

  //  RETURN STARTS HERE
  return (
    <>
      { markers.length > 0 && (
        <div className="globe">
          <div className="pandemicHeader">
              PANDEMIC TRACKER
            </div>
          <div className="continents-container">
            
            <h2 className="continent" onClick={() => setAnimationSequence('northAmerica')}>North America</h2>
            <h2 className="continent" onClick={() => setAnimationSequence('southAmerica')}>South America</h2>
            <h2 className="continent" onClick={() => setAnimationSequence('europe')}>Europe</h2>
            <h2 className="continent" onClick={() => setAnimationSequence('africa')}>Africa</h2>
            <h2 className="continent" onClick={() => setAnimationSequence('asia')}>Asia</h2>
            <h2 className="continent" onClick={() => setAnimationSequence('australia')}>Australia</h2>
            <h2 className="continent" onClick={() => setAnimationSequence('antartica')}>Antarctica</h2>
          </div>

          {/* <div className="news-container">
            {getCovidNews.map(article => (
              <News
                {...article}
                key={article.title} />
            ))}
          </div> */}
          <ReactGlobe
            markers={markers}
            options={options}
            onClickMarker={onClickMarker}
            animations={animations}
          />
          <Info
            country={info.country}
            infected={info.infected}
            deaths={info.deaths}
            recoveries={info.recoveries}
          />
        </div>
      )}
    </>
  );

}
export default Globe