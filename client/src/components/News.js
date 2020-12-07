import React, { useState } from 'react'
import './news.css'

function News(props) {
  return (
    <div className="news-container">
      <div className="card">
        <img src={props.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          
          <p>{props.published}</p>
          <a id="news-link" href={props.url} className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  )
}

export default News