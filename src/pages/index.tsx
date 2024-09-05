import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href={"/rendering/ssr"}>SSR</Link>
      <Link href={"/rendering/ssg"}>SSG</Link>
    </main>
  );
}
