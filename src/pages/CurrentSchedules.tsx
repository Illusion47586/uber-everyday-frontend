import { TrendUp } from "phosphor-react";
import React, { useState } from "react";
import {
  Button,
  ButtonColor,
  ButtonHierarchy,
  ButtonSize,
} from "../components/Button";

import { RideInfo } from "../components/RideInfo";
import styles from "../styles/pages/current_schedule.module.scss";

type Props = {};
const test = ['1', '2', '3', '4', '5', '7'];

const CurrentSchedules = (props: Props) => {
  return (
    <div className={styles.page}>
      <h1>Your Rides</h1>
      <RideInfo showHr={false} data={test} />
      <RideInfo showHr={true} />
    </div>
  );
};

export default CurrentSchedules;
