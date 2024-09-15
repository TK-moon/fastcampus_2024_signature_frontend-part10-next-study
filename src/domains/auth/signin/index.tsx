import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { FC, FormEvent, useState } from "react";
import styles from "./index.module.css";
import sha256 from "crypto-js/sha256";

const SigninMain: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const password_hash = sha256(password).toString();

    console.log(email, password, password_hash);

    // mutate({ name, email, password: password_hash });
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
          <Button type="submit">로그인</Button>
        </form>
      </section>
    </main>
  );
};

export { SigninMain };
