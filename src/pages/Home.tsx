import { ArrowRight, Spinner } from "phosphor-react";
import { useEffect } from "react";
import {
  Button,
  ButtonColor,
  ButtonHierarchy,
  ButtonSize,
} from "../components/Button";
import Map from "../components/Map";
import styles from "../styles/pages/base_page.module.scss";

type Props = {};

const MapTest = (props: Props) => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homePanel}>
        <Button text="Get Started" icon={ArrowRight} iconWt="bold" />
      </div>

      <div className={styles.mapDiv}>
        <Map
          displayForm={false}
        >
        </Map>
      </div>
    </div>
  );
};

export default MapTest;
