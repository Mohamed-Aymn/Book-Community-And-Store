import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { mediaQueryMax, screens } from "../../../styles/mediaQuery";
import useLayoutStore from "../../../client_state/useLayoutStore";
import { Route } from "./styles";
import NavSearchBar from "./NavSearch";
import Logo from "../../../assets/Logo";
import { useSession } from "next-auth/react";
import { SignedOutNavAuthButtons } from "./SignedOutNavAuthButtons";
import { SignedInNavAuthButtons } from "./SignedInNavAuthButtons";
import useVirticalScrollDirection from "../../../hooks/useYScrollDirection";
import { Transition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";
import LargeNavMenu from "./LargeNavMenu";
import MobileNavMenu from "./MobileNavMenu";
import useScreenWidth from "../../../hooks/useScreenWidth";

const RoutesContainer = styled.div`
    ${mediaQueryMax("largeTablet")`
        display: none;
    `}
    display: flex;
    align-items: center;
    justify-content: flex-end;
    /* margin: 0 auto; */
    gap: 1em;
    width: fit-content;
`;

const NavTransitionDuration = 500;
const Nav = styled.nav<ITransitionState>`
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
    /* those shadow and border will be used all over the website */
    border-bottom: solid 0.01em ${(props) => props.theme.neutral2};
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
    z-index: 3;
    transition: ${NavTransitionDuration}ms ease-in-out;
    transform: ${({ TransitionState }) => {
        switch (TransitionState) {
            case "entered":
                return "translateY(-4em)";
            case "exited":
                return "translateY(0)";
        }
    }};
`;

export default function Navbar() {
    const { vScrollDir, yOffset } = useVirticalScrollDirection();
    const { data: session } = useSession();
    const { isNavbarMenu } = useLayoutStore();
    let router = useRouter();
    const nodeRef = useRef(null);

    const { isBig: isLargeTablet } = useScreenWidth(screens.largeTablet);

    return (
        <Transition
            in={
                vScrollDir === "scrolling down" &&
                yOffset >= 50 &&
                !isNavbarMenu
            }
            timeout={NavTransitionDuration}
            ref={nodeRef}
        >
            {(state) => (
                <Nav TransitionState={state}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2em",
                            flexGrow: "3",
                        }}
                    >
                        <Link href="/" style={{ textDecoration: "none" }}>
                            <Logo display="icon" />
                        </Link>

                        <NavSearchBar />

                        <RoutesContainer>
                            <Link href="/" style={{ textDecoration: "none" }}>
                                <Route active={router.pathname === "/"}>
                                    Home
                                </Route>
                            </Link>
                            <Link
                                href="/community"
                                style={{ textDecoration: "none" }}
                            >
                                <Route
                                    active={router.pathname.includes(
                                        "/community"
                                    )}
                                >
                                    Community
                                </Route>
                            </Link>
                            <Link
                                href="/store"
                                style={{ textDecoration: "none" }}
                            >
                                <Route
                                    active={router.pathname.includes("/store")}
                                >
                                    Store
                                </Route>
                            </Link>
                            <Link
                                href="/cart"
                                style={{ textDecoration: "none" }}
                            >
                                <Route
                                    active={router.pathname.includes("/cart")}
                                >
                                    Cart
                                </Route>
                            </Link>
                        </RoutesContainer>
                    </div>

                    {/* nav right-hand buttons */}
                    <div>
                        {session ? (
                            <SignedInNavAuthButtons session={session} />
                        ) : (
                            <SignedOutNavAuthButtons />
                        )}

                        <Transition
                            in={isNavbarMenu}
                            timeout={300}
                            unmountOnExit
                        >
                            {(state) => (
                                <>
                                    {isLargeTablet ? (
                                        <LargeNavMenu
                                            TransitionState={state}
                                            session={session}
                                        />
                                    ) : (
                                        <MobileNavMenu
                                            TransitionState={state}
                                            session={session}
                                        />
                                    )}
                                </>
                            )}
                        </Transition>
                    </div>
                </Nav>
            )}
        </Transition>
    );
}
