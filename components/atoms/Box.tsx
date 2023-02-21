import styled from "styled-components";
import {
    color,
    position,
    PositionProps,
    ColorProps,
    compose,
    SpaceProps,
    space,
    layout,
    LayoutProps,
    display,
    DisplayProps,
    grid,
    GridProps,
    typography,
    TypographyProps,
    FlexboxProps,
    flexbox,
    border,
    BorderProps,
    shadow,
    ShadowProps,
} from "styled-system";

type Box = ColorProps &
    ShadowProps &
    GridProps &
    BorderProps &
    TypographyProps &
    DisplayProps &
    SpaceProps &
    PositionProps &
    FlexboxProps &
    LayoutProps & {
        ref?: any;
        flexGap?: string;
        transition?: string;
        animation?: string;
        opacity?: string;
    };

const Box = styled.div<Box>`
    ${({ flexGap }) => flexGap && `gap: ${flexGap};`}
    ${({ transition }) => transition && `transition: ${transition};`}
    ${({ opacity }) => opacity && `opacity: ${opacity};`}
    ${({ animation }) => animation && `animation: ${animation};`}
    ${compose(
        color,
        position,
        space,
        display,
        layout,
        grid,
        typography,
        flexbox,
        border,
        shadow
    )}
`;

export default Box;
