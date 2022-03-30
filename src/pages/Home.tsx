import { ArrowRight, Spinner } from "phosphor-react";
import { useContext, useEffect } from "react";
import {
  Button,
  ButtonColor,
  ButtonHierarchy,
  ButtonSize,
} from "../components/Button";
import Map from "../components/Map";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/pages/home_page.module.scss";

type Props = {};

const MapTest = (props: Props) => {
  const context = useContext(AuthContext);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homePanel}>
        <h1>Uber Everyday</h1>
        <h3>
          Customizable prepaid subscription for people who are always on the go.
        </h3>
        <Button
          text="Get Started"
          icon={ArrowRight}
          iconWt="bold"
          onClick={() => {
            context?.login()
          }}
        />
      </div>

      <div className={styles.mapDiv}>
        <Map></Map>
      </div>
    </div>
  );
};

export default MapTest;
