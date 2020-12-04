import React, { Component } from 'react'
import ReactGlobe from 'react-globe';
import './globe.css'

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import defaultMarkers from "./markers.js";



const options = {
  ambientLightColor: 'red',
  globeGlowColor: 'blue'
};
class Globe extends Component {
  state = {
    markersArr: defaultMarkers
  }

  componentDidMount() {
    return ([...defaultMarkers])
  }

  render() {
    return (
      <div className="globe">
        <ReactGlobe
          markers={defaultMarkers}
          options={options}
          initialCameraDistanceRadiusScale={3}
          initialCoordinates={[29.7604, -95.3698]}
        />
      </div>
    );
  }
}

export default Globe

