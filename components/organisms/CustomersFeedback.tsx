import styles from "./CustomersFeddback.module.scss";
import Image from "next/image";

export default function ({ img }: any) {
    return (
        <div className={styles.mainContainer}>
            <Image className={styles.image} src={img} alt="userImage" />
            <div className={styles.userName}>User Name</div>
            <div>stars</div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus sapiente, repellat impedit dicta placeat at, eveniet
                saepe earum eaque fuga magni veritatis? Iure, beatae amet
                facilis a
            </p>
        </div>
    );
}
