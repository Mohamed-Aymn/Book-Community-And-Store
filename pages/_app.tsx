import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/organisms/layout";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
