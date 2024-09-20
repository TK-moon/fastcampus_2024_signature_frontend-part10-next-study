import {
  getUserListQueryOptions,
  SuspenseTestMain,
} from "@/domains/suspense-test";
import { getQueryClient } from "@/utils";
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { ComponentProps, FC } from "react";

interface Props extends ComponentProps<typeof SuspenseTestMain> {
  dehydrated_state: DehydratedState;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const query_client = getQueryClient();
  const query_options = getUserListQueryOptions();
  // await query_client.prefetchQuery(query_options);

  const dehydrated_state: DehydratedState = dehydrate(query_client);

  return {
    props: {
      dehydrated_state,
    },
  };
};

const SuspenseTestPage: FC<Props> = (props) => {
  const { dehydrated_state, ...rest } = props;

  return (
    <HydrationBoundary state={dehydrated_state}>
      <SuspenseTestMain {...rest} />
    </HydrationBoundary>
  );
};

export default SuspenseTestPage;
