import styled from "styled-components";

export const Box = styled.div`
    background-color: ${(props) => (props.dark ? "darkblue" : "green")};
`;

export default Box;
