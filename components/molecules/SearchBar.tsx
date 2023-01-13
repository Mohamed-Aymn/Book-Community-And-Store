import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";
import { RiSettings5Fill } from "react-icons/ri";
import styled from "styled-components";

interface IInputBar {
    suggestions: boolean;
}

const SearchBar = styled.div`
    width: 60%;
    margin: 1em auto;
    position: sticky;
    top: 5em;
    z-index: 1;
`;

const InputBar = styled.div<IInputBar>`
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: ${(props) => props.theme.secondary};
    align-items: center;
    padding: 0.7em;
    border-radius: 1.7em;
    &:hover {
        box-shadow: 0px 4px 8px 0 #02020252;
    }

    ${(props) =>
        props.suggestions
            ? `
                box-shadow: 0px 4px 8px 0 #02020252;
                border-radius: 1em 1em 0 0;
            `
            : null}
`;

const VerticalDivider = styled.div`
    border-left: 0.05em solid rgb(226, 226, 226);
    height: 16px;
`;

const Suggestions = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${(props) => props.theme.secondary};
    border-radius: 0 0 1em 1em;
    padding-bottom: 0.7em;
    box-shadow: 0 4px 8px #ccc;
    padding-top: 0.5em;
    position: absolute;
    & div {
        padding: 0 0.7em;
        &:hover {
            background-color: rgb(226, 226, 226);
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
        <SearchBar>
            <InputBar
                suggestions={props.suggestions !== undefined ? true : false}
            >
                <input
                    type="text"
                    style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        backgroundColor: "transparent",
                    }}
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
                    <button onClick={props.searchFunction}>
                        <FaSearch />
                    </button>
                    {props.config && (
                        <>
                            <VerticalDivider />

                            <button
                                onClick={() => {
                                    props.buttonOneState
                                        ? props.setButtonOneState(false)
                                        : props.setButtonOneState(true);
                                }}
                            >
                                <RiSettings5Fill />
                            </button>
                        </>
                    )}
                </div>
            </InputBar>
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
        </SearchBar>
    );
}
