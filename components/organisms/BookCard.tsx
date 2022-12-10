import Image from "next/image";
import styles from "./BookCard.module.scss";
import { useQuery } from "react-query";
import { layoutStore } from "../../clientState/layoutStore";
import Button from "../molecules/Button";
import Link from "next/link";
import BookDetailsModal from "./BookDetailsModal";

export default function ({ img, title, click, price, info }: any) {
    const isDisplayingBookDetails = layoutStore(
        (state: any) => state.isDisplayingBookDetails
    );

    const switchDisplayingBookDetails = layoutStore(
        (state: any) => state.switchDisplayingBookDetails
    );

    let { isLoading, error, data } = useQuery("booksData", async () => {
        let res = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${title}&orderBy=newest`
        );
        return res.json();
    });

    let clickHandler = () => {
        switchDisplayingBookDetails(isDisplayingBookDetails);
    };

    return (
        <>
            {isDisplayingBookDetails && (
                <BookDetailsModal
                    click={clickHandler}
                    img={img}
                    title={title}
                    info={info}
                />
            )}

            <button className={styles.mainContainer} onClick={clickHandler}>
                <Image
                    className={styles.image}
                    src={img}
                    alt="Picture of the author"
                />
                <div className={styles.firstInfoLine}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.price}>{price}$</div>
                </div>
                <div className={styles.info}>{info}</div>
            </button>
        </>
    );
}
