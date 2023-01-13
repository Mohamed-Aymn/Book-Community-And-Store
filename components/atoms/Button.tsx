import styled from "styled-components";

interface IButton {
    text?: string;
    icon?: JSX.Element;
    approach?: "primary" | "secondary" | "catchy" | "danger" | "tag";
    isLoading?: boolean;
    iconPosition?: "right" | "left";
    size?: "big" | "small";
    width?: "fit" | "full";
    onClick?: () => void;
    // style is added here for animation purposes not to add custom styles from another components
    style?: object;
}

const StyledButton = styled.button<IButton>`
    padding: 0.5em 1em;
    border: none;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;

    ${(props) =>
        props.approach === "primary"
            ? `
                    background-color: ${props.theme.primary};
                    color: var(--white-color);
                    &:hover {
                        outline: solid 0.1em ${props.theme.primary};
                        color: ${props.theme.primaryText};
                        background-color: transparent;
                    }
                    &:active{
                        background-color: ${props.theme.secondary};
                    }
                `
            : props.approach === "secondary"
            ? `
                    background-color: transparent;
                    outline: solid 0.1em ${props.theme.tertiary};
                    color: ${props.theme.tertiary};
                    &:hover {
                        background-color: ${props.theme.secondary};
                        color: ${props.theme.primary};
                    }  
                    &:active{
                        background-color: ${props.theme.tertiary};
                        color: ${props.theme.primary};
                    } 
                `
            : props.approach === "catchy"
            ? `
                    background-color: var(--attractor-color);
                    font-weight: bold;
                    &:hover {
                        background-color: ${props.theme.primary};
                        color: var(--attractor-color);
                    }
                    &:active{
                        background-color: ${props.theme.tertiary}
                    }
                `
            : props.approach === "danger"
            ? `
                    outline: solid 0.1em var(--repeler-color);
                    color: var(--repeler-color);
                    background-color: transparent;
                    &:hover {
                        background-color: var(--repeler-color);
                        color: var(--white-color);
                    }
                    &:active{
                        background-color: ${props.theme.tertiary};
                        outline: solid 0.1em ${props.theme.tertiary};
                    }
                `
            : props.approach === "tag"
            ? `
                    outline: solid 0.1em ${props.theme.secondaryBody};
                    color: ${props.theme.secondaryBody};
                    border-radius: 3em;
                    // font-weight: 700;
                    white-space: nowrap;
                    &:hover {
                        background-color: ${props.theme.secondaryBody};
                    }
                    &:active{
                        background-color: ${props.theme.primary};
                        color: var(--white-color);
                    }
                `
            : null}

    // ------------------------- misc
        // isLodaing
        ${(props) =>
        props.isLoading ? `cursor: not-allowed;` : `cursor: pointer;`}
            
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

export let Button = (props: IButton) => {
    return (
        <StyledButton
            approach={props.approach}
            isLoading={props.isLoading}
            iconPosition={props.iconPosition || "left"}
            size={props.size || "small"}
            onClick={props.onClick}
            width={props.width || "fit"}
            style={props.style}
        >
            {props.icon ? <>{props.icon} </> : null}
            {props.text}
        </StyledButton>
    );
};

export default Button;
