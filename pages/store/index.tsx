import BookCard from "../../components/organisms/BookCard";
import Pagination from "../../components/organisms/Pagination";
import mainPhoto from "../../assets/mainPhoto.jpg";
import { FaSearch, FaFilter } from "react-icons/fa";
import Button from "../../components/molecules/Button";

export default function () {
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
    // 25
    let books = [
        1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4,
        5,
    ];

    return (
        <main className="store">
            <div className="storeSearch">
                <div className="newSearchContainer">
                    <div className="mainSearchConatiener">
                        <input
                            type="text"
                            placeholder="Genre, author or book name"
                        />
                        <button>
                            <FaSearch />
                        </button>
                    </div>
                    <button className="filterIcon">
                        <FaFilter />
                    </button>
                </div>

                <div className="genres">
                    {genres.map((genre, i) => {
                        return <Button key={i} text={genre} type="tag" />;
                    })}
                </div>
            </div>

            <div className="searchResults">
                {books.map((book, i) => {
                    return (
                        <BookCard
                            key={i}
                            title="Hello"
                            author="Gerorge"
                            img={mainPhoto}
                            price={99.9}
                        />
                    );
                })}
            </div>

            <Pagination />
        </main>
    );
}
