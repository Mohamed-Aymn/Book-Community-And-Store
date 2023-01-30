import Link from "next/link";
import { useRouter } from "next/router";
import { layoutStore } from "../../../clientState/layoutStore";
import styled from "styled-components";
import { ImCross } from "react-icons/im";
import { Route } from "./styles";
import Button from "../../atoms/Button";
import { signOut } from "next-auth/react";
import { mediaQueryMin } from "../../../styles/mediaQuery";
import { useEffect } from "react";

const MobileNavMenu = styled.div`
    position: fixed;
    // 1em because nav bar is 1em outside the canavas for animation purposes
    top: 1em;
    right: 0;
    height: 100vh;
    width: 100vw;
    background-color: ${(props) => props.theme.primary};
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    /* ${mediaQueryMin("largeTablet")`
        display: none;
    `} */
`;

const CloseNavButton = styled.div`
    position: absolute;
    cursor: pointer;
    top: 1em;
    right: 1em;
`;

export default function ({ session }: any) {
    const router = useRouter();
    const toggleNavbarMenu = layoutStore(
        (state: any) => state.toggleNavbarMenu
    );
    return (
        <MobileNavMenu>
            <CloseNavButton>
                <ImCross fill="#fff" onClick={toggleNavbarMenu} />
            </CloseNavButton>
            <Link href="/" style={{ textDecoration: "none" }}>
                <Route
                    active={router.pathname === "/"}
                    onClick={toggleNavbarMenu}
                >
                    Home
                </Route>
            </Link>
            <Link href="/store" style={{ textDecoration: "none" }}>
                <Route
                    active={router.pathname.includes("/store")}
                    onClick={toggleNavbarMenu}
                >
                    Store
                </Route>
            </Link>
            <Link href="/profile" style={{ textDecoration: "none" }}>
                <Route
                    active={router.pathname.includes("/profile")}
                    onClick={toggleNavbarMenu}
                >
                    Profile
                </Route>
            </Link>
            <Link href="/cart" style={{ textDecoration: "none" }}>
                <Route
                    active={router.pathname.includes("/cart")}
                    onClick={toggleNavbarMenu}
                >
                    Cart
                </Route>
            </Link>
            <Link href="/aboutus" style={{ textDecoration: "none" }}>
                <Route
                    active={router.pathname.includes("/aboutus")}
                    onClick={toggleNavbarMenu}
                >
                    About us
                </Route>
            </Link>

            <div style={{ width: "100%", padding: "0 5em" }}>
                {session ? (
                    <Button
                        onClick={() => signOut()}
                        text="Signout"
                        approach="secondary"
                        width="full"
                    />
                ) : (
                    <>
                        <Link href="/auth/login">
                            <Button
                                text="login"
                                approach="primary"
                                width="full"
                                onClick={toggleNavbarMenu}
                            />
                        </Link>
                        <Link href="/auth/signup">
                            <Button
                                text="sign up"
                                approach="secondary"
                                width="full"
                                onClick={toggleNavbarMenu}
                            />
                        </Link>
                    </>
                )}
            </div>

            {/* i need to handle two approaches, mobile and large screens */}
            {/* <div>
                <Link
                    href={`/${session?.user?.name}`}
                    style={{ textDecoration: "none" }}
                >
                    <Button text="View profile" approach="primary" />
                </Link>
                <Button
                    approach="secondary"
                    onClick={() => signOut()}
                    text="Sign out"
                />
            </div> */}
        </MobileNavMenu>
    );
}
