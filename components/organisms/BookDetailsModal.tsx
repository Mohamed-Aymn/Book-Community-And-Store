import Image from "next/image";
import Link from "next/link";
import styles from "./BookDetailsModal.module.scss";
import Button from "../molecules/Button";

export default function ({ img, title, click }: any) {
    return (
        <div className={styles.productDetails}>
            <div className={styles.content}>
                <div className={styles.contentHeader}>
                    <Button type="primary" text="X" click={click} />
                    <Link href="/store/book">
                        open in a new window to display full detials
                    </Link>
                </div>

                <div className={styles.detailsContent}>
                    <div className={styles.about}>About</div>
                    <div className={styles.imageContainer}>
                        <Image
                            className={styles.image}
                            src={img}
                            alt="Picture of the author"
                        />
                    </div>
                    <div className={styles.title}>{title}</div>
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
