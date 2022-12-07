import Navbar from "./Navbar";
import Footer from "./Footer";
import style from "./index.module.scss";

export default function Layout({ children }: any) {
    return (
        <div className={style.layout}>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
