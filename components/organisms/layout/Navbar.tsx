import Link from "next/link";
import { BiBookBookmark, BiMenu } from "react-icons/bi";
import Button from "../../molecules/Button";
import styles from "./navbar.module.scss";
import { useRouter } from "next/router";

export default function Navbar() {
    let router = useRouter();

    return (
        <nav className={styles.nav}>
            {/* logo */}
            <Link href="/" className={styles.logo}>
                <BiBookBookmark fill="#fff" />
            </Link>

            <div className={styles.mobileNav}>
                <BiMenu fill="#738198" />
            </div>

            {/* routes */}
            <div className={styles.routs}>
                <Link
                    className={
                        router.pathname === "/"
                            ? styles.currentLink
                            : styles.link
                    }
                    href="/"
                >
                    Home
                </Link>
                <Link
                    className={
                        router.pathname.includes("/store")
                            ? styles.currentLink
                            : styles.link
                    }
                    href="/store"
                >
                    Store
                </Link>
                <Link
                    className={
                        router.pathname.includes("/profile")
                            ? styles.currentLink
                            : styles.link
                    }
                    href="/profile"
                >
                    Profile
                </Link>
                <Link
                    className={
                        router.pathname.includes("/cart")
                            ? styles.currentLink
                            : styles.link
                    }
                    href="/cart"
                >
                    Cart
                </Link>
                <Link
                    className={
                        router.pathname.includes("/about")
                            ? styles.currentLink
                            : styles.link
                    }
                    href="/about"
                >
                    About us
                </Link>
            </div>

            {/* auth buttons */}
            <div className={styles.auth}>
                <Link href={"/login"} style={{ textDecoration: "none" }}>
                    <Button text="Login" type="primary" />
                </Link>
                <Link href={"/signup"} style={{ textDecoration: "none" }}>
                    <Button text="Signup" type="secondary" />
                </Link>
            </div>
        </nav>
    );
}
