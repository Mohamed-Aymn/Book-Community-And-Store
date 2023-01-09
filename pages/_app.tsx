import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/organisms/layout";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import BookDetailsModal from "../components/organisms/BookDetailsModal";
import { layoutStore } from "../clientState/layoutStore";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../styles/ThemeConfig";
import Button from "../components/molecules/Button";
import { MdDarkMode } from "react-icons/md";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    const [queryClient] = useState(() => new QueryClient());
    const isDisplayingBookDetails = layoutStore(
        (state: any) => state.isDisplayingBookDetails
    );

    const theme = layoutStore((state: any) => state.theme);
    const toggleTheme = layoutStore((state: any) => state.toggleTheme);
    console.log(toggleTheme);

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <ThemeProvider
                        theme={theme === "light" ? lightTheme : darkTheme}
                    >
                        <Layout>
                            {isDisplayingBookDetails && <BookDetailsModal />}
                            <Component {...pageProps} />
                            <div
                                style={{
                                    position: "fixed",
                                    right: "30px",
                                    bottom: "30px",
                                }}
                            >
                                <Button
                                    icon={<MdDarkMode />}
                                    onClick={() => {
                                        toggleTheme(theme);
                                        console.log("hello");
                                    }}
                                />
                            </div>
                        </Layout>
                        <GlobalStyles />
                    </ThemeProvider>
                </Hydrate>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </SessionProvider>
    );
}
