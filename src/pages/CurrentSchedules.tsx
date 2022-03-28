import React from "react";
import {
  Button,
  ButtonColor,
  ButtonHierarchy,
  ButtonSize,
} from "../components/Button";

import { RideInfo } from "../components/RideInfo";
import styles from "../styles/pages/current_schedule.module.scss";

type Props = {};

const CurrentSchedules = (props: Props) => {
  return (
    <div className={styles.page}>
      <h1>Your Rides</h1>
      <RideInfo />
    </div>
  );
};

export default CurrentSchedules;
