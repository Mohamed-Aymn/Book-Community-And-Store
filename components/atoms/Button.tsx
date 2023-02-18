import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

interface IButton {
    text?: string;
    icon?: JSX.Element;
    approach?: "primary" | "secondary" | "tertiary" | "danger" | "tag";
    isLoading?: boolean;
    iconPosition?: "right" | "left";
    size?: "big" | "default" | "small";
    width?: "fit" | "full";
    onClick?: () => void;
    style?: any;
}

const StyledButton = styled.button<IButton>`
    padding: 0.7em 1em;
    border: none;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
    font-weight: bold;
    height: 4.5ch;

    font-size: ${(props) =>
        props.size === "big"
            ? "1.5rem"
            : props.size === "small"
            ? "0.9rem"
            : "default"};

    ${(props) =>
        props.approach === "primary"
            ? `
                    background-color: ${props.theme.text};
                    color: ${props.theme.body};
                `
            : props.approach === "secondary"
            ? `
                    background-color: ${props.theme.body};
                    border: solid 0.05em ${props.theme.text};
                    color: ${props.theme.text};
                `
            : props.approach === "tertiary"
            ? `
                    background-color: transparent;
                    color: ${props.theme.text};
                    &:hover{
                        text-decoration: underline;
                    }
                `
            : props.approach === "danger"
            ? `
                    outline: solid 0.1em var(--danger-interaction-color);
                    color: var(--danger-interaction-color);
                    background-color: transparent;
                    &:hover {
                        background-color: var(--danger-interaction-color);
                        color: var(--white-color);
                    }
                    &:active{
                        background-color: ${props.theme.tertiary};
                        outline: solid 0.1em ${props.theme.tertiary};
                    }
                `
            : props.approach === "tag"
            ? `
                    background-color: transparent;
                    outline: solid 0.05em ${props.theme.neutral1};
                    color: ${props.theme.neutral1};
                    border-radius: 3em;
                    white-space: nowrap;
                `
            : null}

    // ------------------------- misc
        // isLodaing
        ${(props) =>
        props.isLoading
            ? `
        cursor: not-allowed;
        background-color: ${props.theme.neutral3};
        `
            : `cursor: pointer;`}
            
        // iconsPostion
        ${(props) =>
        props.iconPosition === "left"
            ? "flex-direction: row;"
            : "flex-direction: row-reverse;"}
                
        // size
        ${(props) =>
        props.size === "big"
            ? `
                    padding: 1.5em 3em;
                    font-weight: bold;
                    font-size: 1.2rem;
                    gap: 1em;
                `
            : null}

        // width
        ${(props) =>
        props.width === "full"
            ? `
                    width: 100%;
                `
            : `width: fit-content;`}
`;

export default function Button(props: IButton) {
    return (
        <StyledButton
            approach={props.approach}
            isLoading={props.isLoading}
            iconPosition={props.iconPosition || "left"}
            size={props.size || "default"}
            onClick={props.onClick}
            width={props.width || "fit"}
            style={props.style}
        >
            {props.isLoading ? <LoadingSpinner size="small" /> : null}
            {props.icon ? <>{props.icon} </> : null}
            {props.text}
        </StyledButton>
    );
}
