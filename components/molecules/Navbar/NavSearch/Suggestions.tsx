import styled from "styled-components";
import useBookStore from "../../../../client_state/useBookStore";

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
    refetch: () => void;
}) {
    const {
        setInstantlyChangingMainSearchValue,
        setOnClickChangingMainSearchValue,
        instantlyChangingMainSearchValue,
    } = useBookStore();
    let clickHandler = async (suggestion: any) => {
        await setInstantlyChangingMainSearchValue(suggestion.volumeInfo.title);
        await setOnClickChangingMainSearchValue(
            instantlyChangingMainSearchValue
        );
        props.refetch();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Container>
            {props.suggestions.map((suggestion: any, i: number) => {
                return (
                    <div key={i} onClick={() => clickHandler(suggestion)}>
                        {suggestion.volumeInfo.title}
                    </div>
                );
            })}
        </Container>
    );
}
