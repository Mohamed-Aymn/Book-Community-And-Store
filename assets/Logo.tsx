import styled from "styled-components";

const Container = styled.div`
    font-size: 3.7rem;
    margin-left: -0.07em;
    font-weight: 800;
    color: ${(props) => props.theme.text};
    line-height: 1.5ch;
    div {
        font-weight: 800;
        font-size: 3.5rem;
        line-height: 1.6ch;
        color: transparent;
        -webkit-text-stroke-width: 0.03em;
        -webkit-text-stroke-color: ${(props) => props.theme.text};
    }
    span {
        display: block;
    }
`;

export default function Logo() {
    return (
        <Container>
            <div>Book</div>
            Community <span>& Store</span>
            {/* Focused Community On Your Cravings */}
        </Container>
    );
}
