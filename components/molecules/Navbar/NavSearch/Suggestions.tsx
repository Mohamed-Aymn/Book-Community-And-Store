import styled from "styled-components";

const Container = styled.div`
    & div {
        padding: 0 0.7em;
        &:hover {
            background-color: var(--Trial);
            cursor: pointer;
        }
    }
`;

export default function Suggestions(props: {
    suggestions: [];
    setMainSearch: (data: any) => void;
    refetch: () => void;
}) {
    return (
        <Container>
            {props.suggestions.map((suggestion: any, i: number) => {
                return (
                    <div
                        key={i}
                        onClick={async () => {
                            await props.setMainSearch(
                                suggestion.volumeInfo.title
                            );
                            props.refetch();
                        }}
                    >
                        {suggestion.volumeInfo.title}
                    </div>
                );
            })}
        </Container>
    );
}
