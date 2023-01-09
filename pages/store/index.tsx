import BookCard from "../../components/organisms/BookCard";
import Pagination from "../../components/organisms/Pagination";
import mainPhoto from "../../assets/mainPhoto.jpg";
import { useState } from "react";
import { useQuery, dehydrate, QueryClient } from "react-query";
import SearchBar from "../../components/molecules/SearchBar";
import TagList from "../../components/molecules/TagList";
import Button from "../../components/molecules/Button";
import Link from "next/link";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

let getFreeBooks = async () => {
    return fetch("http://localhost:3000/api/books?collection=free-ebooks").then(
        async (res) => {
            let data = await res.json();
            return data.data.items;
        }
    );
};
let getEbooks = async () => {
    return fetch("http://localhost:3000/api/books?collection=ebooks").then(
        async (res) => {
            let data = await res.json();
            return data.data.items;
        }
    );
};

let searchResult = async (
    search: any,
    searchQueries: any,
    searchFilters: any,
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

export async function getStaticProps() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery("store-search", searchResult);
    await queryClient.prefetchQuery("free-books", getFreeBooks);
    await queryClient.prefetchQuery("E-books", getEbooks);
    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
}

export default function () {
    let [search, setSearch] = useState("");
    let [searchConfig, setSearchConfig] = useState(false);

    const { data: freeBooksData } = useQuery("free-books", getFreeBooks, {
        staleTime: 60 * 1000,
    });
    const { data: ebooksData } = useQuery("E-books", getEbooks, {
        staleTime: 60 * 1000,
    });

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
    let [page, setPage] = useState(1);

    // search result query (server side)
    const { data, isFetching, refetch } = useQuery(
        ["store-search", { search, searchQueries, searchFilters, page }],
        () => searchResult(search, searchQueries, searchFilters, page),
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
                    <div>
                        {!isFetching && (
                            <>
                                <section className="section">
                                    <div className="sectionHeader">
                                        <h1 className="title">E-Books</h1>
                                        <div className="sliderControllers">
                                            <Button
                                                text="View All"
                                                approach="primary"
                                                // type on click logic here to fetch specific data (genre , print type and etc)
                                            />
                                            <Button
                                                icon={
                                                    <MdOutlineNavigateBefore />
                                                }
                                                approach="primary"
                                                onClick={() => {
                                                    let slider =
                                                        document.getElementById(
                                                            "eBooksSlider"
                                                        );
                                                    slider.scrollBy(-175, 0);
                                                }}
                                            />
                                            <Button
                                                icon={<MdOutlineNavigateNext />}
                                                approach="primary"
                                                onClick={() => {
                                                    let slider =
                                                        document.getElementById(
                                                            "eBooksSlider"
                                                        );
                                                    slider.scrollBy(175, 0);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="homeSlider"
                                        id="eBooksSlider"
                                    >
                                        {ebooksData &&
                                            ebooksData.map((book: any) => {
                                                return (
                                                    <BookCard
                                                        key={book.id}
                                                        id={book.id}
                                                        title={
                                                            book.volumeInfo
                                                                .title
                                                        }
                                                        author={
                                                            book.volumeInfo
                                                                .authors
                                                        }
                                                        price="99"
                                                        img={
                                                            book.volumeInfo
                                                                .imageLinks
                                                                ?.thumbnail ||
                                                            mainPhoto
                                                        }
                                                    />
                                                );
                                            })}
                                    </div>
                                </section>

                                <section className="section">
                                    <div className="sectionHeader">
                                        <h1 className="title">Free-Books</h1>
                                        <div className="sliderControllers">
                                            <Link href="/store">
                                                <Button
                                                    text="View All"
                                                    approach="primary"
                                                />
                                            </Link>
                                            <Button
                                                icon={
                                                    <MdOutlineNavigateBefore />
                                                }
                                                approach="primary"
                                                onClick={() => {
                                                    let slider =
                                                        document.getElementById(
                                                            "freeBooksSlider"
                                                        );
                                                    slider.scrollBy(-175, 0);
                                                }}
                                            />
                                            <Button
                                                icon={<MdOutlineNavigateNext />}
                                                approach="primary"
                                                onClick={() => {
                                                    let slider =
                                                        document.getElementById(
                                                            "freeBooksSlider"
                                                        );
                                                    slider.scrollBy(175, 0);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="homeSlider"
                                        id="freeBooksSlider"
                                    >
                                        {freeBooksData &&
                                            freeBooksData.map((book: any) => {
                                                return (
                                                    <BookCard
                                                        key={book.id}
                                                        id={book.id}
                                                        title={
                                                            book.volumeInfo
                                                                .title
                                                        }
                                                        author={
                                                            book.volumeInfo
                                                                .authors
                                                        }
                                                        price="99"
                                                        img={
                                                            book.volumeInfo
                                                                .imageLinks
                                                                ?.thumbnail
                                                        }
                                                    />
                                                );
                                            })}
                                    </div>
                                </section>
                            </>
                        )}

                        {isFetching && (
                            <div className="messageCards">Loading ..</div>
                        )}
                    </div>
                )}
                {data && (
                    <>
                        <div className="searchResults">
                            {data?.items?.map((item: any) => {
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
                        <Pagination
                            page={page}
                            setPage={setPage}
                            fetchFunction={refetch}
                            // total items are statically typed due to google books api totalItems error
                            totalItems={300}
                            itemsPerPage={28}
                        />
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
