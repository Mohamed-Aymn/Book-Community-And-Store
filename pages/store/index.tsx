import Pagination from "../../components/organisms/Pagination";
import { useQuery } from "react-query";
import BookSlider from "../../components/organisms/BookSlider";
import BookPage from "../../components/organisms/BookPage";
import useLayoutStore from "../../client_state/useLayoutStore";
import MainSearch from "../../query_functions/MainSearchQuery";
import {
    getFreeBooks,
    getEbooks,
} from "../../query_functions/CollectionsQueries";
import BookDetailsModal from "../../components/organisms/BookDetailsModal";
import useBookStore from "../../client_state/useBookStore";

export default function Store() {
    // (start) all of these logic will be typed in the custom hook, and eventually there will be not main search logic here in this component
    // const isDisplayingBookDetails = layoutStore(
    //     (state: any) => state.isDisplayingBookDetails
    // );
    // const {isDisplayingBookDetails} = useLayoutStore()
    const {
        mainSearch,
        searchPagination,
        setSearchPagination,
        searchQuery,
        searchFilters,
        isDisplayingBookDetails,
    } = useBookStore();
    // main search query
    const MainSearchQuery = MainSearch(
        mainSearch,
        searchQuery,
        searchFilters,
        searchPagination
    );
    // (end) all of these logic will be typed in the custom hook, and eventually there will be not main search logic here in this component
    const { data: freeBooksData } = useQuery("free-books", getFreeBooks, {
        staleTime: 60 * 1000,
        enabled: !MainSearchQuery ? false : true,
    });
    const { data: ebooksData } = useQuery("E-books", getEbooks, {
        staleTime: 60 * 1000,
        enabled: !MainSearchQuery ? false : true,
    });

    return (
        <main>
            {/* make it render if the user hasn't searched before (custom hook logic) */}
            {!MainSearchQuery.data && !MainSearchQuery.isFetching && (
                <>
                    <BookSlider data={ebooksData} title="E-Books" />
                    <BookSlider data={freeBooksData} title="Free-Books" />
                </>
            )}
            {(MainSearchQuery.data || MainSearchQuery.isFetching) && (
                <>
                    <BookPage
                        data={
                            MainSearchQuery.data ? MainSearchQuery.data : null
                        }
                    />
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
            {isDisplayingBookDetails && <BookDetailsModal />}
        </main>
    );
}
