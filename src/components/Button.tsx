import { IconProps, IconWeight } from "phosphor-react";
import { MouseEventHandler } from "react";

import styles from "../styles/components/button.module.scss";

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
  iconWt?: IconWeight;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: Props) => {
  const value = `${props.heirarchy?.toString() ?? "0"} ${props.color?.toString() ?? "5"
    }`;

  return (

    <button
      data-value={value}
      data-size={props.size?.toString() ?? "0"}
      className={styles.button}
      onClick={props.onClick}
    >
      {props.text && <p>{props.text}</p>}
      {props.icon && (
        <props.icon className={styles.icon} weight={props.iconWt ?? "fill"} />
      )}
    </button>

  );
};

export { Button, ButtonHeirarchy, ButtonColor, ButtonSize };
