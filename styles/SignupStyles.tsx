import styled from "styled-components";

export const InspiringCardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background-color: ${(props) => props.theme.neutral1};
    height: 100vh;
    padding: 2em;
`;

export const InspiringTitle = styled.h1`
    color: ${(props) => props.theme.secondaryText};
`;

export const InspiringText = styled.p`
    color: ${(props) => props.theme.secondaryText};
    font-weight: 100;
`;

export const FormContainer = styled.div`
    margin: auto;
    width: 20em;
`;

export const Title = styled.div`
    font-size: 3.7rem;
    margin-left: -0.07em;
    font-weight: 800;
    color: ${(props) => props.theme.text};
    line-height: 1.5ch;
    margin-bottom: 0.5em;
    div {
        font-weight: 800;
        font-size: 3.5rem;
        line-height: 1.6ch;
        color: transparent;
        -webkit-text-stroke-width: 0.03em;
        -webkit-text-stroke-color: ${(props) => props.theme.text};
    }
    span {
        display: block;
    }
`;

export const InspiringCard = styled.div`
    padding: 1.5em;
    background-color: ${(props) => props.theme.neutral2};
`;

export const OAuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    position: relative;
    align-content: center;
`;

export const OAuthButton = styled.button<{
    brandColor: string;
    logoBackgroundColor?: string;
}>`
    padding: 1em 2em;
    background-color: ${(props) => props.brandColor};
    border: none;
    outline: none;
    color: #fff;
    border-radius: 0.2em;
    cursor: pointer;
    span {
        position: absolute;
        left: 1em;
        top: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${(props) => props.logoBackgroundColor};
        padding: 0.2em;
    }
`;
