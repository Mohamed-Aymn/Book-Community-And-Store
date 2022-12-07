import Link from "next/link";
import { BiBookBookmark } from "react-icons/bi";
import Button from "../../molecules/Button";
import style from "./navbar.module.scss";

export default function Navbar() {
    return (
        <nav className={style.nav}>
            <Link href="/">
                <BiBookBookmark fill="#03a66f" />
            </Link>
            <div className={style.routs}>
                <Link className={style.link} href="/">
                    Home
                </Link>
                <Link className={style.link} href="/store">
                    Store
                </Link>
                <Link className={style.link} href="/profile">
                    profile
                </Link>
                <Link className={style.link} href="/cart">
                    cart
                </Link>
                <Link className={style.link} href="/about">
                    About us
                </Link>
            </div>
            <div className={style.auth}>
                <Link href={"/authentication"}>
                    <Button text="Login" type="primary" />
                </Link>
                <Link href={"/authentication"}>
                    <Button text="Signup" type="secondary" />
                </Link>
            </div>
        </nav>
    );
}
