import BookCard from "../../components/organisms/BookCard";
import Pagination from "../../components/organisms/Pagination";
import mainPhoto from "../../assets/mainPhoto.jpg";
import { useEffect, useState } from "react";
import { useQuery, dehydrate, QueryClient } from "react-query";
import SearchBar from "../../components/molecules/SearchBar";
import TagList from "../../components/molecules/TagList";
import { useRouter } from "next/router";

let searchResult = async (
    search: any,
    searchQueries: any,
    searchFilters: any
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
        `http://localhost:3000/api/books?${urlQuery}=${search}&lang=${searchFilters.lang}`
    ).then(async (res) => {
        let data = await res.json();
        return data.data.items;
    });
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

    // search queries
    let [searchQueries, setSearchQueries] = useState({
        inTitle: false,
        inAuthor: false,
        genre: false,
    });
    let [searchFilters, setSearchFilters] = useState({
        lang: "",
    });

    //

    // search result query (server side)
    const { data, isFetching, refetch } = useQuery(
        ["store-search", { search, searchQueries, searchFilters }],
        () => searchResult(search, searchQueries, searchFilters),
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
                            total items: x
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
            <div className="searchContainer">
                <SearchBar
                    placeholder={"Search by book title or author name"}
                    config
                    buttonOneState={searchConfig}
                    setButtonOneState={setSearchConfig}
                    // buttonTwoState={searchFilter}
                    // setButtonTwoState={setSearchFilter}
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
                            <b>Search by</b>
                            <button>both book title and author name</button>
                            <button
                                onClick={() =>
                                    setSearchQueries({
                                        ...searchQueries,
                                        inTitle: true,
                                        inAuthor: false,
                                        genre: false,
                                    })
                                }
                            >
                                Book title
                            </button>
                            <button
                                onClick={() =>
                                    setSearchQueries({
                                        ...searchQueries,
                                        inAuthor: true,
                                        inTitle: false,
                                        genre: false,
                                    })
                                }
                            >
                                author
                            </button>
                            <button
                                onClick={() =>
                                    setSearchQueries({
                                        ...searchQueries,
                                        genre: true,
                                        inAuthor: false,
                                        inTitle: false,
                                    })
                                }
                            >
                                genre
                            </button>
                            {searchQueries.genre && (
                                <>
                                    <div>
                                        <div>Suggestion</div>
                                        <div>
                                            you can search for more genres in
                                            the search bar
                                        </div>
                                    </div>

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
                                </>
                            )}
                        </div>

                        <b>filter</b>
                        <div>
                            <div>lang</div>
                            <select
                                onChange={(e) =>
                                    setSearchFilters({
                                        ...searchFilters,
                                        lang: e.target.value,
                                    })
                                }
                            >
                                <option value="" style={{ display: "none" }} />
                                <option value="en">English</option>
                                <option value="ar">arabic</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {searchResults()}
        </main>
    );
}
