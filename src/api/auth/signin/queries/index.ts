import { sql } from "@vercel/postgres";

interface User {
  id: string;
  email: string;
  name: string;
}

export async function getUser(
  email: string,
  password: string
): Promise<User | undefined> {
  const { rows } =
    await sql<User>`SELECT id, email, name FROM users WHERE email=${email} AND password=${password}`;
  const user = rows.at(0);
  return user;
}
