import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoBox } from "@react-google-maps/api";
import { Spinner } from "phosphor-react";
import _uniqueId from "lodash/uniqueId";

const GOOGLE_MAPS_API_KEY = "AIzaSyD-4mYliv0FRhXyWZAtJuzWLmpn6VrHEdc";
const libraries = ['places'];


export default function Map(props: any) {

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<any>([]);


  const ZOOM = 8;
  const MAP_CONTAINER_STYLE = {
    height: "100%",
    width: "100%"
  };
  const CENTER = {
    lat: 28,
    lng: 77
  }
  const OPTIONS = {
    fullscreenControl: false,
    // zoomControl: false,
    disableDoubleClickZoom: true,
  }

  const AddMarker = (event?: google.maps.MapMouseEvent) => {
    setMarkers((current: any) => [...current, {
      id: _uniqueId(),
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date()
    }])
    console.log(markers);
  };

  const UpdateUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        CENTER.lat = position.coords.latitude;
        CENTER.lng = position.coords.longitude;
      })
    }
    console.log(CENTER);
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });
  if (loadError) return <p>Error Loading Maps!</p>;
  if (!isLoaded) return <Spinner />;

  return (
    <div className="MapContainer">
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        zoom={ZOOM}
        center={CENTER}
        options={OPTIONS}
        onClick={AddMarker}
      >

        {markers.map((marker: any) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            clickable={true}
            draggable={true}
            onDragEnd={() => { }}
          />
        ))}

      </GoogleMap>
    </div >
  );
}