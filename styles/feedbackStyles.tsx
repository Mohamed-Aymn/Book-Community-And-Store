import styled, { keyframes } from "styled-components";

// carousel slider config
const SLIDEWIDTH = 27;
const MARGINWIDTH = 0.5;
const MEASURINGUNIT = "em";
const TOTALSLIDEWIDTH = SLIDEWIDTH + 2 * MARGINWIDTH;
const SLIDESNUMBER = 3;

export const slideAnimation = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(calc(-${TOTALSLIDEWIDTH}${MEASURINGUNIT} * ${SLIDESNUMBER} ));
    }
`;

export const CustomerFeedbackContainer = styled.div`
    display: flex;
    animation: ${slideAnimation} 8s linear infinite;
    width: calc(${TOTALSLIDEWIDTH}${MEASURINGUNIT} * (${SLIDESNUMBER} * 2));
    &:hover {
        animation-play-state: paused;
    }
`;

export const Container = styled.div`
    background-color: ${(props) => props.theme.neutral3};
    padding: 1.7em;
    width: 30em;
    margin: 0 0.5em;
`;

export const CustomerInfo = styled.div`
    display: flex;
    gap: 0.7em;
    margin-top: 1.5em;
`;

export const ImageContainer = styled.div`
    width: 3em;
    height: 3em;
`;

export const UserName = styled.div`
    color: ${(props) => props.theme.primaryText};
    font-weight: 600;
`;

export const UserTitle = styled.div`
    font-size: 0.9rem;
    color: ${(props) => props.theme.neutral1};
`;
