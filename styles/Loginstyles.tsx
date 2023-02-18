import styled from "styled-components";

export const BodyContainer = styled.div`
    display: flex;
    gap: 1em;
    flex-direction: column;
    max-height: fit-content;
`;

export const LoginPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(0, -2.5em);
`;

export const FormContainer = styled.div`
    padding: 1em;
    border: 0.1em solid ${({ theme }) => theme.neutral2};
    transition: 300ms ease-in-out;
`;

export const OAuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    position: relative;
    align-content: center;
    align-content: center;
    transition: 300ms ease-in-out;
`;

export const PasswordField = styled.div<ITransitionState>`
    transition: 300ms ease-in-out;
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
