import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/organisms/layout";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import BookDetailsModal from "../components/organisms/BookDetailsModal";
import { layoutStore } from "../clientState/layoutStore";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());
    const isDisplayingBookDetails = layoutStore(
        (state: any) => state.isDisplayingBookDetails
    );

    return (
        <UserProvider>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Layout>
                        {isDisplayingBookDetails && <BookDetailsModal />}
                        <Component {...pageProps} />
                    </Layout>
                </Hydrate>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </UserProvider>
    );
}
