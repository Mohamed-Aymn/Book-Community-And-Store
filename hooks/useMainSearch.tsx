import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import useBookStore from "../client_state/useBookStore";
import { env } from "../environment";

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
        `${env.BASE_URL}/api/books?${searchQuery}=${search}&lang=${searchFilters.lang}&page=${page}`
    ).then(async (res) => {
        let data = await res.json();
        return data.data;
    });
};

export default function useMainSearch(postValue?: string) {
    const {
        setOnClickChangingMainSearchValue,
        instantlyChangingMainSearchValue,
        onClickChangingMainSearchValue,
        searchPagination,
        searchQuery,
        searchFilters,
        setInstantlyChangingMainSearchValue,
    } = useBookStore();

    let [isMainSearch, setMainSearch] = useState(false);
    useEffect(() => {
        const urlQuery = async () => {
            if (postValue) {
                await setInstantlyChangingMainSearchValue(postValue);
                await setOnClickChangingMainSearchValue(postValue);
                setMainSearch(true);
            }
        };
        urlQuery();
    }, []);

    const {
        data,
        refetch: reactQueryRefetch,
        isFetching,
    } = useQuery(
        [
            "storeSearch",
            onClickChangingMainSearchValue,
            searchQuery,
            searchFilters,
            searchPagination,
        ],
        () =>
            searchResult(
                onClickChangingMainSearchValue,
                searchQuery,
                searchFilters,
                searchPagination
            ),
        { enabled: postValue && isMainSearch ? true : false }
    );

    const refetch = async () => {
        await setOnClickChangingMainSearchValue(
            instantlyChangingMainSearchValue
        );
        await reactQueryRefetch();
    };

    return { data, refetch, isFetching };
}
