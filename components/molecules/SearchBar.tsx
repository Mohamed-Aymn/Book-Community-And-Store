import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";
import { RiSettings5Fill } from "react-icons/ri";
import styled from "styled-components";
import Button from "../atoms/Button";

interface IInputBar {
    suggestions: boolean;
}

const Container = styled.div`
    width: 60%;
    margin: 1em auto;
    position: sticky;
    top: 5em;
    z-index: 1;
`;

const SearchBar = styled.div<IInputBar>`
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: ${(props) => props.theme.body};
    border: solid 0.05em ${(props) => props.theme.neutral3};
    align-items: center;
    padding: 0.7em;
    border-radius: 1.7em;
    &:hover {
        box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
    }

    ${(props) =>
        props.suggestions
            ? `
                box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
                border-radius: 1em 1em 0 0;
                border-bottom: none;
            `
            : null}
`;

const Input = styled.input`
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    color: ${(props) => props.theme.neutral1};
    &::placeholder {
        color: ${(props) => props.theme.neutral1};
    }
`;

const VerticalDivider = styled.div`
    border-left: 0.05em solid rgb(226, 226, 226);
    height: 16px;
`;

const Suggestions = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.neutral1};
    border: solid 0.05em ${(props) => props.theme.neutral3};
    border-top: none;
    border-radius: 0 0 1em 1em;
    padding-bottom: 0.7em;
    box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
    padding-top: 0.5em;
    position: absolute;
    & div {
        padding: 0 0.7em;
        &:hover {
            background-color: var(--Trial);
            cursor: pointer;
        }
    }
`;

export default function (props: any) {
    let router = useRouter();

    const searchHanlder = () => {
        props.searchFunction();
        router.push({
            pathname: "/store",
            query: { search: props.searchState },
        });
    };

    return (
        <Container>
            <SearchBar
                suggestions={props.suggestions !== undefined ? true : false}
            >
                <Input
                    type="text"
                    placeholder={props.placeholder}
                    value={props.searchState}
                    onChange={async (e) => {
                        await props.setSearchState(e.target.value);
                        props.searchState !== ""
                            ? props.suggestinosFunction()
                            : null;
                    }}
                    onKeyDown={(e) => {
                        e.key == "Enter" ? searchHanlder() : null;
                    }}
                />
                <div style={{ display: "flex" }}>
                    <Button
                        approach="secondary"
                        icon={<FaSearch />}
                        onClick={props.searchFunction}
                    />

                    {props.config && (
                        <>
                            <Button
                                approach="secondary"
                                icon={<RiSettings5Fill />}
                                onClick={() => {
                                    props.buttonOneState
                                        ? props.setButtonOneState(false)
                                        : props.setButtonOneState(true);
                                }}
                            />
                        </>
                    )}
                </div>
            </SearchBar>
            {props.suggestions !== undefined && (
                <Suggestions>
                    {props.suggestions.map((suggestion: any, i: number) => {
                        return (
                            <div
                                key={i}
                                onClick={async () => {
                                    await props.setSearchState(
                                        suggestion.volumeInfo.title
                                    );
                                    props.searchFunction();
                                }}
                            >
                                {suggestion.volumeInfo.title}
                            </div>
                        );
                    })}
                </Suggestions>
            )}
        </Container>
    );
}
