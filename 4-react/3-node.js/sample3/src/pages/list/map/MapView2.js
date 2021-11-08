import React, { useState, useEffect, useCallback } from "react";
// import styled from "styled-components";
// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   OverlayView,
//   InfoWindow,
// } from "@react-google-maps/api";

const MapView = ({ rooms, markerhighlighted }) => {
  const [mapRef, setMapRef] = useState(null);
  const [center, setCenter] = useState({ lat: 37.543212, lng: 126.992247 });
  const [zoom, setZoom] = useState(12);
  const [data, setData] = useState(5);

  // useEffect(() => {
  //   fetch("/data/data.json")
  //     .then((res) => res.json())
  //     // .then((res) => console.log(res));
  //     .then((res) => {
  //       setData(res.rooms);
  //     });
  // }, []);

  const fitBounds = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    // console.log("rooms: ", jinah);
    const hello = rooms.map((room, idx) => {
      bounds.extend({
        lat: room.latitude,
        lng: room.longitude,
      });

      return idx;
    });
    map.fitBounds(bounds);
  };

  const loadHandler = (map) => {
    // Store a reference to the google map instance in state
    setMapRef(map);
    // Fit map bounds to contain all markers
    fitBounds(map);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCqJz2U6vsxMjz3npYEj1mBqvzrPpVbgYY",
  });

  if (!isLoaded) {
    return "Loading...";
  }

  return (
    <div>
      <GoogleMap
        onReady={loadHandler}
        center={center}
        zoom={zoom}
        mapContainerStyle={{
          height: "100vh",
          width: "100%",
        }}
      >
        {rooms.map((room) => (
          <OverlayView
            key={room.room_id}
            position={{
              lat: room.latitude,
              lng: room.longitude,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            {markerhighlighted === room.room_id ? (
              <OverMarker>
                <span style={{ marginRight: "0.25em" }}>${room.price}</span>
                <i
                  className={`${room.is_wishlist ? "fas fa-heart" : null}`}
                  style={{ color: "black" }}
                ></i>
              </OverMarker>
            ) : (
              <CustomMarker>
                <span style={{ marginRight: "0.25em" }}>${room.price}</span>
                <i
                  className={`${room.is_wishlist ? "fas fa-heart" : null}`}
                  style={{ color: "red" }}
                ></i>
              </CustomMarker>
            )}
          </OverlayView>
        ))}
      </GoogleMap>
    </div>
  );
};

const OverMarker = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  letter-spacing: 0.025rem;
  color: white;
  border: 1px solid ${(props) => props.theme.color.gray};
  background-color: ${(props) => props.theme.color.black};
  border-radius: 1em;
  padding: 0.5em 1em;
`;

const CustomMarker = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  letter-spacing: 0.025rem;
  color: black;
  border: 1px solid ${(props) => props.theme.color.gray};
  background: white;
  border-radius: 1em;
  padding: 0.25em 1em;
`;

export default MapView;