import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';



const containerStyle = {
  width: '480px',
  height: '1000px'
};

const center = {
  lat: 37.49786231683385,
  lng: 127.02735516129869
};

const position = {
  lat: 37.49786231683385,
  lng: 127.02735516129869
}


const onLoad = (marker: any) => {
  console.log('marker: ', marker)
}



function MyComponent() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDJgwvzzVwEfoZNvQpq3Yh-taVt-PMq6Vc"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        <Marker
          onLoad={onLoad}
          position={position}
        />
        { /* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)