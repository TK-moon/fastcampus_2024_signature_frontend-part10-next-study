import dynamic from "next/dynamic";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const NoSsrWrapper: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

const NoSsr = dynamic(() => Promise.resolve(NoSsrWrapper), { ssr: false });

export { NoSsr };
