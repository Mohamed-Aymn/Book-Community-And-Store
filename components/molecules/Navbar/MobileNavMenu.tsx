import { useRouter } from "next/router";
import { layoutStore } from "../../../clientState/layoutStore";
import styled from "styled-components";
import { ImCross } from "react-icons/im";
import { signOut } from "next-auth/react";
import Divider from "../../atoms/Divider";

const Container = styled.div<ITransitionState>`
    position: fixed;
    // 1em because nav bar is 1em outside the canavas for animation purposes
    top: 1em;
    right: 0;
    height: 100vh;
    width: 100vw;
    background-color: ${(props) => props.theme.body};
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;

    transition: 300ms ease-in-out;
    ${({ TransitionState }) => {
        switch (TransitionState) {
            case "entering":
                return `
                    opacity: 1;
                    transform: translateY(0);
                    `;
            case "entered":
                return `
                    transform: translateY(0);
                    opacity: 1;
                `;
            case "exiting":
                return `
                    transform: translateY(-100%);
                    opacity: 0;
                `;
            case "exited":
                return `
                    transform: translateY(-100%);
                    opacity: 0;
                `;
        }
    }};
`;

const CloseNavButton = styled.div`
    position: absolute;
    cursor: pointer;
    top: 1em;
    right: 1em;
`;

interface INavItem {
    text: string;
    onClick?: () => void;
    route?: string;
}

const NavItemStyles = styled.button<{ isActiveRoute?: boolean }>`
    cursor: pointer;
    width: 50%;
    height: 3em;
    padding: 0 0.5em;
    display: grid;
    align-items: center;
    gap: var(--space-xs);
    border: none;
    transition: 300ms ease-in-out;
    ${({ isActiveRoute, theme }) =>
        isActiveRoute && `background-color: ${theme.neutral3};`}
`;

export const NavItem = (props: INavItem) => {
    const openNavbarMenu = layoutStore((state: any) => state.openNavbarMenu);
    const closeNavbarMenu = layoutStore((state: any) => state.closeNavbarMenu);
    const isNavbarMenu = layoutStore((state: any) => state.isNavbarMenu);
    const router = useRouter();

    const clickHanlder = () => {
        isNavbarMenu ? closeNavbarMenu() : openNavbarMenu();
    };
    return (
        <NavItemStyles
            onClick={clickHanlder}
            isActiveRoute={
                props.route ? router.pathname.includes(props.route) : false
            }
        >
            <div>{props.text}</div>
        </NavItemStyles>
    );
};

export default function MobileNavMenu(props: any) {
    const closeNavbarMenu = layoutStore((state: any) => state.closeNavbarMenu);
    return (
        <Container TransitionState={props.TransitionState}>
            <CloseNavButton>
                <ImCross fill="#000" onClick={closeNavbarMenu} />
            </CloseNavButton>
            <NavItem route={"/"} text="Home" />
            <NavItem route={`/${props.session?.user._id}`} text="Profile" />
            <NavItem route={"/store"} text="Store" />
            <NavItem route={"/cart"} text="Cart" />
            <Divider />
            {props.session ? (
                <NavItem onClick={() => signOut()} text="Sign out" />
            ) : (
                <>
                    <NavItem route={"/login"} text="Sign in" />
                    <NavItem route={"/signup"} text="Create account" />
                </>
            )}
        </Container>
    );
}
