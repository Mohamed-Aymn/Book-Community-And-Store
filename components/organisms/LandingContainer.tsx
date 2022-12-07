import Image from "next/image";
import Link from "next/link";
import MainPhoto from "../../assets/mainPhoto.jpg";
import styles from "./LandingContainer.module.scss";

export default function () {
    return (
        <div className={styles.mainContainer}>
            <Link href="/about">
                <div className={styles.title}>
                    <div className={styles.firstTitleLine}>Book</div>
                    <div className={styles.secondTitleLine}>Store</div>
                </div>
            </Link>
            <div className={styles.imageContainer}>
                <Image
                    src={MainPhoto}
                    alt="Main photo"
                    className={styles.image}
                />
            </div>
        </div>
    );
}
