import React, { useState, useEffect } from 'react'
import ReactGlobe from 'react-globe';
import Info from '../components/Info.js'
import './globe.css'
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import defaultMarkers from "./markers";
import API from '../utils/API'
import News from '../components/News'
import "./continents.css"

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

  const [animationSequence, setAnimationSequence] = useState()
  let animations = []

  useEffect(() => {
    loadData()
    // getNews()
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
    cameraDistanceRadiusScale: 3
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

           default:
             console.log('hello');
         
           
        }




  return (
    <div>
      <div className="continents-container">
        <h2 className="continent" onClick={() => setAnimationSequence('northAmerica')}>North America</h2>
        <h2 className="continent" onClick={() => setAnimationSequence('southAmerica')}>South America</h2>
        <h2 className="continent" onClick={() => setAnimationSequence('europe')}>Europe</h2>
        <h2 className="continent" onClick={() => setAnimationSequence('africa')}>Africa</h2>
        <h2 className="continent" onClick={() => setAnimationSequence('asia')}>Asia</h2>
        <h2 className="continent" onClick={() => setAnimationSequence('australia')}>Australia</h2>
        <h2 className="continent" onClick={() => setAnimationSequence('antartica')}>Antarctica</h2>
       
      </div>
      <div className="globe">
        
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
    </div>
  );
}
export default Globe