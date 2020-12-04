import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './info.css'
// import API from "../utils/covidAPI"

function Info() {

  const [data, setData] = useState()

  useEffect(() => {
    var options = {
      method: 'GET',
      url: 'https://covid-19-tracking.p.rapidapi.com/v1',
      headers: {
        'x-rapidapi-key': 'aa4bbfbbc6msh943bc8aba837399p1827ebjsnde6bed3202fa',
        'x-rapidapi-host': 'covid-19-tracking.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  })

  return (
    <div className="info-container">
      <h1> Hello! </h1>
    </div>
  )

}

export default Info