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
export const Route = styled.span<IRoute>`
    cursor: pointer;
    font-size: 0.9em;
    text-decoration: none;
    ${(props) =>
        props.active
            ? `
                color: var(--white-color);
                padding: 0.2em 0;
                border-bottom: ${props.theme.secondary} solid 0.05em;
            `
            : `
                color: ${props.theme.secondaryText};
            `}
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
