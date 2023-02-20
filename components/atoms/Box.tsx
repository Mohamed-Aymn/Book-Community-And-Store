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
} from "styled-system";

type Box = ColorProps &
    GridProps &
    DisplayProps &
    SpaceProps &
    PositionProps &
    LayoutProps;

const Box = styled.div<Box>`
    ${compose(color, position, space, display, layout, grid)}
`;

export default Box;
