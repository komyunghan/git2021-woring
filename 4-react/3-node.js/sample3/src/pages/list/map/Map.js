import React, { useState } from "react";
// import { GoogleMap, useLoadScript, OverlayView } from "@react-google-maps/api";

//import components
import SingleListMap from "../SingleListMap";

//import styles and assets
// import styled from "styled-components";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 33.375336,
  lng: 126.549952,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  scrollwheel: false,
};

const Map = ({ data, currentID }) => {
  const [selected, setSelected] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDwN-m-l4eUhjfyWiUlYMVHEF2X7DAmQTE",
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
      >
        {data.map((room) => (
          <OverlayView
            key={room.room_id}
            position={{
              lat: room.latitude,
              lng: room.longitude,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            {currentID === room.room_id ? (
              <CurrentMarker
                onClick={() => {
                  setSelected(room);
                }}
              >
                ${room.price}
                <i
                  className={`${room.is_wishlist ? "fa fa-heart" : null}`}
                  style={{ color: "white", marginLeft: ".5em" }}
                ></i>
              </CurrentMarker>
            ) : (
              <DefaultMarker
                onClick={() => {
                  setSelected(room);
                }}
              >
                ${room.price}
                <i
                  className={`${room.is_wishlist ? "fa fa-heart" : null}`}
                  style={{ color: "black", marginLeft: ".5em" }}
                ></i>
              </DefaultMarker>
            )}
          </OverlayView>
        ))}

        {selected ? (
          <OverlayView
            position={{
              lat: selected.latitude,
              lng: selected.longitude,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <SingleListMap room={selected} />
          </OverlayView>
        ) : null}
      </GoogleMap>
    </div>
  );
};

const CurrentMarker = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  letter-spacing: 0.025rem;
  color: white;
  background: black;
  border-radius: 1em;
  padding: 0.25em 1em;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
`;

const DefaultMarker = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  letter-spacing: 0.025rem;
  color: black;
  border: 1px solid ${(props) => props.theme.color.gray};
  background: white;
  border-radius: 1em;
  padding: 0.25em 1em;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export default Map;