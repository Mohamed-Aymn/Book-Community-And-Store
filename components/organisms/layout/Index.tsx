import Navbar from "./Navbar";
import Footer from "./Footer";
import style from "./index.module.scss";
import { useRouter } from "next/router";

export default function Layout({ children }: any) {
    const router = useRouter();

    return (
        <div className={style.layout}>
            {router.pathname.includes("/authentication") ? null : <Navbar />}
            {children}
            {router.pathname.includes("/authentication") ? null : <Footer />}
        </div>
    );
}
