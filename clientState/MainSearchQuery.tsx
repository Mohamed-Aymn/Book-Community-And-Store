import { useQuery, dehydrate, QueryClient } from "react-query";

let searchResult = async (
    search: string,
    searchQuery: string,
    searchFilters: {
        lang: string;
    },
    page: number
) => {
    // let urlQuery;
    // searchQuery === "inTitle"
    //     ? (urlQuery = "intitle")
    //     : searchQueries.inAuthor
    //     ? (urlQuery = "inauthor")
    //     : searchQueries.genre
    //     ? (urlQuery = "genre")
    //     : (urlQuery = "search");

    return await fetch(
        `http://localhost:3000/api/books?${searchQuery}=${search}&lang=${searchFilters.lang}&page=${page}`
    ).then(async (res) => {
        let data = await res.json();
        return data.data;
    });
};

const MainSearch = (
    search: string,
    searchQuery: string,
    searchFilters: {
        lang: string;
    },
    searchPagination: number
) => {
    const { data, refetch, isFetching } = useQuery(
        ["storeSearch", search, searchQuery, searchFilters, searchPagination],
        () =>
            searchResult(search, searchQuery, searchFilters, searchPagination),
        { enabled: false }
    );

    return { data, refetch, isFetching };
};

export default MainSearch;
