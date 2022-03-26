import { IconProps, IconWeight } from "phosphor-react";
import { MouseEventHandler } from "react";

import styles from "../styles/components/button.module.scss";

enum ButtonHierarchy {
  primary,
  secondary,
  map,
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
  hierarchy?: ButtonHierarchy;
  color?: ButtonColor;
  size?: ButtonSize;
  iconWt?: IconWeight;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  submit?: boolean;
}

const Button = (props: Props) => {
  const value = `${props.hierarchy?.toString() ?? "0"} ${props.color?.toString() ?? "5"
    }`;
  return props.submit ? (
    <input
      type="submit"
      placeholder={props.text}
      data-value={value}
      data-size={props.size?.toString() ?? "0"}
      className={styles.button}
    />
  ) : (
    <button
      data-value={value}
      data-size={props.size?.toString() ?? "0"}
      className={styles.button}
      onClick={props.onClick}
      type="button"
    >
      {props.text && <p>{props.text}</p>}
      {props.icon && (
        <props.icon className={styles.icon} weight={props.iconWt ?? "fill"} />
      )}
    </button>
  );
};

export { Button, ButtonHierarchy, ButtonColor, ButtonSize };
