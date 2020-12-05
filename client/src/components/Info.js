import React, {useState, useEffect} from 'react'
// import axios from 'axios'
import './info.css'
// import API from "../utils/covidAPI"


function Info(props) {
  return (
    <div className="info-container">
      <h1 className="info-title">Location: {props.country}</h1>

      <h3 className="info">Infected: {props.infected}</h3>
      <h3 className="info">Deaths: {props.deaths}</h3>
      <h3 className="info">Recoveries: {props.recoveries}</h3>
    </div>
  )
}

export default Info