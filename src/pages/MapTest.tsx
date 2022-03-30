import { ArrowRight, Spinner } from "phosphor-react";
import { useEffect } from "react";
import {
    Button,
    ButtonColor,
    ButtonHierarchy,
    ButtonSize,
} from "../components/Button";
import MapRoute from "../components/MapRoute";
import styles from "../styles/pages/base_page.module.scss";

type Props = {};

const Home = (props: Props) => {

    return (
        <div className={styles.mapDiv}>
            <MapRoute></MapRoute>
        </div >
    );
};

export default Home;
