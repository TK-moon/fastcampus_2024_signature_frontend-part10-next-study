import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { FC } from "react";

interface Props {
  test: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  console.log("getServerSideProps");

  return {
    props: {
      test: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    },
  };
};

const SsrPage: FC<Props> = (props) => {
  return (
    <main>
      {props.test}
      <p>{dayjs().format("YYYY-MM-DD HH:mm:ss")}</p>
    </main>
  );
};

export default SsrPage;
