import { useRouter } from "next/router";
import { RiSettings5Fill } from "react-icons/ri";
import styled, { useTheme } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import Divider from "../../../atoms/Divider";
import Suggestions from "./Suggestions";
import Config from "./Config";
import useOnClickOutside from "../../../../hooks/useClickOutside";
import { env } from "../../../../environment";
import { screens } from "../../../../styles/mediaQuery";
import useBookStore from "../../../../client_state/useBookStore";
import useMainSearch from "../../../../hooks/useMainSearch";
import { BsSearch } from "react-icons/bs";
import Box from "../../../atoms/Box";
import useScreenWidth from "../../../../hooks/useScreenWidth";

const Input = styled.input`
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    transition: 500ms ease-in-out;
    color: ${(props) => props.theme.colors.neutral3};
    &:focus {
        color: ${(props) => props.theme.colors.text};
    }
    &[placeholder] {
        text-overflow: ellipsis;
        margin-right: 1em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    &::placeholder {
        color: ${(props) => props.theme.colors.neutral3};
    }
`;

const NavButton = styled.button`
    background-color: transparent;
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    scale: 1.1;
    &:hover {
        text-decoration: underline;
    }
`;

export default function NavSearch() {
    const theme = useTheme();
    const width = useScreenWidth();
    const router = useRouter();
    const { refetch } = useMainSearch();
    const {
        onClickChangingMainSearchValue,
        searchFilters,
        setSearchFilters,
        searchQuery,
        setSearchQuery,
        setInstantlyChangingMainSearchValue,
        instantlyChangingMainSearchValue,
    } = useBookStore();
    const mainContainerRef = useRef();
    useOnClickOutside(mainContainerRef, () => {
        setIsMainContainerFocus(false);
        setSearchConfig(false);
    });

    // suggestions search query
    const { data: suggestionsData, refetch: suggestionsRefetch } = useQuery(
        ["suggestions", instantlyChangingMainSearchValue],
        async () => {
            return await fetch(
                `${env.BASE_URL}/api/books?search=${instantlyChangingMainSearchValue}`
            ).then(async (res) => {
                let data = await res.json();
                return data.data.items;
            });
        },
        { enabled: false }
    );

    const searchHanlder = async () => {
        await refetch();
        router.push({
            pathname: "/store",
            query: { search: onClickChangingMainSearchValue },
        });
    };

    let [isMainContainerFocus, setIsMainContainerFocus] = useState(false);
    let [searchConfig, setSearchConfig] = useState(false);
    let [isSuggestions, setSuggestions] = useState(
        (suggestionsData !== undefined || searchConfig) && isMainContainerFocus
            ? true
            : false
    );
    useEffect(() => {
        if (suggestionsData) {
            setSuggestions(
                (suggestionsData !== undefined || searchConfig) &&
                    isMainContainerFocus
                    ? true
                    : false
            );
        } else {
            setSuggestions(
                (suggestionsData !== undefined || searchConfig) &&
                    isMainContainerFocus
                    ? true
                    : false
            );
        }
    }, [suggestionsData, isMainContainerFocus]);

    return (
        <Box
            onFocus={() => setIsMainContainerFocus(true)}
            ref={mainContainerRef}
            // styels
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bg={theme.colors.neutral1}
            border="solid 0.05em"
            borderBottom="none"
            borderColor={theme.colors.neutral2}
            p={theme.space.sm}
            borderRadius={
                isSuggestions
                    ? `${theme.space.sm} ${theme.space.sm} 0 0`
                    : theme.space.xl
            }
            width={
                isMainContainerFocus
                    ? "40%"
                    : width < screens.largeTablet
                    ? "100%"
                    : "27%"
            }
            transition="width 500ms ease-in-out"
            boxShadow={isSuggestions ? "0 2px 4px rgb(0 0 0 / 20%)" : undefined}
        >
            <Input
                type="text"
                placeholder={`Search by book title or author name`}
                value={instantlyChangingMainSearchValue}
                onChange={async (e) => {
                    await setInstantlyChangingMainSearchValue(e.target.value);
                    instantlyChangingMainSearchValue !== ""
                        ? suggestionsRefetch()
                        : null;
                }}
                onKeyDown={(e) => {
                    e.key == "Enter" ? searchHanlder() : null;
                }}
            />
            <Box display="flex" flexGap={theme.space.xs}>
                <NavButton onClick={() => refetch()}>
                    <BsSearch />
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
            </Box>
            {/* drop down menu for suggestions*/}
            {isMainContainerFocus &&
                (suggestionsData !== undefined || searchConfig) && (
                    <Box
                        position="absolute"
                        top="2.5em"
                        left={0}
                        width="100%"
                        bg={theme.colors.neutral1}
                        border="solild 0.05em"
                        color={theme.colors.neutral3}
                        borderColor={theme.colors.neutral2}
                        borderTop="none"
                        borderRadius={`0 0 ${theme.space.sm} ${theme.space.sm}`}
                        boxShadow="0 2px 4px rgb(0 0 0 / 20%)"
                        display="felx"
                        flexDirection="column"
                        pb={theme.space.xs}
                        pt={theme.space.sm}
                    >
                        {searchConfig && (
                            <Config
                                setSearchQuery={setSearchQuery}
                                searchQuery={searchQuery}
                                setSearchFilters={setSearchFilters}
                                searchFilters={searchFilters}
                            />
                        )}
                        {suggestionsData !== undefined &&
                            searchConfig &&
                            isMainContainerFocus && <Divider />}
                        {suggestionsData !== undefined &&
                            isMainContainerFocus && (
                                <Suggestions
                                    suggestions={suggestionsData}
                                    refetch={refetch}
                                />
                            )}
                    </Box>
                )}
        </Box>
    );
}
