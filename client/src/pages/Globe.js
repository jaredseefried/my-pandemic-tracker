import React, { useState, useEffect } from 'react'
import ReactGlobe from 'react-globe';
import Info from '../components/Info'
import './globe.css'
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import defaultMarkers from "./markers";
import API from '../utils/API'
import News from '../components/News'
import "./news.css"
import './continents.css'
import {Button} from "react-bootstrap"

function markerTooltipRenderer(marker) {
  return `CITY: ${marker.country}`;
}
function Globe() {
  const markersData = []
  const options = {
    markerTooltipRenderer,
    ambientLightColor: 'red',
    globeGlowColor: 'blue',
    cameraDistanceRadiusScale: 4,
    // markerType: 'bar',
    markerRadiusScaleRange: [0.01, 0.03],
  };

  const [markers, setMarkers] = useState([])
  const [dataFinished, setDataFinished] = useState(false)
  const [coordinates, setCoordinates] = useState({
    coordinates: []
  })
  const [info, setInfo] = useState({
    country: "",
    infected: 0,
    deaths: 0,
    recoveries: 0
  })
  
  const [animationSequence, setAnimationSequence] = useState()
  let animations = []
  useEffect(() => {
    loadData()
    getNews()
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
              const covidCountryValue = 10
              const covidColor = "#f2ba07"
              const countryName = covidData[i].Country_text
              formatCountryValues(covidCountryValue, countryName, covidColor)
            } else if (covidSize > 1000 && covidSize < 100000) {
              // console.log("Between 100 and 1,000")
              const covidCountryValue = 15
              const covidColor = "#f5b203"
              const countryName = covidData[i].Country_text
              formatCountryValues(covidCountryValue, countryName, covidColor)
            } else if (covidSize > 100000 && covidSize < 1000000) {
              // console.log("Between 1,000 and 10,000")
              const covidCountryValue = 20
              const covidColor = "#f97e00"
              const countryName = covidData[i].Country_text
              formatCountryValues(covidCountryValue, countryName, covidColor)
            } else if (covidSize > 1000000 && covidSize < 10000000) {
              // console.log("Between 10,000 and 100,000")
              const covidCountryValue = 25
              const covidColor = "#f54b04"
              const countryName = covidData[i].Country_text
              formatCountryValues(covidCountryValue, countryName, covidColor)
            } else if (covidSize > 10000000) {
              // console.log("Between 100,000 and 100,000")
              const covidCountryValue = 50
              const covidColor = "#f90000"
              const countryName = covidData[i].Country_text
              formatCountryValues(covidCountryValue, countryName, covidColor)
            }
          }
          setInfo({
            country: (covidData[0].Country_text),
            infected: (covidData[0]["Total Cases_text"]),
            deaths: (covidData[0]["Total Deaths_text"]),
            recoveries: (covidData[0]["Total Recovered_text"])
          })
        }
        // All data should be loaded here
        console.log(markersData)
        setMarkers(markersData)
      }).catch(function (error) {
        console.error(error);
      });
  }
  
  function onClickMarker(markerObj) {
    API.getData()
      .then(function (response) {
        const covidData = response.data
        for (var i = 0; i < covidData.length; i++) {
          // console.log(covidData[i])
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
  const [getCovidNews, setGetCovidNews] = useState([])
  function getNews() {
    API.getNews()
      .then(response => {
        const newsData = response.data
        console.log(newsData);
        // for (var i = 0; i < newsData.length; i++) {
        // }
        setGetCovidNews(newsData.articles)
      })
      .catch(error => {
        console.error(error);
      })
  }
  switch (animationSequence) {
    case 'northAmerica':
      animations = [
        {
          coordinates: [38, -97],
          focusAnimationDuration: 3000,
          focusDistanceRadiusScale: 3,
          focusEasingFunction: ['Linear', 'None'],
        },
      ]
      break;
    case 'southAmerica':
      animations = [
        {
          coordinates: [-24, -47],
          focusAnimationDuration: 3000,
          focusDistanceRadiusScale: 3,
          focusEasingFunction: ['Linear', 'None'],
        },
      ]
      break;
    case 'europe':
      animations = [
        {
          coordinates: [54, -2],
          focusAnimationDuration: 3000,
          focusDistanceRadiusScale: 3,
          focusEasingFunction: ['Linear', 'None'],
        },
      ]
      break;
    case 'africa':
      animations = [
        {
          coordinates: [-1, 15],
          focusAnimationDuration: 3000,
          focusDistanceRadiusScale: 3,
          focusEasingFunction: ['Linear', 'None'],
        },
      ]
      break;
    case 'asia':
      animations = [
        {
          coordinates: [35, 105],
          focusAnimationDuration: 3000,
          focusDistanceRadiusScale: 3,
          focusEasingFunction: ['Linear', 'None'],
        },
      ]
      break;
    case 'australia':
      animations = [
        {
          coordinates: [-27, 133],
          focusAnimationDuration: 3000,
          focusDistanceRadiusScale: 3,
          focusEasingFunction: ['Linear', 'None'],
        },
      ]
      break;
    case 'antartica':
      animations = [
        {
          coordinates: [-70, 0],
          focusAnimationDuration: 3000,
          focusDistanceRadiusScale: 3,
          focusEasingFunction: ['Linear', 'None'],
        },
      ]
      break;
    case 'explore':
      animations = []
      break;
    default:
      console.log("hello")
  }
  return (
    <>
      { markers.length > 0 && (
        <div className="globe">
          <div className="continents-container">
            <h2 className="continent" onClick={() => setAnimationSequence('northAmerica')}>North America</h2>
            <h2 className="continent" onClick={() => setAnimationSequence('southAmerica')}>South America</h2>
            <h2 className="continent" onClick={() => setAnimationSequence('europe')}>Europe</h2>
            <h2 className="continent" onClick={() => setAnimationSequence('africa')}>Africa</h2>
            <h2 className="continent" onClick={() => setAnimationSequence('asia')}>Asia</h2>
            <h2 className="continent" onClick={() => setAnimationSequence('australia')}>Australia</h2>
            <h2 className="continent" onClick={() => setAnimationSequence('antartica')}>Antarctica</h2>
            <Button className="continent" onClick={() => setAnimationSequence('explore')}>Explore!</Button>
          </div>
          <div className="news-container">
            {getCovidNews.map(article => (
              <News
                {...article}
                key={article.title} />
            ))}
          </div>
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