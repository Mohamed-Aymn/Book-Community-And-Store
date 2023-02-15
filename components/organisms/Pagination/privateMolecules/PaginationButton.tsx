import styled from "styled-components";

const PaginationButtonStyles = styled.button`
    border: black 0.01em solid;
    background-color: ${({ theme }) => theme.neutral2};
    padding: 0.7em 1em;
    height: 4.5ch;
    transition: 500ms ease-in-out;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.neutral3};
    }
`;

export function PaginationButton({
    index,
    onClick,
}: {
    index: number | "...";
    onClick: () => void;
}) {
    return (
        <PaginationButtonStyles onClick={() => onClick()}>
            {index}
        </PaginationButtonStyles>
    );
}
