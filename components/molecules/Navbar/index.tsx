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
import { ITransitionState } from "../../../types/custom";
import Box from "../../atoms/Box";
import NextLink from "../../atoms/NextLink";
import RouteLinkButton from "../../atoms/RouteLinkButton";

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
    background-color: ${(props) => props.theme.colors.body};
    /* those shadow and border will be used all over the website */
    border-bottom: solid 0.01em ${(props) => props.theme.colors.neutral2};
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
    const width = useScreenWidth();

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
                    <Box
                        display="flex"
                        alignItems="center"
                        flexGap="2em"
                        flexGrow="3"
                    >
                        <NextLink href="/">
                            <Logo display="icon" />
                        </NextLink>

                        <NavSearchBar />

                        {width > screens.largeTablet && (
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="flex-end"
                                flexGap="1em"
                                width="fit-content"
                            >
                                <RouteLinkButton
                                    href="/"
                                    isActive={router.pathname === "/"}
                                >
                                    Home
                                </RouteLinkButton>
                                <RouteLinkButton
                                    href="/community"
                                    isActive={router.pathname.includes(
                                        "/community"
                                    )}
                                >
                                    Community
                                </RouteLinkButton>
                                <RouteLinkButton
                                    href="/store"
                                    isActive={router.pathname.includes(
                                        "/store"
                                    )}
                                >
                                    Store
                                </RouteLinkButton>
                                <RouteLinkButton
                                    href="/cart"
                                    isActive={router.pathname.includes("/cart")}
                                >
                                    Cart
                                </RouteLinkButton>
                            </Box>
                        )}
                    </Box>

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
                                    {width > screens.largeTablet ? (
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
