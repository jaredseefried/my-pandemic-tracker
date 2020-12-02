import React, {useState} from 'react'
import ReactGlobe from 'react-globe';
 
function SimpleGlobe() {

  const options = {
    ambientLightColor: 'red',
    cameraRotateSpeed: 0.5,
    focusAnimationDuration: 2000,
    focusEasingFunction: ['Linear', 'None'],
    pointLightColor: 'gold',
    pointLightIntensity: 1.5,
    globeGlowColor: 'blue',
    markerTooltipRenderer: marker => `${marker.city} (${marker.value})`,
  };
  const [globe, setGlobe] = useState(null);
  console.log(globe); // captured globe instance with API methods


  return (
    <div className ="globe">
     <ReactGlobe
      height="100vh"
      globeBackgroundTexture="https://your/own/background.jpg"
      globeCloudsTexture={null}
      globeTexture="https://your/own/globe.jpg"
      initialCoordinates={[1.3521, 103.8198]}
      // markers={markers}
      options={options}
      width="100%"
      onClickMarker={(marker, markerObject, event) => console.log(marker, markerObject, event)}
      onGetGlobe={setGlobe}
      onMouseOutMarker={(marker, markerObject, event) => console.log(marker, markerObject, event)}
      onGlobeTextureLoaded={() => console.log('globe loaded')}
      onMouseOverMarker={(marker, markerObject, event) => console.log(marker, markerObject, event)}
    />
    </div>
  )
}

export default SimpleGlobe

