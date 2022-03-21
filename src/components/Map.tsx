import React, { useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GOOGLE_MAP_API_KEY = "AIzaSyD-4mYliv0FRhXyWZAtJuzWLmpn6VrHEdc";

function Maps() {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const containerStyle = {
        width: '100%',
        height: '100%'
    };

    const center = {
        lat: 28.620243433758528,
        lng: 77.29373866853582
    };

    const pos = {
        lat: 28.620243433758528,
        long: 77.29373866853582
    }

    return (

        <div className="MapContainer" style={{
            height: "100%",
            width: "100%",
        }}>


            <input type="button" name="center" id="center" style={{
                width: "25px",
                height: "25px",
                backgroundColor: "red",
                zIndex: 4,
                position: 'absolute',
                bottom: "2.5%",
                right: "0.5%",
            }}
                onClick={() => {
                    if (map) {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(position => {
                                center.lat = position.coords.latitude
                                center.lng = position.coords.longitude

                                map.panTo(center)
                                map.setZoom(15)
                            })
                        }
                    }
                }}

            />

            <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
                < GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    options={{
                        zoomControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={map => setMap(map)}
                >
                    { /* Child components, such as markers, info windows, etc. */}
                    <Marker
                        // icon={{
                        //     url: 'https://cdn.mindbowser.com/custom_marker_pin.svg',
                        //     anchor: new google.maps.Point(17, 46),
                        //     scaledSize: new google.maps.Size(37, 37)
                        // }}
                        position={center}
                    />
                </GoogleMap >
            </LoadScript >
        </div >
    )
}

export default Maps;