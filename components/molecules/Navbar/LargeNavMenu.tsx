import { signOut } from "next-auth/react";
import { useRef } from "react";
import styled from "styled-components";
import useLayoutStore from "../../../client_state/useLayoutStore";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import { useRouter } from "next/router";
import useOnClickOutside from "../../../hooks/useClickOutside";

const Wrapper = styled.div<ITransitionState>`
    position: relative;
    transition: 300ms ease-in-out;
    z-index: -2;
    ${({ TransitionState }) => {
        switch (TransitionState) {
            case "entering":
                return `
                    opacity: 1;
                    transform: translateY(0em);
                    `;
            case "entered":
                return `
                    transform: translateY(0em);
                    opacity: 1;
                `;
            case "exiting":
                return `
                    transform: translateY(-0.5em);
                    opacity: 0;
                `;
            case "exited":
                return `
                    transform: translateY(-0.5em);
                    opacity: 0;
                `;
        }
    }};
`;

const Container = styled.div`
    position: absolute;
    top: 0.5em;
    right: 0;
    width: max-content;
    min-width: 15em;
    background-color: ${(props) => props.theme.body};
    transition: 300 ease-in-out;
    padding: 0.3em;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    border: solid 0.01em ${(props) => props.theme.neutral2};
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
`;

const NavItemStyles = styled.button`
    cursor: pointer;
    width: 100%;
    height: 3em;
    padding: 0 0.5em;
    display: grid;
    grid-template-columns: 1fr 7fr;
    align-items: center;
    gap: var(--space-xs);
    border: none;
    transition: 300ms ease-in-out;
    background-color: ${(props) => props.theme.neutral1};
    &:hover {
        background-color: ${(props) => props.theme.neutral2};
    }
    span {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3rem;
    }
    div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-decoration: none;
        color: ${(props) => props.theme.text};
    }
`;

interface INavItem {
    icon: any;
    text: string;
    onClick?: () => void;
}

export const NavItem = (props: INavItem) => {
    const { openNavbarMenu, closeNavbarMenu, isNavbarMenu } = useLayoutStore();

    const clickHanlder = () => {
        if (props.onClick) props.onClick();
        isNavbarMenu ? closeNavbarMenu() : openNavbarMenu();
    };
    return (
        <NavItemStyles onClick={clickHanlder}>
            <span>{props.icon && <>{props.icon} </>}</span>
            <div>{props.text}</div>
        </NavItemStyles>
    );
};

export default function LargeNavMenu(props: any) {
    const router = useRouter();

    const { closeNavbarMenu, isNavbarMenu } = useLayoutStore();
    // const isNavbarMenu = layoutStore((state: any) => state.isNavbarMenu);

    const mainContainerRef = useRef(null);
    useOnClickOutside(mainContainerRef, () => {
        closeNavbarMenu();
    });

    return (
        <Wrapper TransitionState={props.TransitionState} ref={mainContainerRef}>
            <Container>
                <NavItem
                    icon={<CgProfile />}
                    onClick={() => router.push(`/${props.session?.user._id}`)}
                    text={"view profile"}
                />
                <NavItem
                    icon={<GoSignOut />}
                    onClick={() => signOut()}
                    text={"Sign out"}
                />
            </Container>
        </Wrapper>
    );
}
