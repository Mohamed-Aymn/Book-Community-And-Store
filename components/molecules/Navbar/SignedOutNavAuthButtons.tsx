import useLayoutStore from "../../../client_state/useLayoutStore";
import { BiMenu } from "react-icons/bi";
import { HamburgerButton, NavButton } from "./styles";
import Button from "../../atoms/Button";
import Link from "next/link";
import styled from "styled-components";
import { mediaQueryMax, screens } from "../../../styles/mediaQuery";
import { useEffect, useState } from "react";

const LargeScreenAuthButtons = styled.div`
    display: flex;
    gap: 0.5em;
    ${mediaQueryMax("largeTablet")`
        display: none;
    `}
`;

export const SignedOutNavAuthButtons = (props: any) => {
    const [isLargeScreen, setLargeScreen] = useState(true);
    const updateMedia = () => {
        setLargeScreen(window.innerWidth > screens.largeTablet);
    };
    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });
    const { isNavbarMenu, openNavbarMenu, closeNavbarMenu } = useLayoutStore();
    return (
        <>
            {isLargeScreen ? (
                <LargeScreenAuthButtons>
                    <Link
                        href={"/auth/login"}
                        style={{ textDecoration: "none" }}
                    >
                        <Button approach="secondary" text="Login" />
                    </Link>
                    <Link
                        href={"/auth/signup"}
                        style={{ textDecoration: "none" }}
                    >
                        <Button approach="primary" text="Signup" />
                    </Link>
                </LargeScreenAuthButtons>
            ) : (
                <HamburgerButton
                    onClick={() => {
                        isNavbarMenu ? closeNavbarMenu : openNavbarMenu;
                    }}
                >
                    <BiMenu fill="#000" />
                </HamburgerButton>
            )}
        </>
    );
};
