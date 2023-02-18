import Pagination from "../../components/organisms/Pagination";
import { useQuery } from "react-query";
import BookSlider from "../../components/organisms/BookSlider";
import BookPage from "../../components/organisms/BookPage";
import {
    getFreeBooks,
    getEbooks,
} from "../../query_functions/CollectionsQueries";
import useBookStore from "../../client_state/useBookStore";
import useMainSearch from "../../hooks/useMainSearch";

export async function getServerSideProps(context: any) {
    return {
        props: {
            searchQuery: context.query.search ? context.query.search : null,
        },
    };
}

export default function Store(props: any) {
    const { data, refetch, isFetching } = useMainSearch(
        props.searchQuery ? (props.searchQuery as string) : undefined
    );

    const { searchPagination, setSearchPagination } = useBookStore();
    const { data: freeBooksData } = useQuery("free-books", getFreeBooks, {
        staleTime: 60 * 1000,
        enabled: data ? false : true,
    });
    const { data: ebooksData } = useQuery("E-books", getEbooks, {
        staleTime: 60 * 1000,
        enabled: data ? false : true,
    });

    return (
        <main>
            {!data && !isFetching && (
                <>
                    <BookSlider data={ebooksData} title="E-Books" />
                    <BookSlider data={freeBooksData} title="Free-Books" />
                </>
            )}
            {(data || isFetching) && (
                <>
                    <BookPage data={data ? data : null} />
                    <Pagination
                        page={searchPagination}
                        setPage={setSearchPagination}
                        fetchFunction={refetch}
                        // total items are statically typed due to google books api totalItems error
                        totalItems={300}
                        itemsPerPage={28}
                    />
                </>
            )}
        </main>
    );
}
