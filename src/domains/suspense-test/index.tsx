import { fetchUserList } from "@/api/user";
import { User } from "@/api/user/types";
import { Suspense } from "@/components/Suspense";
import {
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { FC } from "react";

const SuspenseTestMain: FC = () => {
  const { data } = useQuery(getUserListQueryOptions());

  console.log(data);

  return (
    <main>
      Suspense test
      <ul>
        {data?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </main>
  );
};

const SuspenseTestMainWithSuspense: FC = () => {
  return (
    // <Suspense>
    <SuspenseTestMain />
    // </Suspense>
  );
};

export { SuspenseTestMainWithSuspense as SuspenseTestMain };

export function getUserListQueryOptions(): UseQueryOptions<User[], Error> {
  return {
    queryKey: ["user-list"],
    queryFn: async () => {
      const result = await fetchUserList();
      return result;
    },
  };
}
