import BookCard from "../../components/organisms/BookCard";
import Pagination from "../../components/organisms/Pagination";
import mainPhoto from "../../assets/mainPhoto.jpg";
import { useState } from "react";
import { useQuery, dehydrate, QueryClient } from "react-query";
import SearchBar from "../../components/molecules/SearchBar";
import TagList from "../../components/molecules/TagList";

let searchResult = async (search: any) => {
    return await fetch(`http://localhost:3000/api/books?search=${search}`).then(
        async (res) => {
            let data = await res.json();
            return data.data.items;
        }
    );
};

export async function getStaticProps() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery("store-search", searchResult);
    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
}

export default function () {
    let [search, setSearch] = useState("");
    let [searchConfig, setSearchConfig] = useState(false);

    // search result query (server side)
    const { data, isFetching, refetch } = useQuery(
        ["store-search", { search }],
        () => searchResult(search),
        { enabled: false }
    );

    // suggestions query (client side)
    const { data: suggestions, refetch: suggestionsRefetch } = useQuery(
        ["suggestions", { search }],
        async () => {
            return await fetch(
                `http://localhost:3000/api/books?search=${search}`
            ).then(async (res) => {
                let data = await res.json();
                return data.data.items;
            });
        },
        { enabled: false }
    );

    let searchResults = () => {
        return (
            <>
                {!data && (
                    <div className="messageCards">
                        {!isFetching && <div>There is nothing to show yet</div>}

                        {isFetching && <div>Loading ..</div>}
                    </div>
                )}
                {data && (
                    <>
                        <div className="searchResults">
                            {data.map((item: any) => {
                                return (
                                    <BookCard
                                        key={item.id}
                                        id={item.id}
                                        title={item.volumeInfo.title}
                                        author={item.volumeInfo.authors}
                                        img={
                                            item.volumeInfo.imageLinks
                                                ?.thumbnail || mainPhoto
                                        }
                                        price={99.9}
                                    />
                                );
                            })}
                        </div>
                        <Pagination />
                    </>
                )}
            </>
        );
    };

    return (
        <main>
            <SearchBar
                placeholder="Search by book name"
                config
                configState={searchConfig}
                setConfigState={setSearchConfig}
                //
                searchState={search}
                setSearchState={setSearch}
                //
                searchFunction={refetch}
                //
                suggestions={suggestions}
                suggestinosFunction={suggestionsRefetch}
            />

            {searchConfig && (
                <div>
                    <div>
                        <div>Search by</div>
                        <div>Book name</div>
                        <div>isbn</div>
                        <div>author</div>
                    </div>
                    <div>
                        <div>price</div>
                        <div>
                            this is a range input and free at the end of this
                            range
                        </div>
                    </div>
                    <div>
                        <div>type</div>
                        <div>ebook</div>
                        <div>printed</div>
                    </div>
                </div>
            )}

            <TagList
                list={[
                    "Horror",
                    "SC-Fi",
                    "Comdey",
                    "Action",
                    "Novel",
                    "History",
                    "Drama",
                    "Poetry",
                    "Adventure",
                    "Romance",
                    "Detective & Mystery",
                    "Philosophy",
                    "Religion",
                    "something else",
                    "something else",
                    "something else",
                ]}
            />

            {searchResults()}
        </main>
    );
}
