import { ArrowDown, ArrowRight, IconProps, IconWeight } from "phosphor-react";
import { isValidElement, MouseEventHandler, useState } from "react";
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
    showHr?: boolean;
    data?: Array<string>;
}

const RideInfo = (props: Props) => {
    const [expanded, setExpanded] = useState<any>(false);

    return (
        <div className={styles.rideContainer}>
            {props.showHr ? <hr /> : null}

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
                    onClick={(event) => {
                        if (expanded)
                            setExpanded(false);
                        else
                            setExpanded(true);
                    }}
                ></Button>
            </div>

            {expanded ?
                <div className={styles.expanded}>
                    {/* Ride Id */}
                    {/* source */}
                    {/* destination */}
                    {/* timing */}
                    {/* total_traveler */}
                    {/* start_date */}
                    {/* end_date */}
                    {/* cost */}
                    {/* bill */}

                    <h5 id={styles.rideid}>Ride Id: { }</h5>
                    <h5 id={styles.source}>Source: { }</h5>
                    <h5 id={styles.destination}>Destination: { }</h5>
                    <h5 id={styles.timing}>Timing: { }</h5>
                    <h5 id={styles.traveler}>Total Travelers: { }</h5>
                    <h5 id={styles.start}>Start Date: { }</h5>
                    <h5 id={styles.end}>End Date: { }</h5>
                    {props.data ?
                        <div className={styles.day_container}>
                            <h5>Days of the Week Selected: </h5>
                            <div className={styles.days}>
                                {props.data.map((key) => <div>{key}</div>)}

                            </div>
                        </div>
                        : null}
                    <h5 id={styles.bill}>Bill: { }</h5>
                </div>
                : null}

        </div >
    );
};

export { RideInfo };
