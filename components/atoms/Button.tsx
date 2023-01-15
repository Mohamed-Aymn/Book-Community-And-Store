import styled from "styled-components";

interface IButton {
    text?: string;
    icon?: JSX.Element;
    approach?: "primary" | "secondary" | "Tertiary" | "danger" | "tag";
    isLoading?: boolean;
    iconPosition?: "right" | "left";
    size?: "big" | "small";
    width?: "fit" | "full";
    onClick?: () => void;
}

const StyledButton = styled.button<IButton>`
    padding: 0.7em 1em;
    border: none;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    font-weight: bold;
    height: fit-content;

    ${(props) =>
        props.approach === "primary"
            ? `
                    background-color: var(--primary-color);
                    color: var(--secondary-color);
                    // &:hover {
                    //     outline: solid 0.1em ${props.theme.primary};
                    //     color: ${props.theme.primaryText};
                    //     background-color: transparent;
                    // }
                    // &:active{
                    //     background-color: ${props.theme.secondary};
                    // }
                `
            : props.approach === "secondary"
            ? `
                    background-color: ${props.theme.neutral2};
                    // outline: solid 0.1em ${props.theme.tertiary};
                    color: ${props.theme.neutral1};
                    // &:hover {
                    //     background-color: ${props.theme.secondary};
                    //     color: ${props.theme.primary};
                    // }  
                    // &:active{
                    //     background-color: ${props.theme.tertiary};
                    //     color: ${props.theme.primary};
                    // } 
                `
            : props.approach === "Tertiary"
            ? `
            background-color: ${props.theme.neutral2};
                    // outline: solid 0.1em ${props.theme.tertiary};
                    color: ${props.theme.neutral3};
                    // &:hover {
                    //     background-color: ${props.theme.secondary};
                    //     color: ${props.theme.primary};
                    // }  
                    // &:active{
                    //     background-color: ${props.theme.tertiary};
                    //     color: ${props.theme.primary};
                    // } 
                `
            : props.approach === "danger"
            ? `
                    outline: solid 0.1em var(--danger-interaction-color);
                    color: var(--danger-interaction-color);
                    background-color: transparent;
                    &:hover {
                        background-color: var(--danger-interaction-color);
                        color: var(--neutral-white-color);
                    }
                    &:active{
                        background-color: ${props.theme.tertiary};
                        outline: solid 0.1em ${props.theme.tertiary};
                    }
                `
            : props.approach === "tag"
            ? `
                    background-color: transparent;
                    outline: solid 0.1em ${props.theme.neutral3};
                    color: ${props.theme.neutral3};
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
        >
            {props.icon ? <>{props.icon} </> : null}
            {props.text}
        </StyledButton>
    );
};

export default Button;
