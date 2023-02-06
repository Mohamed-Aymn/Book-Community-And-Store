import styled from "styled-components";
import { mediaQueryMax } from "../styles/mediaQuery";
import Image from "next/image";

interface IHighlightBenefitButton {
    active: boolean;
}

export const UpperHeroSectionPart = styled.div`
    display: flex;
    justify-content: space-between;
    ${mediaQueryMax("largeTablet")`
    flex-direction: column;
`}
`;

export const HeroSection = styled.div`
    display: flex;
    height: 100vh;
    gap: 1.3em;
    flex-direction: column;
    padding-top: 4em;
    padding-bottom: 2em;
    margin: 0 1.7em;
`;

export const UpperHeroSectionText = styled.div`
    align-self: flex-end;
    p {
        margin-bottom: 0.7em;
    }
    max-width: 50%;
    ${mediaQueryMax("largeTablet")`
    max-width: 100%;
`}
`;

export const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

export const StyledMainImage = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 65%;
    ${mediaQueryMax("largeTablet")`
    object-position: right 65%;
`}
`;

export const KeyBenefitsSection = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3em;
`;

export const StyledBenefitsImage = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const SectionHeading = styled.div`
    text-align: center;
    margin-bottom: 2em;
`;

export const HighlightBenefitButton = styled.button<IHighlightBenefitButton>`
    background-color: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    padding: 0 0 0 1em;
    ${(props) =>
        props.active
            ? `
        border-left: solid 0.2em ${props.theme.text};
        `
            : `
            border-left: none;
        `}
`;

export const Section = styled.section`
    padding-bottom: 9em;
`;

export const AccordionContainer = styled.div`
    width: 70%;
    margin: auto;
    ${mediaQueryMax("largeHandset")`
    width: 100%
`}
`;
