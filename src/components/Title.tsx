import React from "react";
import styles from "../styles/modules/title.module.scss";

interface ITitleProps {
  children: React.ReactNode;
}

const Title: React.FC<ITitleProps> = ({ children, ...rest }) => {
  return (
    <p className={styles.title} {...rest}>
      {children}
    </p>
  );
};

export default Title;
