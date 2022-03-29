import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { Spinner, User } from "phosphor-react";
import _uniqueId from "lodash/uniqueId";
import userLocal from "../images/location.png";
import { Button, ButtonHierarchy, ButtonColor, ButtonSize } from "./Button";
import styles from '../styles/components/map.module.scss';

// variables
// const GOOGLE_MAPS_API_KEY = "AIzaSyD-4mYliv0FRhXyWZAtJuzWLmpn6VrHEdc";
const GOOGLE_MAPS_API_KEY = "AIzaSyA2X_DJUS99h9d9EISf6vh5I2J9-oj7Ddo";

const libraries = ["places"];
const ZOOM = 15;
const UserZoom = 15;
const MAP_CONTAINER_STYLE = {
  height: "100%",
  width: "100%",
};

const CENTER = {
  lat: 28,
  lng: 77
}
const OPTIONS = {
  fullscreenControl: false,
  zoomControl: false,
  disableDoubleClickZoom: true,
};

// map component
export default function Map(props: any) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentPosition, setCurrentPosition] = useState<any>(null);


  const success = (position: any) => {
    CENTER.lat = position.coords.latitude;
    CENTER.lng = position.coords.longitude;
    setCurrentPosition(CENTER);
  };

  useEffect(() => {
    console.log(map);
    navigator.geolocation.getCurrentPosition(success);
    map?.setCenter(CENTER)
  })

  // Loading Api Scripts
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    // @ts-ignore
    libraries,
  });

  // handling errors
  if (loadError) return <p>Error Loading Maps!</p>;
  if (!isLoaded) return <Spinner />;

  // Map Component
  return (
    <div className={styles.mapContainer}>
      <Button
        color={ButtonColor.Black}
        hierarchy={ButtonHierarchy.primary}
        size={ButtonSize.small}
        icon={User}
        onClick={() => {
          navigator.geolocation.getCurrentPosition(success);
          map?.setCenter(CENTER);
        }}
      />

      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        zoom={ZOOM}
        center={CENTER}
        options={OPTIONS}
        onLoad={(map) => {
          setMap(map);
        }}
      >

        {currentPosition ?
          <Marker
            position={CENTER}
            icon={{
              url: userLocal,
              scaledSize: new google.maps.Size(50, 50),
            }}
          ></Marker>
          : null}

        {props.directionRoute && <DirectionsRenderer directions={props.directionRoute}></DirectionsRenderer>}

      </GoogleMap>
    </div>
  );
}
