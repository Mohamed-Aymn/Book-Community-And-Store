import styled from "styled-components";
import { mediaQueryMax } from "./mediaQuery";

export const ProfileHeaderBackground = styled.div`
    background-color: ${(props) => props.theme.neutral1};
`;

export const ProfileHeaderContent = styled.div`
    max-width: 140ch;
    padding-top: calc(4em + 3em);
    padding-bottom: 3em;
    margin: 0 auto;
    ${mediaQueryMax("desktop")`
    margin: 0 1.7em;
`}
`;

export const About = styled.p`
    margin-left: 3.7em;
`;

export const MainInfo = styled.div`
    display: flex;
    /* justify-content: center; */
    align-items: center;
    gap: 0.3em;
`;

export const ImageContainer = styled.div`
    width: 3.7em;
    height: 3.7em;
`;

export const NameAndTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* gap: 0.3em; */
`;

export const UserName = styled.div`
    color: var(--neutral-white-color);
    font-size: 1.1rem;
`;

export const UserTitle = styled.div`
    color: var(--neutral-dark-grey-color);
    font-size: 0.8rem;
    margin-top: -0.1em;
`;

export const TwoColumnsInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
    ${mediaQueryMax("smallDesktop")`
    grid-template-columns: repeat(1, 100%);
`}
`;
