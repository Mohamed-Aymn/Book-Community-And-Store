import { useRouter } from "next/router";
import Navbar from "../molecules/Navbar";
import Footer from "../molecules/Footer";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../../styles/ThemeConfig";
import useLayoutStore from "../../client_state/useLayoutStore";
import FloatingComponents from "../molecules/FloatingComponents";
import Modals from "../molecules/Modals";
import FloatingButtons from "./FloaingButtons";

export default function Layout({ children }: { children: JSX.Element }) {
    const { pathname } = useRouter();

    const { theme } = useLayoutStore();

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            {!pathname.includes("/auth") && <Navbar />}
            {children}
            {!pathname.includes("/auth") && <Footer />}

            <FloatingButtons />
            <GlobalStyles />
        </ThemeProvider>
    );
}
