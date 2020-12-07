import React, { useState, useEffect } from 'react'
import ReactGlobe from 'react-globe';
import Info from '../components/Info.js'
import './globe.css'
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import defaultMarkers from "./markers";
import Continents from '../components/Continents'
import API from '../utils/API'
import News from '../components/News'

for (var i = 0; i < defaultMarkers.length; i++) {
  defaultMarkers[i].color = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
  defaultMarkers[i].value = 50
}

function markerTooltipRenderer(marker) {
  return `CITY: ${marker.country}`;
}

function Globe() {
  const [markers, setMarkers] = useState(defaultMarkers);

  const [coordinates, setCoordinates] = useState({
    coordinates: []
  })

  const [info, setInfo] = useState({
    country: "",
    infected: 0,
    deaths: 0,
    recoveries: 0
  })

  useEffect(() => {
    loadData()
    getNews()
  }, [])


  function loadData() {
    API.getData()
      .then(function (response) {
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
    cameraDistanceRadiusScale: 4
  };

  function onClickMarker(markerObj) {
    API.getData()
      .then(function (response) {
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

  const [getCovidNews, setGetCovidNews] = useState({
    image: "",
    title: "",
    description: "",
    published: "",
    url: ""
  })

  function getNews() {
    API.getNews()
      .then(response => {
        const newsData = response.data
        console.log(newsData);
        setGetCovidNews({
          image: (newsData.articles[0].image),
          title: (newsData.articles[0].title),
          description: (newsData.articles[0].description),
          published: (newsData.articles[0].publishedAt),
          url: (newsData.articles[0].url),
        })


      })
      .catch(error => {
        console.error(error);
      })
  }


  return (
    <div className="globe">
      <Continents
        coordinates={coordinates}
      />

      <News
        image={getCovidNews.image}
        title={getCovidNews.title}
        description={getCovidNews.description}
        published={getCovidNews.publishedAt}
        url={getCovidNews.url}
      />

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