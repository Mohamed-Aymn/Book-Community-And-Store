import styled from "styled-components";
import Link from "next/link";

interface ILink {
    decorated?: boolean;
}

const NextLink = styled(Link)<ILink>`
    ${({ decorated }) => !decorated && `text-decoration: none;`}
`;

export default NextLink;
