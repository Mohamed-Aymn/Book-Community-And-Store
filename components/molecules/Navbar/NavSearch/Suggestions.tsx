import styled from "styled-components";

const Container = styled.div`
    & div {
        padding: 0 0.7em;
        text-overflow: ellipsis;
        margin-right: 1em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:hover {
            background-color: ${({ theme }) => theme.neutral2};
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
