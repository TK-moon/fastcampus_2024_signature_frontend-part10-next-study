import { ComponentProps, FC } from "react";
import styles from "./index.module.css";

interface Props extends ComponentProps<"input"> {}

const Input: FC<Props> = (props) => {
  const { className, ...rest } = props;

  return <input className={`${styles.container} ${className}`} {...rest} />;
};

export { Input };
