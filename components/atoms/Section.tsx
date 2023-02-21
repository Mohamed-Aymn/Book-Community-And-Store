import styled from "styled-components";

const Section = styled.section<{
    isMarginTop?: boolean;
    isMarginBottom?: boolean;
}>`
    ${({ isMarginTop, theme }) =>
        isMarginTop && `margin-top: ${theme.space.xl};`}
    ${({ isMarginBottom, theme }) =>
        isMarginBottom && `margin-bottom: ${theme.space.xl};`}
`;

export default Section;
