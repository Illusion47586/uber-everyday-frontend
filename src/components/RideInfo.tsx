import dateFormat from "dateformat";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import axios from "axios";

import {
  ArrowDown,
  ArrowRight,
  File,
  IconProps,
  IconWeight,
} from "phosphor-react";
import { isValidElement, MouseEventHandler, useState } from "react";
import {
  Button,
  ButtonColor,
  ButtonHierarchy,
  ButtonSize,
} from "../components/Button";

import styles from "../styles/components/rideinfo.module.scss";
import { baseMotionSettings } from "../utils/defaultAnimation";
import Schedule from "../utils/types";
import { toast } from "react-toastify";


interface Props {
  data: Schedule;
}

const RideInfo = (props: Props) => {
  const [expanded, setExpanded] = useState<any>(false);

  const getData = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/invoice/${props.data.id}?phone=${import.meta.env.VITE_TEST_ID}`;
    console.log(url)

    try {
      const response = await axios.get(url
      );
      if (response.status === 200) {
        window.open(url, "_blank")
      }
      else {
        toast.error("Could not load data.");
      }
    }
    catch (e) {
      toast.error("Could not load data.");
    }
  };



  return (
    // <AnimateSharedLayout>
    <motion.li className={styles.rideContainer} layout {...baseMotionSettings}>
      <motion.div className={styles.rides} layout>
        <p>
          Source: <span>{props.data.source.place_name}</span>
        </p>
        <p>
          Destination: <span>{props.data.destination.place_name}</span>
        </p>
        <p>
          Timing: <span>{props.data.timing}</span>
        </p>
        <div className={styles.btn_grp}>
          <Button
            text="Download Invoice"
            icon={File}
            size={ButtonSize.small}
            // color={ButtonColor.Red}
            onClick={getData}

          />
          <Button
            text="View More"
            icon={ArrowDown}
            size={ButtonSize.small}
            // color={ButtonColor.Black}
            hierarchy={ButtonHierarchy.secondary}
            iconWt="bold"
            onClick={(event) => {
              if (expanded) setExpanded(false);
              else setExpanded(true);
            }}
          />
        </div>
      </motion.div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className={styles.expanded}
            layout
            {...baseMotionSettings}
          >
            <p>
              ID: <span>{props.data.id}</span>
            </p>
            <p>
              Distance: <span>{props.data.distance} Km</span>
            </p>
            <p>
              Start date:{" "}
              <span>{dateFormat(props.data.start_date, "dd-mm-yyyy")}</span>
            </p>
            <p>
              End date:{" "}
              <span>{dateFormat(props.data.end_date, "dd-mm-yyyy")}</span>
            </p>
            <p>
              No. of Travellers: <span>{props.data.total_traveller}</span>
            </p>
            <p>
              UberPool: <span>{props.data.sharing_allowed ? "Yes" : "No"}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
    // </AnimateSharedLayout>
  );
};

export { RideInfo };
