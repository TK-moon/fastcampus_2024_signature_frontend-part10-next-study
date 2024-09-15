import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

const query_client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={query_client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
