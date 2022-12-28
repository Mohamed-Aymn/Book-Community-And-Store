import Image from "next/image";
import styles from "./BookCard.module.scss";
import { layoutStore } from "../../clientState/layoutStore";

export default function (props: any) {
    let { img, title, price, author } = props;

    const setDisplayingBookDetails = layoutStore(
        (state: any) => state.setDisplayingBookDetails
    );
    const setBookDetials = layoutStore((state: any) => state.setBookDetials);

    author === undefined
        ? (author = "Unknown")
        : typeof author == "object"
        ? (author = `${author[0]} and more`)
        : null;

    return (
        <>
            <button
                className={styles.mainContainer}
                onClick={() => {
                    setBookDetials(props);
                    setDisplayingBookDetails(true);
                }}
            >
                <Image
                    className={styles.image}
                    src={img}
                    alt="Book image"
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
                        <div className={styles.price}>${price}</div>
                    </div>
                </div>
            </button>
        </>
    );
}
