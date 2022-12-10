import SearchBar from "../../components/molecules/SearchBar";
import Button from "../../components/molecules/Button";
import BookCard from "../../components/organisms/BookCard";
import Pagination from "../../components/organisms/Pagination";
import mainPhoto from "../../assets/mainPhoto.jpg";

export default function () {
    let genres = ["Horror", "SC-Fi", "comdey", "action"];
    let books = [1, 2, 3, 4];

    return (
        <main>
            <div className="searchContainer">
                <SearchBar placeholder="Search Here" config="true" />

                <div className="genres">
                    {genres.map((genre, i) => {
                        return <Button key={i} text={genre} type="secondary" />;
                    })}
                </div>
            </div>

            <div className="searchResults">
                {books.map((book, i) => {
                    return (
                        <BookCard
                            key={i}
                            title="hello"
                            info="coooool book"
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
