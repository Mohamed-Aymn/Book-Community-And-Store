import styled from "styled-components";

export const Table = styled.table`
    width: 100%;
    margin: 2em 0;
    background-color: ${(props) => props.theme.secondary};
    padding: 1em;
`;

export const Th = styled.th`
    text-align: left;
    color: ${(props) => props.theme.tertiary};
    text-transform: uppercase;
    font-weight: 300;
    font-size: 0.9rem;
`;

export const Tr = styled.tr`
    // nothing
`;

export const Td = styled.td`
    /* nothing */

    /* display: flex;
    align-items: center;
    gap: 0.5em; */
`;
