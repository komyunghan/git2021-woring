import React, { useState } from 'react'
import {
	GoogleMap,
	LoadScript,
	Marker,
	InfoWindow,
	InfoBox,
	MarkerClusterer
} from '@react-google-maps/api';
import { useRouter } from "next/router";
import Data from './data'




const mapContainerStyle = {
	height: '400px',
	width: '480px',
}


const center = {
	lat: 37.49786231683385,
	lng: 127.02735516129869
}






function Map() {
	const [location, setLocations] = useState(Data)
	const router = useRouter();
	return (
		<LoadScript
			googleMapsApiKey="AIzaSyDJgwvzzVwEfoZNvQpq3Yh-taVt-PMq6Vc"
		>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={8}
				center={center}>

				{location.map((location, i) => (
					<InfoWindow
						key={i}
						position={location}
					>
						<div style={{ backgroundColor: 'yellow', opacity: 0.75, padding: 12 }}
							onClick={() => {
								router.push("/StoreDetail/" + location.id)
							}}>
							<div style={{ fontSize: 16, }}>
								{location.content}
							</div>
						</div>
					</InfoWindow>
				))}

			</GoogleMap>
		</LoadScript>
	)
}
export default Map;

