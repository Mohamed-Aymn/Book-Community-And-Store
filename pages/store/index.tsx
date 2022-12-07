import Container from "../../components/molecules/Container";
import SearchBar from "../../components/molecules/SearchBar";
import Button from "../../components/molecules/Button";
import BookCard from "../../components/organisms/BookCard";
import Pagination from "../../components/organisms/Pagination";
import { useState } from "react";
import styles from "./index.module.scss";

export default function () {
    let genres = ["Horro", "SC-Fi", "comdey", "action"];

    let books = [1, 2, 3, 4];

    let [productDetails, setProductDetails] = useState(false);
    let clickHandler = () => {
        setProductDetails(true);
    };

    return (
        <main>
            {productDetails && (
                <div className={styles.productDetails}>
                    <div className={styles.content}>
                        <button onClick={() => setProductDetails(false)}>
                            x
                        </button>
                        <h1>book title</h1>
                        <div>image</div>
                        <div>
                            <div>author: bla</div>
                            <div>rate: bla</div>
                            <div>no of pages: bla</div>
                            <div>lang: bla</div>
                        </div>
                        <div>open full page</div>
                    </div>
                </div>
            )}

            <SearchBar placeholder="Search Here" config="true" width="100%" />

            <Container display="flex">
                {genres.map((genre, i) => {
                    return <Button key={i} text={genre} type="secondary" />;
                })}
            </Container>

            <Container display="flex">
                {books.map((book, i) => {
                    return (
                        <BookCard
                            key={i}
                            title="hello"
                            anotherInfo="awesome"
                            click={() => clickHandler()}
                        />
                    );
                })}
            </Container>

            <Pagination />
        </main>
    );
}
