import styled from "styled-components";
import { mediaQueryMax, mediaQueryMin } from "./mediaQuery";
import Image from "next/image";

interface IHighlightBenefitButton {
    active: boolean;
}

export const UpperHeroSectionPart = styled.div`
    display: flex;
    gap: 1em;
    justify-content: space-between;
    ${mediaQueryMax("largeTablet")`
    flex-direction: column;
`}
`;

export const HeroSection = styled.div<{ inView: boolean }>`
    display: flex;
    height: 100vh;
    gap: 1.3em;
    flex-direction: column;
    padding-top: 4.5em;
    padding-bottom: 1.7em;
    margin: 0 1.7em;
    opacity: 0;
    transition: 300ms ease-in-out;
    ${({ inView }) => inView && "opacity: 1;"}
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

export const HeroSectionImageContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

export const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    ${mediaQueryMax("largeTablet")`
        height: 15em;
    `}
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
    gap: 3em;
    max-height: calc(100vh - 5em);
    ${mediaQueryMin("largeTablet")`
        grid-template-columns: repeat(2, 1fr);
    `}
    ${mediaQueryMax("largeTablet")`
        grid-template-row: 1fr 2fr;
    `}
`;

export const StyledBenefitsImage = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const KeyBenefitsButtonsContainer = styled.div<{ inView: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 1em;
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
    transition: 300ms ease-in-out;
    &:hover {
        background-color: ${(props) => props.theme.colors.neutral2};
    }
    ${({ active, theme }) =>
        active
            ? `
        border-left: solid 0.2em ${theme.colors.text};
        background-color: ${theme.colors.neutral2};
        padding: 3em 1em;
        `
            : `
        border-left: solid 0.2em ${theme.colors.body};
        padding: 1em;
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
