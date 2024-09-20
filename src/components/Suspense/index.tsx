import {
  ComponentProps,
  FC,
  Suspense as ReactSuspense,
  useEffect,
} from "react";
import { NoSsr } from "../NoSsr";

interface Props extends ComponentProps<typeof ReactSuspense> {}

const Suspense: FC<Props> = (props) => {
  const { children, ...rest } = props;

  return (
    <ReactSuspense {...rest}>
      <NoSsr>{children}</NoSsr>
    </ReactSuspense>
  );
};

export { Suspense };
