import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonHierarchy, ButtonColor, ButtonSize } from "./Button";
import { GoogleMap, useLoadScript, Marker, InfoWindow, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import { ArrowFatRight, NavigationArrow, Spinner, User } from "phosphor-react";
import _uniqueId from "lodash/uniqueId";
import icon from "../images/pin.png";
import userLocal from "../images/location.png";
import styles from '../styles/components/map.module.scss';

// variables
const GOOGLE_MAPS_API_KEY = "AIzaSyD-4mYliv0FRhXyWZAtJuzWLmpn6VrHEdc";

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
  const [directionRoute, setDirectionRoute] = useState<any>(null);
  const [distance, setDistance] = useState<any>('');
  const [duration, setDuration] = useState<any>('');

  const StartRef = useRef<any>(null);
  const EndRef = useRef<any>(null);

  const [currentPosition, setCurrentPosition] = useState<any>(null);

  const success = (position: any) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    UpdateUserLocation()
    setMap(map);
    map?.setCenter(CENTER)
    navigator.geolocation.getCurrentPosition(success);
  })

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

  const CalculateDirection = async () => {

    if (StartRef.current.value === null || EndRef.current.val === null)
      return;

    const directionCalc = new google.maps.DirectionsService();
    const result = await directionCalc.route({
      origin: StartRef.current.value,
      destination: EndRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING
    })

    setDirectionRoute(result);
    setDistance(result.routes[0].legs[0].distance?.text);
    setDuration(result.routes[0].legs[0].duration?.text);
  }


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

      {props.displayForm ?

        <div className={styles.mapNavigationContainer}>


          {/* source Input */}
          <div className={styles.startInput}>
            {/* <label htmlFor="start">Start: </label> */}
            <Autocomplete >
              <input type="text" name="start" placeholder="Enter Start Location" ref={StartRef} />
            </Autocomplete>

            {/* <NavigationArrow size={15} weight="fill" /> */}

            <Button
              icon={NavigationArrow}
              size={ButtonSize.small}
              color={ButtonColor.Red}
              hierarchy={ButtonHierarchy.primary}
              onClick={CalculateDirection}
            />
          </div>

          {/* destination Input */}
          <div className={styles.endInput}>
            {/* <label htmlFor="destination">Destination: </label> */}
            <Autocomplete>
              <input type="text" name="destination" placeholder="Enter End Location" ref={EndRef} />
            </Autocomplete>

            <Button
              icon={NavigationArrow}
              size={ButtonSize.small}
              color={ButtonColor.Red}
              hierarchy={ButtonHierarchy.primary}
              onClick={CalculateDirection}
            />
          </div>


          <div className={styles.btc}>
            {/* Calculate Direction */}
            <Button
              color={ButtonColor.Red}
              hierarchy={ButtonHierarchy.primary}
              icon={ArrowFatRight}
              onClick={CalculateDirection}
            />
            {/* Center on User */}
            <Button
              color={ButtonColor.Black}
              hierarchy={ButtonHierarchy.primary}
              icon={User}
              onClick={() => {
                UpdateUserLocation();
                map?.setCenter(CENTER);
                map?.panTo(CENTER);
                map?.setZoom(UserZoom);
                setMap(map);
              }}
            />
          </div>


          {duration ?
            <div>
              <div>
                duration : {duration}
              </div>
              <div>
                distance : {distance}
              </div>
            </div>
            : null}
        </div>
        : null}

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
        {/* Dynamic Markers
        {markers.map((marker: any) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            clickable={true}
            draggable={true}
            onDblClick={(event) => RemoveMarker(event, marker)}
            onClick={() => { }}
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
        ) : null} */}

        {currentPosition ?
          <Marker
            position={currentPosition}
            icon={{
              url: userLocal,
              scaledSize: new google.maps.Size(50, 50),
            }}
          ></Marker>
          : null}

        {directionRoute && <DirectionsRenderer directions={directionRoute}></DirectionsRenderer>}

      </GoogleMap>
    </div>
  );
}
