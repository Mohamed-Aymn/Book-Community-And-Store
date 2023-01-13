import { layoutStore } from "../../../clientState/layoutStore";
import { BiMenu } from "react-icons/bi";
import { HamburgerButton } from "./styles";
import Button from "../../atoms/Button";
import Link from "next/link";
import styled from "styled-components";
import { mediaQueryMax } from "../../../styles/mediaQuery";

const LargeScreenAuthButtons = styled.div`
    display: flex;
    gap: 0.5em;
    ${mediaQueryMax("largeTablet")`
        display: none;
    `}
`;

export const SignedOutNavAuthButtons = (props: any) => {
    const toggleNavbarMenu = layoutStore(
        (state: any) => state.toggleNavbarMenu
    );
    const isNavbarMenu = layoutStore((state: any) => state.isNavbarMenu);
    return (
        <>
            <HamburgerButton
                onClick={() => {
                    toggleNavbarMenu();
                    console.log(isNavbarMenu);
                }}
            >
                <BiMenu fill="#FFF" />
            </HamburgerButton>
            <LargeScreenAuthButtons>
                <Link href={"/auth/login"} style={{ textDecoration: "none" }}>
                    <Button approach="primary" text="Login" />
                </Link>
                <Link href={"/auth/signup"} style={{ textDecoration: "none" }}>
                    <Button approach="catchy" text="Signup" />
                </Link>
            </LargeScreenAuthButtons>
        </>
    );
};
