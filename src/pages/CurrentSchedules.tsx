import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { RideInfo } from "../components/RideInfo";
import styles from "../styles/pages/current_schedule.module.scss";
import { baseMotionSettings } from "../utils/defaultAnimation";
import Schedule from "../utils/types";
import moment from "moment";
import dateFormat from "dateformat";

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
              const t1 = new Date("01/01/2007 " + time);
              const t2 = new Date("01/01/2007 " + s.timing);

              const h1 = t1.getHours();
              const h2 = t2.getHours();
              const m1 = t1.getMinutes();
              const m2 = t2.getMinutes();
              const y1 = h1 * 60 + m1;
              const y2 = h2 * 60 + m2;

              if (y2 - y1 <= 5 && y2 - y1 > 0) {
                console.log(`Your Ride is Here in ${y2 - y1} minutes!`);
                const body = {
                  ride_date: dateFormat("yyyy-mm-dd"),
                };
                const response = await axios.post(
                  `${import.meta.env.VITE_BACKEND_URL}/trip/${s.id}?phone=${
                    import.meta.env.VITE_TEST_ID
                  }`,
                  body
                );
                if (response.status === 201) {
                  toast(
                    "Trip booked! Please wait for your trip! Click this notification to cancel this trip.",
                    {
                      onClick: async () => {
                        const r = await axios.patch(
                          `${import.meta.env.VITE_BACKEND_URL}/trip/cancel/${
                            response.data._id
                          }?phone=${import.meta.env.VITE_TEST_ID}`
                        );

                        if (r.status === 200) {
                          toast.error("Your trip was cancelled.");
                        }
                      },
                      onClose: async () => {
                        const r = await axios.patch(
                          `${import.meta.env.VITE_BACKEND_URL}/trip/complete/${
                            response.data._id
                          }?phone=${import.meta.env.VITE_TEST_ID}`
                        );

                        if (r.status === 200) {
                          toast.info("Your trip was completed.");
                        }
                      },
                    }
                  );
                } else {
                  toast.error("Could not book your trip.");
                }
              } else {
                console.log("Not now, ignore!");
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
