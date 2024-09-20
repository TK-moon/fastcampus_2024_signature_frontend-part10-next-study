import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { FC, FormEvent, useState } from "react";
import styles from "./index.module.css";
import sha256 from "crypto-js/sha256";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  signIn,
  SignInOptions,
  SignInResponse,
  signOut,
  useSession,
} from "next-auth/react";

const SigninMain: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const session = useSession();
  const { mutate, isPending } = useMutation(signinMutationOptions());

  const is_logged_in = session.status === "authenticated";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const password_hash = sha256(password).toString();
    mutate({ email, password: password_hash });
  };

  return (
    <main>
      <section className={styles.section}>
        <h1 className={styles.title}>로그인</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            id="email"
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Input
            id="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button type="submit" disabled={isPending || is_logged_in}>
            {isPending ? "로그인중..." : "로그인"}
          </Button>
        </form>
        {is_logged_in && (
          <Button style={{ marginTop: 12 }} onClick={() => signOut()}>
            로그아웃
          </Button>
        )}
      </section>
    </main>
  );
};

export { SigninMain };

function signinMutationOptions(): UseMutationOptions<
  SignInResponse | undefined,
  Error,
  SignInOptions & {
    email: string;
    password: string;
  }
> {
  return {
    mutationFn: async (params) => {
      const result = await signIn("credentials", {
        redirect: false,
        ...params,
      });

      if (!result?.ok) {
        throw new Error("로그인에 실패했습니다.");
      }

      return result;
    },
    onError: (error) => {
      alert(error.message);
    },
    onSuccess: () => {
      alert("로그인에 성공했습니다.");
    },
  };
}
