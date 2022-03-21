import { ArrowRight } from "phosphor-react";
import { Button, ButtonColor, ButtonHeirarchy, ButtonSize } from "../components/Button";
import Map from "../components/Map";
import styles from "../styles/pages/base_page.module.scss"


type Props = {};

const Home = (props: Props) => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homePanel}>
        <Button
          onClick={() => { }}
          text="Get Started"
          icon={ArrowRight}
          iconWt="bold"
        />
      </div>

      <div>
        <Map></Map>
      </div>

    </div >
  );
};

export default Home;
