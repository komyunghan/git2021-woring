import React, { useState, lazy, Suspense } from "react";
import { useRouter } from "next/router";
import Map from "../components/Map/Map";
import AppBar from "../components/appbar/appbar";
import SearchBar from "../components/searchbox/SearchBar";




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

  const Router = useRouter();




  return (

    <div>
      <AppBar />
      <SearchBar />
      <Map />


    </div>
  )
}

export default App;