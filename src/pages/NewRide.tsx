import React from "react";
import RegisterForm from "../components/RegisterForm";

import styles from "../styles/pages/new_ride.module.scss";

type Props = {};

const NewRide = (props: Props) => {
  return (
    <div className={styles.page}>
      <div className={styles.cover}>
        <h1>Create a new ride schedule.</h1>
      </div>
      <RegisterForm className={styles.form} />
    </div>
  );
};

export default NewRide;
