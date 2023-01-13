import Image from "next/image";
import Link from "next/link";
import styles from "./BookDetailsModal.module.scss";
import Button from "../atoms/Button";
import { layoutStore } from "../../clientState/layoutStore";

export default function () {
    const setDisplayingBookDetails = layoutStore(
        (state: any) => state.setDisplayingBookDetails
    );
    const bookDetails = layoutStore((state: any) => state.bookDetails);

    return (
        <div className={styles.productDetails}>
            <div className={styles.content}>
                <div className={styles.contentHeader}>
                    <Button
                        type="primary"
                        text="X"
                        onClick={() => setDisplayingBookDetails(false)}
                    />
                    <Link href={`/store/${bookDetails.id}`}>
                        <Button
                            text="open in a new window to display full detials"
                            onClick={() => setDisplayingBookDetails(false)}
                        />
                    </Link>
                </div>

                <div className={styles.detailsContent}>
                    <div className={styles.about}>About</div>
                    <div className={styles.imageContainer}>
                        <Image
                            className={styles.image}
                            src={bookDetails.img}
                            alt="Picture of the author"
                            width={20}
                            height={20}
                        />
                    </div>
                    <div className={styles.title}>{bookDetails.title}</div>
                    <div className={styles.author}>author</div>
                    <div className={styles.subDetialsContainer}>
                        <div className={styles.subDetail}>
                            <span> rate:</span> stars
                        </div>
                        <div className={styles.subDetail}>
                            <span> avilability:</span> bla
                        </div>
                        <div className={styles.subDetail}>
                            <span> type:</span> printed
                        </div>
                        <div className={styles.subDetail}>
                            <span> genre:</span> bla
                        </div>
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        A delectus illum blanditiis iusto consequuntur ....
                    </div>
                </div>
            </div>
        </div>
    );
}
