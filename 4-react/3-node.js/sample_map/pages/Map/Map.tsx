import React, { useState, useEffect } from 'react'
import GoogleMap from 'google-map-react'
import Marker from '../component/Marker'


const containerStyle = {
  width: '480px',
  height: '1000px'
};

function Map(props: any) {
  const [places, setPlaces] = useState([]);
  const [apiReady, setApiReady] = useState(false);
  const [map, setMap] = useState(null);
  const [googlemaps, setGooglemaps] = useState(null);
  const [target, setTarget] = useState(null);
  const [service, setService] = useState(null);
  const [getData, setGetData] = useState(false);

  let openNow = false;

  let zoom = 10;
  const center = { lat: 37.5, lng: 127 };

  const timer = () => new Promise(res => setTimeout(res));

  const handleApiLoaded = (map: React.SetStateAction<null>, maps: React.SetStateAction<null>) => {
    if (map && maps) {
      setMap(map);
      setGooglemaps(maps);
      setApiReady(true);
    }
  }
  useEffect(() => {
    if (map && service) {
      searchByType();
    }
  }, []);
  const onClickIsOpen = () => {
    openNow = !openNow;
    searchByType();
  }
  const searchByType = () => {

    let request = {
      radius: "500",
      openNow: openNow,
    };

  }
  const addPlace = async (places: React.SetStateAction<never[]>) => {
    if (places) {
      // Promise만으로는 너무 Marker가 느리게 뜨기 때문에 우선적으로 Marker표시
      setGetData(false);
      setPlaces(places);
      setGetData(true);
    }
  };



  return (
    <div className="googleMap">
      <GoogleMap
        bootstrapURLKeys={{
          key: "AIzaSyDJgwvzzVwEfoZNvQpq3Yh-taVt-PMq6Vc",
          libraries: 'places',
        }}
        style={containerStyle}
        defaultZoom={zoom}
        defaultCenter={center}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {places.length !== 0 && places.map((place) => (
          <Marker
            key={place.id}
            text={place.name}
            lat={place.geometry.location.lat()}
            lng={place.geometry.location.lng()}
          />
        ))}
      </GoogleMap>
    </div>
  )

}

export default Map;