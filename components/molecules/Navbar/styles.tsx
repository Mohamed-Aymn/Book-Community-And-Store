import styled from "styled-components";
import { mediaQueryMin } from "../../../styles/mediaQuery";

/*
this also should be eliminated because both mobile and larege screes
are using the same route button but i see that every one should 
have a uniqe styling OR i should enhance button component logic
to cover this case
*/
interface IRoute {
    active: boolean;
}
export const Route = styled.button<IRoute>`
    cursor: pointer;
    background-color: transparent;
    height: 4.5ch;
    border: none;
    text-decoration: none;
    white-space: nowrap;

    ${(props) =>
        props.active
            ? `
                font-weight: bold;
                text-decoration: underline;
            `
            : null}
`;

/*
this should be elimenated and button compnonnent logic should be enhanced to cover this condition
*/
export const HamburgerButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    ${mediaQueryMin("largeTablet")`
        display: none;
    `}
`;

interface INavButton {
    approach?: "primary" | "secondary";
    text?: string;
    icon?: JSX.Element;
    onClick?: () => void;
}

export const NavButton = (props: INavButton) => {
    return (
        <StyledNavButton approach={props.approach} onClick={props.onClick}>
            {props.icon}
            {props.text}
        </StyledNavButton>
    );
};

const StyledNavButton = styled.div<INavButton>`
    padding: 0.7em 1em;
    cursor: pointer;
    ${(props) =>
        props.approach === "primary"
            ? `
                background-color: #1a1f28;
                color: #96a4b9;
            `
            : `
                background-color: #1a1f28;
                color: #6a7587;
            `}
`;
