import BookCard from "../../components/organisms/BookCard";
import Pagination from "../../components/organisms/Pagination";
import mainPhoto from "../../assets/mainPhoto.jpg";
import { FaSearch, FaFilter } from "react-icons/fa";
import Button from "../../components/molecules/Button";
import { useState } from "react";
import { useQuery, dehydrate, QueryClient } from "react-query";

let searchResult = async (search: any) => {
    return await fetch(`http://localhost:3000/api/books?book=${search}`).then(
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
                `http://localhost:3000/api/books?book=${search}`
            ).then(async (res) => {
                let data = await res.json();
                return data.data.items;
            });
        },
        { enabled: false }
    );

    let genres = [
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
    ];

    let searchResults = () => {
        return (
            <div className="searchResults">
                {!data && !isFetching && <div>there is not data yet</div>}

                {!data && isFetching && <div>fetching</div>}

                {data &&
                    data.map((item: any, i: number) => {
                        return (
                            <BookCard
                                key={i}
                                title={item.volumeInfo.title}
                                author={item.volumeInfo.authors}
                                img={
                                    item.volumeInfo.imageLinks?.thumbnail ||
                                    mainPhoto
                                }
                                price={99.9}
                            />
                        );
                    })}
            </div>
        );
    };

    return (
        <main className="store">
            <div className="storeSearch">
                <div className="newSearchContainer">
                    <div className="mainSearchConatiener">
                        <input
                            type="text"
                            placeholder="Genre, author or book name"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                search !== "" ? suggestionsRefetch() : null;
                            }}
                        />
                        <button onClick={refetch}>
                            <FaSearch />
                        </button>
                    </div>
                    <button className="filterIcon">
                        <FaFilter />
                    </button>
                </div>
                <div>
                    {suggestions &&
                        suggestions.map((suggestion: any, i: number) => {
                            return (
                                <div key={i}>{suggestion.volumeInfo.title}</div>
                            );
                        })}
                </div>

                <div className="genres">
                    {genres.map((genre, i) => {
                        return <Button key={i} text={genre} type="tag" />;
                    })}
                </div>
            </div>

            {searchResults()}

            <Pagination />
        </main>
    );
}
