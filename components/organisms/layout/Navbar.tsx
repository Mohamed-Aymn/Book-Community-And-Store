import Link from "next/link";
import { BiBookBookmark, BiMenu } from "react-icons/bi";
import Button from "../../molecules/Button";
import styles from "./navbar.module.scss";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import mainPhoto from "../../../assets/mainPhoto.jpg";

export default function Navbar() {
    let [isProfileMenu, setProfileMenu] = useState(false);
    let router = useRouter();
    const { data: session } = useSession();

    let authButtons = () => {
        if (session) {
            let photo;
            if (!session.user?.image) {
                photo = mainPhoto;
            } else {
                photo = session.user?.image;
            }

            return (
                <>
                    <Image
                        src={photo}
                        alt="user Photi"
                        width={25}
                        height={25}
                        onClick={() => setProfileMenu(!isProfileMenu)}
                    />
                    {isProfileMenu && (
                        <div>
                            <Link href={`/${session.user?.name}`}>
                                <button>view profile</button>
                            </Link>
                            <button onClick={() => signOut()}>sign out</button>
                        </div>
                    )}
                </>
            );
        } else {
            return (
                <>
                    <Link
                        href={"/auth/login"}
                        style={{ textDecoration: "none" }}
                    >
                        <Button text="login" type="secondary" />
                    </Link>
                    <Link
                        href={"/auth/signup"}
                        style={{ textDecoration: "none" }}
                    >
                        <Button text="Signup" type="secondary" />
                    </Link>
                </>
            );
        }
    };

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
            <div className={styles.auth}>{authButtons()}</div>
        </nav>
    );
}
