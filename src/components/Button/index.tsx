import { ComponentProps, FC } from "react";
import styles from "./index.module.css";

interface Props extends ComponentProps<"button"> {}

const Button: FC<Props> = (props) => {
  const { className, ...rest } = props;

  return <button className={`${styles.container} ${className}`} {...rest} />;
};

export { Button };
