import styled from "styled-components";

const Suggestions = styled.div`
    & div {
        padding: 0 0.7em;
        &:hover {
            background-color: var(--Trial);
            cursor: pointer;
        }
    }
`;

export default function (props: {
    suggestions: [];
    setMainSearch: (data: any) => void;
    refetch: () => void;
}) {
    return (
        <Suggestions>
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
        </Suggestions>
    );
}
