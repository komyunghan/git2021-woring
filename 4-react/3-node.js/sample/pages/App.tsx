import React, { Component } from "react";
import { useState } from "react";
import MAP from "./MAP";
import AppBar from "../components/appbar";
import SearchBox from "./SearchBox";
import Link from "next/link";



function App(props: any) {
  const [apiReady, setApiReady] = useState(false);
  const [map, setMap] = useState(null);
  const [Googlemap, setGooglemap] = useState(null);
  const [center, setCenter] = useState({ lat: 37.5, lng: 127 })
  let zoom = 10;

  const handleApiLoaded = (map: React.SetStateAction<null>, maps: React.SetStateAction<null>) => {
    if (map && maps) {
      setApiReady(true);
      setMap(map)
      setGooglemap(maps);
    }
  };




  return (
    <div>
      <AppBar />
      <SearchBox />
      <MAP />
    </div>
  )
}

export default App;