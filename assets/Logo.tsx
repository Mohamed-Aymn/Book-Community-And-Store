import styled from "styled-components";

interface ILogo {
    display?: "big" | "default" | "small" | "icon";
}
/*
full:   full
small:  Book
icon:   only B
*/

const Container = styled.div<ILogo>`
    font-size: 3.7rem;
    margin-left: -0.07em;
    font-weight: 800;
    color: ${(props) => props.theme.colors.text};
    line-height: 1.5ch;
    ${(props) =>
        props.display === "default"
            ? `
    font-size: 2.405rem;   
        `
            : `
    font-size: 3.7rem;
    `}
    div {
        font-weight: 800;
        line-height: 1.6ch;
        color: transparent;
        -webkit-text-stroke-width: 0.03em;
        -webkit-text-stroke-color: ${(props) => props.theme.colors.text};

        ${(props) =>
            props.display === "big"
                ? `
                font-size: 3.5rem;
                `
                : `
                font-size: 2.3rem;
                `}
    }
    span {
        display: block;
    }
    cursor: pointer;
`;

export default function Logo(props: ILogo) {
    const { display = "default" } = props;
    return (
        <Container display={display}>
            <div>B{display !== "icon" ? <>ook</> : null}</div>
            {display === "big" || display === "default" ? (
                <>
                    <span>Community</span>
                    <span>& Store</span>
                </>
            ) : null}
        </Container>
    );
}
