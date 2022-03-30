import axios from "axios";
import { motion } from "framer-motion";
import { identity } from "lodash";
import { TrendUp } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  ButtonColor,
  ButtonHierarchy,
  ButtonSize,
} from "../components/Button";

import { RideInfo } from "../components/RideInfo";
import styles from "../styles/pages/current_schedule.module.scss";
import { baseMotionSettings } from "../utils/defaultAnimation";
import Schedule from "../utils/types";
import moment from "moment";

type Props = {};

const CurrentSchedules = (props: Props) => {
  const [schedules, setSchedules] = useState<Schedule[]>();
  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/rides?phone=${
          import.meta.env.VITE_TEST_ID
        }`
      );
      if (response.status === 200) {
        setSchedules([]);
        const data: Schedule[] = [];
        response.data.forEach((d: any) => {
          const s: Schedule = {
            ...d,
          };
          data.push(s);
        });
        setSchedules(data);
        console.log(schedules);
      } else {
        toast.error("Could not load data.");
      }
    } catch (e) {
      toast.error("Could not load data.");
    }
  };

  let intervalID: number | undefined = undefined;

  const checkForSchedules = () => {
    if (intervalID) {
      clearInterval(intervalID);
    }

    intervalID = setInterval(() => {
      if (schedules) {
        schedules.forEach((s) => {
          // logic
          const start = moment(s.start_date);
          const end = moment(s.end_date);
        });
      }
    }, 1000 * 60 * 5);
  };

  useEffect(() => {
    getData();
    checkForSchedules();
  }, []);

  return (
    <motion.div className={styles.page} {...baseMotionSettings}>
      <motion.h1>Your Rides</motion.h1>
      <motion.ul {...baseMotionSettings}>
        {schedules?.map((s) => (
          <RideInfo data={s} />
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default CurrentSchedules;
