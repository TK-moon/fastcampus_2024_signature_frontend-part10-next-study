import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { FC, FormEvent, useState } from "react";
import styles from "./index.module.css";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { SignupInput, SignupResult } from "@/api/auth/signup/types";
import sha256 from "crypto-js/sha256";

const SignupMain: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate } = useMutation(signupMutationOptions());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !email || !password) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    const password_hash = sha256(password).toString();
    mutate({ name, email, password: password_hash });
  };

  return (
    <main>
      <section className={styles.section}>
        <h1 className={styles.title}>회원가입</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="이름"
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Input
            type="text"
            placeholder="이메일"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button type="submit">회원가입</Button>
        </form>
      </section>
    </main>
  );
};

export { SignupMain };

function signupMutationOptions(): UseMutationOptions<
  SignupResult,
  Error,
  SignupInput
> {
  return {
    mutationFn: async (input) => {
      const body = JSON.stringify(input);
      const result = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error_message);
      }

      return data;
    },
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
    },
    onError: (error) => {
      alert(error.message);
    },
  };
}
