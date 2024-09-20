import "@/styles/globals.css";
import { getQueryClient } from "@/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const query_client = getQueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={query_client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
