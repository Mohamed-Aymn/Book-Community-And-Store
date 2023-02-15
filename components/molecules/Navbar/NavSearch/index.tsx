import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";
import { RiSettings5Fill } from "react-icons/ri";
import styled from "styled-components";
import { layoutStore } from "../../../../clientState/layoutStore";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import MainSearch from "../../../../query_Functions/MainSearchQuery";
import Divider from "../../../atoms/Divider";
import Suggestions from "./Suggestions";
import Config from "./Config";
import useOnClickOutside from "../../../../hooks/useClickOutside";
import { env } from "../../../../environment";
import { mediaQueryMax, mediaQueryMin } from "../../../../styles/mediaQuery";
import { Transition } from "react-transition-group";

interface IInputBar {
    suggestions: any;
    isFocused: boolean;
    ref: any;
}

const NavSearchBarTransitionDuration = 500;
const NavSearchBar = styled.div<IInputBar>`
    position: relative;
    display: flex;
    justify-content: space-between;
    background-color: ${(props) => props.theme.neutral1};
    border: solid 0.05em ${(props) => props.theme.neutral2};
    align-items: center;
    padding: 0.7em;
    border-radius: 1.7em;
    ${({ suggestions }) =>
        suggestions
            ? `
                box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
                border-radius: 1em 1em 0 0;
                border-bottom: none;
            `
            : null}
    transition: width ${NavSearchBarTransitionDuration}ms ease-in-out;
    width: ${({ isFocused }) => (isFocused ? `40%` : `27%`)};
    ${mediaQueryMax("largeTablet")`
        width: 100%;
    `}
`;

const Input = styled.input`
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    transition: 500ms ease-in-out;
    color: ${(props) => props.theme.neutral3};
    &:focus {
        color: ${(props) => props.theme.text};
    }
    &[placeholder] {
        text-overflow: ellipsis;
        margin-right: 1em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    &::placeholder {
        color: ${(props) => props.theme.neutral3};
    }
`;

const NavButton = styled.div`
    background-color: transparent;
    color: ${(props) => props.theme.text};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        text-decoration: underline;
    }
`;

const DropDownMenu = styled.div`
    position: absolute;
    background-color: ${(props) => props.theme.neutral1};
    color: ${(props) => props.theme.neutral3};
    width: 100%;
    border: solid 0.05em ${(props) => props.theme.neutral2};
    border-top: none;
    border-radius: 0 0 1em 1em;
    display: flex;
    flex-direction: column;
    padding-bottom: 0.7em;
    box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
    padding-top: 0.5em;
    top: 2.5em;
    left: -0em;
    transition: 300ms ease-in-out;
`;

export default function NavSearch() {
    let [isMainContainerFocus, setIsMainContainerFocus] = useState(false);

    let router = useRouter();
    const searchPagination = layoutStore(
        (state: any) => state.searchPagination
    );
    const mainSearch = layoutStore((state: any) => state.mainSearch);
    const setMainSearch = layoutStore((state: any) => state.setMainSearch);
    let [searchConfig, setSearchConfig] = useState(false);

    const searchFilters = layoutStore((state: any) => state.searchFilters);
    const setSearchFilters = layoutStore(
        (state: any) => state.setSearchFilters
    );
    const searchQuery = layoutStore((state: any) => state.searchQuery);
    const setSearchQuery = layoutStore((state: any) => state.setSearchQuery);

    // suggestions query
    const { data: suggestions, refetch: suggestionsRefetch } = useQuery(
        ["suggestions", mainSearch],
        async () => {
            return await fetch(
                `${env.BASE_URL}/api/books?search=${mainSearch}`
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
        searchQuery,
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

    const mainContainerRef = useRef();
    useOnClickOutside(mainContainerRef, () => {
        setIsMainContainerFocus(false);
        setSearchConfig(false);
    });

    return (
        <NavSearchBar
            suggestions={
                (suggestions !== undefined || searchConfig) &&
                isMainContainerFocus
                    ? true
                    : false
            }
            isFocused={isMainContainerFocus}
            onFocus={() => setIsMainContainerFocus(true)}
            ref={mainContainerRef}
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
            <div style={{ display: "flex", gap: "0.3em" }}>
                <NavButton onClick={() => MainSearchQuery.refetch()}>
                    <FaSearch />
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
            {/* drop down menu for suggestion and searchconfig */}
            {isMainContainerFocus &&
                (suggestions !== undefined || searchConfig) && (
                    <DropDownMenu>
                        {searchConfig && (
                            <Config
                                setSearchQuery={setSearchQuery}
                                searchQuery={searchQuery}
                                setSearchFilters={setSearchFilters}
                                searchFilters={searchFilters}
                            />
                        )}
                        {suggestions !== undefined &&
                            searchConfig &&
                            isMainContainerFocus && <Divider />}
                        {suggestions !== undefined && isMainContainerFocus && (
                            <Suggestions
                                suggestions={suggestions}
                                refetch={MainSearchQuery.refetch}
                                setMainSearch={setMainSearch}
                            />
                        )}
                    </DropDownMenu>
                )}
        </NavSearchBar>
    );
}
