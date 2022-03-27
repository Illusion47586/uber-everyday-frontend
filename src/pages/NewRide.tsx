import React from "react";
import RegisterForm from "../components/RegisterForm";

import styles from "../styles/pages/new_ride.module.scss";

import {
  motion,
  AnimatePresence,
  useViewportScroll,
  AnimateSharedLayout,
} from "framer-motion";
import { baseMotionSettings } from "../utils/defaultAnimation";

type Props = {};

const NewRide = (props: Props) => {
  return (
    <motion.div className={styles.page} {...baseMotionSettings} layout>
      <motion.div className={styles.cover}>
        <h1>Create a new ride schedule.</h1>
      </motion.div>
      <RegisterForm className={styles.form} />
    </motion.div>
  );
};

export default NewRide;
