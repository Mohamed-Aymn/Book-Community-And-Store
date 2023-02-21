import Link from "next/link";
import styled from "styled-components";

interface IRoute {
    isActive: boolean;
}
const RouteLinkButton = styled(Link)<IRoute>`
    cursor: pointer;
    background-color: transparent;
    border: none;
    text-decoration: none;
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;

    ${(props) =>
        props.isActive
            ? `
                font-weight: bold;
                text-decoration: underline;
            `
            : null}
`;

export default RouteLinkButton;
