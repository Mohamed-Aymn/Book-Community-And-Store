import styled from "styled-components";

export const Table = styled.table`
    width: 100%;
    margin: 2em 0;
    background-color: ${(props) => props.theme.secondary};
`;

export const Th = styled.th`
    text-align: left;
    color: ${(props) => props.theme.tertiary};
    text-transform: uppercase;
    font-weight: 300;
    font-size: 0.9rem;
`;

export const Tbody = styled.tbody``;
export const Thead = styled.thead``;

export const Tr = styled.tr`
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    row-gap: 1em;
    margin-bottom: 1em;
`;

export const Td = styled.td``;
