import React, { ButtonHTMLAttributes, SelectHTMLAttributes } from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClassName";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}
interface ISelectButtonProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
};

const Button: React.FC<IButtonProps> = ({
  type,
  variant = "primary",
  children,
  ...rest
}) => {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={getClasses([
        styles.button,
        styles[`button--${buttonTypes[variant]}`],
      ])}
      {...rest}
    >
      {children}
    </button>
  );
};

const SelectButton: React.FC<ISelectButtonProps> = ({
  children,
  id,
  ...rest
}) => {
  return (
    <select
      id={id}
      className={getClasses([styles.button, styles.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
};

export { SelectButton };
export default Button;
