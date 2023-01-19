import Pagination from "../../components/organisms/Pagination";
import { useQuery } from "react-query";
import BookSlider from "../../components/organisms/BookSlider";
import styled from "styled-components";
import BookPage from "../../components/organisms/BookPage";
import { layoutStore } from "../../clientState/layoutStore";
import MainSearch from "../../clientState/MainSearchQuery";
import { getFreeBooks, getEbooks } from "../../clientState/CollectionsQueries";

const MesssgeCard = styled.div`
    margin-top: 1em;
    height: calc(100vh - 11em);
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${(props) => props.theme.primary} solid 0.05em;
    border-radius: 1.7em;
`;

export default function () {
    const searchResultsGlobalState = layoutStore(
        (state: any) => state.searchResult
    );
    const mainSearch = layoutStore((state: any) => state.mainSearch);
    const setMainSearch = layoutStore((state: any) => state.setMainSearch);
    const searchPagination = layoutStore(
        (state: any) => state.searchPagination
    );
    const setSearchPagination = layoutStore(
        (state: any) => state.setSearchPagination
    );
    const searchQueries = layoutStore((state: any) => state.searchQueries);
    const searchFilters = layoutStore((state: any) => state.searchFilters);
    const setSearchFilters = layoutStore(
        (state: any) => state.setSearchFilters
    );

    // main search query
    const MainSearchQuery = MainSearch(
        mainSearch,
        searchQueries,
        searchFilters,
        searchPagination
    );

    const { data: freeBooksData } = useQuery("free-books", getFreeBooks, {
        staleTime: 60 * 1000,
        enabled: !MainSearchQuery ? false : true,
    });
    const { data: ebooksData } = useQuery("E-books", getEbooks, {
        staleTime: 60 * 1000,
        enabled: !MainSearchQuery ? false : true,
    });

    let searchResults = () => {
        return (
            <>
                {!MainSearchQuery.data && (
                    <div>
                        {!MainSearchQuery.isFetching && (
                            <>
                                <BookSlider data={ebooksData} title="E-Books" />
                                <BookSlider
                                    data={freeBooksData}
                                    title="Free-Books"
                                />
                            </>
                        )}

                        {MainSearchQuery.isFetching && (
                            <MesssgeCard>Loading ..</MesssgeCard>
                        )}
                    </div>
                )}
                {MainSearchQuery.data && (
                    <>
                        <BookPage data={MainSearchQuery.data} />
                        <Pagination
                            page={searchPagination}
                            setPage={setSearchPagination}
                            fetchFunction={MainSearchQuery.refetch}
                            // total items are statically typed due to google books api totalItems error
                            totalItems={300}
                            itemsPerPage={28}
                        />
                    </>
                )}
            </>
        );
    };

    // TODO: convert this to react component instead of returning a function
    return <main>{searchResults()}</main>;
}
