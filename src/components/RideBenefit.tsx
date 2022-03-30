import styles from "../styles/components/ride_benefit.module.scss";

type Props = {
  visible: boolean;
  data: any;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const RideBenefit = (props: Props) => {
  return props.visible ? (
    <div className={styles.dialog}>RideBenefit</div>
  ) : (
    <></>
  );
};

export default RideBenefit;
