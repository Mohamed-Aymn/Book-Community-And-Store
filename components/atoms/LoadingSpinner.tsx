import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

interface ISpinner {
    size?: "default" | "small";
}

const LoadingSpinnerStyles = styled.div<ISpinner>`
    ${({ size }) => {
        switch (size) {
            case "default":
                return `
                border: 0.3em solid transparent;
                border-top: 0.3em black solid;
                height: 40px;
                width: 40px;
                `;
            case "small":
                return `
                border: 0.1em solid transparent;
                border-top: 0.1em black solid;
                height: 20px;
                width: 20px;
                `;
        }
    }}
    border-radius: 50%;
    animation: spin 0.7s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
`;

export default function LoadingSpinner({ size }: ISpinner) {
    return (
        <Container>
            <LoadingSpinnerStyles size={size || "default"} />
        </Container>
    );
}
