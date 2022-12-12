import styles from "./CustomersFeddback.module.scss";
import Image from "next/image";

export default function ({ img }: any) {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.stars}>stars</div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus sapiente, repellat impedit dicta placeat at, eveniet
            </p>
            <div className={styles.customerInfo}>
                <Image className={styles.image} src={img} alt="userImage" />
                <div className={styles.userTextInfo}>
                    <div className={styles.userName}>User Name</div>
                    <div className={styles.userBio}>Writer - Reader</div>
                </div>
            </div>
        </div>
    );
}
