import {
  ComponentProps,
  FC,
  Fragment,
  Suspense as ReactSuspense,
  useEffect,
} from "react";
import { NoSsr } from "../NoSsr";
import { QueryKey, useQueryClient } from "@tanstack/react-query";

interface Props extends ComponentProps<typeof ReactSuspense> {
  suspense_query_key?: QueryKey[];
}

const Suspense: FC<Props> = (props) => {
  const { children, suspense_query_key, ...rest } = props;

  const query_client = useQueryClient();

  const not_prefetched = suspense_query_key?.some((key) => {
    const query_status = query_client.getQueryState(key);
    const is_prefetched = query_status?.status === "success";
    return !is_prefetched;
  });

  const Wrapper = not_prefetched ? NoSsr : Fragment;

  return (
    <ReactSuspense {...rest}>
      <Wrapper>{children}</Wrapper>
    </ReactSuspense>
  );
};

export { Suspense };
