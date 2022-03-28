import { ArrowDown, ArrowRight, IconProps, IconWeight } from "phosphor-react";
import { isValidElement, MouseEventHandler } from "react";
import {
    Button,
    ButtonColor,
    ButtonHierarchy,
    ButtonSize,
} from "../components/Button";

import styles from "../styles/components/rideinfo.module.scss";

interface Props {
    source?: string;
    destination?: string;
}

const RideInfo = (props: Props) => {

    return (
        <div className={styles.rides}>
            <h5>Source: {props.source}</h5>
            <h5>Destination: {props.destination}</h5>
            <Button
                text="Download Invoice"
                icon={ArrowRight}
                size={ButtonSize.small}
                color={ButtonColor.Red}
            ></Button>
            <Button
                text="View More"
                icon={ArrowDown}
                size={ButtonSize.small}
                color={ButtonColor.Black}
            ></Button>


        </div>
    );
};

export { RideInfo };
