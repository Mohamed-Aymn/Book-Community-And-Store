import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/organisms/Layout";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        // next auth
        <SessionProvider session={session}>
            {/* react query */}
            <QueryClientProvider client={queryClient}>
                {/* react query */}
                <Hydrate state={pageProps.dehydratedState}>
                    {/* UI - styled components */}
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Hydrate>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </SessionProvider>
    );
}
