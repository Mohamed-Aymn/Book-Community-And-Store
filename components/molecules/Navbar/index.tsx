import Link from "next/link";
import { BiBookBookmark } from "react-icons/bi";
import { useRouter } from "next/router";
import styled from "styled-components";
import { mediaQueryMax } from "../../../styles/mediaQuery";
import { layoutStore } from "../../../clientState/layoutStore";
import AuthButtons from "./AuthButtons";
import { Route } from "./styles";
import NavSearchBar from "./NavSearch";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Button from "../../atoms/Button";
import { FcSettings } from "react-icons/fc";
import Divider from "../../atoms/Divider";
import { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import Logo from "../../../assets/Logo";

const RoutesContainer = styled.div`
    ${mediaQueryMax("largeTablet")`
        display: none;
    `}
    display: flex;
    align-items: center;
    margin: 0 auto;
    gap: 1em;
    width: fit-content;
`;

const Nav = styled.nav`
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2em;
    width: 100%;
    height: 5em;
    translate: 0 -1em;
    padding: 0 1.7em;
    padding-top: 1em;
    background-color: ${(props) => props.theme.body};
    z-index: 2;
`;

export default function Navbar() {
    let router = useRouter();
    const theme = layoutStore((state: any) => state.theme);

    // nav body animation
    const [navAnimation, navAnimationApi] = useSpring(() => ({
        y: "0em",
        config: { tension: 170, friction: 26 },
    }));
    let [offset, setOffset] = useState(0);
    const onScroll = () => {
        setOffset(window.pageYOffset);
    };
    useEffect(() => {
        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    if (offset >= 300) {
        navAnimationApi.start({
            y: "-4em",
        });
    } else {
        navAnimationApi.start({
            y: "0em",
        });
    }
    const AnimatedNav = animated(Nav);

    return (
        <AnimatedNav style={navAnimation}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2em",
                }}
            >
                <Link href="/" style={{ textDecoration: "none" }}>
                    <Logo display="icon" />
                </Link>

                <NavSearchBar />

                <RoutesContainer>
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <Route active={router.pathname === "/"}>Home</Route>
                    </Link>
                    <Link href="/store" style={{ textDecoration: "none" }}>
                        <Route active={router.pathname.includes("/store")}>
                            Store
                        </Route>
                    </Link>
                    <Link href="/cart" style={{ textDecoration: "none" }}>
                        <Route active={router.pathname.includes("/cart")}>
                            Cart
                        </Route>
                    </Link>
                </RoutesContainer>
            </div>

            <AuthButtons />
        </AnimatedNav>
    );
}
