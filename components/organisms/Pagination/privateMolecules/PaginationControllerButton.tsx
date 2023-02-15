import styled from "styled-components";

const PaginationControllerButtonStyles = styled.button`
    border: black 0.01em solid;
    background-color: ${({ theme }) => theme.neutral2};
    padding: 0.7em 1.5em;
    height: 4.5ch;
    transition: 500ms ease-in-out;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.neutral3};
    }
`;

export function PaginationControllerButton({ icon }: { icon: any }) {
    return (
        <PaginationControllerButtonStyles>
            {icon}
        </PaginationControllerButtonStyles>
    );
}
