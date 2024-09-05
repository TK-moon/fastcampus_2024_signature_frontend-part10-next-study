import dayjs from "dayjs";
import { GetStaticProps } from "next";
import { FC } from "react";

interface Props {
  test: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  console.log("GetStaticProps");

  return {
    props: {
      test: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    },
  };
};

const SsgPage: FC<Props> = (props) => {
  return (
    <main>
      {props.test}
      <p>{dayjs().format("YYYY-MM-DD HH:mm:ss")}</p>
    </main>
  );
};

export default SsgPage;
