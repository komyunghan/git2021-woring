import React, { useState, useEffect } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { API } from "../../config";
// import { withRouter } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "500px",
};

// const center = {
//   lat: 33.51814,
//   lng: 126.52324,
// };

function LocationMap(props) {
  const [map, setMap] = React.useState(null);
  const [data, setData] = useState({});

  // fetch(`${API}/room/detail/${props.match.params.id}`)

  useEffect(() => {
    fetch(`${API}/room/detail/${props.match.params.id}`)
      .then((res) => res.json())
      // .then((res) => console.log(res));
      .then((res) => {
        setData(res.room_info);
      });
  }, []);

  // const center = {
  //   lat: 33.51814,
  //   lng: 126.52324,
  // };

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <>
      {data.latitude && (
        <LoadScript googleMapsApiKey="AIzaSyCqJz2U6vsxMjz3npYEj1mBqvzrPpVbgYY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: Number(data.latitude), lng: Number(data.longitude) }}
            zoom={13}
            // onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker
              position={{
                lat: Number(data.latitude),
                lng: Number(data.longitude),
              }}
            />
            {/* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
        </LoadScript>
      )}
    </>
  );
}

export default withRouter(LocationMap);