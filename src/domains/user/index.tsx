import { Button } from "@/components/Button";
import { useSession } from "next-auth/react";
import { FC } from "react";

const UserMain: FC = () => {
  const session = useSession();

  console.log(session);

  const is_logged_in = session.status === "authenticated";

  return (
    <main>
      USER MAIN
      <Button disabled={!is_logged_in}>
        {is_logged_in ? "활성화됨" : "비활성화됨"}
      </Button>
    </main>
  );
};

export { UserMain };
