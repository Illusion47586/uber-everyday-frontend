import React, { useRef, useState } from "react";
import styles from '../styles/components/map.module.scss';
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { Button, ButtonHierarchy, ButtonColor, ButtonSize } from "./Button";
import { ArrowFatRight, NavigationArrow, Spinner, User } from "phosphor-react";
import Map from "./Map";

interface Props { }

// const GOOGLE_MAPS_API_KEY = "AIzaSyD-4mYliv0FRhXyWZAtJuzWLmpn6VrHEdc";
const GOOGLE_MAPS_API_KEY = "AIzaSyA2X_DJUS99h9d9EISf6vh5I2J9-oj7Ddo";
const libraries = ["places"];

const UserZoom = 15;
const CENTER = {
    lat: 28,
    lng: 77,
};


const UpdateUserLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            CENTER.lat = position.coords.latitude;
            CENTER.lng = position.coords.longitude;
        });
    }
};

const MapRoute = (props: Props) => {
    const [directionRoute, setDirectionRoute] = useState<any>(null);
    const [distance, setDistance] = useState<any>('');
    const [duration, setDuration] = useState<any>('');
    const StartRef = useRef<any>(null);
    const EndRef = useRef<any>(null);




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

    return (
        <div className={styles.full}>
            <div className={styles.mapNavigationContainer}>
                {/* source Input */}
                <div className={styles.startInput}>
                    <Autocomplete >
                        <input type="text" name="start" placeholder="Enter Start Location" ref={StartRef} />
                    </Autocomplete>
                </div>

                {/* destination Input */}
                <div className={styles.endInput}>
                    <Autocomplete>
                        <input type="text" name="destination" placeholder="Enter End Location" ref={EndRef} />
                    </Autocomplete>
                </div>


                <div className={styles.btc}>
                    {/* Calculate Direction */}
                    <Button
                        color={ButtonColor.Red}
                        hierarchy={ButtonHierarchy.primary}
                        icon={ArrowFatRight}
                        onClick={CalculateDirection}
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

            <Map
                directionRoute={directionRoute}
            >
            </Map>
        </div>
    );
}

export default MapRoute;