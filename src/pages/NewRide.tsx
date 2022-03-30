import React, { useRef, useState } from "react";
import RegisterForm from "../components/RegisterForm";

import styles from "../styles/pages/new_ride.module.scss";

import {
  motion,
  AnimatePresence,
  useViewportScroll,
  AnimateSharedLayout,
} from "framer-motion";
import { baseMotionSettings } from "../utils/defaultAnimation";
import { useLoadScript } from "@react-google-maps/api";

import Map from "../components/Map";

type Props = {};

const NewRide = (props: Props) => {
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY!.toString(),
  //   // @ts-ignore
  //   libraries,
  // });
  const [directionRoute, setDirectionRoute] = useState<any>(null);

  return (
    <motion.div className={styles.page} {...baseMotionSettings} layout>
      <motion.div
        className={`${styles.cover} ${directionRoute ? styles.noPadding : ""}`}
      >
        {directionRoute ? (
          <Map directionRoute={directionRoute} interactive={false}></Map>
        ) : (
          <h1>Create a new ride schedule.</h1>
        )}
      </motion.div>

      <RegisterForm
        className={styles.form}
        setDirectionRoute={setDirectionRoute}
      />
    </motion.div>
  );
};

export default NewRide;
