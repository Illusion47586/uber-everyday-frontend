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
        schedules.forEach(async (s) => {
          // logic
          const start = moment(s.start_date);
          const end = moment(s.end_date);
          const currentDate = moment(new Date());
          if (
            currentDate.isSameOrAfter(start) &&
            currentDate.isSameOrBefore(end)
          ) {
            const day = currentDate.day();
            if (s.days.includes(day)) {
              const dt = new Date();
              let time = dt.getHours() + ":" + dt.getMinutes();
              if (dt.getHours() < 10) time = "0" + time;
              var t1 = new Date("01/01/2007 " + time);
              var t2 = new Date("01/01/2007 " + s.timing);

              var h1 = t1.getHours();
              var h2 = t2.getHours();
              var m1 = t1.getMinutes();
              var m2 = t2.getMinutes();
              var y1 = h1 * 60 + m1;
              var y2 = h2 * 60 + m2;

              if (y2 - y1 <= 5 && y2 - y1 >= 0) {
                console.log(`Your Ride is Here in 5 minutes! ${y2 - y1}`);
                const response = await axios.post(
                  `${import.meta.env.VITE_BACKEND_URL}/trip/${s.id}?phone=${
                    import.meta.env.VITE_TEST_ID
                  }`
                );
                if (response.status === 201) {
                  toast("Trip booked! Please wait for your trip!");
                } else {
                  toast.error("Could not book your trip.");
                }
              } else {
                console.log("not now ignore!");
              }
            }
          }
        });
      }
    }, 1000 * 60 * 5);
  };

  useEffect(() => {
    checkForSchedules();
  }, [schedules]);

  useEffect(() => {
    getData();
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
