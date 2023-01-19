import { useQuery, dehydrate, QueryClient } from "react-query";

let searchResult = async (
    search: string,
    searchQueries: {
        [key: string]: boolean;
    },
    searchFilters: {
        lang: string;
    },
    page: number
) => {
    let urlQuery;
    searchQueries.inTitle
        ? (urlQuery = "intitle")
        : searchQueries.inAuthor
        ? (urlQuery = "inauthor")
        : searchQueries.genre
        ? (urlQuery = "genre")
        : (urlQuery = "search");

    return await fetch(
        `http://localhost:3000/api/books?${urlQuery}=${search}&lang=${searchFilters.lang}&page=${page}`
    ).then(async (res) => {
        let data = await res.json();
        return data.data;
    });
};

const MainSearch = (
    search: string,
    searchQueries: {
        [key: string]: boolean;
    },
    searchFilters: {
        lang: string;
    },
    searchPagination: number
) => {
    const { data, refetch, isFetching } = useQuery(
        ["storeSearch", search, searchQueries, searchFilters, searchPagination],
        () =>
            searchResult(
                search,
                searchQueries,
                searchFilters,
                searchPagination
            ),
        { enabled: false }
    );

    return { data, refetch, isFetching };
};

export default MainSearch;
