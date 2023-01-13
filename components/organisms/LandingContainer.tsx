import Image from "next/image";
import Link from "next/link";
import MainPhoto from "../../assets/mainPhoto.jpg";
import styles from "./LandingContainer.module.scss";

export default function () {
    return (
        <div
            className={styles.mainContainer}
            style={{ minHeight: "100vh", paddingTop: "4.1em" }}
        >
            <Link href="/about" className={styles.title}>
                <div className={styles.firstTitleLine}>Book</div>
                <div className={styles.secondTitleLine}>Store</div>
            </Link>
            <Image src={MainPhoto} alt="Main photo" className={styles.image} />
        </div>
    );
}
