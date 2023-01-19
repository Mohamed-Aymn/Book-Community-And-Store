import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";
import { RiSettings5Fill } from "react-icons/ri";
import styled from "styled-components";
import { layoutStore } from "../../../../clientState/layoutStore";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import MainSearch from "../../../../clientState/MainSearchQuery";
import Divider from "../../../atoms/Divider";
import Suggestions from "./Suggestions";
import Config from "./Config";

interface IInputBar {
    suggestions: boolean;
}

const Container = styled.div`
    width: 35%;
    /* width: 100%; */
    /* margin-left: calc(auto / 3); */
    /* flex-basis: 1; */

    /* display: flex; */
    /* flex-direction: row-reverse; */
    /* align-self: flex-end; */
    /* margin: 1em au   to; */
    /* position: sticky; */
    /* top: 5em; */
    transition: width ease-in-out 0.7s;
    /* z-index: 1; */
    &:hover {
        width: 100%;
    }
`;

const NavSearchBar = styled.div<IInputBar>`
    display: flex;
    justify-content: space-between;
    background-color: ${(props) => props.theme.neutral3};
    border: solid 0.05em ${(props) => props.theme.neutral3};
    align-items: center;
    padding: 0.7em;
    border-radius: 1.7em;
    transition: width ease-in-out 0.4s;
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

    &[placeholder] {
        text-overflow: ellipsis;
        color: ${(props) => props.theme.neutral1};
        margin-right: 1em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const NavButton = styled.div`
    background-color: transparent;
    color: ${(props) => props.theme.text};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const DropDownMenu = styled.div`
    position: absolute;
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.neutral1};
    width: 100%;
    border: solid 0.05em ${(props) => props.theme.neutral3};
    border-top: none;
    border-radius: 0 0 1em 1em;
    display: flex;
    flex-direction: column;
    padding-bottom: 0.7em;
    box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
    padding-top: 0.5em;
`;

export default function () {
    let router = useRouter();
    // const setSearchResultsGlobalState = layoutStore(
    //     (state: any) => state.setSearchResult
    // );
    // const searchResultsGlobalState = layoutStore(
    //     (state: any) => state.searchResult
    // );
    const searchPagination = layoutStore(
        (state: any) => state.searchPagination
    );
    const mainSearch = layoutStore((state: any) => state.mainSearch);
    const setMainSearch = layoutStore((state: any) => state.setMainSearch);
    // let [search, setSearch] = useState("");
    let [searchConfig, setSearchConfig] = useState(false);
    // search queries
    // let [searchQueries, setSearchQueries] = useState({
    //     inTitle: false,
    //     inAuthor: false,
    //     genre: false,
    // });
    let [searchFilters, setSearchFilters] = useState({
        lang: "",
    });

    const searchQueries = layoutStore((state: any) => state.searchQueries);
    const setSearchQueries = layoutStore(
        (state: any) => state.setSearchQueries
    );

    // suggestions query
    const { data: suggestions, refetch: suggestionsRefetch } = useQuery(
        ["suggestions", { mainSearch }],
        async () => {
            return await fetch(
                `http://localhost:3000/api/books?search=${mainSearch}`
            ).then(async (res) => {
                let data = await res.json();
                return data.data.items;
            });
        },
        { enabled: false }
    );

    // mains search result query
    const MainSearchQuery = MainSearch(
        mainSearch,
        searchQueries,
        searchFilters,
        searchPagination
    );

    // useEffect(() => {
    //     setSearchResultsGlobalState(MainSearchQuery.data);
    // }, [MainSearchQuery.data]);
    // FIXME: search for react query function to type this searchHanlder function logic inside it, something like refetch() but acceptes typing code inside it.
    const searchHanlder = async () => {
        await MainSearchQuery.refetch();
        router.push({
            pathname: "/store",
            query: { search: mainSearch },
        });
    };

    return (
        <Container>
            <NavSearchBar
                suggestions={suggestions !== undefined ? true : false}
            >
                <Input
                    type="text"
                    placeholder={`Search by book title or author name`}
                    value={mainSearch}
                    onChange={async (e) => {
                        await setMainSearch(e.target.value);
                        mainSearch !== "" ? suggestionsRefetch() : null;
                    }}
                    onKeyDown={(e) => {
                        e.key == "Enter" ? searchHanlder() : null;
                    }}
                />
                <div style={{ display: "flex", gap: "0.25em" }}>
                    <NavButton onClick={() => MainSearchQuery.refetch()}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                scale: "0.8",
                            }}
                        >
                            <FaSearch />
                        </div>
                    </NavButton>

                    <NavButton
                        onClick={() => {
                            searchConfig
                                ? setSearchConfig(false)
                                : setSearchConfig(true);
                        }}
                    >
                        <RiSettings5Fill />
                    </NavButton>
                </div>
            </NavSearchBar>

            {/* drop down menu for suggestion and searchconfig */}
            {(suggestions !== undefined || searchConfig) && (
                <DropDownMenu>
                    {searchConfig && (
                        <Config
                            setSearchQueries={setSearchQueries}
                            searchQueries={searchQueries}
                            setSearchFilters={setSearchFilters}
                            searchFilters={searchFilters}
                        />
                    )}
                    {suggestions && searchConfig && <Divider />}
                    {suggestions !== undefined && (
                        <Suggestions
                            suggestions={suggestions}
                            refetch={MainSearchQuery.refetch}
                            setMainSearch={setMainSearch}
                        />
                    )}
                </DropDownMenu>
            )}
        </Container>
    );
}
