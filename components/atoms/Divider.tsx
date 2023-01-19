import styled from "styled-components";

interface IDivider {
    orientation?: "vertical" | "horizontal";
    verticalHeight?: string;
}

// just align it

const Divider = styled.div<IDivider>`
    ${(props) =>
        props.orientation === "horizontal"
            ? `
        background-color: ${props.theme.neutral2};
        height: 0.13em;
        width: 75%;
        margin: 1em 0;
    `
            : `
        border-left: 0.13em solid ${props.theme.neutral2};
        height: ${props.verticalHeight}px;
    `}
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function (props: IDivider) {
    return (
        <Container>
            <Divider
                orientation={props.orientation || "horizontal"}
                verticalHeight={props.verticalHeight}
            />
        </Container>
    );
}
