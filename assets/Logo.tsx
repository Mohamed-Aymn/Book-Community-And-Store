import styled from "styled-components";

interface ILogo {
    display?: "full" | "small" | "icon";
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
    color: ${(props) => props.theme.text};
    line-height: 1.5ch;
    div {
        font-weight: 800;
        line-height: 1.6ch;
        color: transparent;
        -webkit-text-stroke-width: 0.03em;
        -webkit-text-stroke-color: ${(props) => props.theme.text};

        ${(props) =>
            props.display === "icon"
                ? `
                    font-size: 2.3rem;
                `
                : `
                    font-size: 3.5rem;
                `}
    }
    span {
        display: block;
    }
    cursor: pointer;
`;

export default function Logo(props: ILogo) {
    const { display = "full" } = props;
    return (
        <Container display={display}>
            <div>
                B{display === "full" || display === "small" ? <>ook</> : null}
            </div>
            {display === "full" ? (
                <>
                    <span>Community</span>
                    <span>& Store</span>
                </>
            ) : null}
        </Container>
    );
}
