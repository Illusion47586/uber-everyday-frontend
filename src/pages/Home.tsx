import { ArrowRight } from "phosphor-react";
import {
  Button,
  ButtonColor,
  ButtonHeirarchy,
  ButtonSize,
} from "../components/Button";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <Button
        onClick={() => {}}
        text="Get Started"
        // color={ButtonColor.Green}
        icon={ArrowRight}
        iconWt="bold"
        // heirarchy={ButtonHeirarchy.secondary}
      />
    </div>
  );
};

export default Home;
