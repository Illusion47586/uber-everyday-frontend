import { ArrowRight } from "phosphor-react";
import {
  Button,
  ButtonColor,
  ButtonHeirarchy,
  ButtonSize,
} from "../components/Button";

import Map from "../components/Map";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <Button
        onClick={() => { }}
        text="Get Started"
        // color={ButtonColor.Green}
        icon={ArrowRight}
        iconWt="bold"
      // heirarchy={ButtonHeirarchy.secondary}
      />

      {/* Map will take the size of its container */}
      <Map></Map>

    </div >
  );
};

export default Home;
