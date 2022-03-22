import React, { useState } from "react";
import { User } from "phosphor-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from "../styles/components/map.module.scss";

const GOOGLE_MAP_API_KEY = "AIzaSyD-4mYliv0FRhXyWZAtJuzWLmpn6VrHEdc";

function Maps(props) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 28.620243433758528,
    lng: 77.29373866853582,
  };

  const pos = {
    lat: 28.620243433758528,
    lng: 77.29373866853582,
  };

  const updatePos = () => {
    if (map) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          pos.lat = position.coords.latitude;
          pos.lng = position.coords.longitude;
        });
      }
    }
  };
  return (
    <div
      className="map"
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <button
        className={styles.mapCenteringBtn}
        onClick={() => {
          updatePos();
          center.lat = pos.lat;
          center.lng = pos.lng;

          map.setCenter(center);
          console.log(center);
        }}
      >
        <User className={styles.icon} weight={"bold"} />
      </button>

      <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={{
            zoomControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <Marker
            // icon={{
            //     url: 'https://cdn.mindbowser.com/custom_marker_pin.svg',
            //     anchor: new google.maps.Point(17, 46),
            //     scaledSize: new google.maps.Size(37, 37)
            // }}
            position={center}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Maps;
