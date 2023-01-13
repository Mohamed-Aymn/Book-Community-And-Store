import { useRouter } from "next/router";
import Navbar from "../molecules/Navbar";
import Footer from "../molecules/Footer";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../../styles/ThemeConfig";
import { layoutStore } from "../../clientState/layoutStore";
import FloatingComponents from "../molecules/FloatingComponents";
import Modals from "../molecules/Modals";

export default function ({ children }: { children: JSX.Element }) {
    const router = useRouter();
    const theme = layoutStore((state: any) => state.theme);
    const isModal = layoutStore((state: any) => state.isModal);

    return (
        <>
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
                {router.pathname.includes("/login") ||
                router.pathname.includes("/signup") ? null : (
                    <Navbar />
                )}
                {children}
                {router.pathname.includes("/login") ||
                router.pathname.includes("/signup") ? null : (
                    <Footer />
                )}
                <FloatingComponents />
                {/* i don't think that modals will ba handled like that */}
                {/* {isModal && <Modals />} */}
                <GlobalStyles />
            </ThemeProvider>
        </>
    );
}
