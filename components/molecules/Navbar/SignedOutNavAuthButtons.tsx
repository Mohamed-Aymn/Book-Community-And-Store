import { layoutStore } from "../../../clientState/layoutStore";
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

    const toggleNavbarMenu = layoutStore(
        (state: any) => state.toggleNavbarMenu
    );
    const isNavbarMenu = layoutStore((state: any) => state.isNavbarMenu);
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
                        toggleNavbarMenu();
                        console.log(isNavbarMenu);
                    }}
                >
                    <BiMenu fill="#000" />
                </HamburgerButton>
            )}
        </>
    );
};
