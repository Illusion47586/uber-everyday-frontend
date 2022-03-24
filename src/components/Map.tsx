import React, { useState } from "react";
import { Button, ButtonHierarchy, ButtonColor, ButtonSize } from "./Button";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
import "@reach/combobox";
import { Spinner, User } from "phosphor-react";
import _uniqueId from "lodash/uniqueId";
import icon from "../images/pin.png";

// variables
const GOOGLE_MAPS_API_KEY = "AIzaSyD-4mYliv0FRhXyWZAtJuzWLmpn6VrHEdc";
// const libraries = ["places"];
const ZOOM = 5;
const UserZoom = 16;
const MAP_CONTAINER_STYLE = {
  height: "100%",
  width: "100%",
};
const CENTER = {
  lat: 28,
  lng: 77,
};

const OPTIONS = {
  fullscreenControl: false,
  zoomControl: false,
  disableDoubleClickZoom: true,
};

// functions
const UpdateUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      CENTER.lat = position.coords.latitude;
      CENTER.lng = position.coords.longitude;
    });
  }
};

// map component
export default function Map(props: any) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<any>([]);
  const [selected, setSelected] = useState<any>(null);

  // console.log(map)

  const AddMarker = (event?: google.maps.MapMouseEvent) => {
    setMarkers((current: any) => [
      ...current,
      {
        id: _uniqueId(),
        lat: event?.latLng?.lat(),
        lng: event?.latLng?.lng(),
        time: new Date(),
      },
    ]);
  };
  const RemoveMarker = (event: google.maps.MapMouseEvent, marker: any) => {
    let newMarkers = markers.filter(
      (item: { id: number; lat: number; lng: number; time: Date }) =>
        item.id != marker.id
    );
    if (selected && selected.id == marker.id) {
      setSelected(null);
    }

    setMarkers(newMarkers);
  };

  // Loading Api Scripts
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // handling errors
  if (loadError) return <p>Error Loading Maps!</p>;
  if (!isLoaded) return <Spinner />;

  // Map Component
  return (
    <div className="MapContainer">
      <Button
        color={ButtonColor.Black}
        hierarchy={ButtonHierarchy.map}
        icon={User}
        onClick={() => {
          UpdateUserLocation();
          map?.setCenter(CENTER);
          map?.panTo(CENTER);
          map?.setZoom(UserZoom);
          setMap(map);
        }}
      />

      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        zoom={ZOOM}
        center={CENTER}
        options={OPTIONS}
        onClick={AddMarker}
        onLoad={(map) => {
          UpdateUserLocation();
          map.panTo(CENTER);
          setMap(map);
        }}
      >
        {/* Dynamic Markers */}
        {markers.map((marker: any) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            clickable={true}
            draggable={true}
            onDblClick={(event) => RemoveMarker(event, marker)}
            onClick={() => {}}
            onMouseOver={() => {
              setSelected(marker);
            }}
            onDragEnd={(event) => {
              marker.lat = event.latLng?.lat();
              marker.lng = event.latLng?.lng();
            }}
            icon={{
              url: icon,
              scaledSize: new google.maps.Size(35, 35),
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
            options={{
              pixelOffset: new google.maps.Size(0, -30),
            }}
          >
            <div>
              <h2>
                <strong>Marker Clicked</strong>
              </h2>
              <p>created on: {selected.time?.toString()}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
