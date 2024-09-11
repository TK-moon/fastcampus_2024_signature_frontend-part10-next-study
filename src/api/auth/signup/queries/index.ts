import { sql } from "@vercel/postgres";

export async function isUserExist(email: string) {
  const { rowCount } = await sql`SELECT id FROM users WHERE email=${email}`;

  return (rowCount ?? 0) > 0;
}

export async function signupUser(
  name: string,
  email: string,
  password: string
) {
  const { rowCount } =
    await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${password})`;
  return { is_success: (rowCount ?? 0) > 0 };
}
