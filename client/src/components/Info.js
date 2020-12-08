import React from 'react'
import '../pages/info.css'

function Info(props) {
  return (
    <div className="info-container">

      <h1 className="info-title">{props.country}</h1>
      <h3 className="info">Infected: {props.infected}</h3>
      <h3 className="info">Deaths: {props.deaths}</h3>
      <h3 className="info">Recoveries: {props.recoveries}</h3>
    </div>
  )
}

export default Info