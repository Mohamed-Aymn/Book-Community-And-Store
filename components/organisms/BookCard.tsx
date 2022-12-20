import Image from "next/image";
import styles from "./BookCard.module.scss";
import { useQuery } from "react-query";
import { layoutStore } from "../../clientState/layoutStore";
import BookDetailsModal from "./BookDetailsModal";

export default function ({ img, title, click, price, author }: any) {
    const isDisplayingBookDetails = layoutStore(
        (state: any) => state.isDisplayingBookDetails
    );

    const switchDisplayingBookDetails = layoutStore(
        (state: any) => state.switchDisplayingBookDetails
    );

    // let { isLoading, error, data } = useQuery("booksData", async () => {
    //     let res = await fetch(
    //         `https://www.googleapis.com/books/v1/volumes?q=${title}&orderBy=newest`
    //     );
    //     return res.json();
    // });

    let clickHandler = () => {
        switchDisplayingBookDetails(isDisplayingBookDetails);
    };

    author === undefined
        ? (author = "Unknown")
        : typeof author == "object"
        ? (author = `${author[0]} and more`)
        : null;

    return (
        <>
            {isDisplayingBookDetails && (
                <BookDetailsModal
                    click={clickHandler}
                    img={img}
                    title={title}
                    author={author}
                />
            )}

            <button className={styles.mainContainer} onClick={clickHandler}>
                <Image
                    className={styles.image}
                    src={img}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                />
                <div className={styles.title}>{title}</div>
                <hr className={styles.divider} />
                <div className={styles.detailedInfo}>
                    <div className={styles.infoContainer}>
                        <div className={styles.writerTitle}>Writer</div>
                        <div className={styles.author}>{author}</div>
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.buyNowTitle}>Buy now</div>
                        <div className={styles.price}>{price} $</div>
                    </div>
                </div>
            </button>
        </>
    );
}
