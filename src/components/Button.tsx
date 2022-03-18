import { IconProps } from "phosphor-react";
import { MouseEventHandler } from "react";

import styles from "../../styles/components/button.module.scss";

enum ButtonHeirarchy {
  primary,
  secondary,
}

enum ButtonColor {
  Purple,
  Red,
  Yellow,
  Green,
  Blue,
  Black,
}

enum ButtonSize {
  normal,
  small,
  large,
}

interface Props {
  text?: string;
  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  heirarchy?: ButtonHeirarchy;
  color?: ButtonColor;
  size?: ButtonSize;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: Props) => {
  const value = `${props.heirarchy?.toString() ?? "0"} ${
    props.color?.toString() ?? "0"
  }`;
  return (
    <button
      data-value={value}
      data-size={props.size?.toString() ?? "0"}
      className={styles.button}
      onClick={props.onClick}
    >
      {props.text && <p>{props.text}</p>}
      {props.icon && <props.icon className={styles.icon} weight="bold" />}
    </button>
  );
};

export { Button, ButtonHeirarchy, ButtonColor, ButtonSize };
