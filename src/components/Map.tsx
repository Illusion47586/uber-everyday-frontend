import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Spinner, User } from "phosphor-react";
import _uniqueId from "lodash/uniqueId";
import userLocal from "../images/location.png";
import { Button, ButtonHierarchy, ButtonColor, ButtonSize } from "./Button";
import styles from "../styles/components/map.module.scss";

const libraries = ["places"];
const ZOOM = 15;
const UserZoom = 15;
const MAP_CONTAINER_STYLE = {
  height: "100%",
  width: "100%",
};

const CENTER = {
  lat: 28,
  lng: 77,
};

type MapProps = {
  interactive?: boolean;
  directionRoute: any;
};

// map component
export default function Map(props: MapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentPosition, setCurrentPosition] = useState<any>(null);

  const OPTIONS = {
    fullscreenControl: false,
    zoomControl: false,
    disableDoubleClickZoom: true,
    gestureHandling: props.interactive === false ? "none" : "auto",
  };
  const success = (position: any) => {
    CENTER.lat = position.coords.latitude;
    CENTER.lng = position.coords.longitude;
    setCurrentPosition(CENTER);
  };

  useEffect(() => {
    console.log(map);
    navigator.geolocation.getCurrentPosition(success);
    map?.setCenter(CENTER);
  });

  // Loading Api Scripts
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY!.toString(),
    // @ts-ignore
    libraries,
  });

  // handling errors
  if (loadError) return <p>Error Loading Maps!</p>;
  if (!isLoaded) return <Spinner />;

  // Map Component
  return (
    <div className={styles.mapContainer}>
      {props.interactive && (
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
      )}

      <GoogleMap
        clickableIcons={props.interactive}
        mapContainerStyle={MAP_CONTAINER_STYLE}
        zoom={ZOOM}
        center={CENTER}
        options={OPTIONS}
        onLoad={(map) => {
          setMap(map);
        }}
      >
        {currentPosition ? (
          <Marker
            position={CENTER}
            icon={{
              url: userLocal,
              scaledSize: new google.maps.Size(50, 50),
            }}
          ></Marker>
        ) : null}

        {props.directionRoute && (
          <DirectionsRenderer
            directions={props.directionRoute}
          ></DirectionsRenderer>
        )}
      </GoogleMap>
    </div>
  );
}
