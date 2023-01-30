import { useRouter } from "next/router";
import Navbar from "../molecules/Navbar";
import Footer from "../molecules/Footer";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../../styles/ThemeConfig";
import { layoutStore } from "../../clientState/layoutStore";
import FloatingComponents from "../molecules/FloatingComponents";
import Modals from "../molecules/Modals";

export default function Layout({ children }: { children: JSX.Element }) {
    const { pathname } = useRouter();
    const theme = layoutStore((state: any) => state.theme);
    const isModal = layoutStore((state: any) => state.isModal);

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            {!pathname.includes("/auth") && <Navbar />}
            {children}
            {!pathname.includes("/auth") && <Footer />}

            <FloatingComponents />
            {/* i don't think that modals will ba handled like that */}
            {/* {isModal && <Modals />} */}
            <GlobalStyles />
        </ThemeProvider>
    );
}
