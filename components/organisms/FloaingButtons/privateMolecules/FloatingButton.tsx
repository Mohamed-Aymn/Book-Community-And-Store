import styled from "styled-components";

interface IPrimaryButton extends ITransitionState {
    icon: any;
    onClick: () => void;
    order: number;
}

interface IStyles extends ITransitionState {
    order: number;
}

const PrimaryButtonStyles = styled.button<IStyles>`
    width: 4em;
    height: 4em;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    ${({ order }) =>
        order === 1
            ? `
        border-radius: 30% 30% 0 30%;
        z-index: 1;
    `
            : `
        border-radius: 30%;
    `}
    cursor: pointer;
    transition: 300ms ease-in-out;
    &:hover {
        background-color: ${({ theme }) => theme.neutral2};
    }
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
                    transform: translateY(calc(100% + 0.5em));
                `;
            case "exited":
                return `
                    transform: translateY(calc(100% + 0.5em));
                    opacity: 0;
                `;
        }
    }};
`;

export default function FloatingButton({
    icon,
    onClick,
    TransitionState,
    order,
}: IPrimaryButton) {
    return (
        <PrimaryButtonStyles
            onClick={() => onClick()}
            TransitionState={TransitionState}
            order={order}
        >
            {icon}
        </PrimaryButtonStyles>
    );
}
